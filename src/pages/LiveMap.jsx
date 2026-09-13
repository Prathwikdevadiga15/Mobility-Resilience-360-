import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Clock, MapPin } from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { useApp } from '../context/AppContext';

const timeOptions = [
  { value: '1h', label: 'Last 1h' },
  { value: '6h', label: 'Last 6h' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7 days' },
];

const zones = ['all', 'Nanthoor', 'Kankanady', 'Pumpwell', 'Hampankatta', 'Lalbagh', 'Padil', 'Surathkal', 'Kadri', 'Bejai', 'Panambur'];

export default function LiveMap() {
  const { timeFilter, setTimeFilter, zoneFilter, setZoneFilter } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Live City Map
            </h1>
            <p className="text-sm text-[#94A3B8]">Interactive map of Mangaluru's mobility intelligence</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Time Filter */}
            <div className="flex items-center glass-sm overflow-hidden">
              {timeOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTimeFilter(opt.value)}
                  className={`px-3 py-2 text-xs font-medium transition-all ${
                    timeFilter === opt.value
                      ? 'bg-[#06B6D4]/15 text-[#06B6D4]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Zone Filter */}
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="input py-2 text-xs w-auto min-w-[140px]"
            >
              {zones.map(z => (
                <option key={z} value={z} style={{ background: '#0F172A' }}>
                  {z === 'all' ? 'All Zones' : z}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1440px] mx-auto">
          <CityMap height="calc(100vh - 180px)" showControls={true} />
        </div>
      </div>
    </div>
  );
}
