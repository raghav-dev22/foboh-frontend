import React from "react";
import { Select } from "antd";

const RepresentativeInformation = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  stateOptions,
  handleState,
}) => {
  return (
    <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-scroll">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447]">
          Representative Information
        </h5>
      </div>
      <div className="py-6 px-6">
        <form action="">
          <div className="flex flex-nowrap gap-2">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                First Name
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Last Name
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-2">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="Dateofbirth"
              >
                Date of birth
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Dateofbirth"
                type="date"
                name="DateOfBirth"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Address
              </label>

              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="RepresentativeAddress"
                type="text"
                placeholder="Enter address"
                name="RepresentativeAddress"
                value={values.RepresentativeAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.RepresentativeAddress &&
                touched.RepresentativeAddress && (
                  <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                    {errors.RepresentativeAddress}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-2">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="Suburb"
              >
                Suburb
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Suburb"
                name="Suburb"
                id="Suburb"
                type="text"
                value={values.Suburb}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Suburb && touched.Suburb && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.Suburb}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="Postcode"
              >
                Postcode
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Postcode"
                type="text"
                placeholder="XXXX "
                name="Postcode"
                value={values.Postcode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Postcode && touched.Postcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.Postcode}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-2">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                State
              </label>
              <Select
                className="mt-[3px]"
                showSearch
                name="State"
                style={{ width: "100%", height: "48px" }}
                placeholder="Search to Select"
                options={stateOptions}
                onChange={handleState}
                onBlur={handleBlur}
                value={values.State}
              />
              {errors.State && touched.State && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.State}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="RepresentativePhoneNumber"
              >
                Phone No.
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="RepresentativePhoneNumber"
                type="text"
                placeholder="04XX XXX XXX / +61 4XX XXX XXX"
                name="RepresentativePhoneNumber"
                value={values.RepresentativePhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.RepresentativePhoneNumber &&
                touched.RepresentativePhoneNumber && (
                  <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                    {errors.RepresentativePhoneNumber}
                  </p>
                )}
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter valid email ID"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className=" gap-2 w-full green-checkbox flex justify-start items-center">
              <div className="w-4 h-4">
                <input
                  className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                  id="default-radio-1"
                  type="checkbox"
                  defaultValue=""
                  name="default-radio"
                />
              </div>
              <label
                for="default-radio-1"
                className="ml-2 text-lg font-normal text-[#2B4447] "
              >
                I own more than 25% of the company
              </label>
            </div>
            <div className=" gap-2 w-full green-checkbox flex justify-start items-center ">
              <div className="w-4 h-4">
                <input
                  id="default-radio-1"
                  type="checkbox"
                  name="default-radio"
                  defaultValue=""
                  className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <label
                for="default-radio-1"
                className="ml-2 text-lg font-normal text-[#2B4447] "
              >
                I am a member of the governing board of the company
              </label>
            </div>
            <div className=" gap-2 w-full green-checkbox flex justify-start items-center">
              <div className="w-4 h-4">
                <input
                  className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                  id="default-radio-3"
                  type="checkbox"
                  defaultValue=""
                  name="default-radio"
                />
              </div>
              <label
                for="default-radio-3"
                className="ml-2 text-lg font-normal text-[#2B4447] "
              >
                I am a company executive.
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepresentativeInformation;
