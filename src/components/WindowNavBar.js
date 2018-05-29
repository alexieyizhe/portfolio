import React from 'react';
import styled from 'styled-components';

const WindowNavBar = styled.div`
  height: 25px;
  background-color: #171717;
  color: black;
  border-radius: 8px;
  padding-bottom: 20px;
`;

const WindowButton = styled.span`
  width: 0.8em;
  height: 0.8em;
  margin-left: 7px;
  margin-top: 7px;
  display: inline-block;
  border-radius: 50%;
  background-color: ${(props) => {
    if(props.type === 'close') return '#ff6961';
    if(props.type === 'min') return '#f4e842';
    if(props.type === 'max') return '#24cc24';
    }
  };

  &:hover {
    filter: brightness(80%);
  }
`;


function windowNavBar(props) {
  return (
    <WindowNavBar>
      <WindowButton type='close' /><WindowButton type='min' /><WindowButton type='max' />
    </WindowNavBar>
  );
}

export default windowNavBar;
