// @ts-nocheck
import { useState } from 'react';
import CardSkeleton from '../components/ui/CardSkeleton';
import MovieCard from '../components/ui/MovieCard';
import { useFetch } from '../hooks/useFetch';

function LatestMoviesPage() {

  const [page, setPage] = useState(1);
  const totalPages = 5;

  const { data, loading, error } = useFetch({
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options: { method: 'GET' },
  });

  const handlePagination = (type) => {
    if (type === 'next') setPage(page + 1);
    if (type === 'previous') setPage(page - 1);
  };

  if (error) return <p>{error}</p>;

  return (
    <main className="wrapper">
      <h1> Latest Movies </h1>

      <div className='pagination'>
        <button onClick={() => handlePagination('previous')} disabled={page === 1}> Previous Page </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePagination('next')} disabled={page === totalPages}> Next Page </button>
      </div>


    {loading && (
        <>
            <CardSkeleton isVisible={loading} />
            <CardSkeleton isVisible={loading} />
            <CardSkeleton isVisible={loading} />
        </>
    )}

    {!loading && data && (
        <div className='movie-card-list'>
            {data.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
    )}
      
    </main>
  );
}

export default LatestMoviesPage;
