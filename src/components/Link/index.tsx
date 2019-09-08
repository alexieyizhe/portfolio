import React from "react";
import styled from "styled-components";

import Text, { TextProps } from "~components/Text";
import Icon, { IconProps } from "~components/Icon";

export interface LinkProps
  extends TextProps,
    Pick<IconProps, Exclude<keyof IconProps, "name">> {
  newTab?: boolean;
  href: string;

  iconPos?: "left" | "right"; // if specified, `iconName` must be specified
  iconName?: string;

  hover?: boolean; // used to override hover
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

  & > *:nth-child(2) {
    margin-left: ${({ iconPos }) => (iconPos === "left" ? "0" : "4px")};
    margin-right: ${({ iconPos }) => (iconPos === "left" ? "4px" : "0")};
  }
`;

const TextContainer = styled.span`
  position: relative;
`;

const BottomLineText = styled(Text)<{ hover: boolean }>`
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

  &:focus,
  &:hover,
  &.hover {
    outline: none;

    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
`;
// TODO: add gatsby link to allow for better internal linking

const Link: React.FC<LinkProps> = ({
  id,
  className,
  newTab,
  href,
  iconPos = "right",
  iconName,
  hover = false,
  children,
  color,
  as,
  ...rest
}) => (
  <Container
    id={id}
    className={className}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : ""}
    href={href}
    color={color}
    iconPos={iconPos}
  >
    <TextContainer>
      <BottomLineText
        className={hover ? "hover" : ""}
        color={color}
        hover={hover}
        {...rest}
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
