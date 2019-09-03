import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";

import Icon, { IconProps } from "~components/Icon";
import Link, { LinkProps } from "~components/Link";
import { Size } from "~src/theme";

interface IconLinkProps extends IconProps, LinkProps {}

const Container = styled.span`
  display: inline-flex;
  align-items: center;

  & > .IconLink--Icon {
    opacity: 0.6;
  }

  & > .IconLink--Link {
    position: relative;
    left: -15px;
  }
`;

const IconLink: React.FC<IconLinkProps> = ({
  name,
  children,
  color,
  size: iconSize,
  ...rest
}) => {
  const { fontSize } = useContext(ThemeContext);
  const linkTextSize = useMemo(
    () =>
      (typeof iconSize === "number"
        ? iconSize
        : fontSize[iconSize || Size.MEDIUM]) - 10,
    [fontSize, iconSize]
  );

  return (
    <Container>
      <Icon
        className="IconLink--Icon"
        name={name}
        color={color}
        size={iconSize}
      />
      <Link
        className="IconLink--Link"
        size={linkTextSize}
        color="greyMedium"
        as="span"
        {...rest}
      >
        {children}
      </Link>
    </Container>
  );
};

export default IconLink;
