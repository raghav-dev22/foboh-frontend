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

import HomePage from "./HomePage/HomePage";
import store from "./store/Store";
import MainHomePage from "./HomePage/MainHomePage";
import { useEffect, useState } from "react";
import Auth from "./loginRegister/Auth";
import { theme } from "antd";
import { ConfigProvider } from "antd";
import OrderDetails from "./Order/OrderDetails";
import MyOrders from "./Order/MyOrders";
import InvoiceIncludingWET from "./invoice/InvoiceIncludingWET";
import InvoiceExcludingWET from "./invoice/InvoiceExcludingWET";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { getDesignToken, useToken } = theme;
  const [config, setConfig] = useState({});

  const queryClient = new QueryClient();

  return (
    <ConfigProvider theme={config}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <RouterComponent setConfig={setConfig} />
          </Router>
        </QueryClientProvider>
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
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="/MyOrders" element={<MyOrders />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default App;
