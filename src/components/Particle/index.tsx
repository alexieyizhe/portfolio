import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import { BaseElementProps } from "~src/types/BaseElementProps";
import { floatAnim } from "~utils/animations";

import { Size } from "~types/Size";
import {
  ZigzagParticle,
  CircleParticle,
  SquareParticle,
  TriangleParticle,
} from "~assets/images";

export interface ParticleInfo {
  x: number;
  y: number;
  s: number;
  color: string;
}

export interface ParticleProps extends BaseElementProps {
  name?: "zigzag" | "circle" | "triangle" | "square"; // random if not provided
  color?: string;
  size?: Size | number;
  float?: boolean;
  rotation?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customSVG?: any; // a custom SVG img to use
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

  ${({ float }) =>
    float &&
    css`
      animation: ${floatAnim} ${Math.random() * 5 + 3}s ease-in-out infinite;
    `}

  & > svg {
    transform: scale(
        ${({ size = Size.MEDIUM }) =>
          typeof size === "number" ? size : PARTICLE_SCALE_FACTOR[size]}
      )
      rotate(${({ rotation }) => rotation}deg);

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

const Particle: React.FC<ParticleProps> = ({
  name,
  rotation,
  customSVG,
  ...rest
}) => {
  const randomParticle = useMemo(
    () => PARTICLE_OPTIONS[Math.floor(Math.random() * PARTICLE_OPTIONS.length)],
    []
  );

  const randomRotation = useMemo(() => Math.random() * 100, []);

  const ParticleComponent =
    customSVG || PARTICLE_DICTIONARY[name || randomParticle];

  return (
    <Container {...rest} rotation={rotation || randomRotation}>
      <ParticleComponent />
    </Container>
  );
};

export default Particle;
