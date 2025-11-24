import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-lg overflow-hidden group";
  
  const variants = {
    primary: "text-charcoal bg-gradient-to-r from-teal via-[#4FD1C5] to-gold bg-[length:200%_auto] hover:bg-right shadow-[0_0_20px_rgba(46,196,182,0.3)] hover:shadow-[0_0_30px_rgba(46,196,182,0.5)]",
    secondary: "text-onyx bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal/50",
    ghost: "text-slate hover:text-teal bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};