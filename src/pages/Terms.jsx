import React from 'react';
import { ScrollText } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function Terms() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="border-b border-cream-200 pb-5 text-center">
        <ScrollText className="w-12 h-12 text-saffron-500 mx-auto mb-3" />
        <h2 className="font-serif text-3xl font-bold text-saffron-850">Terms of Service</h2>
        <p className="text-sm text-cream-455 mt-1 font-medium">Guidelines for using Gita Daily</p>
      </div>

      <GlassCard className="space-y-6">
        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">1. Educational & Spiritual Purpose</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            Gita Daily is designed for educational, spiritual, and personal reflection purposes. The translations and explanations are intended to guide and inspire, but should not be taken as absolute dogma or substitute for scholarly study under a qualified teacher.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">2. Acceptable Use</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            You agree to use this application for its intended purpose of spiritual growth and reflection. Any attempt to reverse engineer, disrupt, or use the application for harmful purposes is strictly prohibited.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-xl font-bold text-saffron-800 mb-2">3. Provided "As-Is"</h3>
          <p className="text-sm text-cream-900 leading-relaxed">
            This application is provided "as-is" without any warranties, express or implied. While we strive to ensure the accuracy of the verses and translations, we do not guarantee that the content will be error-free or uninterrupted.
          </p>
        </section>

        <div className="pt-4 border-t border-cream-200 text-xs text-cream-400 text-center">
          Last updated: May 2026
        </div>
      </GlassCard>
    </div>
  );
}
