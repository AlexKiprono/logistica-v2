from server import db

route_station = db.Table('route_station',
    db.Column('route_id', db.Integer, db.ForeignKey('route.id'), primary_key=True),
    db.Column('station_id', db.Integer, db.ForeignKey('station.id'), primary_key=True)
)