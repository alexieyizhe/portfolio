export interface BaseElementProps {
  id?: string;
  className?: string;

  style?: React.CSSProperties;

  onClick?: () => void;
}
