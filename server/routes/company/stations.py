from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from server.models.county import County
from server.models.driver import Driver
from server.models.route import Route
from server.models.schedule import Schedule
from server.models.station import Station
from server.models.user import User
from server import db
from . import company_bp

# station and stationadmin
@company_bp.route('/station/create', methods=['POST'])
@jwt_required()
def create_station_and_admin():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'error': 'Permission denied.'}), 403

    data = request.get_json()

    # Corrected company_id assignment
    company_id = current_user.company_id

    required_fields = ['name', 'county_id', 'address', 'first_name', 'last_name', 'email', 'phone_number', 'password']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400

    # Check if a station with the same name already exists
    existing_station_name = Station.query.filter_by(name=data['name']).first()
    if existing_station_name:
        return jsonify({'error': 'A station with this name already exists.'}), 400
    
    # Check if a user with the same email exists
    existing_station_email = User.query.filter_by(email=data['email']).first()
    if existing_station_email:
        return jsonify({'error': 'A user with this email already exists.'}), 400

    # Check if a user with the same phone number exists
    existing_station_by_phone = User.query.filter_by(phone_number=data['phone_number']).first()
    if existing_station_by_phone:
        return jsonify({'error': 'A user with this phone number already exists.'}), 400

    # Create the new station
    new_station = Station(
        name=data['name'],
        county_id=data['county_id'],
        address=data['address'],
        company_id=company_id
    )

    try:
        db.session.add(new_station)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while creating the station. Please try again later.'}), 500

    # Create the new admin user
    new_admin = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        password=data['password'],
        role='stationadmin',
        company_id=company_id
    )

    new_admin.set_password(data['password'])

    try:
        db.session.add(new_admin)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while creating the admin. Please try again later.'}), 500

    # Link the admin to the station
    new_station.user_id = new_admin.id

    try:
        db.session.commit() 
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while linking the admin to the station. Please try again later.'}), 500

    # Fetch county name based on county_id
    county = County.query.get(data['county_id'])
    county_name = county.name if county else 'Unknown County'

    return jsonify({
        'message': f"Station '{new_station.name}' and admin created successfully.",
        'admin': {
            'first_name': new_admin.first_name,
            'last_name': new_admin.last_name,
            'email': new_admin.email,
            'phone_number': new_admin.phone_number
        },
        'station': {
            'name': new_station.name,
            'county_name': county_name
        }
    }), 201

# routes by station
@company_bp.route('/station/routes', methods=['GET'])
@jwt_required()
def get_routes_and_schedules_for_station():
    current_user_id = get_jwt_identity()

    current_user = User.query.get(current_user_id)

    if current_user.role != 'stationadmin':
        return jsonify({'message': 'Permission denied'}), 403

    station = Station.query.filter_by(user_id=current_user.id).first()
    if not station:
        return jsonify({'message': 'No station assigned to this user'}), 400

    county = station.county

    routes = Route.query.filter(
        (Route.departure_id == county.id) | (Route.arrival_id == county.id)
    ).all()

    # Prepare the result
    result = []
    for route in routes:
        schedules = Schedule.query.filter_by(route_id=route.id).all()
        
        for schedule in schedules:
            start_time_str = schedule.start_time.strftime("%H:%M:%S") if schedule.start_time else None
            end_time_str = schedule.end_time.strftime("%H:%M:%S") if schedule.end_time else None


            driver = Driver.query.get(schedule.driver_id)
            driver_data = {
                'id': driver.id,
                'assigned_vehicle_id': driver.assigned_vehicle_id,
                'vehicle_license_plate': driver.vehicle.license_plate, 
                'first_name': driver.user.first_name,
                'last_name': driver.user.last_name,
                'email': driver.user.email
            
            } if driver else {}

            date_str = schedule.date.strftime("%Y-%m-%d") if schedule.date else None


            result.append({
                'station_id': station.id,
                'route': {
                    'id': route.id,
                    'departure': route.departure_county.name,
                    'arrival': route.arrival_county.name,
                    'distance': route.distance
                },
                'schedule': {
                    'id': schedule.id,
                    'date': date_str, 
                    'start_time': start_time_str,
                    'end_time': end_time_str,
                    'ticket_price': schedule.ticket_price,
                    'status': schedule.status
                },
                'driver': driver_data

            })

    return jsonify(result), 200

# get all stations
@company_bp.route('/admin/company/stations', methods=['GET'])
@jwt_required()
def get_stations_and_admins():
    # Get the current user ID from JWT token
    current_user_id = get_jwt_identity()

    # Fetch the current user from the database
    current_user = User.query.get(current_user_id)

    # Check if the current user has the role of 'companyadmin'
    if current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the current user has a company associated
    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Fetch all stations for the current user's company
    stations = Station.query.filter_by(company_id=current_user.company_id).all()

    # List to store the result
    result = []

    for station in stations:
        # Fetch the admin user directly via the user_id column (one-to-one relationship)
        admin = User.query.get(station.user_id) if station.user_id else None
        
        # Prepare the admin details if an admin exists
        admin_data = {}
        if admin:
            admin_data = {
                'id': admin.id,
                'first_name': admin.first_name,
                'last_name': admin.last_name,
                'email': admin.email,
                'phone_number': admin.phone_number
            }

        # Prepare the station details
        result.append({
            'station': {
                'id': station.id,
                'name': station.name,
                'address': station.address,
                'county': station.county.name if station.county else None,
                'company_id': station.company_id
            },
            'admin': admin_data
        })

    return jsonify(result), 200

# Update station details (for companyadmin)
@company_bp.route('/company/station/<int:id>', methods=['PUT'])
@jwt_required()
def update_station(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    station = Station.query.get(id)

    if not station:
        return jsonify({'message': 'Station not found'}), 404

    data = request.get_json()
    if 'name' in data and data['name']:
        station.name = data['name']

    if 'address' in data and data['address']:
        station.address = data['address']

    if 'latitude' in data and data['latitude']:
        station.latitude = data['latitude']

    if 'longitude' in data and data['longitude']:
        station.longitude = data['longitude']

    db.session.commit()

    return jsonify({'message': f'Station {station.name} updated successfully'}), 200

# Delete a station (for companyadmin)
@company_bp.route('/company/station/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_station(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    station = Station.query.get(id)

    if not station:
        return jsonify({'message': 'Station not found'}), 404

    db.session.delete(station)
    db.session.commit()

    return jsonify({'message': 'Station deleted successfully'}), 200