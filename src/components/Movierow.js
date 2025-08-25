import React, { useEffect,useRef, useState } from 'react';
import MovieCard from './Moviecard';


function MovieRow({ title, fetchUrl, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    async function getData() {
      const results = await fetchUrl();
      if (Array.isArray(results)) {
        setMovies(results);
      } else {
        console.error("Fetched data is not an array:", results);
      }
    }

    getData();
  }, [fetchUrl,title]);


  return (
    <div className="text-white px-6 py-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div 
      className="flex overflow-x-scroll gap-4 scrollbar-hide">
        {movies?.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
