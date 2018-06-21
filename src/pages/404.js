import React from "react";
import styled from "styled-components";

import TemplateWrapper from "../components/TemplateWrapper.js";

class LinkNotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper>
        <div>
          The page was not found.
        </div>
      </TemplateWrapper>
    );
  }
}


export default LinkNotFoundPage;
