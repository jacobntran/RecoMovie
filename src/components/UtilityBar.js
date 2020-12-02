import React, { useState } from 'react';
import styled from 'styled-components';

import Tabs from './Tabs';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const UtilityBar = styled.div`
  background-color: ${(props) => props.theme.bg};
  width: 35%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
    padding-bottom: 3rem;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  text-align: center;
  padding-top: 1rem;
  font-size: 6rem;
  font-weight: 400;
  width: 100%;
  letter-spacing: 0.4rem;
  height: 9rem;
  @media (max-width: 480px) {
    font-size: 5.5rem;
    letter-spacing: 0.3rem;
  }
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.secondary};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  margin-bottom: 2rem;
`;

const Subtitle2 = styled(Subtitle)`
  margin-top: auto;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Text = styled.p`
  color: ${(props) => props.theme.bg};
  text-align: center;
  font-size: 1.7rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Form = styled.form`
  background-color: ${(props) => props.theme.secondary};
  width: 75%;
  margin: 0 auto;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  > * {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    width: 85%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const sortTypes = [
  { name: 'Popularity Descending', value: 'popularity.desc' },
  { name: 'Popularity Ascending', value: 'popularity.asc' },
  { name: 'Rating Descending', value: 'vote_average.desc' },
  { name: 'Rating Ascending', value: 'vote_average.asc' },
];

const genres = [
  { name: 'Action', value: '28' },
  { name: 'Adventure', value: '12' },
  { name: 'Animation', value: '16' },
  { name: 'Comedy', value: '35' },
  { name: 'Crime', value: '80' },
  { name: 'Documentary', value: '99' },
  { name: 'Drama', value: '18' },
  { name: 'Family', value: '10751' },
  { name: 'Fantasy', value: '14' },
  { name: 'History', value: '36' },
  { name: 'Horror', value: '27' },
  { name: 'Music', value: '10402' },
  { name: 'Mystery', value: '9648' },
  { name: 'Romance', value: '10749' },
  { name: 'Science Fiction', value: '878' },
  { name: 'TV Movie', value: '10770' },
  { name: 'Thriller', value: '53' },
  { name: 'War', value: '10752' },
  { name: 'Western', value: '37' },
];

const ratings = [
  { name: 'G', value: 'G' },
  { name: 'PG', value: 'PG' },
  { name: 'PG-13', value: 'PG-13' },
  { name: 'R', value: 'R' },
  { name: 'NC-17', value: 'NC-17' },
];

const renderContent = (
  active,
  input,
  handleChange,
  handleSubmit,
  setInput,
  searchPopular
) => {
  switch (active) {
    case 'Title':
      return (
        <Form onSubmit={handleSubmit} name='Title' autoComplete='off'>
          <Text>Search for movie by title!</Text>
          <Input
            type='text'
            name='title'
            placeholder='Input title...'
            value={input.title}
            onChange={handleChange}
          />
          <Button type='submit' primary>
            Submit
          </Button>
        </Form>
      );

    case 'Nearby':
      return (
        <Form onSubmit={handleSubmit} name='Nearby' autoComplete='off'>
          <Text>Search for nearby showtimes!</Text>
          <Input
            type='text'
            name='zip'
            placeholder='Input zip code...'
            value={input.zip}
            onChange={handleChange}
          />
          <Button type='submit' primary>
            Submit
          </Button>
          <Text>
            <strong>Disclaimer</strong>: Due to the current Covid-19 pandemic,
            this feature may not yield any results because movie theaters could
            be closed down in the specified area.
          </Text>
        </Form>
      );
    case 'Popular':
      return (
        <Form>
          <Text>
            Press to discover the most current popular movies from The Movie
            Database!
          </Text>
          <Button
            primary
            onClick={(event) => {
              event.preventDefault();
              searchPopular();
            }}
          >
            Discover
          </Button>
        </Form>
      );
    default:
      return (
        <Form onSubmit={handleSubmit} name='Rec' autoComplete='off'>
          <Text>
            Enter as many fields as you like to get recommendations based on our
            inputs!
          </Text>
          <Input
            type='text'
            name='year'
            placeholder='Input year...'
            value={input.year}
            onChange={handleChange}
          />
          <Select
            options={sortTypes}
            handleChange={handleChange}
            name={'sort'}
            value={input.sort}
          />
          <Select
            options={genres}
            handleChange={handleChange}
            name={'genre'}
            value={input.genre}
          />
          <Select
            options={ratings}
            handleChange={handleChange}
            name={'rating'}
            value={input.rating}
          />
          <Input
            type='text'
            name='actor'
            placeholder='Input actor...'
            value={input.actor}
            onChange={handleChange}
          />
          <Input
            type='text'
            name='director'
            placeholder='Input director...'
            value={input.director}
            onChange={handleChange}
          />

          <ButtonContainer>
            <Button type='submit' primary>
              Submit
            </Button>
            <Button
              secondary
              onClick={(event) => {
                event.preventDefault();
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
              }}
            >
              Clear
            </Button>
          </ButtonContainer>
        </Form>
      );
  }
};

export default ({
  input,
  handleChange,
  handleSubmit,
  setInput,
  searchPopular,
}) => {
  const [active, setActive] = useState('Main');

  return (
    <UtilityBar>
      <Title>RecoMovie</Title>
      <Subtitle>A Movie Recommendation Application</Subtitle>
      <Tabs setActive={setActive} active={active} />
      {renderContent(
        active,
        input,
        handleChange,
        handleSubmit,
        setInput,
        searchPopular
      )}
      <Subtitle2>
        Powered by the TMDB (The Movie Database) and TMS API
      </Subtitle2>
    </UtilityBar>
  );
};
