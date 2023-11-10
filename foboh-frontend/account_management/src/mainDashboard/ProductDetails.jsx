import React from "react";

import OutOfStockBtn from "../StockAlert/OutOfStockBtn";

import LowStockBtn from "../StockAlert/LowStockBtn";

import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { stockStatus } from "../helpers/stockStatusButton";

function ProductDetails({ stock }) {
  return (
    <>
      {stock.map((item, index) => {
        return (
          <div
            className={`flex justify-between sm:items-center items-end pt-5 productItem-${index}`}
          >
            <div className=" sm:flex items-center  grid  gap-2 justify-center">
              <div className="">
                <img src={item?.stockThreshold} alt="" className="w-12 h-12" />
              </div>

              <div className="">
                <h5 className="sm:text-base text-sm font-medium  sm:font-semibold">
                  {" "}
                  {item.title}
                </h5>

                <p className="sm:text-sm font-light text-xs     sm:font-normal  ">
                  {item.availableQty} units remaining
                </p>
              </div>
            </div>

            {stockStatus(item?.availableQty, item?.stockThreshold)}
          </div>
        );
      })}
    </>
  );
}

export default ProductDetails;
