
import CMS from 'netlify-cms'
import Prism from 'prismjs';
import React from "react";
import styled from "styled-components";
import dayjs from 'dayjs';
import { DocsTemplate } from './preview-templates/DocsTemplate';
import BlogPostPreview from './preview-templates/BlogPostPreview'

// import './css/docs.css';
// import './css//whatsnew.css';
// import './css//header.css';

import WidgetDoc from '../components/Test-CMS/components/widget-doc';
import Release from '../components/Test-CMS/components/release';
import WhatsNew from '../components/Test-CMS/components/whats-new';
import Notification from '../components/Test-CMS/components/notification';

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
  
  const WidgetDocPreview = ({ entry, widgetFor }) => (
    <WidgetDoc visible={true} label={entry.get('label')} body={widgetFor('body')} />
  );
  
  const ReleasePreview = ({ entry }) => (
    <WhatsNew>
      {entry.getIn(['data', 'updates']).map((release, idx) => (
        <Release
          key={idx}
          version={release.get('version')}
          date={dayjs(release.get('date')).format('MMMM D, YYYY')}
          description={release.get('description')}
        />
      ))}
    </WhatsNew>
  );
  
  const NotificationPreview = ({ entry }) =>
    entry
      .getIn(['data', 'notifications'])
      .filter(notif => notif.get('published'))
      .map((notif, idx) => (
        <Notification key={idx} url={notif.get('url')} loud={notif.get('loud')}>
          {notif.get('message')}
        </Notification>
      ));
CMS.registerPreviewTemplate('blog', withHighlight(BlogPostPreview));
CMS.registerPreviewTemplate('docs', withHighlight(DocsPreview));
CMS.registerPreviewTemplate('widget_docs', withHighlight(WidgetDocPreview));
CMS.registerPreviewTemplate('releases', ReleasePreview);
CMS.registerPreviewTemplate('notifications', NotificationPreview);

import { ClassNames } from '@emotion/core';

class TestControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  isValid = () =>  {
    const { value } = this.props
    return ( value.length > 50 && value.length < 60 ) || { error: { message: 'Length between 50 and 60 characters.' } };
  }
  render(){
    console.log(this.props);
    const ListControl = cms.getWidget('list').control;
    return (
      <div>
        <SlideControlHeader>TEXT</SlideControlHeader>
        <ListControl {...this.props}/>
      </div>
    )
  }
};

const SlideControlHeader = styled.div`
  text-transform: uppercase;
  border-bottom: 1px solid black;
  margin-top: 20px;
`;

const TestPreview = props => {
  // const string = CMS.getWidget("string").control;
    console.log(props)
  return(
    <div>
      
    </div>
  )
}

CMS.registerWidget("test", TestControl, TestPreview)