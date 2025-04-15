from flask import Blueprint

# Create the Blueprint
auth_bp = Blueprint('auth_bp', __name__)

# Import routes so they attach to the blueprint
from server.routes.auth import auth
