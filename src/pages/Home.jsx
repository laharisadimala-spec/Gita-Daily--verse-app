import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Share2, Compass, BookOpen, Music, ChevronRight } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Home({ favorites, toggleFavorite, verseOfTheDay }) {
  const navigate = useNavigate();
  const isFavorite = verseOfTheDay ? favorites.includes(`${verseOfTheDay.chapter}-${verseOfTheDay.verse}`) : false;

  const sadhanaCards = [
    { 
      title: "Bhagavad Gita Chapters", 
      desc: "Explore all 18 chapters and find verses for every situation in life.",
      icon: BookOpen,
      path: "/chapters",
      color: "from-saffron-500 to-saffron-600"
    },
    { 
      title: "Meditation & Chanting", 
      desc: "Practice rhythmic breathing with the sacred sound of AUM.",
      icon: Music,
      path: "/meditation",
      color: "from-gold-400 to-gold-600"
    },
    { 
      title: "Saved Study Verses", 
      desc: "Access your bookmark list of personalized spiritual guidance.",
      icon: Heart,
      path: "/favorites",
      color: "from-red-400 to-saffron-550"
    }
  ];

  if (!verseOfTheDay) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <Sparkles className="w-10 h-10 text-saffron-500 mb-4" />
          <p className="text-saffron-850 font-serif font-bold">Awakening wisdom...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden text-center py-10 md:py-14 space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-saffron-500 via-gold-400 to-saffron-600 flex items-center justify-center text-white shadow-gold-glow mb-2"
        >
          <span className="font-serif text-5xl">ॐ</span>
        </motion.div>
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl font-bold text-saffron-850 tracking-wide"
          >
            Sacred Wisdom for Daily Peace
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-cream-450 font-medium italic"
          >
            “Delivering clarity, courage, and calmness through the timeless teachings of Shri Krishna.”
          </motion.p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Verse of the Day Card */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 via-gold-450 to-saffron-600" />
            
            <div className="flex items-center justify-between mb-5">
              <span className="bg-saffron-50 border border-saffron-200/25 text-saffron-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
                Verse of the Day
              </span>
              <div className="flex items-center gap-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(verseOfTheDay.chapter, verseOfTheDay.verse)} 
                  className={`p-2.5 rounded-xl border transition-all ${
                    isFavorite 
                      ? 'bg-saffron-50 border-saffron-200 text-saffron-600 shadow-sm' 
                      : 'border-cream-200 text-cream-400 hover:text-saffron-600 hover:bg-cream-50'
                  }`}
                  title={isFavorite ? "Remove Bookmark" : "Bookmark Verse"}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-saffron-500 text-saffron-500' : ''}`} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${verseOfTheDay.sanskrit}\n\nTranslation: ${verseOfTheDay.translation}`
                    );
                    alert("Verse copied to clipboard!");
                  }}
                  className="p-2.5 rounded-xl border border-cream-200 text-cream-400 hover:text-saffron-600 hover:bg-cream-50 transition-colors"
                  title="Share Verse"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="text-center mb-6">
              <span className="text-[10px] text-cream-400 font-bold tracking-wider uppercase block mb-2">
                Chapter {verseOfTheDay.chapter} • Verse {verseOfTheDay.verse}
              </span>
              {verseOfTheDay.sanskrit && (
                <blockquote className="font-serif text-xl md:text-2xl font-bold text-saffron-850 leading-loose whitespace-pre-line tracking-wide">
                  {verseOfTheDay.sanskrit}
                </blockquote>
              )}
              {verseOfTheDay.transliteration && (
                <p className="font-serif italic text-sm md:text-base text-cream-950/70 leading-relaxed max-w-xl mx-auto mt-4">
                  {verseOfTheDay.transliteration}
                </p>
              )}
            </div>

            <div className="border-t border-cream-100/80 my-5 pt-5">
              <h4 className="text-[10px] font-bold text-cream-400 uppercase tracking-widest mb-2">Translation</h4>
              <p className="text-sm md:text-base text-cream-950 font-serif leading-relaxed italic">
                "{verseOfTheDay.translation}"
              </p>
            </div>
            
            {verseOfTheDay.explanation && (
              <div className="border-t border-cream-100/80 my-5 pt-5">
                <h4 className="text-[10px] font-bold text-saffron-650 uppercase tracking-widest mb-2">Explanation</h4>
                <p className="text-sm text-cream-950/80 font-sans leading-relaxed">
                  {verseOfTheDay.explanation}
                </p>
              </div>
            )}

            {verseOfTheDay.reflection && (
              <div className="border-t border-cream-100/80 my-5 pt-5">
                <h4 className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-2">Today’s Reflection</h4>
                <div className="bg-gradient-to-r from-saffron-50/50 to-gold-50/30 border-l-4 border-saffron-500 rounded-r-xl p-4 text-sm text-saffron-850 font-sans leading-relaxed shadow-sm mt-1">
                  {verseOfTheDay.reflection}
                </div>
              </div>
            )}

            <div className="mt-8 pt-5 border-t border-cream-100/80 flex justify-end">
              <PrimaryButton 
                onClick={() => navigate(`/verse/${verseOfTheDay.chapter}/${verseOfTheDay.verse}`)}
                variant="primary"
                icon={ChevronRight}
              >
                Deep Study Mode
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Navigation and Quick Saddhana Cards */}
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-serif text-lg font-bold text-saffron-850 border-b border-cream-100 pb-3 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-saffron-600" />
              Daily Sadhana
            </h3>
            <p className="text-xs text-cream-900/70 leading-relaxed mb-5">
              Engage with sacred scriptures and quiet your mind with daily spiritual practices.
            </p>
            
            <div className="space-y-4">
              {sadhanaCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(card.path)}
                    className="flex gap-4 p-3 rounded-xl border border-cream-150 bg-cream-50/30 hover:bg-saffron-50/20 hover:border-saffron-200/50 transition-all cursor-pointer items-start"
                  >
                    <div className={`p-2.5 rounded-lg bg-gradient-to-tr ${card.color} text-white shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-cream-950">{card.title}</h4>
                      <p className="text-[10px] text-cream-400 mt-0.5 leading-snug">{card.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Creator Credit */}
      <div className="text-center pt-8 pb-4">
        <p className="text-xs font-serif font-medium text-saffron-600/80 tracking-wide">
          Made with devotion by Lahari Sadimala ✨
        </p>
      </div>
    </div>
  );
}
