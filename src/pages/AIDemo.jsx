import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Upload, Zap, Camera, ChevronRight, AlertTriangle } from 'lucide-react';
import { GlassCard, SectionHeader, CircularGauge, Badge } from '../components/ui/Components';

const sampleDetections = [
  {
    id: 1,
    name: 'Pothole Detection',
    image: 'pothole',
    detections: [
      { label: 'Pothole', confidence: 94, x: 30, y: 40, w: 35, h: 30, color: '#EF4444' },
      { label: 'Road Crack', confidence: 78, x: 70, y: 60, w: 20, h: 15, color: '#F97316' },
    ],
    summary: { severity: 'HIGH', type: 'Road Damage', priority: 1 },
    time: '184ms',
  },
  {
    id: 2,
    name: 'Parking Violation',
    image: 'parking',
    detections: [
      { label: 'Illegally Parked', confidence: 91, x: 20, y: 25, w: 30, h: 45, color: '#F59E0B' },
      { label: 'No Parking Zone', confidence: 86, x: 55, y: 20, w: 25, h: 15, color: '#EF4444' },
      { label: 'Vehicle', confidence: 97, x: 60, y: 35, w: 28, h: 40, color: '#06B6D4' },
    ],
    summary: { severity: 'MEDIUM', type: 'Parking Violation', priority: 3 },
    time: '156ms',
  },
  {
    id: 3,
    name: 'Waterlogging',
    image: 'flood',
    detections: [
      { label: 'Waterlogging', confidence: 96, x: 15, y: 50, w: 70, h: 35, color: '#06B6D4' },
      { label: 'Blocked Drain', confidence: 82, x: 10, y: 30, w: 20, h: 25, color: '#F97316' },
    ],
    summary: { severity: 'HIGH', type: 'Waterlogging', priority: 1 },
    time: '201ms',
  },
  {
    id: 4,
    name: 'Footpath Obstruction',
    image: 'footpath',
    detections: [
      { label: 'Vendor Stall', confidence: 89, x: 25, y: 30, w: 35, h: 40, color: '#8B5CF6' },
      { label: 'Footpath Blocked', confidence: 92, x: 10, y: 55, w: 80, h: 20, color: '#EF4444' },
    ],
    summary: { severity: 'MEDIUM', type: 'Pedestrian Issue', priority: 2 },
    time: '172ms',
  },
];

const bgColors = {
  pothole: '#2a1a0a',
  parking: '#1a1a2a',
  flood: '#0a1a2a',
  footpath: '#1a0a2a',
};

export default function AIDemo() {
  const [selected, setSelected] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (detection) => {
    setSelected(detection);
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(detection);
    }, 2000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="AI Computer Vision Demo"
          subtitle="See how our AI detects road issues, violations, and hazards from uploaded images."
          badge="🤖 AI DEMONSTRATION MODE"
        />

        {/* Sample selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {sampleDetections.map((d) => (
            <button key={d.id} onClick={() => handleSelect(d)}>
              <GlassCard className={`p-4 h-full ${selected?.id === d.id ? 'border-[#06B6D4]/30 glow-primary' : ''}`}>
                <div className="w-full h-24 rounded-lg mb-3 flex items-center justify-center text-4xl"
                  style={{ background: bgColors[d.image] || '#1a1a2a' }}
                >
                  {d.image === 'pothole' && '🕳️'}
                  {d.image === 'parking' && '🅿️'}
                  {d.image === 'flood' && '🌧️'}
                  {d.image === 'footpath' && '🚶'}
                </div>
                <div className="text-sm font-medium text-white">{d.name}</div>
                <div className="text-xs text-[#64748B]">{d.detections.length} detections</div>
              </GlassCard>
            </button>
          ))}
        </div>

        {/* AI Analysis Panel */}
        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass p-8 text-center mb-8"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-t-[#06B6D4] border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
                <div className="absolute inset-3 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                  <Eye size={28} className="text-[#06B6D4]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>Processing Image...</h3>
              <div className="h-1 rounded-full bg-white/5 max-w-xs mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.8 }}
                />
              </div>
            </motion.div>
          )}

          {result && !scanning && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image with bounding boxes */}
                <div>
                  <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Image Analysis</div>
                  <div className="relative rounded-xl overflow-hidden" style={{ background: bgColors[result.image], minHeight: 300 }}>
                    {/* Simulated image area */}
                    <div className="w-full h-[300px] flex items-center justify-center text-6xl opacity-20">
                      {result.image === 'pothole' && '🕳️'}
                      {result.image === 'parking' && '🅿️'}
                      {result.image === 'flood' && '🌧️'}
                      {result.image === 'footpath' && '🚶'}
                    </div>

                    {/* Bounding boxes */}
                    {result.detections.map((det, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.3 }}
                        className="absolute"
                        style={{
                          left: `${det.x}%`,
                          top: `${det.y}%`,
                          width: `${det.w}%`,
                          height: `${det.h}%`,
                          border: `2px solid ${det.color}`,
                          borderRadius: 8,
                          boxShadow: `0 0 10px ${det.color}40`,
                        }}
                      >
                        <div
                          className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap"
                          style={{ background: det.color }}
                        >
                          {det.label} {det.confidence}%
                        </div>
                      </motion.div>
                    ))}

                    {/* Scan line */}
                    <motion.div
                      className="absolute left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, #06B6D4, transparent)' }}
                      initial={{ top: '0%' }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Detection Results */}
                <div>
                  <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Detection Results</div>

                  <div className="space-y-3 mb-6">
                    {result.detections.map((det, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="glass-sm p-3 flex items-center gap-3"
                      >
                        <div className="w-3 h-3 rounded-full" style={{ background: det.color }} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{det.label}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold" style={{ color: det.color }}>{det.confidence}%</div>
                          <div className="h-1 w-16 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: det.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${det.confidence}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="glass-sm p-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Severity</div>
                        <div className={`text-sm font-bold ${result.summary.severity === 'HIGH' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {result.summary.severity}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Type</div>
                        <div className="text-sm font-bold text-[#06B6D4]">{result.summary.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Speed</div>
                        <div className="text-sm font-bold text-emerald-400">{result.time}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#475569] mt-3 text-center">
                    AI DEMONSTRATION MODE — Bounding boxes are simulated
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capability Cards */}
        <SectionHeader
          title="AI Capabilities"
          subtitle="What our computer vision system can detect."
          badge="⚡ Capabilities"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🕳️', title: 'Road Damage', desc: 'Potholes, cracks, surface erosion', accuracy: '94%' },
            { icon: '🅿️', title: 'Parking Violations', desc: 'Illegal parking, no-parking zones', accuracy: '91%' },
            { icon: '🌧️', title: 'Waterlogging', desc: 'Flooded roads, blocked drains', accuracy: '96%' },
            { icon: '🚶', title: 'Pedestrian Hazards', desc: 'Footpath obstruction, missing pavements', accuracy: '89%' },
          ].map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-5 h-full">
                <div className="text-3xl mb-3">{cap.icon}</div>
                <h4 className="text-sm font-bold text-white mb-1">{cap.title}</h4>
                <p className="text-xs text-[#94A3B8] mb-3">{cap.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#06B6D4]">{cap.accuracy}</span>
                  <span className="text-xs text-[#64748B]">demo accuracy</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
