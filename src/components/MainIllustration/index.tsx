import { styled } from 'goober';

import Me from './Me';
import Room from './Room';

const Container = styled('div')`
  position: relative;
  display: flex;

  /* square viewBox, so width alone sizes the scene */
  & #illustration-room {
    width: 100%;
    height: auto;
  }
`;

/**
 * Me is nested inside the room's own coordinate space rather than positioned
 * with CSS, so the two stay locked together at any size. The numbers below are
 * room units (the viewBox is 500x500): they seat him on the front edge of the
 * rug, to the right of the cat.
 */
const ME = { x: 235, y: 322, width: 125, height: 127 };

const MainIllustration = () => {
  return (
    <Container>
      <svg viewBox="0 0 500 500" id="illustration-room">
        <Room />
        <Me {...ME} />
      </svg>
    </Container>
  );
};

export default MainIllustration;
