import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  LineElement, PointElement, Filler, Tooltip, Legend,
} from 'chart.js';
import { SectionHeader, StatCard, GlassCard } from '../components/ui/Components';
import { useApp } from '../context/AppContext';
import * as api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Filler, Tooltip, Legend);

const chartFont = { family: 'Inter, sans-serif' };
const gridColor = 'rgba(255,255,255,0.04)';
const tickColor = '#64748B';

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleFont: { ...chartFont, weight: 'bold' },
      bodyFont: chartFont,
    },
  },
  scales: {
    x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
    y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
  },
};

export default function Analytics() {
  const { reports, stats } = useApp();
  const [dateRange, setDateRange] = useState('7d');
  const [locations, setLocations] = useState([]);
  const [hourlyData, setHourlyData] = useState({ labels: [], datasets: {} });
  const [severityCounts, setSeverityCounts] = useState({ high: 0, medium: 0, low: 0 });
  const [typeCounts, setTypeCounts] = useState({});

  useEffect(() => {
    api.getLocations().then(setLocations).catch(console.error);
    api.getHourlyTraffic().then(setHourlyData).catch(console.error);
    api.getSeverityBreakdown().then(setSeverityCounts).catch(console.error);
    api.getTypeBreakdown().then(setTypeCounts).catch(console.error);
  }, []);

  // Violation type breakdown
  const typeLabels = Object.keys(typeCounts);
  const typeValues = Object.values(typeCounts);

  const typeColors = ['#EF4444', '#F59E0B', '#06B6D4', '#8B5CF6', '#10B981', '#F97316', '#EC4899', '#14B8A6', '#A855F7', '#3B82F6', '#64748B', '#E11D48'];

  const doughnutData = {
    labels: typeLabels,
    datasets: [{
      data: typeValues,
      backgroundColor: typeColors.slice(0, typeLabels.length),
      borderColor: '#0F172A',
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  // Top congested areas bar chart
  const sortedLocs = [...locations].sort((a, b) => b.traffic.score - a.traffic.score).slice(0, 8);
  const barData = {
    labels: sortedLocs.map(l => l.name),
    datasets: [{
      label: 'Congestion %',
      data: sortedLocs.map(l => l.traffic.score),
      backgroundColor: sortedLocs.map(l =>
        l.traffic.score >= 75 ? 'rgba(239,68,68,0.7)' : l.traffic.score >= 50 ? 'rgba(245,158,11,0.7)' : 'rgba(16,185,129,0.7)'
      ),
      borderRadius: 6,
      barThickness: 28,
    }],
  };

  // Traffic over time
  const lineData = {
    labels: hourlyData.labels,
    datasets: [
      {
        label: 'Kankanady',
        data: hourlyData.datasets.kankanady || [],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6,182,212,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Nanthoor',
        data: hourlyData.datasets.nanthoor || [],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239,68,68,0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Hampankatta',
        data: hourlyData.datasets.hampankatta || [],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139,92,246,0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#94A3B8', font: { size: 11 }, usePointStyle: true, pointStyle: 'circle', padding: 20 },
      },
    },
    scales: {
      ...commonOptions.scales,
      y: { ...commonOptions.scales.y, ticks: { ...commonOptions.scales.y.ticks, callback: v => v + '%' } },
    },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <SectionHeader
            title="Analytics Center"
            subtitle="Data-driven insights into Mangaluru's traffic, violations, and road conditions."
            badge="📊 Analytics"
          />
          <div className="flex items-center glass-sm overflow-hidden">
            {['24h', '7d', '30d'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 text-xs font-medium transition-all ${
                  dateRange === range ? 'bg-[#06B6D4]/15 text-[#06B6D4]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {range === '24h' ? 'Today' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📋" label="Total Reports" value={stats.totalReports} color="#06B6D4" />
          <StatCard icon="⏳" label="Pending" value={stats.pendingReports} color="#F59E0B" />
          <StatCard icon="✅" label="Resolved" value={stats.resolvedReports} color="#10B981" />
          <StatCard icon="🔴" label="High Severity" value={stats.highSeverity} color="#EF4444" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Congested Areas */}
          <div className="glass p-5">
            <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Most Congested Areas
            </h3>
            <div style={{ height: 300 }}>
              <Bar data={barData} options={{
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                  x: { ...commonOptions.scales.x, ticks: { ...commonOptions.scales.x.ticks, callback: v => v + '%' } },
                  y: { ...commonOptions.scales.y, ticks: { ...commonOptions.scales.y.ticks, font: { size: 10 } } },
                },
              }} />
            </div>
          </div>

          {/* Violations by Type */}
          <div className="glass p-5">
            <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Reports by Type
            </h3>
            <div className="flex items-center gap-6">
              <div style={{ width: 200, height: 200 }}>
                <Doughnut data={doughnutData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '65%',
                  plugins: {
                    legend: { display: false },
                    tooltip: commonOptions.plugins.tooltip,
                  },
                }} />
              </div>
              <div className="flex-1 space-y-2">
                {typeLabels.slice(0, 6).map((label, i) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: typeColors[i] }} />
                    <span className="text-[#94A3B8] flex-1">{label}</span>
                    <span className="font-bold text-white">{typeValues[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Over Time */}
        <div className="glass p-5 mb-8">
          <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Congestion Trends Over Time
          </h3>
          <div style={{ height: 300 }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Severity & Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-5">
            <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Severity Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'High', value: severityCounts.high, total: reports.length, color: '#EF4444' },
                { label: 'Medium', value: severityCounts.medium, total: reports.length, color: '#F59E0B' },
                { label: 'Low', value: severityCounts.low, total: reports.length, color: '#10B981' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94A3B8]">{item.label}</span>
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.value} ({item.total > 0 ? Math.round(item.value / item.total * 100) : 0}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.total > 0 ? (item.value / item.total * 100) : 0}%` }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-5">
            <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Congestion by Zone</h3>
            <div className="space-y-2">
              {[...locations].sort((a, b) => b.traffic.congestion - a.traffic.congestion).slice(0, 6).map((loc, i) => (
                <div key={loc.id} className="flex items-center gap-3">
                  <span className="text-xs text-[#64748B] w-4">#{i + 1}</span>
                  <span className="text-sm text-[#CBD5E1] flex-1">{loc.name}</span>
                  <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: loc.traffic.congestion >= 70 ? '#EF4444' : loc.traffic.congestion >= 50 ? '#F59E0B' : '#10B981' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${loc.traffic.congestion}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-8 text-right">{loc.traffic.congestion}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <span className="badge" style={{ background: 'rgba(100,116,139,0.12)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.2)' }}>
            ⚪ DEMO DATA — Charts use simulated analytics
          </span>
        </div>
      </div>
    </div>
  );
}
