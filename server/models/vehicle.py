from datetime import datetime
from server import db

class Vehicle(db.Model):
    __tablename__ = 'vehicle'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    license_plate = db.Column(db.String(20), unique=True, nullable=False, index=True)
    vehicle_type = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), default="active")
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    company = db.relationship("Company", back_populates="vehicles")
    parcel_deliveries = db.relationship("ParcelDelivery", back_populates="vehicle")
    drivers = db.relationship("Driver", back_populates="vehicle")

    def revoke_driver(self, driver):
        if driver.assigned_vehicle_id == self.id:
            driver.assigned_vehicle_id = None
            driver.status = 'inactive'
            self.status = 'available'  
            db.session.commit()
            return True
        return False
    