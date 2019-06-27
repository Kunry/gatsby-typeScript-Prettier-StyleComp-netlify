import React from "react";

import { graphql, Link } from "gatsby";
import { TitleCourse } from "./TitleCourse";

interface Post {
  frontmatter: {
    course: string;
    pipedrive_product_code: number;
    course_code?: string;
  };
}

const Courses: React.SFC<{
  data: { markdownRemark: Post; previous?: Post; next: Post | null };
}> = ({ data }) => {
  const course = data.markdownRemark.frontmatter;
  const { previous, next } = data;
  return (
    <>
      <TitleCourse
        color={course.pipedrive_product_code > 100 ? "green" : "red"}
      >
        {course.course}
      </TitleCourse>
      {[previous, next].map(
        courseObj =>
          courseObj && (
            <Link to={`/course/${courseObj.frontmatter.course_code}`}>
              {courseObj.frontmatter.course}
            </Link>
          )
      )}
    </>
  );
};

export default Courses;

export const courseQuery = graphql`
  query courseQuery(
    $courseId: String!
    $previousId: String
    $hasPrevious: Boolean!
    $nextId: String
    $hasNext: Boolean!
  ) {
    markdownRemark(id: { eq: $courseId }) {
      frontmatter {
        course
        pipedrive_product_code
      }
    }
    previous: markdownRemark(id: { eq: $previousId })
      @include(if: $hasPrevious) {
      frontmatter {
        course
        course_code
      }
    }
    next: markdownRemark(id: { eq: $nextId }) @include(if: $hasNext) {
      frontmatter {
        course
        course_code
      }
    }
  }
`;
