import pyotp
import redis
from server.extensions import mail
from flask_mail import Message

redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)
otp_secret = pyotp.random_base32()
otp_server = pyotp.TOTP(otp_secret)

# OTP storage
otp_storage = {}

def generate_otp():
    totp = pyotp.TOTP("base32secret3232", interval=300)
    return totp.now()

def send_otp(email, otp):
    msg = Message('One-Time Password (OTP)', sender='lexiekiprono@gmail.com', recipients=[email])
    msg.body = f'Your one-time password is {otp}. Please use it within 30 minutes.'
    mail.send(msg)
