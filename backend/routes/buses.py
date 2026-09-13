from flask import Blueprint, jsonify
from models import db, BusStop, Bus

buses_bp = Blueprint('buses', __name__)


@buses_bp.route('/api/bus-stops', methods=['GET'])
def list_bus_stops():
    stops = BusStop.query.all()
    return jsonify([s.to_dict() for s in stops])


@buses_bp.route('/api/bus-stops/<stop_id>/buses', methods=['GET'])
def get_buses_for_stop(stop_id):
    stop = BusStop.query.get(stop_id)
    if not stop:
        return jsonify({'error': 'Bus stop not found'}), 404

    import json
    bus_ids = json.loads(stop.buses_json)
    buses_list = Bus.query.filter(Bus.id.in_(bus_ids)).all()
    return jsonify([b.to_dict() for b in buses_list])


@buses_bp.route('/api/buses', methods=['GET'])
def list_buses():
    buses_list = Bus.query.all()
    return jsonify([b.to_dict() for b in buses_list])


@buses_bp.route('/api/buses/<bus_id>', methods=['GET'])
def get_bus(bus_id):
    bus = Bus.query.get(bus_id)
    if not bus:
        return jsonify({'error': 'Bus not found'}), 404
    return jsonify(bus.to_dict())
