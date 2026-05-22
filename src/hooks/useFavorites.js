import React, { useState, useEffect, useCallback } from 'react';
import { dbFetchFavorites, dbSaveFavorite, dbClearFavorites } from '../services/firebaseHelpers.js';

/**
 * Pure localStorage-based favorites hook.
 * Firebase sync is attempted but never blocks the UI.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Pull remote favorites on mount and merge
  useEffect(() => {
    let active = true;
    dbFetchFavorites().then(mergedFavs => {
      if (active && mergedFavs) {
        setFavorites(mergedFavs);
      }
    });
    return () => { active = false; };
  }, []);

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('gita_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((chapterId, verseId) => {
    const key = `${chapterId}-${verseId}`;
    setFavorites(prev => {
      const isAdd = !prev.includes(key);
      const updated = isAdd ? [...prev, key] : prev.filter(k => k !== key);
      
      // Async background sync with Firestore
      dbSaveFavorite(key, isAdd).then(newFavs => {
        if (newFavs) {
          setFavorites(newFavs);
        }
      });
      
      return updated;
    });
  }, []);

  const isFavorite = useCallback((chapterId, verseId) => {
    return favorites.includes(`${chapterId}-${verseId}`);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.setItem('gita_favorites', JSON.stringify([]));
    dbClearFavorites();
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}

