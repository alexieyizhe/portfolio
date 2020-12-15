import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { LINKS } from 'services/copy/config';

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
        <a href={href}>{label}</a>
      ))}
    </Container>
  );
};

export default Links;
