import React from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Profile = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto">
        <div className="flex justify-start items-center gap-3 pt-8">
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
        <div className=" py-12">
          <h2 className="font-bold text-4xl	 text-[#563FE3]">Profile</h2>
        </div>
        <div className="md:grid-cols-3 grid sm:grid-cols-3	  gap-4">
          <div className="rounded-md border border-[#E0E0E0]">
            <div className="business-details bg-[#563FE3] py-2 px-4 rounded-t-md	">
              <h5 className="text-white font-semibold text-lg">
                Business Details
              </h5>
            </div>
            <div className="px-4 py-5">
              <h5 className="text-lg font-medium mb-3">Business Name</h5>
              <p className="text-sm font-normal">ABN: 90 000 000 000</p>
              <p className="text-sm font-normal">LIQ: LIQP770016926</p>
            </div>
          </div>
          <div className="rounded-md border border-[#E0E0E0]">
            <div className="ordering-contact-details bg-[#563FE3] py-2 px-4 rounded-t-md	">
              <h5 className="text-white font-semibold text-lg">
                Ordering Contact
              </h5>
            </div>
            <div className="px-4 py-5">
              <h5 className="text-lg font-medium mb-3">Jessica Smith</h5>
              <p className="text-sm font-normal">email@email.com.au</p>
              <p className="text-sm font-normal">LIQ: LIQP770016926</p>
            </div>
          </div>
          <div className="rounded-md border border-[#E0E0E0]">
            <div className="delivery-contact-details bg-[#563FE3] py-2 px-4 rounded-t-md	">
              <h5 className="text-white font-semibold text-lg">
                Delivery Contact
              </h5>
            </div>
            <div className="px-4 py-5">
              <h5 className="text-lg font-medium mb-3">First Name Last Name</h5>
              <p className="text-sm font-normal">email@email.com.cu</p>
              <p className="text-sm font-normal">0400 000 000</p>
            </div>
          </div>
        </div>
        <div className="my-12 py-[12px] px-[40px] border-[2px] border-[#563FE3]  rounded-md w-fit flex justify-center items-center cursor-pointer gap-2">
          <ModeEditOutlineIcon style={{ fill: "#563FE3" }} />
          <p className="text-base font-medium  text-[#563FE3] ">Edit</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
