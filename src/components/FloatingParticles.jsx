import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles({ count = 15 }) {
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        size: Math.random() * 6 + 2,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    return list;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-gold-400 to-saffron-500 shadow-gold-glow"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10px',
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: ['0px', `${Math.random() * 40 - 20}px`, '0px'],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
