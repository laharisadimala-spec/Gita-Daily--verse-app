import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Heart, Sparkles, Info, X, LayoutDashboard, Settings } from 'lucide-react';
import Navbar from './Navbar.jsx';
import BottomNav from './BottomNav.jsx';
import FloatingParticles from './FloatingParticles.jsx';

export default function Layout({ children, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Gita Chapters', path: '/chapters', icon: BookOpen },
    { name: 'Saved Verses', path: '/favorites', icon: Heart, badge: favoritesCount },
    { name: 'Meditation', path: '/meditation', icon: Sparkles },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'About & Teachings', path: '/about', icon: Info },
  ];


  return (
    <div className="min-h-screen bg-cream-50 flex flex-col relative overflow-x-hidden">
      {/* Spiritual ambient floating particles */}
      <FloatingParticles count={18} />

      {/* Top Main Navigation Bar */}
      <Navbar 
        onMobileMenuOpen={() => setMobileMenuOpen(true)} 
        favoritesCount={favoritesCount} 
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex-1 flex flex-col min-w-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Drawer (AnimatePresence Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-cream-900/40 backdrop-blur-sm"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-72 bg-white z-50 p-6 shadow-2xl flex flex-col justify-between border-l border-cream-150"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-cream-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-saffron-600 font-bold font-serif">ॐ</span>
                    <span className="font-serif font-bold text-lg text-saffron-850 tracking-wide">Explore Gita</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-cream-100 text-cream-400 hover:text-saffron-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${
                          isActive
                            ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-md'
                            : 'text-cream-900 hover:bg-cream-100 hover:text-saffron-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-saffron-500'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white text-saffron-600' : 'bg-saffron-100 text-saffron-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-cream-200 text-center text-xs text-cream-400 font-medium">
                <p>Gita Daily • Spiritual Companion</p>
                <p className="mt-1">Dharma is Eternal</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom navigation shortcuts */}
      <BottomNav favoritesCount={favoritesCount} />
    </div>
  );
}
