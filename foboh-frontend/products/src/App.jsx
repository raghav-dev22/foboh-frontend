import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import './style.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Range from "./product/Range";
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Range/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
