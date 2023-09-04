import React from "react";
import Order from "./Order";
import Link from "antd/es/typography/Link";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const Payment = () => {
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="flex  justify-between flex-wrap md:gap-0 gap-8 md:px-0 px-6 overflow-scroll mb-8 h-[350px] overflow-y-scroll">
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
                      Delivery
                    </h5>
                    <Link to="#">
                      <h5 className="text-lg font-semibold text-[#2B4447]">
                        Change
                      </h5>
                    </Link>
                  </div>
                  <p className="text-base font-normal text-[#2B4447]">
                    Chosen delivery rate
                  </p>
                </div>
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
                </div>
                <div className="my-8">
                  <h5 className="text-base font-medium text-[#2B4447] mb-4">
                    All transection are encrypted
                  </h5>
                  <div className="justify-between flex items-center mb-4 border border-[#E7E7E7] rounded-md p-3 bg-[#D6D6D6]">
                    <div className=" flex items-center">
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
                        Credit card
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <img
                        src="/assets/visa.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/master-card.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/american-express.png"
                        alt=""
                        className="fit-contain"
                      />
                    </div>
                  </div>
                  <div className={`relative mb-8 `} data-te-input-wrapper-init>
                    <input
                      type="text"
                      id="LiquerLicence"
                      className=" "
                      autoComplete="off"
                      placeholder="Card Number"
                    />
                    <div className="absolute top-[10px] right-[10px]">
                      <LockOpenIcon style={{ fill: "#979797" }} />
                    </div>
                  </div>
                  <div className={`relative mb-8 `} data-te-input-wrapper-init>
                    <input
                      type="text"
                      id="LiquerLicence"
                      className=" "
                      autoComplete="off"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className={`relative mb-8 `} data-te-input-wrapper-init>
                    <input
                      type="text"
                      id="LiquerLicence"
                      className=" "
                      autoComplete="off"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className={`relative mb-8 `} data-te-input-wrapper-init>
                    <input
                      type="text"
                      id="LiquerLicence"
                      className=" "
                      autoComplete="off"
                      placeholder="Card Number"
                    />
                    <div className="absolute top-[10px] right-[10px]">
                      <ErrorOutlineIcon style={{ fill: "#979797" }} />
                      {/* <LockOpenIcon style={{ fill: "#979797" }} /> */}
                    </div>
                  </div>
                </div>
                <div className="">
                  <h5 className="font-semibold text-xl text-[#2B4447] mb-3">
                    Payment
                  </h5>
                  <p className="text-sm font-normal text-[#637381]">
                    Select the address that matches your card or payment method
                  </p>
                </div>
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
                      className="ml-2 text-base font-semibold text-[#2B4447] dark:text-gray-300"
                    >
                      Same as delivery address
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
                      className="ml-2 text-base font-semibold text-[#2B4447] dark:text-gray-300"
                    >
                      Use a different billing address
                    </label>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="mb-3">
                    <label
                      className="block text-[#2B4447] text-lg font-semibold mb-3"
                      htmlFor="Country/Region"
                    >
                      Billing Address
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
                </div>
              </div>
              <button className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white">
                Pay Now
              </button>
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

export default Payment;
