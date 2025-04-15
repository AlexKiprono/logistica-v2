import re
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.orm import validates
from datetime import time
from sqlalchemy import Time
from server import db,bcrypt

class County(db.Model):
    __tablename__ = 'county'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    stations = db.relationship('Station', back_populates='county')
        # Relationships
    departure_routes = db.relationship('Route', foreign_keys='Route.departure_id', back_populates='departure_county')
    arrival_routes = db.relationship('Route', foreign_keys='Route.arrival_id', back_populates='arrival_county')