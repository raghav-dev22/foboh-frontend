import React from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const AddressDetails = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 px-6 ">
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
            Addresses
          </h5>
        </div>
        <div className=" py-12">
          <h2 className="font-bold text-4xl	 text-[#563FE3]">Addresses</h2>
        </div>
        <div className="md:grid-cols-3 grid sm:grid-cols-3	  gap-4">
          <div className="rounded-md border border-[#E0E0E0]">
            <div className="business-details bg-[#563FE3] py-2 px-4 rounded-t-md	">
              <h5 className="text-white font-semibold text-lg">
                Delivery Address
              </h5>
            </div>
            <div className="px-4 py-5">
              <div className="">
                <h5 className="text-lg font-medium mb-2">456 King Street</h5>
                <p className="text-sm font-normal">Newton, NSW 2304</p>
                <p className="text-sm font-normal">Australia</p>
              </div>
              <div className=" mt-5">
                <h5 className="text-lg font-medium mb-2">Notes</h5>
                <div className="flex items-center gap-2">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_18_521"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                    >
                      <path d="M20 0H0V20H20V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_18_521)">
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66996 2.5 3.333 2.5H9.16634C9.62657 2.5 9.99963 2.8731 9.99963 3.33333C9.99963 3.79357 9.62657 4.16667 9.16634 4.16667H3.333C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.333 17.5H14.9996C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1265 10 17.4996 10.3731 17.4996 10.8333V16.6667C17.4996 17.3297 17.2362 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9996 19.1667H3.333C2.66996 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill="#637381"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6663 2.39909C16.4185 2.39909 16.1808 2.49754 16.0056 2.67278L8.25216 10.4262L7.81166 12.1882L9.57365 11.7477L17.3271 3.99427C17.5023 3.81903 17.6008 3.58135 17.6008 3.33352C17.6008 3.0857 17.5023 2.84802 17.3271 2.67278C17.1518 2.49754 16.9142 2.39909 16.6663 2.39909ZM14.8271 1.49427C15.3149 1.00647 15.9765 0.732422 16.6663 0.732422C17.3562 0.732422 18.0178 1.00647 18.5056 1.49427C18.9934 1.98207 19.2674 2.64367 19.2674 3.33352C19.2674 4.02338 18.9934 4.68498 18.5056 5.17278L10.5889 13.0894C10.4821 13.1962 10.3483 13.272 10.2018 13.3086L6.86847 14.142C6.58449 14.213 6.28408 14.1298 6.0771 13.9228C5.87012 13.7158 5.78691 13.4154 5.8579 13.1314L6.69124 9.79808C6.72787 9.65155 6.80363 9.51773 6.91043 9.41093L14.8271 1.49427Z"
                          fill="#637381"
                        />
                      </g>
                    </g>
                  </svg>

                  <p className="text-sm font-normal">
                    Add delivery instruction here
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#E0E0E0]">
            <div className="ordering-contact-details bg-[#563FE3] py-2 px-4 rounded-t-md	">
              <h5 className="text-white font-semibold text-lg">
                Billing Address
              </h5>
            </div>
            <div className="px-4 py-5">
              <h5 className="text-lg font-medium mb-2">
                No billing address found
              </h5>
            </div>
          </div>
        </div>
        <Link to="/delivery-edit">
          <div className="my-12 py-[12px] px-[40px] border-[2px] border-[#563FE3]  rounded-md w-fit flex justify-center items-center cursor-pointer gap-2">
            <ModeEditOutlineIcon style={{ fill: "#563FE3" }} />
            <p className="text-base font-medium  text-[#563FE3] ">Edit</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AddressDetails;
