// components/AvatarSelector.js
import { useState } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

const avatarOptions = [avatar1, avatar2, avatar3];

function AvatarSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (avatar) => {
    setSelected(avatar);
    onSelect(avatar);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {avatarOptions.map((avatar, idx) => (
        <img
          key={idx}
          src={avatar}
          alt={`Avatar ${idx + 1}`}
          onClick={() => handleSelect(avatar)}
          className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
            selected === avatar ? 'border-red-500' : 'border-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export default AvatarSelector;
