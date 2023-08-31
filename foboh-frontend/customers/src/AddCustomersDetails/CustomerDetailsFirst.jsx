import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Select from "react-select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function CustomerDetailsFirst({
  handleChange,
  values,
  handleBlur,
  errors,
  options,
  touched,
  setValues,
}) {
  const handleSelect = (e, name) => {
    console.log(e, name);
    console.log("values>>",e[0]?.value)
    setValues({
      ...values,
      [name]: JSON.stringify(e[0]?.value),
    });
    console.log("values>>",values);
  };

  console.log("all error and touch is>>", errors, touched);
  return (
    <form className="">
      <div className=" border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
        <h6 className="text-base font-medium	 text-green">Customer details</h6>
      </div>
      <div className="px-6 py-7">
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full relative px-3">
            <label
              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
              htmlFor="grid-password"
            >
              Business name *
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              maxLength={50}
              placeholder="devidjond45@gmail.com"
              name="businessName"
              value={values.businessName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border:
                  errors?.businessName &&
                  "1px solid red",
              }}
            />
            {errors?.businessName && (
              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                {errors?.businessName}
              </p>
            )}
            {errors?.businessName && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className="w-full relative md:w-1/2 px-3">
            <label
              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
              htmlFor="grid-last-name"
            >
              ABN
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Tom"
              name="abn"
              value={values.abn}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors?.abn  && "1px solid red",
              }}
            />
            {errors?.abn  && (
              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                {errors?.abn}
              </p>
            )}
            {errors?.abn  && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full relative md:w-1/2 px-3">
            <label
              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
              htmlFor="grid-last-name"
            >
              Liquor licence
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Jones"
              name="liquorLicence"
              maxLength={13}
              value={values.liquorLicence}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border:
                  errors?.liquorLicence &&
                  "1px solid red",
              }}
            />
            
            {errors?.liquorLicence  && (
              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                {errors?.liquorLicence}
              </p>
            )}
            {errors?.liquorLicence  && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className="  w-full relative md:w-1/2 px-3">
            <label className="text-base font-medium text-green mb-3">
              Sales rep
            </label>
            <div className=" top-16 w-full">
              <Select
                id="salesRepId"
                name="salesRepId"
                isMulti={true}
                options={options}
                value={options.find(
                  (option) => option.value === values.salesRepId
                )}
                onChange={(e) => handleSelect(e, "salesRepId")}
                className="basic-multi-select "
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="  w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">
              Pricing profile
            </h5>
            <div className=" top-16 w-full">
              <Select
                id="pricingProfileId"
                name="pricingProfileId"
                isMulti={true}
                value={options.find(
                  (option) => option.value === values.pricingProfileId
                )}
                options={options}
                onChange={(e) => handleSelect(e, "pricingProfileId")}
                className="basic-multi-select "
                classNamePrefix="select"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className="  w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">
              Default payment terms
            </h5>
            <div className=" top-16 w-full">
              <Select
                name="defaultPaymentTerms"
                isMulti={true}
                options={options}
                value={options.find(
                  (option) => option.value === values.defaultPaymentTerms
                )}
                onChange={(e) => handleSelect(e, "defaultPaymentTerms")}
                className="basic-multi-select "
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="  w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">
              Default payment method
            </h5>
            <div className=" top-16 w-full">
              <Select
                name="defaultPaymentMethodId"
                isMulti
                value={options.find(
                  (option) => option.value === values.defaultPaymentMethodId
                )}
                options={options}
                onChange={(e) => handleSelect(e, "defaultPaymentMethodId")}
                className="basic-multi-select "
                classNamePrefix="select"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className=" w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">Tags</h5>
            <div className=" top-16 w-full">
              <Select
                value={options.find((option) => option.value === values.tags)}
                // defaultValue={[options[2], options[3]]}
                isMulti
                name="colors"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {/* <Select
                name="tags"
                isMulti
                value={options.find(
                  (option) => option.value === values.tags
                )}
                options={options}
                onChange={(e) => handleSelect(e, "tags")}
                // onChange={}
                className="basic-multi-select "
                classNamePrefix="select"
              /> */}
            </div>
          </div>
          <div className=" w-full relative md:w-1/2 px-3">
            <div className=" flex justify-between items-center mb-3">
              <h5 className="text-green text-base font-medium">WET liable</h5>
              <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                <input
                  type="checkbox"
                  name="wetLiable"
                  id="toggle"
                  value={values.wetLiable}
                  onChange={handleChange}
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="toggle"
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <p className="text-gray text-sm font-normal	">
              Is this customer liable for Wine Equalisation Tax?
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CustomerDetailsFirst;
