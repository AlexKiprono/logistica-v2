from datetime import datetime
from random import choices
import string
from server import db

class Parcel(db.Model):
    __tablename__ = 'parcel'

    id = db.Column(db.Integer, primary_key=True)
    tracking_code = db.Column(db.String(100), unique=True, nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pickup_station_id = db.Column(db.Integer, db.ForeignKey('station.id'), nullable=False)
    dropoff_station_id = db.Column(db.Integer, db.ForeignKey('station.id'), nullable=False)
    sender_name = db.Column(db.String(100), nullable=False)
    receiver_name = db.Column(db.String(100), nullable=False)
    receiver_phone = db.Column(db.String(15), nullable=False)
    weight = db.Column(db.Float, nullable=True)
    delivery_fee = db.Column(db.Float, nullable=True)
    is_published = db.Column(db.Boolean, default=False)
    is_delivered = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default="pending")
    payment_status = db.Column(db.String(50), default="pending")
    payment_amount = db.Column(db.Float, nullable=True)
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
    
def generate_tracking_code():
    return ''.join(choices(string.ascii_uppercase + string.digits, k=10))

def generate_unique_tracking_code():
    code = generate_tracking_code()
    while Parcel.query.filter_by(tracking_code=code).first():
        code = generate_tracking_code()
    return code

def publish_parcel(parcel: Parcel):
    if not parcel.tracking_code:
        parcel.tracking_code = generate_unique_tracking_code()
    parcel.is_published = True
    parcel.status = "in transit"
    db.session.commit()