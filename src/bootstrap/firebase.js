import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'

const firebase = initializeApp({
  apiKey: 'AIzaSyAVXY9S7rwzxmDUZvMJd5EF9erYlIU24kA',
  authDomain: 'karaoke-f9bf1.firebaseapp.com',
  databaseURL: 'https://karaoke-f9bf1-default-rtdb.firebaseio.com',
  projectId: 'karaoke-f9bf1',
  storageBucket: 'karaoke-f9bf1.appspot.com',
  messagingSenderId: '595205451967',
  appId: '1:595205451967:web:47e4a211cc2249f015d60a',
  measurementId: 'G-XJY6EQYRRJ',
})

// Use ocalStorage to set user auth persistence
setPersistence(getAuth(firebase), browserLocalPersistence)

export default firebase
