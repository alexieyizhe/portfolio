import { FC } from 'react';
import { styled } from 'goober';

import { screen } from 'services/style';
import { useSiteStore } from 'services/store';

import About from './About';
import Work from './Work';

/**
 * The two sections share a column, and whichever isn't showing collapses to a
 * zero-height row, so the page only ever reserves the height of what's on
 * screen rather than of the longer of the two. Animating grid-template-rows
 * instead of height lets that collapse ease alongside the cross-fade.
 */
const Container = styled('div')`
  /* Runs wider than the column the rest of the page sits in. At 510px the
     opening paragraph strands "software development." on a line of its own,
     and text-wrap: pretty only rescues a last line of a single word. This
     matches the scene's own 122%, so the copy squares up under the
     illustration. */
  width: 122%;
  margin: 1em -11%;
  position: relative;
  display: grid;
  justify-content: center;
  text-align: center;
  transition: grid-template-rows 600ms;

  ${screen.mobile} {
    width: 100%;
    margin: 1em 0 0 0;
  }
`;

const Subcontainer = styled('div')`
  grid-column: 1;
  min-height: 0;
  overflow: hidden;

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
    <Container
      style={{ gridTemplateRows: showingWork ? '0fr 1fr' : '1fr 0fr' }}
    >
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
