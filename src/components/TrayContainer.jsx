// @ts-nocheck
import { Link } from "react-router-dom"
import MovieCard from "./ui/MovieCard"
import PropTypes from 'prop-types'

import '../styles/tray.css';
import { useEffect } from "react";

function TrayContainer({ title, path, movies }) {

  // useEffect(() => {
  //   console.log('API will be called for ', title);
  // }, [title])

  return (
    <div className="tray-container">
      <p className="title">
        <Link to={path}>{title}</Link>
      </p>

        <div className="movie-card-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>

    </div>
  )
}

TrayContainer.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired
}

export default TrayContainer