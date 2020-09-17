import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateMovie from '../components/UpdateMovie'

import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    history.push(`/update-movie/${movie.id}`);
  };


  const deleteMov = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id.data}`)
      .then((res) => {
        history.push("/");
        setMovie(res.data);
        console.log(res.data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
  
        Save
      </div>
            
      <button onClick={updateMovie}>
        Update Movie
      </button>

      <button onClick={deleteMov}>
        Delete Movie
      </button>
    </div>
  );
}

export default Movie;
