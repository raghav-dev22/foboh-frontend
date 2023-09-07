import React from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";

function BillingAddress() {
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
        // setValue(values);
        console.log(values, "values--->");
      },
    });

  return (
    <>
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
              value={values.Country}
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
                value={values.FirstName}
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
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="LastName"
                type="text"
                placeholder="Last Name"
                value={values?.LastName}
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
                value={values?.Company}
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
                value={values?.Apartment}
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
                value={values?.City}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: errors?.City && touched?.City && "1px solid red",
                }}
              />
              {errors?.City && touched?.City && (
                <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.City}</p>
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
                value={values?.State}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: errors?.State && touched?.State && "1px solid red",
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
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Mobile"
                type="text"
                placeholder="Phone"
                value={values?.Mobile}
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
    </>
  );
}

export default BillingAddress;
