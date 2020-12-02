import React from 'react';
import styled, { keyframes } from 'styled-components';

import Spinner from './Spinner';
import { getSelectedMovie } from '../api';

const RootContainer = styled.div`
  background-color: ${(props) => props.theme.secondary};
  width: 65%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Header = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.primary};
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 70vw;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  animation: 2s ${fadeIn} ease-out;
  width: 20rem;
  transform: translateY(0);
  transition: 0.5s;

  &:hover {
    transform: translateY(-0.7rem);
    transition: 0.5s;
  }

  &:focus {
    outline: none;
    transform: translateY(-0.7rem);
    transition-duration: 0.5s;
  }
`;

const Image = styled.img`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 30rem;
  width: 20rem;
`;

const Snippet = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bg};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem;
`;

const Title = styled.h6`
  color: ${(props) => props.theme.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  overflow: hidden;
`;

const Date = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
`;

const Meter = styled.div`
  background-color: ${(props) => props.theme.secondary};
  border-radius: 1rem;
  padding: 0.3rem;
  position: relative;
  margin-top: 0.5rem;
`;

const PercentageBar = styled.div`
  background-color: ${(props) =>
    0 <= props.percentage && props.percentage < 60
      ? 'red'
      : 60 <= props.percentage && props.percentage < 70
      ? ' orange'
      : 'green'};
  width: ${(props) => props.percentage}%;
  height: 2rem;
  border-radius: 1rem;
  text-align: center;
`;

const PercentageText = styled.span`
  display: inline-block;
  position: absolute;
  width: 100%;
  left: 0;
  font-size: 1.2rem;
`;

const renderHeader = (header) => {
  switch (header.type) {
    case 'zip':
      return `Theatre Showtimes Near ${header.text}`;
    default:
      return header.text;
  }
};

export default ({
  movies,
  isLoading,
  setOpen,
  setSelectedMovie,
  modalType,
  header,
}) => {
  return isLoading ? (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  ) : (
    <RootContainer>
      <Header>{renderHeader(header)}</Header>
      <MoviesContainer>
        {movies.length > 0 && modalType === 'Info'
          ? movies.map((movie) => {
              return (
                <Poster
                  key={movie.id}
                  onClick={() => {
                    getSelectedMovie(movie.id, setSelectedMovie, setOpen);
                  }}
                  tabIndex='0'
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                        : 'https://camo.githubusercontent.com/877a5078612637750fcce7165411364cc766ee93/68747470733a2f2f706c616365686f6c642e69742f323030783330302f646464'
                    }
                  />
                  <Snippet>
                    <Title>{movie.title}</Title>
                    <Date>{movie.release_date}</Date>
                    <Meter>
                      <PercentageBar
                        percentage={Math.floor((movie.vote_average / 10) * 100)}
                      >
                        <PercentageText>
                          {movie.vote_average
                            ? `${Math.floor((movie.vote_average / 10) * 100)} %`
                            : 'No Rating'}
                        </PercentageText>
                      </PercentageBar>
                    </Meter>
                  </Snippet>
                </Poster>
              );
            })
          : movies.length > 0 && modalType === 'Showtimes'
          ? movies.map((movie, i) => {
              return (
                <Poster
                  key={i}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setOpen(true);
                  }}
                  tabIndex='0'
                >
                  <Image
                    src={
                      movie.preferredImage
                        ? `https://cuso.tmsimg.com/${movie.preferredImage.uri}`
                        : 'https://camo.githubusercontent.com/877a5078612637750fcce7165411364cc766ee93/68747470733a2f2f706c616365686f6c642e69742f323030783330302f646464'
                    }
                  />
                  <Snippet>
                    <Title>{movie.title}</Title>
                    <Date>{movie.releaseDate}</Date>
                  </Snippet>
                </Poster>
              );
            })
          : ''}
      </MoviesContainer>
    </RootContainer>
  );
};
