import React from "react";
import EastIcon from "@mui/icons-material/East";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const MyAccount = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto">
        <div className="flex justify-start items-center gap-3 pt-8">
          <h5 className="text-black font-medium text-base">Home</h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base">Account</h5>
        </div>
        <div className=" py-12">
          <h2 className="font-bold text-4xl	 text-[#563FE3]">Account</h2>
        </div>
        <div className="flex flex-col gap-4 pb-16 ">
          <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md">
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
          <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md">
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
          <div className="px-6 py-5 flex justify-between items-center border border-[#E0E0E0] rounded-md">
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
        </div>
      </div>
    </>
  );
};

export default MyAccount;
