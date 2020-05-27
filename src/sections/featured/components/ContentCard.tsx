import React from "react";
import styled from "styled-components";

import Card, { CARD_HORIZ_PADDING, CARD_VERT_PADDING } from "~components/Card";
import Text from "~components/Text";
import Icon from "~components/Icon";
import { UnstyledLink } from "~components/Link";

import { Size } from "~types/Size";
import { BaseElementProps } from "~types/BaseElementProps";

interface ContentCardProps extends BaseElementProps {
  title?: string;
  videoSrc?: string; //link to embed of video
  imgSrc?: string;
  imgAlt?: string;
  linkText?: string;
  linkHref?: string;
}

const CardContainer = styled(Card)<{ linkHref?: string }>`
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

  & > .media {
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
    justify-content: center;

    margin-top: 1em;
  }

  ${({ linkHref }) =>
    linkHref &&
    `
      transition: transform 150ms ease-in; 
      cursor: pointer;
    `}
  &:hover,
  &:focus,
  &:focus-within {
    outline: none;
    ${({ linkHref }) => linkHref && "transform: translateY(-5px);"}
  }
`;

const TopContainer = styled.div`
  position: relative;
  width: calc(100% + ${CARD_HORIZ_PADDING * 2}px);
  top: -${CARD_VERT_PADDING}px;

  & > * {
    max-width: 100%;
  }
`;

const CardLink = styled(UnstyledLink)`
  &:focus {
    outline: none;
  }
`;

const LinkArrow = styled.div`
  & > *:nth-child(2) {
    margin-left: 5px;
  }
`;

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  className,
  title,
  videoSrc,
  imgSrc,
  imgAlt,
  linkText,
  linkHref,
  children,
  ...rest
}) => (
  <CardLink to={linkHref}>
    <CardContainer id={id} className={className} linkHref={linkHref} {...rest}>
      <TopContainer className="media">
        {imgSrc && <img src={imgSrc} alt={imgAlt} />}
        {videoSrc && (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
              src={videoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </TopContainer>

      {title && (
        <Text className="title" variant="subheading">
          {title}
        </Text>
      )}

      {React.Children.count(children) ? (
        <div className="body">{children}</div>
      ) : null}

      {linkText && (
        <LinkArrow className="link">
          <Text variant="body" bold as="span">
            {linkText}
          </Text>
          <Icon name="arrow-right" size={Size.SMALL} animate={false} />
        </LinkArrow>
      )}
    </CardContainer>
  </CardLink>
);

export default ContentCard;
