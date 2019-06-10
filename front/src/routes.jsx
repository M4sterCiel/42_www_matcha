import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import Login from "./Login";
import Register from "./Register";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/users/login" component={Login} />
        <Route path="/users/register" component={Register} />
      </div>
    </Router>
  );
}
