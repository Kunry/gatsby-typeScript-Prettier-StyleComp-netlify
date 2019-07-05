
import CMS from 'netlify-cms'
import Prism from 'prismjs';
import React from "react";
import BlogPostPreview from './preview-templates/BlogPostPreview'

import './css/docs.css';


const withHighlight = WrappedComponent =>
  class Highlight extends React.Component {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }

    highlight() {
      Prism.highlightAllUnder(this.ref.current);
    }

    componentDidMount() {
      this.highlight();
    }

    componentDidUpdate() {
      this.highlight();
    }

    render() {
      return (
        <div className="language-markup" ref={this.ref}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };


  const DocsPreview = ({ entry, widgetFor }) => (
    <DocsTemplate title={entry.getIn(['data', 'title'])} body={widgetFor('body')} />
  );

CMS.registerPreviewTemplate('blog', withHighlight(BlogPostPreview));
CMS.registerPreviewTemplate('docs', withHighlight(DocsPreview));