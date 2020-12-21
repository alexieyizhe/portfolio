import { FC } from 'react';
import { styled } from 'goober';

import { useSiteContext } from 'services/site/context';

import About from './About';
import Work from './Work';

const Container = styled('div')`
  margin-top: 1.6em;

  & .dynamic {
    font-weight: 500;
  }

  width: 100%;
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Subcontainer = styled('div')`
  width: 100%;

  grid-column: 1;
  grid-row: 1;

  transition: opacity 600ms;
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
  }
`;

const Bio: FC = () => {
  const { displayedSection } = useSiteContext();

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
