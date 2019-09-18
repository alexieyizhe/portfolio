/**
 * Provides a handy way of displaying a group of particles,
 * usually on the edges of a container.
 */
import React, { useMemo } from "react";
import styled from "styled-components";

import Particle, { ParticleInfo } from "~components/Particle";
import { BaseElementProps } from "~src/types/BaseElementProps";

export interface ParticleGroupProps extends BaseElementProps {
  particlesInfo?: ParticleInfo[];
  customParticle?: string;
}

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ParticleContainer = styled.div<ParticleInfo>`
  position: absolute;
  display: inline-block;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  transform: scale(${({ s }) => s});
`;

const ParticleGroup: React.FC<ParticleGroupProps> = ({
  className,
  id,
  particlesInfo,
  customParticle,
}) => {
  const randomizedParticlesInfo = useMemo(
    () =>
      particlesInfo
        ? particlesInfo.map(({ x, y, s, color }) => ({
            x: x + (Math.random() * 2 - 1),
            y: y + (Math.random() * 2 - 1),
            s: s + (Math.random() - 0.6) / 3,
            r: Math.random() * 120 - 60,
            color,
            custom: Math.random() < 0.7,
          }))
        : [],
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
          color={info.color}
        >
          <Particle
            float
            color={info.color}
            customSVG={info.custom ? customParticle : undefined}
            rotation={info.r}
          />
        </ParticleContainer>
      ))}
    </ParticlesContainer>
  );
};

export default ParticleGroup;
