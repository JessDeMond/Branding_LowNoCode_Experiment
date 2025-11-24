import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-40 p-3 
        rounded-full bg-charcoal/80 backdrop-blur-md border border-white/10 
        text-teal shadow-lg shadow-black/50
        transition-all duration-500 ease-out transform
        hover:bg-white/10 hover:border-teal/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(46,196,182,0.3)]
        group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="group-hover:animate-pulse" />
    </button>
  );
};