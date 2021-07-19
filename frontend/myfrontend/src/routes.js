import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./login";
import Movie from "./movie";
import Signup from "./signup";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/movie">
          <Movie />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
