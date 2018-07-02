import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
    ],
  },
};

const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks';
const NOTIFICATION_KEY = 'FlashCards:notifications';

export function getDecks() {
  return AsyncStorage
    .getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      if (result === null) {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialDecks));
        return initialDecks;
      }
      return JSON.parse(result);
    });
}

export function getDeck(title) {
  return getDecks().then(decks => decks[title]);
}

export function saveDeckTitle(title) {
  const deck = {
    title,
    questions: [],
  };

  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: deck,
  }));
}

export function addCardToDeck(title, card) {
  return getDeck(title).then((deck) => {
    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [title]: {
        title,
        questions: [...deck.questions, { question: card.question, answer: card.answer }],
      },
    }));
  });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Review your quiz!',
    body: "👋 don't forget to review your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
