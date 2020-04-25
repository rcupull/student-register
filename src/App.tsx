import React from "react";
import AppConnected from "./AppConnected";

import { Provider } from "react-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { RootReducer } from "./reducers/rootReducer";
import { RootReducerState } from "./reducers/dataTypes";
import { OwnAction } from "./reducers/actions";
import { createStore, applyMiddleware } from "redux";

const store = createStore(
  RootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootReducerState, OwnAction>)
);

export interface AppProps {}
const App: React.SFC<AppProps> = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default App;
