import React, { useState, useRef } from 'react';
import { Mail, Send, Heart, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_gita_daily';
    const templateID = 'template_contact';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          setSent(true);
      })
      .catch((err) => {
          console.error('EmailJS Error:', err);
          setError('Failed to send message. Please try again or email us directly.');
      })
      .finally(() => {
          setLoading(false);
      });
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
            <form ref={form} onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-cream-900 uppercase tracking-wider mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="user_name"
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm disabled:opacity-50"
                  placeholder="Arjuna"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cream-900 uppercase tracking-wider mb-1">Your Email</label>
                <input 
                  type="email" 
                  name="user_email"
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm disabled:opacity-50"
                  placeholder="arjuna@kurukshetra.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cream-900 uppercase tracking-wider mb-1">Your Message</label>
                <textarea 
                  name="message"
                  required
                  disabled={loading}
                  rows="4"
                  className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-saffron-500 transition-colors shadow-sm resize-none disabled:opacity-50"
                  placeholder="Share your thoughts or questions..."
                ></textarea>
              </div>
              <PrimaryButton type="submit" variant="primary" className="w-full justify-center" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </PrimaryButton>
            </form>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
