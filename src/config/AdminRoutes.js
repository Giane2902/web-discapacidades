import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "../Pages/Admin";
import UsersPage from "../Pages/Admin/UsersPage";
import ErrorPage from "../Pages/Public/Error404";

export const AdminRoutes = () => {
  return (
    <>
      <Switch>
        {/* home */}
        <Route exact path="/admin" component={Admin} />
        {/* admin data */}
        <Route exact path="/admin/users" component={UsersPage} />
        <Route exact path="/admin/error" component={ErrorPage} />

        <Redirect to="/admin/error" />
      </Switch>
    </>
  );
};
