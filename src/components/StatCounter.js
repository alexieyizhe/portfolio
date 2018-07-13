import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions.js";
import { css } from "styled-components";
import CountUp from 'react-countup';

const CounterContainer = styled.span`
  display: inline-grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas: "counter"
                       "desc";
  align-items: center;
  font-family: 'PT Serif', 'Times', serif;
  max-width: 11em;

  ${mediaSize.tablet`
    max-width: 30%;
    padding: 5%;
    justify-items: center;
    text-align: center;
  `}

  ${mediaSize.phone`
    max-width: 40%;
    padding: 5%;
    justify-items: center;
    text-align: center;
  `}
`

const Counter = styled.span`
  font-size: 3em;
  grid-area: counter;

  ${mediaSize.tablet`
    font-size: 4em;
  `}

  ${mediaSize.phone`
    font-size: 2em;

  `}
`

const Desc = styled.span`
  grid-area: desc;
  ${mediaSize.tablet`
    font-size: 1.5em;
  `}
  ${mediaSize.phone`
    font-size: 1em;

  `}
`



const StatCounter = (props) => (
  <CounterContainer>
    <Counter><CountUp start={props.countStart || 0} end={props.countEnd || 100} duration={props.countDuration || 250} /></Counter>
    <Desc>{props.children}</Desc>
  </CounterContainer>
);

export default StatCounter;
