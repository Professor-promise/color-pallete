import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { logout, signin, signup, useAuth } from '../../firebaseConfig';

const Login = () => {
  const currentUser = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signin(email, password);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <form
      className={
        currentUser
          ? 'flex items-center justify-center'
          : 'w-full max-w-[22rem] max-h-sm bg-white flex flex-col p-3 gap-8 rounded-md'
      }
    >
      {!currentUser && (
        <>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              value={email}
              onChange={onChange}
              className='border-b outline-none'
            />
          </div>
          <div className='flex flex-col gap-1 relative'>
            <label htmlFor='password'>Password:</label>
            <input
              type={show ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={onChange}
              className='border-b outline-none'
            />
            <span
              className='cursor-pointer absolute top-7 right-1'
              onClick={() => setShow((prevState) => !prevState)}
            >
              {show ? (
                <EyeOffIcon className='h-4' />
              ) : (
                <EyeIcon className='h-4' />
              )}
            </span>
          </div>
        </>
      )}
      <div className='flex gap-3 items-center'>
        {!currentUser && (
          <div className='flex gap-3 items-center'>
            <button
              type='submit'
              onClick={handleLogin}
              className='bg-gray-400 px-3 py-1 rounded-md text-white font-bold hover:bg-black'
              disabled={loading}
            >
              Login
            </button>
            <button
              type='submit'
              onClick={handleSignUp}
              className='bg-gray-400 px-3 py-1 rounded-md text-white font-bold hover:bg-black'
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        )}
        <button
          type='button'
          onClick={handleLogout}
          className='bg-gray-400 px-3 py-1 rounded-md text-white font-bold hover:bg-black'
          disabled={loading}
        >
          Logout
        </button>
      </div>
    </form>
  );
};

export default Login;
