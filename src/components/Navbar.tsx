import React from "react";

const Navbar = () => (
  <Wrapper>
    <NavItem to="/" style={{ fontWeight: "bold" }} activeClassName="nav-active">
      Pepe
    </NavItem>
    <NavItem to="/about" activeClassName="nav-active">
      about
    </NavItem>
  </Wrapper>
);

export default Navbar;

import styled from "styled-components";

const Wrapper = styled.nav`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 42px;
  height: 60px;
  background-color: hsla(0, 0%, 100%, 0.8);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    padding: 0 24px;
  }
`;
import { Link } from "gatsby";

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 1.25rem;

  &:active,
  &:focus {
    color: initial;
  }

  &.nav-active:hover {
    color: initial;
  }
`;
