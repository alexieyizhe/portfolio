import React from 'react';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import { mediaSize } from '../data/configOptions';

const Header = styled.div`
  display: inline-block;
  margin-bottom: 0.5em;
  font-size: 8vh;
  font-weight: bold;
  font-family: 'Lato', 'Cabin', 'Ubuntu', sans-serif;

  ${mediaSize.tablet`
    font-size: 4em;
    letter-spacing: ${isIOS ? '-0.05em' : 0};
    margin-bottom: 1em;
  `};

  ${mediaSize.phone`
    font-size: 3em;
  `};
`;

const PageHeader = props => <Header>{props.title}</Header>;

export default PageHeader;
