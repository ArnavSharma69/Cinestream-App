import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function ChatBox({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const channel = supabase
      .channel(`chat-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Fetch messages error:', error.message);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const { error } = await supabase.from('messages').insert({
      room_id: roomId,
      sender: user,
      content: input,
    });

    if (error) {
      console.error('❌ Send message error:', error.message);
    } else {
      setInput('');
    }
  };

  return (
    <div className="mt-4 bg-gray-900 p-4 rounded max-w-xl mx-auto">
      <div className="h-64 overflow-y-scroll mb-2 bg-black p-2 rounded">
        {messages.map((msg) => (
          <p key={msg.id}><strong>{msg.sender}</strong>: {msg.content}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded text-black"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="bg-red-600 px-3 py-1 rounded text-white">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
