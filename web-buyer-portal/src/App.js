import Login from "./loginRegister/Login";

import CreateAccount from "./CreateAccount/CreateAccount";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Signup from "./loginRegister/Signup";
import { Provider } from "react-redux";
import Verifyemail from "./loginRegister/Verifyemail";
import VerifyPassword from "./loginRegister/VerifyPassword";
import HomePage from "./HomePage/HomePage";
import store from "./store/Store";
import MainHomePage from "./HomePage/MainHomePage";
import { useEffect } from "react";
import Auth from "./loginRegister/Auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RouterComponent />
      </Router>
    </Provider>
  );
}

const RouterComponent = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/home/*" element={<HomePage />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/verify-email" element={<Verifyemail />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  );
};

export default App;
