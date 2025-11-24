import React from 'react';
import { Mail, Github, Linkedin, Twitter, Terminal } from 'lucide-react';
import { Button } from './ui/Button';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  return (
    <footer id="contact" className="py-24 border-t border-white/5 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-onyx mb-6">
              Let's build something <span className="text-teal">intelligent</span>.
            </h2>
            <p className="text-slate mb-8 font-light">
              Available for select freelance projects and consulting.
            </p>
            <Button>Say Hello</Button>
          </div>

          <div className="flex flex-col gap-6">
             <div className="flex gap-4">
               {[
                 { icon: <Mail size={20} />, href: "#" },
                 { icon: <Github size={20} />, href: "#" },
                 { icon: <Linkedin size={20} />, href: "#" },
                 { icon: <Twitter size={20} />, href: "#" }
               ].map((social, idx) => (
                 <a 
                  key={idx} 
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate hover:text-white hover:border-teal hover:bg-teal/10 transition-all duration-300"
                 >
                   {social.icon}
                 </a>
               ))}
               
               {/* Terminal Trigger */}
               <button
                 onClick={onOpenTerminal}
                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate hover:text-teal hover:border-teal/50 hover:bg-black/40 transition-all duration-300 group relative"
                 aria-label="Open Terminal"
               >
                  <Terminal size={18} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                    System Override (~)
                  </span>
               </button>
             </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate/40 font-mono">
          <p>© {new Date().getFullYear()} Jess DeMond. All rights reserved.</p>
          <p>Built with React & Tailwind. Designed in the Void.</p>
        </div>
      </div>
      
      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
    </footer>
  );
};