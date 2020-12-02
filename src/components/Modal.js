import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import Moment from 'react-moment';

const ModalBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  position: absolute;
  display: flex;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  max-height: 95vh;
  width: 90vw;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 1rem;
  margin: auto;
  padding: 1rem;
  animation: 0.5s ${fadeIn} ease-out;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalHeader = styled.h1`
  color: ${(props) => props.theme.primary};
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  word-wrap: break-word;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 2.3rem;
  }
`;

const ModalText = styled.p`
  color: ${(props) => (props.primary ? props.theme.bg : props.theme.secondary)};
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  word-wrap: break-word;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const ShowtimeContainer = styled.div`
  border: 0.5rem ${(props) => props.theme.bg} solid;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.bg};
  text-align: center;
  margin: 1rem 0;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

// const Link = styled.a`
//   color: ${(props) => props.theme.primary};
//   font-size: 1.75rem;
//   font-weight: 300;
//   letter-spacing: 0.1rem;
//   text-decoration: none;
// `;

export default ({ movie, setOpen, modalType }) => {
  return ReactDOM.createPortal(
    modalType === 'Info' ? (
      <ModalBackground onClick={() => setOpen(false)}>
        <ModalContainer>
          <ModalHeader primary>{movie.title}</ModalHeader>
          <hr />
          <ModalText primary>
            <b>User Rating:</b> {`${movie.vote_average} / 10`}
          </ModalText>
          <ModalText primary>
            <b>Release Date:</b> {movie.release_date}
          </ModalText>
          <ModalText primary>
            <b>Runtime:</b> {movie.runtime} minutes
          </ModalText>
          <ModalText primary>
            <b>Production Companies:</b>{' '}
            {movie.production_companies.map((el) => el.name).join(', ')}
          </ModalText>
          <ModalText primary>
            <b>Director(s):</b>{' '}
            {movie.credits.crew
              .filter((el) => el.job === 'Director')
              .map((el) => el.name)
              .join(', ')}
          </ModalText>
          <ModalText primary>
            <b>Genre(s):</b> {movie.genres.map((el) => el.name).join(', ')}
          </ModalText>
          <ModalText primary>
            <b>Starring:</b>{' '}
            {movie.credits.cast.map((el) => el.name).join(', ')}
          </ModalText>
          <ModalText primary>
            <b>Overview:</b> {movie.overview}
          </ModalText>
          {movie.videos.results.length > 0 ? (
            <React.Fragment>
              <ModalText primary>
                <b>{movie.videos.results[0].name}:</b>
              </ModalText>
              <VideoContainer>
                <Video
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title={`${movie.name}`}
                />
              </VideoContainer>
            </React.Fragment>
          ) : (
            ''
          )}
        </ModalContainer>
      </ModalBackground>
    ) : (
      <ModalBackground onClick={() => setOpen(false)}>
        <ModalContainer>
          <ModalHeader>{movie.title}</ModalHeader>
          <hr />
          {movie.showtimes.map((showtime, i) => {
            return (
              <ShowtimeContainer key={i}>
                <ModalText secondary>
                  <b>Theatre:</b> {showtime.theatre.name}
                </ModalText>
                <ModalText secondary>
                  <b>Showtime:</b>{' '}
                  <Moment format='MMMM Do YYYY, h:mm a'>
                    {showtime.dateTime}
                  </Moment>
                </ModalText>
                {/* <Link href={showtime.ticketURI} target='_blank'>
                  <b>Get Tickets Here!</b>
                </Link> */}
              </ShowtimeContainer>
            );
          })}
        </ModalContainer>
      </ModalBackground>
    ),
    document.querySelector('#modal')
  );
};
