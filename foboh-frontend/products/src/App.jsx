import React from "react";
import ReactDOM from "react-dom";


import './style.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Range from "./product/Range";
import ViewProduct from "./product/ViewProduct";
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Range/>}/>
      <Route path="/view-product" element={<ViewProduct />}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
