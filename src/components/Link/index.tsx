import React from "react";
import styled from "styled-components";

import Text, { TextProps } from "~components/Text";
import Icon, { IconProps } from "~components/Icon";

export interface LinkProps
  extends TextProps,
    Pick<IconProps, Exclude<keyof IconProps, "name">> {
  newTab?: boolean;
  to: string;

  iconPos?: "left" | "right"; // if specified, `iconName` must be specified
  iconName?: string;

  noAnim?: boolean;
}

const UnstyledLink = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
`;

const Container = styled(UnstyledLink)<{ iconPos: "left" | "right" }>`
  display: flex;
  flex-direction: ${({ iconPos }) =>
    iconPos === "left" ? "row-reverse" : "row"};
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  & > *:nth-child(2) {
    margin-left: ${({ iconPos }) => (iconPos === "left" ? "0" : "4px")};
    margin-right: ${({ iconPos }) => (iconPos === "left" ? "4px" : "0")};
  }

  &:focus,
  &:hover {
    outline: none;
  }
`;

const TextContainer = styled.span`
  position: relative;
`;

const BottomLineText = styled(Text)`
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
  iconPos = "right",
  iconName,
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
    iconPos={iconPos}
    {...rest}
  >
    <TextContainer>
      <BottomLineText
        className={noAnim ? "no-anim" : ""}
        color={color}
        variant={variant}
      >
        {children}
      </BottomLineText>
    </TextContainer>

    {iconName && (
      <Icon name={iconName} color={color} animate={false} {...rest} />
    )}
  </Container>
);

export { UnstyledLink, BottomLineText };
export default Link;
