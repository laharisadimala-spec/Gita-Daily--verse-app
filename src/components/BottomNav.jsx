import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen, LayoutDashboard, Settings as SettingsIcon, Sun, Music } from 'lucide-react';
import { useDailyVerse } from '../hooks/useDailyVerse.js';

export default function BottomNav({ favoritesCount }) {
  const location = useLocation();
  const { dailyVerse } = useDailyVerse();
  
  const dailyVersePath = dailyVerse ? `/verse/${dailyVerse.chapter}/${dailyVerse.verse}` : `/verse/2/47`;

  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Daily Verse', path: dailyVersePath, icon: Sun },
    { name: 'Chapters', path: '/chapters', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Meditation', path: '/meditation', icon: Music },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-white/90 backdrop-blur-md border-t border-cream-200 dark:border-saffron-200/50 flex justify-around py-2.5 z-50 shadow-lg dark:shadow-spiritual-lg pb-safe transition-colors duration-500">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-1 flex-col items-center py-1 px-1 relative min-w-0"
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              className={`p-1 rounded-full relative transition-colors ${
                isActive ? 'text-saffron-600' : 'text-cream-400 dark:text-cream-450'
              }`}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-saffron-600 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </motion.div>
            <span className={`text-[9px] md:text-[10px] tracking-tight mt-1 truncate w-full text-center ${
              isActive ? 'text-saffron-700 font-bold' : 'text-cream-400'
            }`}>
              {item.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottomNavDot"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-saffron-600"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
