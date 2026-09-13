import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge, Badge } from '../ui/Components';
import * as api from '../../services/api';
import { MAP_TILE_URL, MAP_ATTRIBUTION } from '../../config/map';

const MANGALURU_CENTER = [12.8714, 74.8431];

function getTrafficLevel(score) {
  if (score >= 75) return { level: 'high', color: '#EF4444', label: 'Heavy' };
  if (score >= 50) return { level: 'medium', color: '#F59E0B', label: 'Moderate' };
  return { level: 'low', color: '#10B981', label: 'Low' };
}

function getRiskLevel(score) {
  if (score >= 80) return { level: 'critical', color: '#EF4444', label: 'Critical' };
  if (score >= 60) return { level: 'high', color: '#F97316', label: 'High' };
  if (score >= 40) return { level: 'medium', color: '#F59E0B', label: 'Medium' };
  return { level: 'low', color: '#10B981', label: 'Low' };
}

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom || 14, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function CityMap({
  height = '600px',
  showControls = true,
  interactive = true,
  onLocationSelect,
  selectedId,
  showBusStops = true,
  className = '',
  mini = false,
  locations: propLocations,
}) {
  const { mapLayers, toggleLayer, reports } = useApp();
  const [flyTo, setFlyTo] = useState(null);
  const [panelLocation, setPanelLocation] = useState(null);
  const [locations, setLocations] = useState(propLocations || []);
  const [busStopsData, setBusStopsData] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);

  // Fetch locations and bus stops from API if not passed as props
  useEffect(() => {
    if (propLocations) {
      setLocations(propLocations);
    } else {
      api.getLocations().then(setLocations).catch(console.error);
    }
  }, [propLocations]);

  useEffect(() => {
    if (showBusStops) {
      api.getBusStops().then(setBusStopsData).catch(console.error);
      api.getBuses().then(setBusRoutes).catch(console.error);
    }
  }, [showBusStops]);

  const handleLocationClick = (loc) => {
    setPanelLocation(loc);
    setFlyTo([loc.lat, loc.lng]);
    if (onLocationSelect) onLocationSelect(loc);
  };

  const busRouteMap = busRoutes.reduce((acc, bus) => {
    acc[bus.id] = bus;
    return acc;
  }, {});

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={MANGALURU_CENTER}
        zoom={mini ? 12 : 13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={!mini}
        scrollWheelZoom={interactive}
        dragging={interactive}
      >
        <TileLayer
          url={MAP_TILE_URL}
          attribution={MAP_ATTRIBUTION}
        />
        {flyTo && <MapController center={flyTo} zoom={15} />}

        {/* Traffic circles */}
        {mapLayers.traffic && locations.map(loc => {
          const t = getTrafficLevel(loc.traffic.score);
          return (
            <CircleMarker
              key={`traffic-${loc.id}`}
              center={[loc.lat, loc.lng]}
              radius={mini ? 8 : 18}
              pathOptions={{
                fillColor: t.color,
                fillOpacity: 0.25,
                color: t.color,
                weight: 1.5,
                opacity: 0.6,
              }}
              eventHandlers={{ click: () => handleLocationClick(loc) }}
            />
          );
        })}

        {/* Violation markers */}
        {mapLayers.violations && reports.filter(r => ['signal_jump', 'illegal_parking', 'speeding', 'wrong_side', 'dangerous_driving', 'pedestrian_block'].includes(r.type)).map(report => (
          <CircleMarker
            key={`v-${report.id}`}
            center={[report.location.lat, report.location.lng]}
            radius={mini ? 4 : 7}
            pathOptions={{
              fillColor: '#EF4444',
              fillOpacity: 0.8,
              color: '#EF4444',
              weight: 2,
              opacity: 1,
            }}
          >
            {!mini && (
              <Popup>
                <div className="text-sm">
                  <div className="font-bold mb-1">{report.icon} {report.typeLabel}</div>
                  <div className="text-gray-400">{report.location.name}</div>
                  <div className="text-xs mt-1 text-gray-500">{report.description}</div>
                </div>
              </Popup>
            )}
          </CircleMarker>
        ))}

        {/* Pothole markers */}
        {mapLayers.potholes && reports.filter(r => ['pothole', 'broken_road'].includes(r.type)).map(report => (
          <CircleMarker
            key={`p-${report.id}`}
            center={[report.location.lat, report.location.lng]}
            radius={mini ? 4 : 7}
            pathOptions={{
              fillColor: '#F97316',
              fillOpacity: 0.8,
              color: '#F97316',
              weight: 2,
              opacity: 1,
            }}
          >
            {!mini && (
              <Popup>
                <div className="text-sm">
                  <div className="font-bold mb-1">{report.icon} {report.typeLabel}</div>
                  <div className="text-gray-400">{report.location.name}</div>
                </div>
              </Popup>
            )}
          </CircleMarker>
        ))}

        {/* Waterlogging */}
        {mapLayers.waterlogging && reports.filter(r => r.type === 'waterlogging').map(report => (
          <CircleMarker
            key={`w-${report.id}`}
            center={[report.location.lat, report.location.lng]}
            radius={mini ? 6 : 14}
            pathOptions={{
              fillColor: '#06B6D4',
              fillOpacity: 0.3,
              color: '#06B6D4',
              weight: 1.5,
              opacity: 0.6,
            }}
          >
            {!mini && (
              <Popup>
                <div className="text-sm">
                  <div className="font-bold mb-1">🌧️ {report.typeLabel}</div>
                  <div className="text-gray-400">{report.location.name}</div>
                </div>
              </Popup>
            )}
          </CircleMarker>
        ))}

        {/* Bus Stops */}
        {mapLayers.busStops && showBusStops && busStopsData.map(stop => (
          <CircleMarker
            key={`bus-${stop.id}`}
            center={[stop.lat, stop.lng]}
            radius={mini ? 4 : 6}
            pathOptions={{
              fillColor: '#8B5CF6',
              fillOpacity: 0.9,
              color: '#8B5CF6',
              weight: 2,
              opacity: 1,
            }}
          >
            {!mini && (
              <Popup>
                <div className="text-sm min-w-[180px]">
                  <div className="font-bold mb-1">🚌 {stop.name}</div>
                  <div className="text-gray-400">{stop.totalBuses || (Array.isArray(stop.buses) ? stop.buses.length : 0)} bus(es) available</div>
                  {(Array.isArray(stop.buses) ? stop.buses : []).slice(0, 4).map((busId) => {
                    const bus = busRouteMap[busId];
                    if (!bus) return null;
                    return (
                      <div key={`${stop.id}-${bus.id}`} className="mt-2 rounded-md bg-slate-800/80 px-2 py-1.5 text-[11px] text-cyan-300">
                        <div className="font-semibold text-white">{bus.name}</div>
                        <div>{bus.number} • {bus.origin} → {bus.destination}</div>
                        <div className="text-cyan-200">{bus.status === 'running' ? 'Running' : 'Paused'} • {bus.duration}</div>
                      </div>
                    );
                  })}
                  {stop.nextBus && (
                    <div className="text-xs mt-2 text-emerald-300">Next: {stop.nextBus.name} at {stop.nextBus.time}</div>
                  )}
                </div>
              </Popup>
            )}
          </CircleMarker>
        ))}

        {/* Location risk markers */}
        {locations.map(loc => (
          <CircleMarker
            key={`core-${loc.id}`}
            center={[loc.lat, loc.lng]}
            radius={mini ? 3 : 5}
            pathOptions={{
              fillColor: '#fff',
              fillOpacity: 0.9,
              color: getTrafficLevel(loc.traffic.score).color,
              weight: 2,
              opacity: 1,
            }}
            eventHandlers={{ click: () => handleLocationClick(loc) }}
          />
        ))}
      </MapContainer>

      {/* Layer Controls */}
      {showControls && !mini && (
        <div className="absolute top-4 right-4 z-[1000]">
          <div className="glass-sm p-3 space-y-2 max-h-[70vh] overflow-y-auto" style={{ minWidth: 180 }}>
            <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Map Layers</div>
            {[
              { key: 'traffic', label: 'Traffic', icon: '🔴' },
              { key: 'violations', label: 'Violations', icon: '🚨' },
              { key: 'potholes', label: 'Potholes', icon: '🕳️' },
              { key: 'waterlogging', label: 'Waterlogging', icon: '🌧️' },
              { key: 'busStops', label: 'Bus Stops', icon: '🚌' },
              { key: 'footpaths', label: 'Footpaths', icon: '🚶' },
              { key: 'parking', label: 'Parking', icon: '🅿️' },
              { key: 'accidentRisk', label: 'Risk Zones', icon: '⚠️' },
            ].map(layer => (
              <label key={layer.key} className="flex items-center gap-2 cursor-pointer text-sm text-[#CBD5E1] hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={mapLayers[layer.key]}
                  onChange={() => toggleLayer(layer.key)}
                  className="w-3.5 h-3.5 rounded accent-[#06B6D4]"
                />
                <span>{layer.icon}</span>
                <span>{layer.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Intelligence Panel */}
      <AnimatePresence>
        {panelLocation && !mini && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-4 left-4 z-[1000] glass-strong p-5 max-w-xs w-full"
            style={{ borderRadius: 16 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Space Grotesk' }}>{panelLocation.name}</h3>
                <span className={`badge ${getRiskLevel(panelLocation.risk.overall).level === 'critical' ? 'badge-danger' : getRiskLevel(panelLocation.risk.overall).level === 'high' ? 'badge-warning' : 'badge-primary'} mt-1`}>
                  {getRiskLevel(panelLocation.risk.overall).label} Priority
                </span>
              </div>
              <button onClick={() => setPanelLocation(null)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={16} className="text-[#94A3B8]" />
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <CircularGauge
                value={panelLocation.risk.overall}
                label="MOBILITY SCORE"
                size={120}
                strokeWidth={8}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Traffic', value: panelLocation.risk.traffic },
                { label: 'Violations', value: panelLocation.risk.violation },
                { label: 'Road', value: panelLocation.risk.road },
                { label: 'Pedestrian', value: panelLocation.risk.pedestrian },
                { label: 'Parking', value: panelLocation.risk.parking },
                { label: 'Flood', value: panelLocation.risk.flood },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-[#94A3B8]">{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: getRiskLevel(item.value).color }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <div className="text-xs font-semibold text-[#94A3B8] mb-2">Traffic Details</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Congestion</span>
                  <span className="text-white font-medium">{panelLocation.traffic.congestion}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Avg Speed</span>
                  <span className="text-white font-medium">{panelLocation.traffic.avgSpeed} km/h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Vehicles/hr</span>
                  <span className="text-white font-medium">{panelLocation.traffic.vehiclesPerHour}</span>
                </div>
              </div>
            </div>

            {panelLocation.recommendations.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-[#94A3B8] mb-2">🤖 AI Recommendations</div>
                <div className="space-y-1">
                  {panelLocation.recommendations.slice(0, 3).map((rec, i) => (
                    <div key={i} className="text-xs text-[#CBD5E1] flex items-start gap-1.5">
                      <span className="text-[#06B6D4] mt-0.5">•</span>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo data badge */}
      {!mini && (
        <div className="absolute bottom-4 left-4 z-[1000]">
          <span className="badge text-[10px]" style={{ background: 'rgba(100,116,139,0.15)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.2)' }}>
            ⚪ DEMO DATA — Simulated markers
          </span>
        </div>
      )}
    </div>
  );
}
