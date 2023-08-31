import React, { useState } from "react";
import Footer from "./Footer";
import EastIcon from "@mui/icons-material/East";
import Header from "./Header";
import BottomToTop from "./BottomToTop";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "react-select";
import Slider from "@mui/material/Slider";
// import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";
import { listdata } from "../data";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/CartSlice";
import { increment, decrement } from '../slices/counterSlice';




const ProductDetails = () => {
  const { id } = useParams();
  const product = listdata.find((item) => item.id === (+id));
  console.log("getProduct",product.img);
 
  // for add to card redux
  const dispatch = useDispatch();
  const counterValue = useSelector((state) => state?.counter?.value);
  const addCart = (product) => {
    dispatch(add(product));
  };

  return (
    <>
      <Header />
      <div className="md:w-[85%] w-full mx-auto">
        <div className="flex justify-start items-center gap-3 py-8">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Account
          </h5>
        </div>
        <div className="flex flex-nowrap gap-8">
          <div className="w-full lg:w-2/5	 h-full	">
            <div className="grid gap-5">
            <div>
              <img src={product.img} alt="" className="img-fluid" />
            </div>
              <div className="grid grid-cols-3 gap-5">
                <img src={product.img} alt="" />
                <img src={product.img} alt="" />
                <img src={product.img} alt="" />
              </div>
            </div>
          </div>
          <div className=" lg:w-3/5 w-full   h-full	 grid gap-1	  p-4">
            <h1 className="text-[28px] text-[#2B4447] font-bold">
              {" "}
              {product.title}
            </h1>
            <h5 className="text-lg font-medium text-[#637381]">{product.name}</h5>
            <div className="flex  items-center gap-2">
              <h5 className="text-lg font-medium text-[#2B4447]">
              {product.details}{" "}
              </h5>
              <h5 className="text-lg font-medium text-[#2B4447]">*</h5>
              <h5 className="text-lg font-medium text-[#2B4447]">750ml</h5>
            </div>
            <div className="flex items-center gap-3">
              <h5 className="text-[#DC3545] text-lg font-medium">25% off</h5>
              <h5 className="text-lg font-semibold">$369</h5>
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
                <p className="text-[#637381] " onClick={() => dispatch(decrement())}>-</p>
                <p className="text-[#637381]"> {counterValue} </p>
                <p className="text-[#637381]" onClick={() => dispatch(increment())}>+</p>
              </div>
              <button className=" bg-[#563FE3] rounded-md py-[10px] px-[28px] text-sm font-medium text-white flex justify-center items-center gap-2"
               onClick={() => {
                    addCart(product);
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
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>
                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>

                <p className="text-base font-normal text-[#2B4447] py-2">
                  Vintage:
                </p>
              </div>
              <div className="">
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>
                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>

                <p className="text-base font-semibold text-[#2B4447] py-2">
                  Vintage name
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <Footer />
      <BottomToTop />
    </>
  );
};

export default ProductDetails;
