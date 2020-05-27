import React, { useContext, useMemo, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { animated } from "react-spring";

import Icon, { IconProps } from "~components/Icon";
import { LinkProps, UnstyledLink } from "~components/Link";
import Text from "~components/Text";

import { Size } from "~types/Size";

interface IconLinkProps
  extends Omit<IconProps, "name">, // rename `name` to `iconName`
    LinkProps {
  iconName: string;
}

const Container = styled(animated(UnstyledLink))`
  position: relative;
  margin-right: 10px;

  display: inline-grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  & > * {
    grid-row: 1;
    grid-column: 1;
  }

  & > .IconLink--Icon {
    opacity: 0.4;
  }

  transition: all 200ms;
  &.hover ~ * {
    transform: translateX(65px);
  }
`;

const PopoutLink = styled.span`
  position: absolute;

  transition: all 200ms;
  opacity: 0;
  transform-origin: center left;

  &.hover {
    opacity: 1;
    transform: translateX(25px);
  }
`;

const IconLink: React.FC<IconLinkProps> = ({
  iconName,
  children,
  color,
  size: iconSize,
  mobileSize: iconMobileSize,
  ...rest
}) => {
  const [isHovering, setHovering] = useState(false);
  const { fontSize } = useContext(ThemeContext);
  const linkTextSize = useMemo(
    () =>
      (typeof iconSize === "number"
        ? iconSize
        : fontSize[iconSize || Size.MEDIUM]) - 15,
    [fontSize, iconSize]
  );

  return (
    <Container
      className={isHovering ? "hover" : ""}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      {...rest}
    >
      <Icon
        className="IconLink--Icon"
        name={iconName}
        color={color}
        size={iconSize}
        mobileSize={iconMobileSize}
        hover={isHovering}
      />
      <PopoutLink className={isHovering ? "hover" : ""}>
        <Text
          size={linkTextSize}
          color="greyMedium"
          as="span"
          heading
          {...rest}
        >
          {children}
        </Text>
      </PopoutLink>
    </Container>
  );
};

export default IconLink;
