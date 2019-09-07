import React from "react";
import styled from "styled-components";

import Card, { CARD_HORIZ_PADDING, CARD_VERT_PADDING } from "~components/Card";
import { ParticleGroupProps } from "~components/ParticleGroup";
import Text from "~components/Text";
import Link from "~components/Link";
import Icon from "~components/Icon";

interface ContentCardProps extends ParticleGroupProps {
  title?: string;
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;

  // TODO: add particle positions
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
    margin-bottom: 10px;
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

    display: flex;
    align-items: center;

    margin-top: 1em;
  }
`;

const CardImage = styled.img`
  position: relative;
  width: calc(100% + ${CARD_HORIZ_PADDING * 2}px);
  top: -${CARD_VERT_PADDING}px;
`;

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  className,
  title,
  imgSrc,
  imgAlt,
  linkText,
  linkHref,
  children,
  ...rest
}) => (
  <CardContainer id={id} className={className} {...rest}>
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
      <div className="link">
        <Link variant="body" bold href={linkHref || ""} as="span">
          {linkText}
        </Link>
        <Icon name="arrow-right" />
      </div>
    )}
  </CardContainer>
);

export default ContentCard;
