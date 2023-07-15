import React, { useState } from "react";
// import Header from '../dashboard/Header';
import Sidebar from "../dashboard/sidebar";
import PersonalDetails from "./PersonalDetails";
import EditProfile from "./EditProfile";
import ProfileHeader from "../dashboard/ProfileHeader";
// import { Formik, Form, Field, ErrorMessage } from 'formik';

function Profile() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <>
      <div className="flex flex-no-wrap">
        <div className="w-custom-20  absolute sm:relative border border-inherit md:h-full flex-col justify-between hidden sm:flex">
          <Sidebar />
        </div>
        <div
          className="w-64 z-40 absolute bg-white  shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out"
          id="mobile-nav"
        >
          <div
            className="h-10 w-10 bg-gray-800 absolute left-4 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer"
            id="mobile-toggler"
            onClick={sidebarHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx={6} cy={10} r={2} />
              <line x1={6} y1={4} x2={6} y2={8} />
              <line x1={6} y1={12} x2={6} y2={20} />
              <circle cx={12} cy={16} r={2} />
              <line x1={12} y1={4} x2={12} y2={14} />
              <line x1={12} y1={18} x2={12} y2={20} />
              <circle cx={18} cy={7} r={2} />
              <line x1={18} y1={4} x2={18} y2={5} />
              <line x1={18} y1={9} x2={18} y2={20} />
            </svg>
          </div>
          <div
            className={`	justify-between h-screen ${
              isDivVisible ? "grid" : "hidden"
            }`}
          >
            <Sidebar />
          </div>
        </div>
        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto  h-64 md:w-4/5 w-full ">
          <div className="container mx-auto px-0">
            {/* <Header /> */}
            <ProfileHeader />
            <div>
              <div className="profile-section  sm:px-11 px-5 h-custom-half     overflow-y-scroll	scroll-smooth	scrollable	">
                <div className="sm:py-12 py-8	">
                  <h4 className="text-green text-2xl	font-semibold pb-2	">
                    {" "}
                    Your profile
                  </h4>
                  <p className="text-gray font-medium	 text-sm	">
                    Customise your public profile
                  </p>
                </div>
                <div className="grid gap-5 lg:flex  ">
                  <PersonalDetails />
                  <EditProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
