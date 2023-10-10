import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Select from "react-select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect } from "react";

function CustomerDetailsFirst({
  handleChange,
  values,
  handleBlur,
  errors,
  options,
  touched,
  setValues,
  setIsUpDate,
}) {
  console.log(errors, "error");
  const handleSelect = (e, name) => {
    console.log("selected tags>>>>...", e, name);
    if (name === "tags") {
      setValues({
        ...values,
        tags: e,
      });
      setIsUpDate(true);
    } else {
      setValues({
        ...values,
        [name]: e,
      });
      setIsUpDate(true);
    }
    console.log("all values>>", values);
  };

  const [defaultPaymentTrems, setDefaultPaymentTrems] = useState([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState([]);
  const [customerTag, setCustomerTag] = useState([]);

  useEffect(() => {
    // defaultPaymentTrems
    fetch(
      "https://masters-api-foboh.azurewebsites.net/api/DefaultPaymentTerm",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("defaultPaymentMethodId -->", data);
        setDefaultPaymentTrems(
          data.map((ele) => {
            return {
              value: ele.id,
              label: ele.paymentTermName,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    // defaultPaymentMethod
    fetch("https://masters-api-foboh.azurewebsites.net/api/PaymentMethods", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("defaultPaymentMethodId -->", data);
        setDefaultPaymentMethod(
          data.map((item) => {
            return {
              value: item.paymentMethodId,
              label: item.name,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    // tag
    fetch("https://masters-api-foboh.azurewebsites.net/api/tags", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("tag -->", data);
        setCustomerTag(
          data.map((item) => {
            return {
              value: item.tagId,
              label: item.tagName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

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
              placeholder="Business Name"
              name="businessName"
              value={values.businessName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors?.businessName && "1px solid red",
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
                border: errors?.abn && "1px solid red",
              }}
            />
            {errors?.abn && (
              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                {errors?.abn}
              </p>
            )}
            {errors?.abn && (
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
            />
            {errors?.liquorLicence && (
              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                {errors?.liquorLicence}
              </p>
            )}
            {errors?.liquorLicence && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className="  w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">Sales rep</h5>
            <div className=" top-16 w-full">
              <Select
                id="salesRepId"
                name="salesRepId"
                isMulti={true}
                options={options}
                value={values?.salesRepId}
                // value={options.find(
                //   (option) => option.value === values.salesRepId
                // )}
                onChange={(e) => handleSelect(e, "salesRepId")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.salesRepId && "1px solid red",
                }}
              />

              {errors?.salesRepId && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors?.salesRepId}
                </p>
              )}
              {errors?.salesRepId && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
              )}
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
                // value={options.find(
                //   (option) => option.value === values.pricingProfileId
                // )}
                value={values?.pricingProfileId}
                options={options}
                onChange={(e) => handleSelect(e, "pricingProfileId")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.pricingProfileId && "1px solid red",
                }}
              />

              {errors?.pricingProfileId && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors?.pricingProfileId}
                </p>
              )}
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
                options={defaultPaymentTrems}
                // value={options.find(
                //   (option) => option.value === values.defaultPaymentTerms
                // )}
                value={values?.defaultPaymentTerms}
                onChange={(e) => handleSelect(e, "defaultPaymentTerms")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.defaultPaymentTerms && "1px solid red",
                }}
              />

              {errors?.defaultPaymentTerms && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors?.defaultPaymentTerms}
                </p>
              )}
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
                // value={options.find(
                //   (option) => option.value === values.defaultPaymentMethodId
                // )}
                value={values?.defaultPaymentMethodId}
                options={defaultPaymentMethod}
                onChange={(e) => handleSelect(e, "defaultPaymentMethodId")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.defaultPaymentMethodId && "1px solid red",
                }}
              />

              {errors?.defaultPaymentMethodId && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors?.defaultPaymentMethodId}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
          <div className=" w-full relative md:w-1/2 px-3">
            <h5 className="text-base font-medium text-green mb-3">Tags</h5>
            <div className=" top-16 w-full">
              <Select
                // value={options.find((option) => option.value === values.tags)}
                value={values?.tags}
                isMulti
                name="tags"
                options={customerTag}
                onChange={(e) => handleSelect(e, "tags")}
                className="basic-multi-select"
                classNamePrefix="select"
                style={{
                  border: errors?.tags && "1px solid red",
                }}
              />
              {/* <Select
                name="tags"
                isMulti = {true}
                // value={options.find(
                //   (option) => option.value === values.tags
                // )}
                value={values?.tags}
                options={customerTag}
                onChange={(e) => handleSelect(e, "tags")}
                // onChange={}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                border:
                  errors?.tags &&
                  "1px solid red",
              }}
            /> */}

              {errors?.tags && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors?.tags}
                </p>
              )}
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
