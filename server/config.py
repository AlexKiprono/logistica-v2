
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    # Get the path to the 'server' directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # Construct the path to the database file
    DB_PATH = os.path.join(BASE_DIR, 'instance', 'transport.db')
    
    # Ensure the 'instance' directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{DB_PATH}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-secret'
    
    COUNTY = (
[
  {"id": "1", "name": "Mombasa", "lat": -4.0435, "lng": 39.6682},
  {"id": "2", "name": "Kwale", "lat": -4.1737, "lng": 39.4521},
  {"id": "3", "name": "Kilifi", "lat": -3.6305, "lng": 39.8499},
  {"id": "4", "name": "Tana River", "lat": -2.2717, "lng": 40.3089},
  {"id": "5", "name": "Lamu", "lat": -2.2717, "lng": 40.9020},
  {"id": "6", "name": "Taita-Taveta", "lat": -3.3160, "lng": 38.4850},
  {"id": "7", "name": "Garissa", "lat": -0.4532, "lng": 39.6461},
  {"id": "8", "name": "Wajir", "lat": 1.7471, "lng": 40.0573},
  {"id": "9", "name": "Mandera", "lat": 3.9373, "lng": 41.8569},
  {"id": "10", "name": "Marsabit", "lat": 2.3361, "lng": 37.9908},
  {"id": "11", "name": "Isiolo", "lat": 0.3546, "lng": 37.5822},
  {"id": "12", "name": "Meru", "lat": 0.0463, "lng": 37.6559},
  {"id": "13", "name": "Tharaka-Nithi", "lat": -0.3087, "lng": 37.6580},
  {"id": "14", "name": "Embu", "lat": -0.5395, "lng": 37.4574},
  {"id": "15", "name": "Kitui", "lat": -1.3670, "lng": 38.0106},
  {"id": "16", "name": "Machakos", "lat": -1.5201, "lng": 37.2634},
  {"id": "17", "name": "Makueni", "lat": -1.8039, "lng": 37.6203},
  {"id": "18", "name": "Nyandarua", "lat": -0.4022, "lng": 36.6030},
  {"id": "19", "name": "Nyeri", "lat": -0.4201, "lng": 36.9476},
  {"id": "20", "name": "Kirinyaga", "lat": -0.6591, "lng": 37.3827},
  {"id": "21", "name": "Murang'a", "lat": -0.7210, "lng": 37.1526},
  {"id": "22", "name": "Kiambu", "lat": -1.1714, "lng": 36.8355},
  {"id": "23", "name": "Turkana", "lat": 3.1112, "lng": 35.5978},
  {"id": "24", "name": "West Pokot", "lat": 1.6218, "lng": 35.3905},
  {"id": "25", "name": "Samburu", "lat": 1.2151, "lng": 36.9541},
  {"id": "26", "name": "Trans Nzoia", "lat": 1.0567, "lng": 34.9507},
  {"id": "27", "name": "Uasin Gishu", "lat": 0.5178, "lng": 35.2698},
  {"id": "28", "name": "Elgeyo-Marakwet", "lat": 0.7806, "lng": 35.6343},
  {"id": "29", "name": "Nandi", "lat": 0.1836, "lng": 35.1269},
  {"id": "30", "name": "Baringo", "lat": 0.4658, "lng": 35.9643},
  {"id": "31", "name": "Laikipia", "lat": 0.3606, "lng": 36.7819},
  {"id": "32", "name": "Nakuru", "lat": -0.3031, "lng": 36.0800},
  {"id": "33", "name": "Narok", "lat": -1.0783, "lng": 35.8601},
  {"id": "34", "name": "Kajiado", "lat": -1.8524, "lng": 36.7768},
  {"id": "35", "name": "Kericho", "lat": -0.3698, "lng": 35.2863},
  {"id": "36", "name": "Bomet", "lat": -0.7813, "lng": 35.3418},
  {"id": "37", "name": "Kakamega", "lat": 0.2827, "lng": 34.7515},
  {"id": "38", "name": "Vihiga", "lat": 0.0549, "lng": 34.6851},
  {"id": "39", "name": "Bungoma", "lat": 0.5635, "lng": 34.5605},
  {"id": "40", "name": "Busia", "lat": 0.4608, "lng": 34.1115},
  {"id": "41", "name": "Siaya", "lat": -0.0623, "lng": 34.2878},
  {"id": "42", "name": "Kisumu", "lat": -0.1022, "lng": 34.7617},
  {"id": "43", "name": "Homa Bay", "lat": -0.5273, "lng": 34.4571},
  {"id": "44", "name": "Migori", "lat": -1.0634, "lng": 34.4731},
  {"id": "45", "name": "Kisii", "lat": -0.6773, "lng": 34.7796},
  {"id": "46", "name": "Nyamira", "lat": -0.5633, "lng": 34.9359},
  {"id": "47", "name": "Nairobi", "lat": -1.2833, "lng": 36.8167}
]
    )
