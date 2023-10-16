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
import MyOrders from "./Order/MyOrders";
import InvoiceIncludingWET from "./invoice/InvoiceIncludingWET";
import InvoiceExcludingWET from "./invoice/InvoiceExcludingWET";
import ForgetPassword from "./loginRegister/ForgetPassword";

function App() {
  const { getDesignToken, useToken } = theme;
  const [config, setConfig] = useState({});

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
      <Route path="/invoice-including-wet" element={<InvoiceIncludingWET />} />
      <Route path="/invoice-excluding-wet" element={<InvoiceExcludingWET />} />
      <Route path="/verify-email" element={<Verifyemail />} />
      <Route path="/verify-password" element={<VerifyPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="/MyOrders" element={<MyOrders />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default App;
