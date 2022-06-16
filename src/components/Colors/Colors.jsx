import React, { useEffect, useState } from 'react';
import Dot from './Dot';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Colors = () => {
  const [colorData, setColorData] = useState({
    name: '',
    value: '',
  });
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { name, value } = colorData;
  const collectionRef = collection(db, 'colors');

  const onChange = (e) => {
    setColorData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, value, timestamp: serverTimestamp() };
      await addDoc(collectionRef, payload);
    } catch (error) {
      console.log(error);
    }
    setColorData({ name: '', value: '' });
    setLoading(false);
  };

  const handleEdit = async (id) => {
    const name = prompt('Enter color name');
    const value = prompt('Enter color value');

    if (!name || !value) {
      return;
    }
    try {
      const docRef = doc(db, 'colors', id);
      const payload = { name, value, timestamp: serverTimestamp() };
      setDoc(docRef, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, 'colors', id);
    deleteDoc(docRef);
  };

  const handleQueryDelete = async () => {
    const name = prompt('Enter color name');
    const q = query(collectionRef, where('name', '==', name));
    const snapshot = await getDocs(q);
    const results = snapshot.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    results.filter(async (result) => {
      const docRef = doc(db, 'colors', result.id);
      await deleteDoc(docRef);
    });
  };

  useEffect(() => {
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(q, (snapshot) =>
      setColors(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <main className='flex items-center flex-col p-4 justify-center '>
      <div className='w-full max-w-md '>
        <h1 className='text-center text-red-600 text-xl py-3 font-semibold'>
          Colors Pallete
        </h1>
        <form className='flex flex-col gap-3 '>
          <div className='flex items-center gap-4'>
            <div className='flex gap-1 items-center text-xs'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                className='border outline-none rounded-sm text-sm w-28 lg:w-44'
                id='name'
                autoFocus
                value={name}
                onChange={onChange}
              />
            </div>

            <div className='flex gap-1 items-center'>
              <label htmlFor='value' className='text-xs'>
                Value
              </label>
              <input
                type='text'
                className='border outline-none rounded-sm text-sm w-28 lg:w-44'
                id='value'
                value={value}
                onChange={onChange}
              />
            </div>
          </div>
          <button
            className={
              loading || !(name && value)
                ? 'rounded-full w-full outline-none bg-zinc-500 text-zinc-400'
                : 'rounded-full w-full outline-none bg-gray-600 text-white font-medium py hover:bg-black'
            }
            type='submit'
            onClick={handleSubmit}
            disabled={loading || !(name && value)}
          >
            Add
          </button>
          <button
            className='rounded-full bg-gray-600 text-white font-medium py hover:bg-black'
            type='button'
            disabled={loading}
            onClick={handleQueryDelete}
          >
            Query Delete
          </button>
        </form>

        {colors?.map((item) => (
          <ul key={item.id} className='mt-1 grid grid-cols-3 px-4 border-b'>
            <PencilAltIcon
              className='h-5 text-green-700 cursor-pointer hover:text-green-900'
              onClick={() => handleEdit(item.id)}
            />
            <div className='grid grid-cols-2  items-center'>
              <Dot color={item.value} />
              <p className='font-semibold'>{item.name}</p>
            </div>
            <TrashIcon
              className='h-5 justify-self-end text-red-600 cursor-pointer hover:text-red-700'
              onClick={() => handleDelete(item.id)}
            />
          </ul>
        ))}
      </div>
    </main>
  );
};

export default Colors;
