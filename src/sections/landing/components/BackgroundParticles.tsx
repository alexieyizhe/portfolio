import React from "react";
import styled from "styled-components";
import Particles, { IParticlesParams } from "react-particles-js";

import { PAGE_VERT_PADDING, PAGE_HORIZ_PADDING } from "~components/PageWrapper";

/* eslint-disable @typescript-eslint/camelcase */

const particlesConfig: IParticlesParams = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      speed: 1,
      out_mode: "out",
    },
    shape: {
      type: ["images"],
      images: [
        {
          src: "/circle.inline.svg",
          height: 10,
          width: 10,
        },
        {
          src: "/triangle.inline.svg",
          height: 10,
          width: 10,
        },
        {
          src: "/square.inline.svg",
          height: 10,
          width: 10,
        },
        {
          src: "/zigzag.inline.svg",
          height: 10,
          width: 10,
        },
      ],
    },
    color: {
      value: "#CCC",
    },
    size: {
      value: 10,
      random: true,
    },
  },
  retina_detect: false,
};

const ParticlesContainer = styled.div`
  position: absolute;
  top: -${PAGE_VERT_PADDING}vh;
  left: -${PAGE_HORIZ_PADDING}vw;
  width: 100vw;
  height: ${120 + PAGE_VERT_PADDING}vh;

  opacity: 0.4;
  mask-image: linear-gradient(
    to top,
    transparent,
    black,
    black,
    black,
    black,
    transparent
  );
`;

const BackgroundParticles = () => (
  <ParticlesContainer>
    <Particles
      width="100vw"
      height={`${120 + PAGE_VERT_PADDING}vh`}
      params={particlesConfig}
    />
  </ParticlesContainer>
);

export default BackgroundParticles;
