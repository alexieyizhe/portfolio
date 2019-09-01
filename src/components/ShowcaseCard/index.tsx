import React from "react";
import styled from "styled-components";

import Card, { CardProps, CARD_VERT_PADDING } from "~components/Card";
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

const CardContainer = styled(Card)`
  display: grid;
  grid-template-rows: 50px 200px 50px;
  grid-template-columns: 40% 40%;
  grid-column-gap: 20%;
  grid-template-areas:
    "subheading image"
    "title ."
    ". link";

  position: relative;
  width: 100%;
  height: auto;

  & * {
    text-decoration: none;
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
  grid-area: subheading;

  position: relative;
  top: -${CARD_VERT_PADDING * 2}px;
`;

const Title = styled(Text)`
  grid-area: title;

  position: relative;
  top: -${CARD_VERT_PADDING * 2}px;
`;

const DetailsLink = styled(Text)`
  grid-area: link;
  justify-self: end;
  align-self: end;

  position: relative;
  bottom: -${CARD_VERT_PADDING * 2}px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const ShowcaseImage = styled.img`
  grid-area: image;
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
  particles, // TODO: integrate particles
}) => (
  <UnstyledLink href={linkHref}>
    <CardContainer>
      <Subheading variant="subheading">{subtitle}</Subheading>
      <Title variant="heading">{title}</Title>
      <ShowcaseImage src={imgSrc} alt={imgAlt} />
      <DetailsLink variant="subheading" className="link">
        {linkText}
      </DetailsLink>
    </CardContainer>
  </UnstyledLink>
);

export default ShowcaseCard;
