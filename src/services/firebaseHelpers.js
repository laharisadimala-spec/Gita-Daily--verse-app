import { db, isFirebaseEnabled, getAnonymousUser } from './firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Gets the current authenticated user's UID or null if not authenticated/enabled.
 */
export async function getUid() {
  const user = await getAnonymousUser();
  return user ? user.uid : null;
}

// --- FAVORITES COLLECTION ---

/**
 * Saves a favorite verse. Merges locally first, then attempts Firestore sync.
 * @param {string} verseKey "chapterId-verseId"
 * @param {boolean} isAdd True to add, false to remove
 */
export async function dbSaveFavorite(verseKey, isAdd) {
  // Local storage update (primary fallback)
  const localFavs = JSON.parse(localStorage.getItem('gita_favorites') || '[]');
  let updatedFavs;
  if (isAdd) {
    updatedFavs = Array.from(new Set([...localFavs, verseKey]));
  } else {
    updatedFavs = localFavs.filter(k => k !== verseKey);
  }
  localStorage.setItem('gita_favorites', JSON.stringify(updatedFavs));

  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return updatedFavs;

  try {
    const docRef = doc(db, 'favorites', uid);
    await setDoc(docRef, { list: updatedFavs }, { merge: true });
  } catch (error) {
    console.error("Firestore failed to save favorite verse:", error);
  }
  return updatedFavs;
}

/**
 * Fetches favorites from Firestore if available and merges with local storage.
 */
export async function dbFetchFavorites() {
  const localFavs = JSON.parse(localStorage.getItem('gita_favorites') || '[]');
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return localFavs;

  try {
    const docRef = doc(db, 'favorites', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbFavs = docSnap.data().list || [];
      const merged = Array.from(new Set([...localFavs, ...dbFavs]));
      localStorage.setItem('gita_favorites', JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.error("Firestore failed to fetch favorites:", error);
  }
  return localFavs;
}

// --- PROGRESS COLLECTION (Read verses & Notes) ---

/**
 * Saves read verse progress locally and syncs to Firestore.
 */
export async function dbSaveProgress(verseKey, isRead) {
  const localProg = JSON.parse(localStorage.getItem('gita_read_progress') || '[]');
  let updatedProg;
  if (isRead) {
    updatedProg = Array.from(new Set([...localProg, verseKey]));
  } else {
    updatedProg = localProg.filter(k => k !== verseKey);
  }
  localStorage.setItem('gita_read_progress', JSON.stringify(updatedProg));

  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return updatedProg;

  try {
    const docRef = doc(db, 'progress', uid);
    await setDoc(docRef, { read: updatedProg }, { merge: true });
  } catch (error) {
    console.error("Firestore failed to save progress:", error);
  }
  return updatedProg;
}

/**
 * Fetches read progress from Firestore and merges with local storage.
 */
export async function dbFetchProgress() {
  const localProg = JSON.parse(localStorage.getItem('gita_read_progress') || '[]');
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return localProg;

  try {
    const docRef = doc(db, 'progress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbProg = docSnap.data().read || [];
      const merged = Array.from(new Set([...localProg, ...dbProg]));
      localStorage.setItem('gita_read_progress', JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.error("Firestore failed to fetch progress:", error);
  }
  return localProg;
}

/**
 * Saves a personal reflection/note locally and syncs to Firestore progress document.
 */
export async function dbSaveNote(verseKey, noteText) {
  const localNotes = JSON.parse(localStorage.getItem('gita_notes') || '{}');
  localNotes[verseKey] = noteText;
  localStorage.setItem('gita_notes', JSON.stringify(localNotes));

  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return localNotes;

  try {
    const docRef = doc(db, 'progress', uid);
    await setDoc(docRef, { notes: localNotes }, { merge: true });
  } catch (error) {
    console.error("Firestore failed to save note:", error);
  }
  return localNotes;
}

/**
 * Fetches personal reflections/notes and merges with local storage.
 */
export async function dbFetchNotes() {
  const localNotes = JSON.parse(localStorage.getItem('gita_notes') || '{}');
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return localNotes;

  try {
    const docRef = doc(db, 'progress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbNotes = docSnap.data().notes || {};
      const merged = { ...localNotes, ...dbNotes };
      localStorage.setItem('gita_notes', JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.error("Firestore failed to fetch notes:", error);
  }
  return localNotes;
}

// --- SETTINGS COLLECTION ---

/**
 * Saves app settings locally and syncs to Firestore.
 */
export async function dbSaveSettings(settingsObj) {
  localStorage.setItem('gita_settings', JSON.stringify(settingsObj));

  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return settingsObj;

  try {
    const docRef = doc(db, 'settings', uid);
    await setDoc(docRef, settingsObj, { merge: true });
  } catch (error) {
    console.error("Firestore failed to save settings:", error);
  }
  return settingsObj;
}

/**
 * Fetches app settings from Firestore and merges with local storage.
 */
export async function dbFetchSettings() {
  const defaultSettings = { soundEnabled: true, audioTheme: 'bell', theme: 'light' };
  const localSettings = JSON.parse(localStorage.getItem('gita_settings') || 'null') || defaultSettings;
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return localSettings;

  try {
    const docRef = doc(db, 'settings', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbSettings = docSnap.data();
      const merged = { ...localSettings, ...dbSettings };
      localStorage.setItem('gita_settings', JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.error("Firestore failed to fetch settings:", error);
  }
  return localSettings;
}

/**
 * Clears all favorites from local storage and syncs to Firestore.
 */
export async function dbClearFavorites() {
  localStorage.setItem('gita_favorites', JSON.stringify([]));
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return [];

  try {
    const docRef = doc(db, 'favorites', uid);
    await setDoc(docRef, { list: [] }, { merge: true });
  } catch (error) {
    console.error("Firestore failed to clear favorites:", error);
  }
  return [];
}

/**
 * Resets all progress and journal notes in local storage and syncs to Firestore.
 */
export async function dbResetProgress() {
  localStorage.setItem('gita_read_progress', JSON.stringify([]));
  localStorage.setItem('gita_notes', JSON.stringify({}));
  const uid = await getUid();
  if (!isFirebaseEnabled || !uid) return;

  try {
    const docRef = doc(db, 'progress', uid);
    await setDoc(docRef, { read: [], notes: {} }, { merge: true });
  } catch (error) {
    console.error("Firestore failed to reset progress:", error);
  }
}

