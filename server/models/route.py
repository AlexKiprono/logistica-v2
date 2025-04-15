from datetime import datetime
from server import db

class Route(db.Model):
    __tablename__ = 'route'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    departure_id = db.Column(db.Integer, db.ForeignKey('county.id'))
    arrival_id = db.Column(db.Integer, db.ForeignKey('county.id'))
    distance = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    company = db.relationship("Company", back_populates="routes")
    schedules = db.relationship("Schedule", back_populates="route", cascade="all, delete-orphan")
    stations = db.relationship("Station", secondary="route_station", back_populates="routes")
    departure_county = db.relationship("County", foreign_keys=[departure_id], back_populates="departure_routes")
    arrival_county = db.relationship("County", foreign_keys=[arrival_id], back_populates="arrival_routes")
    