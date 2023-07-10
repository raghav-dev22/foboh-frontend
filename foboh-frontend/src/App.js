import React, { useEffect } from "react";
import './style.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ResetLinkCard from "./auth/signin/ResetLinkCard";
// import Home from './Home';

import RegistrationEmail from "./auth/signup/RegistrationEmail";
import Registration from "./auth/signup/Registration";
import ResetPasswordForm from "./auth/signin/ResetPasswordForm";
import PasswordResetSuccess from "./auth/signin/PasswordResetSuccess";
import SigninNew from "./auth/signin/SigninNew";
import SignupNew from "./auth/signup/SignupNew";
import MyAccount from "./pages/MyAccount";
import Home from "./dashboard/Home";
import ResetPasswordEmail from "./auth/signin/ResetPasswordEmail";
// import DashBoard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";
import Dashboard from "./dashboard/Dashboard";
import Organisation from "./Settings/Organisation";


// const url = process.env.REACT_APP_EXPRESS_SERVER_URL




const App = () => {
  // Getting token from server
  useEffect(() => {
    const url = process.env.REACT_APP_URL

    fetch(`http://127.0.0.1:8000/api/token`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Organisation" element={<Organisation/>}/>
        <Route path="/auth/sign-in"  element={<SigninNew />} />
        <Route path="/auth/sign-up" element={<SignupNew />} />
        <Route path="/auth/password-reset-email" element={<ResetPasswordEmail />} />
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
  );
};

export default App;
