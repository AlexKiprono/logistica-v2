from datetime import datetime
from server import db

class Payment(db.Model):
    __tablename__ = 'payment'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # e.g., 'mpesa', 'cash'
    payment_status = db.Column(db.String(50), default="pending")  # 'success', 'failed', 'pending'
    transaction_id = db.Column(db.String(100), nullable=True)  # e.g., M-Pesa transaction ID
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship("User", back_populates="payments")
    tickets = db.relationship('PaymentTicket', back_populates='payment', lazy=True)

    def __repr__(self):
        return f"<Payment {self.id}, Amount: {self.amount}, Status: {self.payment_status}>"

    def process_payment(self, ticket, amount_paid):
        """Updates the payment status and links it to the ticket."""
        if self.amount == amount_paid:
            self.payment_status = "success"
            ticket.payment_status = "success"
        else:
            self.payment_status = "failed"
            ticket.payment_status = "failed"
        db.session.commit()