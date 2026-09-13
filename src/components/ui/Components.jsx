import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedCounter, useScrollReveal } from '../../hooks/useUtils';

export function GlassCard({ children, className = '', hover = true, onClick, style }) {
  return (
    <motion.div
      data-reveal
      className={`glass reveal-on-scroll ${hover ? 'glow-hover cursor-pointer' : ''} ${className}`}
      style={style}
      whileHover={hover ? { y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 240, damping: 18 } } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ icon, label, value, color = '#06B6D4', trend, suffix = '' }) {
  const { count, ref } = useAnimatedCounter(typeof value === 'number' ? value : 0);

  return (
    <div ref={ref} data-reveal className="stat-card reveal-on-scroll">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-xs font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color, fontFamily: 'Space Grotesk' }}>
        {typeof value === 'number' ? count : value}{suffix}
      </div>
      <div className="text-sm text-[#94A3B8]">{label}</div>
    </div>
  );
}

export function CircularGauge({ value, max = 100, size = 140, strokeWidth = 10, label, color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  const gaugeColor = color || (value >= 80 ? '#EF4444' : value >= 60 ? '#F59E0B' : value >= 40 ? '#06B6D4' : '#10B981');

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${gaugeColor}60)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color: gaugeColor, fontFamily: 'Space Grotesk' }}>
          {value}
        </span>
        {label && <span className="text-[10px] text-[#94A3B8] mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

export function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}

export function DataConfidenceBadge({ level }) {
  const config = {
    verified: { label: 'Verified', icon: '🟢', cls: 'badge-success' },
    community: { label: 'Community', icon: '🟡', cls: 'badge-warning' },
    demo: { label: 'Demo Data', icon: '⚪', cls: '' },
    outdated: { label: 'Needs Verification', icon: '🔴', cls: 'badge-danger' },
  };
  const c = config[level] || config.demo;
  return (
    <span className={`badge ${c.cls}`} style={level === 'demo' ? { background: 'rgba(100,116,139,0.12)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.2)' } : undefined}>
      {c.icon} {c.label}
    </span>
  );
}

export function SectionHeader({ title, subtitle, badge, center = false }) {
  const { visible, ref } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      data-reveal
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${center ? 'text-center mb-12' : 'mb-10'} reveal-on-scroll`}
    >
      {badge && (
        <span className="badge badge-primary mb-4 inline-flex">{badge}</span>
      )}
      <h2 className="section-title text-white mb-3">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
