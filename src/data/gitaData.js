// Premium Bhagavad Gita Dataset with 700+ Verses
// Statically imported from chapter files.

import ch1 from './chapters/ch1.js';
import ch2 from './chapters/ch2.js';
import ch3 from './chapters/ch3.js';
import ch4 from './chapters/ch4.js';
import ch5 from './chapters/ch5.js';
import ch6 from './chapters/ch6.js';
import ch7 from './chapters/ch7.js';
import ch8 from './chapters/ch8.js';
import ch9 from './chapters/ch9.js';
import ch10 from './chapters/ch10.js';
import ch11 from './chapters/ch11.js';
import ch12 from './chapters/ch12.js';
import ch13 from './chapters/ch13.js';
import ch14 from './chapters/ch14.js';
import ch15 from './chapters/ch15.js';
import ch16 from './chapters/ch16.js';
import ch17 from './chapters/ch17.js';
import ch18 from './chapters/ch18.js';

const CHAPTER_METADATA = [
  {
    chapter: 1,
    title: "Arjuna Viṣāda Yoga",
    translation: "Arjuna's Dilemma",
    description: "Arjuna observes the armies arrayed for battle on the holy field of Kurukshetra. Seeing his relatives, teachers, and friends ready to fight and die, he is overcome with grief and pity. He drops his weapons and decides not to fight.",
    verseCount: 47
  },
  {
    chapter: 2,
    title: "Sāṅkhya Yoga",
    translation: "Transcendental Knowledge",
    description: "Krishna begins His teachings. He explains the fundamental distinction between the temporary material body and the eternal spiritual soul. He introduces the path of self-realization and the concepts of duty and equanimity.",
    verseCount: 72
  },
  {
    chapter: 3,
    title: "Karma Yoga",
    translation: "Path of Selfless Service",
    description: "Everyone must engage in some sort of activity in this material world. Krishna explains how actions performed as an offering to God, without attachment to the results, purify the soul and lead to liberation.",
    verseCount: 43
  },
  {
    chapter: 4,
    title: "Jñāna-Karma-Sannyāsa Yoga",
    translation: "Path of Knowledge & Action",
    description: "Krishna reveals the eternal nature of His teachings and His own divine descents to protect dharma. He explains that true action is action in knowledge—understanding the spiritual nature of the soul and its relationship with the Supreme.",
    verseCount: 42
  },
  {
    chapter: 5,
    title: "Karma-Sannyāsa Yoga",
    translation: "Path of Renunciation",
    description: "Arjuna asks whether it is better to renounce action entirely or to act in devotion. Krishna answers that acting in devotion (Karma Yoga) with a detached mind is superior and easier, leading one to true peace.",
    verseCount: 29
  },
  {
    chapter: 6,
    title: "Dhyāna Yoga",
    translation: "Path of Meditation",
    description: "Krishna explains the practice of meditation (Dhyana Yoga)—how to sit, focus the mind, and control the senses. He describes the mind as both a friend and an enemy, and emphasizes that consistent practice is key to conquering it.",
    verseCount: 47
  },
  {
    chapter: 7,
    title: "Jñāna-Vijñāna Yoga",
    translation: "Knowledge & Realization",
    description: "Krishna describes His absolute and all-pervading nature. He categorizes both the material energies and the spiritual souls as emanating from Him, and explains why some surrender to Him while others remain deluded.",
    verseCount: 30
  },
  {
    chapter: 8,
    title: "Akṣara-Brahma Yoga",
    translation: "Imperishable Brahman",
    description: "Krishna explains what happens at the time of death. The consciousness one has at the moment of passing determines one's next destination. Therefore, He advises remembering Him at all times while performing duties.",
    verseCount: 28
  },
  {
    chapter: 9,
    title: "Rāja-Vidyā Rāja-Guhya Yoga",
    translation: "Sovereign Science & Secret",
    description: "Krishna reveals the most confidential knowledge of His divine nature and the universe. He explains that devotional service (Bhakti) is the easiest and most direct path to Him, open to anyone regardless of birth or past mistakes.",
    verseCount: 34
  },
  {
    chapter: 10,
    title: "Vibhūti Yoga",
    translation: "Divine Glories",
    description: "To increase Arjuna's devotion, Krishna describes His opulences and manifestations in the world. He explains that everything beautiful, glorious, and powerful in creation springs from just a spark of His splendor.",
    verseCount: 42
  },
  {
    chapter: 11,
    title: "Viśvarūpa-Darśana Yoga",
    translation: "Vision of Universal Form",
    description: "Arjuna requests to see Krishna's Universal Form. Krishna grants him divine vision, revealing a magnificent, terrifying, and infinite cosmic form that encompasses all of time, space, and existence.",
    verseCount: 55
  },
  {
    chapter: 12,
    title: "Bhakti Yoga",
    translation: "Yoga of Devotion",
    description: "Krishna confirms that the path of personal devotion (Bhakti) is the highest and most direct route to spiritual perfection. He details the qualities of a pure devotee who is very dear to Him.",
    verseCount: 20
  },
  {
    chapter: 13,
    title: "Kṣetra-Kṣetrajña Vibhāga Yoga",
    translation: "Field and Knower",
    description: "Krishna explains the distinction between the physical body (the field of activities) and the soul (the knower of the field). He also describes the Supersoul, who dwells within every heart as the supreme witness.",
    verseCount: 35
  },
  {
    chapter: 14,
    title: "Guṇatraya-Vibhāga Yoga",
    translation: "Three Qualities",
    description: "Krishna analyzes the three modes of material nature: goodness (sattva), passion (rajas), and ignorance (tamas). These modes bind the soul to the physical world and dictate our behavior. Liberation means transcending all three.",
    verseCount: 27
  },
  {
    chapter: 15,
    title: "Puruṣottama Yoga",
    translation: "Supreme Person",
    description: "Using the analogy of an inverted banyan tree, Krishna describes the material world. He explains how to cut down this tree of attachment with the weapon of detachment to reach His supreme abode.",
    verseCount: 20
  },
  {
    chapter: 16,
    title: "Daivāsura-Sampad-Vibhāga Yoga",
    translation: "Divine and Demoniac",
    description: "Krishna outlines the divine qualities that lead to liberation (such as fearlessness, purity, and truthfulness) and the demoniac qualities that lead to bondage (such as pride, anger, and lust).",
    verseCount: 24
  },
  {
    chapter: 17,
    title: "Śraddhātraya-Vibhāga Yoga",
    translation: "Three Types of Faith",
    description: "Arjuna asks about those who worship with faith but do not follow scriptural rules. Krishna explains that faith, food, charity, and austerity are also divided into the three modes of nature (goodness, passion, and ignorance).",
    verseCount: 28
  },
  {
    chapter: 18,
    title: "Mokṣa-Sannyāsa Yoga",
    translation: "Liberation by Renunciation",
    description: "In this final summary chapter, Krishna concludes that true renunciation means giving up the fruits of action, not action itself. He reiterates the supremacy of devotional surrender to Him over all other paths.",
    verseCount: 78
  }
];

const chaptersData = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15, ch16, ch17, ch18];

const gitaData = CHAPTER_METADATA.map((chMeta, idx) => {
  return {
    chapter: chMeta.chapter,
    title: chMeta.title,
    translation: chMeta.translation,
    description: chMeta.description,
    verses: chaptersData[idx]
  };
});

export default gitaData;
