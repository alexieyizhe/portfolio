import React from 'react';
import ProjectShowcase from '../src/components/ProjectShowcase';
import { projectsList } from "../src/data/projectData.js";

describe('BlogPost component', () => {
  let post;

  /* react-pose is causing issues with snapshot rendering
     (see issue #11 on github)
  beforeEach(() => {
    post = shallow(
      <ProjectShowcase project={projectsList[0]} />
    )
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(post).toBeDefined();
    });
  });

  test('should render the blog post', () => {
    expect(post).toMatchSnapshot();
  });
  */


});
