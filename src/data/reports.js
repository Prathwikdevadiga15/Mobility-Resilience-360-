// Sample reports demo data
let nextId = 100;

export const sampleReports = [
  {
    id: 'RPT-001',
    type: 'pothole',
    typeLabel: 'Pothole',
    icon: '🕳️',
    location: { name: 'Nanthoor Junction', lat: 12.8905, lng: 74.8505 },
    description: 'Large pothole near junction causing vehicles to swerve.',
    severity: 'high',
    aiConfidence: 94,
    status: 'verified',
    priorityScore: 94,
    createdAt: '2026-09-07T14:30:00',
    imageUrl: null,
  },
  {
    id: 'RPT-002',
    type: 'illegal_parking',
    typeLabel: 'Illegal Parking',
    icon: '🅿️',
    location: { name: 'Hampankatta', lat: 12.8715, lng: 74.8435 },
    description: 'Vehicles parked on both sides blocking traffic flow.',
    severity: 'medium',
    aiConfidence: 88,
    status: 'pending',
    priorityScore: 72,
    createdAt: '2026-09-08T09:15:00',
    imageUrl: null,
  },
  {
    id: 'RPT-003',
    type: 'signal_jump',
    typeLabel: 'Signal Jumping',
    icon: '🚦',
    location: { name: 'Kankanady Junction', lat: 12.8755, lng: 74.8565 },
    description: 'Multiple two-wheelers jumping signal during peak hours.',
    severity: 'high',
    aiConfidence: 91,
    status: 'pending',
    priorityScore: 85,
    createdAt: '2026-09-08T08:45:00',
    imageUrl: null,
  },
  {
    id: 'RPT-004',
    type: 'waterlogging',
    typeLabel: 'Waterlogging',
    icon: '🌧️',
    location: { name: 'Pumpwell Circle', lat: 12.8835, lng: 74.8455 },
    description: 'Road submerged after heavy rainfall. Vehicles stranded.',
    severity: 'high',
    aiConfidence: 96,
    status: 'in_progress',
    priorityScore: 91,
    createdAt: '2026-09-08T06:20:00',
    imageUrl: null,
  },
  {
    id: 'RPT-005',
    type: 'wrong_side',
    typeLabel: 'Wrong-Side Driving',
    icon: '↔️',
    location: { name: 'State Bank', lat: 12.8725, lng: 74.8465 },
    description: 'Autorickshaws regularly driving on wrong side near bank.',
    severity: 'medium',
    aiConfidence: 85,
    status: 'pending',
    priorityScore: 68,
    createdAt: '2026-09-08T07:50:00',
    imageUrl: null,
  },
  {
    id: 'RPT-006',
    type: 'footpath',
    typeLabel: 'Footpath Obstruction',
    icon: '🚶‍♂️',
    location: { name: 'Lalbagh', lat: 12.8685, lng: 74.8425 },
    description: 'Vendors occupying entire footpath. Pedestrians forced onto road.',
    severity: 'medium',
    aiConfidence: 89,
    status: 'pending',
    priorityScore: 65,
    createdAt: '2026-09-08T10:00:00',
    imageUrl: null,
  },
  {
    id: 'RPT-007',
    type: 'broken_road',
    typeLabel: 'Broken Road',
    icon: '🛣️',
    location: { name: 'Padil', lat: 12.8655, lng: 74.8605 },
    description: 'Road completely damaged with exposed stones and debris.',
    severity: 'high',
    aiConfidence: 92,
    status: 'in_progress',
    priorityScore: 88,
    createdAt: '2026-09-07T16:00:00',
    imageUrl: null,
  },
  {
    id: 'RPT-008',
    type: 'speeding',
    typeLabel: 'Overspeeding',
    icon: '🏎️',
    location: { name: 'Surathkal', lat: 12.9925, lng: 74.7955 },
    description: 'Vehicles speeding on highway stretch near NITK.',
    severity: 'high',
    aiConfidence: 78,
    status: 'pending',
    priorityScore: 75,
    createdAt: '2026-09-08T11:30:00',
    imageUrl: null,
  },
  {
    id: 'RPT-009',
    type: 'garbage',
    typeLabel: 'Garbage on Road',
    icon: '🗑️',
    location: { name: 'Kadri', lat: 12.8805, lng: 74.8525 },
    description: 'Garbage dump blocking drainage and part of road.',
    severity: 'low',
    aiConfidence: 93,
    status: 'resolved',
    priorityScore: 45,
    createdAt: '2026-09-06T09:00:00',
    imageUrl: null,
  },
  {
    id: 'RPT-010',
    type: 'dangerous_driving',
    typeLabel: 'Dangerous Driving',
    icon: '🚗',
    location: { name: 'Bejai', lat: 12.8855, lng: 74.8405 },
    description: 'Bus overtaking dangerously on narrow road near school.',
    severity: 'high',
    aiConfidence: 82,
    status: 'pending',
    priorityScore: 80,
    createdAt: '2026-09-08T07:30:00',
    imageUrl: null,
  },
  {
    id: 'RPT-011',
    type: 'streetlight',
    typeLabel: 'Streetlight Failure',
    icon: '💡',
    location: { name: 'Panambur', lat: 12.9345, lng: 74.8105 },
    description: 'Multiple streetlights not working on beach road stretch.',
    severity: 'medium',
    aiConfidence: 95,
    status: 'pending',
    priorityScore: 58,
    createdAt: '2026-09-07T19:00:00',
    imageUrl: null,
  },
  {
    id: 'RPT-012',
    type: 'pedestrian_block',
    typeLabel: 'Blocking Pedestrian Crossing',
    icon: '🚶',
    location: { name: 'Hampankatta', lat: 12.8712, lng: 74.8428 },
    description: 'Vehicles constantly blocking zebra crossing near bus stand.',
    severity: 'medium',
    aiConfidence: 87,
    status: 'pending',
    priorityScore: 70,
    createdAt: '2026-09-08T08:00:00',
    imageUrl: null,
  },
];

export function generateReportId() {
  nextId++;
  return `RPT-${String(nextId).padStart(3, '0')}`;
}

export function getStatusBadge(status) {
  switch (status) {
    case 'pending': return { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' };
    case 'in_progress': return { label: 'In Progress', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' };
    case 'verified': return { label: 'Verified', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' };
    case 'resolved': return { label: 'Resolved', color: '#10B981', bg: 'rgba(16,185,129,0.15)' };
    case 'rejected': return { label: 'Rejected', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' };
    default: return { label: 'Unknown', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' };
  }
}

export function getSeverityBadge(severity) {
  switch (severity) {
    case 'high': return { label: 'High', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' };
    case 'medium': return { label: 'Medium', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' };
    case 'low': return { label: 'Low', color: '#10B981', bg: 'rgba(16,185,129,0.15)' };
    default: return { label: 'Unknown', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' };
  }
}
