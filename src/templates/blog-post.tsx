import { graphql } from "gatsby";
import Image from "gatsby-image";
import React from "react";

const BlogPostTemplate = ({ title, author, date, body, html }: any) => {
  return (
    <div className="docs page">
      <div className="container">
        <article className="blog-content" id="blog-content">
          <div className="blog-post-header">
            <h1>{title}</h1>
            <p className="meta-info">
              by {author} on {date}
            </p>
          </div>
          {body ? body : <div dangerouslySetInnerHTML={{ __html: html }} />}
        </article>
      </div>
    </div>
  );
};
export default BlogPostTemplate;

export const pageQuery = graphql`
  query blogPost($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        # meta_description
        date(formatString: "MMMM D, YYYY")
        author
        twitter_image
      }
      html
    }
  }
`;
