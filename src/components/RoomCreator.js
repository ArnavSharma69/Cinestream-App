// src/components/RoomCreator.js
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

function RoomCreator() {
  const navigate = useNavigate();

  const createRoom = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('❌ Failed to get Supabase user:', userError?.message);
      return;
    }

    const roomId = uuidv4();

    const { error } = await supabase.from('rooms').insert({
      id: roomId,
      host: user.email,
      // ✅ Embeddable YouTube video format
      video_url: 'https://www.youtube.com/embed/jNQXAC9IVRw',

    });

    if (error) {
      console.error('❌ Failed to insert room:', error.message);
      return;
    }

    console.log('✅ Room created. Navigating to:', roomId);
    navigate(`/room/${roomId}`);
  };

  return (
    <button
      onClick={createRoom}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
    >
      Create Watch Room
    </button>
  );
}

export default RoomCreator;
