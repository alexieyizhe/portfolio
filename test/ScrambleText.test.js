import React from 'react';
import ScrambleText from '../src/components/ScrambleText';

describe('ScrambleText component', () => {

  it('should render the scrambled text', () => {
    const text = mount(
      <ScrambleText
        text="This is a test"
        scramble="!<>-_\\/[]{}—=+*^?#_abiwxevpi"
        options={{ duration: 100, speed: 25 }}
      />
    );

    expect(text).toMatchSnapshot();
  });
});
