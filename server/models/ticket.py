from datetime import datetime
from server import db

class Ticket(db.Model):
    __tablename__ = 'ticket'

    id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    passenger_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    booking_date = db.Column(db.DateTime, default=datetime.now)
    status = db.Column(db.String(50), default="booked")  # e.g., 'booked', 'cancelled', etc.
    payment_status = db.Column(db.String(50), default="pending")  # e.g., 'pending', 'success', 'failed'
    payment_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
 
    # Relationships
    schedule = db.relationship("Schedule", back_populates="tickets")
    passenger = db.relationship("User", back_populates="tickets")
    payment_tickets = db.relationship('PaymentTicket', back_populates='ticket', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Ticket {self.id}, Amount: {self.payment_amount}, Status: {self.payment_status}>"

    def total_amount(self):
        """Returns the total amount for the ticket, considering payment status."""
        if self.payment_status == "success":
            return self.payment_amount
        return 0
