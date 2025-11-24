import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Notes } from './components/Notes';
import { Footer } from './components/Footer';
import { WorkPage } from './components/pages/WorkPage';
import { BackToTop } from './components/ui/BackToTop';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleNavigate = (view: ViewState) => {
    // Scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-charcoal text-onyx font-sans antialiased selection:bg-teal/20 selection:text-teal">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Work onNavigate={handleNavigate} />
            <Notes />
          </>
        ) : (
          <WorkPage />
        )}
      </main>
      
      <Footer />
      <BackToTop />
      
      {/* Global Background Noise/Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-[9999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}

export default App;