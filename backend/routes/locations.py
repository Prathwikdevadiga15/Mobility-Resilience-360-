from flask import Blueprint, jsonify
from models import db, Location, CongestionPrediction

locations_bp = Blueprint('locations', __name__)

# Hardcoded hourly traffic data (same structure as the original JS file)
HOURLY_TRAFFIC_DATA = {
    'labels': ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
               '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM',
               '8PM', '9PM', '10PM'],
    'datasets': {
        'kankanady': [25, 45, 72, 85, 65, 55, 50, 48, 52, 58, 68, 87, 82, 70, 55, 40, 28],
        'nanthoor': [20, 40, 78, 88, 60, 50, 45, 42, 48, 55, 65, 80, 75, 65, 50, 35, 22],
        'hampankatta': [15, 35, 65, 82, 80, 75, 70, 60, 65, 70, 75, 85, 80, 68, 52, 38, 25],
        'pumpwell': [18, 38, 68, 78, 58, 48, 45, 40, 45, 52, 62, 79, 72, 60, 48, 35, 20],
    },
}

VIOLATION_TYPES = [
    {'id': 'signal_jump', 'label': 'Signal Jumping', 'icon': '🚦', 'color': '#EF4444'},
    {'id': 'illegal_parking', 'label': 'Illegal Parking', 'icon': '🅿️', 'color': '#F59E0B'},
    {'id': 'speeding', 'label': 'Overspeeding', 'icon': '🏎️', 'color': '#EF4444'},
    {'id': 'wrong_side', 'label': 'Wrong-Side Driving', 'icon': '↔️', 'color': '#F97316'},
    {'id': 'dangerous_driving', 'label': 'Dangerous Driving', 'icon': '🚗', 'color': '#EF4444'},
    {'id': 'pedestrian_block', 'label': 'Blocking Pedestrian Crossing', 'icon': '🚶', 'color': '#F59E0B'},
    {'id': 'pothole', 'label': 'Pothole', 'icon': '🕳️', 'color': '#F97316'},
    {'id': 'broken_road', 'label': 'Broken Road', 'icon': '🛣️', 'color': '#F97316'},
    {'id': 'footpath', 'label': 'Footpath Obstruction', 'icon': '🚶\u200d♂️', 'color': '#8B5CF6'},
    {'id': 'waterlogging', 'label': 'Waterlogging', 'icon': '🌧️', 'color': '#06B6D4'},
    {'id': 'garbage', 'label': 'Garbage on Road', 'icon': '🗑️', 'color': '#10B981'},
    {'id': 'streetlight', 'label': 'Streetlight Failure', 'icon': '💡', 'color': '#F59E0B'},
]


@locations_bp.route('/api/locations', methods=['GET'])
def list_locations():
    locations = Location.query.all()
    return jsonify([loc.to_dict() for loc in locations])


@locations_bp.route('/api/locations/<location_id>', methods=['GET'])
def get_location(location_id):
    loc = Location.query.get(location_id)
    if not loc:
        return jsonify({'error': 'Location not found'}), 404
    return jsonify(loc.to_dict())


@locations_bp.route('/api/traffic/predictions', methods=['GET'])
def traffic_predictions():
    predictions = CongestionPrediction.query.all()
    return jsonify([p.to_dict() for p in predictions])


@locations_bp.route('/api/traffic/hourly', methods=['GET'])
def hourly_traffic():
    return jsonify(HOURLY_TRAFFIC_DATA)


@locations_bp.route('/api/violation-types', methods=['GET'])
def violation_types():
    return jsonify(VIOLATION_TYPES)
