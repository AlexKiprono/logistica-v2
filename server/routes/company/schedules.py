# --------------------------------SCHEDULE --------------------------------

# create schedule for route
from datetime import datetime
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from server.models.driver import Driver
from server.models.route import Route
from server.models.schedule import Schedule
from server.models.user import User
from server import db
from server.models.vehicle import Vehicle
from . import company_bp

@company_bp.route('/company/routes/<int:route_id>/schedule', methods=['POST'])
@jwt_required()
def create_schedule(route_id):
    # Get current user from JWT token
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if user is authorized
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the user belongs to a company
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400
    
    company = current_user.company_id

    # Check if route exists and belongs to the current user's company
    route = Route.query.get(route_id)
    if not route or route.company_id != company:
        return jsonify({'message': 'Route not found or you are not authorized to create a schedule for this route'}), 404

    data = request.get_json()

    driver_id = data.get('driver_id')
    date = data.get('date')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    ticket_price = data.get('ticket_price')

    # Validate required fields
    if not driver_id:
        return jsonify({'message': 'Driver ID is required'}), 400
    if not date:
        return jsonify({'message': 'Date is required'}), 400
    if not start_time:
        return jsonify({'message': 'Start Time is required'}), 400
    if not end_time:
        return jsonify({'message': 'End Time is required'}), 400
    if ticket_price is None:
        return jsonify({'message': 'Ticket Price is required'}), 400

    # Validate date format
    try:
        date = datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    # Validate time format
    try:
        start_time = datetime.strptime(start_time, '%H:%M').time()
        end_time = datetime.strptime(end_time, '%H:%M').time()
    except ValueError:
        return jsonify({'message': 'Invalid time format. Use HH:MM.'}), 400

    # Check if the driver exists
    driver = Driver.query.get(driver_id)
    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    # Check if there is an overlapping schedule for the driver on the same date
    if Schedule.is_overlapping(db.session, driver_id, date, start_time, end_time):
        return jsonify({'message': 'Conflict detected: The driver is already scheduled during this time.'}), 400

    # Create the new schedule
    schedule = Schedule(
        route_id=route.id,
        driver_id=driver.id,
        date=date,
        start_time=start_time,
        end_time=end_time,
        ticket_price=ticket_price,
        status='active'
    )

    # Add schedule to the database
    db.session.add(schedule)
    db.session.commit()

    return jsonify({'message': 'Schedule created successfully'}), 201

# route to fetch schedules
@company_bp.route('/driver/schedules', methods=['GET'])
@jwt_required()
def get_driver_schedules():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'driver':
        return jsonify({'message': 'Permission denied'}), 403

    driver = Driver.query.filter_by(user_id=current_user_id).first()
    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    schedules = Schedule.query.filter_by(driver_id=driver.id).all()

    if not schedules:
        return jsonify({'message': 'No schedules found for this driver'}), 404

    result = []
    for schedule in schedules:
        vehicle = Vehicle.query.get(driver.assigned_vehicle_id)
        route = schedule.route

        result.append({
            'schedule_id': schedule.id,
            'route_id': schedule.route_id,
            'route_start_location': route.start_location,
            'route_end_location': route.end_location,
            'date': schedule.date.strftime('%Y-%m-%d'),
            'start_time': schedule.start_time.strftime('%H:%M'),
            'end_time': schedule.end_time.strftime('%H:%M'),
            'ticket_price': schedule.ticket_price,
            'vehicle_license_plate': vehicle.license_plate if vehicle else None,
            'vehicle_type': vehicle.vehicle_type if vehicle else None,
            'vehicle_capacity': vehicle.capacity if vehicle else None,
            'vehicle_status': vehicle.status if vehicle else None,
            'schedule_status': schedule.status
        })

    return jsonify({'schedules': result}), 200

# cancel schedule
@company_bp.route('/driver/cancel_schedule/<int:schedule_id>', methods=['POST'])
@jwt_required()
def cancel_schedule(schedule_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'driver':
        return jsonify({'message': 'Permission denied'}), 403

    driver = Driver.query.filter_by(user_id=current_user_id).first()
    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    if schedule.driver_id != driver.id:
        return jsonify({'message': 'This schedule does not belong to you'}), 403

    schedule.status = 'canceled'
    db.session.commit()

    return jsonify({'message': 'Schedule canceled successfully'}), 200

# activate schedule
@company_bp.route('/driver/activate_schedule/<int:schedule_id>', methods=['POST'])
@jwt_required()
def activate_schedule(schedule_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'driver':
        return jsonify({'message': 'Permission denied'}), 403

    driver = Driver.query.filter_by(user_id=current_user_id).first()
    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    if schedule.driver_id != driver.id:
        return jsonify({'message': 'This schedule does not belong to you'}), 403
    
    if schedule.status != 'canceled':
        return jsonify({'message': 'This schedule is not canceled and cannot be activated'}), 400

    schedule.status = 'active'
    db.session.commit()

    return jsonify({'message': 'Schedule activated successfully'}), 200

# view all schedules of a route
@company_bp.route('/company/routes/<int:route_id>/schedule', methods=['GET'])
@jwt_required()
def view_schedules(route_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400
    
    company = current_user.company_id

    route = Route.query.get(route_id)
    if not route or route.company_id != company:
        return jsonify({'message': 'Route not found or you are not authorized to view schedules for this route'}), 404

    schedules = Schedule.query.filter_by(route_id=route.id).all()
    
    schedules_data = []
    for schedule in schedules:
        schedules_data.append({
            'id': schedule.id,
            'driver_id': schedule.driver_id,
            'date': schedule.date.isoformat(),
            'start_time': schedule.start_time.isoformat(),
            'end_time': schedule.end_time.isoformat(),
            'ticket_price': schedule.ticket_price,
            'created_at': schedule.created_at,
            'updated_at': schedule.updated_at
        })

    return jsonify({
        'schedules': schedules_data 
    }), 200


# @company_bp.route('/company/routes/<int:route_id>/schedule', methods=['GET'])
# @jwt_required()
# def view_schedules(route_id):
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get(current_user_id)

#     if not current_user or current_user.role != 'companyadmin':
#         return jsonify({'message': 'Permission denied'}), 403

#     if not current_user.company:
#         return jsonify({'message': 'No Company associated with this admin'}), 400
    
#     company = current_user.company_id

#     route = Route.query.get(route_id)
#     if not route or route.company_id != company:
#         return jsonify({'message': 'Route not found or you are not authorized to view schedules for this route'}), 404

#     schedules = Schedule.query.filter_by(route_id=route.id).all()
    
#     schedules_data = []
#     for schedule in schedules:
#         # Access the driver associated with the schedule
#         driver = schedule.driver  # This assumes the relationship 'driver' is correctly defined
#         if driver:
#             driver_name = f"{driver.user.first_name} {driver.user.last_name}"  # Concatenate the first and last names
#         else:
#             driver_name = "Unknown"  # In case there's no driver associated
        
#         schedules_data.append({
#             'id': schedule.id,
#             'driver_id': schedule.driver_id,
#             'driver_name': driver_name,  # Add the driver's full name
#             'date': schedule.date.isoformat(),
#             'start_time': schedule.start_time.isoformat(),
#             'end_time': schedule.end_time.isoformat(),
#             'ticket_price': schedule.ticket_price,
#             'created_at': schedule.created_at,
#             'updated_at': schedule.updated_at
#         })

#     return jsonify({
#         'schedules': schedules_data 
#     }), 200

# delete schedule
@company_bp.route('/company/schedule/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_schedule(id):
    # Get the current user (companyadmin) from the JWT token
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Ensure the current user is a companyadmin and associated with a company
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Get the company ID of the current user
    company_id = current_user.company_id

    # Fetch the schedule by ID
    schedule = Schedule.query.get(id)

    # If schedule not found or doesn't belong to the user's company, return error
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    if schedule.route.company_id != company_id:
        return jsonify({'message': 'Schedule does not belong to your company'}), 403

    # Delete the schedule
    try:
        db.session.delete(schedule)
        db.session.commit()
        return jsonify({'message': 'Schedule deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error deleting schedule: {str(e)}'}), 500
    
# update schedule
@company_bp.route('/company/schedule/<int:id>', methods=['PUT'])
@jwt_required()
def update_schedule(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    schedule = Schedule.query.get(id)

    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    # Validate the route, driver, or other details if needed
    if schedule.route.company_id != current_user.company_id:
        return jsonify({'message': 'You are not authorized to update this schedule'}), 403

    data = request.get_json()

    # Extract values from the received data
    date_str = data.get('date')
    start_time_str = data.get('start_time')
    end_time_str = data.get('end_time')

    # Check if all required fields are provided
    if not date_str or not start_time_str or not end_time_str:
        return jsonify({'message': 'Missing required fields'}), 400

    # Convert string values to proper datetime objects
    try:
        # Parse date and time strings into datetime.date and datetime.time objects
        date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Ensure it's a date object
        start_time = datetime.strptime(start_time_str, '%H:%M').time()
        end_time = datetime.strptime(end_time_str, '%H:%M').time()
    except ValueError:
        return jsonify({'message': 'Invalid date or time format'}), 400

    # Update the schedule with the provided data
    schedule.date = date  # This should now be a datetime.date object
    schedule.start_time = start_time  # This is a datetime.time object
    schedule.end_time = end_time  # This is a datetime.time object
    schedule.ticket_price = data.get('ticket_price')
    schedule.driver_id = data.get('driver_id')

    db.session.commit()

    return jsonify({'message': 'Schedule updated successfully'}), 200

# view all schedules for company
@company_bp.route('/company/schedules', methods=['GET'])
@jwt_required()
def view_schedules_all():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if the current user is an admin and is associated with a company
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    company_id = current_user.company_id

    # Fetch the routes associated with the company
    routes = Route.query.filter_by(company_id=company_id).all()

    if not routes:
        return jsonify({'message': 'No routes found for this company'}), 404

    # Now fetch schedules for these routes
    schedules = Schedule.query.filter(Schedule.route_id.in_([route.id for route in routes])).all()

    # Prepare data to return
    schedules_data = []
    for schedule in schedules:
        driver = schedule.driver
        if driver:
            driver_name = f"{driver.user.first_name} {driver.user.last_name}"
        else:
            driver_name = "Unknown"

        # Fetch the route associated with the schedule
        route = schedule.route  # This gets the Route object

        schedules_data.append({
            'id': schedule.id,
            'driver_id': schedule.driver_id,
            'driver_name': driver_name,
            'route_id': route.id,
            'route_departure': route.departure_county.name if route.departure_county else "Unknown",  # Departure county
            'route_arrival': route.arrival_county.name if route.arrival_county else "Unknown",  # Arrival county
            'route_distance': route.distance,
            'date': schedule.date.isoformat(),
            'start_time': schedule.start_time.isoformat(),
            'end_time': schedule.end_time.isoformat(),
            'ticket_price': schedule.ticket_price,
            'created_at': schedule.created_at,
            'updated_at': schedule.updated_at
        })

    return jsonify({
        'schedules': schedules_data
    }), 200

# passenger schedules
@company_bp.route('/schedules', methods=['GET'])
def get_schedules():
    schedules = Schedule.query.all()

    # Prepare data to return
    schedules_data = []
    for schedule in schedules:
        driver = schedule.driver
        if driver:
            driver_name = f"{driver.user.first_name} {driver.user.last_name}"
            
            # Get assigned vehicle
            vehicle = driver.vehicle
            if vehicle:
                vehicle_info = {
                    'license_plate': vehicle.license_plate,
                    'vehicle_type': vehicle.vehicle_type,
                    'capacity': vehicle.capacity
                }
            else:
                vehicle_info = "No vehicle assigned"
        else:
            driver_name = "Unknown"
            vehicle_info = "No driver assigned"

        route = schedule.route  
        if route:
            route_departure = route.departure_county.name if route.departure_county else "Unknown"
            route_arrival = route.arrival_county.name if route.arrival_county else "Unknown"
            route_distance = route.distance
            route_id = route.id
            company_name = route.company.name if route.company else "Unknown" 
        else:
            route_departure = "Unknown"
            route_arrival = "Unknown"
            route_distance = 0
            route_id = None
            company_name = "Unknown"  

        # Only append the schedule if company_name, route_departure, and route_arrival are valid
        if company_name != "Unknown" or route_departure != "Unknown" or route_arrival != "Unknown":
            schedules_data.append({
                'id': schedule.id,
                'driver_id': schedule.driver_id,
                'driver_name': driver_name,
                'vehicle_info': vehicle_info, 
                'route_id': route_id,
                'route_departure': route_departure,
                'route_arrival': route_arrival,
                'route_distance': route_distance,
                'company_name': company_name,
                'date': schedule.date.isoformat(),
                'start_time': schedule.start_time.isoformat(),
                'end_time': schedule.end_time.isoformat(),
                'duration_hours': schedule.duration(),
                'ticket_price': schedule.ticket_price,
                'created_at': schedule.created_at,
                'updated_at': schedule.updated_at
            })

    return jsonify({
        'schedules': schedules_data
    }), 200

# schedule by id
@company_bp.route('/schedules/<int:schedule_id>', methods=['GET'])
def get_schedule_by_id(schedule_id):
    schedule = Schedule.query.get_or_404(schedule_id)

    driver = schedule.driver
    if driver:
        driver_name = f"{driver.user.first_name} {driver.user.last_name}"
    else:
        driver_name = "Unknown"

    route = schedule.route
    route_departure = route.departure_county.name if route.departure_county else "Unknown"
    route_arrival = route.arrival_county.name if route.arrival_county else "Unknown"
    route_distance = route.distance
    route_id = route.id
    company_name = route.company.name if route.company else "Unknown"

    return jsonify({
        'id': schedule.id,
        'driver_id': schedule.driver_id,
        'driver_name': driver_name,
        'route_id': route_id,
        'route_departure': route_departure,
        'route_arrival': route_arrival,
        'route_distance': route_distance,
        'company_name': company_name,
        'date': schedule.date.isoformat(),
        'start_time': schedule.start_time.isoformat(),
        'end_time': schedule.end_time.isoformat(),
        'ticket_price': schedule.ticket_price,
        'created_at': schedule.created_at,
        'updated_at': schedule.updated_at
        }), 200

# search for schedules
@company_bp.route('/schedules/search', methods=['GET'])
@jwt_required()
def search_schedules():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'passenger':
        return jsonify({'message': 'Permission denied'}), 403

    departure_id = request.args.get('departure_id', type=int)
    arrival_id = request.args.get('arrival_id', type=int)

    if not departure_id or not arrival_id:
        return jsonify({'message': 'Both departure_id and arrival_id are required'}), 400

    routes = Route.query.filter_by(departure_id=departure_id, arrival_id=arrival_id).all()

    if not routes:
        return jsonify({'message': 'No routes found for the given departure and arrival IDs'}), 404

    schedules = Schedule.query.filter(Schedule.route_id.in_([route.id for route in routes])).all()

    schedules_data = []
    for schedule in schedules:
        driver = schedule.driver
        driver_name = f"{driver.user.first_name} {driver.user.last_name}" if driver else "Unknown"

        route = schedule.route

        schedules_data.append({
            'id': schedule.id,
            'driver_id': schedule.driver_id,
            'driver_name': driver_name,
            'route_id': route.id,
            'route_departure': route.departure_county.name if route.departure_county else "Unknown",
            'route_arrival': route.arrival_county.name if route.arrival_county else "Unknown",
            'route_distance': route.distance,
            'date': schedule.date.isoformat(),
            'start_time': schedule.start_time.isoformat(),
            'end_time': schedule.end_time.isoformat(),
            'ticket_price': schedule.ticket_price,
            'created_at': schedule.created_at,
            'updated_at': schedule.updated_at
        })

    if not schedules_data:
        return jsonify({'message': 'No schedules found for the specified route'}), 404

    return jsonify({'schedules': schedules_data}), 200
