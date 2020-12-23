import { styled } from 'goober';

import { screen } from 'services/style';

import Me from './Me';
import Tree from './Tree';

const Container = styled('div')`
  position: relative;
  display: flex;

  & #illustration-me {
    height: 200px;
    transform: translate(-50px, 100px);
  }

  & #illustration-tree {
    height: 300px;
  }

  ${screen.mobile} {
    & #illustration-me {
      transform: translate(-50px, 120px);
      height: 180px;
    }
  }
`;

const MainIllustration = () => {
  return (
    <Container>
      <Tree />
      <Me />
    </Container>
  );
};

export default MainIllustration;
