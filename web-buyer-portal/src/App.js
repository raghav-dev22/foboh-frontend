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
import { useEffect, useState } from "react";
import Auth from "./loginRegister/Auth";
import { theme } from "antd";
import { ConfigProvider } from "antd";
import OrderConfirmation from "./Order/OrderConfirmation";
import OrderDetails from "./Order/OrderDetails";
import OrderHistory from "./Order/OrderHistory";


function App() {
  const { getDesignToken, useToken } = theme;
  const [config, setConfig] = useState({});

  console.log(config, "theme");
  // const config = {
  //   token: {
  //     bannerThemeColor: `linear-gradient(81deg, rgb(58 58 58 / 65%) -4.14%, rgba(252, 252, 252, 0.70) 41.98%)`,
  //     buttonThemeColor: "#2F2E2E",
  //     commonThemeColor: "#2F2E2E"
  //   },
  // };

  return (
    <ConfigProvider theme={config}>
      <Provider store={store}>
        <Router>
          <RouterComponent setConfig={setConfig} />
        </Router>
      </Provider>
    </ConfigProvider>
  );
}

const RouterComponent = ({ setConfig }) => {
  return (
    <Routes>
      <Route path="/home/*" element={<HomePage setConfig={setConfig} />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/verify-email" element={<Verifyemail />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/order-details" element={<OrderDetails />} />
      <Route path="/order-history" element={<OrderHistory />} />

      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default App;
