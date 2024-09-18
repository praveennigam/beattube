import React from 'react';
import MovieList from './MovieList';
import { useSearch } from '../context/SearchContext';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWY4MDlhN2U1OWM4MDgxZWIwMTRlYmUwZTg0ZDkwZSIsIm5iZiI6MTcyNjUyODM2NS4xMzQxODYsInN1YiI6IjY2ZThiOTQ2YjI5MTdlYjE4MDBhODljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.za4vA20GHzRP-yL5DR09O17TGP84glTdl9rQcJWWOl0'
  }
};

const API_URLS = {
  NOW_PLAYING: "https://api.themoviedb.org/3/movie/now_playing",
  POPULAR: "https://api.themoviedb.org/3/movie/popular",
  TOP_RATED: "https://api.themoviedb.org/3/movie/top_rated",
  UPCOMING: "https://api.themoviedb.org/3/movie/upcoming",
};

const MovieContainer = () => {
  const { searchTerm } = useSearch();
  
  const [allMovies, setAllMovies] = React.useState([]); // Initialize as empty array
  const [loading, setLoading] = React.useState(true);

  const fetchAllMovies = async () => {
    const urls = [
      API_URLS.NOW_PLAYING,
      API_URLS.POPULAR,
      API_URLS.TOP_RATED,
      API_URLS.UPCOMING,
    ];

    try {
      const results = await Promise.all(
        urls.map(url => fetch(url, API_OPTIONS).then(res => res.json()))
      );
      setAllMovies(results.map(data => data.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setAllMovies([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllMovies();
  }, []);
  
  console.log(allMovies);

  if (loading) return <p className="text-center text-xl text-white">Loading...</p>;

  // Filter movies based on the searchTerm if it exists
  const filteredMovies = allMovies.map(category =>
    category ? category.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []
  );

  const hasResults = filteredMovies.some(category => category.length > 0);

  return (
    <div className="">
      {hasResults ? (
        <>
          <div className=''>
            <MovieList title="Now Playing" movies={filteredMovies[0]} searchTerm={searchTerm} />
            <MovieList title="Popular" movies={filteredMovies[1]} searchTerm={searchTerm} />
            <MovieList title="Top Rated" movies={filteredMovies[2]} searchTerm={searchTerm} />
            <MovieList title="Upcoming" movies={filteredMovies[3]} searchTerm={searchTerm} />
          </div>
        </>
      ) : (
        <p className="text-center text-xl text-white">
          No results found for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default MovieContainer;
