from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.models.parcel import Parcel
from server.models.user import User
from . import station_bp
from server import db


@station_bp.route('/pickup-parcels', methods=['GET'])
@jwt_required()
def get_pickup_parcels():
    current_user = User.query.get(get_jwt_identity())
    if current_user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized'}), 403

    parcels = Parcel.query.filter_by(pickup_station_id=current_user.station, is_published=False).all()
    return jsonify([{
        'id': p.id,
        'sender_name': p.sender_name,
        'receiver_name': p.receiver_name,
        'tracking_code': p.tracking_code
    } for p in parcels])

@station_bp.route('/publish-parcel/<int:parcel_id>', methods=['PATCH'])
@jwt_required()
def publish_parcel(parcel_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized'}), 403

    parcel = Parcel.query.get_or_404(parcel_id)
    if parcel.pickup_station_id != current_user.station_id:
        return jsonify({'error': 'Not your parcel'}), 403

    parcel.status = 'in transit'
    parcel.is_published = True
    db.session.commit()

    return jsonify({'message': 'Parcel published and in transit'})

@station_bp.route('/dropoff-parcels', methods=['GET'])
@jwt_required()
def get_dropoff_parcels():
    current_user = User.query.get(get_jwt_identity())
    if current_user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized'}), 403

    parcels = Parcel.query.filter_by(dropoff_station_id=current_user.station_id, status='in transit').all()
    return jsonify([{
        'id': p.id,
        'tracking_code': p.tracking_code,
        'receiver_name': p.receiver_name
    } for p in parcels])

@station_bp.route('/complete-parcel/<tracking_code>', methods=['PATCH'])
@jwt_required()
def complete_parcel(tracking_code):
    current_user = User.query.get(get_jwt_identity())
    if current_user.role != 'stationadmin':
        return jsonify({'error': 'Unauthorized'}), 403

    parcel = Parcel.query.filter_by(tracking_code=tracking_code).first_or_404()
    if parcel.dropoff_station_id != current_user.station_id:
        return jsonify({'error': 'Not your parcel'}), 403

    parcel.status = 'completed'
    parcel.is_delivered = True
    db.session.commit()

    return jsonify({'message': 'Parcel delivery confirmed'})

