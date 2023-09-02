import React, { useState } from "react";
// import Footer from "./Footer";
// import EastIcon from "@mui/icons-material/East";
// import Header from "./Header";
// import BottomToTop from "./BottomToTop";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { SliderComponent } from "@syncfusion/ej2-react-inputs";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import Select from "react-select";
// import Slider from "@mui/material/Slider";
// import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";
import { listdata } from "../data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/CartSlice";
import { increment, decrement } from "../slices/counterSlice";
import { setProductData } from "../slices/ProductSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.product);

  const productData = products.find((item) => item.product?.id === +id);
  console.log("prod >>", productData);
  // for add to card redux
  const dispatch = useDispatch();
  const addCart = (product) => {
    dispatch(add(product));
  };

  const handleIncrementDecrement = (id, actionType) => {
    const updatedProductData = products.map((item) => {
      if (item.product.id === id) {
        if (actionType === "decrement" && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else if (actionType === "increment") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }
      return item;
    });

    dispatch(setProductData(updatedProductData));
  };

  return (
    <>
      {/* <Header /> */}
      <div className="md:w-[85%] w-full mx-auto md:px-0 px-6 ">
        {/* <div className="flex justify-start items-center gap-3 py-8">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Account
          </h5>
        </div> */}
        <div className="flex md:flex-nowrap flex-wrap gap-8">
          <div className="w-full lg:w-2/5	 h-full	">
            <div className="grid gap-5">
              <div>
                <img
                  src={productData?.product?.img}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <img src={productData?.product?.img} alt="" />
                <img src={productData?.product?.img} alt="" />
                <img src={productData?.product?.img} alt="" />
              </div>
            </div>
          </div>
          <div className=" lg:w-3/5 w-full   h-full	 grid gap-1	  p-4">
            <h1 className="text-[28px] text-[#2B4447] font-bold">
              {" "}
              {productData?.product?.title}
            </h1>
            <h5 className="text-lg font-medium text-[#637381]">
              {productData?.product?.name}
            </h5>
            <div className="flex  items-center gap-2">
              <h5 className="text-lg font-medium text-[#2B4447]">
                {productData?.product?.details}{" "}
              </h5>
              <h5 className="text-lg font-medium text-[#2B4447]">*</h5>
              <h5 className="text-lg font-medium text-[#2B4447]">750ml</h5>
            </div>
            <div className="flex items-center gap-3">
              <h5 className="text-[#DC3545] text-lg font-medium">25% off</h5>
              <h5 className="text-lg font-semibold">
                {productData?.product?.price}
              </h5>
            </div>
            <div className="py-3">
              <p className="text-sm font-normal text-[#637381] leading-[25px]">
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content.
              </p>
            </div>
            <div className="flex  justify-between md:w-[365px] w-full items-center py-2 ">
              <div className="border border-[#E7E7E7] py-[10px] px-[20px] rounded-md flex justify-center items-center gap-3">
                <p
                  className="text-[#637381] cursor-pointer"
                  onClick={() =>
                    handleIncrementDecrement(
                      productData?.product.id,
                      "decrement"
                    )
                  }
                >
                  -
                </p>
                <p className="text-[#637381]"> {productData?.quantity} </p>
                <p
                  className="text-[#637381] cursor-pointer"
                  onClick={() =>
                    handleIncrementDecrement(
                      productData?.product.id,
                      "increment"
                    )
                  }
                >
                  +
                </p>
              </div>
              <button
                className=" bg-[#563FE3] rounded-md py-[10px] px-[28px] text-sm font-medium text-white flex justify-center items-center gap-2"
                onClick={() => {
                  addCart(productData);
                }}
              >
                {" "}
                <ShoppingBasketIcon style={{ fill: "#fff" }} />
                Add To Cart
              </button>
            </div>
            <div className="flex justify-between items-center md:w-[365px] w-full pt-3">
              <div className="">
                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>
                <p className="text-base font-normal text-[#2B4447] py-2">
                  Type:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Alchohol Level:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Awards:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Wine Style:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Country:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Region:
                </p>
                <p className="text-base font-normal text-[#2B4447] py-2">
                  Serving Temperature:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Taste:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  ABV:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  SKU:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Grape Variety
                </p>
              </div>
              <div className="">
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Type name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Alcohol level
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Awards
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Wine style
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Country
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Region name
                </p>
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Temperature
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Taste
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  ABV
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  SKU
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Grape variety
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      {/* <BottomToTop /> */}
    </>
  );
};

export default ProductDetails;
