import React from "react";
import styled from "styled-components";

class SubLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkText: props.linkText
    };
  }

  render() {
    return (
      <a href="google.com">{this.state.linkText}</a>
    );
  }
}

export default SubLink;
