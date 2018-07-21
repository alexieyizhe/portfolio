/*
  FLOAT_TEXT.JS
    Wrapper around text that creates a 'floating' effect that has the text
    hover and bob up and down. Amplitude is set by parent component.
    Can be used to draw attention to elements.
*/


import React from "react";
import styled, {keyframes, css} from "styled-components";


const floating = (props) => (
  keyframes`
    from {
      transform: translate(0, ${css`${props.from || -2}px`});
    }
    40% {
      transform:translate(0, ${css`${props.to || 2}px`});
    }
    to {
      transform: translate(0, ${css`${props.from || -2}px`});
    }
  `
);

const FloatContainer = styled.div`
  animation-name: ${floating};
  animation-duration: ${(props) => props.duration || 3}s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const FloatText = (props) => (
  <FloatContainer from={props.from} to={props.to} duration={props.duration}>{props.children}</FloatContainer>
);

export default FloatText;
