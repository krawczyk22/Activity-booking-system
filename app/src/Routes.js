import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activities from "./containers/Activities";
import NotFound from "./containers/NotFound";


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/activities" exact component={Activities} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}


