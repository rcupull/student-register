import React, { useEffect, useState } from "react";
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

import { RootReducerState } from "./reducers/rootReducer";
import { Actions } from "./reducers/actions";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export interface OwnProps {}
export interface StateProps {
  error: boolean;
}
export interface DispatchProps {
  loadCities: () => void;
  loadProffesors: () => void;
}

type AppConnectedProps = OwnProps & StateProps & DispatchProps;

const AppConnected: React.SFC<AppConnectedProps> = ({
  loadCities,
  loadProffesors,
  error
}) => {
  const [time, setTime] = useState<NodeJS.Timeout>(setTimeout(() => {}, 1));
  const handleLoad = () => {
    loadCities();
    loadProffesors();
  };

  const stopTimer = () => {
    clearInterval(time);
  };
  const startTimer = () => {
    setTime(
      setInterval(() => {
        handleLoad();
      }, 5000)
    );
  };

  const handleCheckError = () => {
    if (error) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  useEffect(() => {
    handleCheckError();
  }, [error]);

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
    error: state.error
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  loadCities: Actions.FetchCitiesThunk,
  loadProffesors: Actions.FetchProfessorsThunk
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(AppConnected);
