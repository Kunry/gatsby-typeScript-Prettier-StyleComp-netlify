import React from "react";
import Layout from "../components/Layout";
import PageHelmet from "../components/PageHelmet";
import PostItem, { Post, PostList } from "../components/Post";

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Post;
      }>;
    };
  };
}

const IndexPage: React.SFC<Props> = props => {
  return (
    <React.Fragment>
      <Layout>
        <PageHelmet
          title="ahn.heejong"
          description="한국에 살며 웹사이트를 만드는 안희종입니다."
          url="https://ahnheejong.name/"
        />
      </Layout>
    </React.Fragment>
  );
};

export default IndexPage;

import { graphql } from "gatsby";

export const pageQuery = graphql`
  query PruebaQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            course
          }
        }
      }
    }
  }
`;

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
