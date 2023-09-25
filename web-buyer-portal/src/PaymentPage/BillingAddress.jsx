import React, { useEffect, useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";
import Select from "react-select";
import { theme } from "antd";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getBuyerValues } from "../helpers/setBuyerValues";

function BillingAddress() {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  console.log(change, "change");
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));

  const [initialValues, setInitialValues] = useState({
    FirstName: "",
    LastName: "",
    Country: "",
    Company: "",
    Apartment: "",
    City: "",
    Postcode: "",
    Mobile: "",
    State: "",
  });

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

  useEffect(() => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));

    getBuyerValues(buyerId)
      .then((buyerData) => {
        setValues({
          FirstName: "",
          LastName: "",
          Country: "",
          Company: "",
          Apartment: "",
          City: "",
          Postcode: "",
          Mobile: "",
          State: "",
        });
      })
      .catch((error) => console.log(error));
  }, []);

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
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
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
            <div className="flex justify-start items-center gap-1.5 mb-6">
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
          </div>

          <div className="flex md:flex-nowrap gap-4 my-3">
            <div className="w-full   mb-3  md:mb-0 relative">
              <lable>Address</lable>
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Company"
                type="text"
                // placeholder="Company (Optional)"
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
          </div>
          <div className="flex md:flex-nowrap gap-4 my-3">
            <div className="w-full   mb-3 relative md:mb-0 ">
              <lable>Suburb</lable>
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
            <div className="w-full   mb-3 relative">
              <lable>Apartment, Suite, etc</lable>
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
          <div className="flex md:flex-nowrap gap-4 my-3">
            <div className="w-full   mb-3 relative">
              <lable>Postcode</lable>
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
            <div className="w-full   mb-3 relative md:mb-0">
              <lable>State</lable>
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
          <div className="w-full   mb-3 relative">
            {" "}
            <lable className="mb-2">Delivery Instruction/Notes</lable>
            <textarea
              className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 mt-2"
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
        </div>
        <div className="text-right flex justify-end items-center gap-2">
          <button
            type="submit"
            style={{ backgroundColor: token.buttonThemeColor }}
            className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
          >
            Save
          </button>
          <button
            type="submit"
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
