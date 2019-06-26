import React from "react";

import { graphql } from "gatsby";

interface Props {
  data: [
    {
      course: string;
      id?: string;
    }
  ];
}

const indexLevel2: React.SFC<any> = props => {
  const courses = props.data.allMarkdownRemark.edges.map(
    ({ node }: any) => node.frontmatter.course
  );
  return (
    <>
      <h1>{props.data.allMarkdownRemark.edges[0].node.frontmatter.course}</h1>
      <ul>
        {courses.map((course: any) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </>
  );
};

export default indexLevel2;

export const queryLevel2 = graphql`
  query Level2 {
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
