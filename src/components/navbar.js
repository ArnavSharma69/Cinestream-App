// src/components/Navbar.js
import { useEffect, useState } from 'react';
import { Search, ChevronDown, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import netflixLogo from '../assets/Netflix_Logo_RGB.png';
import { supabase } from '../utils/supabaseClient';
import AccountModal from './AccountModal';

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  // Fetch user avatar from Supabase metadata
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.user_metadata?.avatar) {
        setUserAvatar(data.user.user_metadata.avatar);
      }
    };
    fetchAvatar();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/');
    } else {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-black bg-opacity-80 backdrop-blur-sm">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-8">
          <img src={netflixLogo} alt="Netflix" className="h-8 md:h-10" />
          <ul className="hidden md:flex gap-6 text-sm text-white font-medium">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
            <li onClick={() => navigate('/poster-maker')} className="cursor-pointer hover:text-gray-300">
  Poster Maker
</li>

          </ul>
        </div>

        {/* Right: Search, Language, Avatar */}
        <div className="flex items-center gap-4 text-white">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Titles, people, genres"
              className="bg-[#333] text-sm px-3 py-1 rounded-full outline-none placeholder-gray-400"
            />
            <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
          </div>

          <Languages className="cursor-pointer hidden sm:block" />

          <div className="relative">
            <img
              src={userAvatar || 'https://via.placeholder.com/40'}
              alt="Avatar"
              className="h-8 w-8 rounded cursor-pointer"
              onClick={() => setShowDropdown(prev => !prev)}
            />
            <ChevronDown
              className={`ml-1 inline-block transition-transform duration-300 cursor-pointer ${
                showDropdown ? 'rotate-180' : ''
              }`}
              onClick={() => setShowDropdown(prev => !prev)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-black border border-gray-700 rounded text-sm shadow-lg">
                <button
                  onClick={() => {
                    setShowAccountModal(true);
                    setShowDropdown(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-700 text-left"
                >
                  Account
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 hover:bg-gray-700 text-left"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Modal placed outside header for proper overlay */}
      {showAccountModal && (
        <AccountModal onClose={() => setShowAccountModal(false)} />
      )}
    </>
  );
}

export default Navbar;
