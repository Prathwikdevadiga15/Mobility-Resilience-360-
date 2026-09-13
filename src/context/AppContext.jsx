import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';
import { sampleReports } from '../data/reports';

const AppContext = createContext(null);

const fallbackStats = {
  totalReports: sampleReports.length,
  pendingReports: sampleReports.filter(report => report.status === 'pending').length,
  resolvedReports: sampleReports.filter(report => report.status === 'resolved').length,
  inProgressReports: sampleReports.filter(report => report.status === 'in_progress').length,
  highSeverity: sampleReports.filter(report => report.severity === 'high').length,
  todayReports: sampleReports.filter(report => new Date(report.createdAt).toDateString() === new Date().toDateString()).length,
};

export function AppProvider({ children }) {
  const [reports, setReports] = useState(sampleReports);
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    traffic: true,
    violations: true,
    potholes: true,
    footpaths: false,
    parking: false,
    waterlogging: true,
    accidentRisk: false,
    busStops: true,
  });
  const [timeFilter, setTimeFilter] = useState('24h');
  const [zoneFilter, setZoneFilter] = useState('all');

  // Fetch reports from API on mount
  const fetchReports = useCallback(async () => {
    try {
      const data = await api.getReports();
      setReports(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      setReports(sampleReports);
      setError(err.message);
    }
  }, []);

  // Fetch stats from API
  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getReportStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setStats(fallbackStats);
      setError(err.message);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    async function init() {
      setLoading(true);
      await Promise.all([fetchReports(), fetchStats()]);
      setLoading(false);
    }
    init();
  }, [fetchReports, fetchStats]);

  const addReport = useCallback(async (report) => {
    try {
      const newReport = await api.createReport(report, report.imageFile);
      setReports(prev => [newReport, ...prev]);
      // Refresh stats
      fetchStats();
      return newReport;
    } catch (err) {
      console.error('Failed to create report:', err);
      throw err;
    }
  }, [fetchStats]);

  const updateReportStatus = useCallback(async (id, status) => {
    try {
      const updated = await api.updateReportStatus(id, status);
      setReports(prev => prev.map(r => r.id === id ? updated : r));
      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error('Failed to update report status:', err);
      throw err;
    }
  }, [fetchStats]);

  const toggleLayer = useCallback((layer) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const value = {
    reports,
    addReport,
    updateReportStatus,
    fetchReports,
    selectedLocation,
    setSelectedLocation,
    mapLayers,
    setMapLayers,
    toggleLayer,
    timeFilter,
    setTimeFilter,
    zoneFilter,
    setZoneFilter,
    stats,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
