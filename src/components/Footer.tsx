import { FC, memo } from 'react';
import { styled } from 'goober';

import { LINKS } from 'services/copy';
import { Link, Text } from 'components/core';
import { useStore } from 'services/store';
import { onClickListeners } from 'services/utils';
import { useDisplayedSection, useShowSection } from 'services/store/new';

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
  const displayedSection = useDisplayedSection();
  const showSection = useShowSection();

  console.log({ displayedSection });

  return (
    <Container>
      {LINKS.map(({ label, href }) => (
        <Text>
          <Link href={href} newTab>
            {label}
          </Link>
        </Text>
      ))}
      <Text>
        <Link
          {...onClickListeners(() => showSection())}
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
