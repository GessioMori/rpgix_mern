import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";

import Groups from "../Groups/Groups";
import Group from "../Group/Group";
import ManageGroup from "../ManageGroup/ManageGroup";

const Pages = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path="/dashboard" exact component={Groups} />
        <Route path="/dashboard/group/:id" exact component={Group} />
        <Route
          path="/dashboard/managegroup/:id"
          exact
          component={ManageGroup}
        />
      </Switch>
    </>
  );
};

export default Pages;
