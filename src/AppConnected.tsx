import React, { useEffect } from "react";
import * as ReactRedux from "react-redux";

import { Container } from "react-bootstrap";
import NavBar from "./presentational/navBar";
import Home from "./presentational/home";
import Insert from "./presentational/insert";
import Register from "./presentational/register";
import RouteConnected from "./components/routeConnected";
import {
  homeRoute,
  insertFormRoute,
  registerListRoute
} from "./utils/definitions";

import { RootReducerState } from "./reducers/dataTypes";
import { Actions } from "./reducers/actions";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export interface OwnProps {}
export interface StateProps {}
export interface DispatchProps {
  loadCities: () => void;
  loadProffesors: () => void;
  checkIsOnline: () => void;
}

type AppConnectedProps = OwnProps & StateProps & DispatchProps;

const AppConnected: React.SFC<AppConnectedProps> = ({
  loadCities,
  loadProffesors,
  checkIsOnline
}) => {
  const startTimer = () => {
    setInterval(() => {
      checkIsOnline();
    }, 5000);
  };

  useEffect(() => {
    loadCities();
    loadProffesors();
    startTimer();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path={homeRoute} component={Home} />
          <RouteConnected path={insertFormRoute} component={Insert} />
          <RouteConnected path={registerListRoute} component={Register} />
          <Redirect to={homeRoute} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    error: state.cities.errorFetch
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  loadCities: Actions.FetchCities,
  loadProffesors: Actions.FetchProfessors,
  checkIsOnline: Actions.CheckIsOnlineThunk
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(AppConnected);
