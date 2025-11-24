import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { SectionHeading } from './ui/SectionHeading';
import { BIO_TAGS } from '../constants';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
            <SectionHeading 
              title="About" 
              subtitle="The human behind the system."
            />
          </div>

          <div className="md:col-span-8">
            <GlassCard className="p-8 md:p-10">
              <p className="text-xl md:text-2xl text-slate font-light leading-relaxed mb-8">
                I don't just design screens; I design the logic that governs them. My background bridges technical architecture and creative direction, allowing me to speak the languages of both engineers and users fluently.
              </p>
              <p className="text-slate/80 leading-relaxed mb-8">
                 With over 8 years of experience in product design and frontend architecture, I focus on scalability, performance, and aesthetic refinement. I believe the best interfaces feel inevitable—like they couldn't have worked any other way.
              </p>

              <div className="flex flex-wrap gap-3">
                {BIO_TAGS.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-4 py-2 rounded-full text-sm font-mono bg-white/5 border border-white/10 text-teal hover:border-teal/30 hover:bg-teal/5 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};