import CMS from "netlify-cms";
import Prism from "prismjs";
import React from "react";
import styled from "styled-components";
// import dayjs from "dayjs";
// import { DocsTemplate } from "./preview-templates/DocsTemplate";
// import BlogPostPreview from "./preview-templates/BlogPostPreview";

// import './css/docs.css';
// import './css//whatsnew.css';
// import './css//header.css';

// import WidgetDoc from "../components/Test-CMS/components/widget-doc";
// import Release from "../components/Test-CMS/components/release";
// import WhatsNew from "../components/Test-CMS/components/whats-new";
// import Notification from "../components/Test-CMS/components/notification";

// const withHighlight = WrappedComponent =>
//   class Highlight extends React.Component {
//     constructor(props) {
//       super(props);
//       this.ref = React.createRef();
//     }

//     highlight() {
//       Prism.highlightAllUnder(this.ref.current);
//     }

//     componentDidMount() {
//       this.highlight();
//     }

//     componentDidUpdate() {
//       this.highlight();
//     }

//     render() {
//       return (
//         <div className="language-markup" ref={this.ref}>
//           <WrappedComponent {...this.props} />
//         </div>
//       );
//     }
//   };

//   const DocsPreview = ({ entry, widgetFor }) => (
//     <DocsTemplate title={entry.getIn(['data', 'title'])} body={widgetFor('body')} />
//   );

//   const WidgetDocPreview = ({ entry, widgetFor }) => (
//     <WidgetDoc visible={true} label={entry.get('label')} body={widgetFor('body')} />
//   );

//   const ReleasePreview = ({ entry }) => (
//     <WhatsNew>
//       {entry.getIn(['data', 'updates']).map((release, idx) => (
//         <Release
//           key={idx}
//           version={release.get('version')}
//           date={dayjs(release.get('date')).format('MMMM D, YYYY')}
//           description={release.get('description')}
//         />
//       ))}
//     </WhatsNew>
//   );

//   const NotificationPreview = ({ entry }) =>
//     entry
//       .getIn(['data', 'notifications'])
//       .filter(notif => notif.get('published'))
//       .map((notif, idx) => (
//         <Notification key={idx} url={notif.get('url')} loud={notif.get('loud')}>
//           {notif.get('message')}
//         </Notification>
//       ));
// CMS.registerPreviewTemplate('blog', withHighlight(BlogPostPreview));
// CMS.registerPreviewTemplate('docs', withHighlight(DocsPreview));
// CMS.registerPreviewTemplate('widget_docs', withHighlight(WidgetDocPreview));
// CMS.registerPreviewTemplate('releases', ReleasePreview);
// CMS.registerPreviewTemplate('notifications', NotificationPreview);

// import { ClassNames } from "@emotion/core";

// class TestControl extends React.Component {

//   constructor(props) {
//     super(props);
//     this.listWidget = React.createRef();
//   }

//   isValid = () => {
//     // console.log(this.props.valueOf())
//     debugger;
//     const  arrayValue  = this.props.value._tail.array
//     const  arrayField = this.props.field.get("fields")._tail.array
//     console.log(arrayValue)
//     console.log(arrayField)
//     return true
//   }

//   render(){
//     console.log(this.props);
//     const updatedFieldObject= this.props.field.set('allow_add', this.canAddItems());
//     const ListControl = CMS.getWidget('list').control;
//     return (
//       <div>
//         <SlideControlHeader>TEXT</SlideControlHeader>
//         <ListControl {...this.props} field={updatedFieldObject}/>
//       </div>
//     )
//   }
// };

// CMS.registerWidget("test", TestControl, TestPreview);

const SlideControlHeader = styled.div`
  text-transform: uppercase;
  border-bottom: 1px solid black;
  margin-top: 20px;
`;

const TestPreview = (props: any) => {
  const StringPreview = CMS.getWidget("string").preview;
  // // console.log(props)
  return (
    <div>
      <StringPreview {...props} />
    </div>
  );
};

interface ControlStringProps {
  value: string;
  field: Map<string, any>;
}

class StringControl extends React.Component<ControlStringProps, any> {
  constructor(props: ControlStringProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  public isValid = () => {
    const { value } = this.props;
    const max = this.props.field.get("max");
    const min = this.props.field.get("min");
    // console.log("--------------------");
    // console.log(this.props, max, min);
    // return false
    return (
      (value.length >= min && value.length <= max) || {
        error: { message: `Length between ${min} and ${max} characters. PEPE` },
      }
    );
  };
  public render() {
    // tslint:disable-next-line: no-debugger
    // console.log(this);
    // debugger;
    const max = this.props.field.get("max");
    // console.log("--------------------")
    // console.log(this)
    const StringWidget = CMS.getWidget("string").control;
    return <StringWidget {...this.props} />;
  }
}

CMS.registerWidget("customString", StringControl, TestPreview);

// tslint:disable-next-line: max-classes-per-file
class StringControlURL extends React.Component<ControlStringProps, any> {
  constructor(props: ControlStringProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  public isValid = () => {
    const { value } = this.props;
    const max = this.props.field.get("max");
    const min = this.props.field.get("min");
    // console.log("--------------------");
    // console.log(this.props, max, min);
    // return false
    return (
      (value.length >= min && value.length <= max) || {
        error: { message: `Length between ${min} and ${max} characters. PEPE` },
      }
    );
  };
  public render() {
    // tslint:disable-next-line: no-debugger
    console.log(this);
    // debugger;
    const max = this.props.field.get("max");
    // console.log("--------------------")
    // console.log(this)
    const StringWidget = CMS.getWidget("string").control;
    return <StringWidget {...this.props} />;
  }
}

CMS.registerWidget("customStringURL", StringControlURL, TestPreview);

interface ControlObjProps {
  value: Map<string, any>;
  field: Map<[], any>;
  onChangeObject: any;
}

// tslint:disable-next-line: max-classes-per-file
class ObjControl extends React.Component<ControlObjProps, any> {
  public isValid = () => {
    const { value } = this.props;
    this.props.onChangeObject(
      "url",
      `${this.props.value.get("language")}/${this.props.value.get(
        "primaryCategory"
      )}`
    );
    return true;
  };
  public render() {
    // tslint:disable-next-line: no-console
    console.log(this.props);

    const ObjWidget = CMS.getWidget("object").control;
    return <ObjWidget {...this.props} />;
  }
}

CMS.registerWidget("CustomObject", ObjControl, TestPreview);

// tslint:disable-next-line: no-console
console.log("-------------------------");
// tslint:disable-next-line: no-console
console.info(CMS);
// tslint:disable-next-line: no-console
console.log("-------------------------");
