import gitaData from '../data/gitaData.js';

/**
 * Flattens all verses from all chapters into a single array with chapter context.
 */
function getAllVerses() {
  const all = [];
  for (const chapter of gitaData) {
    for (const verseObj of chapter.verses) {
      all.push({
        ...verseObj,
        id: verseObj.verse, // Support legacy verse.id references in Pages
        chapter: chapter.chapter,
        chapterName: chapter.title,
        chapterTranslation: chapter.translation,
      });
    }
  }
  return all;
}

/**
 * Gets a deterministic daily verse from the complete Gita dataset.
 * Rotates every 24 hours (calendar day) and is cached in localStorage.
 * Same verse remains for the entire day.
 */
export function getDailyVerse() {
  const verses = getAllVerses();
  if (!verses || verses.length === 0) return null;

  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Check if we have cached daily verse for today
  const cachedData = localStorage.getItem('gita_daily_verse_cache');
  if (cachedData) {
    try {
      const parsed = JSON.parse(cachedData);
      if (parsed.date === dateString && parsed.verse) {
        return parsed.verse;
      }
    } catch (e) {
      console.error("Error parsing cached daily verse:", e);
    }
  }

  // Generate deterministic index based on the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % verses.length;
  const selectedVerse = verses[index];

  const dailyVerseObj = {
    verse: selectedVerse.verse,
    id: selectedVerse.verse,
    sanskrit: selectedVerse.sanskrit,
    transliteration: selectedVerse.transliteration,
    translation: selectedVerse.translation,
    explanation: selectedVerse.explanation,
    reflection: selectedVerse.reflection,
    mood: selectedVerse.mood,
    chapter: selectedVerse.chapter,
    chapterName: selectedVerse.chapterName,
    chapterTranslation: selectedVerse.chapterTranslation,
  };

  // Cache in localStorage
  localStorage.setItem('gita_daily_verse_cache', JSON.stringify({
    date: dateString,
    verse: dailyVerseObj,
  }));

  return dailyVerseObj;
}

/**
 * Gets all available verses flattened (for archive/search)
 * Support memoization on flat loading
 */
export function getAllVersesFlat() {
  return getAllVerses();
}

