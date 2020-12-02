import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
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

  @media (max-width: 480px) {
    height: 4rem;
    font-size: 1.2rem;
    width: 90%;
  }
`;

export default ({ options, name, handleChange, value }) => {
  return (
    // <Select
    //   defaultValue={name === 'sort' ? 'popularity.desc' : ''}
    //   name={name}
    //   onChange={handleChange}
    // >
    //   {name === 'sort' ? (
    //     ''
    //   ) : (
    //     <option value='' disabled>
    //       {`Select ${name}`}
    //     </option>
    //   )}
    //   {options.map((option) => {
    //     return (
    //       <option key={option.name} value={option.value}>
    //         {option.name}
    //       </option>
    //     );
    //   })}
    // </Select>
    <Select value={value} name={name} onChange={handleChange}>
      {name === 'sort' ? (
        ''
      ) : (
        <option value='' hidden>
          {`Select ${name}`}
        </option>
      )}
      {options.map((option) => {
        return (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </Select>
  );
};
