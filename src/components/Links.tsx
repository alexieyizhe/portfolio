import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { LINKS } from 'services/copy/config';
import { Link, Text } from 'components/core';

const Container = styled('footer')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin-top: 1em;

  & > a {
    margin: 0 6px;
  }
`;

const Links: FunctionalComponent = () => {
  return (
    <Container>
      {LINKS.map(({ label, href }) => (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Text>{label}</Text>
        </Link>
      ))}
    </Container>
  );
};

export default Links;
