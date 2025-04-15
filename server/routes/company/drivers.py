

# --------------------------------DRIVERS --------------------------------

# asign a driver to an vehicle
from datetime import datetime
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from server.models.driver import Driver
from server.models.schedule import Schedule
from server.models.user import User
from server.models.vehicle import Vehicle
from server import db
from . import company_bp


@company_bp.route('/company/assign_driver_to_vehicle/<int:driver_id>', methods=['POST'])
@jwt_required()
def assign_driver_to_vehicle(driver_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    data = request.get_json()
    vehicle_id = data.get('vehicle_id')

    if not vehicle_id:
        return jsonify({'message': 'Vehicle ID is required'}), 400

    driver = Driver.query.get(driver_id)
    vehicle = Vehicle.query.get(vehicle_id)

    if not driver or not vehicle:
        return jsonify({'message': 'Driver or Vehicle not found'}), 404

    if driver.assigned_vehicle_id is not None:
        return jsonify({'message': 'Driver is already assigned to another vehicle'}), 400

    if vehicle.status == 'in use':
        return jsonify({'message': 'Vehicle is already in use by another driver'}), 400

    driver.assigned_vehicle_id = vehicle.id
    driver.status = 'active'  
    vehicle.status = 'in use'


    print(f"Assigning vehicle {vehicle_id} to driver {driver_id}")

    db.session.commit()

    return jsonify({'message': 'Driver successfully assigned to vehicle'}), 200


# remove a driver from a vehicle
@company_bp.route('/company/remove_vehicle_from_driver/<int:driver_id>', methods=['POST'])
@jwt_required()
def remove_vehicle_from_driver(driver_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    driver = Driver.query.get(driver_id)

    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    if driver.assigned_vehicle_id is None:
        return jsonify({'message': 'Driver has no vehicle assigned'}), 400

    # Fetch the vehicle assigned to the driver
    vehicle = Vehicle.query.get(driver.assigned_vehicle_id)

    if not vehicle:
        return jsonify({'message': 'Vehicle not found'}), 404

    # Remove the vehicle assignment from the driver
    driver.assigned_vehicle_id = None
    driver.status = 'inactive'  # or any other status indicating the driver is not currently assigned to a vehicle

    # Set the vehicle status back to 'available'
    vehicle.status = 'available'

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Vehicle successfully removed from driver'}), 200

# fetch drivers with vehicle assignment
@company_bp.route('/company/drivers_with_vehicles', methods=['GET'])
@jwt_required()
def view_all_drivers_with_vehicles():
    current_user_id = get_jwt_identity()  # Get the current user ID from the JWT token
    current_user = User.query.get(current_user_id)

    # Ensure the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Ensure the company is associated with the current user
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    # Get all drivers for the company who have assigned vehicles
    drivers = Driver.query.join(User).filter(
        User.company_id == current_user.company_id,  # Ensure the driver belongs to the same company
        Driver.assigned_vehicle_id.isnot(None)  # Ensure the driver has a vehicle assigned
    ).all()

    if not drivers:
        return jsonify({'message': 'No drivers with assigned vehicles found for this company'}), 404

    # Prepare driver data
    driver_data = []
    for driver in drivers:
        driver_data.append({
            'id': driver.id,
            'first_name': driver.user.first_name,
            'last_name': driver.user.last_name,
            'email': driver.user.email,
            'license_number': driver.license_number,
            'license_expiry': driver.license_expiry,
            'assigned_vehicle': driver.vehicle.license_plate if driver.vehicle else None
        })

    return jsonify({'drivers': driver_data}), 200

# fetch all schedules by driver
@company_bp.route('/company/schedules/<int:driver_id>', methods=['GET'])
@jwt_required()
def view_driver_schedules(driver_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    driver = Driver.query.get(driver_id)

    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    schedules = Schedule.query.filter_by(driver_id=driver_id).all()

    if not schedules:
        return jsonify({'message': 'No schedules found for this driver'}), 404

    schedule_data = []
    for schedule in schedules:
        schedule_data.append({
            'id': schedule.id,
            'date': schedule.date.strftime('%Y-%m-%d'),
            'start_time': schedule.start_time.strftime('%H:%M'),
            'end_time': schedule.end_time.strftime('%H:%M'),
            'location': schedule.location,
            'vehicle': schedule.vehicle.license_plate if schedule.vehicle else None
        })

# create a new driver
@company_bp.route('/company/create_driver', methods=['POST'])
@jwt_required()
def create_driver():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({"message": "No company associated with this user"}), 400

    company_id = current_user.company_id 

    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    license_number = data.get('license_number')
    license_expiry_str = data.get('license_expiry') 
    password = data.get('password')
    status = data.get('status')

    if not first_name or not last_name or not email or not phone_number or not license_number or not license_expiry_str or not password:
        return jsonify({"message": "All fields are required."}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "This email is already used by another user"}), 400

    try:
        license_expiry = datetime.strptime(license_expiry_str, '%Y-%m-%d')
    except ValueError:
        return jsonify({"message": "Invalid date format for license_expiry. Use 'YYYY-MM-DD'."}), 400

    new_driver_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number,
        password=password,
        role='driver',
        company_id=company_id
    )

    new_driver_user.set_password(password)

    new_driver_profile = Driver(
        user=new_driver_user,
        license_number=license_number,
        license_expiry=license_expiry,
        status='active',
    )

    db.session.add(new_driver_user)
    db.session.add(new_driver_profile)
    db.session.commit()

    return jsonify({"message": "Driver created successfully."}), 201

# # view drivers
@company_bp.route('/company/drivers', methods=['GET'])
@jwt_required()
def view_all_drivers():
    current_user_id = get_jwt_identity()  # Get the current user ID from the JWT token
    current_user = User.query.get(current_user_id)

    # Ensure the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Ensure the company is associated with the current user
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    # Get all drivers for the company
    drivers = Driver.query.join(User).filter(User.company_id == current_user.company_id).all()

    if not drivers:
        return jsonify({'message': 'No drivers found for this company'}), 404

    # Prepare driver data (you can return more or less details as needed)
    driver_data = []
    for driver in drivers:
        driver_data.append({
            'id': driver.id,
            'first_name': driver.user.first_name,
            'last_name': driver.user.last_name,
            'email': driver.user.email,
            'license_number': driver.license_number,
            'license_expiry': driver.license_expiry,
            'assigned_vehicle': driver.vehicle.license_plate if driver.vehicle else None
        })

    return jsonify({'drivers': driver_data}), 200

# view one driver
@company_bp.route('/company/driver/<int:driver_id>', methods=['GET'])
@jwt_required()
def view_driver(driver_id):
    current_user_id = get_jwt_identity()  # Get the current user ID from the JWT token
    current_user = User.query.get(current_user_id)

    # Ensure the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Ensure the company is associated with the current user
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    # Get the driver by ID
    driver = Driver.query.get(driver_id)

    if not driver:
        return jsonify({'message': 'Driver not found'}), 404

    # Prepare driver data (you can return more or less details as needed)
    driver_data = {
        'id': driver.id,
        'first_name': driver.user.first_name,
        'last_name': driver.user.last_name,
        'email': driver.user.email,
        'license_number': driver.license_number,
        'license_expiry': driver.license_expiry,
        'assigned_vehicle': driver.vehicle.license_plate if driver.vehicle else None
    }

    return jsonify({'driver': driver_data}), 200

# update a driver
@company_bp.route('/company/drivers/<int:driver_id>', methods=['PUT'])
@jwt_required()
def update_driver(driver_id):
    current_user_id = get_jwt_identity()  # Get the current user ID from the JWT token
    current_user = User.query.get(current_user_id)

    # Ensure the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Ensure the company is associated with the current user
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    # Find the driver
    driver = Driver.query.get(driver_id)
    if not driver or driver.user.company_id != current_user.company.id:
        return jsonify({'message': 'Driver not found or not associated with your company'}), 404

    # Get data from request
    data = request.get_json()
    license_number = data.get('license_number', driver.license_number)
    license_expiry = data.get('license_expiry', driver.license_expiry)

    # Update the driver's details
    driver.license_number = license_number
    driver.license_expiry = datetime.strptime(license_expiry, "%Y-%m-%d")

    # Optionally assign a vehicle
    assigned_vehicle_id = data.get('assigned_vehicle_id')
    if assigned_vehicle_id:
        vehicle = Vehicle.query.get(assigned_vehicle_id)
        if vehicle:
            driver.assigned_vehicle_id = vehicle.id
            vehicle.status = 'in use'  # Mark the vehicle as in use
        else:
            return jsonify({'message': 'Vehicle not found'}), 404

    db.session.commit()

    return jsonify({'message': 'Driver updated successfully'}), 200

# delete a driver
@company_bp.route('/company/drivers/<int:driver_id>', methods=['DELETE'])
@jwt_required()
def delete_driver(driver_id):
    current_user_id = get_jwt_identity()  # Get the current user ID from the JWT token
    current_user = User.query.get(current_user_id)

    # Ensure the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Ensure the company is associated with the current user
    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    # Find the driver
    driver = Driver.query.get(driver_id)
    if not driver or driver.user.company_id != current_user.company.id:
        return jsonify({'message': 'Driver not found or not associated with your company'}), 404

    # Delete the driver (and ensure any vehicle associations are handled)
    if driver.vehicle:
        driver.vehicle.status = 'available'  # Make the vehicle available again
        driver.vehicle.assigned_driver = None  # Remove the vehicle's driver assignment

    db.session.delete(driver)
    db.session.commit()

    return jsonify({'message': 'Driver deleted successfully'}), 200

# --------------------------------DRIVERS --------------------------------
