import React from "react";
import styled from "styled-components";

const GlitchBox = styled.div`
  position: relative;
  color: ${props => props.color};
  font: ${props => props.font};
  background: white;
  text-shadow: 0 1px #0DFF0F;


  @keyframes glitch-anim-1 {
    0% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    20% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    40% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    60% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    80% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    100% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
  }

  @keyframes glitch-anim-2 {
    0% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    20% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    40% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    60% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    80% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
    100% {
      clip: rect(${Math.floor(Math.random() * 500)}px, 5000px, ${Math.floor(Math.random() * 500)}px, 0);
    }
  }

  &:before {
    content: '${props => props.text}';
    position: absolute;
    top: -5px;
    color: ${props => props.color};;
    left: 0;
    width: 100%;
    height: 100%;
    text-shadow: -1px 0 blue;
    /* important: opaque background masks the original */
    background: white;
    animation: glitch-anim-1 1s infinite linear alternate-reverse;
  }

  &:after {
    content: '${props => props.text}';
    position: absolute;
    top: 5px;
    color: ${props => props.color};;
    left: 0;
    width: 100%;
    height: 100%;
    text-shadow: 1px 0 red;

    /* important: opaque background masks the original */
    background: white;
    animation: glitch-anim-2 1.1s infinite linear alternate-reverse;
  }

`;

const Glitch = (props) => (
  <GlitchBox text={props.text} color={props.color} font={props.font}>
    {props.text}
  </GlitchBox>
);

export default Glitch;
