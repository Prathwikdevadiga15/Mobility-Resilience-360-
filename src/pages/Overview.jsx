import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Camera, Map, Bus, Shield, BarChart3, Eye, CheckCircle,
  TrendingUp, AlertTriangle, Layers, TrainFront, Gauge, CarFront,
  ShieldAlert, Leaf, Navigation, MapPinned, Sparkles, Activity,
} from 'lucide-react';
import CityMap from '../components/map/CityMap';
import { StatCard, SectionHeader, GlassCard } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Overview() {
  const { stats } = useApp();

  const heroMetrics = [
    { value: Math.max(5, Math.min(18, stats.highSeverity + 2)), label: 'Traffic Hotspots', color: '#EF4444' },
    { value: Math.max(12, stats.totalReports), label: 'Road Issues', color: '#F97316' },
    { value: 42, label: 'Bus Stops', color: '#8B5CF6' },
    { value: Math.min(99, Math.max(80, 82 + Math.round(stats.pendingReports / 10))), label: 'Mobility Score', color: '#06B6D4' },
  ];

  return (
    <div className="retro-home-shell pt-8 pb-20">
      <section className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Mobility 360 overview"
            subtitle="Real-time intelligence for safer roads, smarter transit, and a better-connected city."
            badge="AI-powered smart city mobility"
            center
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
              >
                <StatCard
                  icon={<Activity size={16} />}
                  label={metric.label}
                  value={metric.value}
                  color={metric.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: '/report', icon: Camera, title: 'Report an Issue', desc: 'Upload a photo or video to detect the problem automatically.', color: '#EF4444' },
              { to: '/map', icon: Map, title: 'View Traffic Map', desc: 'See traffic, issues, and road conditions in one place.', color: '#06B6D4' },
              { to: '/bus', icon: Bus, title: 'Check Bus Timings', desc: 'View bus routes, stops, and transfer points quickly.', color: '#8B5CF6' },
            ].map((action) => (
              <Link key={action.title} to={action.to} aria-label={action.title}>
                <GlassCard className="h-full p-6" hover>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${action.color}15` }}>
                    <action.icon size={24} style={{ color: action.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>{action.title}</h3>
                  <p className="text-sm text-[#94A3B8] mb-4">{action.desc}</p>
                  <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: action.color }}>
                    Get Started <ArrowRight size={14} />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] items-center gap-10">
          <div>
            <span className="badge badge-primary mb-5 inline-flex">City Operating System</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] mb-5" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
              One Platform.<br />
              <span style={{
                background: 'linear-gradient(135deg, #67e8f9, #06B6D4, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                A Smarter Way<br />to Move.
              </span>
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-7">
              Mobility 360 unifies buses, roads, parking, citizen reports, and emergency intelligence into one real-time operating layer for a responsive city.
            </p>
            <div className="space-y-3.5">
              {[
                'Real-time mobility insights for faster decisions',
                'Data-driven planning across city infrastructure',
                'Connected transport, safety, and service visibility',
                'Citizen convenience and safer urban movement',
                'Sustainable and resilient city operations',
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20" aria-hidden="true">
                    <CheckCircle size={11} className="text-cyan-400" />
                  </span>
                  <span className="text-[#CBD5E1] text-sm leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-strong overflow-hidden rounded-[30px] p-5 sm:p-6">
              <div
                className="relative h-[420px] rounded-[22px] overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1), transparent 50%), linear-gradient(135deg, rgba(15,23,42,0.96), rgba(9,15,32,0.9))',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} aria-hidden="true">
                  <line x1="50%" y1="50%" x2="22%" y2="32%" stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="50%" y1="50%" x2="78%" y2="32%" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="50%" y1="50%" x2="22%" y2="68%" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="50%" y1="50%" x2="78%" y2="68%" stroke="rgba(239,68,68,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="rgba(59,130,246,0.35)" strokeWidth="1.5" strokeDasharray="4,4" />
                </svg>

                {[
                  { label: 'Bus', icon: '🚌', left: '10%', top: '23%', color: '#06B6D4' },
                  { label: 'Roads', icon: '🛣️', left: '38%', top: '8%', color: '#8B5CF6' },
                  { label: 'Traffic', icon: '🚦', left: '67%', top: '23%', color: '#F59E0B' },
                  { label: 'Citizens', icon: '👥', left: '10%', top: '60%', color: '#10B981' },
                  { label: 'Emergency', icon: '🚨', left: '67%', top: '60%', color: '#EF4444' },
                  { label: 'Parking', icon: '🅿️', left: '38%', top: '72%', color: '#3B82F6' },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="eco-node"
                    style={{
                      left: node.left,
                      top: node.top,
                      width: 76,
                      height: 76,
                      marginLeft: -38,
                      marginTop: -38,
                      zIndex: 2,
                      background: `${node.color}12`,
                      border: `1.5px solid ${node.color}40`,
                      boxShadow: `0 0 20px ${node.color}20`,
                    }}
                    title={node.label}
                  >
                    <span className="text-xl" aria-hidden="true">{node.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: node.color }}>{node.label}</span>
                  </div>
                ))}

                <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
                  <div className="rounded-2xl px-5 py-3.5 text-center" style={{ background: 'rgba(9,15,32,0.9)', border: '1px solid rgba(6,182,212,0.35)', boxShadow: '0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(139,92,246,0.1)' }}>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">Mobility</div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>360&#176;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            title="Live city mobility preview"
            subtitle="Real-time visibility across roads, transit, congestion, and critical city mobility touchpoints."
            badge="🗺️ Live Map"
            center
          />

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_25px_70px_rgba(15,23,42,0.55)]">
              <CityMap height="520px" showControls={false} interactive={false} mini={false} className="rounded-[24px]" />
            </div>

            <div className="space-y-4 flex flex-col">
              {[
                { title: 'Congestion hotspots', value: '14', detail: 'High-risk corridors active', color: '#EF4444', icon: '🔴' },
                { title: 'Transit coverage', value: '89%', detail: 'Connected routes in service', color: '#06B6D4', icon: '🚌' },
                { title: 'Emergency readiness', value: '7 min', detail: 'Average response signal', color: '#8B5CF6', icon: '🚨' },
                { title: 'Mobility score', value: '87', detail: 'City-wide health index', color: '#10B981', icon: '✅' },
              ].map((metric, i) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="glass p-5 rounded-[20px] flex items-center gap-4 flex-1"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${metric.color}15` }} aria-hidden="true">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#94A3B8] mb-1">{metric.title}</div>
                    <div className="text-2xl font-bold" style={{ color: metric.color, fontFamily: 'Space Grotesk' }}>{metric.value}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{metric.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            title="Mobility intelligence across the city"
            subtitle="Connected capabilities designed to help commuters, operators, and city teams move smarter, faster, and safer."
            badge="⚙️ Platform"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              { title: 'Smart Bus Transit', desc: 'Live route visibility, stop intelligence, and commuter-ready schedule guidance for everyday mobility.', icon: TrainFront, color: '#8B5CF6', tag: 'Transit', route: '/bus' },
              { title: 'Live City Map', desc: 'A single operational map showing congestion, risk zones, reports, and city conditions in real time.', icon: MapPinned, color: '#06B6D4', tag: 'Map', route: '/map' },
              { title: 'Traffic Intelligence', desc: 'Dynamic intersection analysis, high-risk corridors, and predictive congestion awareness for better decisions.', icon: Gauge, color: '#F59E0B', tag: 'Traffic', route: '/traffic' },
              { title: 'Smart Parking', desc: 'Parking hotspots and violation patterns that reduce chaos, time loss, and unsafe roadside parking.', icon: CarFront, color: '#10B981', tag: 'Parking', route: '/parking' },
              { title: 'Emergency & Safety', desc: 'Rapid identification of critical risk points to support faster responses for citizens and city teams.', icon: ShieldAlert, color: '#EF4444', tag: 'Safety', route: '/emergency' },
              { title: 'Sustainable Mobility', desc: 'Low-carbon travel insights, optimized flows, and cleaner urban movement built around people-first planning.', icon: Leaf, color: '#22C55E', tag: 'Green', route: '/analytics' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group"
              >
                <Link to={feature.route} aria-label={`Explore ${feature.title}`} style={{ display: 'block', height: '100%' }}>
                  <div className="feature-card glass h-full p-6" style={{ minHeight: 220 }}>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className="icon-wrap w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: `${feature.color}16`, color: feature.color }} aria-hidden="true">
                          <feature.icon size={22} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full" style={{ color: feature.color, background: `${feature.color}12`, border: `1px solid ${feature.color}25` }}>
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2.5" style={{ fontFamily: 'Space Grotesk' }}>{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-[#94A3B8] flex-1">{feature.desc}</p>

                      <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/8">
                        <span className="text-sm font-semibold" style={{ color: feature.color }}>Explore</span>
                        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 group-hover:border-white/25 transition-all duration-300 group-hover:scale-110" style={{ color: feature.color }}>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Why Mobility 360?"
            subtitle="Mangaluru's mobility problems are interconnected. Our platform connects them too."
            badge="💡 The Problem"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <AlertTriangle size={14} aria-hidden="true" /> Today's Reality
              </h3>
              <div className="space-y-3">
                {[
                  'Fragmented reporting across different channels',
                  'No unified map of road conditions',
                  'Delayed problem detection and response',
                  'Manual prioritization by overwhelmed staff',
                  'Scattered bus and transport information',
                  'Limited predictive intelligence',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                    <span className="text-red-400 mt-0.5" aria-hidden="true">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-[#06B6D4]/20" hover={false}>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Layers size={14} aria-hidden="true" /> With Mobility 360
              </h3>
              <div className="space-y-3">
                {[
                  'One intelligent map for all road data',
                  'AI-powered issue detection & classification',
                  'Automated severity scoring & prioritization',
                  'Predictive traffic congestion alerts',
                  'Unified bus routes and schedules',
                  'Data-driven decision making for authorities',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                    <span className="text-cyan-400 mt-0.5" aria-hidden="true">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="How It Works"
            subtitle="From citizen report to city action in minutes, powered by AI."
            badge="🔄 Process"
            center
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-6">For Citizens</h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Report', desc: 'Take a photo or video of any road issue, violation, or problem.', icon: Camera },
                  { step: '02', title: 'AI Detects', desc: 'AI identifies the issue type, estimates severity, and locates it on the map.', icon: Eye },
                  { step: '03', title: 'City Acts', desc: 'Reports are prioritized and routed to authorities for action.', icon: CheckCircle },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>{s.step}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                      <p className="text-sm text-[#94A3B8]">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-6">For Authorities</h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'View Dashboard', desc: 'See all reports, risk zones, and traffic data in one command center.', icon: BarChart3 },
                  { step: '02', title: 'Prioritize', desc: 'AI ranks issues by severity, exposure, and citizen impact.', icon: TrendingUp },
                  { step: '03', title: 'Resolve & Track', desc: 'Mark issues resolved, add notes, and track city-wide progress.', icon: Shield },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>{s.step}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                      <p className="text-sm text-[#94A3B8]">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="cta-section text-center">
            <div className="relative z-10">
              <span className="badge badge-primary mb-6 inline-flex items-center gap-2">
                <Sparkles size={11} /> Smart City Platform
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.1]" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
                Experience the Future<br />of Urban Mobility
              </h2>

              <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto leading-relaxed">
                One intelligent platform connecting people, transportation, infrastructure, and real-time city insights — built for Mangaluru, ready for any city.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/map" className="btn-cta-primary text-base px-9 py-4" aria-label="Explore Mobility 360 platform">
                  <Navigation size={18} /> Explore Mobility 360
                </Link>
                <Link to="/map" className="btn-cta-secondary text-base px-9 py-4" aria-label="View live city map">
                  <Map size={18} /> View Live Map
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
