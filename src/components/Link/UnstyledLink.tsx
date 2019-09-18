import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import { TextProps } from "~components/Text";
import { themeConstants } from "~theme/constants";

const randomColors = [
  themeConstants.color.blue,
  themeConstants.color.darkBlue,
  themeConstants.color.green,
  themeConstants.color.purple,
  themeConstants.color.red,
];
const getRandomColor = () =>
  randomColors[Math.floor(Math.random() * randomColors.length)];

export interface LinkProps extends TextProps {
  newTab?: boolean;
  to?: string;

  noAnim?: boolean;

  transitionDir?: "left" | "up" | "right" | "down";
}

const unstyledLinkStyles = css`
  display: inline-block;

  position: relative;
  text-decoration: none;
  color: inherit;
`;

export const Unstyled = styled.a`
  ${unstyledLinkStyles}
`;

export const UnstyledGatsby = styled(AniLink)`
  ${unstyledLinkStyles}
`;

const UnstyledLink: React.FC<LinkProps> = ({
  to = "",
  newTab,
  children,
  transitionDir = "left",
  ...rest
}) => {
  const isInternalLink = useMemo(() => /^\/(?!\/)/.test(to), [to]);
  const randomColor = useMemo(() => getRandomColor(), []);

  if (isInternalLink) {
    return (
      <UnstyledGatsby
        to={to}
        tabIndex={0}
        cover
        direction={transitionDir}
        bg={randomColor}
        {...rest}
      >
        {children}
      </UnstyledGatsby>
    );
  } else {
    return (
      <Unstyled
        tabIndex={0}
        href={to}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : ""}
        {...rest}
      >
        {children}
      </Unstyled>
    );
  }
};

export default UnstyledLink;
