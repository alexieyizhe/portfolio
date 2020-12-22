import { screen } from 'services/utils';
import { s } from 'services/theme';

const H1 = s('h1')`
  font-family: ${({ theme }) => theme!.headingFont};
  color: ${({ theme }) => theme!.textPrimaryColor};
  font-size: 48px;
  text-align: center;
  margin: 48px 0;

  ${screen.mobile} {
    font-size: 40px;
    margin: 24px 0 28px 0;
  }
`;

export { H1 };
