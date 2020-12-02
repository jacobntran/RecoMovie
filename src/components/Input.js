import styled from 'styled-components';

export default styled.input`
  width: 80%;
  height: 5rem;
  background-color: ${(props) => props.theme.bg};
  color: white;
  cursor: pointer;
  border-radius: 0.4rem;
  padding: 0.7rem;
  border: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.3rem ${(props) => props.theme.primary};
    transition: 0.3s;
  }

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: white;
  }

  &::-moz-placeholder {
    /* Firefox 19+ */
    color: white;
  }

  &:-ms-input-placeholder {
    /* IE 10+ */
    color: white;
  }

  &:-moz-placeholder {
    /* Firefox 18- */
    color: white;
  }

  @media (max-width: 480px) {
    height: 4rem;
    font-size: 1.2rem;
    width: 90%;
  }
`;
