import axios from 'axios';

export const searchRec = async (input, setMovies) => {
  let movieData;

  if (input.actor !== '' && input.director === '') {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${input.actor}&page=1&include_adult=false`
    );

    movieData = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${input.sort}&include_adult=false&include_video=false&page=1&primary_release_year=${input.year}&with_genres=${input.genre}&certification_country=US&certification=${input.rating}&with_people=${res.results[0].id}`
    );
  }

  if (input.director === '' && input.director !== '') {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${input.director}&page=1&include_adult=false`
    );

    movieData = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${input.sort}&include_adult=false&include_video=false&page=1&primary_release_year=${input.year}&with_genres=${input.genre}&certification_country=US&certification=${input.rating}&with_people=${res.results[0].id}`
    );
  }

  if (input.actor !== '' && input.director !== '') {
    const actor = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${input.actor}&page=1&include_adult=false`
    );

    const director = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${input.director}&page=1&include_adult=false`
    );

    movieData = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${input.sort}&include_adult=false&include_video=false&page=1&primary_release_year=${input.year}&with_genres=${input.genre}&certification_country=US&certification=${input.rating}&with_people=${actor},${director}`
    );
  }

  movieData = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${input.sort}&include_adult=false&include_video=false&page=1&primary_release_year=${input.year}&with_genres=${input.genre}&certification_country=US&certification=${input.rating}`
  );

  setMovies(movieData.data.results);
};

export const searchTitle = async (input, setMovies) => {
  const movieData = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${input.title}`
  );

  setMovies(movieData.data.results);
};

export const getSelectedMovie = async (id, setSelectedMovie, setOpen) => {
  const movieData = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits`
  );

  setSelectedMovie(movieData.data);
  setOpen(true);
};

export const searchNearby = async (input, setMovies) => {
  const d = new Date();
  const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

  const movieData = await axios.get(
    `https://data.tmsapi.com/v1.1/movies/showings?startDate=${today}&zip=${input.zip}&api_key=${process.env.REACT_APP_TMS_API_KEY}`
  );

  setMovies(movieData.data);
};
