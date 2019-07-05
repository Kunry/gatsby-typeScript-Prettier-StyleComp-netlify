import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post.tsx";
import "../../components/all.scss";

const BlogPostPreview = ({ entry, widgetFor }) => {
  
  console.log("entra");
  console.log(entry, widgetFor);
  const data = entry.get('data');
  return (
  <BlogPostTemplate
    title={data.get(["title"])}
    author={data.get(["author"])}
    date={data.get(["date"]).format("MMMM D, YYYY")}
    body={widgetFor("body")}
  />
)};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BlogPostPreview;
