import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Range from "./orders/Range";
import SupplierOrderManagement from "./components/orders/SupplierOrderManagement";
import OrderListing from "./components/orderListing/OrderListing";
// import OrderListing from "./order_details/OrderListing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SupplierOrderManagement />} />
        <Route path="/order-listing" element={<OrderListing />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
