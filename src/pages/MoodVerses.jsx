import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, ExternalLink, ShieldAlert, Zap, Compass, Smile, Focus, Frown, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { getAllVersesFlat } from '../utils/dailyVerse.js';

const MOOD_METADATA = {
  Stress: {
    description: "Tolerate life's dualities with patience. Understand that sensory stresses are transient.",
    icon: Frown,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 border-amber-200/30 text-amber-800"
  },
  Anxiety: {
    description: "Release expectations, surrender doubts, and know that you are looked after by the universe.",
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50 border-blue-200/30 text-blue-800"
  },
  Anger: {
    description: "Anger destroys rational thinking, leading to ruin. Conquer attachment to find calm.",
    icon: ShieldAlert,
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50 border-red-200/30 text-red-800"
  },
  Motivation: {
    description: "Elevate yourself through your own mind. Align with your duty and stand strong.",
    icon: Zap,
    color: "from-saffron-500 to-saffron-600",
    bgLight: "bg-saffron-50 border-saffron-200/30 text-saffron-850"
  },
  Discipline: {
    description: "A conquered mind is your greatest friend. Master yourself through persistent practice.",
    icon: Compass,
    color: "from-purple-500 to-violet-600",
    bgLight: "bg-purple-50 border-purple-200/30 text-purple-800"
  },
  Focus: {
    description: "Steady the mind like a flame in a windless place. Bring back the wandering attention.",
    icon: Focus,
    color: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50 border-teal-200/30 text-teal-800"
  },
  Peace: {
    description: "Joy is found within. Do not let the world agitate you, and do not agitate the world.",
    icon: Smile,
    color: "from-green-400 to-emerald-600",
    bgLight: "bg-green-50 border-green-200/30 text-green-800"
  },
  Fear: {
    description: "The Supreme Lord dwells in your heart. Abandon all worries and surrender to the driver.",
    icon: BookOpen,
    color: "from-gold-500 to-amber-600",
    bgLight: "bg-gold-50 border-gold-200/30 text-gold-800"
  },
  Devotion: {
    description: "Offer all your actions and thoughts to the Supreme. Surrender and find eternal refuge.",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50 border-pink-200/30 text-pink-800"
  },
  Knowledge: {
    description: "Cut through ignorance with the sword of wisdom. Understand the eternal nature of the soul.",
    icon: BookOpen,
    color: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50 border-cyan-200/30 text-cyan-800"
  },
  Surrender: {
    description: "Let go of your ego and surrender the fruits of action. Be an instrument of the divine.",
    icon: Sparkles,
    color: "from-indigo-400 to-purple-600",
    bgLight: "bg-indigo-50 border-indigo-200/30 text-indigo-800"
  },
  Courage: {
    description: "Stand firm in your duty. Face your battles with a steady mind and unwavering resolve.",
    icon: Zap,
    color: "from-red-500 to-orange-600",
    bgLight: "bg-red-50 border-red-200/30 text-red-800"
  }
};

export default function MoodVerses({ favorites = [], toggleFavorite }) {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('Stress');
  const allVerses = useMemo(() => getAllVersesFlat(), []);

  // Make sure we include all moods dynamically from our dataset, and fallbacks
  const availableMoods = useMemo(() => {
    const dataMoods = Array.from(new Set(allVerses.map(v => v.mood).filter(Boolean)));
    const keys = Object.keys(MOOD_METADATA);
    // Merge datasets, ensuring Stress, Anxiety etc. are always present if available
    return Array.from(new Set([...keys, ...dataMoods]));
  }, [allVerses]);

  // Filter verses matching the selected mood
  const filteredVerses = useMemo(() => {
    return allVerses.filter(verse => verse.mood === selectedMood);
  }, [selectedMood, allVerses]);

  const handleShare = (verse) => {
    const textToCopy = `Bhagavad Gita Chapter ${verse.chapter}, Verse ${verse.id}\n[Mood: ${verse.mood}]\n\nTransliteration:\n${verse.transliteration}\n\nMeaning:\n${verse.translation}\n\nShared via Gita Daily App`;
    navigator.clipboard.writeText(textToCopy);
    alert('Verse copied to clipboard!');
  };

  const ActiveIcon = MOOD_METADATA[selectedMood]?.icon || Sparkles;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Scripture by Mood</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Select your current mental state to receive aligning scriptural guidance</p>
      </div>

      {/* Mood Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {availableMoods.map((mood) => {
          const isActive = selectedMood === mood;
          const meta = MOOD_METADATA[mood] || {
            icon: Sparkles,
            color: "from-saffron-400 to-saffron-500",
            bgLight: "bg-cream-100 text-saffron-700"
          };
          const Icon = meta.icon;

          return (
            <motion.button
              key={mood}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 shadow-sm ${
                isActive
                  ? `bg-gradient-to-tr ${meta.color} text-white border-transparent shadow-gold-glow`
                  : 'bg-white/70 backdrop-blur-sm border-cream-200 text-cream-950 hover:bg-saffron-50/10 hover:border-saffron-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-saffron-550'}`} />
              <span className="text-xs font-bold uppercase tracking-wider">{mood}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Mood Focus Statement */}
      <GlassCard className="relative overflow-hidden border-l-4 border-l-saffron-550 bg-saffron-50/10 !p-5">
        <div className="flex items-start gap-3.5">
          <div className={`p-2 rounded-lg bg-white/80 shadow-sm ${MOOD_METADATA[selectedMood]?.bgLight || 'bg-cream-100 text-saffron-700'}`}>
            <ActiveIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-saffron-800">
              Guidance for {selectedMood}
            </h4>
            <p className="text-xs text-cream-900/80 mt-1 font-medium leading-relaxed">
              {MOOD_METADATA[selectedMood]?.description || `Verses to help you when you are experiencing ${selectedMood}.`}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Filtered Verses */}
      <div className="space-y-4">
        {filteredVerses.length === 0 ? (
          <GlassCard className="text-center py-12 flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-cream-300 mb-2" />
            <p className="text-xs text-cream-450 font-medium">No verses catalogued for this mood yet.</p>
          </GlassCard>
        ) : (
          filteredVerses.map((verse, idx) => {
            const key = `${verse.chapter}-${verse.id}`;
            const isFav = favorites.includes(key);

            return (
              <GlassCard
                key={key}
                delay={idx * 0.05}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200/10">
                      Ch {verse.chapter} • Verse {verse.id}
                    </span>
                    <span className="text-[10px] text-cream-400 font-bold uppercase tracking-wider">
                      {verse.mood} Guidance
                    </span>
                  </div>

                  {verse.sanskrit && (
                    <blockquote className="font-serif text-lg font-bold text-saffron-850 leading-relaxed">
                      {verse.sanskrit}
                    </blockquote>
                  )}
                  <p className="font-serif italic text-xs text-cream-950/70 leading-relaxed">
                    {verse.transliteration}
                  </p>
                  <p className="text-xs text-cream-900/90 font-serif leading-relaxed italic border-l-2 border-cream-200 pl-3">
                    "{verse.translation}"
                  </p>
                </div>

                {/* Actions Panel */}
                <div className="flex flex-row md:flex-col items-center justify-end gap-2 shrink-0 border-t md:border-t-0 border-cream-100 pt-3 md:pt-0">
                  <div className="flex gap-1.5 w-full md:w-auto">
                    {/* Favorite Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(verse.chapter, verse.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isFav
                          ? 'bg-saffron-50 border-saffron-200 text-saffron-600'
                          : 'bg-white border-cream-200 text-cream-400 hover:text-saffron-600 hover:bg-cream-50'
                      }`}
                      title={isFav ? 'Remove Saved' : 'Save Verse'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-saffron-550 text-saffron-550' : ''}`} />
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(verse)}
                      className="p-2 rounded-xl border border-cream-200 bg-white text-cream-400 hover:text-saffron-600 hover:bg-cream-50 transition-colors"
                      title="Share Verse"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  <PrimaryButton
                    onClick={() => navigate(`/verse/${verse.chapter}/${verse.id}`)}
                    variant="primary"
                    className="!py-2 !px-4 text-xs font-semibold w-full md:w-auto mt-0 md:mt-2"
                  >
                    Study <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </PrimaryButton>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
