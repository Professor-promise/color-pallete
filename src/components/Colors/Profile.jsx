import React, { useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import { useAuth, upload } from '../../firebaseConfig';

const Profile = () => {
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI='
  );

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImage = () => {
    try {
      upload(image, currentUser, setLoading);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className='flex items-center flex-col p-4 justify-center gap-4'>
      <div className='flex items-end'>
        <span className='h-20 w-20 flex items-center justify-center border border-black rounded-full'>
          <img src={photoURL} alt='' className='rounded-full w-full h-full' />
        </span>
        <label htmlFor='upload'>
          <input
            type='file'
            id='upload'
            onChange={onChange}
            className='hidden'
          />
          <PencilIcon className='h-5 cursor-pointer ml-[-.9rem] hover:text-gray-500' />
        </label>
      </div>
      <button
        type='button'
        className='bg-blue-500 text-white font-bold hover:bg-blue-700 px-2 text-sm py-1 rounded-md'
        onClick={handleImage}
        disabled={loading || !image}
      >
        Upload
      </button>
    </div>
  );
};

export default Profile;
