import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import HomeLoggedin from "./containers/HomeLoggedin";
import HomeLoggedout from "./containers/HomeLoggedout";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activities from "./containers/Activities";
import ActivitiesView from "./containers/ActivitiesView";
import NotFound from "./containers/NotFound";
import Tags from "./containers/Tags";
import Calendar from "./containers/Calendar";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/welcomePage" exact component={HomeLoggedin} />
      <Route path="/goodbyePage" exact component={HomeLoggedout} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/activities" exact component={Activities} />
      <Route path="/activitiesView" exact component={ActivitiesView} />
      <Route path="/tags" exact component={Tags} />
      <Route path="/NotFound" exact component={NotFound} />
      <Route path="Calendar" exact component={Calendar} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}


