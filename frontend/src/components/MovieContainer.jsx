import React from 'react';
import MovieList from './MovieList';
import { API_URLS } from '../assets/constant';
import { useSearch } from '../context/SearchContext';

const MovieContainer = () => {
  const { searchTerm } = useSearch();
  
  // Use a state variable to store movie data
  const [allMovies, setAllMovies] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Fetch movies from all categories
  const fetchAllMovies = async () => {
    const urls = [
      API_URLS.NOW_PLAYING,
      API_URLS.POPULAR,
      API_URLS.TOP_RATED,
      API_URLS.UPCOMING,
    ];

    const results = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );

    setAllMovies(results.map(data => data.results));
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAllMovies();
  }, []);
  console.log(allMovies);

  if (loading) return <p className="text-center text-xl text-white">Loading...</p>;

  // Filter movies based on the searchTerm if it exists
  const filteredMovies = allMovies.map(category =>
    category.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const hasResults = filteredMovies.some(category => category.length > 0);

  return (
    <div className="mt-20">
      {hasResults ? (
        <>
          <MovieList title="Now Playing" movies={filteredMovies[0]} searchTerm={searchTerm} />
          <MovieList title="Popular" movies={filteredMovies[1]} searchTerm={searchTerm} />
          <MovieList title="Top Rated" movies={filteredMovies[2]} searchTerm={searchTerm} />
          <MovieList title="Upcoming" movies={filteredMovies[3]} searchTerm={searchTerm} />
        </>
      ) : (
        <p className="text-center text-xl text-white">
          
        </p>
      )}
    </div>
  );
};

export default MovieContainer;
