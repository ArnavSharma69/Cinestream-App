import { useState } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/Movierow';
import { endpoints, fetchMovies } from '../utils/tmdb';
import Modal from '../components/Modal';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import RoomCreator from '../components/RoomCreator';

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null); //  Modal state

  return (
    <div className="bg-black min-h-screen">
        < Navbar />
      {/* Banner */}
      <Banner onSelectMovie={setSelectedMovie} />

      {/*Room creator*/}
      <div className="text-center my-6">
        <RoomCreator />
      </div>

      {/* Movie Rows */}
      <MovieRow
        title="Trending Now"
        fetchUrl={() => fetchMovies(endpoints.trending)}
        onMovieClick={(movie) => setSelectedMovie(movie)}
      />
      <MovieRow
        title="Top Rated"
        fetchUrl={() => fetchMovies(endpoints.topRated)}
        onMovieClick={(movie) => setSelectedMovie(movie)}
      />
      <MovieRow
        title="Netflix Originals"
        fetchUrl={() => fetchMovies(endpoints.originals)}
        onMovieClick={(movie) => setSelectedMovie(movie)}
      />


      {/* Modal */}
      <Modal
        show={!!selectedMovie}
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      <Footer />
    </div>
  );
}

export default Home;
