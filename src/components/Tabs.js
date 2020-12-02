import React from 'react';
import styled from 'styled-components';

import MouseDownContext from '../MouseDownContext';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  width: 8rem;
  height: 3rem;
  color: ${(props) => props.theme.secondary};
  background-color: transparent;
  border: 0.2rem ${(props) => props.theme.secondary} solid;
  border-radius: 0;
  font-size: 1.5rem;
  padding: 0.2em 0.3em;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.bg};
    transition: 0.3s ease-out;
  }

  ${({ mouseDown, theme }) =>
    mouseDown
      ? `
    &:focus {
      outline: none;
      border: none;
    } 
  `
      : `&:focus {
    outline: none;
    border: 0.2rem solid ${theme.primary};
  }`}

  ${({ active, theme }) =>
    active &&
    `
    background-color:  ${theme.secondary};
    color: ${theme.bg};
    border: transparent;
    outline: none;
  `}

  @media (max-width: 480px) {
    width: 6rem;
    height: 3rem;
    font-size: 1.2rem;
  }
`;

const TabStart = styled(Tab)`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const TabEnd = styled(Tab)`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export default ({ setActive, active }) => {
  return (
    <MouseDownContext.Consumer>
      {(mouseDown) => (
        <TabContainer>
          <TabStart
            onClick={() => setActive('Main')}
            active={active === 'Main'}
            mouseDown={mouseDown}
          >
            Rec
          </TabStart>
          <Tab
            onClick={() => setActive('Title')}
            active={active === 'Title'}
            mouseDown={mouseDown}
          >
            Title
          </Tab>
          <Tab
            onClick={() => setActive('Popular')}
            active={active === 'Popular'}
            mouseDown={mouseDown}
          >
            Popular
          </Tab>
          <TabEnd
            onClick={() => setActive('Nearby')}
            active={active === 'Nearby'}
            mouseDown={mouseDown}
          >
            Nearby
          </TabEnd>
        </TabContainer>
      )}
    </MouseDownContext.Consumer>
  );
};
