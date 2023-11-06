import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import CreateAccount from "../CreateAccount/CreateAccount";
import ForgetPassword from "./ForgetPassword";
import Verifyemail from "./Verifyemail";
import VerifyPassword from "./VerifyPassword";
import ForgetPasswordForm from "./ForgetPasswordForm";

const Auth = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      navigate("/home/main");
    }
  }, []);

  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/verify-email" element={<Verifyemail />} />
      <Route path="/verify-password" element={<VerifyPassword />} />
      <Route path="/reset-password/:id" element={<ForgetPasswordForm />} />
      <Route path="/forget-password-email" element={<ForgetPassword />} />
    </Routes>
  );
};

export default Auth;
