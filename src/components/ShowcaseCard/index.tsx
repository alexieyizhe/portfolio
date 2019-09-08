import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";

import Card, { CARD_VERT_PADDING } from "~components/Card";
import Icon from "~components/Icon";
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

const showcaseCardParticleInfo: ParticleInfo[] = [
  { x: 60, y: 94, s: 0.8, color: "red" },
  { x: 23, y: 96, s: 0.4, color: "blue" },
  { x: -2, y: 28, s: 0.5, color: "purple" },
  { x: 98, y: 60, s: 0.6, color: "green" },
  { x: 45, y: -2, s: 0.75, color: "red" },
];

const CardContainer = styled(Card)<{ show?: boolean }>`
  display: grid;
  grid-template-rows: 50px 180px 50px;
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

  & > * {
    transition: opacity 250ms, transform 500ms;
    opacity: ${({ show }) => (show ? 1 : 0)};
    transform: translateY(${({ show }) => (show ? 0 : "150px")});
  }

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

  transition: transform 150ms ease-in;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-5px);
  }
`;

const Subheading = styled(Text)`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const Title = styled(Text)`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const ShowcaseImage = styled.img`
  max-width: 100%;

  position: relative;
  top: -${CARD_VERT_PADDING * 3}px;
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
  ...rest
}) => {
  const [cardVisible, setCardVisible] = useState(false);

  const onCardEnter = useCallback(() => setCardVisible(true), []);
  const onCardLeave = useCallback(() => setCardVisible(false), []);

  return (
    <UnstyledLink href={linkHref}>
      <Waypoint onEnter={onCardEnter} onLeave={onCardLeave}>
        <CardContainer show={cardVisible} {...rest}>
          <Subheading variant="subheading" className="subheading">
            {subtitle}
          </Subheading>

          <Title variant="heading" className="title">
            {title}
          </Title>

          <ShowcaseImage src={imgSrc} alt={imgAlt} className="image" />

          <Link
            variant="subheading"
            className="link"
            iconName="arrow-right"
            href=""
          >
            {linkText}
          </Link>

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
