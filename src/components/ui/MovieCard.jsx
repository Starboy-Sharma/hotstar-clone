// @ts-nocheck
import PropTypes from 'prop-types'

import '../../styles/movieCard.css';

function MovieCard({movie}) {

  const imageBaseUrl = 'http://image.tmdb.org/t/p/w500'

  return (
    <article className="movie-card">
        <img src={`${imageBaseUrl}${movie.poster_path}`} alt="" />
    </article>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard