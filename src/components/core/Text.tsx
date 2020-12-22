import { styled } from 'goober';

// the `as` prop isn't typed by Goober for some reason, but it exists (https://github.com/cristianbote/goober#using-as-prop)
type TTextProps = {
  as?: keyof JSX.IntrinsicElements;
  bold?: boolean;
  italic?: boolean;
};

export const Text = styled<TTextProps>('span')`
  font-size: 16px;
  font-family: 'Space Grotesk Variable', 'Space Grotesk', -apple-system,
    BlinkMacSystemFont, Roboto, Ubuntu, 'Helvetica Neue', sans-serif;

  ${({ bold }) => (bold ? `font-weight: 500;` : '')}
  ${({ italic }) => (italic ? `font-style: italic;` : '')}
`;
