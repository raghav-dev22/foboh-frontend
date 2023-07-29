import React, { useEffect } from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ReactDOM from "react-dom";

import ResetLinkCard from "./auth/signin/ResetLinkCard";
// import Home from './Home';

import RegistrationEmail from "./auth/signup/RegistrationEmail";
import Registration from "./auth/signup/Registration";
import ResetPasswordForm from "./auth/signin/ResetPasswordForm";
import PasswordResetSuccess from "./auth/signin/PasswordResetSuccess";
import SigninNew from "./auth/signin/SigninNew";
import SignupNew from "./auth/signup/SignupNew";
import MyAccount from "./pages/MyAccount";
import ResetPasswordEmail from "./auth/signin/ResetPasswordEmail";
import Dashboard from "./dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

// const url = process.env.REACT_APP_EXPRESS_SERVER_URL

const App = () => {
  // Getting token from server
  useEffect(() => {
    // const url = process.env.REACT_APP_URL

    fetch(`https://fobauthservice.azurewebsites.net/api/Verify/GetToken`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.tokenresponse.access_token);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/dashboard/*" element={<Dashboard />} />
          {/* <Route path="/dashboard/Profile" element={<Profile/>}/> */}
          {/* <Route path="/dashboard/Organisation" element={<Organisation/>}/> */}
          <Route path="/auth/sign-in" element={<SigninNew />} />
          <Route path="/auth/sign-up" element={<SignupNew />} />
          <Route
            path="/auth/password-reset-email"
            element={<ResetPasswordEmail />}
          />
          <Route
            path="/auth/password-reset-form/:id"
            element={<ResetPasswordForm />}
          />
          <Route path="/auth/reset-link/:id" element={<ResetLinkCard />} />
          <Route
            path="/auth/registration-email/:id"
            element={<RegistrationEmail />}
          />
          <Route path="/auth/registration/:id" element={<Registration />} />
          <Route
            path="/auth/password-reset-success"
            element={<PasswordResetSuccess />}
          />
          <Route path="/dashboard/my-account" element={<MyAccount />} />
        </Routes>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
