import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post.tsx";
import "../../components/all.scss";

const BlogPostPreview = ({ entry, widgetFor }) => {
  
  console.log("entra");
  console.log(entry, widgetFor);
  return (
  <BlogPostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    course={entry.getIn(["data", "course"])}
    course_code={entry.getIn(["data", "course_code"])}
    pipedrive_product_code={entry.getIn(["data", "pipedrive_product_code"])}
  />
)};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BlogPostPreview;
