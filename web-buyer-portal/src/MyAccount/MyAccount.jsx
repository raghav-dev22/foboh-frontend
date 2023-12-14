import React from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { theme } from "antd";
// import SearchIcon from "@mui/icons-material/Search";

const MyAccount = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();
  const ProfileBtn = () => {
    navigate("/home/account/account-details/");
  };
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 px-6 ">
        <div className=" md:pb-12 md:pt-0 py-8">
          <h2
            style={{ color: token.commonThemeColor }}
            className="font-bold md:text-4xl text-2xl	 text-[#563FE3]"
          >
            Account
          </h2>
        </div>
        <div className="flex flex-col gap-4 pb-16 ">
          <div
            className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation cursor-pointer"
            onClick={() => {
              ProfileBtn();
            }}
          >
            <div className=" 	">
              <h5 className="text-lg font-semibold text-[#1D1E20]"> Profile</h5>
              <p className="text-[#8F959E] text-sm font-normal">
                View or edit details
              </p>
            </div>
            <div className="">
              <KeyboardArrowRightIcon />
            </div>
          </div>

          <div
            onClick={() => {
              ProfileBtn();
            }}
            className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation cursor-pointer"
          >
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

          <Link to="#">
            <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation cursor-pointer">
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
