// src/pages/signup.js
import netflixLogo from '../assets/Netflix_Logo_RGB.png';
import netflixBg from '../assets/netflix-bg.jpg';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';

// Import avatar images
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

const avatarOptions = [avatar1, avatar2, avatar3];

function SignUp() {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatar1); // Default avatar

  const signupSchema = yup.object().shape({
    firstName: yup.string().required('*Fill the First Name'),
    lastName: yup.string().required('*Fill the Last Name'),
    email: yup
      .string()
      .required('Email or phone number is required')
      .test(
        'email-or-phone',
        'Enter a valid email or phone number',
        value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{10}$/.test(value)
      ),
    password: yup.string().required('Password is required').min(6),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setSignupError('');

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            avatar: selectedAvatar,
          },
        },
      });

      if (error) {
        setSignupError(error.message);
      } else {
        console.log('Signup successful:', data);
        navigate('/home');
      }
    },
  });

  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url(${netflixBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <img src={netflixLogo} alt="Netflix Logo" className="absolute top-4 left-6 w-32 z-10" />

      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-75 px-12 py-14 rounded-md w-[90%] max-w-[400px] text-white">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="bg-[#333] p-3 rounded text-sm"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="bg-[#333] p-3 rounded text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-[#333] p-3 rounded text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-[#333] p-3 rounded text-sm"
            />

            <div className="text-white text-sm">Choose Avatar:</div>
            <div className="flex gap-3">
              {avatarOptions.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt={`avatar-${idx}`}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                    selectedAvatar === avatar ? 'border-red-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>

            {signupError && <div className="text-red-500 text-xs">{signupError}</div>}

            <button type="submit" className="bg-[#e50914] p-3 rounded font-semibold hover:bg-red-600">
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-white hover:underline">
              Sign in now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
