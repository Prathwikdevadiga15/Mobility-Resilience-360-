import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Clock, MapPin, ArrowRight } from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { GlassCard, CircularGauge, SectionHeader, Badge } from '../components/ui/Components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
import * as api from '../services/api';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

function getTrafficLevel(score) {
  if (score >= 75) return { level: 'high', color: '#EF4444', label: 'Heavy' };
  if (score >= 50) return { level: 'medium', color: '#F59E0B', label: 'Moderate' };
  return { level: 'low', color: '#10B981', label: 'Low' };
}

export default function Traffic() {
  const [selectedArea, setSelectedArea] = useState('kankanady');
  const [locations, setLocations] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [hourlyData, setHourlyData] = useState({ labels: [], datasets: {} });

  useEffect(() => {
    api.getLocations().then(setLocations).catch(console.error);
    api.getTrafficPredictions().then(setPredictions).catch(console.error);
    api.getHourlyTraffic().then(setHourlyData).catch(console.error);
  }, []);

  const sortedLocations = [...locations].sort((a, b) => b.traffic.score - a.traffic.score);

  const chartData = {
    labels: hourlyData.labels,
    datasets: [
      {
        label: 'Congestion %',
        data: hourlyData.datasets[selectedArea] || hourlyData.datasets.kankanady || [],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6,182,212,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#06B6D4',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748B', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748B', font: { size: 11 }, callback: v => v + '%' },
        min: 0, max: 100,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.95)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleFont: { family: 'Space Grotesk' },
        callbacks: { label: (ctx) => `Congestion: ${ctx.raw}%` },
      },
    },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="AI Traffic Intelligence"
          subtitle="Real-time congestion analysis and AI-powered predictions for Mangaluru's roads."
          badge="🚦 Traffic"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <CityMap height="400px" showControls={false} locations={locations} />
          </div>

          {/* Top Congested */}
          <div className="glass p-5">
            <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Most Congested Areas</h3>
            <div className="space-y-3">
              {sortedLocations.slice(0, 6).map((loc, i) => {
                const level = getTrafficLevel(loc.traffic.score);
                return (
                  <div key={loc.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#64748B] w-5">#{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{loc.name}</span>
                        <span className="text-xs font-bold" style={{ color: level.color }}>{loc.traffic.score}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: level.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${loc.traffic.score}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Predictions */}
        <SectionHeader
          title="AI Congestion Predictions"
          subtitle="Based on historical patterns and current data."
          badge="🔮 Predictions"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {predictions.map((pred, i) => (
            <motion.div
              key={pred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-5" hover={false}>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={pred.level === 'high' ? 'danger' : 'warning'}>
                    <AlertTriangle size={10} />
                    {pred.level === 'high' ? 'High Congestion' : 'Moderate Congestion'} Predicted
                  </Badge>
                  <span className="text-xs font-bold text-[#06B6D4]">{pred.confidence}% confidence</span>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-[#94A3B8]" />
                    <span className="text-white font-medium">{pred.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-[#94A3B8]" />
                    <span className="text-[#CBD5E1]">{pred.timeWindow}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#06B6D4]/5 border border-[#06B6D4]/10">
                  <p className="text-xs text-[#94A3B8]">
                    <span className="text-[#06B6D4] font-semibold">AI Recommendation:</span> {pred.recommendation}
                  </p>
                </div>
                <p className="text-xs text-[#64748B] mt-2">{pred.reason}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Traffic Trend Chart */}
        <div className="glass p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Congestion Trends
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="input py-1.5 text-xs w-auto"
              >
                {Object.keys(hourlyData.datasets).map(key => (
                  <option key={key} value={key} style={{ background: '#0F172A' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ height: 280 }}>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="badge" style={{ background: 'rgba(100,116,139,0.12)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.2)' }}>
              ⚪ Demo Data — Simulated congestion patterns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
