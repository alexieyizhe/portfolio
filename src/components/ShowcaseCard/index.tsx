import React from "react";
import styled from "styled-components";

import Card, { CardProps, CARD_VERT_PADDING } from "~components/Card";
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

const CardContainer = styled(Card)`
  display: grid;
  grid-template-rows: 50px 180px 50px;
  grid-template-columns: 40% 30%;
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

  transition: transform 150ms ease-in;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-5px);
  }

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
  particles, // TODO: integrate particles
}) => (
  <UnstyledLink href={linkHref}>
    <CardContainer>
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
