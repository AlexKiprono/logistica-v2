
from flask import Blueprint

# Create the Blueprint
superadmin_bp = Blueprint('superadmin_bp', __name__)

# Import routes
from server.routes.superadmin import superadmin
