import React, { useState } from "react";
import Order from "../CartPage/Order";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "antd/es/typography/Link";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";

const Payment = () => {
  const [change, setChange] = useState(false);
  // const addressBtn = () => {
  //   setChange(true);
  // };
  return (
    <>
      <div className="">
        <div className="py-4">
          <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold text-[#2B4447]">Contact</h5>
              <Link to="#">
                <h5 className="text-lg font-semibold text-[#2B4447]">Change</h5>
              </Link>
            </div>
            <p className="text-base font-normal text-[#2B4447]">
              myemail@gmail.com.au
            </p>
          </div>
          <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold text-[#2B4447]">Contact</h5>
              <Link to="#">
                <h5 className="text-lg font-semibold text-[#2B4447]">Change</h5>
              </Link>
            </div>
            <p className="text-base font-normal text-[#2B4447]">
              myemail@gmail.com.au
            </p>
          </div>
          <div className="border rounded-md border-[#E7E7E7] p-3">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold text-[#2B4447]">Delivery</h5>
              <Link to="#">
                <h5 className="text-lg font-semibold text-[#2B4447]">Change</h5>
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
                  id="radio-1"
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
                htmlFor="radio-1"
                className="ml-2 text-base font-semibold text-gray-900 dark:text-gray-300"
              >
                Use preferred payment method
              </label>
            </div>
            <div className="flex items-center border border-[#E7E7E7] rounded-md p-3">
              <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                <input
                  defaultChecked=""
                  id="radio-2"
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
                htmlFor="radio-2"
                className="ml-2 text-base font-semibold text-gray-900 dark:text-gray-300"
              >
                Use a different payment method
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
                <img src="/assets/visa.png" alt="" className="fit-contain" />
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
                placeholder="Name on Card"
              />
            </div>
            <div className={`relative mb-8 `} data-te-input-wrapper-init>
              <input
                type="text"
                id="LiquerLicence"
                className=" "
                autoComplete="off"
                placeholder="Expiration Date (MM/YY)"
              />
            </div>
            <div className={`relative mb-8 `} data-te-input-wrapper-init>
              <input
                type="text"
                id="LiquerLicence"
                className=" "
                autoComplete="off"
                placeholder="Security Code"
              />
              <div className="absolute top-[10px] right-[10px]">
                <ErrorOutlineIcon style={{ fill: "#979797" }} />
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
                  id="radio-3"
                  type="radio"
                  defaultValue=""
                  name="default-radio"
                  onClick={() => {
                    setChange(true);
                  }}
                  // onClick={() => {
                  //   addressBtn();
                  // }}
                  className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                  style={{
                    boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                  }}
                />
              </div>
              <label
                htmlFor="radio-3"
                className="ml-2 text-base font-semibold text-[#2B4447] dark:text-gray-300"
              >
                Same as delivery address
              </label>
            </div>
            <div className="flex items-center border border-[#E7E7E7] rounded-md p-3">
              <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                <input
                  defaultChecked=""
                  id="radio-4"
                  type="radio"
                  defaultValue=""
                  name="default-radio"
                  className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                  // onClick={() => {
                  //   // billingBtn();
                  // }}
                  onClick={() => {
                    setChange(false);
                  }}
                  style={{
                    boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                  }}
                />
              </div>
              <label
                htmlFor="radio-4"
                className="ml-2 text-base font-semibold text-[#2B4447] dark:text-gray-300"
              >
                Use a different billing address
              </label>
            </div>
            {change === true ? <DeliveryAddress /> : <BillingAddress />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
