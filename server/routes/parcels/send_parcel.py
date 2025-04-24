# # routes/parcels.py

# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from server.models.user import User
# from server.models.parcel import Parcel
# from server.models.company import Company
# from server.models.county import County
# from server.models.station import Station
# from server import db
# from . import parcel_bp

# @parcel_bp.route('/companies', methods=['GET'])
# def get_companies():
#     companies = Company.query.all()
#     return jsonify([{'id': c.id, 'name': c.name} for c in companies])

# @parcel_bp.route('/companies/<int:company_id>/counties', methods=['GET'])
# def get_company_counties(company_id):
#     stations = Station.query.filter_by(company_id=company_id).all()
#     county_ids = list(set([s.county_id for s in stations]))
#     counties = County.query.filter(County.id.in_(county_ids)).all()
#     return jsonify([{'id': c.id, 'name': c.name} for c in counties])

# @parcel_bp.route('/companies/<int:company_id>/counties/<int:county_id>/stations', methods=['GET'])
# def get_stations_by_company_and_county(company_id, county_id):
#     stations = Station.query.filter_by(company_id=company_id, county_id=county_id).all()
#     return jsonify([{'id': s.id, 'name': s.name} for s in stations])

# @parcel_bp.route('/send-parcel', methods=['POST'])
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