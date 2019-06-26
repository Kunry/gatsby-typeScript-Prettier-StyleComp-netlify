import React from "react";
import styled from "styled-components";

import Footer from "./Footer";
import Navbar from "./Navbar";

import "./all.scss";

const TemplateWrapper: React.SFC = ({ children }) => (
  <Wrapper>
    <Navbar />
    <Content>{children}</Content>
    <Footer />
  </Wrapper>
);

export default TemplateWrapper;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 24px;
`;

const Content = styled.div`
  margin-top: 80px;
`;
