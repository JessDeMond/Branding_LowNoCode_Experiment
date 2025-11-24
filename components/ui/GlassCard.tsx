import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-white/[0.03] backdrop-blur-xl 
        border border-white/[0.08] 
        rounded-2xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:bg-white/[0.06] hover:border-teal/30 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(46,196,182,0.2)]' : ''}
        ${className}
      `}
    >
      {/* Subtle Noise Texture overlay could go here if using images, keeping it pure CSS for now */}
      {children}
    </div>
  );
};