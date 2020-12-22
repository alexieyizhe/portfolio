import { FC, useLayoutEffect } from 'react';
import { styled } from 'goober';

import { useSiteStore } from 'services/store';
import { screen } from 'services/utils';

import About from './About';
import Work from './Work';

const Container = styled('div')`
  margin: 1.6em 0 1em 0;
  position: relative;
  display: grid;
  justify-content: center;
  align-items: start;

  & .dynamic {
    font-weight: 500;
  }

  ${screen.mobile} {
    margin: 1em 0 0 0;
  }
`;

const Subcontainer = styled('div')`
  grid-column: 1;
  grid-row: 1;

  transition: opacity 600ms;
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
  }
`;

const Bio: FC = () => {
  const { dispatch, displayedSection } = useSiteStore('displayedSection');

  useLayoutEffect(() => {
    if (process.browser && window.location.pathname === '/work') {
      dispatch('section/set', 'work');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Subcontainer aria-hidden={displayedSection !== 'about'}>
        <About />
      </Subcontainer>
      <Subcontainer aria-hidden={displayedSection !== 'work'}>
        <Work />
      </Subcontainer>
    </Container>
  );
};

export default Bio;
