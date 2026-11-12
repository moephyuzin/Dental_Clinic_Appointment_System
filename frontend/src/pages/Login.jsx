import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} for Booking Appointment.</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Name:</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email:</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password Field with Eye Toggle */}
        <div className='w-full relative'>
          <p>Password:</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1 pr-10'
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-9 cursor-pointer transition-colors duration-200'
            style={{ color: showPassword ? '#003359' : '#888' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#003359')}
            onMouseLeave={(e) => (e.currentTarget.style.color = showPassword ? '#003359' : '#888')}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </span>
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary pl-2 underline cursor-pointer'>
              Login Here!
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span onClick={() => setState('Sign Up')} className='text-primary pl-2 underline cursor-pointer'>
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
