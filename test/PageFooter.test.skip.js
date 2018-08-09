/*
  react-mt-svg-lines breaks renderer right now,
  so this test is skipped temporarily.
*/


import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PageFooter from '../src/components/PageFooter';

describe('Page Footer', () => {
  let footer;


  it.skip('should render the footer', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PageFooter className="pageFooter" />
        </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip('should render the footer', () => {
    footer = shallow(
      <MemoryRouter>
        <PageFooter className="pageFooter" />
      </MemoryRouter>
    ).children();
    expect(footer).toMatchSnapshot();
  });

  describe('default state', () => {
    it.skip('should be defined', () => {
      footer = shallow(
        <MemoryRouter>
          <PageFooter className="pageFooter" />
        </MemoryRouter>
      ).children();
      expect(footer).toBeDefined();
    });
  });

  it.skip('should trigger scroll to top', () => {
    footer = mount(
      <MemoryRouter>
        <PageFooter className="pageFooter" />
      </MemoryRouter>
    ).children();
    footer.find('span#scrollToTopTrigger').simulate('click');
  });
});
