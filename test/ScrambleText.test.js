import React from 'react';
import ScrambleText from '../src/components/ScrambleText';

describe('ScrambleText component', () => {

  jest.useFakeTimers();
  const fakeText = "This is a test";

  it('should render the scrambled text', () => {
    const text = mount(
      <ScrambleText
        text={fakeText}
        scramble="!<>-_\\/[]{}—=+*^?#_abiwxevpi"
        options={{ duration: 100, speed: 25 }}
      />
    );
    expect(text).toMatchSnapshot();
  });

  it('should scramble text periodically', () => {
    const text = mount(
      <ScrambleText
        text={fakeText}
        scramble="!<>-_\\/[]{}—=+*^?#_abiwxevpi"
        options={{ duration: 100, speed: 25 }}
      />
    );

    let curText = text.state().curText;

    jest.advanceTimersByTime(150);
    expect(text.state().curText).not.toBe(curText);
    curText = text.state().curText;

    jest.advanceTimersByTime(600);
    expect(text.state().curText).not.toBe(curText);
    curText = text.state().curText;

    jest.advanceTimersByTime(2000);
    expect(text.state().curText).not.toBe(curText);
    expect(text.state().curText).toEqual(fakeText);

    jest.runOnlyPendingTimers();
  })

  it('should clear timer on unmount', () => {
    const text = mount(
      <ScrambleText
        text={fakeText}
        scramble="!<>-_\\/[]{}—=+*^?#_abiwxevpi"
        options={{ duration: 100, speed: 25 }}
      />
    );
    text.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(3);
  })
});
