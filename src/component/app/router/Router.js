import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "../../home/Home";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
