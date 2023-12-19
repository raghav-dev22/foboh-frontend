import React, { useState } from "react";
import Select from "react-select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function OrderContact({
  values,
  errors,
  handleBlur,
  handleChange,
  touched,
  setValues,
  isBuyerExist,
  initialValues,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleState = (e) => {
    setValues({
      ...values,
      OrderContactState: e.value,
    });
  };
  const [Ischecked, setIsChecked] = useState();

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    const checked = e.target.checked;
    checked
      ? setValues({
          ...values,
          DeliveryContactFirstName: values.OrderingContactFirstName,
          DeliveryContactLastName: values.OrderingContactLastName,
          DeliveryContactEmail: values.OrderingContactEmail,
          DeliveryContactMobile: values.OrderingContactMobile,
        })
      : setValues({
          ...values,
          DeliveryContactFirstName: initialValues.OrderingContactFirstName,
          DeliveryContactLastName: initialValues.OrderingContactLastName,
          DeliveryContactEmail: initialValues.OrderingContactEmail,
          DeliveryContactMobile: initialValues.OrderingContactMobile,
        });
  };

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
              name="OrderingContactFirstName"
              value={values.OrderingContactFirstName}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyPress={(event) => {
                const allowedCharacters = /^[A-Za-z]*$/;

                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              style={{
                border: errors.OrderingContactFirstName && "1px solid red",
              }}
            />
            {errors.OrderingContactFirstName && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.OrderingContactFirstName}
              </p>
            )}
            {errors.OrderingContactFirstName && (
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
              name="OrderingContactLastName"
              value={values.OrderingContactLastName}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyPress={(event) => {
                const allowedCharacters = /^[A-Za-z]*$/;

                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              style={{
                border: errors.OrderingContactLastName && "1px solid red",
              }}
            />
            {errors.FirstName && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.OrderingContactLastName}
              </p>
            )}
            {errors.OrderingContactLastName && (
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
            autoComplete="on"
            value={values.OrderingContactEmail}
            onChange={handleChange}
            name="OrderingContactEmail"
            onBlur={handleBlur}
            style={{
              border: errors.OrderingContactEmail && "1px solid red",
            }}
          />
          {errors.OrderingContactEmail && (
            <p className="mt-2 mb-2 text-red-500 text-xs">
              {errors.OrderingContactEmail}
            </p>
          )}
          {errors.OrderingContactEmail && (
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
            autoComplete="on"
            name="OrderingContactMobile"
            value={values.OrderingContactMobile}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              border: errors.OrderingContactMobile && "1px solid red",
            }}
          />
          {errors.OrderingContactMobile && (
            <p className="mt-2 mb-2 text-red-500 text-xs">
              {errors.OrderingContactMobile}
            </p>
          )}
          {errors.OrderingContactMobile && (
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
              onChange={(e) => handleCheckbox(e)}
              checked={Ischecked}
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
                value={values.DeliveryContactFirstName}
                name="DeliveryContactFirstName"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  const allowedCharacters = /^[A-Za-z]*$/;

                  if (!allowedCharacters.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                style={{
                  border: errors.DeliveryContactFirstName && "1px solid red",
                }}
              />
              {errors.DeliveryContactFirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.DeliveryContactFirstName}
                </p>
              )}
              {errors.DeliveryContactFirstName && (
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
                value={values.DeliveryContactLastName}
                name="DeliveryContactLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  const allowedCharacters = /^[A-Za-z]*$/;

                  if (!allowedCharacters.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                style={{
                  border: errors.DeliveryContactLastName && "1px solid red",
                }}
              />
              {errors.DeliveryContactLastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.DeliveryContactLastName}
                </p>
              )}
              {errors.DeliveryContactLastName && (
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
              name="DeliveryContactEmail"
              value={values.DeliveryContactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.DeliveryContactEmail && "1px solid red",
              }}
            />
            {errors.DeliveryContactEmail && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.DeliveryContactEmail}
              </p>
            )}
            {errors.DeliveryContactEmail && (
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
              value={values.DeliveryContactMobile}
              onChange={handleChange}
              name="DeliveryContactMobile"
              onBlur={handleBlur}
              style={{
                border: errors.DeliveryContactMobile && "1px solid red",
              }}
            />
            {errors.DeliveryContactMobile && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.DeliveryContactMobile}
              </p>
            )}

            {isBuyerExist && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                Buyer already exist, please try again with other email.
              </p>
            )}
            {errors.DeliveryContactMobile && (
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
