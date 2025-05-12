from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.models.parcel import Parcel, generate_unique_tracking_code
from server.models.user import User
from . import station_bp
from server import db

@station_bp.route('/pickupstation/parcels', methods=['GET'])
@jwt_required()
def get_pickup_station_parcels():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized access'}), 403

    parcels = Parcel.query.filter_by(
        pickup_station_id=user.station_id,
        is_published=False
    ).all()

    return jsonify([{
        'id': p.id,
        'sender_name': p.sender_name,
        'receiver_name': p.receiver_name,
        'receiver_phone': p.receiver_phone,
        'pickup_station_id': p.pickup_station_id,
        'dropoff_station_id': p.dropoff_station_id,
        'weight': p.weight,
        'delivery_fee': p.delivery_fee,
        'payment_amount': p.payment_amount,
    } for p in parcels])


@station_bp.route('/pickupstation/parcels/<int:parcel_id>/publish', methods=['PUT'])
@jwt_required()
def publish_parcel_by_pickup_station(parcel_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized access'}), 403

    parcel = Parcel.query.get(parcel_id)

    if not parcel or parcel.pickup_station_id != user.station_id:
        return jsonify({'error': 'Parcel not found or unauthorized action'}), 404

    try:
        if 'weight' in data:
            parcel.weight = float(data.get('weight', parcel.weight))
        if 'delivery_fee' in data:
            parcel.delivery_fee = float(data.get('delivery_fee', parcel.delivery_fee))
        if 'payment_amount' in data:
            parcel.payment_amount = float(data.get('payment_amount', parcel.payment_amount))

        if not parcel.tracking_code:
            parcel.tracking_code = generate_unique_tracking_code()
        parcel.is_published = True
        parcel.status = "in transit"

        db.session.commit()

        return jsonify({'message': 'Parcel published successfully', 'tracking_code': parcel.tracking_code}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@station_bp.route('/dropoffstation/parcels', methods=['GET'])
@jwt_required()
def get_dropoff_station_parcels():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized access'}), 403

    parcels = Parcel.query.filter_by(
        dropoff_station_id=user.station_id,
        is_published=True,
        is_delivered=False
    ).all()

    return jsonify([{
        'id': p.id,
        'tracking_code': p.tracking_code,
        'sender_name': p.sender_name,
        'receiver_name': p.receiver_name,
        'status': p.status
    } for p in parcels])
