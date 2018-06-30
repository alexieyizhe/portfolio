import React from "react";
import styled from "styled-components";

import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";
import TestPic from "../../testaboutpic.png";

const ParagraphPic = styled.figure`
  padding: 0;
  margin: 5px;
  float: ${props => props.imgAlign || 'none'};

  & figcaption {
    padding-top: 5px;
    text-align: ${props => props.captionAlign};
    font-size: 0.7em;
  }

  & img {
    display: block;
    margin: 0 auto;
  }
`

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>
        <PageHeader>Alex who?</PageHeader>
        <div style={{fontSize: "3vh"}}>
          <p>
            Yes, I know, it's hard to pronounce my last name. You don't have to tell me.
          </p>

          <p>
            Wait, what's that? You actually want to know more about me?
          </p>

          <p>
            Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Duis at consectetur lorem donec massa. Volutpat consequat mauris nunc congue nisi vitae suscipit. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Nunc vel risus commodo viverra.

            <ParagraphPic center captionAlign="center">
              <img src={TestPic}/>
              <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
            </ParagraphPic>

            Lacus luctus accumsan tortor posuere. Enim blandit volutpat maecenas volutpat blandit. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Ipsum faucibus vitae aliquet nec. Nibh ipsum consequat nisl vel. Integer enim neque volutpat ac tincidunt vitae semper. Sed euismod nisi porta lorem mollis aliquam ut. Elementum eu facilisis sed odio morbi quis commodo odio. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh.
          </p>

          <p>
            Facilisi cras fermentum odio eu. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Est lorem ipsum dolor sit amet consectetur adipiscing elit.

            <ParagraphPic imgAlign="right" captionAlign="center">
              <img src={TestPic}/>
              <figcaption>me!</figcaption>
            </ParagraphPic>

            Parturient montes nascetur ridiculus mus. Sit amet purus gravida quis. Volutpat sed cras ornare arcu. Est velit egestas dui id. Consectetur adipiscing elit duis tristique sollicitudin. Sed vulputate mi sit amet mauris. Duis at tellus at urna condimentum mattis pellentesque id nibh. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Viverra vitae congue eu consequat ac felis donec et odio. Vitae auctor eu augue ut. A erat nam at lectus urna duis convallis convallis tellus. Sed egestas egestas fringilla phasellus faucibus.
          </p>

          <p>
            Lacus vestibulum sed arcu non odio euismod lacinia at. Tortor at risus viverra adipiscing at in. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Massa tincidunt dui ut ornare lectus sit amet est. Imperdiet massa tincidunt nunc pulvinar sapien. Quam pellentesque nec nam aliquam sem et. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Vel facilisis volutpat est velit. In nulla posuere sollicitudin aliquam. Sed arcu non odio euismod lacinia at quis.

            <ParagraphPic imgAlign="left" captionAlign="center">
              <img src={TestPic}/>
              <figcaption>me!</figcaption>
            </ParagraphPic>

            Integer quis auctor elit sed vulputate mi. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Congue quisque egestas diam in arcu cursus euismod quis. Risus nullam eget felis eget nunc lobortis mattis aliquam.
          </p>

          <p>
            Purus sit amet luctus venenatis lectus magna fringilla. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Pharetra magna ac placerat vestibulum lectus. Interdum consectetur libero id faucibus nisl tincidunt. Risus quis varius quam quisque id. Amet dictum sit amet justo donec. Eget nulla facilisi etiam dignissim. Adipiscing at in tellus integer feugiat. Lectus quam id leo in vitae. Vulputate mi sit amet mauris commodo quis. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Nisl nunc mi ipsum faucibus vitae aliquet. At erat pellentesque adipiscing commodo elit. Turpis egestas integer eget aliquet.
          </p>
        </div>
      </TemplateWrapper>
    );
  }
}


export default AboutPage;
