import React from 'react';
import { Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function PrivacyPolicy() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="border-b border-cream-200 pb-5 text-center">
        <Shield className="w-12 h-12 text-saffron-500 mx-auto mb-3" />
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Privacy Policy</h2>
        <p className="text-sm text-cream-455 mt-1 font-medium">Your spiritual journey is private</p>
      </div>

      <GlassCard className="space-y-6">
        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">1. Local Storage</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            Gita Daily respects your privacy. Your saved verses, reading progress, and journal reflections are stored locally on your device. We do not transmit or store your personal spiritual notes on external servers.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">2. Firebase & Notifications</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            The app may use Firebase Cloud Messaging to send you daily verse notifications. This involves generating a device token to route the notification. No sensitive personal data is collected or linked to this token.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">3. Data Clearing</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            You maintain full control over your data. You can clear your favorites, progress, and settings at any time using the "Reset App Data" option in the Settings page.
          </p>
        </section>
        
        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">4. Analytics</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            We may collect anonymous, aggregated usage data to understand how the app is used and to improve the experience. This data cannot be used to identify you personally.
          </p>
        </section>

        <div className="pt-4 border-t border-cream-200 text-xs text-cream-400 text-center">
          Last updated: May 2026
        </div>
      </GlassCard>
    </div>
  );
}
