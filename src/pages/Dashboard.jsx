import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Award, ArrowRight, MessageSquare, Flame } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { getAllVersesFlat } from '../utils/dailyVerse.js';
import quotesData from '../data/quotes.json'; // Keep for simple daily quote if needed, or we can use our dataset

export default function Dashboard({ favorites = [], notes = {} }) {
  const navigate = useNavigate();
  const allVerses = useMemo(() => getAllVersesFlat(), []);

  // Load read progress from localStorage and merge with notes keys
  const readVerses = useMemo(() => {
    try {
      const saved = localStorage.getItem('gita_read_progress');
      const readList = saved ? JSON.parse(saved) : [];
      const noteKeys = Object.keys(notes || {});
      return Array.from(new Set([...readList, ...noteKeys]));
    } catch {
      return [];
    }
  }, [notes]);

  // Use the actual total verses count
  const totalVerses = allVerses.length || 700;
  const readCount = Math.min(totalVerses, readVerses.length);
  const favoriteCount = favorites.length;
  const completionPercentage = Math.round((readCount / totalVerses) * 100) || 0;

  // Retrieve reflections/notes list
  const recentReflections = useMemo(() => {
    const list = [];
    Object.entries(notes || {}).forEach(([key, noteText]) => {
      if (!noteText || noteText.trim() === '') return;
      const [chId, vId] = key.split('-').map(Number);
      const verse = allVerses.find(v => v.chapter === chId && v.id === vId);
      if (verse) {
        list.push({
          key,
          chapter: chId,
          verseNumber: vId,
          text: noteText,
          transliteration: verse.transliteration,
          meaning: verse.translation
        });
      }
    });
    return list.slice(-3).reverse(); // Get up to 3 recent reflections
  }, [notes, allVerses]);

  // Retrieve a random daily quote.
  const dailyQuote = useMemo(() => {
    const quotes = quotesData.quotes || [
      "A man is made by his belief. As he believes, so he is.",
      "You have the right to work, but never to the fruit of work."
    ];
    // Simple deterministic selection based on current date
    const day = new Date().getDate();
    return quotes[day % quotes.length];
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="border-b border-cream-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-saffron-850">My Sadhana Dashboard</h2>
          <p className="text-sm text-cream-400 mt-1 font-medium">Track your spiritual journey and daily reflections</p>
        </div>
        <div className="bg-saffron-50 border border-saffron-200/30 px-4 py-2 rounded-xl flex items-center gap-2">
          <Flame className="w-5 h-5 text-saffron-600 animate-pulse" />
          <span className="text-xs font-bold text-saffron-800 uppercase tracking-wider">
            Active Sadhana
          </span>
        </div>
      </div>

      {/* Daily Quote Card */}
      <GlassCard className="relative overflow-hidden border-l-4 border-l-saffron-550 !p-6 bg-saffron-50/10">
        <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest block mb-2">Wisdom of the Day</span>
        <p className="font-serif text-base text-cream-950/90 italic leading-relaxed">
          "{dailyQuote}"
        </p>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Verses Read */}
        <GlassCard className="flex items-center gap-4 !p-5">
          <div className="p-3 bg-saffron-50 border border-saffron-100 rounded-xl text-saffron-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-cream-400 uppercase tracking-wider">Verses Studied</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-saffron-850">{readCount}</span>
              <span className="text-xs text-cream-450 font-semibold">/ {totalVerses}</span>
            </div>
          </div>
        </GlassCard>

        {/* Favorite Count */}
        <GlassCard className="flex items-center gap-4 !p-5">
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-550">
            <Heart className="w-6 h-6 fill-red-100" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-cream-400 uppercase tracking-wider">Saved Anchors</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-saffron-850">{favoriteCount}</span>
              <span className="text-xs text-cream-450 font-semibold">verses</span>
            </div>
          </div>
        </GlassCard>

        {/* Completion Card */}
        <GlassCard className="flex items-center gap-4 !p-5">
          <div className="p-3 bg-gold-50 border border-gold-100 rounded-xl text-gold-600">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-cream-400 uppercase tracking-wider">Path Completion</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-saffron-850">{completionPercentage}%</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Progress Bar & Actions */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-cream-950 uppercase tracking-wider">Sadhana Progress</span>
          <span className="text-xs font-bold text-saffron-600">{readCount} of {totalVerses} verses read</span>
        </div>
        <div className="w-full h-3 bg-cream-100 rounded-full overflow-hidden border border-cream-200">
          <div 
            className="h-full bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-600 transition-all duration-1000 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2 justify-end">
          <PrimaryButton onClick={() => navigate('/archive')} variant="outline" className="text-xs">
            Browse Archive
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate('/moods')} variant="outline" className="text-xs">
            Filter by Mood
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate('/verse/2/47')} variant="primary" className="text-xs">
            Study Daily Verse <ArrowRight className="w-3.5 h-3.5" />
          </PrimaryButton>
        </div>
      </GlassCard>

      {/* Recent Activity / Reflections */}
      <GlassCard>
        <h3 className="font-serif text-lg font-bold text-saffron-850 mb-4 pb-2 border-b border-cream-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-saffron-650" />
          Recent Reflections
        </h3>

        {recentReflections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-cream-400 font-medium">No reflections recorded yet.</p>
            <p className="text-[10px] text-cream-450 mt-1 mb-4">
              Write down your personal insights on study pages to see them here.
            </p>
            <PrimaryButton onClick={() => navigate('/archive')} variant="outline" className="text-xs">
              Start Studying
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-4">
            {recentReflections.map((ref) => (
              <div 
                key={ref.key} 
                className="p-4 rounded-xl border border-cream-150 bg-cream-50/20 hover:bg-saffron-50/10 hover:border-saffron-200 transition-all cursor-pointer"
                onClick={() => navigate(`/verse/${ref.chapter}/${ref.verseNumber}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200/10">
                    Chapter {ref.chapter} • Verse {ref.verseNumber}
                  </span>
                  <span className="text-[9px] text-cream-400 font-bold uppercase tracking-wider">
                    Journal Entry
                  </span>
                </div>
                <p className="text-xs text-cream-950 font-medium leading-relaxed italic mb-2">
                  "{ref.meaning.substring(0, 120)}..."
                </p>
                <div className="border-t border-cream-100/60 pt-2 mt-2">
                  <p className="text-xs text-cream-900 font-sans leading-relaxed line-clamp-2">
                    {ref.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
