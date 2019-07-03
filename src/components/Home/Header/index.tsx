import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

interface Props {
  courses: [object];
  campus: Array<{ id: string; name: string }>;
  language: string;
}

const Header: React.SFC = () => {
  const result = useStaticQuery(graphql`
    query Header {
      header: file(relativePath: { regex: "/(Header)/" }) {
        childMarkdownRemark {
          frontmatter {
            courses
            locations
            careerServices
            alumni
            hireTalent
            languages {
              language {
                icon
                language
              }
            }
          }
        }
      }
    }
  `);
  const {
    courses,
    locations,
    careerServices,
    alumni,
    languages
  } = result.header.childMarkdownRemark.frontmatter;
  // console.log(result.header.childMarkdownRemark.frontmatter);
  return (
    <>
      <HEADER>
        <NAV_HEADER>
          <h1>IronHack</h1>
          <UL_HEADER>
            <LI_HEADER hover="Courses">
              <p>Courses</p>
              <UL_LIST className="Courses">
                {courses.map((course: string) => (
                  <p key={course}>{course}</p>
                ))}
              </UL_LIST>
            </LI_HEADER>
            <LI_HEADER hover="Locations">
              <p>Locations</p>
              <UL_LIST className="Locations">
                {locations.map((location: string) => (
                  <p key={location}>{location}</p>
                ))}
              </UL_LIST>
            </LI_HEADER>
          </UL_HEADER>
        </NAV_HEADER>
      </HEADER>
    </>
  );
};

const HEADER = styled.header`
  padding: 0.32px 0;
`;

const NAV_HEADER = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;
const LI_HEADER = styled.li`
  margin: 10px;
  list-style-type: none;
  &:hover .${(props: { hover: string }) => props.hover} {
    position: absolute;
    display: flex;
    flex-direction: column;
  }
`;

const UL_HEADER = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const UL_LIST = styled.ul`
  display: none;
`;

export default Header;
