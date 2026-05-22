import React from 'react';
import { motion } from 'framer-motion';

export default function PrimaryButton({
  children,
  onClick,
  className = '',
  variant = 'primary', // primary (saffron), secondary (gold), outline
  icon: Icon = null,
  disabled = false,
  type = 'button'
}) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-medium rounded-xl text-sm px-6 py-2.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-saffron-500/20";
  
  const variants = {
    primary: "bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white shadow-md shadow-saffron-600/10",
    secondary: "bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white shadow-md shadow-gold-500/10",
    outline: "bg-white/50 backdrop-blur-sm border border-cream-200 text-saffron-700 hover:bg-cream-100 hover:border-saffron-200"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}
