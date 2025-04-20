# --------------------------------ROUTES --------------------------------

from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from server.models.route import Route
from server.models.schedule import Schedule
from server.models.user import User
from server import db
from . import company_bp

# create routes
@company_bp.route('/company/routes', methods=['POST'])
@jwt_required()
def create_route():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin' or not current_user.company:
        return jsonify({'message': 'Permission denied or no company associated'}), 403

    data = request.get_json()

    departure_id = data.get('departure_id')
    arrival_id = data.get('arrival_id')
    distance = data.get('distance')

    if not all([departure_id, arrival_id, distance]):
        return jsonify({'message': 'Start location, end location, and distance are required'}), 400
    if departure_id == arrival_id:
        return jsonify({'message': 'Start and end locations cannot be the same'}), 400

    # Check if a route already exists in the direction A -> B
    existing_route = Route.query.filter_by(
        company_id=current_user.company_id,
        departure_id=departure_id,
        arrival_id=arrival_id
    ).first()

    if existing_route:
        return jsonify({'message': 'A route already exists from A to B'}), 400

    # If no route exists in the direction A -> B, check if the reverse route exists (B -> A)
    reverse_route = Route.query.filter_by(
        company_id=current_user.company_id,
        departure_id=arrival_id,
        arrival_id=departure_id
    ).first()

    if reverse_route:
        # If the reverse route exists (B -> A), allow creating A -> B
        route = Route(
            company_id=current_user.company_id,
            departure_id=departure_id,
            arrival_id=arrival_id,
            distance=distance
        )
        db.session.add(route)
        db.session.commit()
        return jsonify({
            'message': 'Route created successfully from A to B (inverse route exists)',
            'route_id': route.id
        }), 201

    # If no route exists, create the new route (A -> B)
    route = Route(
        company_id=current_user.company_id,
        departure_id=departure_id,
        arrival_id=arrival_id,
        distance=distance
    )
    db.session.add(route)
    db.session.commit()

    return jsonify({
        'message': 'Route created successfully from A to B',
        'route_id': route.id
    }), 201

# update a route
@company_bp.route('/company/routes/<int:route_id>', methods=['PUT'])
@jwt_required()
def update_route(route_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    route = Route.query.get(route_id)
    if not route or route.company_id != current_user.company.id:
        return jsonify({'message': 'Route not found or you are not authorized to update this route'}), 404

    data = request.get_json()
    departure_id = data.get('departure_id')
    arrival_id = data.get('arrival_id')
    distance = data.get('distance')

    if departure_id:
        route.departure_id = departure_id
    if arrival_id:
        route.arrival_id = arrival_id
    if distance:
        route.distance = distance

    db.session.commit()

    return jsonify({'message': 'Route updated successfully'}), 200


# delete a route
@company_bp.route('/company/route/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_route(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user:
        return jsonify({'message': 'User not found'}), 404

    if current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400

    route = Route.query.get(id)
    if not route:
        return jsonify({'message': 'Route not found'}), 404

    if route.company_id != current_user.company_id:
        return jsonify({'message': 'You are not authorized to delete this route'}), 403

    try:
        Schedule.query.filter(Schedule.route_id == id).update({Schedule.route_id: None})

        db.session.commit()

        db.session.delete(route)
        db.session.commit()

        return jsonify({'message': 'Route and associated schedules have been deleted or updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500


@company_bp.route('/company/routes', methods=['GET'])
@jwt_required()
def view_routes():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'companyadmin':
        return jsonify({'message': 'Permission denied'}), 403

    if not current_user.company:
        return jsonify({'message': 'No Company associated with this admin'}), 400
    
    company = current_user.company_id

    # Get all routes for the company
    routes = Route.query.filter_by(company_id=company).all()

    # Prepare the response
    routes_data = []
    for route in routes:
        routes_data.append({
            'id': route.id,
            'departure_id': route.departure_id,
            'departure_county_name': route.departure_county.name,  # assuming County model has 'name'
            'arrival_id': route.arrival_id,
            'arrival_county_name': route.arrival_county.name,  # assuming County model has 'name'
            'distance': route.distance,
            'created_at': route.created_at,
            'updated_at': route.updated_at
        })
    
    return jsonify({'routes': routes_data}), 200




# --------------------------------ROUTES --------------------------------
