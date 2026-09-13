import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CarFront, MapPin, Gauge, ShieldCheck, AlertTriangle } from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { GlassCard, SectionHeader, CircularGauge } from '../components/ui/Components';
import * as api from '../services/api';

function getParkingLevel(score) {
  if (score >= 80) return { label: 'Critical', color: '#EF4444' };
  if (score >= 60) return { label: 'High', color: '#F59E0B' };
  if (score >= 40) return { label: 'Moderate', color: '#06B6D4' };
  return { label: 'Low', color: '#10B981' };
}

export default function Parking() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getLocations().then((data) => {
      setLocations(data);
      if (data?.[0]) setSelected(data[0]);
    }).catch(console.error);
  }, []);

  const ranked = [...locations].sort((a, b) => b.risk.parking - a.risk.parking);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Smart Parking Intelligence"
          subtitle="Track high-demand parking zones, illegal parking hotspots, and enforcement priority areas across the city."
          badge="🅿️ Parking"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <CityMap height="420px" showControls={false} onLocationSelect={setSelected} locations={locations} />
          </div>

          <div className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Zone Focus</div>
                <h3 className="text-xl font-bold text-white mt-2" style={{ fontFamily: 'Space Grotesk' }}>{selected?.name || 'Loading'}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <CarFront className="text-amber-400" size={22} />
              </div>
            </div>

            {selected && (
              <>
                <div className="flex justify-center my-4">
                  <CircularGauge value={selected.risk.parking} size={120} strokeWidth={10} label="PARKING INDEX" color="#F59E0B" />
                </div>

                <div className="space-y-3 text-sm text-[#CBD5E1]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Status</span>
                    <span style={{ color: getParkingLevel(selected.risk.parking).color }} className="font-semibold">
                      {getParkingLevel(selected.risk.parking).label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Demand pressure</span>
                    <span className="font-semibold">{selected.risk.parking}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Violation risk</span>
                    <span className="font-semibold">{selected.risk.violation}%</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/8 bg-slate-950/40 p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] mb-2">Priority action</div>
                  <div className="text-sm text-[#E2E8F0]">
                    {selected.recommendations?.[0] || 'Deploy parking enforcement and reroute traffic around high-demand zones.'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { title: 'Peak Demand', value: '84%', icon: Gauge, color: '#F59E0B' },
            { title: 'Enforcement Alerts', value: '12', icon: ShieldCheck, color: '#10B981' },
            { title: 'Illegal Spots', value: '7', icon: AlertTriangle, color: '#EF4444' },
          ].map((card) => (
            <GlassCard key={card.title} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl" style={{ color: card.color }}><card.icon size={22} /></span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">Live</span>
              </div>
              <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{card.value}</div>
              <div className="text-sm text-[#94A3B8] mt-1">{card.title}</div>
            </GlassCard>
          ))}
        </div>

        <SectionHeader
          title="Parking pressure ranking"
          subtitle="High-demand and violation-prone zones requiring active management."
          badge="📍 Priority"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {ranked.map((loc, i) => (
            <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <GlassCard className="p-4 h-full" onClick={() => setSelected(loc)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin size={14} className="text-[#94A3B8]" />
                    {loc.name}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: getParkingLevel(loc.risk.parking).color }}>{loc.risk.parking}%</span>
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-3">
                  <div className="h-full rounded-full" style={{ width: `${loc.risk.parking}%`, background: getParkingLevel(loc.risk.parking).color }} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {loc.topFactors.slice(0, 2).map((factor) => (
                    <span key={factor} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-[#94A3B8]">{factor}</span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
