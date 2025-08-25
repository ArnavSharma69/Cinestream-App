import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import netflixLogo from '../assets/Netflix_Logo_RGB.png';
import netflixBg from '../assets/netflix-bg.jpg';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { supabase } from '../utils/supabaseClient';

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email or phone number is required')
      .test(
        'email-or-phone',
        'Enter a valid email or phone number',
        value =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{10}$/.test(value)
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoginError('');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setLoginError('Invalid login credentials. Please try again.');
      } else {
        console.log('Login successful:', data);
        navigate('/home');
      }
    },
  });

  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: `url(${netflixBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className="absolute top-0 left-0 right-0 px-[60px] py-[20px] flex justify-between items-center z-10">
        <img src={netflixLogo} alt="Netflix Logo" className="h-[75px]" />
      </header>

      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-75 px-12 py-14 rounded-md w-[90%] max-w-[400px] text-white">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="email"
              placeholder="Email or phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-[#333] p-3 rounded text-sm outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-[#333] p-3 rounded text-sm outline-none"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs">{formik.errors.password}</div>
            )}

            {loginError && (
              <div className="text-red-500 text-xs">{loginError}</div>
            )}

            <button
              type="submit"
              className="bg-[#e50914] hover:bg-[#f6121d] transition-colors p-3 rounded font-semibold"
            >
              Sign In
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
              <label className="flex items-center gap-1">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Need help?
              </a>
            </div>
          </form>

          <p className="text-sm text-gray-400 mt-6">
            New to Netflix?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-white hover:underline"
            >
              Sign up now
            </button>
          </p>

          <p className="text-xs text-gray-500 mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
