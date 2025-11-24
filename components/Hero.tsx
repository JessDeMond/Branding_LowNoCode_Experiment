import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { DecryptText } from './ui/DecryptText';
import { EntropyCore } from './interactive/EntropyCore';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-mono text-slate uppercase tracking-wider">DEMONDOS COMING SOON</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-onyx leading-[1.1] tracking-tight">
            <span className="block">Designing</span>
            <DecryptText text="Systems," speed={40} className="block text-transparent bg-clip-text bg-gradient-to-r from-teal via-white to-slate" />
            <span className="block">Stories, and Futures.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate font-light max-w-lg leading-relaxed">
            I’m Jess. A systems-minded, tech-forward creative exploring the edges of AI-supported thinking and design. My current work, demondOS, is an evolving ecosystem of tools, frameworks, and ideas built to reimagine how people learn, create, and interact with intelligent systems.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button onClick={() => onNavigate('work')}>
              View My Work <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Me
            </Button>
          </div>
        </div>

        {/* Right: Glass Card Visualization */}
        <div className="relative hidden lg:block">
           {/* Abstract Decorative Elements behind card */}
           <div className="absolute -inset-4 bg-gradient-to-tr from-teal/20 to-violet/20 rounded-2xl blur-xl opacity-30 animate-pulse" />
           
           <GlassCard className="p-8 md:p-12 relative z-10 flex flex-col justify-between min-h-[400px] border-t-teal/20">
              <div className="space-y-2">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-teal">
                        <Activity size={20} />
                        <span className="font-mono text-xs uppercase tracking-widest opacity-80">Live Monitor</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                    </div>
                 </div>

                 {/* Interactive Toy */}
                 <EntropyCore />

                 <h3 className="text-2xl font-light text-white">Current Focus</h3>
                 <p className="text-slate font-light leading-relaxed text-sm">
                   Exploring generative AI and design systems. Interact with the core above to visualize system entropy.
                 </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-xs font-mono text-slate/60 uppercase">Latest Commit</span>
                     <span className="text-sm text-teal font-mono mt-1 hover:underline cursor-pointer">update_neural_sys.tsx</span>
                   </div>
                   <div className="h-8 w-[1px] bg-white/10 mx-4" />
                   <div className="flex flex-col text-right">
                     <span className="text-xs font-mono text-slate/60 uppercase">Status</span>
                     <span className="text-sm text-gold font-mono mt-1">Deep Work</span>
                   </div>
                </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </section>
  );
};