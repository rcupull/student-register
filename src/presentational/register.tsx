import React, { Fragment } from "react";
import * as styles from "../components/stylesComponent";
import ListStudent from "./listStudents";
import ListGroup from "./listGroups";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import {
  groupListRoute,
  studentListRoute,
  registerListRoute
} from "../utils/definitions";
import { Nav } from "react-bootstrap";

export interface RegisterProps {}

const Register: React.SFC<RegisterProps> = () => {
  const handleIsActive = (location: any, path: string): boolean => {
    return location.pathname === path ? true : false;
  };

  const handleRegisterLink = (path: string, text: string) => {
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
          {handleRegisterLink(registerListRoute + studentListRoute, "Student")}
        </Nav.Item>
        <Nav.Item>
          {handleRegisterLink(registerListRoute + groupListRoute, "Group")}
        </Nav.Item>
      </Nav>

      <Switch>
        <Route path={registerListRoute + studentListRoute}>
          <ListStudent />
        </Route>
        <Route path={registerListRoute + groupListRoute}>
          <ListGroup />
        </Route>
        <Redirect to={registerListRoute + studentListRoute} />
      </Switch>
    </Fragment>
  );
};

export default Register;
