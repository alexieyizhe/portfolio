import React from 'react';
import WorkShowcase from '../src/components/WorkShowcase';
import { experienceList } from "../src/data/experienceData.js";

describe('WorkShowcase component', () => {

  it('should render the work showcase', () => {
    const experience = render(
      <WorkShowcase work={experienceList[0]} />
    );

    expect(experience).toMatchSnapshot();
  });
});
