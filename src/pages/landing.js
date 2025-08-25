// Landing.js
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import netflixBg from '../assets/netflix-bg.jpg';
import '../App.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen text-white"
      style={{
        backgroundImage: `url(${netflixBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      {/* Header */}
      <Header />
     

      {/* Main Content */}
      <main className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 max-w-[800px] mx-auto pt-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Unlimited movies, TV shows and more
        </h1>
        <h2 className="text-xl sm:text-2xl mb-6">
          Starts at ₹149. Cancel anytime.
        </h2>

        <p className="text-sm sm:text-base mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <div className="flex flex-col sm:flex-row w-full max-w-[600px] gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="bg-[#333] bg-opacity-70 text-white flex-1 p-4 text-base outline-none rounded sm:rounded-l-md m-2"
          />
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#e50914] hover:bg-[#f40612] text-white text-lg font-bold px-6 py-4 rounded sm:rounded-r-md transition-colors duration-300 m-2"
          >
            Get Started ❯
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
