import React from "react";
import styled from "styled-components";

import Text, { TextProps } from "~components/Text";

export interface LinkProps extends TextProps {
  newTab?: boolean;
  href: string;
  iconPos?: "left" | "right";
}

export const UnstyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const BaseStyleLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

// TODO: add gatsby link to allow for better internal linking

const Link: React.FC<LinkProps> = ({
  id,
  className,
  newTab,
  href,
  children,
  ...rest
}) => (
  <BaseStyleLink
    id={id}
    className={className}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : ""}
    href={href}
  >
    <Text {...rest}>{children}</Text>
  </BaseStyleLink>
);

export default Link;
