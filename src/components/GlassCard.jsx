import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = '', 
  delay = 0, 
  hoverEffect = true,
  onClick = null
}) {
  const hoverProps = hoverEffect && !onClick ? {
    whileHover: { y: -6, boxShadow: '0 20px 40px -15px rgba(217, 93, 36, 0.12)' },
  } : {};

  const clickableProps = onClick ? {
    whileHover: { y: -4, scale: 1.01, boxShadow: '0 15px 30px -10px rgba(217, 93, 36, 0.1)' },
    whileTap: { scale: 0.99 },
    onClick
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...hoverProps}
      {...clickableProps}
      className={`bg-white/70 dark:bg-[#E4D1B8]/40 backdrop-blur-md border border-white/60 dark:border-saffron-300/30 rounded-2xl p-6 shadow-spiritual dark:shadow-[0_8px_30px_-5px_rgba(217,93,36,0.15)] relative overflow-hidden transition-all duration-700 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Decorative Golden Corner Flare */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gold-400/10 to-transparent rounded-tr-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
