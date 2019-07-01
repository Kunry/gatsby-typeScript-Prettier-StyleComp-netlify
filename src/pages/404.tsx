import React from "react";

import Layout from "../components/Layout";

import { push } from "gatsby";
interface State {
  timeout: number;
}

class NotFoundPage extends React.Component<{}, State> {
  private timer = -1;
  constructor(props: {}) {
    super(props);
    this.state = { timeout: 5 };
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => {
      if (this.state.timeout === 1) {
        push("/");
        return;
      }
      this.setState({ timeout: this.state.timeout - 1 });
    }, 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  public render() {
    return (
      <Layout>
        <h1>404 Not Found</h1>
        <div>
          <br />
          {this.state.timeout}¡
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
