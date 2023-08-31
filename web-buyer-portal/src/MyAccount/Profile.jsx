import React from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../desktop/Header";
import Footer from "../desktop/Footer";

// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Profile = () => {
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
            Profile
          </h5>
        </div>
        <div className=" md:my-12 mb-12 md:bg-white  bg-[#563FE3] md:p-0 p-4 relative">
          <h2 className="md:font-bold font-medium md:text-4xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center">
            Profile
          </h2>
          <div className="md:hidden sm:block">
            <ArrowBackIcon
              className="absolute top-[32%] left-[20px] "
              style={{ fill: "#fff" }}
            />
          </div>
        </div>
        <div className="md:grid-cols-3 grid sm:grid-cols-3	  gap-4 md:px-0 px-6">
          <div className="rounded-[5px] border border-[#E0E0E0]">
            <div className="business-details sm:bg-[#563FE3] py-2 px-4 rounded-t-[5px] 	">
              <h5 className="sm:text-white  text-[#563FE3] font-bold text-lg">
                Business Details
              </h5>
            </div>
            <div className="px-4 sm:py-5 pb-5">
              <h5 className="text-lg font-medium mb-3">Business Name</h5>
              <p className="text-sm font-normal">ABN: 90 000 000 000</p>
              <p className="text-sm font-normal">LIQ: LIQP770016926</p>
            </div>
          </div>
          <div className="rounded-[5px] border border-[#E0E0E0]">
            <div className="ordering-contact-details sm:bg-[#563FE3] py-2 px-4 rounded-t-[5px]	">
              <h5 className="sm:text-white text-[#563FE3] font-bold text-lg">
                Ordering Contact
              </h5>
            </div>
            <div className="px-4 sm:py-5 pb-5">
              <h5 className="text-lg font-medium mb-3">Jessica Smith</h5>
              <p className="text-sm font-normal">email@email.com.au</p>
              <p className="text-sm font-normal">LIQ: LIQP770016926</p>
            </div>
          </div>
          <div className="rounded-[5px] border border-[#E0E0E0]">
            <div className="delivery-contact-details sm:bg-[#563FE3] py-2 px-4 rounded-t-[5px]	">
              <h5 className="sm:text-white text-[#563FE3] font-bold text-lg">
                Delivery Contact
              </h5>
            </div>
            <div className="px-4 sm:py-5 pb-5">
              <h5 className="text-lg font-medium mb-3">First Name Last Name</h5>
              <p className="text-sm font-normal">email@email.com.cu</p>
              <p className="text-sm font-normal">0400 000 000</p>
            </div>
          </div>
        </div>
        <Link to="/profile-edit" className="">
          <div className="mx-6">
            <button className="my-12 md:mx-0 py-[12px] px-[40px] border-[2px] border-[#563FE3]  rounded-[5px] sm:w-fit w-full  flex justify-center items-center cursor-pointer gap-2">
              <ModeEditOutlineIcon style={{ fill: "#563FE3" }} />
              <p className="text-base font-medium  text-[#563FE3] ">Edit</p>
            </button>
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
