import React, { useState } from "react";
import Order from "../CartPage/Order";
import Link from "react-router-dom";
import { useFormik } from "formik";
import { DeliveryAddressSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
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
    BusinessName: "",
    ABN: "",
    LiquerLicence: "",
    Representative: "",
    DeliveryInstruction: "",
    DeliveryContact: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: DeliveryAddressSchema,
      onSubmit: (values) => {
        setData(values);
        console.log(data, "hhhhhh");
        localStorage.setItem("myKey", JSON.stringify(values));
        navigate("/home/payment-page/delivery");
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
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
              <div className="mt-8 relative">
                <label
                  className="block text-[#2B4447] text-lg font-semibold mb-4"
                  htmlFor="Delivery Contact"
                >
                  Delivery Contact
                </label>
                <input
                  className=" appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                  id="DeliveryContact"
                  type="text"
                  placeholder="Delivery Contact"
                  value={values.DeliveryContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.DeliveryContact &&
                      touched.DeliveryContact &&
                      "1px solid red",
                  }}
                />
                {errors.DeliveryContact && touched.DeliveryContact && (
                  <p className="mt-2 mb-2 text-red-500 text-xs">
                    {errors.DeliveryContact}
                  </p>
                )}
                {errors.DeliveryContact && touched.DeliveryContact && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[56px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="mt-8">
                <div className="mb-3 relative">
                  <label
                    className="block text-[#2B4447] text-lg font-semibold mb-3"
                    htmlFor="Country/Region"
                  >
                    Delivery Address
                  </label>
                  <input
                    className=" placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="Country"
                    type="text"
                    placeholder="Country"
                    value={values.Country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.Country && touched.Country && "1px solid red",
                    }}
                  />
                  {errors.Country && touched.Country && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors.Country}
                    </p>
                  )}
                  {errors.Country && touched.Country && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[51px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full relative  mb-3 md:mb-0">
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
                          errors.FirstName &&
                          touched.FirstName &&
                          "1px solid red",
                      }}
                    />
                    {errors.FirstName && touched.FirstName && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.FirstName}
                      </p>
                    )}
                    {errors.FirstName && touched.FirstName && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full  relative mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="LastName"
                      type="text"
                      placeholder="Last Name"
                      value={values.LastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.LastName &&
                          touched.LastName &&
                          "1px solid red",
                      }}
                    />
                    {errors.LastName && touched.LastName && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.LastName}
                      </p>
                    )}
                    {errors.LastName && touched.LastName && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full  relative mb-3 md:mb-0">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="Company"
                      type="text"
                      placeholder="Company (Optional)"
                      value={values.Company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.Company && touched.Company && "1px solid red",
                      }}
                    />
                    {errors.Company && touched.Company && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.Company}
                      </p>
                    )}
                    {errors.Company && touched.Company && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full relative  mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="Apartment"
                      type="text"
                      placeholder="Apartment, Suite, etc"
                      value={values.Apartment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.Apartment &&
                          touched.Apartment &&
                          "1px solid red",
                      }}
                    />
                    {errors.Apartment && touched.Apartment && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.Apartment}
                      </p>
                    )}
                    {errors.Apartment && touched.Apartment && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full  relative mb-3 md:mb-0">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="City"
                      type="text"
                      placeholder="City"
                      value={values.City}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border: errors.City && touched.City && "1px solid red",
                      }}
                    />
                    {errors.City && touched.City && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.City}
                      </p>
                    )}
                    {errors.City && touched.City && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full relative  mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="State"
                      placeholder="State/Teritory"
                      value={values.State}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.State && touched.State && "1px solid red",
                      }}
                    />
                    {errors.State && touched.State && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.State}
                      </p>
                    )}
                    {errors.State && touched.State && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full relative  mb-3 md:mb-0">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="Postcode"
                      type="text"
                      placeholder="Postcode"
                      value={values.Postcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.Postcode &&
                          touched.Postcode &&
                          "1px solid red",
                      }}
                    />
                    {errors.Postcode && touched.Postcode && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.Postcode}
                      </p>
                    )}
                    {errors.Postcode && touched.Postcode && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full relative  mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="Mobile"
                      type="text"
                      placeholder="Phone"
                      value={values.Mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.Mobile && touched.Mobile && "1px solid red",
                      }}
                    />
                    {errors.Mobile && touched.Mobile && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.Mobile}
                      </p>
                    )}
                    {errors.Mobile && touched.Mobile && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full relative  mb-3 md:mb-0">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="BusinessName"
                      type="text"
                      placeholder="Business Name"
                      value={values.BusinessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.BusinessName &&
                          touched.BusinessName &&
                          "1px solid red",
                      }}
                    />
                    {errors.BusinessName && touched.BusinessName && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.BusinessName}
                      </p>
                    )}
                    {errors.BusinessName && touched.BusinessName && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full relative  mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="ABN"
                      type="text"
                      placeholder="ABN"
                      value={values.ABN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border: errors.ABN && touched.ABN && "1px solid red",
                      }}
                    />
                    {errors.ABN && touched.ABN && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.ABN}
                      </p>
                    )}
                    {errors.ABN && touched.ABN && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="flex md:flex-nowrap gap-4">
                  <div className="w-full relative  mb-3 md:mb-0">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="LiquerLicence"
                      type="text"
                      placeholder="LIC License"
                      value={values.LiquerLicence}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.LiquerLicence &&
                          touched.LiquerLicence &&
                          "1px solid red",
                      }}
                    />
                    {errors.LiquerLicence && touched.LiquerLicence && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.LiquerLicence}
                      </p>
                    )}
                    {errors.LiquerLicence && touched.LiquerLicence && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                  <div className="w-full relative  mb-3">
                    <input
                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                      id="Representative"
                      type="text"
                      placeholder="LIC License"
                      value={values.Representative}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.Representative &&
                          touched.Representative &&
                          "1px solid red",
                      }}
                    />
                    {errors.Representative && touched.Representative && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.Representative}
                      </p>
                    )}
                    {errors.Representative && touched.Representative && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>
                </div>
                <div className="mb-3 relative">
                  <textarea
                    className="focus-visible:outline-none placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                    id="DeliveryInstruction"
                    type="text"
                    placeholder="Delivery Instruction/Notes"
                    value={values.DeliveryInstruction}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.DeliveryInstruction &&
                        touched.DeliveryInstruction &&
                        "1px solid red",
                      // focusVisible: "",
                    }}
                  />
                  {errors.DeliveryInstruction &&
                    touched.DeliveryInstruction && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.DeliveryInstruction}
                      </p>
                    )}
                  {errors.DeliveryInstruction &&
                    touched.DeliveryInstruction && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[22px] right-3 transition-all duration-[0.3s]" />
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* <Link to="/home/delivery"> */}
          <button
            // onClick={handleSubmit}
            type="submit"
            className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
          >
            Continue to Delivery
          </button>
          {/* </Link> */}
        </div>
      </form>
    </>
  );
};

export default CheckOut;
