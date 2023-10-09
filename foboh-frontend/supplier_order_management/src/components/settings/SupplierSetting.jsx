import React from "react";
import { Link, useNavigate } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const SupplierSetting = () => {
  const navigate = useNavigate();
  const ProfileBtn = () => {
    navigate("/home/profile");
  };
  return (
    <>
      <div className="px-6 py-12">
        <h5 className="font-semibold text-xl text-[#2B4447]">Settings</h5>
        <div className="flex flex-col gap-4 pb-16 mt-6">
          <button>
            <div
              className="custom-shadow px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation"
              onClick={() => {
                ProfileBtn();
              }}
            >
              <div className=" 	">
                <h5 className="text-lg font-semibold text-[#1D1E20] text-left">
                  {" "}
                  Profile
                </h5>
                <p className="text-[#8F959E] text-sm font-normal text-left">
                  View or edit details
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </button>
          <button>
            <div className="custom-shadow px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation">
              <div className=" 	">
                <h5 className="text-lg font-semibold text-[#1D1E20] text-left">
                  {" "}
                  Addresses
                </h5>
                <p className="text-[#8F959E] text-sm font-normal text-left">
                  Manage your addresses
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </button>
          <button>
            <div className="custom-shadow px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md hover-animation">
              <div className=" 	">
                <h5 className="text-left text-lg font-semibold text-[#1D1E20]">
                  Security
                </h5>
                <p className="text-left text-[#8F959E] text-sm font-normal">
                  Manage your account and password
                </p>
              </div>
              <div className="">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SupplierSetting;
