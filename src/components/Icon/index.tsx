import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  ArrowLeft,
  Download,
  GitHub,
  FileText,
  Send,
  Icon as FeatherIconType,
} from "react-feather";

import { Size } from "~theme/index";
import { BaseElementProps } from "~utils/types/BaseElementProps";

export interface IconProps extends BaseElementProps {
  name: string;
  color?: string;
  size?: Size | number;
}

const ICON_DICTIONARY: { [name: string]: FeatherIconType } = {
  "arrow-left": ArrowLeft,
  download: Download,
  github: GitHub,
  "file-text": FileText,
  send: Send,
};

const DEFAULT_ICON_SIZE = Size.MEDIUM;

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
  color,
  onClick,
}) => {
  const { fontSize, color: themeColors } = useContext(ThemeContext);

  const IconComponent = ICON_DICTIONARY[name];
  const iconSize = size ? fontSize[size] || size : fontSize[DEFAULT_ICON_SIZE];
  const iconColor = color ? themeColors[color] || color : themeColors.black;

  return IconComponent ? (
    <IconComponent
      className={className}
      size={iconSize}
      color={iconColor}
      onClick={onClick}
    />
  ) : (
    <NoIconFound
      name={name}
      size={iconSize}
      color={iconColor}
      className={`unknown--icon--${name} ${className || ""}`}
    />
  );
};

export default Icon;
