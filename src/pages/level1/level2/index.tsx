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

const indexLevel2: React.SFC<Props> = props => {
  return (
    <>
      <h1>Index2</h1>
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
