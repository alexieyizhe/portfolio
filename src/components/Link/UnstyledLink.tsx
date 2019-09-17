import React, { useMemo } from "react";
import styled from "styled-components";
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
}

export const Unstyled = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
`;

export const UnstyledGatsby = styled(AniLink)`
  position: relative;
  text-decoration: none;
  color: inherit;
`;

const UnstyledLink: React.FC<LinkProps> = ({
  to = "",
  newTab,
  children,
  ...rest
}) => {
  const isInternalLink = useMemo(() => /^\/(?!\/)/.test(to), [to]);

  const randomColor = useMemo(() => getRandomColor(), []);

  if (isInternalLink) {
    return (
      <UnstyledGatsby to={to} cover bg={randomColor} {...rest}>
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
