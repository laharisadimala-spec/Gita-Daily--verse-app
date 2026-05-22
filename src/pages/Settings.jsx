import React, { useState, useEffect } from 'react';
import { Sun, Moon, Music, Bell, Trash2, RefreshCcw, Check, VolumeX, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Settings({ clearFavorites, resetProgress }) {
  // Theme Toggle State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Music Toggle State
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('music_enabled');
    return saved === 'true';
  });

  // Notification Toggle State
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notifications_enabled');
    return saved === 'true';
  });

  // Feedback notifications
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Apply Theme class when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle Music Toggle
  const handleMusicToggle = () => {
    const nextState = !musicEnabled;
    setMusicEnabled(nextState);
    localStorage.setItem('music_enabled', String(nextState));
    triggerFeedback(nextState ? 'Background chanting enabled.' : 'Background chanting muted.');
  };

  // Handle Notifications Toggle
  const handleNotificationsToggle = () => {
    const nextState = !notificationsEnabled;
    setNotificationsEnabled(nextState);
    localStorage.setItem('notifications_enabled', String(nextState));
    triggerFeedback(nextState ? 'Daily reminders enabled.' : 'Daily reminders disabled.');
  };

  const triggerFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all your saved verses? This action cannot be undone.")) {
      clearFavorites();
      triggerFeedback("Saved verses cleared successfully.");
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to clear your Sadhana progress? All notes and reflections will be deleted. This action cannot be undone.")) {
      resetProgress();
      triggerFeedback("Progress and journal entries reset successfully.");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">App Settings</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Personalize your reading experience and manage your data</p>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-saffron-50 border border-saffron-200 text-saffron-800 text-xs font-bold px-4 py-2.5 rounded-xl text-center shadow-sm"
        >
          {feedbackMsg}
        </motion.div>
      )}

      {/* Appearance Settings */}
      <GlassCard className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-saffron-850 border-b border-cream-100 pb-2 flex items-center gap-2">
          <Sun className="w-5 h-5 text-saffron-600" />
          Appearance & Themes
        </h3>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-sm font-semibold text-cream-950">Spiritual Dark Mode</h4>
            <p className="text-xs text-cream-400 mt-0.5">Toggle between serene light cream and deep twilight mode</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              darkMode ? 'bg-saffron-600' : 'bg-cream-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 flex items-center justify-center ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {darkMode ? (
                <Moon className="w-2.5 h-2.5 text-saffron-650" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-amber-500" />
              )}
            </div>
          </button>
        </div>
      </GlassCard>

      {/* Audio & Alert Settings */}
      <GlassCard className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-saffron-850 border-b border-cream-100 pb-2 flex items-center gap-2">
          <Bell className="w-5 h-5 text-saffron-600" />
          Audio & Daily Sadhana
        </h3>

        {/* Music Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-cream-100/50 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-cream-950">Ambient Spiritual Audio</h4>
            <p className="text-xs text-cream-400 mt-0.5">Enable soft background flute and chanting audio during study</p>
          </div>
          <button
            onClick={handleMusicToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              musicEnabled ? 'bg-saffron-600' : 'bg-cream-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 flex items-center justify-center ${
                musicEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {musicEnabled ? (
                <Music className="w-2.5 h-2.5 text-saffron-650" />
              ) : (
                <VolumeX className="w-2.5 h-2.5 text-cream-400" />
              )}
            </div>
          </button>
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-sm font-semibold text-cream-950">Daily Verse Reminders</h4>
            <p className="text-xs text-cream-400 mt-0.5">Receive daily notifications to read a new verse of wisdom</p>
          </div>
          <button
            onClick={handleNotificationsToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              notificationsEnabled ? 'bg-saffron-600' : 'bg-cream-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 flex items-center justify-center ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {notificationsEnabled ? (
                <Check className="w-2.5 h-2.5 text-saffron-650 font-bold" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-cream-300" />
              )}
            </div>
          </button>
        </div>
      </GlassCard>

      {/* Data Management Settings */}
      <GlassCard className="space-y-4 border border-red-100/50">
        <h3 className="font-serif text-lg font-bold text-red-700 border-b border-red-100/40 pb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-650" />
          Danger Zone
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-cream-100/50 pb-4">
          <div>
            <h4 className="text-sm font-semibold text-cream-950">Clear Bookmarks</h4>
            <p className="text-xs text-cream-400 mt-0.5">Delete all saved verses from your library</p>
          </div>
          <PrimaryButton
            onClick={handleClearFavorites}
            className="!bg-red-50 hover:!bg-red-100 !text-red-700 border border-red-200/50 text-xs py-2 px-4 shadow-none"
            icon={Trash2}
          >
            Clear Saved List
          </PrimaryButton>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div>
            <h4 className="text-sm font-semibold text-cream-950">Reset Progress</h4>
            <p className="text-xs text-cream-400 mt-0.5">Wipe all notes, reflections, and study checkpoints</p>
          </div>
          <PrimaryButton
            onClick={handleResetProgress}
            className="!bg-red-50 hover:!bg-red-100 !text-red-700 border border-red-200/50 text-xs py-2 px-4 shadow-none"
            icon={RefreshCcw}
          >
            Reset Journal Data
          </PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
}
