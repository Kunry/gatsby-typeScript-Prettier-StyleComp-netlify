import { graphql } from "gatsby";
import React from "react";
import Props from "../interface";

interface PropFooter {
  campus: string[];
}

const Footer: React.SFC<Props<PropFooter>> = ({ data }) => {
  const { campus } = data.childMarkdownRemark.frontmatter;
  return (
    <>
      <p>{campus}</p>
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
