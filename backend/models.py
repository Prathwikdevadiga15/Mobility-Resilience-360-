import json
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.String(20), primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    type_label = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False, default='📋')
    location_name = db.Column(db.String(200), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, default='')
    severity = db.Column(db.String(20), nullable=False, default='medium')
    ai_confidence = db.Column(db.Integer, default=80)
    status = db.Column(db.String(20), nullable=False, default='pending')
    priority_score = db.Column(db.Integer, default=50)
    image_url = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'typeLabel': self.type_label,
            'icon': self.icon,
            'location': {
                'name': self.location_name,
                'lat': self.lat,
                'lng': self.lng,
            },
            'description': self.description,
            'severity': self.severity,
            'aiConfidence': self.ai_confidence,
            'status': self.status,
            'priorityScore': self.priority_score,
            'imageUrl': self.image_url,
            'createdAt': self.created_at.isoformat(),
        }


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False, default='area')
    traffic_json = db.Column(db.Text, nullable=False, default='{}')
    risk_json = db.Column(db.Text, nullable=False, default='{}')
    top_factors_json = db.Column(db.Text, nullable=False, default='[]')
    recommendations_json = db.Column(db.Text, nullable=False, default='[]')
    recent_violations = db.Column(db.Integer, default=0)
    recent_reports = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'lat': self.lat,
            'lng': self.lng,
            'type': self.type,
            'traffic': json.loads(self.traffic_json),
            'risk': json.loads(self.risk_json),
            'topFactors': json.loads(self.top_factors_json),
            'recommendations': json.loads(self.recommendations_json),
            'recentViolations': self.recent_violations,
            'recentReports': self.recent_reports,
        }


class BusStop(db.Model):
    __tablename__ = 'bus_stops'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    buses_json = db.Column(db.Text, nullable=False, default='[]')  # list of bus IDs
    total_buses = db.Column(db.Integer, default=0)
    next_bus_json = db.Column(db.Text, nullable=False, default='{}')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'lat': self.lat,
            'lng': self.lng,
            'buses': json.loads(self.buses_json),
            'totalBuses': self.total_buses,
            'nextBus': json.loads(self.next_bus_json),
        }


class Bus(db.Model):
    __tablename__ = 'buses'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    number = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='running')
    fare = db.Column(db.String(20), nullable=False, default='₹0')
    duration = db.Column(db.String(50), nullable=False, default='0 min')
    operating_days = db.Column(db.String(50), nullable=False, default='Mon–Sun')
    data_confidence = db.Column(db.String(20), nullable=False, default='demo')
    stops_json = db.Column(db.Text, nullable=False, default='[]')
    schedule_json = db.Column(db.Text, nullable=False, default='[]')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'number': self.number,
            'origin': self.origin,
            'destination': self.destination,
            'status': self.status,
            'fare': self.fare,
            'duration': self.duration,
            'operatingDays': self.operating_days,
            'dataConfidence': self.data_confidence,
            'stops': json.loads(self.stops_json),
            'schedule': json.loads(self.schedule_json),
        }


class CongestionPrediction(db.Model):
    __tablename__ = 'congestion_predictions'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    time_window = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Integer, nullable=False)
    level = db.Column(db.String(20), nullable=False)
    recommendation = db.Column(db.Text, nullable=False)
    reason = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.location,
            'timeWindow': self.time_window,
            'confidence': self.confidence,
            'level': self.level,
            'recommendation': self.recommendation,
            'reason': self.reason,
        }
