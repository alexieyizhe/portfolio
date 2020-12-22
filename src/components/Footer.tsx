import { FC, memo } from 'react';
import { styled } from 'goober';

import { LINKS } from 'services/copy';
import { Link, Text } from 'components/core';
import { useSiteStore } from 'services/store';

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
  const { dispatch, displayedSection } = useSiteStore('displayedSection');
  return (
    <Container>
      {LINKS.map(({ label, href }) => (
        <Link href={href} newTab>
          <Text>{label}</Text>
        </Link>
      ))}
      <Link onClick={() => dispatch('section/toggle')}>
        <Text>{displayedSection === 'about' ? 'my work' : 'about me'}</Text>
      </Link>
    </Container>
  );
});

export default Footer;
