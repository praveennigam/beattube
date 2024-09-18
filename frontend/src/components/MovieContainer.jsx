import React from 'react';
import MovieList from './MovieList';
import { API_URLS } from '../assets/constant';
import { useSearch } from '../context/SearchContext';

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
        urls.map(url => fetch(url).then(res => res.json()))
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
