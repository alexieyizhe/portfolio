import React, { useMemo } from "react";
import styled from "styled-components";

import { Size } from "~types/Size";
import { BaseElementProps } from "~src/types/BaseElementProps";

export interface TextProps extends BaseElementProps {
  /**
   * **Props that affect/augment styling of the Text component.**
   */
  size?: Size | number;
  color?: string;
  lineHeight?: Size;
  align?: "left" | "right" | "center" | "justify";
  heading?: boolean; // affects font family
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;

  /**
   * What HTML element type to use to render the component.
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

  /**
   * Specifies a predefined set of styles to apply to the Text component.
   * If `variant` is supplied, its styles can be overriden by specifying individual
   * styles as props.
   */
  variant?: string;
}

interface VariantList {
  [variant: string]: Partial<TextProps>;
}

/**
 * Predefined variants for the Text component. Ensures consistency across multiple
 * parts of the site using the same style (i.e. different pages using Body text).
 */
const TEXT_VARIANTS: VariantList = {
  heading: {
    size: Size.XLARGE,
    bold: true,
    heading: true,
  },
  subheading: {
    size: Size.MEDIUM,
    bold: true,
    heading: true,
  },
  body: {
    size: Size.SMALL,
  },
};

const BaseText = styled.span<TextProps>`
  font-family: ${({ theme, heading }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ theme, size = Size.MEDIUM }) =>
    theme.fontSize[size] || size}px;

  color: ${({ theme, color = "" }) => theme.color[color] || color || "inherit"};
  text-decoration-color: ${({ theme, color = "" }) =>
    theme.color[color] || color || "inherit"};
  line-height: ${({ theme, size = Size.MEDIUM, lineHeight }) =>
    theme.lineHeight[lineHeight || size]};
  text-align: ${({ align = "left" }) => align};

  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ bold }) => bold && `font-weight: bold;`}
  ${({ italic }) => italic && `font-style: italic;`}

  margin: 0;
  padding: 0;
`;

const Text: React.FC<TextProps> = ({
  id,
  className,
  as = "p",
  variant = "",
  children,
  ...rest
}) => {
  /**
   * Calculate the styles that will be applied to the Text component from the providede props.
   * If a variant is supplied, use those styles, and override with other props.
   * Otherwise, only apply styles specified in props.
   * Defaults are specified in `BaseText`.
   */
  const stylesToApply = useMemo(() => {
    const stylesFromVariant =
      variant in TEXT_VARIANTS ? TEXT_VARIANTS[variant] : {};

    return {
      ...stylesFromVariant,
      ...rest,
    };
  }, [rest, variant]);

  return (
    <BaseText as={as} id={id} className={className} {...stylesToApply}>
      {children}
    </BaseText>
  );
};

export default Text;
