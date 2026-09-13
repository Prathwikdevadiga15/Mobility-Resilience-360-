import os
import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from models import db, Report

reports_bp = Blueprint('reports', __name__)

# Counter for generating sequential report IDs
_next_id_cache = {'value': None}


def _get_next_id():
    """Generate the next RPT-XXX id based on existing records."""
    if _next_id_cache['value'] is None:
        last = db.session.query(Report).order_by(Report.id.desc()).first()
        if last and last.id.startswith('RPT-'):
            try:
                _next_id_cache['value'] = int(last.id.split('-')[1]) + 1
            except ValueError:
                _next_id_cache['value'] = 100
        else:
            _next_id_cache['value'] = 100
    else:
        _next_id_cache['value'] += 1
    return f"RPT-{str(_next_id_cache['value']).zfill(3)}"


@reports_bp.route('/api/reports', methods=['GET'])
def list_reports():
    status = request.args.get('status')
    severity = request.args.get('severity')

    query = Report.query

    if status and status != 'all':
        query = query.filter_by(status=status)
    if severity and severity != 'all':
        query = query.filter_by(severity=severity)

    query = query.order_by(Report.priority_score.desc())
    reports = query.all()
    return jsonify([r.to_dict() for r in reports])


@reports_bp.route('/api/reports', methods=['POST'])
def create_report():
    # Support both JSON and multipart/form-data (for image uploads)
    if request.content_type and 'multipart/form-data' in request.content_type:
        data = request.form.to_dict()
        image_file = request.files.get('image')
        image_url = None
        if image_file and image_file.filename:
            ext = os.path.splitext(image_file.filename)[1] or '.jpg'
            filename = f"{uuid.uuid4().hex}{ext}"
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            image_file.save(filepath)
            image_url = f"/uploads/{filename}"
    else:
        data = request.get_json() or {}
        image_url = data.get('imageUrl')

    report_id = _get_next_id()
    location = data.get('location', {})
    if isinstance(location, str):
        import json as _json
        try:
            location = _json.loads(location)
        except Exception:
            location = {}

    report = Report(
        id=report_id,
        type=data.get('type', 'pothole'),
        type_label=data.get('typeLabel', 'Unknown'),
        icon=data.get('icon', '📋'),
        location_name=location.get('name', 'Unknown Location'),
        lat=float(location.get('lat', 12.8714)),
        lng=float(location.get('lng', 74.8431)),
        description=data.get('description', ''),
        severity=data.get('severity', 'medium'),
        ai_confidence=int(data.get('aiConfidence', 80)),
        status='pending',
        priority_score=int(data.get('priorityScore', 50)),
        image_url=image_url,
        created_at=datetime.utcnow(),
    )
    db.session.add(report)
    db.session.commit()
    return jsonify(report.to_dict()), 201


@reports_bp.route('/api/reports/<report_id>/status', methods=['PATCH'])
def update_report_status(report_id):
    data = request.get_json() or {}
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'status is required'}), 400

    report = Report.query.get(report_id)
    if not report:
        return jsonify({'error': 'Report not found'}), 404

    report.status = new_status
    db.session.commit()
    return jsonify(report.to_dict())


@reports_bp.route('/api/reports/stats', methods=['GET'])
def report_stats():
    total = Report.query.count()
    pending = Report.query.filter_by(status='pending').count()
    in_progress = Report.query.filter_by(status='in_progress').count()
    resolved = Report.query.filter_by(status='resolved').count()
    high_severity = Report.query.filter_by(severity='high').count()

    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_reports = Report.query.filter(Report.created_at >= today_start).count()

    return jsonify({
        'totalReports': total,
        'pendingReports': pending,
        'inProgressReports': in_progress,
        'resolvedReports': resolved,
        'highSeverity': high_severity,
        'todayReports': today_reports,
    })
