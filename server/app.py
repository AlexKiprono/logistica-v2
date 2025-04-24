import os
from flask import jsonify, request
from server import create_app
from flask_socketio import SocketIO

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def health_check():
    return jsonify({"status": "healthy", "database": "SQLite"})

if __name__ == '__main__':
    socketio.run(
        app,
        host='0.0.0.0',
        port=5000,
        debug=True,
        use_reloader=True  # 👈 Enables auto-reload
    )
