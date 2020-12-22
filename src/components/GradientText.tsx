import { FC, memo } from 'react';

type TGradientTextProps = { fallbackColor: string; gradient: string };

const GradientText: FC<TGradientTextProps> = memo(
  ({ fallbackColor, gradient, children }) => {
    return (
      // goober's dynamic props causes extraneous re-renders which affects our text-loop animation, so inline styles here
      <span
        style={{
          color: fallbackColor,
          background: gradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </span>
    );
  }
);

export default GradientText;
