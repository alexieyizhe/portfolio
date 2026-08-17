import { FC } from 'react';
import { styled } from 'goober';

import { screen } from 'services/style';
import { useSiteStore } from 'services/store';

import About from './About';
import Work from './Work';

/**
 * Both sections occupy the same cell, so the column stands at the height of the
 * longer of the two whichever one is showing. Sizing it to the visible section
 * instead would grow the page on the way into Work, which on a window that only
 * just fits is enough to bring on a scrollbar and shunt the whole page sideways
 * as it appears. Now nothing moves but the words.
 */
const Container = styled('div')`
  /* Runs wider than the column the rest of the page sits in. At 510px the
     opening paragraph strands "software development." on a line of its own,
     and text-wrap: pretty only rescues a last line of a single word. This
     matches the scene's own 122%, so the copy squares up under the
     illustration. */
  width: 122%;
  margin: 0.75em -11%;
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* Closer than the browser's 1em, which buys back the height that standing at
     the longer section's height costs. */
  & p {
    margin: 0.75em 0;
  }

  ${screen.mobile} {
    width: 100%;
    margin: 0.75em 0 0 0;
  }
`;

const Subcontainer = styled('div')`
  grid-area: 1 / 1;

  transition: opacity 600ms;
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
  }
`;

const Bio: FC = () => {
  const displayedSection = useSiteStore((state) => state.displayedSection);
  const showingWork = displayedSection === 'work';

  return (
    <Container>
      <Subcontainer aria-hidden={showingWork}>
        <About />
      </Subcontainer>
      <Subcontainer aria-hidden={!showingWork}>
        <Work />
      </Subcontainer>
    </Container>
  );
};

export default Bio;
