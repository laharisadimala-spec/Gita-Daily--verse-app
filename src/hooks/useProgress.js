import { useState, useEffect, useMemo, useCallback } from 'react';
import { dbFetchProgress, dbFetchNotes, dbSaveProgress, dbSaveNote, dbResetProgress } from '../services/firebaseHelpers.js';

/**
 * Pure localStorage-based progress and notes hook.
 * Firebase sync is attempted in the background to ensure offline-first support.
 */
export function useProgress() {
  const [readVerses, setReadVerses] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_read_progress');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Pull remote progress and notes on mount and merge
  useEffect(() => {
    let active = true;
    dbFetchProgress().then(mergedProg => {
      if (active && mergedProg) {
        setReadVerses(mergedProg);
      }
    });
    dbFetchNotes().then(mergedNotes => {
      if (active && mergedNotes) {
        setNotes(mergedNotes);
      }
    });
    return () => { active = false; };
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('gita_read_progress', JSON.stringify(readVerses));
  }, [readVerses]);

  useEffect(() => {
    localStorage.setItem('gita_notes', JSON.stringify(notes));
  }, [notes]);

  const markAsRead = useCallback((chapterId, verseId) => {
    const key = `${chapterId}-${verseId}`;
    setReadVerses(prev => {
      if (prev.includes(key)) return prev;
      const updated = [...prev, key];
      // Async background sync with Firestore
      dbSaveProgress(key, true).then(newProg => {
        if (newProg) {
          setReadVerses(newProg);
        }
      });
      return updated;
    });
  }, []);

  const saveNote = useCallback((chapterId, verseId, noteText) => {
    const key = `${chapterId}-${verseId}`;
    setNotes(prev => {
      const updatedNotes = { ...prev, [key]: noteText };
      // Async background sync with Firestore for note
      dbSaveNote(key, noteText).then(newNotes => {
        if (newNotes) {
          setNotes(newNotes);
        }
      });
      return updatedNotes;
    });

    // Auto mark as read
    setReadVerses(prev => {
      if (prev.includes(key)) return prev;
      const updated = [...prev, key];
      // Async background sync with Firestore for progress
      dbSaveProgress(key, true).then(newProg => {
        if (newProg) {
          setReadVerses(newProg);
        }
      });
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setReadVerses([]);
    setNotes({});
    localStorage.setItem('gita_read_progress', JSON.stringify([]));
    localStorage.setItem('gita_notes', JSON.stringify({}));
    // Async background sync with Firestore
    dbResetProgress();
  }, []);

  // Merge read checklist and journal notes to get absolute read verses list
  const uniqueReadKeys = useMemo(() => {
    const noteKeys = Object.keys(notes).filter(k => notes[k] && notes[k].trim() !== '');
    return Array.from(new Set([...readVerses, ...noteKeys]));
  }, [readVerses, notes]);

  return {
    readVerses: uniqueReadKeys,
    notes,
    markAsRead,
    saveNote,
    resetProgress,
  };
}

