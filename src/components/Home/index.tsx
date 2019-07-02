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
  // tslint:disable-next-line: no-console
  console.info(data);
  return (
    <>
      <Header
        courses={[{ title: "web" }]}
        campus={data.api.campuses}
        language="en"
      />
      <Footer data={data.footer} />
    </>
  );
};

export default Home;

export const queryHome = graphql`
  query Home {
    api: api {
      campuses {
        id
        name
      }
    }
    footer: file(relativePath: { regex: "/(Footer)/" }) {
      childMarkdownRemark {
        frontmatter {
          text
        }
      }
    }
  }
`;
