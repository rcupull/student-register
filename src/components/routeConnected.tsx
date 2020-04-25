import React from "react";
import { Route, Redirect } from "react-router-dom";
import { homeRoute } from "../utils/definitions";
import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/dataTypes";
export interface OwnProps {
  component: any;
  path: string;
}
export interface StateProps {
  error: boolean;
}
export interface DispatchProps {}

type RouteConnectedProps = OwnProps & StateProps & DispatchProps;
const RouteConnected: React.SFC<RouteConnectedProps> = ({
  component: Component,
  path,
  error
}) => {
  return error ? (
    <Redirect to={homeRoute} />
  ) : (
    <Route path={path} component={Component} />
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    error: false
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(RouteConnected);
