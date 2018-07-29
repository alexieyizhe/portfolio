import React from 'react';
import PageFooter from '../src/components/PageFooter';


describe('Page Footer', () => {
  let footer;

  beforeEach(() => {
    footer = shallow(
      <PageFooter className="pageFooter" />
    )
  });

  it('should render the footer', () => {
    expect(footer).toMatchSnapshot();
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(footer).toBeDefined();
    });
  });

});
