import React from 'react';
import HighlightText from '../src/components/HighlightText';


describe('Highlight Text', () => {
  let text;

  global.___loader = {
    enqueue: jest.fn()
  };

  beforeEach(() => {
    text = render(
      <HighlightText color="#F8BJH3" hovered={false}>
        "Test text"
      </HighlightText>
    ).children();
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(text).toBeDefined();
    });
  });

  it('should render the highlight text', () => {
    expect(text).toMatchSnapshot();
  });

});
