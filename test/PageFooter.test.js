import React from 'react';
import PageFooter from '../src/components/PageFooter';


describe('Page Footer', () => {
  let footer;

  global.___loader = {
    enqueue: jest.fn()
  };

  beforeEach(() => {
    footer = shallow(
      <PageFooter className="pageFooter" />
    ).children();
  });

  test('should render the footer', () => {
    global.shortUID = jest.fn(() => "1");
    const component = shallow(
      <PageFooter className="pageFooter" />
    );
    expect(component).toMatchSnapshot();
  });

  describe('default state', () => {
    global.shortUID = jest.fn(() => "1");
    it('should be defined', () => {
      expect(footer).toBeDefined();
    });
  });

});
