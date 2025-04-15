# # OTP verification endpoint
from flask import jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from server import jwt
from server import db
from server.models.user import User
from server.utils.otp import send_otp,otp_server,otp_storage,redis_client
from . import auth_bp

@auth_bp.route('/auth/verify', methods=['POST'])
@jwt_required()
def verify_user():
    user_id = get_jwt_identity()
    otp = request.json.get('otp')

    # Validate OTP
    stored_otp = redis_client.get(f"otp:{user_id}")
    if stored_otp and stored_otp.decode() == otp:
        redis_client.delete(f"otp:{user_id}")  # Remove OTP after successful validation
        return jsonify({'message': 'OTP verified successfully'}), 200

    return jsonify({'message': 'Invalid OTP'}), 400
    
    
blacklist = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in blacklist

def revoke_token(jti):
    """Add a token's jti to the blacklist."""
    blacklist.add(jti)

def is_token_revoked(jti):
    """Check if a token's jti is in the blacklist."""
    return jti in blacklist

@auth_bp.route('/auth/signup',  methods=['POST'])
def signup():
    data = request.get_json()
    
    required_fields = ['first_name', 'last_name', 'email', 'phone_number', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field.capitalize()} is required.'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    if User.query.filter_by(phone_number=data['phone_number']).first():
        return jsonify({'message': 'Phone number already exists'}), 400

    if len(data['password']) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long.'}), 400

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        role='passenger'
    )
    
    new_user.set_password(data['password']) 

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

# register_auth
@auth_bp.route('/auth/register',  methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate request data
    required_fields = ['first_name', 'last_name', 'email', 'phone_number', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field.capitalize()} is required.'}), 400

    # Check if email or phone number already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    if User.query.filter_by(phone_number=data['phone_number']).first():
        return jsonify({'message': 'Phone number already exists'}), 400

    # Password validation
    if len(data['password']) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long.'}), 400

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        role='superadmin'
    )
    
    new_user.set_password(data['password']) 

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

# Login
@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if 'password' not in data:
        return jsonify({'message': 'Password is required'}), 400
    
    user = None
    if 'email' in data:
        user = User.query.filter_by(email=data['email']).first()
    elif 'phone_number' in data:
        user = User.query.filter_by(phone_number=data['phone_number']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'role': user.role,
            'message': 'Login successful'
        }), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

# update
@auth_bp.route('/auth/update/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404

    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403

    # Update user data with provided fields
    for field in data:
        if hasattr(user, field):
            setattr(user, field, data[field])

    db.session.commit()
    
    return jsonify({'message': 'User updated successfully'}), 200


#sign out
@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logged out successfully'})
    response.set_cookie('access_token', '', expires=0)
    response.set_cookie('refresh_token', '', expires=0)
    return response

# def logout():
#     jti = get_jwt()["jti"]
#     revoke_token(jti)
#     return {"msg": "Token revoked"}, 200

# # get user info
@auth_bp.route('/auth/current_user', methods=['GET'])
@jwt_required()
def get_user_info():
    print("Current user endpoint hit!") 
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'role': user.role
        }
    }), 200


# # forgot password
@auth_bp.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if 'email' not in data:
        return jsonify({'message': 'Email is required'}), 400
        
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Generate a new OTP
    new_otp = otp_server.now()
    otp_storage[user.email] = new_otp

    # Send OTP via email
    send_otp(user.email, new_otp)

    return jsonify({'message': 'OTP sent successfully'}), 200


# # reset password
@auth_bp.route('/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if 'email' not in data or 'otp' not in data or 'new_password' not in data:
        return jsonify({'message': 'Email, OTP and new password are required'}), 400
        
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    otp = data['otp']
    
    if otp_storage.get(user.email, None) == otp:
        
        # Delete OTP from storage after successful verification
        del otp_storage[user.email]
        
        user.set_password(data['new_password'])
        db.session.commit()

        return jsonify({'message': 'Password reset successfully'}), 200
    
    else:
        return jsonify({'message': 'Invalid OTP'}), 401