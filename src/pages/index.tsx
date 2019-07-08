import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import PageHelmet from "../components/PageHelmet";
import PostItem, { Post, PostList } from "../components/Post";

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        twitter_image: string;
      };
    };
  };
}

const IndexPage: React.SFC<any> = props => {
  return (
    <React.Fragment>
      <h1>Inicio</h1>
      {/* <Img fixed={props.data.file.childImageSharp.fixed} /> */}
    </React.Fragment>
  );
};

export default IndexPage;

export const blogQuery = graphql`
  query Blog {
    file(relativePath: { eq: "galacticcenter_3840x2160.0000.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

// export const pageQuery = graphql`
//   query PruebaQuery {
//     allMarkdownRemark {
//       edges {
//         node {
//           frontmatter {
//             course
//           }
//         }
//       }
//     }
//   }
// `;

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
//     ) {
//       edges {
//         node {
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//             description
//             tags
//           }
//         }
//       }
//     }
//   }
// `;

import styled from "styled-components";

const Summary = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;

  padding: 12px;
  border-radius: 4px;
  border: 1px solid #eaebec;
  line-height: 1.6;
`;

const Intro = styled.h1`
  font-size: 1em;
  font-weight: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const IntroTitle = styled.div`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 1.2em;
`;

const LineBreak = styled.br`
  margin: 12px 0;
`;
