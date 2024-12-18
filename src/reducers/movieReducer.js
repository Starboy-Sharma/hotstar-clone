export const intitalState = {
    loading: false,
    showSpinner: false,
    displayedCategoriesCount: 0,
    isAllCategoriesDisplayed: false,
    watchItems: {
        1: { title: 'Latest Releases', path: '/latest-movies', id: 'movie-id-01', display: false, movies: [] },
        2: { title: 'Latest TV Shows', path: '/latest-tv-shows', id: 'movie-id-02', display: false, movies: [] },
        3: { title: 'Top Rated Movies', path: '/top-rated-movies', id: 'movie-id-03', display: false, movies: [] },
        4: { title: 'Top Rated TV Shows', path: '/top-rated-tv-shows', id: 'movie-id-04', display: false, movies: [] },
        5: { title: 'Genres', path: '/genres', id: 'movie-id-05', display: false, movies: [] }
    }
}

export const movieReducer = (state, action) => {

    switch (action.type) {
        case 'SET_SPINNER': {
            return {
                ...state,
                showSpinner: action.displaySpinner
            }
        }

        case 'TOGGLE_LOADING': {
            return {
                ...state,
                loading: action.isLoading
            }
        }

        case 'SET_CATEGORIES': {

            if (state.displayedCategoriesCount === Object.keys(state.watchItems).length) {
                console.log('All categories are already displayed');
                return {
                    ...state,
                    isAllCategoriesDisplayed: true
                };
            }

            const currentDisplayedCategoriesCount = state.displayedCategoriesCount;

            
            const currentWatchItems = state.watchItems;
            let addedCount = 0;
            let newWatchItems = {};
            
            // update newWatchItem and addedCount if the category is not displayed yet!
            Object.keys(action.payload.watchItems).forEach((key) => {
                if ('title' in action.payload.watchItems[key] && !currentWatchItems[key]?.display) {
                    newWatchItems[key] = action.payload.watchItems[key];
                    addedCount++;
                }
            });

            if (addedCount === 0) {
                console.log('Items are already shown.');
                return state;
            }
            
            return {
                ...state,
                displayedCategoriesCount: currentDisplayedCategoriesCount + addedCount,
                isAllCategoriesDisplayed: currentDisplayedCategoriesCount + addedCount === Object.keys(state.watchItems).length,
                watchItems: {
                    ...currentWatchItems,
                    ...newWatchItems
                }
            }
        }
                
        default: {
            throw new Error('Invalid action in movieReducer');
        }
    }
}