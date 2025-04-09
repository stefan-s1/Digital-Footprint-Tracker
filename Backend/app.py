from flask import Flask, request,send_from_directory
from flask_socketio import SocketIO, emit, disconnect
from flask_limiter import Limiter
from flask_cors import CORS
from flask_talisman import Talisman
from flask_limiter.util import get_remote_address
import os
from main import perform_search
import traceback
import bleach
from logging.handlers import RotatingFileHandler
import logging

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder='../person-search/build/static', template_folder='../person-search/build')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') 
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit payload size

# Security Headers
Talisman(app) #This sets headers like, enforces HTTPS, Strict-Transport-Security, X-Content-Type-Options, X-XSS-Protection, and more.

# CORS Configuration
#CORS(app, resources={r"/*": {"origins": "https://yourdomain.com"}})

#socketio = SocketIO(app, cors_allowed_origins="https://yourdomain.com", async_mode='threading', ping_timeout=300, ping_interval=25)
socketio = SocketIO(app, async_mode='threading', ping_timeout=300, ping_interval=25)

#Rate Limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Set up logging
handler = RotatingFileHandler('logs/app.log', maxBytes=100000, backupCount=3)
handler.setLevel(logging.INFO)
formatter = logging.Formatter(
    '%(asctime)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)
app.logger.addHandler(handler)


@app.before_request
def log_request_info():
    if request.endpoint == 'handle_start_search':
        name = request.json.get('name', '')
        optional_info = request.json.get('optional_info', [])
        app.logger.info(f"Search requested: name='{name}', optional_info={optional_info}")


@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

@socketio.on('start_search')
@limiter.limit("5 per hour")
def handle_start_search(data):
    name = data.get('name')
    optional_info = data.get('optional_info', [])

    # Sanitize user inputs (done automatically in React)
    name = bleach.clean(name)
    optional_info = [bleach.clean(info) for info in optional_info]

    session_id = request.sid

    # Start the search in a background thread
    socketio.start_background_task(target=background_search, session_id=session_id, name=name, optional_info=optional_info)

def background_search(session_id, name, optional_info):
    def progress_callback(log_message):
        socketio.emit('progress', {'message': log_message}, room=session_id)
    try:
        results = perform_search(name, optional_info, progress_callback=progress_callback)

        if results is None:
            socketio.emit('error', {'message': 'No meaningful information found.'}, room=session_id)
        else:
            # Convert list of tuples to list of dictionaries
            summaries = [{'summary': summary, 'url': url} for summary, url in results]
            print(f"Emitting 'results' event to session {session_id}")
            socketio.emit('results', summaries, room=session_id)
    except Exception as e:
        socketio.emit('error', {'message': 'An error occurred during the search.'}, room=session_id)
        print(f"An error occurred: {e}")
        traceback.print_exc()

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    elif path != "" and os.path.exists(os.path.join(app.template_folder, path)):
        return send_from_directory(app.template_folder, path)
    else:
        return send_from_directory(app.template_folder, 'index.html')

if __name__ == "__main__":
    socketio.run(app, debug=True)
