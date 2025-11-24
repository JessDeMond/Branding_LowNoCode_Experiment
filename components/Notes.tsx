import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { NOTES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface NotesProps {
    onNavigate?: (view: ViewState) => void;
}

export const Notes: React.FC<NotesProps> = ({ onNavigate }) => {
  // Show only first 3 notes
  const recentNotes = NOTES.slice(0, 3);

  return (
    <section id="notes" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading title="Notes" subtitle="Thinking out loud about design and tech." />
          <button 
            onClick={() => onNavigate && onNavigate('notes')}
            className="text-teal hover:text-white transition-colors flex items-center gap-2 text-sm font-medium mb-12 md:mb-16 group"
          >
            View Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="space-y-4">
          {recentNotes.map((note) => (
            <div 
              key={note.id}
              onClick={() => onNavigate && onNavigate('notes')}
              className="group relative block p-6 md:p-8 rounded-xl border border-transparent border-b-white/5 hover:border-teal/10 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-10px_rgba(46,196,182,0.15)] transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-2">
                  <span className="font-mono text-xs text-teal/70">{note.date}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-semibold text-onyx group-hover:text-teal transition-colors">
                    {note.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-slate/70 font-light text-sm md:text-base group-hover:text-slate transition-colors">
                    {note.summary}
                  </p>
                </div>
              </div>
              
              {/* Micro-accent line on hover */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-teal to-gold transition-all duration-500 group-hover:w-full opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};