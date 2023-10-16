import React from "react";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="absolute md:bg-[#F8FAFC]  w-full flex items-center justify-center  top-0	right-0	bottom-0	left-0	">
        <div className="lg:container container-fluid mx-auto lg:px-6  px-0">
          <div className="w-full lg:scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white   ">
              <div className="    block md:hidden">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-36	object-cover	 w-full  "
                  alt="signin"
                />
              </div>
              <div
                className="w-fit	 md:w-1/2  #FFFFFF
                  rounded-lg custom-shadow p-8 mx-10 my-14 flex flex-col justify-center items-center gap-8"
              >
                <h2 className="text-[#563FE3]  text-3xl	font-bold text-center	">
                  {" "}
                  Reset your password
                </h2>
                <p className="text-center">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="md:text-base text-sm	 font-normal text-[#2B4447]"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="test@gmail.com"
                    autoComplete="on"
                  />
                </div>
                <button
                  onClick={() => {
                    navigate("/verify-password");
                  }}
                  className="py-2.5 w-full flex justify-center items-center bg-[#563FE3] rounded-[6px] text-base text-white font-semibold"
                >
                  Reset password
                </button>
              </div>
              <div className="  md:w-1/2  hidden md:block ">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-full w-full  "
                  alt="signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
