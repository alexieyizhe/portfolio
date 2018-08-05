import React from 'react';
import StatCounter from '../src/components/StatCounter';

describe('StatCounter component', () => {
  it('should render the stat counter', () => {
    const counter = mount(
      <StatCounter countStart={0} useEasing={true}>
        "Tests Created"
      </StatCounter>
    );

    expect(counter).toMatchSnapshot();
  });
});
