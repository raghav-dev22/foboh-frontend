import React, { useState } from "react";
import Select from "react-select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function OrderContact({ values, errors, handleBlur, handleChange, touched }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="">
          <h1 className="mb-5 text-3xl	 text-[#563FE3]  font-bold	md:text-left text-center">
            Create your account
          </h1>
          <h2 className="mb-5 text-[#637381] font-normal text-lg md:text-left text-center  md:text-xl	">
            Ordering contact
          </h2>
        </div>
      </div>
      <div className=" ">
        <div className="flex flex-wrap -mx-3  items-start">
          <div className="w-full md:w-1/2	 px-3 relative mb-5">
            <label
              className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
              htmlFor="FirstName"
            >
              First name
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="FirstName"
              type="text"
              value={values.FirstName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border:
                  errors.FirstName && touched.FirstName && "1px solid red",
              }}
            />
            {errors.FirstName && touched.FirstName && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.FirstName}
              </p>
            )}
            {errors.FirstName && touched.FirstName && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full md:w-1/2	 px-3 relative mb-5">
            <label
              className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
              htmlFor="organisationAddressPostcode"
            >
              State
            </label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>

        <div className={`relative mb-5 `} data-te-input-wrapper-init>
          <label
            htmlFor="email"
            className="md:text-base text-sm	 font-medium text-[#2B4447]"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            className={`js-email `}
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              border: errors.email && touched.email && "1px solid red",
            }}
          />
          {errors.email && touched.email && (
            <p className="mt-2 mb-2 text-red-500 text-xs">{errors.email}</p>
          )}
          {errors.email && touched.email && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
          )}
          <label
            className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
            htmlFor="password"
          ></label>
        </div>

        <div className={`relative mb-5 `} data-te-input-wrapper-init>
          <label
            htmlFor="Mobile"
            className="md:text-base text-sm	 font-medium text-[#2B4447]"
          >
            Mobile
          </label>

          <input
            type="text"
            id="Mobile"
            className={`js-email `}
            autoComplete="off"
            value={values.Mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              border: errors.Mobile && touched.Mobile && "1px solid red",
            }}
          />
          {errors.Mobile && touched.Mobile && (
            <p className="mt-2 mb-2 text-red-500 text-xs">{errors.Mobile}</p>
          )}
          {errors.Mobile && touched.Mobile && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
          )}
          <label
            className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
            htmlFor="password"
          ></label>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <div className=" flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:bg-gray-700 dark:border-gray-600"
            />
            {/* <CheckBoxOutlinedIcon className="text-[#147D73] cursor-pointer" /> */}
            <label
              for="default-checkbox"
              className="text-[#637381]  font-normal md:text-base text-xs"
              style={{
                position: "relative",
                top: "2px",
                left: "5px",
                cursor: "pointer",
              }}
            >
              Delivery same as ordering contact
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="">
            <h2 className="mb-5 text-[#637381] font-normal text-lg md:text-left text-center  md:text-xl	">
              Delivery contact
            </h2>
          </div>

          <div className="flex flex-wrap -mx-3  items-start">
            <div className="w-full md:w-1/2	 px-3 relative mb-5">
              <label
                className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
                htmlFor="FirstName"
              >
                First name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="FirstName"
                type="text"
                value={values.FirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.FirstName && touched.FirstName && "1px solid red",
                }}
              />
              {errors.FirstName && touched.FirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.FirstName}
                </p>
              )}
              {errors.FirstName && touched.FirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full md:w-1/2	 px-3 relative mb-5">
              <label
                className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
                htmlFor="LastName"
              >
                Last name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="LastName"
                type="text"
                value={values.LastName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.LastName && touched.LastName && "1px solid red",
                }}
              />
              {errors.LastName && touched.LastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.LastName}
                </p>
              )}
              {errors.LastName && touched.LastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>

          <div className={`relative mb-5 `} data-te-input-wrapper-init>
            <label
              htmlFor="email"
              className="md:text-base text-sm	 font-medium text-[#2B4447]"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              className={`js-email `}
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.email && touched.email && "1px solid red",
              }}
            />
            {errors.email && touched.email && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.email}</p>
            )}
            {errors.email && touched.email && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
            )}
            <label
              className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
              htmlFor="password"
            ></label>
          </div>

          <div className={`relative mb-5 `} data-te-input-wrapper-init>
            <label
              htmlFor="Mobile"
              className="md:text-base text-sm	 font-medium text-[#2B4447]"
            >
              Mobile
            </label>

            <input
              type="text"
              id="Mobile"
              className={`js-password `}
              autoComplete="off"
              value={values.Mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.Mobile && touched.Mobile && "1px solid red",
              }}
            />
            {errors.Mobile && touched.Mobile && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.Mobile}</p>
            )}
            {errors.Mobile && touched.Mobile && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
            )}
            <label
              className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
              htmlFor="password"
            ></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderContact;
