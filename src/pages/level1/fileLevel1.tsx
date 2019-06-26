import React from "react";

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id?: string;
          frontmatter: {
            title?: string;
            date?: Date;
            description?: string;
            body?: string;
            tags?: string[];
          };
        };
      }>;
    };
  };
}

const fileLevel1: React.SFC<Props> = () => {
  return (
    <>
      <h1>Level1</h1>
    </>
  );
};

export default fileLevel1;
