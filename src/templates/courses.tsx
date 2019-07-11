import React from "react";

import { graphql, Link } from "gatsby";
import { Header, Section, TitleCourse } from "./style";
import "./style/style.css";
interface Post {
  html?: string;
  frontmatter: {
    course: string;
    pipedrive_product_code: number;
    course_code?: string;
    language?: string;
    description?: string;
  };
}

const Courses: React.SFC<{
  data: { markdownRemark: Post; previous?: Post; next: Post | null };
}> = ({ data }) => {
  const course = data.markdownRemark.frontmatter;
  const { previous, next } = data;
  return (
    <>
      <Header>
        <TitleCourse
          color={course.pipedrive_product_code > 100 ? "green" : "red"}
        >
          {course.course}
        </TitleCourse>
      </Header>
      {/* {course.description} */}

      <div
        className="Prueba"
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html || `<h1>NO BODY</h1>`,
        }}
      />
      <Section>
        {[previous, next].map(
          courseObj =>
            courseObj && (
              <Link
                key={courseObj.frontmatter.course}
                to={`/${courseObj.frontmatter.language}/course/${courseObj.frontmatter.course_code}`}
              >
                {courseObj.frontmatter.course}
              </Link>
            )
        )}
      </Section>
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
      html
      frontmatter {
        course
        pipedrive_product_code
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousId })
      @include(if: $hasPrevious) {
      frontmatter {
        course
        course_code
        language
      }
    }
    next: markdownRemark(id: { eq: $nextId }) @include(if: $hasNext) {
      frontmatter {
        course
        course_code
        language
      }
    }
  }
`;
