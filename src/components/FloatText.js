import React from "react";
import styled, {keyframes, css} from "styled-components";

const floating = (props) => (
  keyframes`
    from {
      transform: translate(0, ${css`${props.from}px`});
    }
    40% {
      transform:translate(0, ${css`${props.to}px`});
    }
    to {
      transform: translate(0, ${css`${props.from}px`});
    }
  `
);


const FloatContainer = styled.div`
  animation-name: ${floating};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`
const FloatText = (props) => (
  <FloatContainer from={props.from} to={props.to}>{props.children}</FloatContainer>
)

export default FloatText;
