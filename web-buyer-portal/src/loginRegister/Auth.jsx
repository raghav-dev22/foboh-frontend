import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";

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
    </Routes>
  );
};

export default Auth;
