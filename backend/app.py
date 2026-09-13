import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db


def create_app():
    app = Flask(__name__)

    # Database
    base_dir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(base_dir, 'mobility360.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB upload limit

    # Upload folder for report images
    upload_dir = os.path.join(base_dir, 'uploads')
    os.makedirs(upload_dir, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = upload_dir

    # CORS — allow Vite dev server
    CORS(app, origins=['http://localhost:5173', 'http://127.0.0.1:5173'])

    # Init DB
    db.init_app(app)

    # Register blueprints
    from routes.reports import reports_bp
    from routes.locations import locations_bp
    from routes.buses import buses_bp
    from routes.analytics import analytics_bp

    app.register_blueprint(reports_bp)
    app.register_blueprint(locations_bp)
    app.register_blueprint(buses_bp)
    app.register_blueprint(analytics_bp)

    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(upload_dir, filename)

    # Create tables
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
