export interface BaseElementProps {
  id?: string;
  className?: string;

  style?: React.CSSProperties;

  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onAnimationEnd?: () => void;
}
