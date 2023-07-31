import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  FirstName: "",
  LastName: "",
  Mobile: "",
  Email: "",
};

function CustomerContact() {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddCustomerSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <>
      <div className="flex justify-between mx-auto lg:w-3/5 w-full pb-10 relative	px-4">
        <div className="details-box  flex flex-col gap-2	 items-center justify-center">
          <div className="box-1 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">1</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer details
          </h5>
        </div>
        <div className="line-1 border-[#147D73] bg-[#147D73] absolute"></div>
        <div className="contact-box flex flex-col gap-2 items-center justify-center">
          <div className="box-2 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">2</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer contacts
          </h5>
        </div>
        <div className="line-2 bg-[#000000] border-[#0000005e] absolute"></div>
        <div className="address-box  flex flex-col gap-2 items-center justify-center   ">
          <div className="box-3 flex justify-center items-center bg-dark-gray w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">3</p>
          </div>
          <h5 className="text-base	text-center text-gray font-medium	">
            Customer details
          </h5>
        </div>
      </div>
      <div className=" mx-auto lg:w-3/5	 w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Customer contacts</h6>
        </div>
        <div className="px-6 py-7">
          <form className="w-full " onSubmit={handleSubmit}>
            <h5 className="text-green mb-5 text-base font-bold	">
              Ordering contact
            </h5>
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  First name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Tom"
                  name="FirstName"
                  value={values.FirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.FirstName && touched.FirstName && "1px solid red",
                  }}
                />
                {errors.FirstName && touched.FirstName && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.FirstName}
                  </p>
                )}
                {errors.FirstName && touched.FirstName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                )}
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Last name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Jones"
                  name="LastName"
                  value={values.LastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.LastName && touched.LastName && "1px solid red",
                  }}
                />
                {errors.LastName && touched.LastName && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.LastName}
                  </p>
                )}
                {errors.LastName && touched.LastName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Tom"
                  name="Mobile"
                  value={values.LiquorLicence}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.Mobile && touched.Mobile && "1px solid red",
                  }}
                />
                {errors.Mobile && touched.Mobile && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.Mobile}
                  </p>
                )}
                {errors.Mobile && touched.Mobile && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="email"
                  placeholder="Jones"
                  name="Email"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.Email && touched.Email && "1px solid red",
                  }}
                />
                {errors.Email && touched.Email && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.Email}
                  </p>
                )}
                {errors.Email && touched.Email && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <h5 className="text-green text-base font-bold	">
                  Delivery contact
                </h5>
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <div className="flex gap-2 items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <h5 className="text-sm font-normal">
                    Delivery and ordering contact the same
                  </h5>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  First name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="Tom"
                />
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Last name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  placeholder="Jones"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  First name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="Tom"
                />
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Last name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  placeholder="Jones"
                />
              </div>
            </div>
            <div className="mb-5 text-end	 flex justify-between ">
              <Link to="/dashboard/add-customer/customer-details">
                <button className="py-2 px-7 rounded-md	bg-custom-skyBlue	">
                  <h5 className="text-base font-medium text-white">Back</h5>
                </button>
              </Link>
              <Link to="/dashboard/add-customer/customer-address">
                <button className="py-2 px-7 rounded-md	bg-custom-skyBlue	">
                  <h5 className="text-base font-medium text-white">Next</h5>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerContact;
