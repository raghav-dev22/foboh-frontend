import React, { useState } from "react";
import Order from "../CartPage/Order";
import { Routes, Route, useLocation } from "react-router-dom";

import CheckOut from "./CheckOut";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "react-query";
import { getCart } from "../react-query/cartApiModule";
const PaymentDetail = () => {
  const stripePromise = loadStripe(
    "pk_test_51NcFuWKrTbQIkCohQ431xjnc6S9GjcWEuCVW79nVJmpAyn92EPghuk5DZcMzI9Cq9ZFAhWGLnr0AQxVkbA8L39mK00mcbrhKr4"
  );

  // Fetching cart data
  const {
    data: cartData,
    error: sealedCartError,
    refetch,
  } = useQuery({
    queryKey: "getSealedCartApi",
    queryFn: getCart,
  });

  if (cartData) {
    console.log("cartData", cartData);
  }

  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8">
          <div className="md:w-[50%]	w-full">
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path="/check-out" element={<CheckOut />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route
                  path="/payment"
                  element={
                    <Payment
                      cartData={cartData}
                      sealedCartError={sealedCartError}
                      refetch={refetch}
                    />
                  }
                />
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
