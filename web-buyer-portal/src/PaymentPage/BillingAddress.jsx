import React, { useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";
import Select from "react-select";
import { theme } from "antd";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
function BillingAddress() {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  console.log(change, "change");
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
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
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BillingAddressSchema,
    onSubmit: (values) => {
      navigate("/home/order-confirm");
      // setValue(values);
      console.log(values, "values--->");
    },
  });
  const stateOptions = [
    { label: "Victoria", value: "option1" },
    { label: "Queensland	", value: "option2" },
    { label: "Western Australia", value: "option3" },
  ];
  const cityOptions = [
    { label: "	Ballina", value: "option1" },
    { label: "Balranald	", value: "option2" },
    { label: "Batemans Bay", value: "option3" },
  ];
  const handleBillingCity = (e, name) => {
    if (name === "City") {
      setValues({
        ...values,
        City: e,
      });
    } else {
      setValues({
        ...values,
        City: e,
      });
    }
  };
  const handleBillingState = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
    } else {
      setValues({
        ...values,
        State: e,
      });
    }
  };
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          defaultChecked=""
          id="default-checkbox"
          type="checkbox"
          defaultValue=""
          name="default-radio"
          onClick={() => {
            setChange(!change);
          }}
          // onClick={() => {
          //   addressBtn();
          // }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
          // style={{
          //   boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
          // }}
        />

        <label
          htmlFor="radio-3"
          className="ml-4 text-base font-normal text-[#2B4447] dark:text-gray-300"
        >
          Same as delivery address
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-5 border border-[#E7E7E7] rounded-md p-3"
      >
        <div className="">
          <div className="mb-3 relative">
            <div className="flex justify-start items-center gap-1.5 mb-3">
              <HomeRoundedIcon
                style={{ fill: "#2B4447" }}
                className="w-[18px] h-[18px]"
              />
              <label
                className="block text-[#2B4447] text-lg font-semibold "
                htmlFor="Country/Region"
              >
                Billing Address
              </label>
            </div>
            <input
              className=" placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
              id="Country"
              type="text"
              name="Country"
              placeholder="Country"
              value={change === true ? EditDeliveryVal.Country : values.Country}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors?.Country && touched?.Country && "1px solid red",
              }}
            />
            {errors?.Country && touched?.Country && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors?.Country}
              </p>
            )}
            {errors?.Country && touched?.Country && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[51px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 relative md:mb-0 ">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="FirstName"
                type="text"
                placeholder="First Name"
                value={
                  change === true ? EditDeliveryVal.FirstName : values.FirstName
                }
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.FirstName && touched?.FirstName && "1px solid red",
                }}
              />
              {errors?.FirstName && touched?.FirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.FirstName}
                </p>
              )}
              {errors?.FirstName && touched?.FirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3 relative">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="LastName"
                type="text"
                placeholder="Last Name"
                value={
                  change === true ? EditDeliveryVal.LastName : values.LastName
                }
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.LastName && touched?.LastName && "1px solid red",
                }}
              />
              {errors?.LastName && touched?.LastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.LastName}
                </p>
              )}
              {errors?.LastName && touched?.LastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3  md:mb-0 relative">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Company"
                type="text"
                placeholder="Company (Optional)"
                value={
                  change === true ? EditDeliveryVal.Company : values.Company
                }
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
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3 relative">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Apartment"
                type="text"
                placeholder="Apartment, Suite, etc"
                value={
                  change === true ? EditDeliveryVal.Apartment : values.Apartment
                }
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.Apartment && touched?.Apartment && "1px solid red",
                }}
              />
              {errors?.Apartment && touched?.Apartment && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Apartment}
                </p>
              )}
              {errors?.Apartment && touched?.Apartment && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 relative md:mb-0 relative">
              <Select
                type="text"
                // defaultValue={`state`}
                placeholder="City"
                id="City"
                onChange={(e) => handleBillingCity(e, "City")}
                name="City"
                value={change === true ? EditDeliveryVal.City : values.City}
                options={cityOptions}
                className=""
                style={{
                  border: errors.City && "1px solid red",
                }}
              />
              {errors?.City && touched?.City && (
                <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.City}</p>
              )}
              {errors?.City && touched?.City && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3 relative">
              <Select
                type="text"
                defaultValue={`state`}
                placeholder="state"
                id="State"
                onChange={(e) => handleBillingState(e, "State")}
                name="State"
                value={change === true ? EditDeliveryVal.State : values.State}
                options={stateOptions}
                className=""
                style={{
                  border: errors.State && "1px solid red",
                }}
              />

              {errors?.State && touched?.State && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.State}
                </p>
              )}
              {errors?.State && touched?.State && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 relative md:mb-0 relative">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Postcode"
                type="text"
                placeholder="Postcode"
                value={
                  change === true ? EditDeliveryVal.Postcode : values.Postcode
                }
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.Postcode && touched?.Postcode && "1px solid red",
                }}
              />
              {errors?.Postcode && touched?.Postcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Postcode}
                </p>
              )}
              {errors?.Postcode && touched?.Postcode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3 relative">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Mobile"
                type="text"
                placeholder="Phone"
                value={change === true ? EditDeliveryVal.Mobile : values.Mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: errors?.Mobile && touched?.Mobile && "1px solid red",
                }}
              />
              {errors?.Mobile && touched?.Mobile && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Mobile}
                </p>
              )}
              {errors?.Mobile && touched?.Mobile && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
        </div>
        <div className="text-right flex justify-end items-center gap-2">
          <button
            type="submit"
            style={{ backgroundColor: token.buttonThemeColor }}
            // onClick={handleSubmit}
            className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
          >
            Save
          </button>
          <button
            type="submit"
            // onClick={handleSubmit}
            className="border-[#637381] border rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-[#637381]"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default BillingAddress;
