import { useEffect, useState } from 'react';
import { fetchMovies, endpoints } from '../utils/tmdb';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies(endpoints.trending);
      if (data && data.length > 0) {
        setMovies(data);
        setIndex(0);
      }
    };
    loadMovies();
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const movie = movies[index];

  if (!movie || !movie.backdrop_path) {
    return (
      <div className="h-[60vh] bg-black text-white flex items-center justify-center">
        Loading Banner...
      </div>
    );
  }

  return (
    <header
      className="relative h-[60vh] bg-cover bg-center text-white transition-all duration-700"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full cursor-pointer"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full cursor-pointer"
      >
        <ChevronRight size={28} />
      </button>

      {/* Text Content */}
      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
        <h1 className="text-4xl font-bold mb-2">{movie.title || movie.name}</h1>
        <p className="max-w-xl line-clamp-3 text-sm">{movie.overview}</p>
        <div className="mt-4">
          <button className="bg-white text-black px-4 py-2 mr-2 rounded">Play</button>
          <button className="bg-gray-700 px-4 py-2 rounded">More Info</button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
