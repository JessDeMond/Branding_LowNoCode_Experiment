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
                I don’t just build tools; I architect the systems around them. My work sits at the intersection of intuition, structure, and emerging technology—translating complex ideas into clear, elegant frameworks that actually make sense to people.
              </p>
              
              <div className="space-y-6 text-slate/80 leading-relaxed mb-10 text-base md:text-lg">
                <p>
                  I’m less interested in completing tasks and more interested in reimagining the systems those tasks live inside. Whether I’m designing workflows, mapping digital identity, or building AI-powered learning environments, I approach everything like a long-term blueprint: coherent, scalable, and purpose-driven.
                </p>
                <p>
                  My background isn’t a list of linear roles — it’s a network of ideas.
                  I combine product thinking, enterprise logic, technical curiosity, and human-centered design to build solutions that feel inevitable, like they always could’ve been this way.
                </p>
                <p>
                  Right now, I’m focused on personal OS design, AI-enabled workflows, and next-generation learning ecosystems — spaces where creativity meets architecture and where even small improvements can ripple outward into meaningful transformation.
                </p>
                <p className="text-white font-medium">
                  The through-line across all my work is simple:
                  I build systems that help people think, learn, and move through the world with more clarity.
                </p>
              </div>

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