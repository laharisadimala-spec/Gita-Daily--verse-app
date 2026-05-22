import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, Share2, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { getAllVersesFlat } from '../utils/dailyVerse.js';

export default function Archive({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All');

  const allVerses = useMemo(() => getAllVersesFlat(), []);

  // Extract unique chapters for filtering
  const availableChapters = useMemo(() => {
    const chapters = allVerses.map(v => v.chapter);
    return ['All', ...Array.from(new Set(chapters))].sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a - b;
    });
  }, [allVerses]);

  // Filter verses based on search and chapter selection
  const filteredVerses = useMemo(() => {
    return allVerses.filter(verse => {
      const matchesChapter = selectedChapter === 'All' || verse.chapter === Number(selectedChapter);
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (verse.transliteration && verse.transliteration.toLowerCase().includes(searchLower)) ||
        (verse.translation && verse.translation.toLowerCase().includes(searchLower)) ||
        (verse.explanation && verse.explanation.toLowerCase().includes(searchLower)) ||
        `chapter ${verse.chapter}`.includes(searchLower) ||
        `verse ${verse.id}`.includes(searchLower) ||
        `${verse.chapter}:${verse.id}`.includes(searchLower);

      return matchesChapter && matchesSearch;
    });
  }, [allVerses, searchTerm, selectedChapter]);

  const handleShare = (verse) => {
    const textToCopy = `Bhagavad Gita Chapter ${verse.chapter}, Verse ${verse.id}\n\nTransliteration:\n${verse.transliteration}\n\nMeaning:\n${verse.translation}\n\nExplanation:\n${verse.explanation}\n\nShared via Gita Daily App`;
    navigator.clipboard.writeText(textToCopy);
    alert('Verse copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Scripture Archive</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Browse, search, and filter the timeless verses of the Bhagavad Gita</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Field */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-cream-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verses, translation, explanation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm"
          />
        </div>

        {/* Chapter Filter Dropdown */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-cream-450 uppercase tracking-wider whitespace-nowrap">Chapter:</span>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm font-semibold text-cream-950 focus:outline-none focus:border-saffron-500 transition-all cursor-pointer shadow-sm"
          >
            {availableChapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch === 'All' ? 'All Chapters' : `Chapter ${ch}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Verses Grid */}
      {filteredVerses.length === 0 ? (
        <GlassCard className="text-center py-16 flex flex-col items-center">
          <BookOpen className="w-12 h-12 text-cream-350 mb-3" />
          <h3 className="font-serif text-lg font-bold text-cream-900/60">No verses found</h3>
          <p className="text-xs text-cream-450 max-w-xs mt-1">
            Try adjusting your filters or search keywords to find the wisdom you are seeking.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVerses.map((verse, idx) => {
            const key = `${verse.chapter}-${verse.id}`;
            const isFav = favorites.includes(key);

            return (
              <GlassCard
                key={key}
                delay={(idx % 10) * 0.05} // Limit delay to prevent long waits on huge lists
                className="flex flex-col justify-between relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-saffron-600 bg-saffron-50 border border-saffron-200/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Chapter {verse.chapter} • Verse {verse.id}
                    </span>
                    {verse.mood && (
                      <span className="text-[10px] text-cream-400 font-bold uppercase tracking-wider bg-cream-100/50 px-2.5 py-0.5 rounded-md">
                        {verse.mood}
                      </span>
                    )}
                  </div>

                  {/* Sanskrit/Transliteration */}
                  <div className="mb-4">
                    {verse.sanskrit && (
                      <h4 className="font-serif text-lg font-bold text-saffron-850 mb-2 leading-relaxed">
                        {verse.sanskrit}
                      </h4>
                    )}
                    <p className="font-serif italic text-xs text-cream-950/70 leading-relaxed">
                      {verse.transliteration}
                    </p>
                  </div>

                  {/* Meaning */}
                  <div className="border-t border-cream-100/60 pt-3 mt-3">
                    <p className="text-xs text-cream-950 font-serif leading-relaxed italic">
                      "{verse.translation}"
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="border-t border-cream-100/65 mt-5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {/* Favorite Toggle Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(verse.chapter, verse.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isFav
                          ? 'bg-saffron-550 border-saffron-550 text-white shadow-sm'
                          : 'bg-white border-cream-200 text-cream-400 hover:text-saffron-600 hover:bg-cream-50'
                      }`}
                      title={isFav ? 'Remove Bookmark' : 'Bookmark'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(verse)}
                      className="p-2 rounded-lg border border-cream-200 bg-white text-cream-400 hover:text-saffron-600 hover:bg-cream-50 transition-colors"
                      title="Share Verse"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  {/* Study Button */}
                  <PrimaryButton
                    onClick={() => navigate(`/verse/${verse.chapter}/${verse.id}`)}
                    variant="outline"
                    className="!py-1.5 !px-3.5 text-xs font-semibold"
                  >
                    Study <ExternalLink className="w-3 h-3 ml-1" />
                  </PrimaryButton>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
