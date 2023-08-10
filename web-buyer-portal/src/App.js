import Login from "./loginRegister/Login";

import CreateAccount from "./CreateAccount/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./loginRegister/Signup";
import Verifyemail from "./loginRegister/Verifyemail";
import HomePage from "./desktop/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify-email" element={<Verifyemail />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
