import React from "react";
import { Link } from "react-router-dom";
function verifyemail({ emailValue }) {
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
                  Verify your email
                </h2>
                <p className="text-center">
                  Almost there! An email containing your verification link was
                  sent to{" "}
                  <Link to="#" className="text-[#563FE3]">
                    {emailValue}
                  </Link>
                </p>
                <p className="text-center">
                  Didn’t receive an email? Please double check that you entered
                  the correct email address and check your spam folder.
                </p>
                <p className="text-center">
                  Still no luck?
                  <Link
                    to="#"
                    className="font-semibold text-base	text-[#563FE3]"
                  >
                    Resend email
                  </Link>
                </p>
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

export default verifyemail;
