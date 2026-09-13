import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Overview from './pages/Overview';
import LiveMap from './pages/LiveMap';
import Traffic from './pages/Traffic';
import Report from './pages/Report';
import AIDemo from './pages/AIDemo';
import BusTransit from './pages/BusTransit';
import RoadSafety from './pages/RoadSafety';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';
import Parking from './pages/Parking';
import Emergency from './pages/Emergency';
import AIChatbot from './components/chatbot/AIChatbot';

function ScrollRevealManager() {
  React.useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -22px 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollRevealManager />
        <div className="relative min-h-screen flex flex-col">
          <div className="gradient-mesh" />
          <Navbar />
          <main className="relative z-10 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/map" element={<LiveMap />} />
              <Route path="/traffic" element={<Traffic />} />
              <Route path="/report" element={<Report />} />
              <Route path="/ai" element={<AIDemo />} />
              <Route path="/bus" element={<BusTransit />} />
              <Route path="/safety" element={<RoadSafety />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/emergency" element={<Emergency />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav />
          <AIChatbot />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
