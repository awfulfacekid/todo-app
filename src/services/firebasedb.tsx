import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'Your api key',
  authDomain: 'auth domain',
  databaseURL: 'db url',
  projectId: 'project id',
  storageBucket: 'storage bucket',
  messagingSenderId: 'messaging sender id',
  appId: 'app id',
  measurementId: 'measurement id',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  startDate: string;
  endDate: string;
};

export default app;
