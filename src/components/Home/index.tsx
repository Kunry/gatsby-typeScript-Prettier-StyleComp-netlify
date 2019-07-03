import { graphql } from "gatsby";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
interface Props {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              course: string;
              campus: {
                name?: string;
              };
            };
          };
        }
      ];
    };
    api: {
      campuses: [
        {
          id: string;
          name: string;
        }
      ];
    };
    footer: any;
  };
}

const Home: React.SFC<Props> = ({ data }) => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;

// export const queryHome = graphql`
//   query Home {
//     footer: file(relativePath: { regex: "/(Footer)/" }) {
//       childMarkdownRemark {
//         frontmatter {
//           campus
//         }
//       }
//     }
//   }
// `;
// api: api {
//   campuses {
//     id
//     name
//   }
// }
