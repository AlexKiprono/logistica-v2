from datetime import datetime
from server import db

class Parcel(db.Model):
    __tablename__ = 'parcel'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pickup_station_id = db.Column(db.Integer, db.ForeignKey('station.id'), nullable=False)
    dropoff_station_id = db.Column(db.Integer, db.ForeignKey('station.id'), nullable=False)
    sender_name = db.Column(db.String(100), nullable=False)
    receiver_name = db.Column(db.String(100), nullable=False)
    receiver_phone = db.Column(db.String(15), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    delivery_fee = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="pending")
    payment_status = db.Column(db.String(50), default="pending")
    payment_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    company = db.relationship("Company", back_populates="parcels")
    pickup_station = db.relationship(
        "Station",
        back_populates="parcel_pickups",
        foreign_keys=[pickup_station_id]
    )
    dropoff_station = db.relationship(
        "Station",
        back_populates="parcel_dropoffs",
        foreign_keys=[dropoff_station_id]
    )
    sender = db.relationship("User", back_populates="parcels")