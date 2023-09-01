import React from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../desktop/Header";
import Footer from "../desktop/Footer";
import Select from "react-select";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CartPage = () => {
  const GroupedOption = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
  ];
  return (
    <>
      <Header />
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="justify-start items-center gap-3 pt-8 md:flex hidden">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Account
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            CartPage
          </h5>
        </div>
        <div className=" md:my-12 mb-12 md:bg-white  bg-[#563FE3] md:p-0 p-4 relative">
          <h2 className="md:font-semibold font-medium md:text-2xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center">
            My Cart
          </h2>
          <div className="md:hidden sm:block">
            <ArrowBackIcon
              className="absolute top-[32%] left-[20px] "
              style={{ fill: "#fff" }}
            />
          </div>
        </div>
        <div className="flex  justify-between flex-wrap md:px-0 px-6">
          <div className="lg:w-[55%] w-full	">
            <div className="flex justify-center items-center gap-4  pb-4 border-b border-b-[#E7E7E7] mb-4">
              <div className="">
                <img
                  src="/assets/product.png"
                  alt=""
                  className="w-[150px]  object-cover	rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center  md:gap-12 gap-8  h-full py-3 w-full">
                <div>
                  <div className="flex justify-between w-full gap-3">
                    <h4 className="text-lg font-semibold text-[#2B4447]">
                      Write Product Full Name
                    </h4>
                    <div className=" md:block hidden">
                      <div className="border border-inherit rounded-md flex justify-center items-center gap-2  p-2">
                        <p className="pl-2 text-sm font-normal text-[#2B4447]">
                          1
                        </p>
                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>
                      {/* <Select
                    defaultValue={GroupedOption[1]}
                    options={GroupedOption}
                    // formatGroupLabel={formatGroupLabel}
                  /> */}
                    </div>
                    <h4 className="text-lg text-[#2B4447] font-semibold">
                      $369
                    </h4>
                  </div>

                  <div className="">
                    <p className="text-base font-medium text-[#637381]">
                      Quantity - 1
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full w-[14px] h-[14px] border border-[#637381] flex justify-center items-center">
                      <CheckIcon style={{ fill: "#637381", width: "8px" }} />
                    </div>
                    <p className="text-sm font-normal text-[#637381]">
                      Available In Stock
                    </p>
                  </div>
                  <Link to="#">
                    <p className="text-[#DC3545] text-sm font-medium">Remove</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4  pb-4 border-b border-b-[#E7E7E7] mb-4">
              <div className="">
                <img
                  src="/assets/product.png"
                  alt=""
                  className="w-[150px]  object-cover	rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center md:gap-12 gap-8 h-full py-3 w-full">
                <div>
                  <div className="flex justify-between w-full gap-3">
                    <h4 className="text-lg font-semibold text-[#2B4447]">
                      Write Product Full Name
                    </h4>
                    <div className=" md:block hidden">
                      <div className="border border-inherit rounded-md  justify-center items-center gap-2 flex   p-2">
                        <p className="pl-2 text-sm font-normal text-[#2B4447]">
                          1
                        </p>
                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>
                      {/* <Select
                    defaultValue={GroupedOption[1]}
                    options={GroupedOption}
                    // formatGroupLabel={formatGroupLabel}
                  /> */}
                    </div>
                    <h4 className="text-lg text-[#2B4447] font-semibold">
                      $369
                    </h4>
                  </div>

                  <div className="">
                    <p className="text-base font-medium text-[#637381]">
                      Quantity - 1
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full w-[14px] h-[14px] border border-[#637381] flex justify-center items-center">
                      <CheckIcon style={{ fill: "#637381", width: "8px" }} />
                    </div>
                    <p className="text-sm font-normal text-[#637381]">
                      Available In Stock
                    </p>
                  </div>
                  <Link to="#">
                    <p className="text-[#DC3545] text-sm font-medium">Remove</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[35%]	w-full">
            <div className="bg-[#FBFAFF] p-5">
              <h2 className="text-xl font-semibold text-[#2B4447] ">
                Order Summary
              </h2>
              <div className="py-4">
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Subtotal
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Shipping estimate
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Tax estimate
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
              </div>
              <button className="bg-[#563FE3] rounded-[8px] w-full py-[9px] text-base font-medium text-white">
                {" "}
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
