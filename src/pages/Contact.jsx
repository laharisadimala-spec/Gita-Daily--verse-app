import React, { useState } from 'react';
import { Mail, Send, Heart } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => setSent(true), 500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="border-b border-cream-200 pb-5 text-center">
        <Mail className="w-12 h-12 text-saffron-500 mx-auto mb-3" />
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Contact & Support</h2>
        <p className="text-sm text-cream-455 mt-1 font-medium">We are here to help you on your spiritual journey</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-sm text-cream-900 leading-relaxed">
            Have questions, feedback, or need assistance with the app? We would love to hear from you.
          </p>
          <div className="bg-saffron-50/50 p-4 rounded-xl border border-saffron-200/50 inline-block">
            <p className="text-xs font-bold text-saffron-800 uppercase tracking-wider mb-1">Email Support</p>
            <a href="mailto:laharisadimala44@gmail.com" className="text-lg font-serif font-bold text-saffron-600 hover:text-saffron-500 transition-colors">
              laharisadimala44@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-cream-200">
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-4 text-center">Send Feedback</h3>
          
          {sent ? (
            <div className="text-center py-8 space-y-3">
              <Heart className="w-12 h-12 text-saffron-500 mx-auto animate-pulse" />
              <p className="font-serif text-xl text-saffron-850 font-bold">Thank you!</p>
              <p className="text-sm text-cream-900">Your message has been received with gratitude. Om Shanti.</p>
              <button 
                onClick={() => setSent(false)}
                className="mt-4 text-xs text-saffron-600 font-bold uppercase tracking-wider hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-bold text-cream-900 uppercase tracking-wider mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm"
                  placeholder="Arjuna"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cream-900 uppercase tracking-wider mb-1">Your Message</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm resize-none"
                  placeholder="Share your thoughts or questions..."
                ></textarea>
              </div>
              <PrimaryButton type="submit" variant="primary" className="w-full justify-center">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </PrimaryButton>
            </form>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
