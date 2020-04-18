import React, { Fragment } from "react";
import FormStudent from "./formStudent";
import FormGroup from "./formGroup";
import * as styles from "../components/stylesComponent";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import {
  studentFormRoute,
  groupFormRoute,
  insertFormRoute
} from "../utils/definitions";
import { Nav } from "react-bootstrap";

export interface InsertProps {}

const Insert: React.SFC<InsertProps> = () => {
  const handleIsActive = (location: any, path: string): boolean => {
    return location.pathname === path ? true : false;
  };

  const handleInsertLink = (path: string, text: string) => {
    return (
      <NavLink
        to={path}
        style={styles.navBar2LinkDesactiveStyle}
        activeStyle={styles.navBar2LinkActiveStyle}
        isActive={(match, location) => handleIsActive(location, path)}
      >
        {text}
      </NavLink>
    );
  };

  return (
    <Fragment>
      <Nav variant="pills" style={styles.navBar2BodyStyle}>
        <Nav.Item>
          {handleInsertLink(insertFormRoute + studentFormRoute, "Student")}
        </Nav.Item>
        <Nav.Item>
          {handleInsertLink(insertFormRoute + groupFormRoute, "Group")}
        </Nav.Item>
      </Nav>

      <Switch>
        <Route path={insertFormRoute + studentFormRoute}>
          <FormStudent />
        </Route>
        <Route path={insertFormRoute + groupFormRoute}>
          <FormGroup />
        </Route>
        <Redirect to={insertFormRoute + studentFormRoute} />
      </Switch>
    </Fragment>
  );
};

export default Insert;
