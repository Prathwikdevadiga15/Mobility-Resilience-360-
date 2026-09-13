import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, Clock, X, Filter, Eye, AlertTriangle, Download, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader, StatCard, GlassCard, CircularGauge, Badge } from '../components/ui/Components';
import * as api from '../services/api';

function getStatusBadge(status) {
  switch (status) {
    case 'pending': return { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' };
    case 'in_progress': return { label: 'In Progress', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' };
    case 'verified': return { label: 'Verified', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' };
    case 'resolved': return { label: 'Resolved', color: '#10B981', bg: 'rgba(16,185,129,0.15)' };
    case 'rejected': return { label: 'Rejected', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' };
    default: return { label: 'Unknown', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' };
  }
}

function getSeverityBadge(severity) {
  switch (severity) {
    case 'high': return { label: 'High', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' };
    case 'medium': return { label: 'Medium', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' };
    case 'low': return { label: 'Low', color: '#10B981', bg: 'rgba(16,185,129,0.15)' };
    default: return { label: 'Unknown', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' };
  }
}

const statusOptions = ['all', 'pending', 'in_progress', 'verified', 'resolved', 'rejected'];
const severityOptions = ['all', 'high', 'medium', 'low'];

export default function Admin() {
  const { reports, updateReportStatus, stats } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState('reports');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.getLocations().then(setLocations).catch(console.error);
  }, []);

  const filteredReports = useMemo(() => {
    let filtered = [...reports];
    if (statusFilter !== 'all') filtered = filtered.filter(r => r.status === statusFilter);
    if (severityFilter !== 'all') filtered = filtered.filter(r => r.severity === severityFilter);
    return filtered.sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
  }, [reports, statusFilter, severityFilter]);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      if (selectedReport?.id === reportId) {
        setSelectedReport(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-white/5 bg-[#0F172A]/50 p-4">
        <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Admin Panel</h3>
        {[
          { id: 'reports', label: 'Reports Queue', icon: '📋', count: stats.pendingReports },
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'priority', label: 'Priority Engine', icon: '🚨' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 w-full text-left ${
              activeTab === tab.id ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="flex-1">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B]">{tab.count}</span>
            )}
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-white/5">
          <button className="btn-ghost w-full justify-start text-xs gap-2">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 py-6 overflow-auto">
        {/* Mobile Tab Selector */}
        <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
          {['reports', 'overview', 'priority'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab whitespace-nowrap ${activeTab === tab ? 'tab-active' : ''}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <SectionHeader title="City Overview" subtitle="Real-time city intelligence dashboard for authorities." badge="👮 Admin" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon="📋" label="Total Reports" value={stats.totalReports} color="#06B6D4" />
              <StatCard icon="⏳" label="Pending" value={stats.pendingReports} color="#F59E0B" />
              <StatCard icon="🔧" label="In Progress" value={stats.inProgressReports} color="#8B5CF6" />
              <StatCard icon="✅" label="Resolved" value={stats.resolvedReports} color="#10B981" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.slice(0, 6).map(loc => (
                <GlassCard key={loc.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{loc.name}</span>
                    <CircularGauge value={loc.risk.overall} size={40} strokeWidth={3} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-[#64748B]">Traffic</div>
                      <div className="text-sm font-bold text-red-400">{loc.traffic.score}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748B]">Violations</div>
                      <div className="text-sm font-bold text-yellow-400">{loc.recentViolations}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748B]">Reports</div>
                      <div className="text-sm font-bold text-cyan-400">{loc.recentReports}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'priority' && (
          <div>
            <SectionHeader title="Priority Engine" subtitle="AI-ranked reports by severity, traffic exposure, and citizen impact." badge="🚨 Priority" />
            <div className="space-y-3">
              {filteredReports.slice(0, 10).map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-sm p-4 flex items-center gap-4"
                >
                  <div className="text-center">
                    <div className="text-xs text-[#64748B]">Priority</div>
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: report.priorityScore >= 80 ? '#EF4444' : report.priorityScore >= 60 ? '#F59E0B' : '#10B981' }}>
                      #{i + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{report.icon}</span>
                      <span className="text-sm font-bold text-white">{report.typeLabel}</span>
                      <span className="badge" style={{ background: getSeverityBadge(report.severity).bg, color: getSeverityBadge(report.severity).color, fontSize: '10px' }}>
                        {report.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-[#94A3B8]">{report.location.name} • {report.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#64748B]">Score</div>
                    <div className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{report.priorityScore}/100</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <SectionHeader title="Reports Queue" subtitle="Manage and resolve citizen reports." badge="📋 Reports" />
              <div className="flex gap-2 flex-wrap">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input py-1.5 text-xs w-auto">
                  {statusOptions.map(s => (
                    <option key={s} value={s} style={{ background: '#0F172A' }}>{s === 'all' ? 'All Status' : s.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</option>
                  ))}
                </select>
                <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="input py-1.5 text-xs w-auto">
                  {severityOptions.map(s => (
                    <option key={s} value={s} style={{ background: '#0F172A' }}>{s === 'all' ? 'All Severity' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredReports.map((report, i) => {
                const statusBadge = getStatusBadge(report.status);
                const severityBadge = getSeverityBadge(report.severity);
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div
                      className={`glass-sm p-4 cursor-pointer transition-all hover:border-[#06B6D4]/20 ${selectedReport?.id === report.id ? 'border-[#06B6D4]/30 glow-primary' : ''}`}
                      onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{report.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold text-white">{report.typeLabel}</span>
                            <span className="badge text-[10px]" style={{ background: severityBadge.bg, color: severityBadge.color }}>{report.severity.toUpperCase()}</span>
                            <span className="badge text-[10px]" style={{ background: statusBadge.bg, color: statusBadge.color }}>{statusBadge.label}</span>
                          </div>
                          <div className="text-xs text-[#94A3B8] truncate">{report.location.name} • {report.id}</div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-[#64748B]">AI Confidence</div>
                          <div className="text-sm font-bold text-[#06B6D4]">{report.aiConfidence}%</div>
                        </div>
                        <ChevronDown size={16} className={`text-[#64748B] transition-transform ${selectedReport?.id === report.id ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Expanded Detail */}
                      <AnimatePresence>
                        {selectedReport?.id === report.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-white/5">
                              {report.description && (
                                <p className="text-sm text-[#94A3B8] mb-3">{report.description}</p>
                              )}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                  <div className="text-[10px] text-[#64748B]">Priority</div>
                                  <div className="text-sm font-bold text-white">{report.priorityScore}/100</div>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                  <div className="text-[10px] text-[#64748B]">AI Confidence</div>
                                  <div className="text-sm font-bold text-[#06B6D4]">{report.aiConfidence}%</div>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                  <div className="text-[10px] text-[#64748B]">Location</div>
                                  <div className="text-xs font-bold text-white truncate">{report.location.name}</div>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                  <div className="text-[10px] text-[#64748B]">Reported</div>
                                  <div className="text-xs font-bold text-white">{new Date(report.createdAt).toLocaleDateString()}</div>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {report.status !== 'resolved' && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'resolved'); }}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                                  >
                                    ✓ Mark Resolved
                                  </button>
                                )}
                                {report.status === 'pending' && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'in_progress'); }}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 hover:bg-[#06B6D4]/20 transition-colors"
                                  >
                                    → In Progress
                                  </button>
                                )}
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'rejected'); }}
                                  className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                >
                                  ✕ Reject
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}

              {filteredReports.length === 0 && (
                <div className="glass p-8 text-center">
                  <div className="text-3xl mb-3">📭</div>
                  <h3 className="text-lg font-bold text-white mb-1">No Reports Found</h3>
                  <p className="text-sm text-[#94A3B8]">No reports match your current filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
