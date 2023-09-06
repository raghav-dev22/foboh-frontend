import React, { useState } from "react";
import Order from "./Order";
import Link from "antd/es/typography/Link";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";
const Payment = () => {
  const initialValues = {
    FirstName: "",
    LastName: "",
    Country: "",
    Company: "",
    Apartment: "",
    City: "",
    Postcode: "",
    Mobile: "",
    State: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: BillingAddressSchema,
      onSubmit: (values) => {
        setValue(values);
        console.log(values, "values--->");
      },
    });
  const billingBtn = () => {
    setSave(false);
    // localStorage.removeItem(keyToRemove);
    // const removeLocalStorageButton = localStorage.removeItem("myKey");
    // setValue(removeLocalStorageButton);
    // console.log(value, "--values--");
  };
  const [save, setSave] = useState(false);
  const [value, setValue] = useState();
  const addressBtn = () => {
    setSave(true);
    const storedValue = JSON.parse(localStorage.getItem("myKey"));
    console.log(storedValue, "storedValue====>");
    setValue(storedValue);
  };

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
                    addressBtn();
                  }}
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
                  onClick={() => {
                    billingBtn();
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
          </div>
          <form onSubmit={handleSubmit}>
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
                  id="Country"
                  type="text"
                  name="Country"
                  placeholder="Country"
                  value={save === true ? value?.Country : values?.Country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors?.Country && touched?.Country && "1px solid red",
                  }}
                />
                {errors?.Country && touched?.Country && (
                  <p className="mt-2 mb-2 text-red-500 text-xs">
                    {errors?.Country}
                  </p>
                )}
                {errors?.Country && touched?.Country && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="flex md:flex-nowrap gap-4">
                <div className="w-full   mb-3 md:mb-0">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="FirstName"
                    type="text"
                    placeholder="First Name"
                    value={save === true ? value?.FirstName : values.FirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.FirstName &&
                        touched?.FirstName &&
                        "1px solid red",
                    }}
                  />
                  {errors?.FirstName && touched?.FirstName && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.FirstName}
                    </p>
                  )}
                  {errors?.FirstName && touched?.FirstName && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
                <div className="w-full   mb-3">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="LastName"
                    type="text"
                    placeholder="Last Name"
                    value={save === true ? value?.LastName : values?.LastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.LastName &&
                        touched?.LastName &&
                        "1px solid red",
                    }}
                  />
                  {errors?.LastName && touched?.LastName && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.LastName}
                    </p>
                  )}
                  {errors?.LastName && touched?.LastName && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
              </div>
              <div className="flex md:flex-nowrap gap-4">
                <div className="w-full   mb-3 md:mb-0">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Company"
                    type="text"
                    placeholder="Company (Optional)"
                    value={save === true ? value?.Company : values?.Company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.Company && touched?.Company && "1px solid red",
                    }}
                  />
                  {errors?.Company && touched?.Company && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.Company}
                    </p>
                  )}
                  {errors?.Company && touched?.Company && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
                <div className="w-full   mb-3">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Apartment"
                    type="text"
                    placeholder="Apartment, Suite, etc"
                    value={save === true ? value?.Apartment : values?.Apartment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.Apartment &&
                        touched?.Apartment &&
                        "1px solid red",
                    }}
                  />
                  {errors?.Apartment && touched?.Apartment && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.Apartment}
                    </p>
                  )}
                  {errors?.Apartment && touched?.Apartment && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
              </div>
              <div className="flex md:flex-nowrap gap-4">
                <div className="w-full   mb-3 md:mb-0">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="City"
                    type="text"
                    placeholder="City"
                    value={save === true ? value?.City : values?.City}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border: errors?.City && touched?.City && "1px solid red",
                    }}
                  />
                  {errors?.City && touched?.City && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.City}
                    </p>
                  )}
                  {errors?.City && touched?.City && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
                <div className="w-full   mb-3">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="State"
                    type="text"
                    placeholder="State/Teritory"
                    value={save === true ? value?.State : values?.State}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.State && touched?.State && "1px solid red",
                    }}
                  />
                  {errors?.State && touched?.State && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.State}
                    </p>
                  )}
                  {errors?.BillingState && touched?.BillingState && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
              </div>
              <div className="flex md:flex-nowrap gap-4">
                <div className="w-full   mb-3 md:mb-0">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Postcode"
                    type="text"
                    placeholder="Postcode"
                    value={save === true ? value?.Postcode : values?.Postcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.Postcode &&
                        touched?.Postcode &&
                        "1px solid red",
                    }}
                  />
                  {errors?.Postcode && touched?.Postcode && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.Postcode}
                    </p>
                  )}
                  {errors?.Postcode && touched?.Postcode && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
                <div className="w-full   mb-3">
                  <input
                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Mobile"
                    type="text"
                    placeholder="Phone"
                    value={save === true ? value?.Mobile : values?.Mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors?.Mobile && touched?.Mobile && "1px solid red",
                    }}
                  />
                  {errors?.Mobile && touched?.Mobile && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors?.Mobile}
                    </p>
                  )}
                  {errors?.Mobile && touched?.Mobile && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              // onClick={handleSubmit}
              className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
