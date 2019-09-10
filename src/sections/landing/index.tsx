import React from "react";
import styled from "styled-components";

import { HeroMe } from "~assets/images";

import Intro from "./components/Intro";
import QuickLinks from "./components/QuickLinks";

const Container = styled.section`
  position: relative;
  height: 85vh;

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 88vh;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    height: 90vh;
  `}
`;

const HeroImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 70%;

  ${({ theme }) => theme.mediaQueries.tablet`
    bottom: 9vh;
    max-width: 90%;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    bottom: 0;
    max-width: 100%;
  `}
`;

const Landing = () => (
  <Container>
    <Intro />
    <QuickLinks />
    <HeroImg src={HeroMe} />
  </Container>
);

export default Landing;
