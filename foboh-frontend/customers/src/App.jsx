import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCustomers from "./customers/AddCustomers";

import CustomerDetails from "./AddCustomersDetails/CustomerDetails";
import ViewCustomer from "./customers/ViewCustomer";
import CustomerBulkEdit from "./customers/CustomerBulkEdit";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/customers" element={<AddCustomers />} />
        <Route path="/view-customer-details/:id" element={<ViewCustomer />} />
        <Route path="/customer-app" element={<CustomerDetails />} />
        <Route path="/customer-bulk-edit" element={<CustomerBulkEdit />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
