interface Props<prop> {
  data: {
    childMarkdownRemark: {
      frontmatter: prop;
    };
  };
}

export default Props;
