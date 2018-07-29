import React from 'react';
import GlitchText from '../src/components/GlitchText';


describe('Glitch Text', () => {
  let text;

  global.___loader = {
    enqueue: jest.fn()
  };

  beforeEach(() => {
    text = mount(
      <GlitchText text="404" color="black" font="bolder 20vmax Lato" />
    ).children();
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(text).toBeDefined();
    });
  });

  test('should render the glitch text', () => {
    const component = shallow(
      <GlitchText text="404" color="black" font="bolder 20vmax Lato" />
    );
    expect(component).toMatchSnapshot();
  });

});
