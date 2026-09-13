import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Map, Bus, Shield, Siren, CarFront, ExternalLink, Activity } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Live Map', icon: Map },
  { to: '/bus', label: 'Bus Transit', icon: Bus },
  { to: '/traffic', label: 'Traffic' },
  { to: '/parking', label: 'Parking', icon: CarFront },
  { to: '/emergency', label: 'Emergency', icon: Siren },
];

const techStack = [
  { label: 'AI Vision', color: '#8B5CF6' },
  { label: 'Real-Time Data', color: '#06B6D4' },
  { label: 'Live Maps', color: '#10B981' },
  { label: 'Smart Infrastructure', color: '#F59E0B' },
  { label: 'Citizen Platform', color: '#EF4444' },
  { label: 'Data Analytics', color: '#3B82F6' },
];

const platformLinks = [
  { icon: Map, label: 'Live Mobility', color: '#06B6D4', to: '/map' },
  { icon: Bus, label: 'Transit Intelligence', color: '#8B5CF6', to: '/bus' },
  { icon: Shield, label: 'Safety & Risk', color: '#10B981', to: '/safety' },
  { icon: Siren, label: 'Emergency Response', color: '#EF4444', to: '/emergency' },
  { icon: CarFront, label: 'Parking Intelligence', color: '#F59E0B', to: '/parking' },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/[0.07] pb-20 lg:pb-0"
      style={{
        background: 'linear-gradient(180deg, rgba(2,6,23,0.0) 0%, rgba(2,6,23,0.95) 8%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top gradient separator */}
      <div
        className="w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.35) 30%, rgba(139,92,246,0.25) 70%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 xl:gap-8">

          {/* Brand column */}
          <div className="xl:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group" aria-label="Mobility 360 home">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                  boxShadow: '0 0 25px rgba(6,182,212,0.3)',
                }}
              >
                <Zap size={18} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <div
                  className="text-base font-bold text-white tracking-[0.08em] group-hover:text-[#67e8f9] transition-colors"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  MOBILITY 360
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#64748B] mt-0.5">
                  Smart Mobility &bull; Connected Cities &bull; Better Living
                </div>
              </div>
            </Link>

            <p className="max-w-xs text-sm text-[#64748B] leading-relaxed mb-6">
              A next-generation smart city mobility operating platform connecting citizens, transit, roads, infrastructure, and real-time decision intelligence.
            </p>

            {/* Live status pill */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border"
              style={{
                background: 'rgba(16,185,129,0.06)',
                borderColor: 'rgba(16,185,129,0.15)',
              }}
            >
              <span className="live-dot" aria-label="System status: live" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
              <Activity size={13} className="text-emerald-500 ml-1" aria-hidden="true" />
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-[0.18em] mb-4">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-[#64748B] hover:text-[#06B6D4] transition-colors duration-200 flex items-center gap-2 group"
                >
                  {link.icon && <link.icon size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Technology column */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-[0.18em] mb-4">Technology</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.label}
                  className="footer-tech-tag"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: tech.color }}
                    aria-hidden="true"
                  />
                  {tech.label}
                </span>
              ))}
            </div>
          </div>

          {/* Platform column */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-[0.18em] mb-4">Platform</h4>
            <div className="flex flex-col gap-2.5">
              {platformLinks.map((pl) => (
                <Link
                  key={pl.label}
                  to={pl.to}
                  className="flex items-center gap-2 text-sm text-[#64748B] hover:text-white transition-colors duration-200 group"
                >
                  <pl.icon
                    size={13}
                    className="flex-shrink-0"
                    style={{ color: pl.color }}
                    aria-hidden="true"
                  />
                  {pl.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-[#334155]">
            &#169; 2026 Mobility 360. Built for a smarter Mangaluru.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-xs text-[#334155]">AI-Powered Mobility Platform</span>
            <span
              className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] px-2.5 py-1 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="live-dot" aria-hidden="true" />
              Smart city platform live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
