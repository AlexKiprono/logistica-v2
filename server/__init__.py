from flask import Flask
from server.config import Config
from server.extensions import db, migrate, bcrypt, jwt, mail, cors



def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Mail configuration
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_TLS=False,
        MAIL_USE_SSL=True,
        MAIL_USERNAME='lexiekiprono@gmail.com',
        MAIL_PASSWORD='zdmh rich qndr wrgx',
        MAIL_DEFAULT_SENDER='lexiekiprono@gmail.com'
    )
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": ["http://localhost:5173"], "allow_headers": ["Content-Type", "Authorization"], "supports_credentials": True}})
    
    # Import models 
    from .models.user import User
    from .models.vehicle import Vehicle
    from .models.station import Station
    from .models.route import Route
    from .models.schedule import Schedule
    from .models.ticket import Ticket
    from .models.parcel import Parcel
    from .models.parceldelivery import ParcelDelivery
    from .models.company import Company
    from .models.driver import Driver
    from .models.invitation import Invitation
    from .models.notification import Notification
    from .models.payment import Payment
    from .models.paymentticket import PaymentTicket
    from .models.county import County
    from .models.route_station import route_station

    # Import and register routes 
    from server.routes.auth import auth_bp
    from server.routes.superadmin import superadmin_bp
    from server.routes.company import company_bp
    from server.routes.passenger import passenger_bp
    from server.routes.parcels import parcel_bp
    from server.routes.station import station_bp

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(superadmin_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(passenger_bp)
    app.register_blueprint(parcel_bp)
    app.register_blueprint(station_bp)
    
    
    return app
