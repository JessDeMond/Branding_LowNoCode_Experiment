import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    
    // If we are on the work page, we need to go home first
    if (currentView === 'work') {
      onNavigate('home');
      // Use setTimeout to allow render to happen before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Normal anchor behavior if already on home
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'py-4 bg-charcoal/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('#home')}
          className="group flex items-center gap-2"
        >
          {currentView === 'work' && (
             <ArrowLeft size={20} className="text-teal animate-pulse" />
          )}
          <span className="font-sans font-bold text-xl tracking-tight text-onyx group-hover:text-teal transition-colors">
            Jess DeMond<span className="text-teal">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {currentView === 'home' ? (
            NAV_ITEMS.map((item) => (
              <button 
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-slate hover:text-teal transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-teal to-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))
          ) : (
            <button 
              onClick={() => onNavigate('home')}
              className="text-sm font-medium text-slate hover:text-teal transition-colors"
            >
              Back to Home
            </button>
          )}
          
          {currentView === 'home' && (
             <div className="h-4 w-[1px] bg-white/10" />
          )}
          
          {currentView === 'home' && (
             <button
                onClick={() => onNavigate('work')}
                className="text-xs font-mono text-teal border border-teal/30 px-3 py-1.5 rounded hover:bg-teal/10 transition-all"
             >
                INDEX_V1
             </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate hover:text-teal transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-charcoal/95 backdrop-blur-xl border-b border-white/10 md:hidden p-6 flex flex-col space-y-4 shadow-2xl h-screen">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-lg font-medium text-slate hover:text-teal text-left"
            >
              {item.label}
            </button>
          ))}
          <div className="h-[1px] w-full bg-white/10 my-4" />
          <button 
            onClick={() => {
                onNavigate('work');
                setIsMobileOpen(false);
            }}
            className="text-lg font-mono text-teal text-left"
          >
            View Full Archive
          </button>
        </div>
      )}
    </nav>
  );
};