import React from 'react';
import HighlightText from '../src/components/HighlightText';

describe('Highlight Text', () => {
  let text;

  describe('default state', () => {
    it('should be defined', () => {
      text = mount(
        <HighlightText color="#F8BJH3" hovered={false}>
          "Test text"
        </HighlightText>
      );
      expect(text).toBeDefined();
    });

    it('should render correctly', () => {
      const tree = renderer
        .create(
          <HighlightText color="#F8BJH3" hovered={false}>
            "Test text"
          </HighlightText>
        )
        .toJSON();
      expect(tree).toHaveStyleRule('width', '0', {
        modifier: ':before'
      });
      expect(tree).toMatchSnapshot();
    });
  });

  describe('hovered state', () => {
    it('should expand bg on hover', () => {
      const tree = renderer
        .create(
          <HighlightText color="#F8BJH3" hovered={true}>
            "Test text"
          </HighlightText>
        )
        .toJSON();
      expect(tree).toHaveStyleRule('width', '95%', {
        modifier: ':before'
      });
      expect(tree).toMatchSnapshot();
    });
  });
});
