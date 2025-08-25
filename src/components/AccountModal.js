// src/components/AccountModal.js
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function AccountModal({ onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Failed to fetch user:', error.message);
      } else {
        setUser(data?.user);
      }
    };
    fetchUser();
  }, []);

  if (!user) return null;

  const { email, user_metadata } = user;
  const avatar = user_metadata?.avatar || '/default-avatar.jpg';
  const firstName = user_metadata?.first_name || 'First';
  const lastName = user_metadata?.last_name || 'Last';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#141414] text-white p-6 rounded-md w-80 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Account Info</h2>

        <div className="flex flex-col items-center gap-3">
          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-gray-500 cursor-pointer hover:scale-125"
          />
          <div className="text-center">
            <p className="text-sm font-medium">{firstName} {lastName}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountModal;
