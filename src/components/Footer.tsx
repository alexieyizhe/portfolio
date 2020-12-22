import { FC, memo } from 'react';
import { styled } from 'goober';

import { LINKS } from 'services/copy';
import { Link, Text } from 'components/core';
import { useStore } from 'services/store';

const Container = styled('footer')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin: 0 0 2em 0;

  & > a {
    margin: 0 6px;
  }
`;

const Footer: FC = memo(() => {
  const { dispatch, displayedSection } = useStore('displayedSection');
  return (
    <Container>
      {LINKS.map(({ label, href }) => (
        <Link href={href} newTab>
          <Text>{label}</Text>
        </Link>
      ))}
      <Link
        onClick={() => dispatch('section/toggle')}
        onKeyUp={(e) => (e.key === 'Enter' ? dispatch('section/toggle') : null)}
        role="button"
        tabIndex={0}
      >
        <Text>{displayedSection === 'about' ? 'my work' : 'about me'}</Text>
      </Link>
    </Container>
  );
});

export default Footer;
