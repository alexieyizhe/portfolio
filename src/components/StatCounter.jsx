/*
  STAT_COUNTER.JS
    A counter component with a description.
    Gradually increments a number until the desired value,
    used to track stats on the About page.
*/

import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions";
import CountUp from "react-countup";

const CounterContainer = styled.span`
  display: inline-grid;
  grid-template-rows: auto auto;
  grid-template-areas: "counter"
                       "desc";
  align-items: center;
  font-family: "PT Serif", "Times", serif;

  ${mediaSize.tablet`
    max-width: 100%;
  `}

  ${mediaSize.phone`
    padding: 5%;
    justify-items: center;
    text-align: center;
  `}
`;

const Counter = styled.span`
  font-size: 3.5vw;
  grid-area: counter;

  ${mediaSize.tablet`
    font-size: 4em;
  `}

  ${mediaSize.phone`
    font-size: 2em;
  `}
`;

const Desc = styled.span`
  grid-area: desc;
  font-size: 2.5vh;
  ${mediaSize.tablet`
    font-size: 1.5em;
  `}
  ${mediaSize.phone`
    font-size: 1em;

  `}
`;


const StatCounter = (props) => (
  <CounterContainer>
    <Counter><CountUp start={props.countStart || 0} end={props.countEnd || 100} duration={props.countDuration || 250} /></Counter>
    <Desc>{props.children}</Desc>
  </CounterContainer>
);

export default StatCounter;
