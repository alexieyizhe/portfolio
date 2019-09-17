import React, { useContext, useState, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import SvgLines from "react-mt-svg-lines"; // ES6+
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  Download,
  GitHub,
  Linkedin,
  FileText,
  Send,
  Icon as FeatherIconType,
} from "react-feather";

import { Size } from "~types/Size";
import { BaseElementProps } from "~types/BaseElementProps";
import { useWindowWidth } from "~utils/hooks/useWindowWidth";
import { deviceBreakpoints } from "~theme/breakpoints";

export interface IconProps extends BaseElementProps {
  name: string;
  animate?: boolean;
  animateType?: number | true; // if not specified, will animate on hover
  color?: string;
  size?: Size | number;
  mobileSize?: Size | number;

  hover?: boolean; // used to override hover
}

const ICON_DICTIONARY: { [name: string]: FeatherIconType } = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevrons-up": ChevronsUp,
  download: Download,
  github: GitHub,
  linkedin: Linkedin,
  "file-text": FileText,
  send: Send,
};

const DEFAULT_ICON_SIZE = Size.MEDIUM;

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
  onClick,
}) => {
  const windowWidth = useWindowWidth();
  const sizeForWidth =
    windowWidth < deviceBreakpoints.largeMobile && mobileSize
      ? mobileSize
      : size;

  const [isHovering, setHovering] = useState(false);
  const { fontSize, color: themeColors } = useContext(ThemeContext);

  const IconComponent = ICON_DICTIONARY[name];

  const iconSize = sizeForWidth
    ? fontSize[sizeForWidth] || sizeForWidth
    : fontSize[DEFAULT_ICON_SIZE];
  const iconColor = color ? themeColors[color] || color : themeColors.black;

  const RenderedComponent = useMemo(
    () =>
      IconComponent ? (
        <Container
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={onClick}
          className={className}
        >
          <IconComponent
            size={iconSize}
            color={animate ? themeColors.greyMedium : iconColor}
          />
          {animate && (
            <SvgLines
              animate={animateType || (isHovering || hover) || "hide"}
              duration={200}
            >
              <IconComponent size={iconSize} color={iconColor} />
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
      IconComponent,
      animate,
      animateType,
      className,
      hover,
      iconColor,
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
