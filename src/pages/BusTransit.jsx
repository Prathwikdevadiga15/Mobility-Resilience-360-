import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bus, Clock, MapPin, ArrowRight, X, ChevronRight, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import { GlassCard, SectionHeader, DataConfidenceBadge } from '../components/ui/Components';
import { busStops as fallbackBusStops, buses as fallbackBuses } from '../data/buses';
import { MAP_TILE_URL, MAP_ATTRIBUTION } from '../config/map';
import * as api from '../services/api';

export default function BusTransit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [busStops, setBusStops] = useState(fallbackBusStops);
  const [buses, setBuses] = useState(fallbackBuses);
  const [stopBuses, setStopBuses] = useState([]);

  // Fetch bus stops and buses from API
  useEffect(() => {
    api.getBusStops()
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setBusStops(data);
          if (!selectedStop && data[0]) setSelectedStop(data[0]);
        }
      })
      .catch(() => setBusStops(fallbackBusStops));

    api.getBuses()
      .then((data) => {
        if (Array.isArray(data) && data.length) setBuses(data);
      })
      .catch(() => setBuses(fallbackBuses));
  }, [selectedStop]);

  // When a stop is selected, fetch its buses
  useEffect(() => {
    if (selectedStop) {
      api.getBusesForStop(selectedStop.id)
        .then((data) => {
          if (Array.isArray(data) && data.length) {
            setStopBuses(data);
            return;
          }
          setStopBuses(fallbackBuses.filter(bus => selectedStop.buses?.includes(bus.id)));
        })
        .catch(() => {
          setStopBuses(fallbackBuses.filter(bus => selectedStop.buses?.includes(bus.id)));
        });
    } else {
      setStopBuses([]);
    }
  }, [selectedStop]);

  const filteredStops = useMemo(() => {
    if (!searchQuery.trim()) return busStops;
    const q = searchQuery.toLowerCase();
    return busStops.filter(s =>
      s.name.toLowerCase().includes(q)
    );
  }, [searchQuery, busStops]);

  const filteredBuses = useMemo(() => {
    if (!searchQuery.trim()) return buses;
    const q = searchQuery.toLowerCase();
    return buses.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.number.toLowerCase().includes(q) ||
      b.origin.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q) ||
      b.stops.some(s => s.name.toLowerCase().includes(q))
    );
  }, [searchQuery, buses]);

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
    setSelectedBus(null);
  };

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Bus & Transit Intelligence"
          subtitle="Find routes, stops, schedules, and navigate Mangaluru's public transport."
          badge="🚌 Transit"
        />

        {/* Search */}
        <div className="glass p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bus, stop, or destination..."
              className="input pl-12 text-base"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={16} className="text-[#64748B] hover:text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map + Stops */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mini Map */}
            <div className="glass overflow-hidden" style={{ borderRadius: 16 }}>
              <MapContainer
                center={[12.8800, 74.8450]}
                zoom={13}
                style={{ height: 350, width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url={MAP_TILE_URL}
                  attribution={MAP_ATTRIBUTION}
                />
                {busStops.map(stop => (
                  <CircleMarker
                    key={stop.id}
                    center={[stop.lat, stop.lng]}
                    radius={selectedStop?.id === stop.id ? 10 : 7}
                    pathOptions={{
                      fillColor: selectedStop?.id === stop.id ? '#06B6D4' : '#8B5CF6',
                      fillOpacity: 0.9,
                      color: selectedStop?.id === stop.id ? '#06B6D4' : '#8B5CF6',
                      weight: 2,
                    }}
                    eventHandlers={{ click: () => handleStopClick(stop) }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-bold">🚌 {stop.name}</div>
                        <div className="text-gray-400">{stop.totalBuses} bus(es)</div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
                {buses.map(bus => (
                  <Polyline
                    key={`route-${bus.id}`}
                    positions={bus.stops.map(s => [s.lat, s.lng])}
                    pathOptions={{
                      color: selectedBus?.id === bus.id ? '#06B6D4' : 'rgba(148, 163, 184, 0.35)',
                      weight: selectedBus?.id === bus.id ? 4 : 2,
                      opacity: selectedBus?.id === bus.id ? 1 : 0.55,
                      dashArray: selectedBus?.id === bus.id ? '8 6' : '2 8',
                    }}
                  />
                ))}
              </MapContainer>
            </div>

            {/* Bus Stops List */}
            <div>
              <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                Bus Stops {searchQuery && `(${filteredStops.length})`}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredStops.length > 0 ? filteredStops.map(stop => (
                  <button key={stop.id} onClick={() => handleStopClick(stop)} className="text-left">
                    <GlassCard className={`p-4 ${selectedStop?.id === stop.id ? 'border-[#06B6D4]/30 glow-primary' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                            <Bus size={18} className="text-[#8B5CF6]" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{stop.name}</div>
                            <div className="text-xs text-[#64748B]">{stop.totalBuses} bus(es) • Next: {stop.nextBus?.time || 'N/A'}</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-[#64748B]" />
                      </div>
                    </GlassCard>
                  </button>
                )) : (
                  <div className="col-span-full glass-sm p-6 text-center text-sm text-[#94A3B8]">
                    No bus stops match your search. Try a different stop name or destination.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {selectedBus ? (
                /* Bus Detail */
                <motion.div
                  key={`bus-${selectedBus.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass p-5"
                >
                  <button onClick={() => setSelectedBus(null)} className="text-xs text-[#06B6D4] hover:underline mb-3 flex items-center gap-1">
                    ← Back to Stop
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                      <Bus size={24} className="text-[#06B6D4]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{selectedBus.name}</h3>
                      <div className="text-xs text-[#64748B]">{selectedBus.number}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-emerald-400" />
                      <span className="text-[#94A3B8]">{selectedBus.origin}</span>
                      <ArrowRight size={12} className="text-[#64748B]" />
                      <span className="text-white">{selectedBus.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-[#94A3B8]" />
                      <span className="text-[#CBD5E1]">{selectedBus.duration} • {selectedBus.fare} • {selectedBus.serviceWindow || 'Daily service'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation size={14} className="text-[#94A3B8]" />
                      <span className="text-[#CBD5E1]">{selectedBus.operatingDays} • {selectedBus.headway || 'Regular service'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${selectedBus.status === 'running' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className="text-xs font-medium text-[#CBD5E1]">{selectedBus.status === 'running' ? 'Running' : 'Not Running'}</span>
                    <DataConfidenceBadge level={selectedBus.dataConfidence} />
                  </div>

                  {/* Route Stops */}
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Route Stops</div>
                    <div className="space-y-0">
                      {selectedBus.stops.map((stop, i) => (
                        <div key={i} className="flex items-center gap-3 relative">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'border-emerald-400 bg-emerald-400/20' : i === selectedBus.stops.length - 1 ? 'border-red-400 bg-red-400/20' : 'border-[#06B6D4] bg-[#06B6D4]/20'}`} />
                            {i < selectedBus.stops.length - 1 && <div className="w-px h-6 bg-white/10" />}
                          </div>
                          <div className="py-1.5">
                            <span className="text-sm text-white">{stop.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timetable */}
                  <div>
                    <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Schedule</div>
                    <div className="rounded-xl overflow-hidden border border-white/5">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white/[0.03]">
                            <th className="text-left px-3 py-2 text-xs font-semibold text-[#94A3B8]">Departure</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold text-[#94A3B8]">Arrival</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBus.schedule.map((entry, i) => (
                            <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                              <td className="px-3 py-2 text-[#CBD5E1]">{entry.departure}</td>
                              <td className="px-3 py-2 text-white font-medium">{entry.arrival}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              ) : selectedStop ? (
                /* Stop Detail */
                <motion.div
                  key={`stop-${selectedStop.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass p-5"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                      <Bus size={24} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{selectedStop.name}</h3>
                      <div className="text-xs text-[#64748B]">🚌 {selectedStop.totalBuses} bus(es) available</div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Available Buses</div>
                  <div className="space-y-3">
                    {stopBuses.map(bus => (
                      <button key={bus.id} onClick={() => handleBusClick(bus)} className="w-full text-left">
                        <GlassCard className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-white">{bus.name}</div>
                              <div className="text-xs text-[#64748B]">{bus.number} • {bus.origin} → {bus.destination}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${bus.status === 'running' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                <span className="text-xs text-[#94A3B8]">{bus.fare} • {bus.duration}</span>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-[#64748B]" />
                          </div>
                        </GlassCard>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Default */
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-4">
                    <Bus size={32} className="text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>Select a Bus Stop</h3>
                  <p className="text-sm text-[#94A3B8]">Click on a bus stop from the map or list to see available buses and schedules.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="glass-sm p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-[#8B5CF6]" style={{ fontFamily: 'Space Grotesk' }}>{busStops.length}</div>
                  <div className="text-[10px] text-[#64748B]">Stops</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#06B6D4]" style={{ fontFamily: 'Space Grotesk' }}>{buses.length}</div>
                  <div className="text-[10px] text-[#64748B]">Buses</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-400" style={{ fontFamily: 'Space Grotesk' }}>{buses.filter(b => b.status === 'running').length}</div>
                  <div className="text-[10px] text-[#64748B]">Running</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl" style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.15)' }}>
              <p className="text-[10px] text-[#64748B] text-center">
                ⚪ Bus schedules shown are demo/community data. Not connected to live GPS. Verify timings locally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
