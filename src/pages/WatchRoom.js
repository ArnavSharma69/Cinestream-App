import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import ChatBox from '../components/ChatBox';
import { supabase } from '../utils/supabaseClient';

// ✅ Helper to convert watch?v= to embed/
const getEmbedUrl = (url) => {
  if (url.includes('watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  return url;
};

function WatchRoom() {
  const { roomId } = useParams();
  const playerRef = useRef();
  const [roomData, setRoomData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserEmail(user.email);

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (error) {
        console.error('❌ Error loading room:', error);
        return;
      }

      setRoomData(data);
      setIsHost(user.email === data.host);
    }

    init();
  }, [roomId]);

  const handlePlayPause = async (playing) => {
    if (!isHost) return;
    const currentTime = playerRef.current.getCurrentTime();
    await supabase.from('rooms').update({
      is_playing: playing,
      timestamp: currentTime
    }).eq('id', roomId);
  };

  if (!roomData) {
    return (
      <div className="text-white bg-black flex items-center justify-center h-screen">
        <h1>Loading Room...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-xl font-bold mb-4">CineCircle: Group Watch</h1>

      <ReactPlayer
        ref={playerRef}
        url={getEmbedUrl(roomData.video_url)}  // ✅ Embedded URL
        playing={roomData.is_playing}
        controls
        width="100%"
        height="480px"
        onPlay={() => handlePlayPause(true)}
        onPause={() => handlePlayPause(false)}
      />

      <ChatBox roomId={roomId} user={userEmail} />

      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert('Room link copied!');
        }}
        className="text-xs text-blue-400 underline mt-4"
      >
        Copy Invite Link
      </button>
    </div>
  );
}

export default WatchRoom;
