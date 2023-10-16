import React, { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Select from "react-select";

function CustomerAddress({
  values,
  handleChange,
  handleBlur,
  errors,
  options,
  touched,
  setValues,
  setIsUpDate,
}) {
  console.log("contact address>>", errors, touched);
  const sameAddresses = (e) => {
    console.log("e --->", e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        billingAddress: values?.address,
        billingApartment: values?.apartment,
        billingSuburb: values.suburb,
        billingPostalCode: values.postalCode,
        billingState: values.state,
      });
    } else {
      setValues({
        ...values,
        billingAddress: "",
        billingApartment: "",
        billingSuburb: "",
        billingPostalCode: "",
        billingState: "",
      });
    }
  };
  const [stateOptions, setStateOptions] = useState([]);
  useEffect(() => {
    // defaultPaymentTrems
    fetch("https://masters-api-foboh.azurewebsites.net/api/State", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("state -->", data);
        setStateOptions(
          data.map((ele) => {
            return {
              value: ele.stateId,
              label: ele.stateName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (e, name) => {
    console.log("selected state>>>>...", e, name);
    if (name === "state") {
      setValues({
        ...values,
        state: e,
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

  return (
    <>
      <div className="  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">
            Customer addresses
          </h6>
        </div>
        <div className="px-6 py-7">
          <h5 className="text-green mb-5 text-base font-bold	">
            Delivery Address
          </h5>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                placeholder="126 Juliett Street"
                style={{
                  border: errors.address && touched?.address && "1px solid red",
                }}
              />
              {errors.address && touched?.address && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.address}
                </p>
              )}
              {errors.address && touched?.address && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Apartment, floor etc. (optional)
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onBlur={handleBlur}
                value={values.apartment}
                onChange={handleChange}
                placeholder="Jones"
                name="apartment"
                style={{
                  border:
                    errors.apartment && touched?.apartment && "1px solid red",
                }}
              />
              {errors.apartment && touched?.apartment && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.apartment}
                </p>
              )}
              {errors.apartment && touched?.apartment && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Suburb
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={values.suburb}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Marrickville"
                name="suburb"
                style={{
                  border: errors.suburb && touched?.suburb && "1px solid red",
                }}
              />
              {errors.suburb && touched?.suburb && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.suburb}
                </p>
              )}
              {errors.suburb && touched?.suburb && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Postcode
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={values.postalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="2204"
                name="postalCode"
                style={{
                  border:
                    errors.postalCode && touched?.postalCode && "1px solid red",
                }}
              />
              {errors.postalCode && touched?.postalCode && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.postalCode}
                </p>
              )}
              {errors.postalCode && touched?.postalCode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <h5
                className="block  tracking-wide text-gray-700 text-sm	 font-medium mb-[10px]	 "
                htmlFor="grid-last-name"
              >
                State
              </h5>

              <Select
                name="state"
                // isMulti={true}
                options={stateOptions}
                // value={stateOptions.find(
                //   (option) => option.value === values.state
                // )}
                value={values?.state}
                onChange={(e) => handleSelect(e, "state")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.defaultPaymentTerms && "1px solid red",
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 relative">
            <div className="w-full px-3">
              <label
                htmlFor="message"
                className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
              >
                Delivery notes
              </label>
              <textarea
                id="message"
                rows={4}
                value={values.deliveryNotes}
                onChange={handleChange}
                name="deliveryNotes"
                onBlur={handleBlur}
                className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                placeholder="Leave a comment..."
                defaultValue={""}
                style={{
                  border:
                    errors.deliveryNotes &&
                    touched?.deliveryNotes &&
                    "1px solid red",
                }}
              />
              {errors.deliveryNotes && touched?.deliveryNotes && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryNotes}
                </p>
              )}
              {errors.deliveryNotes && touched?.deliveryNotes && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <h5 className="text-green text-base font-bold	">
                Billing address
              </h5>
            </div>
            <div className="w-full relative md:w-1/2 px-3">
              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  defaultValue=""
                  onClick={sameAddresses}
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
                <h5 className="text-base font-normal">
                  Delivery and billing address the same
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="126 Juliett Street"
                value={values?.billingAddress}
                name="billingAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                style={{
                  border:
                    errors.billingAddress &&
                    touched?.billingAddress &&
                    "1px solid red",
                }}
              />
              {errors.billingAddress && touched?.billingAddress && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingAddress}
                </p>
              )}
              {errors.billingAddress && touched?.billingAddress && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Apartment, floor etc. (optional)
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onBlur={handleBlur}
                value={values.billingApartment}
                onChange={handleChange}
                placeholder="Jones"
                name="billingApartment"
                style={{
                  border:
                    errors.billingApartment &&
                    touched?.billingApartment &&
                    "1px solid red",
                }}
              />
              {errors.billingApartment && touched?.billingApartment && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingApartment}
                </p>
              )}
              {errors.billingApartment && touched?.billingApartment && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Suburb
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Marrickville"
                onBlur={handleBlur}
                name="billingSuburb"
                value={values.billingSuburb}
                onChange={handleChange}
                style={{
                  border:
                    errors.billingSuburb &&
                    touched?.billingSuburb &&
                    "1px solid red",
                }}
              />
              {errors.billingSuburb && touched?.billingSuburb && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingSuburb}
                </p>
              )}
              {errors.billingSuburb && touched?.billingSuburb && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Postcode
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.billingPostalCode}
                placeholder="2204"
                name="billingPostalCode"
                style={{
                  border:
                    errors.billingPostalCode &&
                    touched?.billingPostalCode &&
                    "1px solid red",
                }}
              />
              {errors.billingPostalCode && touched?.billingPostalCode && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingPostalCode}
                </p>
              )}
              {errors.billingPostalCode && touched?.billingPostalCode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="billingState"
              >
                State
              </label>
              <div className="relative">
                <select
                  onChange={handleChange}
                  name="billingState"
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="billingState"
                >
                  {stateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerAddress;
