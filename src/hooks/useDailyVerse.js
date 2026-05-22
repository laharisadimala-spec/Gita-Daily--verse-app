import { useState, useEffect } from 'react';
import { getDailyVerse } from '../utils/dailyVerse.js';

export function useDailyVerse() {
  const [dailyVerse, setDailyVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = () => {
      try {
        setLoading(true);
        const verse = getDailyVerse();
        setDailyVerse(verse);
      } catch (err) {
        console.error("Failed to load daily verse:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();

    // Check and refresh every hour in case a new day begins while the app is running
    const interval = setInterval(fetchVerse, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return { dailyVerse, loading };
}
