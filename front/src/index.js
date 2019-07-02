import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { render } from "react-dom";
import MainRouter from "./routes";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById("root")
);
