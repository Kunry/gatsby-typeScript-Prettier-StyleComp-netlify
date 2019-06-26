import React from "react";

import { TitleCourse } from "./TitleCourse";

const Courses = ({ data }: any) => {
  const course = data.markdownRemark.frontmatter;
  return (
    <TitleCourse color={course.pipedrive_product_code > 100 ? "green" : "red"}>
      {course.course}
    </TitleCourse>
  );
};

export default Courses;

import { graphql } from "gatsby";

export const courseQuery = graphql`
  query courseQuery($courseId: String!) {
    markdownRemark(id: { eq: $courseId }) {
      frontmatter {
        course
        pipedrive_product_code
      }
    }
  }
`;
