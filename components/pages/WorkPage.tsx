import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowUpRight, Filter } from 'lucide-react';
import { DecryptText } from '../ui/DecryptText';

export const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Engineering' | 'Design' | 'Strategy' | 'Experiment'>('All');
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setVisibleProjects(PROJECTS);
    } else {
      setVisibleProjects(PROJECTS.filter(p => p.category === filter));
    }
  }, [filter]);

  const categories = ['All', 'Engineering', 'Design', 'Strategy', 'Experiment'];

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-onyx mb-6">
            <DecryptText text="System Archive" />
          </h1>
          <p className="text-slate text-lg max-w-2xl font-light leading-relaxed">
            A complete index of commercial projects, open source contributions, and digital experiments.
            Each system is designed with a focus on scalability and user intent.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-slate mr-4">
            <Filter size={18} />
            <span className="text-sm font-mono uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`
                px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border
                ${filter === cat 
                  ? 'bg-teal/10 border-teal text-teal shadow-[0_0_15px_rgba(46,196,182,0.3)]' 
                  : 'bg-white/5 border-white/5 text-slate hover:bg-white/10 hover:text-white'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <GlassCard 
              key={project.id} 
              hoverEffect={true} 
              className="p-8 h-full flex flex-col group cursor-pointer border-t-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                 <span className="text-xs font-mono text-teal/60 uppercase tracking-widest border border-teal/20 px-2 py-1 rounded">
                   {project.category}
                 </span>
                 <span className="text-xs font-mono text-slate/40">
                   {project.year}
                 </span>
              </div>

              <h3 className="text-2xl font-bold text-onyx mb-3 group-hover:text-teal transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate/80 text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-slate/50 bg-black/20 px-2 py-1 rounded inline-block hover:scale-110 transition-transform duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="text-slate group-hover:text-gold transition-colors opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300" size={20} />
              </div>
            </GlassCard>
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-slate font-mono">No projects found in this sector.</p>
          </div>
        )}

      </div>
    </div>
  );
};