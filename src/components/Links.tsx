import { FC, memo } from 'react';
import { styled } from 'goober';

import { LINKS } from 'services/site/copy';
import { Link, Text } from 'components/core';

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

const Links: FC = memo(() => {
  return (
    <Container>
      {LINKS.map(({ label, href }) => (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Text>{label}</Text>
        </Link>
      ))}
    </Container>
  );
});

export default Links;
