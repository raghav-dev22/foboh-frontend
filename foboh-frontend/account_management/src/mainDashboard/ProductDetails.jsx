import React from "react";

import { stockStatus } from "../helpers/stockStatusButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function ProductDetails({ stock }) {
  return (
    <>
      {stock?.length > 0 ? (
        stock?.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex justify-between sm:items-center items-end pb-5 productItem-${index}`}
            >
              <div className=" sm:flex items-center  grid  gap-2 justify-center">
                <div className=" ">
                  <img
                    src={item?.productImageUrls}
                    alt=""
                    className="w-12 h-12"
                  />
                </div>

                <div className="">
                  <h5 className="sm:text-base text-sm font-medium  sm:font-semibold">
                    {item?.title}
                  </h5>

                  <p className="sm:text-sm font-light text-xs     sm:font-normal  ">
                    {item?.availableQty} units remaining
                  </p>
                </div>
              </div>

              {stockStatus(item?.availableQty, item?.stockThreshold)}
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full">
          {/* <img src="/assets/no-product.jpg" className="w-[100px]" alt="" /> */}
          <div className="flex justify-center items-center gap-2 flex-col">
            <RemoveShoppingCartIcon
              style={{
                fill: "rgb(140 140 140)",
                width: "70px",
                height: "70px",
              }}
            />
            <h5 className="text-base font-medium text-[#808080]">
              No data available
            </h5>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
