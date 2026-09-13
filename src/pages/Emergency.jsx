import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Siren, ShieldAlert, Clock3, MapPin, Ambulance, Flame, PhoneCall } from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { GlassCard, SectionHeader, CircularGauge } from '../components/ui/Components';
import * as api from '../services/api';

const emergencyServices = [
  { title: 'Ambulance', icon: Ambulance, color: '#EF4444', value: '12 units' },
  { title: 'Fire', icon: Flame, color: '#F59E0B', value: '5 units' },
  { title: 'Police', icon: ShieldAlert, color: '#06B6D4', value: '9 units' },
];

export default function Emergency() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getLocations().then((data) => {
      setLocations(data);
      if (data?.[0]) setSelected(data[0]);
    }).catch(console.error);
  }, []);

  const priority = [...locations].sort((a, b) => b.risk.overall - a.risk.overall).slice(0, 4);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Emergency & Safety Response"
          subtitle="Fast visibility into critical mobility and safety hotspots for urban emergency coordination."
          badge="🚨 Emergency"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <CityMap height="420px" showControls={false} onLocationSelect={setSelected} locations={locations} />
          </div>

          <div className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#94A3B8]">Priority Zone</div>
                <h3 className="text-xl font-bold text-white mt-2" style={{ fontFamily: 'Space Grotesk' }}>{selected?.name || 'Loading'}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <Siren className="text-red-400" size={22} />
              </div>
            </div>

            {selected && (
              <>
                <div className="flex justify-center my-4">
                  <CircularGauge value={selected.risk.overall} size={120} strokeWidth={10} label="RISK" color="#EF4444" />
                </div>

                <div className="space-y-2 text-sm text-[#CBD5E1]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Criticality</span>
                    <span className="font-semibold text-red-400">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Travel disruption</span>
                    <span className="font-semibold">{selected.traffic.congestion}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Avg response window</span>
                    <span className="font-semibold">7 min</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-red-300 mb-2">Response note</div>
                  <div className="text-sm text-[#E2E8F0]">
                    {selected.recommendations?.[0] || 'Deploy immediate congestion mitigation and emergency vehicle routing.'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {emergencyServices.map((service) => (
            <GlassCard key={service.title} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl" style={{ color: service.color }}><service.icon size={22} /></span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">Units</span>
              </div>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{service.value}</div>
              <div className="text-sm text-[#94A3B8] mt-1">{service.title}</div>
            </GlassCard>
          ))}
        </div>

        <SectionHeader
          title="Emergency response queue"
          subtitle="Critical areas flagged for rapid operational attention and route prioritization."
          badge="⚡ Active"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {priority.map((loc, i) => (
            <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <GlassCard className="p-4 h-full" onClick={() => setSelected(loc)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin size={14} className="text-[#94A3B8]" />
                    {loc.name}
                  </div>
                  <span className="text-xs font-bold text-red-400">{loc.risk.overall}</span>
                </div>
                <div className="space-y-2 text-sm text-[#CBD5E1]">
                  <div className="flex items-center gap-2"><Clock3 size={14} className="text-[#94A3B8]" /> Response window: 7 min</div>
                  <div className="flex items-center gap-2"><PhoneCall size={14} className="text-[#94A3B8]" /> Dispatch ready</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
