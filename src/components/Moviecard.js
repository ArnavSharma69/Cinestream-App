function MovieCard({ movie, onClick }) {
  return (
    <div className="min-w-[150px] cursor-pointer" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}: 'fallback.jpg'`}
        alt={movie.title || movie.name}
        className="rounded-md hover:scale-105 transition-transform"
      />
    </div>
  );
}

export default MovieCard;
