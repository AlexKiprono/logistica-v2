from datetime import datetime
from server import db

# Company Model
class Company(db.Model):
    __tablename__ = 'company'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(15), nullable=False, unique=True)
    address = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    admins = db.relationship("User", secondary='company_admin', back_populates="company")
    vehicles = db.relationship("Vehicle", back_populates="company")
    routes = db.relationship("Route", back_populates="company")
    parcels = db.relationship("Parcel", back_populates="company")
    stations = db.relationship("Station", back_populates="company")
    invitations = db.relationship('Invitation', back_populates='company')



company_admin = db.Table('company_admin',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('company_id', db.Integer, db.ForeignKey('company.id'))
)
