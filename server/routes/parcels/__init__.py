
from flask import Blueprint

# Create the Blueprint
parcel_bp = Blueprint('parcel_bp', __name__)

# Import routes
from server.routes.parcels import send_parcel
# from server.routes.parcels import track_parcel
# from server.routes.parcels import cancel_parcel
# from server.routes.parcels import get_parcel_history
# from server.routes.parcels import get_parcel_details
# from server.routes.parcels import get_parcel_cost
# from server.routes.parcels import get_parcel_status
# from server.routes.parcels import get_parcel_location
# from server.routes.parcels import get_parcel_receipt