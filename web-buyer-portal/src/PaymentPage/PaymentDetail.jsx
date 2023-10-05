import React, { useState } from "react";
import Order from "../CartPage/Order";
import { Routes, Route, useLocation } from "react-router-dom";

import CheckOut from "./CheckOut";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const PaymentDetail = () => {
  const stripePromise = loadStripe(
    "pk_test_51NottFSIQVsrQ3Rm6YLAVdL9LnMlJHAgxXA4jIn8sWONxRjN8DtM6YTJWYCbJliZdONEEaf3sSzqU97xv3My2aLe00bKRIq6Ad"
  );

  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8">
          <div className="md:w-[50%]	w-full">
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path="/check-out" element={<CheckOut />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </Elements>
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
