import React, { useState, useEffect } from 'react';
import { NOTES } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { DecryptText } from '../ui/DecryptText';
import { Clock, Hash, Search } from 'lucide-react';
import { NoteView } from '../ui/NoteView';
import { Note } from '../../types';

export const NotesPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Design', 'Tech', 'Systems', 'Personal'];

  const filteredNotes = NOTES.filter(note => {
    const matchesCategory = filter === 'All' || note.category === filter;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If a note is selected, show the reader view
  if (selectedNote) {
    return (
      <div className="pt-32 pb-24 min-h-screen relative">
         <div className="max-w-4xl mx-auto px-6 md:px-12">
            <NoteView note={selectedNote} onBack={() => setSelectedNote(null)} />
         </div>
      </div>
    );
  }

  // Otherwise show the list
  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-onyx mb-6">
            <DecryptText text="Thinking_Log" />
          </h1>
          <p className="text-slate text-lg font-light leading-relaxed border-l-2 border-teal/50 pl-6">
            A non-linear collection of essays, field notes, and technical breakdowns. 
            Documenting the process of building digital systems and living inside them.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 justify-between items-start md:items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`
                            px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all
                            ${filter === cat 
                                ? 'bg-teal text-charcoal font-bold' 
                                : 'bg-white/5 text-slate hover:text-teal hover:bg-white/10'}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative group w-full md:w-auto">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate group-focus-within:text-teal transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search notes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal/50 transition-all placeholder:text-slate/40"
                />
            </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
            {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                    <GlassCard 
                        key={note.id} 
                        hoverEffect={true}
                        className="p-6 md:p-8 group cursor-pointer border-l-4 border-l-transparent hover:border-l-teal transition-all"
                        onClick={() => setSelectedNote(note)}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 text-xs font-mono text-slate/50">
                              <span className="text-teal">{note.date}</span>
                              <span className="hidden md:inline">•</span>
                              <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>{note.readTime}</span>
                              </div>
                              <span className="hidden md:inline">•</span>
                              <span className="uppercase tracking-widest">{note.category}</span>
                          </div>

                          <h3 className="text-2xl font-bold text-onyx mb-3 group-hover:text-teal transition-colors">
                              {note.title}
                          </h3>

                          <p className="text-slate/80 leading-relaxed mb-6 font-light">
                              {note.summary}
                          </p>

                          <div className="flex items-center gap-3">
                              {note.tags?.map(tag => (
                                  <span key={tag} className="flex items-center gap-1 text-xs text-slate/40 bg-white/5 px-2 py-1 rounded">
                                      <Hash size={10} />
                                      {tag}
                                  </span>
                              ))}
                          </div>
                    </GlassCard>
                ))
            ) : (
                <div className="py-12 text-center text-slate/50 font-mono">
                    No signals found matching your query.
                </div>
            )}
        </div>

      </div>
    </div>
  );
};