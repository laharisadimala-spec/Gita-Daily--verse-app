import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, ChevronLeft, ChevronRight, Play, Pause, Edit3, Check, BookOpen } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import gitaData from '../data/gitaData.js';

export default function DailyVerse({ favorites, toggleFavorite, notes, saveNote, defaultChapterId = 2, defaultVerseId = 47 }) {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();
  
  const parsedChapterId = chapterId ? parseInt(chapterId) : defaultChapterId;
  const parsedVerseId = verseId ? parseInt(verseId) : defaultVerseId;

  const [localNote, setLocalNote] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showCommentary, setShowCommentary] = useState(true);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const { currentChapter, verse } = useMemo(() => {
    const ch = gitaData.find(c => c.chapter === parsedChapterId);
    const ver = ch ? ch.verses.find(v => v.verse === parsedVerseId) : null;
    return { currentChapter: ch, verse: ver };
  }, [parsedChapterId, parsedVerseId]);

  const key = `${parsedChapterId}-${parsedVerseId}`;
  useEffect(() => {
    setLocalNote(notes[key] || '');
  }, [notes, key]);

  // Sanskrit recitation audio support using browser's SpeechSynthesis API
  useEffect(() => {
    if (isAudioPlaying && verse) {
      const textToRecite = verse.transliteration;
      const utterance = new SpeechSynthesisUtterance(textToRecite);
      utterance.rate = 0.85; // Serene, meditative flow
      utterance.pitch = 0.95;
      
      // Attempt to load Indian Hindi/English voice for optimal Sanskrit rhythm
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isAudioPlaying, verse]);

  if (!verse || !currentChapter) {
    return (
      <GlassCard className="text-center py-16">
        <h3 className="font-serif text-lg font-bold text-saffron-850">Scripture Not Available</h3>
        <p className="text-xs text-cream-400 mt-2 mb-6">This chapter or verse could not be loaded.</p>
        <PrimaryButton onClick={() => navigate('/')} variant="primary">
          Return Home
        </PrimaryButton>
      </GlassCard>
    );
  }

  const isFavorite = favorites.includes(key);

  const handleSaveNote = () => {
    saveNote(parsedChapterId, parsedVerseId, localNote);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handleShare = () => {
    const textToShare = `🌸 Gita Wisdom of the Day 🌸\n\nChapter ${parsedChapterId}, Verse ${parsedVerseId}\n\n"${verse.sanskrit}"\n\nMeaning: ${verse.translation}\n\nStudy daily on Gita Daily App!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Today’s Gita Wisdom',
        text: textToShare,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: WhatsApp share
      const encodedText = encodeURIComponent(textToShare);
      window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    }
  };

  // Pagination navigation within the chapter
  const availableVerses = currentChapter.verses.map(v => v.verse).sort((a, b) => a - b);
  const currentIndex = availableVerses.indexOf(parsedVerseId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/verse/${parsedChapterId}/${availableVerses[currentIndex - 1]}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < availableVerses.length - 1) {
      navigate(`/verse/${parsedChapterId}/${availableVerses[currentIndex + 1]}`);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header / Back Button */}
      <div className="flex items-center justify-between border-b border-cream-200 pb-4">
        <button
          onClick={() => navigate('/chapters')}
          className="flex items-center gap-1.5 text-cream-900 hover:text-saffron-600 font-bold text-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Gita Chapters
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className={`p-2 rounded-xl border border-cream-200 bg-white/60 transition-colors ${
              currentIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-cream-50 text-cream-900 hover:text-saffron-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 font-serif text-sm font-bold text-saffron-750">
            Chapter {currentChapter.chapter} • Verse {verse.verse}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex >= availableVerses.length - 1}
            className={`p-2 rounded-xl border border-cream-200 bg-white/60 transition-colors ${
              currentIndex >= availableVerses.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-cream-50 text-cream-900 hover:text-saffron-600'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scripture details */}
      <GlassCard className="!p-0 overflow-hidden relative shadow-spiritual-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 via-gold-450 to-saffron-600" />
        
        {/* Audio control & Actions header bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-cream-100/30 border-b border-cream-150/60">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border transition-all duration-300 ${
                isAudioPlaying
                  ? 'bg-saffron-600 border-saffron-600 text-white shadow-gold-glow'
                  : 'bg-white border-cream-200 text-cream-950 hover:border-saffron-300'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  Chanting
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Play Chants
                </>
              )}
            </button>
            {isAudioPlaying && (
              <div className="flex items-center gap-0.5 px-1">
                <span className="w-1 h-3 bg-saffron-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-1 h-4 bg-saffron-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                <span className="w-1 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(parsedChapterId, parsedVerseId)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite
                  ? 'bg-saffron-50 border-saffron-200 text-saffron-600'
                  : 'bg-white border-cream-200 text-cream-400 hover:text-saffron-600'
              }`}
              title={isFavorite ? "Remove Saved" : "Save Verse"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-saffron-500 text-saffron-500' : ''}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-xl border border-cream-200 bg-white text-cream-400 hover:text-saffron-600 transition-colors"
              title="Share Verse"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Scriptural Content Box */}
        <div className="p-6 md:p-10 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-bold text-saffron-600 tracking-widest uppercase">Original Sanskrit</span>
            {verse.sanskrit && (
              <blockquote className="font-serif text-2xl md:text-3xl font-bold text-saffron-850 leading-loose whitespace-pre-line tracking-wide">
                {verse.sanskrit}
              </blockquote>
            )}
          </div>

          {verse.transliteration && (
            <div className="text-center pt-4 border-t border-cream-100">
              <span className="text-[9px] font-bold text-cream-400 tracking-widest uppercase">English Transliteration</span>
              <p className="font-serif italic text-sm md:text-base text-cream-950/70 leading-relaxed max-w-xl mx-auto mt-2">
                {verse.transliteration}
              </p>
            </div>
          )}

          {verse.translation && (
            <div className="pt-6 border-t border-cream-100">
              <span className="text-[9px] font-bold text-saffron-600 tracking-widest uppercase">English Meaning</span>
              <p className="font-serif text-base md:text-lg text-cream-950 leading-relaxed mt-2.5">
                {verse.translation}
              </p>
            </div>
          )}

          {verse.explanation && (
            <div className="pt-6 border-t border-cream-100">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-saffron-650 tracking-widest uppercase">Purport & Explanation</span>
                <button 
                  onClick={() => setShowCommentary(!showCommentary)}
                  className="text-xs font-bold text-saffron-600 hover:text-saffron-700"
                >
                  {showCommentary ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {showCommentary && (
                <div className="mt-3.5 text-sm text-cream-950/80 leading-relaxed bg-cream-100/35 border border-cream-200/50 rounded-xl p-4 md:p-6 animate-fade-in font-sans">
                  {verse.explanation}
                </div>
              )}
            </div>
          )}

          {verse.reflection && (
            <div className="pt-6 border-t border-cream-100">
              <span className="text-[9px] font-bold text-gold-600 tracking-widest uppercase">Today’s Reflection</span>
              <div className="bg-gradient-to-r from-saffron-50/50 to-gold-50/30 border-l-4 border-saffron-500 rounded-r-xl p-4 text-sm text-saffron-850 font-sans leading-relaxed shadow-sm mt-2.5">
                {verse.reflection}
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Reflections journal section */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4 border-b border-cream-100 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-saffron-550" />
            <h3 className="font-serif text-lg font-bold text-saffron-850">My Sadhana Journal</h3>
          </div>
          {noteSavedFeedback && (
            <span className="text-xs text-green-650 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Journal Entry Saved
            </span>
          )}
        </div>
        <textarea
          placeholder="Write down your personal insights, reflections, or how you intend to apply this verse in your daily life..."
          rows={3}
          value={localNote}
          onChange={(e) => setLocalNote(e.target.value)}
          className="w-full p-4 bg-cream-100/30 border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors placeholder-cream-400/80"
        />
        <div className="mt-3 flex justify-end">
          <PrimaryButton onClick={handleSaveNote} variant="primary">
            Save Reflection
          </PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
}
