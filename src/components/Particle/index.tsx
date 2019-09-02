import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import { BaseElementProps } from "~src/utils/typings/BaseElementProps";
import { floatAnim } from "~src/utils/animations";

import { Size } from "~src/theme";
import {
  ZigzagParticle,
  CircleParticle,
  SquareParticle,
  TriangleParticle,
} from "~assets/images";

export interface ParticleProps extends BaseElementProps {
  name?: "zigzag" | "circle" | "triangle" | "square"; // random if not provided
  color?: string;
  size?: Size;
  float?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PARTICLE_DICTIONARY: { [name: string]: any } = {
  zigzag: ZigzagParticle,
  circle: CircleParticle,
  triangle: TriangleParticle,
  square: SquareParticle,
};

const PARTICLE_OPTIONS = ["zigzag", "circle", "triangle", "square"];
const PARTICLE_SCALE_FACTOR = {
  [Size.XSMALL]: 0.7,
  [Size.SMALL]: 0.8,
  [Size.MEDIUM]: 1,
  [Size.LARGE]: 1.2,
  [Size.XLARGE]: 1.5,
};

const Container = styled.span<ParticleProps>`
  display: inline-block;

  transform: scale(${({ size = Size.MEDIUM }) => PARTICLE_SCALE_FACTOR[size]});

  & > svg {
    ${({ float }) =>
      float &&
      css`
        animation: ${floatAnim} ${Math.floor(Math.random() * 3 + 5)}s
          ease-in-out infinite;
      `}

    & circle {
      fill: ${({ theme, color = "black" }) => theme.color[color] || color};
    }
    & path {
      fill: ${({ theme, color = "black" }) => theme.color[color] || color};
    }
    & line {
      stroke: ${({ theme, color = "black" }) => theme.color[color] || color};
    }
  }
`;

const Particle: React.FC<ParticleProps> = ({ name, ...rest }) => {
  const randomParticle = useMemo(
    () => PARTICLE_OPTIONS[Math.floor(Math.random() * PARTICLE_OPTIONS.length)],
    []
  );

  const ParticleComponent = PARTICLE_DICTIONARY[name || randomParticle];

  return (
    <Container {...rest}>
      <ParticleComponent />
    </Container>
  );
};

export default Particle;
