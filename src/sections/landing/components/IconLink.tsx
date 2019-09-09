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
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  & > .IconLink--Icon {
    opacity: 0.4;
  }

  & > .IconLink--Link {
    position: relative;
    left: -15px;
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
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Icon
        className="IconLink--Icon"
        name={iconName}
        color={color}
        size={iconSize}
        hover={isHovering}
      />
      <Link
        className="IconLink--Link"
        size={linkTextSize}
        color="greyMedium"
        as="span"
        hover={isHovering}
        {...rest}
      >
        {children}
      </Link>
    </Container>
  );
};

export default IconLink;
