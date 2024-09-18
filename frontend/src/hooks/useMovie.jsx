import React from 'react'
import axios from  "axios";
const useMovie = async(movie_id) => {

  try {
    const res =await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos`)
    console.log(res);
  } catch (error) {
    
  }
}

export default useMovie
