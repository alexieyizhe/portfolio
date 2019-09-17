import React from "react";
import styled from "styled-components";

import Text, { TextProps } from "~components/Text";

export interface LinkProps extends TextProps {
  newTab?: boolean;
  to: string;

  noAnim?: boolean;
}

export const UnstyledLink = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
`;

const Container = styled(UnstyledLink)`
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
  }
`;

export const BottomLineText = styled(Text)`
  &:before {
    content: "";
    position: absolute;

    width: 100%;
    height: 3px;
    bottom: -4px;
    left: 0;

    opacity: 0.25;
    background-color: ${({ theme, color = "" }) =>
      theme.color[color] || color || "black"};

    visibility: hidden;
    transform: scaleX(0);
    transition: all 150ms ease 0s;
  }

  &:focus:not(.no-anim):before,
  &:hover:not(.no-anim):before {
    visibility: visible;
    transform: scaleX(1);
  }
`;
// TODO: add gatsby link to allow for better internal linking

const Link: React.FC<LinkProps> = ({
  id,
  className,
  newTab,
  to,
  children,
  color,
  noAnim,
  as, // eslint-disable-line
  variant,
  ...rest
}) => (
  <Container
    id={id}
    className={className}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : ""}
    href={to}
    tabIndex={0}
    color={color}
    {...rest}
  >
    <BottomLineText
      className={noAnim ? "no-anim" : ""}
      color={color}
      variant={variant}
    >
      {children}
    </BottomLineText>
  </Container>
);

export default Link;
