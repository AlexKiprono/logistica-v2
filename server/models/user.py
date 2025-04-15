import re
from datetime import datetime
from server import db,bcrypt

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False, index=True)
    role = db.Column(db.String(50), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    station = db.relationship('Station', back_populates='admin')
    company = db.relationship("Company", secondary='company_admin', back_populates="admins")
    driver_profile = db.relationship("Driver", uselist=False, back_populates="user")
    tickets = db.relationship("Ticket", back_populates="passenger")
    parcels = db.relationship("Parcel", back_populates="sender")
    payments = db.relationship('Payment', back_populates='user')
    notifications = db.relationship('Notification', back_populates='user')

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'
    
    def set_password(self, password):
        """Hashes the password and sets the password field."""
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        
    def check_password(self, password):
        """Checks if the provided password matches the stored password hash."""
        return bcrypt.check_password_hash(self.password, password)
    