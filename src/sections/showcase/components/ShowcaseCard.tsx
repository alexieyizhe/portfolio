import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";

import Card, { CARD_VERT_PADDING } from "~components/Card";
import Text from "~components/Text";
import Icon from "~components/Icon";
import { UnstyledLink } from "~components/Link";
import { ParticleInfo } from "~components/Particle";
import ParticleGroup, { ParticleGroupProps } from "./ParticleGroup";

import { Size } from "~types/Size";

export interface ShowcaseCardProps extends ParticleGroupProps {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;
  particles?: boolean;
  particlesInfo?: ParticleInfo[];
  color?: string;
}

type transFn = (params: number[]) => string;

const calcPerspective = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 60,
  (x - window.innerWidth / 2) / 150,
  1.05,
];

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const CardContainer = styled(animated(Card))`
  display: grid;
  grid-template-rows: 40px 250px 50px;
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
  margin: 50px 0;

  will-change: transform;
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

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    bottom: -${CARD_VERT_PADDING * 1.5}px;
  }

  & > .image {
    grid-area: image;
    max-height: 300px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    grid-template-columns: 45% 50%;
    grid-column-gap: 5%;


    & > .particles-container {
      opacity: 0.3;
    }
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 100%;
    grid-template-areas:
      "subheading"
      "title"
      "image"
      "link";

    & > .title {
      margin-top: 10px;
    }
  `}
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

  ${({ theme }) => theme.mediaQueries.xlMobile`
    top: 0;

    margin: 20px auto;
    align-self: center;
    max-height: 100%;
  `}
`;

const CardLink = styled(UnstyledLink)`
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const LinkArrow = styled(animated.div)`
  & > *:nth-child(2) {
    margin-left: 5px;
  }
`;

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  title,
  subtitle,
  imgSrc,
  imgAlt,
  linkText,
  linkHref,
  particles,
  customParticle,
  particlesInfo,
  color,
  ...rest
}) => {
  const [cardVisible, setCardVisible] = useState(false);

  const onCardEnter = useCallback(() => setCardVisible(true), []);
  const onCardLeave = useCallback(() => setCardVisible(false), []);

  const animProps = useSpring({
    opacity: cardVisible ? 1 : 0,
    transform: cardVisible ? "translateY(0)" : "translateY(50px)",
    config: config.stiff,
    delay: 200,
  });
  const [{ xys }, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 500, friction: 100 },
  }));

  return (
    <CardLink to={linkHref}>
      <Waypoint
        onEnter={onCardEnter}
        onLeave={onCardLeave}
        scrollableAncestor="window"
      >
        <CardContainer
          onMouseMove={({ clientX: x, clientY: y }) =>
            set({ xys: calcPerspective(x, y) })
          }
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{
            transform: xys.interpolate((trans as unknown) as transFn),
          }}
          {...rest}
        >
          {particles && (
            <ParticleGroup
              className="particles-container"
              particlesInfo={particlesInfo}
              customParticle={customParticle}
            />
          )}

          <Subheading
            variant="subheading"
            className="subheading"
            color={color}
            style={animProps}
          >
            {subtitle}
          </Subheading>

          <Title
            variant="heading"
            className="title"
            color={color}
            style={animProps}
          >
            {title}
          </Title>

          <ShowcaseImage
            src={imgSrc}
            alt={imgAlt}
            className="image"
            style={animProps}
          />

          <LinkArrow className="link" style={animProps}>
            <Text variant="subheading" color={color}>
              {linkText}
            </Text>
            <Icon
              name="arrow-right"
              size={Size.SMALL}
              color={color}
              animate={false}
            />
          </LinkArrow>
        </CardContainer>
      </Waypoint>
    </CardLink>
  );
};

export default ShowcaseCard;
