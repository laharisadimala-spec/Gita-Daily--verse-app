import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function Contact() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="border-b border-cream-200 pb-5 text-center">
        <Mail className="w-12 h-12 text-saffron-500 mx-auto mb-3" />
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Contact & Support</h2>
        <p className="text-sm text-cream-455 mt-1 font-medium">We are here to help you on your spiritual journey</p>
      </div>

      <GlassCard className="space-y-6 text-center">
        <div className="space-y-3">
          <p className="text-sm text-cream-900 leading-relaxed">
            Have questions, feedback, or need assistance with the app? We would love to hear from you.
          </p>
          <div className="bg-saffron-50/50 p-6 rounded-xl border border-saffron-200/50 inline-block mt-4">
            <p className="text-xs font-bold text-saffron-800 uppercase tracking-wider mb-2">Email Support</p>
            <a href="mailto:laharisadimala44@gmail.com" className="text-lg md:text-xl font-serif font-bold text-saffron-600 hover:text-saffron-500 transition-colors">
              laharisadimala44@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-cream-200 mt-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-saffron-50 text-saffron-700 rounded-full border border-saffron-200/50">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Support features coming soon ✨</span>
          </div>
        </div>
      </GlassCard>

      {/* Creator Credit */}
      <div className="text-center pt-8 pb-4">
        <p className="text-xs font-serif font-medium text-saffron-600/80 tracking-wide">
          Made with devotion by Lahari Sadimala ✨
        </p>
      </div>
    </div>
  );
}
