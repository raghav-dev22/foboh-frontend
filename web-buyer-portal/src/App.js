import Login from "./loginRegister/Login";

import CreateAccount from "./CreateAccount/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./loginRegister/Signup";
import { Provider } from "react-redux";
import Verifyemail from "./loginRegister/Verifyemail";
import HomePage from "./desktop/HomePage";
import store from "./store/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/home/*" element={<HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/verify-email" element={<Verifyemail />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
