import React, { useEffect, useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressCheckoutSchema } from "../schemas";
import { useFormik } from "formik";
import Select from "react-select";
import { theme } from "antd";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getBuyerValues } from "../helpers/setBuyerValues";
import { getAddress } from "../helpers/getAddress";
import { getStates } from "../helpers/getStates";
import { addressUpdate } from "../helpers/addressUpdate";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
function BillingAddress({
  deliveryAddress,
  billingAddress,
  editBillingAddress,
  setEditBillingAddress,
  setBillingAddressData,
  billingAddressData,
  activeChecked,
  setActiveChecked,
}) {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  const [states, setStates] = useState([]);

  const [initialValues, setInitialValues] = useState({
    Address: "",
    Suburb: "",
    Apartment: "",
    Postcode: "",
    State: {},
    Notes: "",
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setValues,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BillingAddressCheckoutSchema,
    onSubmit: (values) => {},
  });

  const handleSubmit = () => {
    if (isValid) {
      addressUpdate(values, "billing-address");
      setEditBillingAddress(!editBillingAddress);
      setBillingAddressData({
        ...values,
        State: values.State.label,
      });
    } else {
      console.error("Form has validation errors. Please check your input.");
    }
  };

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
  const cancleBtn = () => {
    setEditBillingAddress(!editBillingAddress);
    setBillingAddressData(() => {
      return {
        ...initialValues,
        State: initialValues.State.label,
      };
    });
  };
  useEffect(() => {
    let statesData = [];
    let timeout;

    getStates().then((data) => {
      statesData = data.map((state) => {
        return {
          label: state.stateName,
          value: state.stateId,
        };
      });
      setStates(statesData);
    });

    timeout = setTimeout(() => {
      getAddress("billing-address").then((data) => {
        if (data.success) {
          const buyerData = data?.data[0];
          const buyerState = statesData.find(
            (state) => state?.label === buyerData.state
          );
          const billingAddress = {
            Apartment: buyerData?.apartmentSuite,
            Address: buyerData?.streetaddress,
            Suburb: buyerData?.city,
            State: buyerState,
            Postcode: buyerData?.postcode,
            Notes: buyerData?.instructionsNotes,
          };
          setValues(billingAddress);
          setInitialValues(billingAddress);
          setBillingAddressData(billingAddress);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSameAs = (e) => {
    const checked = e.target.checked;
    checked ? setValues(deliveryAddress) : setValues(initialValues);
    setActiveChecked(!activeChecked);
  };

  return (
    <>
      <div className="flex items-center mb-4 green-checkbox">
        <input
          id="same-as"
          type="checkbox"
          name="default-radio"
          onClick={handleSameAs}
          checked={activeChecked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
        />

        <label
          htmlFor="same-as"
          className="ml-4 text-base font-normal text-[#2B4447] dark:text-gray-300"
        >
          Billing address same as delivery address
        </label>
      </div>
      <form className="mt-3 mb-5 p-3">
        <div className="">
          <div className="mb-3 relative">
            <div className="flex justify-start items-center gap-1.5 mb-6">
              <ReceiptLongSharpIcon
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
                  background: "#F8F8F8",
                }}
              />
              {errors?.Address && touched?.Address && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Address}
                </p>
              )}
              {errors?.Address && touched?.Address && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
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
                  background: "#F8F8F8",
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
              <input
                type="text"
                placeholder="suburb"
                id="Suburb"
                onChange={handleChange}
                onBlur={handleBlur}
                name="Suburb"
                value={values?.Suburb}
                style={{
                  border: errors.Suburb && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors?.Suburb && touched?.Suburb && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Suburb}
                </p>
              )}
              {errors?.Suburb && touched?.Suburb && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
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
                placeholder="XXXX"
                value={values?.Postcode}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors?.Postcode && touched?.Postcode && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors?.Postcode && touched?.Postcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.Postcode}
                </p>
              )}
              {errors?.Postcode && touched?.Postcode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
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
                options={states}
                className=""
                style={{
                  border: errors.State && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors?.State && touched?.State && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors?.State}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="text-right flex justify-end items-center gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            style={{ backgroundColor: token.buttonThemeColor }}
            // disabled={!isValid}
            className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
          >
            Save
          </button>
          <button
            type="submit"
            onClick={() => {
              cancleBtn();
            }}
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
