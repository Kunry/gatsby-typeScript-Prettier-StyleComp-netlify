import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import 'prismjs/themes/prism-tomorrow.css';

import Layout from '../../components/Test-CMS/components/layout';
import EditLink from '../../components/Test-CMS/components/edit-link';
import Widgets from '../../components/Test-CMS/components/widgets';
import DocsNav from '../../components/Test-CMS/components/docs-nav';
import MobileNav from '../../components/Test-CMS/components/mobile-nav';

import '../css/docs.css';

const toMenu = (menu, nav) =>
  menu.map(group => ({
    title: group.title,
    group: nav.group.find(g => g.fieldValue === group.name),
  }));

const DocsSidebar = ({ docsNav, location, history }) => (
  <aside id="sidebar" className="sidebar">
    <DocsNav items={docsNav} location={location} />
    <MobileNav items={docsNav} history={history} />
  </aside>
);

export const DocsTemplate = ({
  title,
  editLinkPath,
  body,
  html,
  showWidgets,
  widgets,
  showSidebar,
  docsNav,
  location,
  history,
}) => (
  <div className="docs detail page">
    <div className="container">
      {showSidebar && <DocsSidebar docsNav={docsNav} location={location} history={history} />}
      <article className="docs-content" id="docs-content">
        {editLinkPath && <EditLink path={editLinkPath} />}
        <h1>{title}</h1>
        {body ? body : <div dangerouslySetInnerHTML={{ __html: html }} />}
        {showWidgets && <Widgets widgets={widgets} />}
      </article>
    </div>
  </div>
);