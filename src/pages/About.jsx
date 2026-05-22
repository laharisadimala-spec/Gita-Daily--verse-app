import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info, BookOpen, Heart, Activity } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function About() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-cream-200 pb-5">
        <h2 className="font-serif text-3xl font-bold text-saffron-850">About Gita Daily</h2>
        <p className="text-sm text-cream-400 mt-1 font-medium">Sacred discourse simplified for modern spiritual practitioners</p>
      </div>

      {/* Scriptural Inspiration */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-2 text-saffron-700">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold">The Divine Inspiration</h3>
        </div>
        <p className="text-sm text-cream-950/80 leading-relaxed font-sans">
          The Bhagavad Gita ("The Song of the Divine Lord") is a 700-verse text from the ancient Indian epic Mahabharata. It documents a dialogue between the warrior Prince Arjuna and Lord Krishna, who acts as his spiritual guide and charioteer.
        </p>
        <p className="text-sm text-cream-950/80 leading-relaxed font-sans">
          As Arjuna stands on the battlefield of Kurukshetra, he is overwhelmed by grief and despair at the prospect of war. Krishna counsels him through a profound synthesis of teachings, urging him to fulfill his duty with a calm mind, free from self-interest.
        </p>
      </GlassCard>

      {/* App Purpose */}
      <GlassCard className="space-y-4 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gold-400/5 blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2 text-saffron-700">
          <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
          <h3 className="font-serif text-xl font-bold">App Purpose</h3>
        </div>
        <p className="text-sm text-cream-950/80 leading-relaxed font-sans">
          Gita Daily was created as a peaceful digital oasis. In the middle of modern distractions, stress, and noise, this progressive web application brings you a steady flow of timeless wisdom.
        </p>
        <p className="text-sm text-cream-950/80 leading-relaxed font-sans">
          Whether you seek moral clarity, mental stability, or a dedicated meditation space for rhythmic breath chanting, Gita Daily helps you integrate ancient values into your everyday life.
        </p>
      </GlassCard>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Karma Yoga",
            subtitle: "Selfless Service",
            desc: "Perform your prescribed duties and work with dedication, while completely surrendering all anxiety over results.",
            icon: Activity
          },
          {
            title: "Bhakti Yoga",
            subtitle: "Pure Devotion",
            desc: "Dissolve the limitations of the ego by offering supreme love, adoration, and devotion to the universal consciousness.",
            icon: Heart
          },
          {
            title: "Jñāna Yoga",
            subtitle: "Path of Discernment",
            desc: "Cultivate wisdom by distinguishing between the temporary physical body and the eternal, indestructible soul (Atma).",
            icon: Info
          }
        ].map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <GlassCard key={index} delay={index * 0.1} className="flex flex-col space-y-3 !p-5">
              <div className="w-9 h-9 rounded-lg bg-saffron-50 border border-saffron-200/25 flex items-center justify-center text-saffron-600 shadow-sm">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-serif font-bold text-saffron-850 text-base">{pillar.title}</h4>
              <p className="text-[9px] font-bold text-cream-400 uppercase tracking-widest leading-none">{pillar.subtitle}</p>
              <p className="text-xs text-cream-950/75 leading-relaxed pt-1">{pillar.desc}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
