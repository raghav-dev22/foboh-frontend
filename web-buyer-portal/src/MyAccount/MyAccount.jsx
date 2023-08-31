import React from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";

const MyAccount = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 px-6 ">
        <div className="md:flex hidden  justify-start items-center gap-3 pt-8">
          <h5 className="text-black font-medium text-base">Home</h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base">Account</h5>
        </div>
        <div className=" relative md:hidden xl:hidden block  ">
          <input
            type="text"
            className="roun8ded-md	font-normal text-sm placeholder:text-sm"
            placeholder="Search by product or brand"
            style={{
              padding: "12px 16px 12px 38px",
              border: "0px",
              background: "#F4F7FF",
              margin: "0px",
            }}
          />
          <SearchIcon
            className="absolute top-1/4 left-2.5 "
            style={{ fill: "#563FE3" }}
          />
        </div>
        <div className=" md:py-12 py-8">
          <h2 className="font-bold md:text-4xl text-2xl	 text-[#563FE3]">
            Account
          </h2>
        </div>
        <div className="flex flex-col gap-4 pb-16 ">
          <Link to="/profile">
            <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation">
              <div className=" 	">
                <h5 className="text-lg font-semibold text-[#1D1E20]">
                  {" "}
                  Profile
                </h5>
                <p className="text-[#8F959E] text-sm font-normal">
                  View or edit details
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </Link>
          <Link to="/address">
            <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation">
              <div className=" 	">
                <h5 className="text-lg font-semibold text-[#1D1E20]">
                  {" "}
                  Addresses
                </h5>
                <p className="text-[#8F959E] text-sm font-normal">
                  Manage your addresses
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation">
              <div className=" 	">
                <h5 className="text-lg font-semibold text-[#1D1E20]">
                  Security
                </h5>
                <p className="text-[#8F959E] text-sm font-normal">
                  Manage your account and password
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
