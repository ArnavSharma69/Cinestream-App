import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchTrailer } from '../utils/tmdb'; // make sure path is correct

const Modal = ({ show, onClose, movie }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    if (movie) {
      fetchTrailer(movie).then(setTrailerUrl);
    }
  }, [movie]);

  if (!show || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="relative bg-[#141414] text-white rounded-md w-full max-w-4xl overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{movie.title || movie.name}</h2>
          <p className="text-sm text-gray-300 mb-4">{movie.overview}</p>

          {trailerUrl ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-md"
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-gray-400">Trailer not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
