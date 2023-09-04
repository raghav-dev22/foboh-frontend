import React from "react";
import Order from "./Order";
import Link from "antd/es/typography/Link";

const CheckOut = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8">
          <div className="md:w-[50%]	w-full">
            <div className="">
              <h2 className="text-xl font-semibold text-[#2B4447] ">Details</h2>
              <div className="py-4">
                <div className="flex items-center mb-4 border border-[#E7E7E7] rounded-md p-3">
                  <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                    <input
                      defaultChecked=""
                      id="default-radio-1"
                      type="radio"
                      defaultValue=""
                      name="default-radio"
                      className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                      style={{
                        boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                      }}
                    />
                  </div>
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Use existing details
                  </label>
                </div>
                <div className="flex items-center border border-[#E7E7E7] rounded-md p-3">
                  <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                    <input
                      defaultChecked=""
                      id="default-radio-2"
                      type="radio"
                      defaultValue=""
                      name="default-radio"
                      className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                      style={{
                        boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                      }}
                    />
                  </div>
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Use a different delivery address
                  </label>
                </div>
                <div className=" ">
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
                  <div className="mt-8">
                    <div className="mb-3">
                      <label
                        className="block text-[#2B4447] text-lg font-semibold mb-3"
                        htmlFor="Country/Region"
                      >
                        Delivery Address
                      </label>
                      <input
                        className=" placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                        id="Country/Region"
                        type="text"
                        placeholder="Country/Region"
                      />
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="Company (Optional)"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="Apartment, Suite, etc"
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="City"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="State/Teritory"
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="Postcode"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="Business Name"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="ABN"
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-nowrap gap-4">
                      <div className="w-full   mb-3 md:mb-0">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          placeholder="LIC License"
                        />
                      </div>
                      <div className="w-full   mb-3">
                        <input
                          className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                          id="grid-last-name"
                          type="text"
                          placeholder="Representative"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                        id="Country/Region"
                        type="text"
                        placeholder="Delivery Instruction/Notes"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/home/delivery">
                <div className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white">
                  Continue to Delivery
                </div>
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

export default CheckOut;
