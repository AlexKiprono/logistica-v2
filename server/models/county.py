from server import db

class County(db.Model):
    __tablename__ = 'county'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    stations = db.relationship('Station', back_populates='county')
        # Relationships
    departure_routes = db.relationship('Route', foreign_keys='Route.departure_id', back_populates='departure_county')
    arrival_routes = db.relationship('Route', foreign_keys='Route.arrival_id', back_populates='arrival_county')