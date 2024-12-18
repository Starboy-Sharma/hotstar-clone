// @ts-nocheck
const accessKey = import.meta.env.VITE_TMDB_ACCESS_KEY;
export const getLatestMovies = async () => {
    try {

        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessKey}`
            }
        };

        const resposne = await fetch(url, options);
        const data = await resposne.json();

        return { success: true, data };

    } catch (error) {

        console.log(error);

        return { success: false, error };
    }
}

export const getLatestTvShows = async function () {
    try {
        const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessKey}`
            }
        };

        const resposne = await fetch(url, options);
        const data = await resposne.json();

        return { success: true, data };
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}