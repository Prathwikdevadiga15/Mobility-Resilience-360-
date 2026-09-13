import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Map, AlertTriangle, FileText, Bus, Shield, BarChart3, Settings, CarFront, Siren } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Command Center', icon: Zap },
  { to: '/overview', label: 'Overview', icon: Map },
  { to: '/map', label: 'Live Map', icon: Map },
  { to: '/traffic', label: 'Traffic', icon: AlertTriangle },
  { to: '/report', label: 'Report', icon: FileText },
  { to: '/bus', label: 'Bus', icon: Bus },
  { to: '/parking', label: 'Parking', icon: CarFront },
  { to: '/emergency', label: 'Emergency', icon: Siren },
  { to: '/safety', label: 'Road Safety', icon: Shield },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin', label: 'Admin', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Mobility 360 — home">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                  boxShadow: '0 0 16px rgba(6,182,212,0.28)',
                }}
              >
                <Zap size={18} className="text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <div
                  className="text-sm font-bold text-white leading-none tracking-tight group-hover:text-[#67e8f9] transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  MANGALURU
                </div>
                <div className="text-[10px] font-medium text-[#06B6D4] tracking-[0.15em] leading-none mt-0.5">
                  MOBILITY 360
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-semibold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5" role="menubar">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#06B6D4] bg-[#06B6D4]/10'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <link.icon size={14} aria-hidden="true" />
                    {link.label}
                    {isActive && (
                      <span className="nav-link-active-indicator" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/ai"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06B6D4]"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                  boxShadow: '0 0 20px rgba(6,182,212,0.3)',
                }}
                aria-label="Launch AI demo"
              >
                <Zap size={14} aria-hidden="true" />
                AI Demo
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06B6D4]"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong p-4 lg:hidden"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#06B6D4] bg-[#06B6D4]/10'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <link.icon size={18} aria-hidden="true" />
                    {link.label}
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
                        style={{ boxShadow: '0 0 6px rgba(6,182,212,0.9)' }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/ai"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white mt-2"
                style={{ background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)' }}
                role="menuitem"
                aria-label="Launch AI demo"
              >
                <Zap size={18} aria-hidden="true" />
                Launch AI Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
