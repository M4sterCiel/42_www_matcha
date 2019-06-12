import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register";
import ConfirmAddr from "./components/ConfirmAddr";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/users/login" component={Login} />
        <Route exact path="/users/register" component={Register} />
        <Route path="/users/register/:key" component={ConfirmAddr} />
      </div>
    </Router>
  );
}
