import PropTypes from "prop-types";
import Navbar from "../components/Admin/Navbar";
// router dom
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <>
      <main>
        <Navbar />
        <Route
          {...rest}
          component={(props) => {
            if (isAuthenticated) {
              return <Component {...props} />;
            }
            return <Redirect to={"/login"} />;
          }}
        />
      </main>
    </>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
