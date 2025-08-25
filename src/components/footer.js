// components/Footer.js
import { Languages,Facebook,Instagram,Twitter,Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-black bg-opacity-80 text-gray-400 text-sm py-10 px-6 sm:px-16 mt-8">
      <div className="max-w-6xl mx-auto space-y-6">
         <div className="flex gap-4 text-white text-lg ">
          <a href="https://www.facebook.com/netflix" target="_blank" rel="noopener noreferrer">
            <Facebook className="hover:text-gray-400 cursor-pointer m-2" />
          </a>
          <a href="https://www.instagram.com/netflix_in/?hl=en" target="_blank" rel="noopener noreferrer">
            <Instagram className="hover:text-gray-400 cursor-pointer m-2" />
          </a>
          <a href="https://x.com/NetflixIndia" target="_blank" rel="noopener noreferrer">
            <Twitter className="hover:text-gray-400 cursor-pointer m-2" />
          </a>
          <a href="https://www.youtube.com/netflix" target="_blank" rel="noopener noreferrer">
            <Youtube className="hover:text-gray-400 cursor-pointer m-2" />
          </a>
        </div>

    
        <p>Questions? Call <span className="underline">000-800-919-1694</span></p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 underline">
          <a href="#">FAQ</a>
          <a href="#">Help Centre</a>
          <a href="#">Account</a>
          <a href="#">Media Centre</a>
          <a href="#">Investor Relations</a>
          <a href="#">Jobs</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Corporate Information</a>
          <a href="#">Contact Us</a>
          <a href="#">Speed Test</a>
          <a href="#">Legal Notices</a>
          <a href="#">Only on Netflix</a>
        </div>

        <div className="flex items-center gap-2 bg-black bg-opacity-60 border border-gray-600 text-white text-sm px-3 py-1 rounded-md w-fit">
          <Languages size={16} strokeWidth={1.5} />
          <select className="bg-transparent text-white text-sm focus:outline-none">
            <option className="text-black">English</option>
            <option className="text-black">हिन्दी</option>
          </select>
        </div>

        <p>Netflix India</p>
      </div>
    </footer>
  );
}

export default Footer;
