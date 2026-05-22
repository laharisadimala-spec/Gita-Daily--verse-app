import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Heart, Sparkles, Info, Menu, X, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar({ onMobileMenuOpen, favoritesCount }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Chapters', path: '/chapters', icon: BookOpen },
    { name: 'Saved', path: '/favorites', icon: Heart, badge: favoritesCount },
    { name: 'Meditation', path: '/meditation', icon: Sparkles },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Teachings', path: '/about', icon: Info },
  ];


  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-cream-200 shadow-sm px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Brand logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-saffron-500 to-gold-400 flex items-center justify-center text-white shadow-gold-glow"
        >
          <span className="font-serif text-xl font-bold">ॐ</span>
        </motion.div>
        <div>
          <h1 className="font-serif text-lg md:text-xl font-bold text-saffron-850 tracking-wide leading-none">Gita Daily</h1>
          <span className="text-[9px] text-cream-400 font-semibold tracking-wider uppercase block mt-0.5">Sacred Companion</span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive ? 'text-saffron-700 font-bold' : 'text-cream-900 hover:text-saffron-600'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-saffron-50 rounded-xl border border-saffron-100/50 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'text-saffron-600' : 'text-cream-400'}`} />
              <span>{item.name}</span>
              {item.badge > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-saffron-650 text-white font-bold' : 'bg-saffron-100 text-saffron-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden items-center gap-3">
        {favoritesCount > 0 && (
          <Link to="/favorites" className="relative p-2 text-cream-900">
            <Heart className="w-5 h-5 text-saffron-500 fill-saffron-500/25" />
            <span className="absolute top-0 right-0 bg-saffron-600 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
              {favoritesCount}
            </span>
          </Link>
        )}
        <button
          onClick={onMobileMenuOpen}
          className="p-2 text-cream-900 hover:text-saffron-600 rounded-xl hover:bg-cream-100 focus:outline-none transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
