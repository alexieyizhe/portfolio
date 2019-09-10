import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";

import Card, { CARD_VERT_PADDING } from "~components/Card";
import Text from "~components/Text";
import Link, { UnstyledLink } from "~components/Link";

import ParticleGroup, { ParticleGroupProps } from "~components/ParticleGroup";
import { ParticleInfo } from "~components/Particle";

export interface ShowcaseCardProps extends ParticleGroupProps {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;
  particles?: boolean;
}

type transFn = (params: number[]) => string;

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 1.5) / 60,
  (x - window.innerWidth / 2) / 150,
  1.05,
];

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const showcaseCardParticleInfo: ParticleInfo[] = [
  { x: 60, y: 94, s: 0.8, color: "red" },
  { x: 23, y: 96, s: 0.4, color: "blue" },
  { x: -2, y: 28, s: 0.5, color: "purple" },
  { x: 98, y: 60, s: 0.6, color: "green" },
  { x: 45, y: -2, s: 0.75, color: "red" },
];

const CardContainer = styled(animated(Card))`
  display: grid;
  grid-template-rows: 40px 180px 50px;
  grid-template-columns: 35% 35%;
  grid-column-gap: 30%;
  grid-template-areas:
    "subheading image"
    "title ."
    ". link";

  position: relative;
  width: 100%;
  max-width: 2000px;
  height: auto;
  margin: 100px 0;

  cursor: pointer;

  & > .title {
    grid-area: title;
  }

  & > .subheading {
    grid-area: subheading;
  }

  & > .link {
    grid-area: link;
    justify-self: end;
    align-self: end;

    position: relative;
    bottom: -${CARD_VERT_PADDING * 1.5}px;
  }

  & > .image {
    grid-area: image;
  }
`;

const Subheading = styled(animated(Text))`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const Title = styled(animated(Text))`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const ShowcaseImage = styled(animated.img)`
  max-width: 100%;

  position: relative;
  top: -${CARD_VERT_PADDING * 3}px;
`;

const AnimatedLink = animated(Link);

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  title,
  subtitle,
  imgSrc,
  imgAlt,
  linkText,
  linkHref,
  particles,
  customParticle,
  ...rest
}) => {
  const [cardVisible, setCardVisible] = useState(false);

  const onCardEnter = useCallback(() => setCardVisible(true), []);
  const onCardLeave = useCallback(() => setCardVisible(false), []);

  const animProps = useSpring({
    opacity: cardVisible ? 1 : 0,
    transform: cardVisible ? "translateY(0)" : "translateY(50px)",
    config: config.stiff,
  });
  const [{ xys }, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 500, friction: 100 },
  }));

  return (
    <UnstyledLink href={linkHref}>
      <Waypoint onEnter={onCardEnter} onLeave={onCardLeave}>
        <CardContainer
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{
            transform: xys.interpolate((trans as unknown) as transFn),
          }}
          {...rest}
        >
          <Subheading
            variant="subheading"
            className="subheading"
            style={animProps}
          >
            {subtitle}
          </Subheading>

          <Title variant="heading" className="title" style={animProps}>
            {title}
          </Title>

          <ShowcaseImage
            src={imgSrc}
            alt={imgAlt}
            className="image"
            style={animProps}
          />

          <AnimatedLink
            variant="subheading"
            className="link"
            iconName="arrow-right"
            href=""
            style={animProps}
          >
            {linkText}
          </AnimatedLink>

          {particles && (
            <ParticleGroup
              particlesInfo={showcaseCardParticleInfo}
              customParticle={customParticle}
            />
          )}
        </CardContainer>
      </Waypoint>
    </UnstyledLink>
  );
};

export default ShowcaseCard;
