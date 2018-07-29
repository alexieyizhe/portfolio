import React from "react";
import BlogPost from "../components/BlogPost";
import TemplateWrapper from "../components/TemplateWrapper";


const mediumCDNUrl = "https://cdn-images-1.medium.com/max/750/";
const mediumAuthorUrl = "https://medium.com/@alexieyizhe";


class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.props.data.allMediumPost.edges;
    return (
      <TemplateWrapper menu footer curPage="Blog" outerBounds={{ top: "7%", left: "15%", right: "15%", bottom: "0" }} title="Blog" header="my ramblings.">
        <div style={this.props.transition && this.props.transition.style}>
          {posts.map((post) => (
            <BlogPost
              key={post.node.id}
              title={post.node.title}
              author={post.node.author.name}
              subtitle={post.node.content.subtitle}
              createdAt={post.node.createdAt}
              articleSrc={`${mediumAuthorUrl}/${post.node.uniqueSlug}`}
              imgSrc={`${mediumCDNUrl}/${post.node.virtuals.previewImage.imageId}`}
              imgAlt={post.node.title}
              color={`hsl(${Math.floor(Math.random() * 360)},100%, 87.5%)`}
              imgSize={{width: "100%", height: "100%"}}
            />
          ))}
        </div>
      </TemplateWrapper>
    );
  }
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogQuery {
    allMediumPost(limit: 5, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          uniqueSlug
          createdAt
          author {
            name
          }
          content {
            subtitle
          }
          virtuals {
            previewImage {
              imageId
            }
          }
        }
      }
    }
  }
`;
