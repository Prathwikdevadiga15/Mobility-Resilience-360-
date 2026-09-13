from flask import Blueprint, jsonify
from sqlalchemy import func
from models import db, Report

analytics_bp = Blueprint('analytics', __name__)


@analytics_bp.route('/api/analytics/summary', methods=['GET'])
def analytics_summary():
    total = Report.query.count()
    pending = Report.query.filter_by(status='pending').count()
    resolved = Report.query.filter_by(status='resolved').count()
    high = Report.query.filter_by(severity='high').count()

    return jsonify({
        'totalReports': total,
        'pendingReports': pending,
        'resolvedReports': resolved,
        'highSeverity': high,
    })


@analytics_bp.route('/api/analytics/severity-breakdown', methods=['GET'])
def severity_breakdown():
    results = (
        db.session.query(Report.severity, func.count(Report.id))
        .group_by(Report.severity)
        .all()
    )
    breakdown = {severity: count for severity, count in results}
    return jsonify({
        'high': breakdown.get('high', 0),
        'medium': breakdown.get('medium', 0),
        'low': breakdown.get('low', 0),
    })


@analytics_bp.route('/api/analytics/type-breakdown', methods=['GET'])
def type_breakdown():
    results = (
        db.session.query(Report.type_label, func.count(Report.id))
        .group_by(Report.type_label)
        .all()
    )
    breakdown = {label: count for label, count in results}
    return jsonify(breakdown)
