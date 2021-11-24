import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoutes } from "./AdminRoutes";

import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";

// auth
import Home from "../Pages/Public/Home";
import AboutUsPage from "../Pages/Public/AboutUsPage";
import ContactUsPage from "../Pages/Public/ContactUsPage";
import ReservePage from "../Pages/Public/ReservePage";
import LoginPage from "../Pages/Public/LoginPage";
import Error404 from "../Pages/Public/Error404";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <>
        <h1>cargando</h1>
      </>
    );
  }

  //{accessToken ? <Redirect to="/admin" /> : <Redirect to="/" />}

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/aboutus" component={AboutUsPage} />
        <Route exact path="/contactus" component={ContactUsPage} />
        <Route exact path="/reserve" component={ReservePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/error" component={Error404} />

        <PrivateRoute
          path="/admin"
          component={AdminRoutes}
          isAuthenticated={!!accessToken}
        />

        <Redirect to="/error" />
      </Switch>
    </Router>
  );
};
