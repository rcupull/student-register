import React from "react";
import AppConnected from "./AppConnected";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { RootReducer } from "./reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";

const store = createStore(RootReducer, applyMiddleware(thunk));

export interface AppProps {}
const App: React.SFC<AppProps> = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default App;
