import React from "react";
import styled from "styled-components";

import TemplateWrapper from "../components/TemplateWrapper.js";
import SubLink from "../components/SubLink.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper>
        <div id="greetings">
          hi! i'm
        </div>
        <div id="mainInfoDisplay">
          alex xie.
        </div>
        <div id="hotlinksBar">
          <SubLink linkText="say hi!"></SubLink><SubLink linkText="resume"></SubLink><SubLink linkText="github"></SubLink><SubLink linkText="linkedin"></SubLink>
        </div>
        <div id="briefIntro">
          software developer.<br/>
          event organizer.<br/>
          soccer fanatic.<br/>
          lover of bad puns.<br/>
        </div>
      </TemplateWrapper>
    );
  }
}


export default HomePage;
