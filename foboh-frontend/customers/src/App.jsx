import React from "react";
import ReactDOM from "react-dom";
import './style.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCustomers from "./customers/AddCustomers";
import AddCustomersDetails from "./customers/AddCustomersDetails";
import CustomerDetails from "./AddCustomersDetails/CustomerDetails";
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/customers" element={<AddCustomers/>}/>
      {/* <Route path="/customer-app" element={<AddCustomersDetails/>}/> */}
      <Route path="/customer-app" element={<CustomerDetails/>}/>

      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
