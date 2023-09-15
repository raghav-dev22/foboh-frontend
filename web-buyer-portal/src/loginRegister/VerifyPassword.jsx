import React from "react";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
function verifyPassword({ emailValue }) {
  return (
    <>
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
                  Hi [first name], To reset your password, just click the button
                  below.
                  <Link to="#" className="text-[#563FE3]">
                    {emailValue}
                  </Link>
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-center 	">
                    <span className="font-bold">Too late?</span>
                    You can request another password reset here.
                  </p>
                  <p className="text-center 	">
                    <span className="font-bold">
                      Didn’t request this email?{" "}
                    </span>
                    You don’t need to do anything, your password will remain the
                    same.
                  </p>
                  <p className="text-center 	">
                    <span className="font-bold">Having trouble?</span>
                    <Link to="#" className="font-bold text-[#563FE3]">
                      Let us help
                    </Link>
                  </p>{" "}
                </div>
                <Link to="#" className="">
                  <button className="font-semibold text-base bg-[#563FE3] rounded-[8px] py-3 px-4	text-[#ffffff] flex gap-2 ">
                    {" "}
                    Reset password
                    <SendIcon />
                  </button>
                </Link>
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
    </>
  );
}

export default verifyPassword;
