import React from "react";
import Order from "./Order";
import { Link } from "react-router-dom";
import { Formik } from "formik";
const Delivery = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8">
          <div className="md:w-[50%]	w-full">
            <div className="">
              <div className="py-4">
                <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Contact
                    </h5>
                    <Link to="#">
                      <h5 className="text-lg font-semibold text-[#2B4447]">
                        Change
                      </h5>
                    </Link>
                  </div>
                  <p className="text-base font-normal text-[#2B4447]">
                    myemail@gmail.com.au
                  </p>
                </div>
                <div className="border rounded-md border-[#E7E7E7] p-3">
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Contact
                    </h5>
                    <Link to="#">
                      <h5 className="text-lg font-semibold text-[#2B4447]">
                        Change
                      </h5>
                    </Link>
                  </div>
                  <p className="text-base font-normal text-[#2B4447]">
                    myemail@gmail.com.au
                  </p>
                </div>
                <div className="mt-8">
                  <label
                    className="block text-[#2B4447] text-lg font-semibold mb-4"
                    htmlFor="Delivery Contact"
                  >
                    Delivery Contact
                  </label>
                  <input
                    className=" appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Delivery Contact"
                    type="text"
                    placeholder="Delivery Contact"
                  />
                </div>
              </div>
              <Link to="/home/payment">
                <div className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white">
                  Continue to Payment
                </div>
              </Link>
              <Link to="#">
                <p className="text-[#637381] text-base font-semibold mt-4">
                  Return to Details
                </p>
              </Link>
            </div>
          </div>
          <div className="md:w-[45%] w-full overflow-scroll  mb-[2rem]">
            <Order />
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
