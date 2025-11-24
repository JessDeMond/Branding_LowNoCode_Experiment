import React, { useEffect } from 'react';
import { Note } from '../../types';
import { GlassCard } from './GlassCard';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

interface NoteViewProps {
  note: Note;
  onBack: () => void;
}

export const NoteView: React.FC<NoteViewProps> = ({ note, onBack }) => {
  // Scroll to top when note opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple Markdown-like parser
  const renderContent = (content: string) => {
    if (!content) return <p className="text-slate italic">No content available for this note.</p>;

    // Split by double newline to get blocks
    const blocks = content.split('\n\n');

    return blocks.map((block, index) => {
      // Header 2
      if (block.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-onyx mt-12 mb-6 tracking-tight">
            {parseInline(block.replace('## ', ''))}
          </h2>
        );
      }
      
      // Horizontal Rule
      if (block.trim() === '---') {
        return <div key={index} className="h-[1px] w-24 bg-teal/30 my-12" />;
      }

      // Blockquote
      if (block.startsWith('> ')) {
        const cleanText = block.replace(/> /g, '').replace(/\n/g, ' ');
        return (
          <blockquote key={index} className="border-l-2 border-teal bg-teal/5 p-6 my-8 rounded-r-lg italic text-slate-200">
            {parseInline(cleanText)}
          </blockquote>
        );
      }

      // Unordered List
      if (block.trim().startsWith('* ') || block.trim().startsWith('- ')) {
        const items = block.split('\n');
        return (
          <ul key={index} className="space-y-3 my-6 pl-4">
            {items.map((item, i) => {
              const cleanItem = item.replace(/^[*|-] /, '');
              return (
                <li key={i} className="flex items-start gap-3 text-slate leading-relaxed">
                   <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                   <span>{parseInline(cleanItem)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Regular Paragraph
      return (
        <p key={index} className="text-slate-300 text-lg leading-8 font-light mb-6">
          {parseInline(block)}
        </p>
      );
    });
  };

  // Helper to parse bold (**text**)
  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="animate-fade-in-up">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-slate hover:text-teal transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Index
      </button>

      <GlassCard className="p-8 md:p-16 mb-12">
        {/* Header */}
        <header className="mb-12 border-b border-white/5 pb-12">
           <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-teal mb-6 uppercase tracking-wider">
             <span className="flex items-center gap-1">
               <Calendar size={12} /> {note.date}
             </span>
             <span className="w-1 h-1 rounded-full bg-slate/30" />
             <span className="flex items-center gap-1">
               <Clock size={12} /> {note.readTime}
             </span>
             <span className="w-1 h-1 rounded-full bg-slate/30" />
             <span>{note.category}</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-bold text-onyx mb-6 leading-tight">
             {note.title}
           </h1>

           <div className="flex flex-wrap gap-2">
             {note.tags?.map(tag => (
               <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-slate/60 font-mono">
                 <Tag size={10} /> {tag}
               </span>
             ))}
           </div>
        </header>

        {/* Content */}
        <article className="max-w-none">
          {renderContent(note.content || note.summary)}
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-white/5 flex justify-between items-center">
          <span className="text-slate/40 text-sm font-mono">End of File</span>
          <button 
            onClick={onBack}
            className="text-teal hover:text-white transition-colors text-sm font-bold"
          >
            Return to Top
          </button>
        </footer>
      </GlassCard>
    </div>
  );
};