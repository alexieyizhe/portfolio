import React, { useContext, useMemo, useState } from "react";
import styled, { ThemeContext } from "styled-components";

import Icon, { IconProps } from "~components/Icon";
import Link, { LinkProps } from "~components/Link";
import { Size } from "~types/Size";

interface IconLinkProps
  extends Pick<IconProps, Exclude<keyof IconProps, "name">>, // rename `name` to `iconName`
    LinkProps {
  iconName: string;
}

const Container = styled.span`
  position: relative;
  margin-right: 10px;

  display: inline-grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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
    >
      <Icon
        className="IconLink--Icon"
        name={iconName}
        color={color}
        size={iconSize}
        hover={isHovering}
      />
      <PopoutLink className={isHovering ? "hover" : ""}>
        <Link size={linkTextSize} color="greyMedium" as="span" noAnim {...rest}>
          {children}
        </Link>
      </PopoutLink>
    </Container>
  );
};

export default IconLink;
