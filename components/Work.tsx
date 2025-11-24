import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface WorkProps {
    onNavigate: (view: ViewState) => void;
}

export const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  // Only show first 3 projects on home
  const displayProjects = PROJECTS.slice(0, 3);

  return (
    <section id="work" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Selected Work" 
          subtitle="A collection of systems, interfaces, and experiments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayProjects.map((project) => (
            <GlassCard 
              key={project.id} 
              hoverEffect={true} 
              className="p-6 h-full flex flex-col group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">
                  <span className="font-mono font-bold text-lg">{`0${project.id}`}</span>
                </div>
                <ArrowUpRight className="text-slate group-hover:text-gold transition-colors opacity-50 group-hover:opacity-100" size={20} />
              </div>
              
              <h3 className="text-xl font-bold text-onyx mb-2 group-hover:text-teal transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate/80 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-slate/60 border border-white/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex justify-center">
            <button 
                onClick={() => onNavigate('work')}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal/30 transition-all text-slate hover:text-teal"
            >
                View Full Archive
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
};