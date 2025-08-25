const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
  }
};

export const endpoints = {
  trending: `${BASE_URL}/trending/all/week`,
  topRated: `${BASE_URL}/movie/top_rated`,
  originals: `${BASE_URL}/discover/tv?with_networks=213`,
};

export async function fetchMovies(url) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.results) {
      console.error('TMDb returned no results:', data);
      return [];
    }

    return data.results;
  } catch (error) {
    console.error('❌ Failed to fetch movies:', error.message || error);
    return [];
  }
}

export async function fetchTrailer(movie) {
  const type = movie.media_type === 'tv' ? 'tv' : 'movie';
  const url = `${BASE_URL}/${type}/${movie.id}/videos?language=en-US`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const trailer = data.results.find(
      (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error('❌ Failed to fetch trailer:', error.message || error);
    return null;
  }
}
