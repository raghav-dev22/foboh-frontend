import React from "react";

import OutOfStockBtn from "../StockAlert/OutOfStockBtn";

import LowStockBtn from "../StockAlert/LowStockBtn";

import { Button } from "@mui/material";

function ProductDetails() {
  const productItem = [
    {
      title: "Dovia Chardona..",

      subtitle: "No units remaining",

      stockbtn: (
        <span className="bg-[#D3405314] text-[#DC3545] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#D3405314] dark:text-[#DC3545]">
          Out of stock
        </span>
      ),
    },

    {
      title: "Gomar Riesling",

      subtitle: " 5 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },

    {
      title: "Product name",

      subtitle: " 5 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },

    {
      title: "Product name",

      subtitle: " 10 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },
    {
      title: "Product name",

      subtitle: " 10 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },
    {
      title: "Product name",

      subtitle: " 10 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },
    {
      title: "Product name",

      subtitle: " 10 units remaining",

      stockbtn: (
        <span className="bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Low stock
        </span>
      ),
    },
  ];

  return (
    <>
      {productItem.map((item, index) => {
        return (
          <div
            className={`flex justify-between sm:items-center items-end pt-5 productItem-${index}`}
          >
            <div className=" sm:flex items-center  grid  gap-2 justify-center">
              <div className="">
                <img src="/assets/stock.jpg" alt="" className="w-12 h-12" />
              </div>

              <div className="">
                <h5 className="sm:text-base text-sm font-medium  sm:font-semibold">
                  {" "}
                  {item.title}
                </h5>

                <p className="sm:text-sm font-light text-xs     sm:font-normal  ">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {item.stockbtn}
          </div>
        );
      })}
    </>
  );
}

export default ProductDetails;
