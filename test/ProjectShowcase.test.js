import React from 'react';
import ProjectShowcase from '../src/components/ProjectShowcase';
import { projectsList } from "../src/data/projectData.js";

describe('ProjectShowcase component', () => {
  let project;

  /* react-pose is causing issues with snapshot rendering
     (see issue #11 on github)
  beforeEach(() => {
    project = shallow(
      <ProjectShowcase project={projectsList[0]} />
    )
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(project).toBeDefined();
    });
  });

  test('should render the project showcase', () => {
    expect(project).toMatchSnapshot();
  });
  */


});
