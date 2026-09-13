// Central API client for Mobility 360 backend
const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API request failed');
  }

  return res.json();
}

// ─── Reports ──────────────────────────────────────────────────────────────

export async function getReports(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.severity) params.set('severity', filters.severity);
  const qs = params.toString();
  return request(`/reports${qs ? '?' + qs : ''}`);
}

export async function createReport(reportData, imageFile) {
  if (imageFile) {
    // Use FormData for file upload
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('type', reportData.type || '');
    formData.append('typeLabel', reportData.typeLabel || '');
    formData.append('icon', reportData.icon || '');
    formData.append('location', JSON.stringify(reportData.location || {}));
    formData.append('description', reportData.description || '');
    formData.append('severity', reportData.severity || 'medium');
    formData.append('aiConfidence', String(reportData.aiConfidence || 80));
    formData.append('priorityScore', String(reportData.priorityScore || 50));

    const res = await fetch(`${BASE_URL}/reports`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || 'Failed to create report');
    }
    return res.json();
  }

  return request('/reports', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
}

export async function updateReportStatus(reportId, status) {
  return request(`/reports/${reportId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function getReportStats() {
  return request('/reports/stats');
}

// ─── Locations ────────────────────────────────────────────────────────────

export async function getLocations() {
  return request('/locations');
}

export async function getLocation(id) {
  return request(`/locations/${id}`);
}

export async function getTrafficPredictions() {
  return request('/traffic/predictions');
}

export async function getHourlyTraffic() {
  return request('/traffic/hourly');
}

export async function getViolationTypes() {
  return request('/violation-types');
}

// ─── Buses ────────────────────────────────────────────────────────────────

export async function getBusStops() {
  return request('/bus-stops');
}

export async function getBusesForStop(stopId) {
  return request(`/bus-stops/${stopId}/buses`);
}

export async function getBuses() {
  return request('/buses');
}

export async function getBus(id) {
  return request(`/buses/${id}`);
}

// ─── Analytics ────────────────────────────────────────────────────────────

export async function getAnalyticsSummary() {
  return request('/analytics/summary');
}

export async function getSeverityBreakdown() {
  return request('/analytics/severity-breakdown');
}

export async function getTypeBreakdown() {
  return request('/analytics/type-breakdown');
}
