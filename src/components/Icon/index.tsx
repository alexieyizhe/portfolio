import React, { useContext, useState, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import SvgLines from "react-mt-svg-lines";

import { Size } from "~types/Size";
import { BaseElementProps } from "~types/BaseElementProps";

import { useWindowWidth } from "~utils/hooks/useWindowWidth";
import { deviceBreakpoints } from "~theme/breakpoints";

import icons from "./icons";

export interface IconProps extends BaseElementProps {
  name: string;
  animate?: boolean;
  animateType?: number | true; // if not specified, will animate on hover
  animateDuration?: number;
  color?: string;
  size?: Size | number;
  mobileSize?: Size | number;

  hover?: boolean; // used to override hover
}

const DEFAULT_ICON_SIZE = Size.MEDIUM;
const DEFAULT_ANIM_DURATION = 600;

const Container = styled.span`
  display: inline-grid;
  justify-content: center;
  align-items: center;

  & > * {
    grid-row: 1;
    grid-column: 1;
  }

  & > .mt-svg {
    display: grid;
    justify-content: center;
    align-items: center;
  }
`;

const NoIconFound = styled.span<IconProps>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.card}px;
`;

const Icon: React.FC<IconProps> = ({
  className,
  name,
  size,
  mobileSize,
  color,
  animate = true,
  hover = false,
  animateType,
  animateDuration,
  onClick,
}) => {
  const windowWidth = useWindowWidth();
  const sizeForWidth =
    windowWidth < deviceBreakpoints.largeMobile && mobileSize
      ? mobileSize
      : size;

  const [isHovering, setHovering] = useState(false);
  const { fontSize, color: themeColors } = useContext(ThemeContext);

  const iconElements = icons[name];

  const iconSize = sizeForWidth
    ? fontSize[sizeForWidth] || sizeForWidth
    : fontSize[DEFAULT_ICON_SIZE];
  const iconColor = color ? themeColors[color] || color : themeColors.black;

  const RenderedComponent = useMemo(
    () =>
      iconElements ? (
        <Container
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={onClick}
          className={className}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={animate ? themeColors.greyMedium : iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {iconElements}
          </svg>
          {animate && (
            <SvgLines
              animate={animateType || (isHovering || hover) || "hide"}
              duration={animateDuration || DEFAULT_ANIM_DURATION}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {iconElements}
              </svg>
            </SvgLines>
          )}
        </Container>
      ) : (
        <NoIconFound
          name={name}
          size={iconSize}
          color={iconColor}
          className={`Icon--Unknown--${name} ${className || ""}`}
        />
      ),
    [
      animate,
      animateDuration,
      animateType,
      className,
      hover,
      iconColor,
      iconElements,
      iconSize,
      isHovering,
      name,
      onClick,
      themeColors.greyMedium,
    ]
  );

  return RenderedComponent;
};

export default Icon;
