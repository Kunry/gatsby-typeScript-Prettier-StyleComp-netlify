import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import style from "styled-components";
import Props from "../interface";

interface PropFooter {
  campus: Array<{ name: string; id: string }>;
}

const Footer: React.SFC<any /* Props<PropFooter> */> = () => {
  const data = useStaticQuery(graphql`
    query Footer {
      footer: file(relativePath: { regex: "/(Footer)/" }) {
        childMarkdownRemark {
          frontmatter {
            locations
          }
        }
      }
    }
  `);
  const { locations } = data.footer.childMarkdownRemark.frontmatter;

  return (
    <>
      <ul>
        {locations.map((name: string) => (
          <LI key={name}>
            <LINK to={`es/ciudad/${name}`}> {name}</LINK>
          </LI>
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
const LINK = style(Link)`
  color:red;
`;
