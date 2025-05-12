# from flask.cli import with_appcontext
# from server.app import create_app
# from server.extensions import db
# from server.models.user import User
# from datetime import datetime

# app = create_app()

# @app.cli.command("seed-users")
# @with_appcontext
# def seed_users():
#     users = [
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='superadmin',created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='superadmin',created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='companyadmin',company_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='companyadmin',company_id=2,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='companyadmin',company_id=3,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='companyadmin',company_id=4,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='companyadmin',company_id=5,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='stationadmin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
#         User(first_name='Alice',last_name='Kiprotich',email='alice@example.com',phone_number='0712345678',role='admin',company_id=1,station_id=1,created_at=datetime.now(),updated_at=datetime.now()),
 

#     ]

#     # Set passwords for all users
#     for user in users:
#         user.set_password('password123')  # default password

#     db.session.bulk_save_objects(users)
#     db.session.commit()
#     print("✅ Users seeded successfully.")


from flask.cli import with_appcontext
from server.app import create_app
from server.extensions import db
from server.models.user import User
from server.models.company import Company
from server.models.station import Station
from server.models.driver import Driver
from datetime import datetime

app = create_app()

@app.cli.command("seed-users")
@with_appcontext
def seed_users():
    # Create the superadmin
    superadmin = User(
        first_name='Super',
        last_name='Admin',
        email='superadmin@example.com',
        phone_number='0700000000',
        role='superadmin',
        company_id=None,  # Superadmin has no company
        station_id=None,  # Superadmin has no station
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    superadmin.set_password('superadmin123')

    # Create 4 companies
    companies = []
    for i in range(1, 5):
        company = Company(name=f'Company {i}')
        companies.append(company)
        db.session.add(company)

    db.session.commit()

    # Create 4 company admins, each associated with a company
    companyadmins = []
    for i, company in enumerate(companies):
        companyadmin = User(
            first_name=f'CompanyAdmin{i+1}',
            last_name='Admin',
            email=f'companyadmin{i+1}@example.com',
            phone_number=f'071234567{i+1}',
            role='companyadmin',
            company_id=company.id,
            station_id=None,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        companyadmin.set_password('companyadmin123')
        companyadmins.append(companyadmin)
        db.session.add(companyadmin)

        # Create 4 station admins for each company
        for j in range(1, 5):
            station = Station(name=f'Station {i+1}-{j}', company_id=company.id)
            db.session.add(station)

            stationadmin = User(
                first_name=f'StationAdmin{i+1}-{j}',
                last_name='Admin',
                email=f'stationadmin{i+1}-{j}@example.com',
                phone_number=f'072345678{j}',
                role='stationadmin',
                company_id=company.id,
                station_id=station.id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            stationadmin.set_password('stationadmin123')
            db.session.add(stationadmin)

            # Create 4 drivers for each company
            for k in range(1, 5):
                driver = Driver(
                    first_name=f'Driver{i+1}-{j}-{k}',
                    last_name='Driver',
                    phone_number=f'073456789{k}',
                    company_id=company.id,
                    station_id=station.id
                )
                db.session.add(driver)

#     db.session.commit()

#     # Add the superadmin last so it doesn't conflict with companyadmins
#     db.session.add(superadmin)
#     db.session.commit()

#     print("✅ Users, companies, stations, and drivers seeded successfully.")
