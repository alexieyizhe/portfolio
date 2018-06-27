import React from "react";
import styled from "styled-components";

import TemplateWrapper from "../components/TemplateWrapper.js";

class InvalidURLPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper footer>
        <div>
          The page was not found.
        </div>
      </TemplateWrapper>
    );
  }
}


export default InvalidURLPage;
