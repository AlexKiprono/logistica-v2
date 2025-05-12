from datetime import datetime
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests
from requests.auth import HTTPBasicAuth
import base64

from server.models.parcel import Parcel, generate_tracking_code
from server.models.payment import Payment
from server.models.paymentticket import PaymentTicket
from server.models.schedule import Schedule
from server.models.station import Station
from server.models.ticket import Ticket
from server.models.user import User
from server import db
from . import passenger_bp


# book ticket
@passenger_bp.route('/book_ticket/<int:schedule_id>', methods=['POST'])
@jwt_required()
def book_ticket(schedule_id):
    # Get the current authenticated user's ID from JWT
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'passenger':
        return jsonify({'message': 'Permission denied'}), 403

    # Get data from the request (number of seats and payment method)
    data = request.get_json()
    number_of_seats = data.get('number_of_seats')
    payment_method = data.get('payment_method')
    phone_number = data.get('phone_number') if payment_method == 'mpesa' else None

    # Check if the schedule exists
    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({"message": "Schedule not found"}), 404

    # Check if there are enough available seats
    vehicle_capacity = schedule.driver.vehicle.capacity if schedule.driver and schedule.driver.vehicle else 0
    booked_seats = Ticket.query.filter_by(schedule_id=schedule_id).count()
    available_seats = vehicle_capacity - booked_seats

    if number_of_seats > available_seats:
        return jsonify({"message": f"Not enough seats available. Only {available_seats} seats left."}), 400

    # Calculate total price
    total_price = number_of_seats * schedule.ticket_price

    # Create tickets for the current user
    tickets = [
        Ticket(
            schedule_id=schedule.id,
            passenger_id=current_user.id,
            payment_amount=schedule.ticket_price,
            status='booked',
            payment_status='pending'
        ) for _ in range(number_of_seats)
    ]
    
    # Add tickets individually to ensure proper ID generation
    for ticket in tickets:
        db.session.add(ticket)
    db.session.commit()  # Commit tickets to generate IDs

    # Verify that tickets have IDs
    for ticket in tickets:
        if ticket.id is None:
            raise ValueError(f"Ticket {ticket} does not have an ID!")

    # Create a single payment record for all tickets
    payment = Payment(
        user_id=current_user.id,
        amount=total_price,
        payment_method=payment_method,
        payment_status='pending',
        transaction_id=None
    )
    db.session.add(payment)
    db.session.commit()

    # Link tickets to the payment
    for ticket in tickets:
        payment_ticket_entry = PaymentTicket(payment_id=payment.id, ticket_id=ticket.id)
        db.session.add(payment_ticket_entry)
    db.session.commit()  # Commit the payment-ticket associations

    # Handle M-Pesa payment if selected
    if payment_method == 'mpesa' and phone_number:
        callback_url = "https://ed46-102-166-75-25.ngrok-free.app/lnmo-callback"

        # Initiate M-Pesa payment request (STK Push)
        response = initiate_mpesa_payment(total_price, phone_number, callback_url, [ticket.id for ticket in tickets])

        if response:
            return jsonify({
                "message": f"Successfully booked {number_of_seats} seats for schedule {schedule_id}. Please complete payment via M-Pesa.",
                "tickets": [ticket.id for ticket in tickets],
                "total_price": total_price,
                "payment_method": 'mpesa',
                "phone_number": phone_number
            }), 201

    return jsonify({
        "message": f"Successfully booked {number_of_seats} seats for schedule {schedule_id}. Payment pending.",
        "tickets": [ticket.id for ticket in tickets],
        "total_price": total_price
    }), 201




# M-Pesa STK payment function
# M-Pesa STK payment function
def initiate_mpesa_payment(amount, phone_number, callback_url, ticket_ids):
    endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    access_token = get_access_token()
    headers = {"Authorization": f"Bearer {access_token}"}

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    password = generate_password(timestamp)

    # Prepare data to send to M-Pesa API
    data = {
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": "174379",
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": "TicketPayment",
        "TransactionDesc": "Payment for tickets",
        "Metadata": {"TicketIDs": ticket_ids}  # Attach ticket IDs to the payment request
    }

    try:
        response = requests.post(endpoint, json=data, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error with M-Pesa request: {str(e)}")
        return None

    

@passenger_bp.route('/lnmo-callback', methods=["POST"])
def lnmo_callback():
    data = request.get_json()
    print(data)

    result_code = data.get('Body', {}).get('stkCallback', {}).get('ResultCode')

    if result_code == 0:  # Payment successful
        transaction_id = data.get('Body', {}).get('stkCallback', {}).get('MpesaReceiptNumber')
        ticket_ids = data.get('Body', {}).get('stkCallback', {}).get('CallbackMetadata', {}).get('Item', [])
        ticket_ids = [item.get('Value') for item in ticket_ids if item.get('Name') == 'TicketIDs']

        if ticket_ids:
            # Loop through each ticket ID and update its status
            for ticket_id in ticket_ids:
                ticket = Ticket.query.get(ticket_id)
                if ticket:
                    ticket.payment_status = "success"
                    ticket.status = "paid"
                    ticket.updated_at = datetime.now()

            # Find the payment associated with these tickets and update its status
            payment = Payment.query.join(PaymentTicket).filter(PaymentTicket.ticket_id.in_(ticket_ids)).first()
            if payment:
                payment.payment_status = "success"
                payment.transaction_id = transaction_id

            db.session.commit()

        return jsonify({"message": "Payment successful, tickets updated."}), 200

    return jsonify({"message": "Payment failed or canceled."}), 400

def ticket_to_dict(ticket):
    """Convert Ticket object to dictionary."""
    return {
        'id': ticket.id,
        'schedule_id': ticket.schedule_id,
        'passenger_id': ticket.passenger_id,
        'booking_date': ticket.booking_date.isoformat(),
        'status': ticket.status,
        'payment_status': ticket.payment_status,
        'payment_amount': ticket.payment_amount,
        'created_at': ticket.created_at.isoformat(),
        'updated_at': ticket.updated_at.isoformat() if ticket.updated_at else None
    }

@passenger_bp.route('/mpesa-payment', methods=['POST'])
def mpesa_payment():
    data = request.get_json()

    # Extract ticket_ids, phone, and amount
    ticket_ids = data.get('ticket_ids')
    phone_number = data.get('phone')
    amount = data.get('amount')

    # Validate input fields
    if not ticket_ids:
        return jsonify({"message": "Missing 'ticket_ids' in request"}), 400
    if not phone_number:
        return jsonify({"message": "Missing 'phone' in request"}), 400
    if not amount:
        return jsonify({"message": "Missing 'amount' in request"}), 400

    # Retrieve Ticket objects from the database using ticket_ids
    tickets = Ticket.query.filter(Ticket.id.in_(ticket_ids)).all()

    # If no tickets are found for the provided IDs, return an error
    if not tickets:
        return jsonify({"message": "Invalid ticket IDs provided"}), 400

    # Convert Ticket objects to dictionaries
    ticket_data = [ticket_to_dict(ticket) for ticket in tickets]

    # Callback URL for M-Pesa
    callback_url = "https://6eab-197-136-173-49.ngrok-free.app/lnmo-callback"

    # Pass serialized tickets (ticket_data) to the M-Pesa initiation function
    response = initiate_mpesa_payment(amount, phone_number, callback_url, ticket_data)

    if response:
        return jsonify({"message": f"M-Pesa payment initiated successfully, response: {response}", "tickets": ticket_data}), 200
    else:
        return jsonify({"message": "Error initiating M-Pesa payment"}), 500

# Function to fetch the access token from Safaricom
def get_access_token():
    consumer_key = "O28gieszMISYHItG4654c6tXTuGSXNUhaWxGqIbfHJcuQ1zx"
    consumer_secret = "nM4IcSptAJ7TFpsGpzqqWHM0773CzqpAfxUU1ealcBuTZpuelVRyGP57uW44O29F"
    endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    try:
        response = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        response.raise_for_status()
        data = response.json()
        return data['access_token']
    except requests.RequestException as e:
        print(f"Error fetching access token: {str(e)}")
        return None  # Handle the error accordingly

# Function to generate the password needed for the M-Pesa request
def generate_password(timestamp):
    business_shortcode = "174379"
    lipa_na_mpesa_online_shortcode = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
    password_string = f"{business_shortcode}{lipa_na_mpesa_online_shortcode}{timestamp}"
    return base64.b64encode(password_string.encode('utf-8')).decode('utf-8')

# Function to get the list of booked tickets for a passenger
@passenger_bp.route('/booked_tickets', methods=['GET'])
@jwt_required()
def get_booked_tickets():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'passenger':
        return jsonify({'message': 'Permission denied'}), 403

    booked_tickets = Ticket.query.filter_by(passenger_id=current_user.id).all()

    if not booked_tickets:
        return jsonify({'message': 'No booked tickets found'}), 404

    tickets_data = [ticket_to_dict(ticket) for ticket in booked_tickets]
    return jsonify(tickets_data), 200


# @passenger_bp.route('/send_parcel', methods=['POST'])
# @jwt_required()
# def send_parcel():
#     data = request.get_json()
    
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get(current_user_id)
    
#     if not current_user or current_user.role != 'passenger':
#         return jsonify({'error': 'Unauthorized access'}), 403

#     try:
#         required_fields = [
#             'company_id', 'pickup_station_id', 'dropoff_station_id',
#             'sender_name', 'receiver_name', 'receiver_phone',
#             'weight', 'delivery_fee', 'payment_amount'
#         ]
#         for field in required_fields:
#             if field not in data:
#                 return jsonify({'error': f'Missing field: {field}'}), 400

#         # Verify stations belong to the company
#         pickup_station = Station.query.filter_by(id=data['pickup_station_id'], company_id=data['company_id']).first()
#         dropoff_station = Station.query.filter_by(id=data['dropoff_station_id'], company_id=data['company_id']).first()

#         if not pickup_station or not dropoff_station:
#             return jsonify({'error': 'Invalid station selection for the chosen company'}), 400

#         # Create Parcel
#         new_parcel = Parcel(
#             tracking_code=generate_tracking_code(),
#             company_id=data['company_id'],
#             sender_id=current_user_id,
#             pickup_station_id=data['pickup_station_id'],
#             dropoff_station_id=data['dropoff_station_id'],
#             sender_name=data['sender_name'],
#             receiver_name=data['receiver_name'],
#             receiver_phone=data['receiver_phone'],
#             weight=data['weight'],
#             delivery_fee=data['delivery_fee'],
#             payment_amount=data['payment_amount'],
#             status='pending',
#             payment_status='pending'
#         )

#         db.session.add(new_parcel)
#         db.session.commit()

#         return jsonify({'message': 'Parcel sent successfully', 'parcel_id': new_parcel.id}), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500
    
# @passenger_bp.route('/track/<tracking_code>', methods=['GET'])
# def track_parcel(tracking_code):
#     parcel = Parcel.query.filter_by(tracking_code=tracking_code).first()
#     if not parcel:
#         return jsonify({'error': 'Invalid tracking code'}), 404

#     return jsonify({
#         'status': parcel.status,
#         'pickup_station': parcel.pickup_station.name,
#         'dropoff_station': parcel.dropoff_station.name,
#         'is_delivered': parcel.is_delivered
#     })
