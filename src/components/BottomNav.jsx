import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Heart, Sparkles } from 'lucide-react';

export default function BottomNav({ favoritesCount }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Chapters', path: '/chapters', icon: BookOpen },
    { name: 'Saved', path: '/favorites', icon: Heart, badge: favoritesCount },
    { name: 'Meditation', path: '/meditation', icon: Sparkles },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-cream-200 flex justify-around py-2.5 z-25 shadow-lg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center py-1 px-3 relative min-w-[60px]"
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              className={`p-1 rounded-full relative transition-colors ${
                isActive ? 'text-saffron-600' : 'text-cream-400'
              }`}
            >
              <Icon className="w-5.5 h-5.5" />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-saffron-600 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </motion.div>
            <span className={`text-[10px] tracking-tight mt-0.5 ${
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
