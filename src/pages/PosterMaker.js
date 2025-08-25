// src/pages/PosterMaker.js
import React, { useRef, useState } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// 🔸 Background options from the web
const backgroundOptions = [
  {
    name: 'Spider-Man',
    url: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
  },
  {
    name: 'IT',
    url: 'https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
  },
  {
    name: 'The Batman',
    url: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
  },
  {
  name: 'Interstellar',
  url: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
},

];

// 😄 Emoji list
const emojiList = ['🎬', '🔥', '🎉', '🍿', '💥', '🌟'];

function PosterImage({ src, x, y }) {
  const [image] = useImage(src);
  return image ? <KonvaImage image={image} x={x} y={y} width={600} height={800} /> : null;
}

function PosterMaker() {
  const stageRef = useRef();

  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0].url);
  const [textColor, setTextColor] = useState('#ffffff');
  const [elements, setElements] = useState([
    { type: 'text', text: 'Your Poster Title', x: 50, y: 50, fill: '#ffffff' },
  ]);

  const updateText = (newText) => {
    const updated = [...elements];
    updated[0].text = newText;
    setElements(updated);
  };

  const updateTextColor = (color) => {
    setTextColor(color);
    const updated = [...elements];
    updated[0].fill = color;
    setElements(updated);
  };

  const downloadPoster = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-xl font-bold mb-6">🎨 Interactive Poster Maker</h1>

      {/* Background Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Choose Background:</label>
        <div className="flex gap-4 flex-wrap">
          {backgroundOptions.map((bg, index) => (
            <img
              key={index}
              src={bg.url}
              alt={bg.name}
              title={bg.name}
              onClick={() => setSelectedBackground(bg.url)}
              className={`w-20 h-28 object-cover rounded cursor-pointer border-2 transition-transform hover:scale-105 ${
                selectedBackground === bg.url ? 'border-red-500' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Editable Text */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Poster Title:</label>
        <input
          type="text"
          value={elements[0].text}
          onChange={(e) => updateText(e.target.value)}
          className="text-black px-3 py-2 rounded w-full max-w-md"
          placeholder="Enter poster title..."
        />
      </div>

      {/* Text Color Picker */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => updateTextColor(e.target.value)}
          className="w-12 h-8 p-0 border-none outline-none"
        />
      </div>

      {/* Emoji Picker */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Add Emoji:</label>
        <div className="flex gap-2 text-2xl">
          {emojiList.map((emoji, i) => (
            <button
              key={i}
              onClick={() =>
                setElements([
                  ...elements,
                  { type: 'text', text: emoji, x: 100 + i * 20, y: 100, fill: textColor },
                ])
              }
              className="hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Poster Canvas */}
      <Stage width={600} height={800} ref={stageRef}>
        <Layer>
          <PosterImage src={selectedBackground} x={0} y={0} />
          {elements.map((el, i) =>
            el.type === 'text' ? (
              <Text
                key={i}
                text={el.text}
                x={el.x}
                y={el.y}
                fontSize={32}
                fill={el.fill}
                draggable
              />
            ) : null
          )}
        </Layer>
      </Stage>

      <button
        onClick={downloadPoster}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Download Poster
      </button>
    </div>
  );
}

export default PosterMaker;
