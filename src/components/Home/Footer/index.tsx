import { graphql } from "gatsby";
import React from "react";
import style from "styled-components";
import Props from "../interface";

interface PropFooter {
  campus: string[];
}

const Footer: React.SFC<Props<PropFooter>> = ({ data }) => {
  const { campus } = data.childMarkdownRemark.frontmatter;
  return (
    <>
      <ul>
        {campus.map(name => (
          <LI key={name}> {name}</LI>
        ))}
      </ul>
    </>
  );
};
export default Footer;

// export const queryHome = graphql`
//   query {
//     file(relativePath: { regex: "/(Header)/" }) {
//       childMarkdownRemark {
//         frontmatter {
//           text
//         }
//       }
//     }
//   }
// `;

const LI = style.li`
  margin: 10px;
`;
