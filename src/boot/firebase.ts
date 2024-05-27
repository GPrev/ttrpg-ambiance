// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAS_wYc1tMC_nezq2YFTgSvH0-J9lRLPgc',
  authDomain: 'ttrpg-ambiance.firebaseapp.com',
  projectId: 'ttrpg-ambiance',
  storageBucket: 'ttrpg-ambiance.appspot.com',
  messagingSenderId: '637483028236',
  appId: '1:637483028236:web:00b56f4e975913bee6c329'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
