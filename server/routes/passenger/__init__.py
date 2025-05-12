
from flask import Blueprint

# Create the Blueprint
passenger_bp = Blueprint('passenger_bp', __name__)

# Import routes
from server.routes.passenger import passenger,parcel
