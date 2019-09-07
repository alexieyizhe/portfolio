import React from "react";
import styled from "styled-components";

import Card, {
  CardProps,
  CARD_VERT_PADDING,
  ParticleInfo,
} from "~components/Card";
import Icon from "~components/Icon";
import Text from "~components/Text";
import { UnstyledLink } from "~components/Link";

export interface ShowcaseCardProps extends CardProps {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;
  particles?: boolean;
}

const particlesInfo: ParticleInfo[] = [
  { x: 60, y: 94, s: 0.8, color: "red" },
  { x: 23, y: 96, s: 0.4, color: "blue" },
  { x: -2, y: 28, s: 0.5, color: "purple" },
  { x: 98, y: 60, s: 0.6, color: "green" },
  { x: 45, y: -2, s: 0.75, color: "red" },
];

const CardContainer = styled(Card)`
  & .Card--ContentContainer {
    display: grid;
    grid-template-rows: 50px 180px 50px;
    grid-template-columns: 40% 35%;
    grid-column-gap: 25%;
    grid-template-areas:
      "subheading image"
      "title ."
      ". link";

    position: relative;
    width: 100%;
    max-width: 2000px;
    height: auto;
    margin: 100px 0;

    & > .title {
      grid-area: title;
    }

    & > .subheading {
      grid-area: subheading;
    }

    & > .link {
      grid-area: link;
      display: flex;
      align-items: center;
      justify-self: end;
      align-self: end;

      position: relative;
      bottom: -${CARD_VERT_PADDING * 1.5}px;
    }

    & > .image {
      grid-area: image;
    }
  }

  transition: transform 150ms ease-in;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-5px);
  }
`; // TODO: refine this hover animation

const Subheading = styled(Text)`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const Title = styled(Text)`
  position: relative;
  top: -${CARD_VERT_PADDING * 1.5}px;
`;

const DetailsLink = styled(Text)`
  position: relative;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
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
}) => (
  <UnstyledLink href={linkHref}>
    <CardContainer
      particles={particles}
      particlesInfo={particles ? particlesInfo : undefined}
      customParticle={customParticle}
    >
      <Subheading variant="subheading" className="subheading">
        {subtitle}
      </Subheading>

      <Title variant="heading" className="title">
        {title}
      </Title>

      <ShowcaseImage src={imgSrc} alt={imgAlt} className="image" />

      <div className="link">
        <DetailsLink variant="subheading">{linkText}</DetailsLink>
        <Icon name="arrow-right" />
      </div>
    </CardContainer>
  </UnstyledLink>
);

export default ShowcaseCard;
