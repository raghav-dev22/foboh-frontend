import React, { useState } from "react";
// import Order from "./Order";
import Order from "../CartPage/Order";
import { Routes, Route, useLocation } from "react-router-dom";

import CheckOut from "./CheckOut";
import Delivery from "./Delivery";
import Payment from "./Payment";
const PaymentDetail = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8">
          <div className="md:w-[50%]	w-full">
            <Routes>
              {/* <Route path="/home-page" element={<MainHomePage />} /> */}
              <Route path="/check-out" element={<CheckOut />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
          <div className="md:w-[45%] w-full overflow-scroll  mb-[2rem]">
            <Order />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
