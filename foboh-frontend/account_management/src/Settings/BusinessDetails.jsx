import React from "react";
import { Select } from "antd";

const BusinessDetails = ({
  values,
  formChange,
  businessType,
  handleBusinessDetails,
  handleBlur,
  errors,
  handleChange,
  stateOptions,
  handleState,
  CustomTooltip,
  HelpIcon,
  touched,
}) => {
  return (
    <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-scroll">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447]">
          Business details
        </h5>
      </div>
      <div className="py-6 px-6">
        <form onChange={formChange} action="">
          <div className="flex flex-nowrap gap-4">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Business type
              </label>
              <Select
                className="mt-[3px]"
                showSearch
                style={{
                  width: "100%",
                  height: "48px",
                }}
                placeholder="Search to Select"
                options={businessType}
                onChange={handleBusinessDetails}
                onBlur={handleBlur}
                name="BusinessName"
                value={values.BusinessName}
              />
              {errors.BusinessName && touched.BusinessName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.BusinessName}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Legal business name
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="LegalBusiness"
                type="text"
                name="LegalBusiness"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter business name"
                value={values.LegalBusiness}
              />
              {errors.LegalBusiness && touched.LegalBusiness && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.LegalBusiness}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-4">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                ACN
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ACN"
                type="text"
                name="ACN"
                placeholder="Enter ACN"
                value={values.ACN}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ACN && touched.ACN && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.ACN}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                ABN
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ABN"
                type="text"
                name="ABN"
                placeholder="Enter ABN"
                value={values.ABN}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ABN && touched.ABN && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.ABN}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-4">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Business Address
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="BusinessAddress"
                placeholder="Enter business address "
                value={values.BusinessAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.BusinessAddress && touched.BusinessAddress && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.BusinessAddress}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="BusinessMobileNumber"
              >
                Business Phone Number
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="BusinessMobileNumber"
                type="text"
                name="BusinessMobileNumber"
                placeholder="Enter phone number"
                value={values.BusinessMobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.BusinessMobileNumber && touched.BusinessMobileNumber && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.BusinessMobileNumber}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-4">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Suburb
              </label>

              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="BusinessSuburb"
                type="text"
                name="BusinessSuburb"
                placeholder="Enter suburb"
                value={values.BusinessSuburb}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.BusinessSuburb && touched.BusinessSuburb && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.BusinessSuburb}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                Postcode
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter postcode"
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
          <div className="flex flex-nowrap gap-4">
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
                htmlFor="username"
              >
                Country
              </label>
              <input
                disabled
                className="appearance-none  border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Australia "
                value={values.Country}
                style={{ background: "#E0E0E0" }}
              />
            </div>
          </div>
          <div className="flex flex-nowrap gap-4">
            <div className="mb-4 w-full">
              <label
                className="block text-[#2B4447] text-base font-medium mb-2"
                htmlFor="username"
              >
                <CustomTooltip
                  placement="right"
                  arrow
                  title="Please provide the URL of your business website or social media profile."
                >
                  <HelpIcon
                    sx={{
                      color: "#E0E0E0",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                  />{" "}
                </CustomTooltip>{" "}
                Business website URL
              </label>
              <input
                className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Business website URL"
                name="BusinessWebsiteURL"
                value={values.BusinessWebsiteURL}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.BusinessWebsiteURL && touched.BusinessWebsiteURL && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.BusinessWebsiteURL}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;
