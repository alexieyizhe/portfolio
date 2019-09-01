import React from "react";
import styled from "styled-components";

import Card, { CardProps } from "~components/Card";
import Text from "~components/Text";
import Link from "~components/Link";

interface ContentCardProps extends CardProps {
  title?: string;
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;
  particles?: boolean;
}

const CardContainer = styled(Card)`
  display: inline-flex;
  flex-direction: column;

  position: relative;
  width: auto;
  height: auto;
  overflow: hidden;

  & > .title {
    justify-self: flex-start;
    align-self: flex-start;
  }

  & > .image {
    justify-self: flex-start;
    align-self: center;
  }

  & > .body {
    justify-self: flex-start;
    align-self: flex-start;
  }

  & > .link {
    justify-self: flex-end;
    align-self: flex-start;

    margin-top: 1em;
  }
`;

const CardImage = styled.img`
  position: relative;
  width: calc(100% + 60px);
  top: -20px;
`;

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  className,
  title,
  imgSrc,
  imgAlt,
  linkText,
  linkHref,
  particles, // TODO: add particles in
  children,
}) => (
  <CardContainer id={id} className={className}>
    {imgSrc && <CardImage className="image" src={imgSrc} alt={imgAlt} />}

    {title && (
      <Text className="title" variant="subheading">
        {title}
      </Text>
    )}

    {React.Children.count(children) ? (
      <div className="body">{children}</div>
    ) : null}

    {linkText && (
      <Link className="link" variant="body" bold href={linkHref || ""}>
        {linkText}
      </Link>
    )}
  </CardContainer>
);

export default ContentCard;
