// @ts-nocheck
import { useEffect, useReducer } from 'react';
import TrayContainer from '../components/TrayContainer';
import Spinner from '../components/ui/Spinner';
import CardSkeleton from '../components/ui/CardSkeleton';
import { useLazyLoad } from '../hooks/useLazyLoad';
import { getLatestMovies, getLatestTvShows } from '../services/movieService';
import { intitalState, movieReducer } from '../reducers/movieReducer';

async function getMoviesAndTvShows(movieHomeState, movieHomeDispatch) {
  const [latestMovies, latestTvShows] = await Promise.all([
    getLatestMovies(),
    getLatestTvShows(),
  ]);

  if (latestMovies.success && latestTvShows.success) {
    const currentDisplayedCategoriesCount =
      movieHomeState.displayedCategoriesCount;

    const firstWatchItem = {
      ...(movieHomeState.watchItems[currentDisplayedCategoriesCount + 1] || {}),
    };
    const secondWatchItem = {
      ...(movieHomeState.watchItems[currentDisplayedCategoriesCount + 2] || {}),
    };

    firstWatchItem.movies = latestMovies.data.results;
    secondWatchItem.movies = latestTvShows.data.results;

    firstWatchItem.display = true;
    secondWatchItem.display = true;

    movieHomeDispatch({
      type: 'SET_CATEGORIES',
      payload: {
        watchItems: {
          [currentDisplayedCategoriesCount + 1]: firstWatchItem,
          [currentDisplayedCategoriesCount + 2]: secondWatchItem,
        },
        loading: false,
        showSpinner: false,
      },
    });
  }
}

function HomePage() {
  const [isScrollBottom] = useLazyLoad();
  const [movieHomeState, movieHomeDispatch] = useReducer(
    movieReducer,
    intitalState
  );

  useEffect(() => {
    if (
      isScrollBottom &&
      !movieHomeState.isAllCategoriesDisplayed &&
      !movieHomeState.loading
    ) {
      async function fetchLatestMoviesAndTvShows() {
        movieHomeDispatch({ type: 'TOGGLE_LOADING', isLoading: true });

        try {
          await getMoviesAndTvShows(movieHomeState, movieHomeDispatch);
        } catch (error) {
          console.log(
            'Error in fetchLatestMoviesAndTvShows of lazy load',
            error
          );
        } finally {
          movieHomeDispatch({ type: 'TOGGLE_LOADING', isLoading: false });
        }
      }

      fetchLatestMoviesAndTvShows();
    }
  }, [isScrollBottom]);

  useEffect(() => {
    let isInitialRender = true;

    async function fetchLatestMoviesAndTvShows() {
      try {
        if (!isInitialRender) {
          return false;
        }
        console.log('Fetching latest movies and tv shows on page load');
        movieHomeDispatch({ type: 'SET_SPINNER', displaySpinner: true });

        await getMoviesAndTvShows(movieHomeState, movieHomeDispatch);
      } catch (error) {
        console.log('Error in fetchLatestMoviesAndTvShows', error);
      } finally {
        movieHomeDispatch({ type: 'SET_SPINNER', displaySpinner: false });
      }
    }

    fetchLatestMoviesAndTvShows();

    return () => {
      isInitialRender = false;
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <main className="wrapper">
      <Spinner text="Please wait..." isVisible={movieHomeState.showSpinner} />

      {Object.values(movieHomeState.watchItems).map(
        (movie) =>
          movie.display && (
            <TrayContainer
              key={movie.id}
              title={movie.title}
              path={movie.path}
              movies={movie.movies}
            />
          )
      )}

      <CardSkeleton isVisible={movieHomeState.loading} />
    </main>
  );
}

export default HomePage;
