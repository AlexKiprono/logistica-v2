from datetime import datetime
from server import db
from sqlalchemy.orm import validates

class Station(db.Model):
    __tablename__ = 'station'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    name = db.Column(db.String, nullable=False)
    county_id = db.Column(db.Integer, db.ForeignKey('county.id'))
    address = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)


    # Relationships
    admin = db.relationship("User", back_populates='station')
    company = db.relationship("Company", back_populates="stations")
    county = db.relationship("County", back_populates="stations")
    routes = db.relationship("Route", secondary="route_station", back_populates="stations")
    parcel_pickups = db.relationship(
        "Parcel",
        back_populates="pickup_station",
        foreign_keys="[Parcel.pickup_station_id]"
    )
    parcel_dropoffs = db.relationship(
        "Parcel",
        back_populates="dropoff_station",
        foreign_keys="[Parcel.dropoff_station_id]"
    )
    invitations = db.relationship('Invitation', back_populates='station')

    # Validation for inputs
    @validates('name')
    def validate_name(self, key, value):
        if not value or not value.strip():
            raise ValueError("Station name cannot be empty")
        if len(value) > 255:
            raise ValueError("Station name must be less than 255 characters")
        return value.strip()
    