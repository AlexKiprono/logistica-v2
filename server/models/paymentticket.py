from datetime import datetime
from server import db

class PaymentTicket(db.Model):
    __tablename__ = 'payment_tickets'

    # Composite primary key using both payment_id and ticket_id
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'), primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), primary_key=True)

    # Relationship back to Payment and Ticket
    payment = db.relationship('Payment', back_populates='tickets')
    ticket = db.relationship('Ticket', back_populates='payment_tickets')

    def __repr__(self):
        return f"<PaymentTicket PaymentID: {self.payment_id}, TicketID: {self.ticket_id}>"
