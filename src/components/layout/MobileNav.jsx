import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Camera, Bus, User } from 'lucide-react';

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/report', icon: Camera, label: 'Report' },
  { to: '/bus', icon: Bus, label: 'Bus' },
  { to: '/admin', icon: User, label: 'Admin' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-strong"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-[#06B6D4]' : 'text-[#64748B]'
              }`}
            >
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="w-4 h-0.5 rounded-full bg-[#06B6D4] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
