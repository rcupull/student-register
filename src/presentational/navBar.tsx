import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as styles from "../components/stylesComponent";
import {
  homeRoute,
  insertFormRoute,
  registerListRoute
} from "../utils/definitions";

import _ from "lodash";
export interface NavBarProps {}

const NavBar: React.SFC<NavBarProps> = () => {
  const handleIsActive = (location: any, path: string): boolean => {
    let pathname: string = "/" + _.split(location.pathname, "/")[1];
    return pathname === path ? true : false;
  };

  const handleInsertLink = (path: string, text: string) => {
    return (
      <NavLink
        to={path}
        style={styles.navBarLinkDesactiveStyle}
        activeStyle={styles.navBarLinkActiveStyle}
        isActive={(match, location) => handleIsActive(location, path)}
      >
        {text}
      </NavLink>
    );
  };

  return (
    <Nav variant="tabs" activeKey="1" style={styles.navBarBodyStyle}>
      <Nav.Item style={styles.navBarLinkItemStyle}>
        {handleInsertLink(homeRoute, "Home")}
      </Nav.Item>

      <Nav.Item style={styles.navBarLinkItemStyle}>
        {handleInsertLink(insertFormRoute, "Insert")}
      </Nav.Item>

      <Nav.Item style={styles.navBarLinkItemStyle}>
        {handleInsertLink(registerListRoute, "Register")}
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
