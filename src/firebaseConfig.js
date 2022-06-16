import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvl1oZjkoJtaJCXGCvS7oGrLYbB5yN0g4',
  authDomain: 'colors-pallete.firebaseapp.com',
  projectId: 'colors-pallete',
  storageBucket: 'colors-pallete.appspot.com',
  messagingSenderId: '1054806212028',
  appId: '1:1054806212028:web:89c8f849dae48742a93fb9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
};

const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

const upload = async (file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + '.png');
  setLoading(true);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
  alert('uploaded');
};

// const post = async (db, file) => {

// };

export { signup, useAuth, signin, logout, upload, db };
