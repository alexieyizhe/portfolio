import { FC, memo } from 'react';
import { styled } from 'goober';

import { Link, Text } from 'components/core';
import { LINKS } from 'services/copy';
import { onClickListeners } from 'services/utils';
import { useSiteStore } from 'services/store';

const Container = styled('footer')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin: 0 0 2em 0;

  & > * {
    margin: 0 6px;
  }
`;

const Footer: FC = memo(() => {
  const displayedSection = useSiteStore((state) => state.displayedSection);
  const toggleDisplayedSection = useSiteStore(
    (state) => state.toggleDisplayedSection
  );

  return (
    <Container>
      {LINKS.map(({ label, href, title }) => (
        <Text>
          <Link href={href} newTab title={title}>
            {label}
          </Link>
        </Text>
      ))}
      <Text>
        <Link
          {...onClickListeners(() => toggleDisplayedSection())}
          role="button"
          tabIndex={0}
        >
          {displayedSection === 'about' ? 'my work' : 'about me'}
        </Link>
      </Text>
    </Container>
  );
});

export default Footer;
