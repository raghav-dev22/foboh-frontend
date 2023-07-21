import React from "react";
import ReactDOM from "react-dom";
import './style.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCustomers from "./customers/AddCustomers";

import CustomerDetails from "./AddCustomersDetails/CustomerDetails";
import ViewCustomer from "./customers/ViewCustomer";
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/customers" element={<AddCustomers/>}/>
      <Route path="/view-customer-details" element={<ViewCustomer/>}/>
      <Route path="/customer-app" element={<CustomerDetails/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
