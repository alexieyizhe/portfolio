import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PageFooter from '../src/components/PageFooter';


describe('Page Footer', () => {
  let footer;

  beforeEach(() => {
    footer = shallow(
      <MemoryRouter>
        <PageFooter className="pageFooter" />
      </MemoryRouter>
    ).children();
  });

  it('should render the footer', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PageFooter className="pageFooter" />
        </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(footer).toBeDefined();
    });
  });

  it('should trigger scroll to top', () => {
    footer = mount(
      <MemoryRouter>
        <PageFooter className="pageFooter" />
      </MemoryRouter>
    ).children();
    footer.find('span#scrollToTopTrigger').simulate('click');
  })

});
