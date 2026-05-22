import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, ExternalLink, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { getAllVersesFlat } from '../utils/dailyVerse.js';

export default function Favorites({ favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const allVerses = useMemo(() => getAllVersesFlat(), []);

  // Find bookmarked verses
  const favoriteVerses = useMemo(() => {
    return allVerses.filter(verse => {
      const key = `${verse.chapter}-${verse.id}`;
      return favorites.includes(key);
    });
  }, [favorites, allVerses]);

  const handleShare = (verse) => {
    const textToCopy = `Bhagavad Gita Chapter ${verse.chapter}, Verse ${verse.id}\n\nTransliteration:\n${verse.transliteration}\n\nMeaning:\n${verse.translation}\n\nShared via Gita Daily App`;
    navigator.clipboard.writeText(textToCopy);
    alert('Verse copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Saved Verses</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Your personal compilation of spiritual anchors and guidance</p>
      </div>

      {/* Favorites Display */}
      {favoriteVerses.length === 0 ? (
        <GlassCard className="text-center py-16 flex flex-col items-center">
          <Heart className="w-12 h-12 text-cream-300 mb-4 animate-pulse" />
          <h3 className="font-serif text-lg font-bold text-cream-900/60">No saved verses yet</h3>
          <p className="text-xs text-cream-450 max-w-xs mt-1 mb-6 leading-relaxed">
            As you explore chapters and study daily verses, bookmark the ones that speak to you to build your personal refuge.
          </p>
          <PrimaryButton onClick={() => navigate('/archive')} variant="primary">
            Explore Archive
          </PrimaryButton>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteVerses.map((verse, idx) => {
            const key = `${verse.chapter}-${verse.id}`;
            
            return (
              <GlassCard
                key={key}
                delay={idx * 0.05}
                className="flex flex-col justify-between"
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

                  {/* Verse details */}
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

                  {/* English meaning */}
                  <div className="border-t border-cream-100/60 pt-3 mt-3">
                    <p className="text-xs text-cream-950 font-serif leading-relaxed italic">
                      "{verse.translation}"
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="border-t border-cream-100/65 mt-5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {/* Unfavorite Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(verse.chapter, verse.id)}
                      className="p-2 rounded-lg border border-saffron-200 bg-saffron-50 text-saffron-600 hover:bg-saffron-100/60 transition-all shadow-sm"
                      title="Remove Bookmark"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
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

                  {/* Study Details Button */}
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
