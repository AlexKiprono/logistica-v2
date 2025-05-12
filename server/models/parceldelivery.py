from datetime import datetime
from server import db

class ParcelDelivery(db.Model):
    __tablename__ = 'parcel_delivery'
    id = db.Column(db.Integer, primary_key=True)
    parcel_id = db.Column(db.Integer, db.ForeignKey('parcel.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    delivery_status = db.Column(db.String(50), default="pending")
    parcel_details = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    vehicle = db.relationship("Vehicle", back_populates="parcel_deliveries")
    parcel = db.relationship('Parcel', backref='deliveries')


