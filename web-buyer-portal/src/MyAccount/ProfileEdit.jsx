import React from "react";
import EastIcon from "@mui/icons-material/East";
import Header from "../desktop/Header";
import Footer from "../desktop/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Button, Form, Input, Radio } from "antd";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ProfileEdit = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto ">
        <div className="md:w-4/5 w-full">
          {/* <div className="md:flex hidden justify-start items-center gap-3 pt-8">
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
            <EastIcon />
            <h5 className="text-black font-medium text-base cursor-pointer">
              BusinessDetails
            </h5>
          </div> */}
          <div className=" mb-12 md:hidden block  bg-[#563FE3] md:p-0 p-4 relative">
            <h2 className="md:font-bold font-medium md:text-4xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center">
              Edit Profile
            </h2>
            <div className="md:hidden sm:block">
              <ArrowBackIcon
                className="absolute top-[32%] left-[20px] "
                style={{ fill: "#fff" }}
              />
            </div>
          </div>
          <div className="md:p-0 px-6">
            <div className="pb-8">
              <h2 className="font-bold text-xl	 text-[#563FE3]">
                BusinessDetails
              </h2>
            </div>
            <div className="">
              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="BusinessName"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Business name *
                </label>
                <input
                  type="text"
                  id="BusinessName"
                  name="BusinessName"
                  className="pl-custom-left"
                />

                <div className=" absolute top-[50px] left-4">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.7916 13.2533V7.00331H4.04158V13.2533H2.7916ZM7.37491 13.2533V7.00331H8.62487V13.2533H7.37491ZM0.307617 16.17V14.92H15.6922V16.17H0.307617ZM11.9582 13.2533V7.00331H13.2082V13.2533H11.9582ZM0.307617 5.33664V4.15077L7.99989 0.384766L15.6922 4.15077V5.33664H0.307617ZM3.2627 4.08666H12.7371L7.99989 1.79499L3.2627 4.08666Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
              </div>

              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="ABN"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  ABN *
                </label>

                <input
                  type="text"
                  id="ABN"
                  className="pl-custom-left"
                  autoComplete="off"
                />

                <div className=" absolute top-[50px] left-4">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.42476 13.5455L3.25809 10.2122H0.181152L0.493652 8.96224H3.57059L4.50809 5.2122H1.01449L1.32699 3.96224H4.82059L5.65392 0.628906H6.89588L6.06255 3.96224H9.50005L10.3334 0.628906H11.5753L10.742 3.96224H13.8189L13.5064 5.2122H10.4295L9.49201 8.96224H12.9856L12.6731 10.2122H9.17951L8.34617 13.5455H7.10422L7.93755 10.2122H4.50005L3.66672 13.5455H2.42476ZM4.81255 8.96224H8.25005L9.18755 5.2122H5.75005L4.81255 8.96224Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <label
                  className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                  htmlFor="password"
                ></label>
              </div>

              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="LiquerLicence"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Liquor licence{" "}
                  <span className="text-sm font-normal">Optional</span>
                </label>

                <input
                  type="text"
                  id="LiquerLicence"
                  className="pl-custom-left"
                  autoComplete="off"
                />

                <div className=" absolute top-[50px] left-4">
                  <svg
                    width="10"
                    height="15"
                    viewBox="0 0 10 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.95517 14.5846V13.3346H4.37505V9.74166C3.1806 9.55255 2.21426 9.01435 1.47601 8.12707C0.73777 7.2398 0.368652 6.19787 0.368652 5.00128V0.417969H9.6314V5.00128C9.6314 6.19787 9.26228 7.2398 8.52405 8.12707C7.7858 9.01435 6.81945 9.55255 5.62501 9.74166V13.3346H8.04488V14.5846H1.95517ZM5.00003 8.54297C5.82589 8.54297 6.54651 8.26412 7.1619 7.70641C7.77729 7.14871 8.15817 6.45533 8.30453 5.62626H1.69553C1.84189 6.45533 2.22276 7.14871 2.83815 7.70641C3.45354 8.26412 4.17417 8.54297 5.00003 8.54297ZM1.61861 4.3763H8.38144V1.66795H1.61861V4.3763Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <label
                  className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                  htmlFor="password"
                ></label>
              </div>
            </div>
          </div>
          <div className=" md:p-0 px-6">
            <div className="   pb-8">
              <h2 className="font-bold text-xl	 text-[#563FE3]">
                Ordering Contact
              </h2>
            </div>
            <div className="">
              <div className="flex flex-nowrap   gap-8">
                <div className="w-full mb-8">
                  <label
                    htmlFor="BusinessName"
                    className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="BusinessName"
                    name="BusinessName"
                    className="pl-custom-left"
                  />
                </div>

                <div className="w-full mb-8">
                  <label
                    htmlFor="ABN"
                    className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="ABN"
                    className="pl-custom-left"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="LiquerLicence"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Email
                  <span className="text-sm font-normal">
                    This can’t be changed
                  </span>
                </label>

                <input
                  type="text"
                  id="LiquerLicence"
                  className="pl-custom-left "
                  autoComplete="off"
                  disabled
                  style={{ background: "#F1EFEF" }}
                />
              </div>
              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="LiquerLicence"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Mobile
                </label>

                <input
                  type="text"
                  id="LiquerLicence"
                  className="pl-custom-left"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className=" md:p-0 px-6">
            <div className=" pb-8">
              <h2 className="font-bold text-xl	 text-[#563FE3]">
                Ordering Contact
              </h2>
            </div>
            <div className="">
              <div className="flex flex-nowrap   gap-8">
                <div className="w-full mb-8">
                  <label
                    htmlFor="BusinessName"
                    className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="BusinessName"
                    name="BusinessName"
                    className="pl-custom-left"
                  />
                </div>

                <div className="w-full mb-8">
                  <label
                    htmlFor="ABN"
                    className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="ABN"
                    className="pl-custom-left"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="LiquerLicence"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Email
                </label>

                <input
                  type="text"
                  id="LiquerLicence"
                  className="pl-custom-left"
                  autoComplete="off"
                />
              </div>
              <div className={`relative mb-8 `} data-te-input-wrapper-init>
                <label
                  htmlFor="LiquerLicence"
                  className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
                >
                  Mobile
                </label>

                <input
                  type="text"
                  id="LiquerLicence"
                  className="pl-custom-left"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex gap-8 pt-5 pb-16">
              <button className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal">
                Cancel
              </button>
              <button className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
