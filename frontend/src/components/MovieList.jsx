import React, { useState, useEffect } from "react";
import './MovieList.css';

const MovieList = ({ title, movies, searchTerm }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [error, setError] = useState(null);
  const [showStickyPopup, setShowStickyPopup] = useState(null);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  useEffect(() => {
    // This effect can be used for logging or other side effects related to movies.
  }, [movies]);

  const handlePlayClick = async (movie) => {
    try {
      if (selectedMovie === movie.id) {
        setSelectedMovie(null);
        setVideoKey(null);
      } else {
        setSelectedMovie(movie.id);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer YOUR_API_KEY' // Replace with your actual API key
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const video = data.results.find((vid) => vid.site === "YouTube" && vid.type === "Trailer");
        if (video) {
          setVideoKey(video.key);
        } else {
          setError("No video available for this movie.");
        }
      }
    } catch (err) {
      setError("An error occurred while trying to fetch the video.");
    }
  };

  const handleDoubleClick = (movie) => {
    setShowStickyPopup(movie);
  };

  const closeStickyPopup = () => {
    setShowStickyPopup(null);
  };

  const closeVideoPopup = () => {
    setSelectedMovie(null);
    setVideoKey(null);
  };

  const toggleExpandMovie = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  return (
    <div className="movie-container">
      <h2 className="text-2xl font-bold text-white mb-4 mt-20">{title}</h2>
      <div className="scrollable">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} ⭐</p>
                <p className="movie-overview">
                  {expandedMovieId === movie.id
                    ? movie.overview
                    : `${movie.overview.split(" ").slice(0, 10).join(" ")}...`}
                </p>
                <button className="show-more" onClick={() => toggleExpandMovie(movie.id)}>
                  {expandedMovieId === movie.id ? "Show Less" : "Show More"}
                </button>
                <button
                  className="play-button mt-4"
                  onClick={() => handlePlayClick(movie)}
                >
                  Play Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-white">No results found for "{searchTerm}"</p>
        )}
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      
      {/* Video Popup */}
      {selectedMovie && videoKey && (
        <div className="video-popup">
          <div className="video-content">
            <iframe
              title={selectedMovie.title}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button className="close-button" style={{ marginTop: "-60px" }} onClick={closeVideoPopup}>X</button>
          </div>
        </div>
      )}
      
      {/* Sticky Popup */}
      {showStickyPopup && (
        <div className="sticky-popup">
          <div className="popup-content">
            <h3 className="text-lg font-bold">{showStickyPopup.title}</h3>
            <p>{showStickyPopup.overview}</p>
            <p>Rating: {showStickyPopup.vote_average ? showStickyPopup.vote_average.toFixed(1) : "N/A"} ⭐</p>
            <button onClick={closeStickyPopup} className="close-button">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
