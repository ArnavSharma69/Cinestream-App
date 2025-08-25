import netflixLogo from '../assets/Netflix_Logo_RGB.png';
import { Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 px-[60px] py-[20px] flex justify-between items-center z-10">
      <img src={netflixLogo} alt="Netflix Logo" className="h-[75px]" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black bg-opacity-60 border border-gray-400 text-white text-sm px-3 py-1 rounded-md">
          <Languages size={16} strokeWidth={1.5} />
          <select className="bg-transparent text-white text-sm focus:outline-none">
            <option className="text-black">English</option>
            <option className="text-black">हिन्दी</option>
          </select>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="bg-[#e50914] hover:bg-[#f40612] py-[8px] px-[20px] font-semibold text-white cursor-pointer text-sm transition-colors duration-300 ease-in-out rounded-md"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;

