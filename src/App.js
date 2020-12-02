import React, { useState, useReducer, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import axios from 'axios';

import MouseDownContext from './MouseDownContext';
import { searchRec, searchTitle, searchNearby } from './api';
import UtilityBar from './components/UtilityBar';
import Movies from './components/Movies';
import Modal from './components/Modal';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0; }

*,
*::before,
*::after {
  box-sizing: inherit; }

html {
  box-sizing: border-box;
  font-size: 62.5%; }

body {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  }
`;

const theme = {
  primary: '#e5383b',
  secondary: '#d3d3d3',
  bg: '#232A2F',
};

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: auto;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

function App() {
  const [input, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      year: '',
      sort: 'popularity.desc',
      genre: '',
      rating: '',
      actor: '',
      director: '',
      title: '',
      zip: '',
    }
  );
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedMovie, setSelectedMovie] = useState({});
  const [mouseDown, setMouseDown] = useState(false);
  const [header, setHeader] = useState({
    type: '',
    text: '',
  });

  useEffect(() => {
    document.body.addEventListener('mousedown', () => setMouseDown(true));
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        setMouseDown(false);
      }
    });
    searchPopular();
  }, []);

  const searchPopular = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&region=us`
      )
      .then((res) => {
        setMovies(res.data.results);
        setIsLoading(false);
        setModalType('Info');
        setHeader({ type: 'popular', text: 'TMDB Most Popular Movies' });
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ [name]: value });
  };

  // blocks search if all fields but sort are empty
  const checkInput = () => {
    let count = 0;
    for (const field in input) {
      if (input[field] !== '') {
        count++;
      }
    }

    if (count > 1) {
      searchRec(input, setMovies);
      setModalType('Info');
      setHeader({ type: 'rec', text: 'Recommendations' });
    }

    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (e.target.name) {
      case 'Title':
        searchTitle(input, setMovies);
        setModalType('Info');
        setHeader({ type: 'title', text: input.title });
        break;
      case 'Nearby':
        searchNearby(input, setMovies);
        setModalType('Showtimes');
        setHeader({ type: 'zip', text: input.zip });
        break;
      default:
        checkInput();
    }

    setInput({
      year: '',
      sort: 'popularity.desc',
      genre: '',
      rating: '',
      actor: '',
      director: '',
      title: '',
      zip: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <MouseDownContext.Provider value={mouseDown}>
        <GlobalStyle />
        <RootContainer>
          {open && (
            <Modal
              movie={selectedMovie}
              setOpen={setOpen}
              modalType={modalType}
            />
          )}
          <UtilityBar
            input={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setInput={setInput}
            searchPopular={searchPopular}
          />
          <Movies
            movies={movies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setOpen={setOpen}
            setSelectedMovie={setSelectedMovie}
            modalType={modalType}
            header={header}
          />
        </RootContainer>
      </MouseDownContext.Provider>
    </ThemeProvider>
  );
}

export default App;
