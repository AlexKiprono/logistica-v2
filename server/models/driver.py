from datetime import datetime
from server import db

class Driver(db.Model):
    __tablename__ = 'driver'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    license_number = db.Column(db.String, unique=True, nullable=False)
    license_expiry = db.Column(db.DateTime, nullable=False)
    assigned_vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))
    status = db.Column(db.String(50), default="inactive")
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    user = db.relationship("User", back_populates="driver_profile")
    vehicle = db.relationship("Vehicle", back_populates="drivers")
    schedules = db.relationship("Schedule", back_populates="driver")  

    # Ensure a driver is assigned to only one vehicle
    def assign_to_vehicle(self, vehicle):
        if self.assigned_vehicle_id is not None:
            return False
        
        if vehicle.status == 'in use':
            return False
        
        self.assigned_vehicle_id = vehicle.id
        self.status = 'active'
        vehicle.status = 'in use'
        
        db.session.commit()
        return True