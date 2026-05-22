import { app, isFirebaseEnabled } from './firebase.js';

let messaging = null;

// Initialize Messaging safely
const initMessaging = async () => {
  if (typeof window === 'undefined') return;
  try {
    const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    if (isFirebaseEnabled && isSupported) {
      const { getMessaging } = await import('firebase/messaging');
      messaging = getMessaging(app);
      console.log("Firebase Cloud Messaging initialized successfully.");
    } else {
      console.warn("Push Notifications are not supported in this browser environment.");
    }
  } catch (error) {
    console.error("Firebase Messaging initialization failed:", error);
  }
};

initMessaging();

/**
 * Request permission for notifications and attempt to fetch FCM token.
 * Handles missing browser support, missing VAPID keys, and denial safely.
 */
export async function requestNotificationPermission() {
  if (typeof window === 'undefined') return null;

  try {
    const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    if (!isSupported) {
      console.warn("Notifications not supported in this browser.");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn("Notification permission denied.");
      return null;
    }

    if (!isFirebaseEnabled || !messaging) {
      console.log("Permission granted locally, but Firebase Messaging is disabled/uninitialized.");
      return 'local-granted';
    }

    const { getToken } = await import('firebase/messaging');
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    if (!vapidKey) {
      console.warn("VAPID key is missing in env. Local notifications permitted, skipping FCM registration.");
      return 'local-granted';
    }

    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: vapidKey,
      serviceWorkerRegistration: registration
    });

    console.log("FCM Token retrieved successfully:", token);
    return token;
  } catch (error) {
    console.error("Failed to register for push notifications:", error);
    return 'local-granted'; // Return local permission fallback
  }
}

/**
 * Direct function to trigger a local reminder notification
 */
export function sendLocalNotification(title, body) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title || "Today’s Gita Wisdom 🌸", {
        body: body || "Tap to read today’s Bhagavad Gita verse.",
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        vibrate: [100, 50, 100]
      });
    });
  }
}
