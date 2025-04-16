from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from server import db
from server.models.company import Company
from server.models.county import County
from server.models.user import User
from server.routes.superadmin import superadmin_bp
from sqlalchemy.orm import joinedload

# Revoke superadmin account
@superadmin_bp.route('/superadmin/revoke/<int:user_id>', methods=['POST'])
@jwt_required()
def revoke_superadmin(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user or current_user.role != 'superadmin':
        return jsonify({'message': 'Permission denied'}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.role != 'superadmin':
        return jsonify({"error": "User is not a superadmin"}), 400

    # Revoke superadmin status
    user.role = ''  # Change this to a suitable role
    user.superadmin = False 
   
    user.is_active = False 

    db.session.commit()
    
    return jsonify({'message': 'Superadmin account revoked successfully'}), 200


@superadmin_bp.route('/superadmin/company/create', methods=['POST'])
@jwt_required()
def create_company_and_admin():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'superadmin':
        return jsonify({'error': 'Permission denied.'}), 403

    data = request.get_json()

    required_fields = ['name', 'email', 'phone_number', 'address', 'first_name', 'last_name', 'password']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400

    existing_company = Company.query.filter_by(email=data['email']).first()
    if existing_company:
        return jsonify({'error': 'A company with this email already exists.'}), 400

    existing_company_by_phone = Company.query.filter_by(phone_number=data['phone_number']).first()
    if existing_company_by_phone:
        return jsonify({'error': 'A company with this phone number already exists.'}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'A user with this email already exists.'}), 400

    new_company = Company(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        address=data['address']
    )
    db.session.add(new_company)
    db.session.commit()

    new_admin = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=new_company.email,
        phone_number=new_company.phone_number,
        password=data['password'],
        role='companyadmin',
        company_id=new_company.id 
    )

    new_admin.set_password(data['password'])
    db.session.add(new_admin)
    db.session.commit()

    new_company.admins.append(new_admin)
    db.session.commit()

    return jsonify({'message': f"Company '{new_company.name}' and admin created successfully."}), 201

# # fetch coy by id
@superadmin_bp.route('/superadmin/company/<int:id>', methods=['GET'])
@jwt_required()
def get_company_by_id_with_admins(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'superadmin':
        return jsonify({'message': 'Permission denied'}), 403


    company = Company.query.filter(Company.id == id).first()

    if not company:
        return jsonify({'message': 'company not found'}), 404

    admins = [{
        'id': admin.id,
        'first_name': admin.first_name,
        'last_name': admin.last_name,
        'email': admin.email,
        'phone_number': admin.phone_number
    } for admin in company.admins]

    return jsonify({
        'id': company.id,
        'name': company.name,
        'address': company.address,
        'created_at': company.created_at,
        'updated_at': company.updated_at,
        'admins': admins
    }), 200


# view all companies
@superadmin_bp.route('/superadmin/companies', methods=['GET'])
@jwt_required()
def get_all_companies_with_admins():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or current_user.role != 'superadmin':
        return jsonify({'message': 'Permission denied'}), 403

    companies_query = Company.query.options(joinedload(Company.admins)).all()

    result = []
    for company in companies_query:
        company_data = {
            'id': company.id,
            'name': company.name,
            'email': company.email,
            'address': company.address,
            'created_at': company.created_at,
            'updated_at': company.updated_at,
            'admins': [
                {
                    'id': admin.id,
                    'first_name': admin.first_name,
                    'last_name': admin.last_name,
                    'email': admin.email,
                    'phone_number': admin.phone_number,
                }
                for admin in company.admins
            ],
        }
        result.append(company_data)

    return jsonify({
        'companies': result,
    }), 200

    # delete company
@superadmin_bp.route('/superadmin/company/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_company_by_id(id):
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        if not current_user or current_user.role != 'superadmin':
            return jsonify({'message': 'Permission denied'}), 403

        company = Company.query.filter(Company.id == id).first()

        if not company:
            return jsonify({'message': 'Company not found'}), 404

        db.session.delete(company)
        db.session.commit()

        return jsonify({'message': 'Company deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred while deleting the company', 'error': str(e)}), 500
# create county
@superadmin_bp.route('/county', methods=['POST'])
def create_county():
    data = request.get_json()

    if not isinstance(data, list):
        return jsonify({"message": "Expected a list of counties"}), 400

    created_counties = []

    for item in data:
        if 'name' not in item or not item['name']:
            return jsonify({"message": "Each county must have a 'name'"}), 400

        county = County(name=item['name'])
        db.session.add(county)
        created_counties.append(county)

    db.session.commit()

    return jsonify([
        {
            "id": county.id,
            "name": county.name
        } for county in created_counties
    ]), 201


# get county
@superadmin_bp.route('/county', methods=['GET'])
def get_counties():
    try:
        counties = County.query.all()
        counties_data = [{'id': county.id, 'name': county.name} for county in counties]
        return jsonify(counties_data), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500
