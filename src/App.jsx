import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

import Layout from './components/Layout.jsx';
import GlassCard from './components/GlassCard.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';

// Pages
import Home from './pages/Home.jsx';
import DailyVerse from './pages/DailyVerse.jsx';
import About from './pages/About.jsx';
import Archive from './pages/Archive.jsx';
import Favorites from './pages/Favorites.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MoodVerses from './pages/MoodVerses.jsx';
import Settings from './pages/Settings.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact.jsx';

// Data
import gitaData from './data/gitaData.js';

// Hooks
import { useFavorites } from './hooks/useFavorites.js';
import { useProgress } from './hooks/useProgress.js';
import { useDailyVerse } from './hooks/useDailyVerse.js';

// Services
import { requestNotificationPermission } from './services/firebaseMessaging.js';

export function AppContent() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { notes, saveNote, resetProgress } = useProgress();
  const { dailyVerse } = useDailyVerse();

  // Safely request notification permissions after the app loads
  useEffect(() => {
    const timer = setTimeout(() => {
      requestNotificationPermission().catch(err => {
        console.warn("FCM Notification Permission request was skipped or failed:", err);
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Ambient flute music support in background
  useEffect(() => {
    let audio = null;
    let isPlaying = false;

    const manageAudio = () => {
      const musicEnabled = localStorage.getItem('music_enabled') === 'true';
      if (musicEnabled && !isPlaying) {
        if (!audio) {
          // Standard license-free acoustic loop/song
          audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
          audio.volume = 0.12;
          audio.loop = true;
        }
        audio.play()
          .then(() => {
            isPlaying = true;
          })
          .catch(() => {
            // Autoplay blocked by modern browser security policies until user interacts
          });
      } else if (!musicEnabled && isPlaying && audio) {
        audio.pause();
        isPlaying = false;
      }
    };

    manageAudio();

    // Trigger on user gesture to bypass browser security blocks
    const handleGesture = () => {
      manageAudio();
    };

    window.addEventListener('click', handleGesture);
    const syncInterval = setInterval(manageAudio, 2500);

    return () => {
      window.removeEventListener('click', handleGesture);
      clearInterval(syncInterval);
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <Layout favoritesCount={favorites.length}>
      <Routes>
        <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} verseOfTheDay={dailyVerse} />} />
        <Route path="/dashboard" element={<Dashboard favorites={favorites} notes={notes} />} />
        <Route path="/archive" element={<Archive favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/moods" element={<MoodVerses favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/settings" element={<Settings clearFavorites={clearFavorites} resetProgress={resetProgress} />} />
        <Route path="/chapters" element={<ChaptersList />} />
        <Route path="/chapter/:chapterId" element={<ChapterDetail />} />
        <Route path="/verse/:chapterId/:verseId" element={
          <DailyVerse 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            notes={notes} 
            saveNote={saveNote} 
          />
        } />
        <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/meditation" element={<MeditationSpace />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// 2. Chapters List View
function ChaptersList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChapters = useMemo(() => {
    return gitaData.filter(ch => 
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `chapter ${ch.chapter}`.includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream-200 pb-5">
        <div>
          <h2 className="font-serif text-3xl font-bold text-saffron-850">Gita Chapters</h2>
          <p className="text-sm text-cream-400 mt-1 font-medium">Explore the 18 chapters of eternal discourse</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cream-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by chapter name or translation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {filteredChapters.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-cream-400 font-medium">No chapters matched your search</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((ch, idx) => (
            <GlassCard 
              key={ch.chapter} 
              delay={idx * 0.05}
              className="flex flex-col justify-between cursor-pointer group hover:border-saffron-300 transition-all"
              onClick={() => navigate(`/chapter/${ch.chapter}`)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-saffron-600 bg-saffron-50 border border-saffron-200/20 px-2.5 py-0.5 rounded-md uppercase">
                    Chapter {ch.chapter}
                  </span>
                  <span className="text-xs text-cream-455 font-bold uppercase tracking-wider">
                    {ch.verses.length} Verses
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-saffron-850 mb-1 group-hover:text-saffron-600 transition-colors">{ch.title}</h3>
                <h4 className="font-sans text-xs font-semibold text-cream-405 uppercase tracking-widest mb-3 italic">{ch.translation}</h4>
                <p className="text-xs text-cream-950/75 leading-relaxed line-clamp-3">
                  {ch.description}
                </p>
              </div>
              
              <div className="mt-5 pt-4 border-t border-cream-100 flex justify-end">
                <span className="text-xs font-bold text-saffron-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Chapter <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. Chapter Detail View
function ChapterDetail() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  
  const parsedChapterId = parseInt(chapterId);
  const chapter = useMemo(() => gitaData.find(c => c.chapter === parsedChapterId), [parsedChapterId]);

  const [verseSearch, setVerseSearch] = useState('');
  const [expandedVerses, setExpandedVerses] = useState({});
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    setVisibleCount(15);
    setExpandedVerses({});
  }, [verseSearch, chapterId]);

  const filteredVerses = useMemo(() => {
    if (!chapter) return [];
    if (!verseSearch.trim()) return chapter.verses;
    const query = verseSearch.toLowerCase();
    return chapter.verses.filter(v => 
      v.verse.toString().includes(query) ||
      (v.sanskrit && v.sanskrit.toLowerCase().includes(query)) ||
      (v.translation && v.translation.toLowerCase().includes(query)) ||
      (v.transliteration && v.transliteration.toLowerCase().includes(query)) ||
      (v.explanation && v.explanation.toLowerCase().includes(query)) ||
      (v.mood && v.mood.toLowerCase().includes(query))
    );
  }, [chapter, verseSearch]);

  if (!chapter) {
    return (
      <GlassCard className="text-center py-16">
        <h3 className="font-serif text-lg font-bold text-saffron-850">Chapter Not Found</h3>
        <p className="text-xs text-cream-400 mt-2 mb-6">The requested chapter could not be loaded.</p>
        <PrimaryButton onClick={() => navigate('/chapters')} variant="primary">
          Return to Chapters
        </PrimaryButton>
      </GlassCard>
    );
  }

  const toggleExpand = (verseNum, e) => {
    if (e.target.closest('.no-expand-toggle')) return;
    setExpandedVerses(prev => ({
      ...prev,
      [verseNum]: !prev[verseNum]
    }));
  };

  const visibleVerses = filteredVerses.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* Back Button & Header */}
      <div className="space-y-4 border-b border-cream-200 pb-6">
        <button
          onClick={() => navigate('/chapters')}
          className="flex items-center gap-1.5 text-cream-900 hover:text-saffron-600 font-bold text-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          All Chapters
        </button>
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-saffron-600 bg-saffron-50 border border-saffron-200/20 px-3 py-1 rounded-md uppercase tracking-widest">
            Chapter {chapter.chapter}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-saffron-850">{chapter.title}</h2>
          <h3 className="font-serif text-lg md:text-xl text-cream-455 italic">{chapter.translation}</h3>
          <p className="text-sm text-cream-950/80 max-w-3xl mx-auto leading-relaxed pt-2">
            {chapter.description}
          </p>
        </div>
      </div>

      {/* Verse search & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm border border-cream-200/60 p-4 rounded-2xl shadow-sm">
        <h3 className="font-serif text-xl font-bold text-saffron-850 flex items-center gap-2">
          <BookOpen className="w-5.5 h-5.5 text-saffron-550" />
          Verses ({filteredVerses.length})
        </h3>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cream-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verses (number, text, meaning...)"
            value={verseSearch}
            onChange={(e) => setVerseSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Full Verse List */}
      <div className="space-y-4">
        {visibleVerses.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-cream-400 font-medium">No verses match your filter criteria.</p>
          </GlassCard>
        ) : (
          visibleVerses.map((verse, idx) => {
            const isExpanded = !!expandedVerses[verse.verse];
            return (
              <GlassCard 
                key={verse.verse} 
                delay={Math.min(idx * 0.03, 0.3)}
                className={`flex flex-col gap-4 border transition-all duration-350 cursor-pointer ${
                  isExpanded 
                    ? 'border-saffron-400/80 bg-saffron-50/5/20 shadow-spiritual' 
                    : 'hover:border-saffron-300'
                }`}
                onClick={(e) => toggleExpand(verse.verse, e)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-saffron-650 bg-cream-100 border border-cream-200 px-2.5 py-0.5 rounded-md uppercase">
                      Verse {verse.verse}
                    </span>
                    {verse.mood && (
                      <span className="text-[10px] font-bold text-saffron-600 bg-saffron-50 border border-saffron-200/10 px-2 py-0.5 rounded-md uppercase">
                        {verse.mood}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-saffron-600 font-semibold flex items-center gap-1">
                    {isExpanded ? 'Collapse' : 'Tap to Expand'}
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>

                {/* Sanskrit (Always visible condensed, fully visible if expanded) */}
                <div className="space-y-2">
                  <p className={`font-serif text-lg md:text-xl font-bold text-saffron-850 leading-loose ${isExpanded ? 'whitespace-pre-line text-center py-2' : ''}`}>
                    {isExpanded ? verse.sanskrit : `${verse.sanskrit.split('\n')[0]}...`}
                  </p>
                </div>

                {/* Expanded Details Section */}
                {isExpanded ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-cream-100 pt-4 space-y-4 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Transliteration */}
                    {verse.transliteration && (
                      <div className="text-center py-2 bg-cream-50/50 rounded-xl border border-cream-100">
                        <span className="text-[9px] font-bold text-cream-400 tracking-widest uppercase block mb-1">Transliteration</span>
                        <p className="font-serif italic text-xs md:text-sm text-cream-950/70 leading-relaxed max-w-xl mx-auto px-4">
                          {verse.transliteration}
                        </p>
                      </div>
                    )}

                    {/* Easy translation */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-saffron-650 tracking-widest uppercase block">English Translation</span>
                      <p className="text-sm md:text-base text-cream-950 font-serif leading-relaxed italic border-l-2 border-saffron-200 pl-3">
                        "{verse.translation}"
                      </p>
                    </div>

                    {/* Simple practical explanation */}
                    {verse.explanation && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-saffron-650 tracking-widest uppercase block">Practical Wisdom</span>
                        <p className="text-xs md:text-sm text-cream-900 leading-relaxed font-sans">
                          {verse.explanation}
                        </p>
                      </div>
                    )}

                    {/* Reflection */}
                    {verse.reflection && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gold-600 tracking-widest uppercase block">Reflection</span>
                        <div className="bg-gradient-to-r from-saffron-50/50 to-gold-50/30 border-l-4 border-saffron-500 rounded-r-xl p-3 text-xs text-saffron-850 font-sans leading-relaxed shadow-sm mt-1">
                          {verse.reflection}
                        </div>
                      </div>
                    )}

                    {/* Deep Study Button Link */}
                    <div className="pt-3 border-t border-cream-100 flex justify-end no-expand-toggle">
                      <PrimaryButton 
                        onClick={() => navigate(`/verse/${chapter.chapter}/${verse.verse}`)}
                        variant="primary"
                        className="text-xs py-1.5 px-4"
                        icon={ChevronRight}
                      >
                        Deep Study & Journal
                      </PrimaryButton>
                    </div>
                  </motion.div>
                ) : (
                  /* Collapsed Translation summary */
                  verse.translation ? (
                    <p className="text-xs md:text-sm text-cream-405 font-serif leading-relaxed italic border-l border-cream-200 pl-2 line-clamp-1">
                      "{verse.translation}"
                    </p>
                  ) : (
                    <p className="text-xs text-cream-400 italic">Translation coming soon...</p>
                  )
                )}
              </GlassCard>
            );
          })
        )}
      </div>

      {/* Lazy Load More button */}
      {filteredVerses.length > visibleCount && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 15)}
            className="px-6 py-2.5 bg-gradient-to-r from-saffron-500 to-gold-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md shadow-gold-glow/20 transition-all hover:scale-105 active:scale-95"
          >
            Load More Verses
          </button>
        </div>
      )}
    </div>
  );
}

// 5. Meditation Space (Chant timer & Breathing circle)
function MeditationSpace() {
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [soundOption, setSoundOption] = useState('bell');
  const [breathState, setBreathState] = useState('Inhale');

  useEffect(() => {
    let timer = null;
    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      alert("Meditation session complete. Om Shanti.");
    }
    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  useEffect(() => {
    let breathTimer = null;
    if (isActive) {
      let count = 0;
      breathTimer = setInterval(() => {
        count = (count + 1) % 3;
        if (count === 0) setBreathState('Inhale');
        else if (count === 1) setBreathState('Hold');
        else setBreathState('Exhale');
      }, 3000);
    } else {
      setBreathState('Center');
    }
    return () => clearInterval(breathTimer);
  }, [isActive]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const getBreathCircleScale = () => {
    if (!isActive) return 'scale-100 opacity-90';
    if (breathState === 'Inhale') return 'scale-120 opacity-100 bg-saffron-500/25';
    if (breathState === 'Hold') return 'scale-120 opacity-100 bg-gold-400/35';
    return 'scale-90 opacity-60 bg-saffron-600/15';
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto text-center">
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Meditation Space</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Recite AUM, focus on breath, and find inner silence</p>
      </div>

      <GlassCard className="flex flex-col items-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 via-gold-450 to-saffron-600" />
        
        {/* Breathing Circle Container */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Animated pulsing backing rings */}
          <div className={`absolute w-36 h-36 rounded-full border border-saffron-200/50 transition-all duration-3000 ease-in-out ${getBreathCircleScale()}`} />
          <div className="absolute w-44 h-44 rounded-full border border-gold-300/20 animate-pulse" />
          
          {/* Static elegant center circle */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-saffron-500 to-gold-400 flex flex-col items-center justify-center text-white shadow-gold-glow z-10">
            <span className="font-serif text-3xl mb-0.5">ॐ</span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold-100">
              {isActive ? breathState : 'Peace'}
            </span>
          </div>
        </div>

        {/* Display Timer */}
        <div className="space-y-1">
          <div className="font-serif text-4xl md:text-5xl font-bold text-saffron-850 tracking-widest">
            {formatTime(secondsLeft)}
          </div>
          <p className="text-[10px] text-cream-400 font-bold uppercase tracking-wider">Remaining Time</p>
        </div>

        {/* Audio / Bell Settings */}
        <div className="flex justify-center gap-2">
          {[
            { id: 'bell', name: 'Bell' },
            { id: 'flute', name: 'Flute' },
            { id: 'aum', name: 'Deep Aum' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSoundOption(opt.id)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-lg border transition-all ${
                soundOption === opt.id 
                  ? 'bg-saffron-50 border-saffron-300 text-saffron-700 shadow-sm' 
                  : 'bg-cream-100/50 border-cream-200 text-cream-950 hover:border-saffron-200'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* Start / Pause / Reset controls */}
        <div className="flex gap-4 w-full max-w-xs justify-center">
          <PrimaryButton
            onClick={() => setIsActive(!isActive)}
            className="flex-1 text-sm py-2.5 px-6"
            variant="primary"
          >
            {isActive ? (
              <>
                <Pause className="w-4.5 h-4.5 fill-current" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4.5 h-4.5 fill-current" />
                Start Chant
              </>
            )}
          </PrimaryButton>
          <button
            onClick={() => {
              setIsActive(false);
              setSecondsLeft(300);
            }}
            className="p-3 bg-cream-100 hover:bg-cream-200 border border-cream-200 text-cream-900 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
