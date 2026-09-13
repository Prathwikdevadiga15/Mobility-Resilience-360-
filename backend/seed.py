"""
Seed script — populates the SQLite database with all the demo data
that was previously hardcoded in the frontend JS files.

Usage:
    cd backend
    python seed.py
"""

import json
from datetime import datetime
from app import create_app
from models import db, Report, Location, BusStop, Bus, CongestionPrediction

# ─── Reports (from data/reports.js) ────────────────────────────────────────

REPORTS = [
    {
        'id': 'RPT-001', 'type': 'pothole', 'type_label': 'Pothole', 'icon': '🕳️',
        'location_name': 'Nanthoor Junction', 'lat': 12.8905, 'lng': 74.8505,
        'description': 'Large pothole near junction causing vehicles to swerve.',
        'severity': 'high', 'ai_confidence': 94, 'status': 'verified',
        'priority_score': 94, 'created_at': '2026-09-07T14:30:00',
    },
    {
        'id': 'RPT-002', 'type': 'illegal_parking', 'type_label': 'Illegal Parking', 'icon': '🅿️',
        'location_name': 'Hampankatta', 'lat': 12.8715, 'lng': 74.8435,
        'description': 'Vehicles parked on both sides blocking traffic flow.',
        'severity': 'medium', 'ai_confidence': 88, 'status': 'pending',
        'priority_score': 72, 'created_at': '2026-09-08T09:15:00',
    },
    {
        'id': 'RPT-003', 'type': 'signal_jump', 'type_label': 'Signal Jumping', 'icon': '🚦',
        'location_name': 'Kankanady Junction', 'lat': 12.8755, 'lng': 74.8565,
        'description': 'Multiple two-wheelers jumping signal during peak hours.',
        'severity': 'high', 'ai_confidence': 91, 'status': 'pending',
        'priority_score': 85, 'created_at': '2026-09-08T08:45:00',
    },
    {
        'id': 'RPT-004', 'type': 'waterlogging', 'type_label': 'Waterlogging', 'icon': '🌧️',
        'location_name': 'Pumpwell Circle', 'lat': 12.8835, 'lng': 74.8455,
        'description': 'Road submerged after heavy rainfall. Vehicles stranded.',
        'severity': 'high', 'ai_confidence': 96, 'status': 'in_progress',
        'priority_score': 91, 'created_at': '2026-09-08T06:20:00',
    },
    {
        'id': 'RPT-005', 'type': 'wrong_side', 'type_label': 'Wrong-Side Driving', 'icon': '↔️',
        'location_name': 'State Bank', 'lat': 12.8725, 'lng': 74.8465,
        'description': 'Autorickshaws regularly driving on wrong side near bank.',
        'severity': 'medium', 'ai_confidence': 85, 'status': 'pending',
        'priority_score': 68, 'created_at': '2026-09-08T07:50:00',
    },
    {
        'id': 'RPT-006', 'type': 'footpath', 'type_label': 'Footpath Obstruction', 'icon': '🚶\u200d♂️',
        'location_name': 'Lalbagh', 'lat': 12.8685, 'lng': 74.8425,
        'description': 'Vendors occupying entire footpath. Pedestrians forced onto road.',
        'severity': 'medium', 'ai_confidence': 89, 'status': 'pending',
        'priority_score': 65, 'created_at': '2026-09-08T10:00:00',
    },
    {
        'id': 'RPT-007', 'type': 'broken_road', 'type_label': 'Broken Road', 'icon': '🛣️',
        'location_name': 'Padil', 'lat': 12.8655, 'lng': 74.8605,
        'description': 'Road completely damaged with exposed stones and debris.',
        'severity': 'high', 'ai_confidence': 92, 'status': 'in_progress',
        'priority_score': 88, 'created_at': '2026-09-07T16:00:00',
    },
    {
        'id': 'RPT-008', 'type': 'speeding', 'type_label': 'Overspeeding', 'icon': '🏎️',
        'location_name': 'Surathkal', 'lat': 12.9925, 'lng': 74.7955,
        'description': 'Vehicles speeding on highway stretch near NITK.',
        'severity': 'high', 'ai_confidence': 78, 'status': 'pending',
        'priority_score': 75, 'created_at': '2026-09-08T11:30:00',
    },
    {
        'id': 'RPT-009', 'type': 'garbage', 'type_label': 'Garbage on Road', 'icon': '🗑️',
        'location_name': 'Kadri', 'lat': 12.8805, 'lng': 74.8525,
        'description': 'Garbage dump blocking drainage and part of road.',
        'severity': 'low', 'ai_confidence': 93, 'status': 'resolved',
        'priority_score': 45, 'created_at': '2026-09-06T09:00:00',
    },
    {
        'id': 'RPT-010', 'type': 'dangerous_driving', 'type_label': 'Dangerous Driving', 'icon': '🚗',
        'location_name': 'Bejai', 'lat': 12.8855, 'lng': 74.8405,
        'description': 'Bus overtaking dangerously on narrow road near school.',
        'severity': 'high', 'ai_confidence': 82, 'status': 'pending',
        'priority_score': 80, 'created_at': '2026-09-08T07:30:00',
    },
    {
        'id': 'RPT-011', 'type': 'streetlight', 'type_label': 'Streetlight Failure', 'icon': '💡',
        'location_name': 'Panambur', 'lat': 12.9345, 'lng': 74.8105,
        'description': 'Multiple streetlights not working on beach road stretch.',
        'severity': 'medium', 'ai_confidence': 95, 'status': 'pending',
        'priority_score': 58, 'created_at': '2026-09-07T19:00:00',
    },
    {
        'id': 'RPT-012', 'type': 'pedestrian_block', 'type_label': 'Blocking Pedestrian Crossing', 'icon': '🚶',
        'location_name': 'Hampankatta', 'lat': 12.8712, 'lng': 74.8428,
        'description': 'Vehicles constantly blocking zebra crossing near bus stand.',
        'severity': 'medium', 'ai_confidence': 87, 'status': 'pending',
        'priority_score': 70, 'created_at': '2026-09-08T08:00:00',
    },
]

# ─── Locations (from data/locations.js) ────────────────────────────────────

LOCATIONS = [
    {
        'id': 'nanthoor', 'name': 'Nanthoor Junction', 'lat': 12.8900, 'lng': 74.8500, 'type': 'junction',
        'traffic': {'score': 91, 'congestion': 82, 'avgSpeed': 18, 'vehiclesPerHour': 850, 'level': 'high'},
        'risk': {'traffic': 91, 'violation': 78, 'road': 65, 'pedestrian': 82, 'parking': 70, 'flood': 55, 'overall': 84},
        'topFactors': ['High congestion', 'Frequent pedestrian crossing', 'Roadside parking'],
        'recommendations': ['Install speed breaker', 'Improve pedestrian crossing', 'Increase patrolling 6–9 PM'],
        'recentViolations': 12, 'recentReports': 5,
    },
    {
        'id': 'kankanady', 'name': 'Kankanady Junction', 'lat': 12.8750, 'lng': 74.8560, 'type': 'junction',
        'traffic': {'score': 87, 'congestion': 78, 'avgSpeed': 22, 'vehiclesPerHour': 720, 'level': 'high'},
        'risk': {'traffic': 87, 'violation': 72, 'road': 58, 'pedestrian': 75, 'parking': 65, 'flood': 48, 'overall': 76},
        'topFactors': ['Rush hour congestion', 'Market area parking', 'Bus stop proximity'],
        'recommendations': ['Signal timing optimization', 'Parking enforcement', 'Bus bay extension'],
        'recentViolations': 8, 'recentReports': 7,
    },
    {
        'id': 'pumpwell', 'name': 'Pumpwell Circle', 'lat': 12.8830, 'lng': 74.8450, 'type': 'circle',
        'traffic': {'score': 79, 'congestion': 72, 'avgSpeed': 25, 'vehiclesPerHour': 680, 'level': 'high'},
        'risk': {'traffic': 79, 'violation': 68, 'road': 72, 'pedestrian': 70, 'parking': 55, 'flood': 88, 'overall': 77},
        'topFactors': ['Waterlogging during monsoon', 'Road damage', 'Multi-directional traffic'],
        'recommendations': ['Improve drainage', 'Road resurfacing', 'Add traffic signals'],
        'recentViolations': 6, 'recentReports': 9,
    },
    {
        'id': 'hampankatta', 'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430, 'type': 'area',
        'traffic': {'score': 85, 'congestion': 80, 'avgSpeed': 15, 'vehiclesPerHour': 900, 'level': 'high'},
        'risk': {'traffic': 85, 'violation': 82, 'road': 55, 'pedestrian': 88, 'parking': 90, 'flood': 40, 'overall': 80},
        'topFactors': ['Commercial area', 'Pedestrian density', 'Illegal parking'],
        'recommendations': ['Pedestrian zone expansion', 'Multi-level parking', 'One-way system'],
        'recentViolations': 15, 'recentReports': 4,
    },
    {
        'id': 'lalbagh', 'name': 'Lalbagh', 'lat': 12.8680, 'lng': 74.8420, 'type': 'area',
        'traffic': {'score': 65, 'congestion': 55, 'avgSpeed': 30, 'vehiclesPerHour': 450, 'level': 'medium'},
        'risk': {'traffic': 65, 'violation': 50, 'road': 48, 'pedestrian': 60, 'parking': 45, 'flood': 35, 'overall': 55},
        'topFactors': ['School zone', 'Morning rush', 'Narrow roads'],
        'recommendations': ['Speed limit enforcement', 'School zone markings', 'Better signage'],
        'recentViolations': 4, 'recentReports': 2,
    },
    {
        'id': 'padil', 'name': 'Padil', 'lat': 12.8650, 'lng': 74.8600, 'type': 'junction',
        'traffic': {'score': 72, 'congestion': 65, 'avgSpeed': 28, 'vehiclesPerHour': 520, 'level': 'medium'},
        'risk': {'traffic': 72, 'violation': 60, 'road': 70, 'pedestrian': 55, 'parking': 40, 'flood': 62, 'overall': 63},
        'topFactors': ['Road surface damage', 'Bridge approach', 'Mixed traffic'],
        'recommendations': ['Road repair priority', 'Lane markings', 'Speed calming'],
        'recentViolations': 5, 'recentReports': 6,
    },
    {
        'id': 'surathkal', 'name': 'Surathkal', 'lat': 12.9920, 'lng': 74.7950, 'type': 'area',
        'traffic': {'score': 55, 'congestion': 45, 'avgSpeed': 35, 'vehiclesPerHour': 380, 'level': 'low'},
        'risk': {'traffic': 55, 'violation': 45, 'road': 52, 'pedestrian': 48, 'parking': 35, 'flood': 42, 'overall': 47},
        'topFactors': ['Highway junction', 'Student traffic', 'Industrial zone'],
        'recommendations': ['Pedestrian overpass near NITK', 'Better lighting', 'Speed monitoring'],
        'recentViolations': 3, 'recentReports': 3,
    },
    {
        'id': 'soorinje', 'name': 'Soorinje', 'lat': 12.9100, 'lng': 74.8350, 'type': 'stop',
        'traffic': {'score': 42, 'congestion': 35, 'avgSpeed': 40, 'vehiclesPerHour': 280, 'level': 'low'},
        'risk': {'traffic': 42, 'violation': 35, 'road': 55, 'pedestrian': 40, 'parking': 25, 'flood': 30, 'overall': 38},
        'topFactors': ['Bus stop area', 'Rural approach', 'Limited infrastructure'],
        'recommendations': ['Bus shelter improvement', 'Road widening', 'Street lighting'],
        'recentViolations': 2, 'recentReports': 1,
    },
    {
        'id': 'statebank', 'name': 'State Bank', 'lat': 12.8720, 'lng': 74.8460, 'type': 'area',
        'traffic': {'score': 78, 'congestion': 70, 'avgSpeed': 20, 'vehiclesPerHour': 650, 'level': 'high'},
        'risk': {'traffic': 78, 'violation': 70, 'road': 45, 'pedestrian': 80, 'parking': 85, 'flood': 38, 'overall': 72},
        'topFactors': ['Banking area congestion', 'Double parking', 'Pedestrian crossings'],
        'recommendations': ['No-parking enforcement', 'Pedestrian signals', 'Traffic warden deployment'],
        'recentViolations': 9, 'recentReports': 3,
    },
    {
        'id': 'kadri', 'name': 'Kadri', 'lat': 12.8800, 'lng': 74.8520, 'type': 'area',
        'traffic': {'score': 60, 'congestion': 50, 'avgSpeed': 32, 'vehiclesPerHour': 420, 'level': 'medium'},
        'risk': {'traffic': 60, 'violation': 48, 'road': 42, 'pedestrian': 55, 'parking': 50, 'flood': 45, 'overall': 50},
        'topFactors': ['Temple area traffic', 'Weekend congestion', 'Narrow internal roads'],
        'recommendations': ['One-way system for internal roads', 'Parking lot near temple', 'Better signage'],
        'recentViolations': 4, 'recentReports': 2,
    },
    {
        'id': 'bejai', 'name': 'Bejai', 'lat': 12.8850, 'lng': 74.8400, 'type': 'area',
        'traffic': {'score': 58, 'congestion': 48, 'avgSpeed': 33, 'vehiclesPerHour': 390, 'level': 'medium'},
        'risk': {'traffic': 58, 'violation': 42, 'road': 50, 'pedestrian': 52, 'parking': 38, 'flood': 50, 'overall': 48},
        'topFactors': ['Residential area', 'School zone', 'Moderate road damage'],
        'recommendations': ['Speed limit signs', 'Road patching', 'Pedestrian crossing near schools'],
        'recentViolations': 3, 'recentReports': 4,
    },
    {
        'id': 'panambur', 'name': 'Panambur', 'lat': 12.9340, 'lng': 74.8100, 'type': 'area',
        'traffic': {'score': 45, 'congestion': 38, 'avgSpeed': 38, 'vehiclesPerHour': 300, 'level': 'low'},
        'risk': {'traffic': 45, 'violation': 38, 'road': 60, 'pedestrian': 35, 'parking': 30, 'flood': 65, 'overall': 45},
        'topFactors': ['Beach road traffic', 'Weekend surges', 'Coastal flooding risk'],
        'recommendations': ['Seasonal traffic management', 'Flood barriers', 'Beach parking expansion'],
        'recentViolations': 2, 'recentReports': 3,
    },
]

# ─── Congestion Predictions ────────────────────────────────────────────────

PREDICTIONS = [
    {
        'location': 'Kankanady Junction', 'time_window': '5:30 PM – 7:30 PM',
        'confidence': 87, 'level': 'high',
        'recommendation': 'Use Padil bypass or Pumpwell alternate route.',
        'reason': 'Evening office traffic combined with market area activity.',
    },
    {
        'location': 'Hampankatta', 'time_window': '9:00 AM – 11:00 AM',
        'confidence': 82, 'level': 'high',
        'recommendation': 'Avoid main road. Use Bunder route.',
        'reason': 'Commercial activity peak hours and bus stand proximity.',
    },
    {
        'location': 'Nanthoor Junction', 'time_window': '8:00 AM – 9:30 AM',
        'confidence': 79, 'level': 'medium',
        'recommendation': 'Use Kottara bypass to avoid junction.',
        'reason': 'Morning school and office rush hour.',
    },
    {
        'location': 'Pumpwell Circle', 'time_window': '4:00 PM – 6:00 PM',
        'confidence': 74, 'level': 'medium',
        'recommendation': 'Allow extra 15 minutes for this route.',
        'reason': 'Multi-directional traffic convergence during evening.',
    },
]

# ─── Bus Stops ─────────────────────────────────────────────────────────────

BUS_STOPS = [
    {'id': 'soorinje', 'name': 'Soorinje Bus Stop', 'lat': 12.9100, 'lng': 74.8350,
     'buses': ['rajalakshmi', 'airport_express'], 'totalBuses': 2,
     'nextBus': {'name': 'Airport Express', 'time': '6:15 AM'}},
    {'id': 'kankanady_stop', 'name': 'Kankanady Bus Stand', 'lat': 12.8750, 'lng': 74.8560,
     'buses': ['rajalakshmi', 'city_express_1', 'padil_shuttle', 'kadri_loop'], 'totalBuses': 4,
     'nextBus': {'name': 'City Express 1', 'time': '6:45 AM'}},
    {'id': 'hampankatta_stop', 'name': 'Hampankatta Bus Stand', 'lat': 12.8710, 'lng': 74.8430,
     'buses': ['rajalakshmi', 'city_express_1', 'surathkal_fast', 'padil_shuttle', 'mangaluru_circular', 'kadri_loop', 'airport_express'],
     'totalBuses': 7, 'nextBus': {'name': 'Mangaluru Circular', 'time': '6:30 AM'}},
    {'id': 'pumpwell_stop', 'name': 'Pumpwell Bus Stop', 'lat': 12.8830, 'lng': 74.8450,
     'buses': ['surathkal_fast', 'mangaluru_circular', 'kadri_loop'], 'totalBuses': 3,
     'nextBus': {'name': 'Surathkal Fast', 'time': '7:15 AM'}},
    {'id': 'lalbagh_stop', 'name': 'Lalbagh Bus Stop', 'lat': 12.8680, 'lng': 74.8420,
     'buses': ['mangaluru_circular', 'city_express_1', 'airport_express'], 'totalBuses': 3,
     'nextBus': {'name': 'Airport Express', 'time': '6:50 AM'}},
    {'id': 'statebank_stop', 'name': 'State Bank Bus Stop', 'lat': 12.8720, 'lng': 74.8460,
     'buses': ['city_express_1', 'padil_shuttle', 'airport_express'], 'totalBuses': 3,
     'nextBus': {'name': 'Padil Shuttle', 'time': '7:05 AM'}},
    {'id': 'nanthoor_stop', 'name': 'Nanthoor Bus Stop', 'lat': 12.8900, 'lng': 74.8500,
     'buses': ['surathkal_fast', 'mangaluru_circular', 'kadri_loop'], 'totalBuses': 3,
     'nextBus': {'name': 'Surathkal Fast', 'time': '7:20 AM'}},
    {'id': 'kadri_stop', 'name': 'Kadri Bus Stop', 'lat': 12.8800, 'lng': 74.8520,
     'buses': ['mangaluru_circular', 'kadri_loop'], 'totalBuses': 2,
     'nextBus': {'name': 'Kadri Loop', 'time': '7:10 AM'}},
    {'id': 'surathkal_stop', 'name': 'Surathkal Bus Stop', 'lat': 12.9920, 'lng': 74.7950,
     'buses': ['surathkal_fast', 'airport_express'], 'totalBuses': 2,
     'nextBus': {'name': 'Surathkal Fast', 'time': '6:30 AM'}},
    {'id': 'padil_stop', 'name': 'Padil Bus Stop', 'lat': 12.8650, 'lng': 74.8600,
     'buses': ['padil_shuttle', 'city_express_1'], 'totalBuses': 2,
     'nextBus': {'name': 'Padil Shuttle', 'time': '6:40 AM'}},
    {'id': 'bejai_stop', 'name': 'Bejai Bus Stop', 'lat': 12.8850, 'lng': 74.8400,
     'buses': ['kadri_loop', 'mangaluru_circular'], 'totalBuses': 2,
     'nextBus': {'name': 'Kadri Loop', 'time': '7:30 AM'}},
    {'id': 'panambur_stop', 'name': 'Panambur Bus Stop', 'lat': 12.9340, 'lng': 74.8100,
     'buses': ['surathkal_fast', 'airport_express'], 'totalBuses': 2,
     'nextBus': {'name': 'Airport Express', 'time': '7:40 AM'}},
]

# ─── Buses ─────────────────────────────────────────────────────────────────

BUSES = [
    {
        'id': 'rajalakshmi', 'name': 'Rajalakshmi', 'number': 'MNG-101',
        'origin': 'Soorinje', 'destination': 'Mangaluru (Hampankatta)',
        'status': 'running', 'fare': '₹35', 'duration': '40 min',
        'serviceWindow': '05:00 AM – 12:00 AM', 'headway': '30–45 min',
        'operatingDays': 'Mon–Sat', 'dataConfidence': 'community',
        'stops': [
            {'name': 'Soorinje', 'lat': 12.9100, 'lng': 74.8350},
            {'name': 'Nanthoor', 'lat': 12.8900, 'lng': 74.8500},
            {'name': 'Kankanady', 'lat': 12.8750, 'lng': 74.8560},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '5:00 AM', 'arrival': '5:40 AM'},
            {'departure': '6:30 AM', 'arrival': '7:10 AM'},
            {'departure': '7:00 AM', 'arrival': '7:40 AM'},
            {'departure': '9:00 AM', 'arrival': '9:40 AM'},
            {'departure': '11:00 AM', 'arrival': '11:40 AM'},
            {'departure': '1:00 PM', 'arrival': '1:40 PM'},
            {'departure': '2:30 PM', 'arrival': '3:10 PM'},
            {'departure': '4:00 PM', 'arrival': '4:40 PM'},
            {'departure': '7:00 PM', 'arrival': '7:40 PM'},
            {'departure': '8:00 PM', 'arrival': '8:40 PM'},
            {'departure': '10:00 PM', 'arrival': '10:40 PM'},
            {'departure': '11:30 PM', 'arrival': '12:10 AM'},
        ],
    },
    {
        'id': 'city_express_1', 'name': 'City Express 1', 'number': 'MNG-202',
        'origin': 'Padil', 'destination': 'Hampankatta',
        'status': 'running', 'fare': '₹20', 'duration': '25 min',
        'serviceWindow': '05:30 AM – 11:30 PM', 'headway': '20–30 min',
        'operatingDays': 'Mon–Sun', 'dataConfidence': 'demo',
        'stops': [
            {'name': 'Padil', 'lat': 12.8650, 'lng': 74.8600},
            {'name': 'Kankanady', 'lat': 12.8750, 'lng': 74.8560},
            {'name': 'State Bank', 'lat': 12.8720, 'lng': 74.8460},
            {'name': 'Lalbagh', 'lat': 12.8680, 'lng': 74.8420},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '5:30 AM', 'arrival': '5:55 AM'},
            {'departure': '6:00 AM', 'arrival': '6:25 AM'},
            {'departure': '7:00 AM', 'arrival': '7:25 AM'},
            {'departure': '8:00 AM', 'arrival': '8:25 AM'},
            {'departure': '9:30 AM', 'arrival': '9:55 AM'},
            {'departure': '11:00 AM', 'arrival': '11:25 AM'},
            {'departure': '1:00 PM', 'arrival': '1:25 PM'},
            {'departure': '3:00 PM', 'arrival': '3:25 PM'},
            {'departure': '5:00 PM', 'arrival': '5:25 PM'},
            {'departure': '7:00 PM', 'arrival': '7:25 PM'},
            {'departure': '9:00 PM', 'arrival': '9:25 PM'},
            {'departure': '11:00 PM', 'arrival': '11:25 PM'},
        ],
    },
    {
        'id': 'surathkal_fast', 'name': 'Surathkal Fast', 'number': 'MNG-305',
        'origin': 'Surathkal', 'destination': 'Hampankatta',
        'status': 'running', 'fare': '₹45', 'duration': '55 min',
        'serviceWindow': '05:30 AM – 11:45 PM', 'headway': '45–60 min',
        'operatingDays': 'Mon–Sat', 'dataConfidence': 'demo',
        'stops': [
            {'name': 'Surathkal', 'lat': 12.9920, 'lng': 74.7950},
            {'name': 'Panambur', 'lat': 12.9340, 'lng': 74.8100},
            {'name': 'Nanthoor', 'lat': 12.8900, 'lng': 74.8500},
            {'name': 'Pumpwell', 'lat': 12.8830, 'lng': 74.8450},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '5:30 AM', 'arrival': '6:25 AM'},
            {'departure': '6:30 AM', 'arrival': '7:25 AM'},
            {'departure': '8:00 AM', 'arrival': '8:55 AM'},
            {'departure': '10:00 AM', 'arrival': '10:55 AM'},
            {'departure': '12:30 PM', 'arrival': '1:25 PM'},
            {'departure': '3:00 PM', 'arrival': '3:55 PM'},
            {'departure': '5:30 PM', 'arrival': '6:25 PM'},
            {'departure': '8:00 PM', 'arrival': '8:55 PM'},
            {'departure': '10:30 PM', 'arrival': '11:25 PM'},
        ],
    },
    {
        'id': 'padil_shuttle', 'name': 'Padil Shuttle', 'number': 'MNG-110',
        'origin': 'Padil', 'destination': 'Kankanady',
        'status': 'running', 'fare': '₹12', 'duration': '15 min',
        'serviceWindow': '05:45 AM – 10:30 PM', 'headway': '15–20 min',
        'operatingDays': 'Mon–Sun', 'dataConfidence': 'community',
        'stops': [
            {'name': 'Padil', 'lat': 12.8650, 'lng': 74.8600},
            {'name': 'State Bank', 'lat': 12.8720, 'lng': 74.8460},
            {'name': 'Kankanady', 'lat': 12.8750, 'lng': 74.8560},
        ],
        'schedule': [
            {'departure': '5:45 AM', 'arrival': '6:00 AM'},
            {'departure': '6:30 AM', 'arrival': '6:45 AM'},
            {'departure': '7:30 AM', 'arrival': '7:45 AM'},
            {'departure': '8:30 AM', 'arrival': '8:45 AM'},
            {'departure': '10:00 AM', 'arrival': '10:15 AM'},
            {'departure': '12:00 PM', 'arrival': '12:15 PM'},
            {'departure': '2:00 PM', 'arrival': '2:15 PM'},
            {'departure': '4:00 PM', 'arrival': '4:15 PM'},
            {'departure': '6:00 PM', 'arrival': '6:15 PM'},
            {'departure': '8:00 PM', 'arrival': '8:15 PM'},
            {'departure': '9:45 PM', 'arrival': '10:00 PM'},
        ],
    },
    {
        'id': 'mangaluru_circular', 'name': 'Mangaluru Circular', 'number': 'MNG-500',
        'origin': 'Hampankatta', 'destination': 'Hampankatta (Circular)',
        'status': 'running', 'fare': '₹25', 'duration': '60 min',
        'serviceWindow': '06:00 AM – 11:00 PM', 'headway': '60 min',
        'operatingDays': 'Mon–Sat', 'dataConfidence': 'demo',
        'stops': [
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
            {'name': 'Lalbagh', 'lat': 12.8680, 'lng': 74.8420},
            {'name': 'Kadri', 'lat': 12.8800, 'lng': 74.8520},
            {'name': 'Nanthoor', 'lat': 12.8900, 'lng': 74.8500},
            {'name': 'Pumpwell', 'lat': 12.8830, 'lng': 74.8450},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '6:00 AM', 'arrival': '7:00 AM'},
            {'departure': '7:30 AM', 'arrival': '8:30 AM'},
            {'departure': '9:00 AM', 'arrival': '10:00 AM'},
            {'departure': '10:30 AM', 'arrival': '11:30 AM'},
            {'departure': '12:00 PM', 'arrival': '1:00 PM'},
            {'departure': '2:00 PM', 'arrival': '3:00 PM'},
            {'departure': '4:00 PM', 'arrival': '5:00 PM'},
            {'departure': '6:00 PM', 'arrival': '7:00 PM'},
            {'departure': '8:00 PM', 'arrival': '9:00 PM'},
            {'departure': '10:00 PM', 'arrival': '11:00 PM'},
        ],
    },
    {
        'id': 'kadri_loop', 'name': 'Kadri Loop', 'number': 'MNG-410',
        'origin': 'Hampankatta', 'destination': 'Kadri',
        'status': 'running', 'fare': '₹18', 'duration': '35 min',
        'serviceWindow': '06:15 AM – 10:15 PM', 'headway': '30–40 min',
        'operatingDays': 'Mon–Sun', 'dataConfidence': 'community',
        'stops': [
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
            {'name': 'Bejai', 'lat': 12.8850, 'lng': 74.8400},
            {'name': 'Kadri', 'lat': 12.8800, 'lng': 74.8520},
            {'name': 'Pumpwell', 'lat': 12.8830, 'lng': 74.8450},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '6:15 AM', 'arrival': '6:50 AM'},
            {'departure': '7:15 AM', 'arrival': '7:50 AM'},
            {'departure': '8:30 AM', 'arrival': '9:05 AM'},
            {'departure': '10:15 AM', 'arrival': '10:50 AM'},
            {'departure': '12:15 PM', 'arrival': '12:50 PM'},
            {'departure': '2:15 PM', 'arrival': '2:50 PM'},
            {'departure': '4:30 PM', 'arrival': '5:05 PM'},
            {'departure': '6:45 PM', 'arrival': '7:20 PM'},
            {'departure': '8:45 PM', 'arrival': '9:20 PM'},
            {'departure': '10:15 PM', 'arrival': '10:50 PM'},
        ],
    },
    {
        'id': 'airport_express', 'name': 'Airport Express', 'number': 'MNG-615',
        'origin': 'Surathkal', 'destination': 'Hampankatta',
        'status': 'running', 'fare': '₹55', 'duration': '50 min',
        'serviceWindow': '06:00 AM – 11:30 PM', 'headway': '60 min',
        'operatingDays': 'Mon–Sat', 'dataConfidence': 'demo',
        'stops': [
            {'name': 'Surathkal', 'lat': 12.9920, 'lng': 74.7950},
            {'name': 'Panambur', 'lat': 12.9340, 'lng': 74.8100},
            {'name': 'Soorinje', 'lat': 12.9100, 'lng': 74.8350},
            {'name': 'Lalbagh', 'lat': 12.8680, 'lng': 74.8420},
            {'name': 'Hampankatta', 'lat': 12.8710, 'lng': 74.8430},
        ],
        'schedule': [
            {'departure': '6:00 AM', 'arrival': '6:50 AM'},
            {'departure': '7:30 AM', 'arrival': '8:20 AM'},
            {'departure': '9:00 AM', 'arrival': '9:50 AM'},
            {'departure': '11:30 AM', 'arrival': '12:20 PM'},
            {'departure': '2:00 PM', 'arrival': '2:50 PM'},
            {'departure': '4:30 PM', 'arrival': '5:20 PM'},
            {'departure': '6:30 PM', 'arrival': '7:20 PM'},
            {'departure': '8:30 PM', 'arrival': '9:20 PM'},
            {'departure': '10:30 PM', 'arrival': '11:20 PM'},
        ],
    },
]


def seed():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Seed Reports
        for r in REPORTS:
            report = Report(
                id=r['id'],
                type=r['type'],
                type_label=r['type_label'],
                icon=r['icon'],
                location_name=r['location_name'],
                lat=r['lat'],
                lng=r['lng'],
                description=r.get('description', ''),
                severity=r['severity'],
                ai_confidence=r['ai_confidence'],
                status=r['status'],
                priority_score=r['priority_score'],
                created_at=datetime.fromisoformat(r['created_at']),
            )
            db.session.add(report)

        # Seed Locations
        for loc in LOCATIONS:
            location = Location(
                id=loc['id'],
                name=loc['name'],
                lat=loc['lat'],
                lng=loc['lng'],
                type=loc['type'],
                traffic_json=json.dumps(loc['traffic']),
                risk_json=json.dumps(loc['risk']),
                top_factors_json=json.dumps(loc['topFactors']),
                recommendations_json=json.dumps(loc['recommendations']),
                recent_violations=loc['recentViolations'],
                recent_reports=loc['recentReports'],
            )
            db.session.add(location)

        # Seed Congestion Predictions
        for p in PREDICTIONS:
            pred = CongestionPrediction(
                location=p['location'],
                time_window=p['time_window'],
                confidence=p['confidence'],
                level=p['level'],
                recommendation=p['recommendation'],
                reason=p['reason'],
            )
            db.session.add(pred)

        # Seed Bus Stops
        for s in BUS_STOPS:
            stop = BusStop(
                id=s['id'],
                name=s['name'],
                lat=s['lat'],
                lng=s['lng'],
                buses_json=json.dumps(s['buses']),
                total_buses=s['totalBuses'],
                next_bus_json=json.dumps(s['nextBus']),
            )
            db.session.add(stop)

        # Seed Buses
        for b in BUSES:
            bus = Bus(
                id=b['id'],
                name=b['name'],
                number=b['number'],
                origin=b['origin'],
                destination=b['destination'],
                status=b['status'],
                fare=b['fare'],
                duration=b['duration'],
                operating_days=b['operatingDays'],
                data_confidence=b['dataConfidence'],
                stops_json=json.dumps(b['stops']),
                schedule_json=json.dumps(b['schedule']),
            )
            db.session.add(bus)

        db.session.commit()
        print('[OK] Database seeded successfully!')
        print(f'   - {len(REPORTS)} reports')
        print(f'   - {len(LOCATIONS)} locations')
        print(f'   - {len(PREDICTIONS)} congestion predictions')
        print(f'   - {len(BUS_STOPS)} bus stops')
        print(f'   - {len(BUSES)} buses')


if __name__ == '__main__':
    seed()
