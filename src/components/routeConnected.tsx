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
  isOnline: boolean;
}
export interface DispatchProps {}

type RouteConnectedProps = OwnProps & StateProps & DispatchProps;
const RouteConnected: React.SFC<RouteConnectedProps> = ({
  component: Component,
  path,
  isOnline
}) => {
  return isOnline ? (
    <Route path={path} component={Component} />
  ) : (
    <Redirect to={homeRoute} />
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    isOnline: state.isOnline
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
