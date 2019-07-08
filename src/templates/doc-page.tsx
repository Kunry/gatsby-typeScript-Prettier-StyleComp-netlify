import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import DocsNav from "../components/Test-CMS/components/docs-nav";
import EditLink from "../components/Test-CMS/components/edit-link";
import Layout from "../components/Test-CMS/components/layout";
import MobileNav from "../components/Test-CMS/components/mobile-nav";
import Widgets from "../components/Test-CMS/components/widgets";

// tslint:disable-next-line: no-submodule-imports
// import "prismjs/themes/prism-tomorrow.css";
// import "../components/Test-CMS/css/imports/docs.css";

const toMenu = (menu: any, nav: any) =>
  menu.map((group: any) => ({
    group: nav.group.find((g: any) => g.fieldValue === group.name),
    title: group.title
  }));

const DocsSidebar = ({ docsNav, location, history }: any) => (
  <aside id="sidebar" className="sidebar">
    <DocsNav items={docsNav} location={location} />
    <MobileNav items={docsNav} history={history} />
  </aside>
);

export const DocsTemplate: React.SFC<any> = ({
  title,
  editLinkPath,
  body,
  html,
  showWidgets,
  widgets,
  showSidebar,
  docsNav,
  location,
  history
}) => (
  <div className="docs detail page">
    <div className="container">
      {showSidebar && (
        <DocsSidebar docsNav={docsNav} location={location} history={history} />
      )}
      <article className="docs-content" id="docs-content">
        {editLinkPath && <EditLink path={editLinkPath} />}
        <h1>{title}</h1>
        {body ? body : <div dangerouslySetInnerHTML={{ __html: html }} />}
        {showWidgets && <Widgets widgets={widgets} />}
      </article>
    </div>
  </div>
);

const DocPage: React.SFC<any> = ({ data, location, history }) => {
  const { nav, page, widgets, menu } = data;

  const docsNav = toMenu(menu.siteMetadata.menu.docs, nav);
  const showWidgets = location.pathname.indexOf("/docs/widgets") !== -1;

  return (
    <Layout>
      <Helmet title={page.frontmatter.title} />
      <DocsTemplate
        title={page.frontmatter.title}
        editLinkPath={page.fields.path}
        html={page.html}
        showWidgets={showWidgets}
        widgets={widgets}
        docsNav={docsNav}
        location={location}
        history={history}
        showSidebar
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query docPage($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        path
      }
      frontmatter {
        title
      }
      html
    }
    nav: allMarkdownRemark(
      sort: { fields: [frontmatter___weight], order: ASC }
      filter: {
        frontmatter: { title: { ne: null }, group: { ne: null } }
        fields: { slug: { regex: "/docs/" } }
      }
    ) {
      group(field: frontmatter___group) {
        fieldValue
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              group
            }
            tableOfContents
          }
        }
      }
    }
    menu: site {
      siteMetadata {
        menu {
          docs {
            name
            title
          }
        }
      }
    }
    widgets: allMarkdownRemark(
      sort: { fields: [frontmatter___label], order: ASC }
      filter: {
        frontmatter: { label: { ne: null } }
        fields: { slug: { regex: "/widgets/" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            label
          }
          html
        }
      }
    }
  }
`;

export default DocPage;
