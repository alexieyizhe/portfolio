/**
 * Provides a handy group of particles.
 */

import React, { useMemo } from "react";
import styled from "styled-components";

import Particle, { ParticleInfo } from "../Particle";
import { BaseElementProps } from "~src/types/BaseElementProps";

export interface ParticleGroupProps extends BaseElementProps {
  particlesInfo?: ParticleInfo[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customParticle?: any;
}

export interface ParticleContainerPRops extends ParticleInfo {
  r: number;
}

const defaultParticlesInfo: ParticleInfo[] = [
  { x: 0, y: 0, s: 1, color: "black" },
];

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ParticleContainer = styled.div<ParticleContainerPRops>`
  position: absolute;
  display: inline-block;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  transform: scale(${({ s }) => s}) rotate(${({ r }) => r}deg);
`;

const ParticleGroup: React.FC<ParticleGroupProps> = ({
  className,
  id,
  particlesInfo = defaultParticlesInfo,
  customParticle,
}) => {
  const randomizedParticlesInfo = useMemo(
    () =>
      particlesInfo.map(({ x, y, s, color }) => ({
        x: x + (Math.random() * 4 - 2),
        y: y + (Math.random() * 4 - 2),
        s: s + (Math.random() - 0.5) / 3,
        r: Math.floor(Math.random() * 360),
        color,
      })),
    [particlesInfo]
  );

  return (
    <ParticlesContainer className={className} id={id}>
      {randomizedParticlesInfo.map(info => (
        <ParticleContainer
          key={`${info.x}-${info.y}`}
          x={info.x}
          y={info.y}
          s={info.s}
          r={info.r}
          color={info.color}
        >
          <Particle
            float
            color={info.color}
            customSVG={Math.random() < 0.7 ? customParticle : undefined}
          />
        </ParticleContainer>
      ))}
    </ParticlesContainer>
  );
};

export default ParticleGroup;
