import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { GlassCard, CircularGauge, SectionHeader, Badge } from '../components/ui/Components';
import * as api from '../services/api';

function getRiskLevel(score) {
  if (score >= 80) return { level: 'critical', color: '#EF4444', label: 'Critical' };
  if (score >= 60) return { level: 'high', color: '#F97316', label: 'High' };
  if (score >= 40) return { level: 'medium', color: '#F59E0B', label: 'Medium' };
  return { level: 'low', color: '#10B981', label: 'Low' };
}

export default function RoadSafety() {
  const [locations, setLocations] = useState([]);
  const [selectedJunction, setSelectedJunction] = useState(null);

  useEffect(() => {
    api.getLocations().then(data => {
      setLocations(data);
      if (data.length > 0) setSelectedJunction(data[0]);
    }).catch(console.error);
  }, []);

  const sortedByRisk = [...locations].sort((a, b) => b.risk.overall - a.risk.overall);

  if (!selectedJunction) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto text-center text-[#94A3B8]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Road Safety Intelligence"
          subtitle="AI-powered risk analysis for every road and junction in Mangaluru."
          badge="🛡️ Safety"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Map */}
          <div className="lg:col-span-2">
            <CityMap
              height="400px"
              showControls={false}
              onLocationSelect={setSelectedJunction}
              locations={locations}
            />
          </div>

          {/* Selected Junction Detail */}
          <div className="glass p-5">
            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              {selectedJunction.name}
            </h3>
            <Badge variant={getRiskLevel(selectedJunction.risk.overall).level === 'critical' ? 'danger' : getRiskLevel(selectedJunction.risk.overall).level === 'high' ? 'warning' : 'primary'}>
              {getRiskLevel(selectedJunction.risk.overall).label} Risk
            </Badge>

            <div className="flex justify-center my-5">
              <CircularGauge
                value={selectedJunction.risk.overall}
                size={140}
                strokeWidth={10}
                label="RISK SCORE"
              />
            </div>

            <div className="space-y-2 mb-5">
              {[
                { label: '🚦 Traffic Risk', value: selectedJunction.risk.traffic },
                { label: '🚨 Violations', value: selectedJunction.risk.violation },
                { label: '🛣️ Road Condition', value: selectedJunction.risk.road },
                { label: '🚶 Pedestrian', value: selectedJunction.risk.pedestrian },
                { label: '🅿️ Parking', value: selectedJunction.risk.parking },
                { label: '🌧️ Flood Risk', value: selectedJunction.risk.flood },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: getRiskLevel(item.value).color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: getRiskLevel(item.value).color }}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">🤖 AI Recommendations</div>
              <div className="space-y-1.5">
                {selectedJunction.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                    <span className="text-[#06B6D4] mt-0.5">•</span>
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dangerous Junctions Ranking */}
        <SectionHeader
          title="Dangerous Junctions Ranking"
          subtitle="Ranked by overall Mobility Intelligence Score."
          badge="⚠️ Rankings"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {sortedByRisk.map((loc, i) => {
            const risk = getRiskLevel(loc.risk.overall);
            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <GlassCard
                  className="p-4"
                  onClick={() => setSelectedJunction(loc)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#64748B]">#{i + 1}</span>
                      <span className="text-sm font-bold text-white">{loc.name}</span>
                    </div>
                    <CircularGauge value={loc.risk.overall} size={48} strokeWidth={4} />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {loc.topFactors.slice(0, 2).map((factor, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8]">{factor}</span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Pedestrian Danger Zones */}
        <SectionHeader
          title="Pedestrian Safety Zones"
          subtitle="Areas with highest pedestrian risk based on footpath condition, crossings, and traffic density."
          badge="🚶 Pedestrian Safety"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...locations]
            .sort((a, b) => b.risk.pedestrian - a.risk.pedestrian)
            .slice(0, 4)
            .map((loc, i) => (
              <GlassCard key={loc.id} className="p-4">
                <div className="text-center mb-3">
                  <CircularGauge value={loc.risk.pedestrian} size={80} strokeWidth={6} label="PED. RISK" />
                </div>
                <h4 className="text-sm font-bold text-white text-center mb-1">{loc.name}</h4>
                <p className="text-xs text-[#64748B] text-center">{loc.topFactors[0]}</p>
              </GlassCard>
            ))}
        </div>
      </div>
    </div>
  );
}
