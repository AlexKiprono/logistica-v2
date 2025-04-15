from datetime import datetime
import os
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename  # For uploading files
from flask import send_from_directory # For downloading files


from server.models.county import County
from server.models.driver import Driver
from server.models.route import Route
from server.models.schedule import Schedule
from server.models.station import Station
from server.models.user import User
from server import db
from server.models.vehicle import Vehicle
from . import company_bp

# --------------------------------VEHICLES --------------------------------

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images', 'vehicles')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Make sure the UPLOAD_FOLDER exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@company_bp.route('/company/vehicles', methods=['POST'])
@jwt_required()
def add_vehicle():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Validate the user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    license_plate = request.form.get('license_plate')
    vehicle_type = request.form.get('vehicle_type')
    capacity = request.form.get('capacity')

    # Validate vehicle data
    if not license_plate or not vehicle_type or not capacity:
        return jsonify({'message': 'License plate, vehicle type, and capacity are required for each vehicle'}), 400

    image_filename = None
    if 'image' in request.files:
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            image_filename = f"{license_plate}_{vehicle_type}_{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
            file.save(os.path.join(UPLOAD_FOLDER, image_filename))

    # Create new vehicle
    new_vehicle = Vehicle(
        company_id=current_user.company_id,
        license_plate=license_plate,
        vehicle_type=vehicle_type,
        capacity=capacity,
        image=image_filename  # Save only the filename or URL, not the image data
    )

    db.session.add(new_vehicle)
    db.session.commit()

    return jsonify({'message': 'Vehicle added successfully'}), 201

# Endpoint to serve images from the server
@company_bp.route('/images/vehicles/<filename>', methods=['GET'])
def get_vehicle_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# get all vehicles for company
@company_bp.route('/company/vehicles', methods=['GET'])
@jwt_required()
def get_vehicles():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if the current user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the user has a company associated with them
    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Fetch all vehicles for the company associated with the current user
    company_id = current_user.company[0].id
    vehicles = Vehicle.query.filter_by(company_id=company_id).all()

    # If no vehicles found, return a message indicating so
    if not vehicles:
        return jsonify({'message': 'No vehicles found for this company'}), 404

    # Serialize vehicles to return them in the response
    vehicles_data = []
    for vehicle in vehicles:
        vehicles_data.append({
            'id': vehicle.id,
            'license_plate': vehicle.license_plate,
            'vehicle_type': vehicle.vehicle_type,
            'capacity': vehicle.capacity,
            'image': vehicle.image,
            'status': vehicle.status,
            'created_at': vehicle.created_at,
            'updated_at': vehicle.updated_at
        })

    return jsonify({'vehicles': vehicles_data}), 200


# count vehicle
@company_bp.route('/company/vehicles/count', methods=['GET'])
@jwt_required()
def count_vehicles():
    # Get the current user ID from the JWT token
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if the current user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the user has a company associated with them
    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Fetch the company ID
    company_id = current_user.company[0].id

    # Count the number of vehicles for the company
    vehicle_count = Vehicle.query.filter_by(company_id=company_id).count()

    return jsonify({'vehicle_count': vehicle_count}), 200

# update vehicle
@company_bp.route('/company/vehicles/<int:vehicle_id>', methods=['PUT'])
@jwt_required()
def update_vehicle(vehicle_id):
    # Get the current user ID from the JWT token
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if the current user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the user has a company associated with them
    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Fetch the company ID
    company_id = current_user.company[0].id

    # Fetch the vehicle to update
    vehicle = Vehicle.query.filter_by(id=vehicle_id, company_id=company_id).first()

    # Check if the vehicle exists and belongs to the current user's company
    if not vehicle:
        return jsonify({'message': 'Vehicle not found or not associated with your company'}), 404

    # Get the data from the request
    data = request.get_json()
    license_plate = data.get('license_plate', vehicle.license_plate)  # default to existing value
    vehicle_type = data.get('vehicle_type', vehicle.vehicle_type)  # default to existing value
    capacity = data.get('capacity', vehicle.capacity)  # default to existing value
    status = data.get('status', vehicle.status)  # default to existing value

    # Update the vehicle details
    vehicle.license_plate = license_plate
    vehicle.vehicle_type = vehicle_type
    vehicle.capacity = capacity
    vehicle.status = status

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Vehicle updated successfully'}), 200

# delete vehicle
@company_bp.route('/company/vehicles/<int:vehicle_id>', methods=['DELETE'])
@jwt_required()
def delete_vehicle(vehicle_id):
    # Get the current user ID from the JWT token
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Check if the current user is a company admin
    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    # Check if the user has a company associated with them
    if not current_user.company:
        return jsonify({'message': 'No company associated with this admin'}), 400

    # Fetch the company ID
    company_id = current_user.company[0].id

    # Fetch the vehicle to delete
    vehicle = Vehicle.query.filter_by(id=vehicle_id, company_id=company_id).first()

    # Check if the vehicle exists
    if not vehicle:
        return jsonify({'message': 'Vehicle not found or not associated with your company'}), 404

    # Delete the vehicle
    db.session.delete(vehicle)
    db.session.commit()

    return jsonify({'message': 'Vehicle deleted successfully'}), 200

# --------------------------------VEHICLES --------------------------------