
from flask import Blueprint

# Create the Blueprint
station_bp = Blueprint('station_bp', __name__)

# Import routes
from server.routes.station import station,parcel