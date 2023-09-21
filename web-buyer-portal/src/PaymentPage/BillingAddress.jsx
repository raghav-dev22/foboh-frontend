import React, { useEffect, useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";
import Select from "react-select";
import { theme } from "antd";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getBuyerValues } from "../helpers/setBuyerValues";

function BillingAddress({ deliveryAddress }) {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  console.log(change, "change");
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  const [states, setStates] = useState([]);

  const [initialValues, setInitialValues] = useState({
    Address: "",
    Suburb: "",
    Apartment: "",
    Postcode: "",
    State: "",
    Notes: "",
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

  const handleBillingSelect = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
    } else if (name === "Suburb") {
      setValues({
        ...values,
        Suburb: e,
      });
    }
  };

  useEffect(() => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));

    getBuyerValues(buyerId)
      .then((buyerData) => {
        const billingState = states.find(
          (state) => state?.label === buyerData?.billingState
        );
        setValues({
          Address: buyerData?.billingAddress,
          Suburb: buyerData?.billingSuburb,
          Apartment: buyerData?.billingApartment,
          Postcode: buyerData?.billingPostalCode,
          State: billingState,
          Notes: buyerData?.billingNotes,
        });

        setInitialValues({
          Address: buyerData?.billingAddress,
          Suburb: buyerData?.billingSuburb,
          Apartment: buyerData?.billingApartment,
          Postcode: buyerData?.billingPostalCode,
          State: billingState,
          Notes: buyerData?.billingNotes,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSameAs = (e) => {
    console.log("deliveryAddress >>", deliveryAddress);

    const checked = e.target.checked;
    checked ? setValues(deliveryAddress) : setValues(initialValues);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="same-as"
          type="checkbox"
          name="default-radio"
          onClick={handleSameAs}
          // onClick={() => {
          //   addressBtn();
          // }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
          // style={{
          //   boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
          // }}
        />

        <label
          htmlFor="same-as"
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
                name="Address"
                value={values?.Address}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.Address && touched?.Address && "1px solid red",
                }}
              />
              {errors?.Address && touched?.Address && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Address}
                </p>
              )}
              {errors?.Address && touched?.Address && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4 my-3">
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
            <div className="w-full   mb-3 relative md:mb-0 ">
              <lable>Suburb</lable>
              <Select
                type="text"
                defaultValue={`Suburb`}
                placeholder="Suburb"
                id="Suburb"
                onChange={(e) => handleBillingSelect(e, "Suburb")}
                name="Suburb"
                value={values?.Suburb}
                options={stateOptions}
                style={{
                  border: errors.Suburb && "1px solid red",
                }}
              />
              {errors?.Suburb && touched?.Suburb && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Suburb}
                </p>
              )}
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4 my-3">
            <div className="w-full   mb-3 relative">
              <lable>Postcode</lable>
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Postcode"
                type="text"
                placeholder="Apartment, Suite, etc"
                value={values?.Postcode}
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
            <div className="w-full   mb-3 relative md:mb-0">
              <lable>State</lable>
              <Select
                type="text"
                defaultValue={`state`}
                placeholder="state"
                id="State"
                onChange={(e) => handleBillingSelect(e, "State")}
                name="State"
                value={values?.State}
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
              value={values?.Postcode}
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
