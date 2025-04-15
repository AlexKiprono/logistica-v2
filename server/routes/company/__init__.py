
from flask import Blueprint

# Create the Blueprint
company_bp = Blueprint('company_bp', __name__)

# Import routes
from server.routes.company import drivers,routes,schedules,stations,vehicles
