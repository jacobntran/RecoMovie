import styled from 'styled-components';

export default styled.button`
  width: 10rem;
  height: 4rem;
  font-size: 1.5rem;
  background: transparent;
  color: ${(props) => (props.primary ? props.theme.primary : props.theme.bg)};
  border: 0.2rem
    ${(props) => (props.primary ? props.theme.primary : props.theme.bg)} solid;
  border-radius: 0.4rem;
  cursor: pointer;
  background: linear-gradient(
      to left,
      transparent 50%,
      ${(props) => (props.primary ? props.theme.primary : props.theme.bg)} 50%
    )
    right;
  background-size: 200%;
  transition: 0.3s ease-out;

  &:hover {
    color: white;
    background-position: left;
  }

  &:focus {
    outline: none;
    color: white;
    background-position: left;
  }

  @media (max-width: 480px) {
    height: 3.1rem;
    width: 7.5rem;
    font-size: 1.2rem;
  }
`;
