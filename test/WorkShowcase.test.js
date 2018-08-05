import React from 'react';
import WorkShowcase from '../src/components/WorkShowcase';
import { experienceList } from '../src/data/experienceData';

describe('WorkShowcase component', () => {
  it('should render the work showcase', () => {
    const experience = render(<WorkShowcase work={experienceList[0]} />);

    expect(experience).toMatchSnapshot();
  });

  it('should show description on click', () => {
    const experience = mount(<WorkShowcase work={experienceList[0]} />);

    expect(experience).toHaveStyleRule('width', '75%');
    experience
      .find('div')
      .at(0)
      .simulate('click');
    expect(experience).toHaveStyleRule('width', '90%');
    expect(experience).toMatchSnapshot();
  });
});
