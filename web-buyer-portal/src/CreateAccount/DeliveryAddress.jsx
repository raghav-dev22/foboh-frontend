import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Select from "react-select";
import { options } from "../data";

function DeliveryAddress({
  errors,
  handleBlur,
  handleChange,
  touched,
  setValues,
  values,
  states,
}) {
  console.log("errorsdddd", errors);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleState = (e) => {
    console.log("state", e);
    setValues({
      ...values,
      DeliveryAddressState: e,
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
            Delivery address
          </h2>
        </div>

        <div className={`relative mb-5 `} data-te-input-wrapper-init>
          <label
            htmlFor="name"
            className="md:text-base text-sm	 font-medium text-[#2B4447]"
          >
            Delivery address
          </label>
          <input
            type="text"
            id="DeliveryAddress"
            name="DeliveryAddress"
            autoComplete="on"
            value={values.DeliveryAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              border: errors.DeliveryAddress && "1px solid red",
            }}
          />
          {errors.DeliveryAddress && (
            <p className="mt-2 mb-2 text-red-500 text-xs">
              {errors.DeliveryAddress}
            </p>
          )}
          {errors.DeliveryAddress && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
          )}
        </div>
        <div className="flex flex-wrap -mx-3  items-start">
          <div className="w-full md:w-1/2	 px-3 relative mb-5">
            <label
              className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
              htmlFor="Apartment"
            >
              Apartment, floor etc.
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="Apartment"
              type="text"
              value={values.Apartment}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2	 px-3 relative mb-5">
            <label
              className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
              htmlFor="Suburb"
            >
              Suburb
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="Suburb"
              type="text"
              value={values.Suburb}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.Suburb && "1px solid red",
              }}
            />
            {errors.Suburb && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.Suburb}</p>
            )}
            {errors.Suburb && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3  items-start">
          <div className="w-full md:w-1/2	 px-3 relative mb-5">
            <label
              className="block  tracking-wide md:text-base text-sm	 font-medium text-[#2B4447]	 "
              htmlFor="Postcode"
            >
              Postcode
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="Postcode"
              type="text"
              value={values.Postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.Postcode && "1px solid red",
              }}
            />
            {errors.Postcode && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.Postcode}
              </p>
            )}
            {errors.Postcode && (
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
              onChange={(e) => handleState(e)}
              options={[
                {
                  value: "jack",
                  label: "Jack (100)",
                },
                {
                  value: "lucy",
                  label: "Lucy (101)",
                },
              ]}
              value={values.DeliveryAddressState}
            />
            {errors.Notes && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.DeliveryAddressState}
              </p>
            )}
          </div>
        </div>
        <div className={`relative mb-5 `} data-te-input-wrapper-init>
          <label
            htmlFor="Notes"
            className="md:text-base text-sm	 font-medium text-[#2B4447]"
          >
            Notes
          </label>

          <input
            type="text"
            id="Notes"
            className="pl-custom-left"
            autoComplete="off"
            placeholder="Delivery instructions"
            value={values.Notes}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={250}
          />

          <div className=" absolute top-[48px] left-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8" clipPath="url(#clip0_1807_31886)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.56548 3.23223C2.03433 2.76339 2.67021 2.5 3.33325 2.5H9.16658C9.62682 2.5 9.99992 2.8731 9.99992 3.33333C9.99992 3.79357 9.62682 4.16667 9.16658 4.16667H3.33325C3.11224 4.16667 2.90028 4.25446 2.744 4.41074C2.58772 4.56702 2.49992 4.77899 2.49992 5V16.6667C2.49992 16.8877 2.58772 17.0996 2.744 17.2559C2.90028 17.4122 3.11224 17.5 3.33325 17.5H14.9999C15.2209 17.5 15.4329 17.4122 15.5892 17.2559C15.7455 17.0996 15.8332 16.8877 15.8332 16.6667V10.8333C15.8332 10.3731 16.2063 10 16.6666 10C17.1268 10 17.4999 10.3731 17.4999 10.8333V16.6667C17.4999 17.3297 17.2365 17.9656 16.7677 18.4344C16.2988 18.9033 15.663 19.1667 14.9999 19.1667H3.33325C2.67021 19.1667 2.03433 18.9033 1.56548 18.4344C1.09664 17.9656 0.833252 17.3297 0.833252 16.6667V5C0.833252 4.33696 1.09664 3.70107 1.56548 3.23223Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6666 2.39909C16.4188 2.39909 16.1811 2.49754 16.0059 2.67278L8.25241 10.4262L7.81191 12.1882L9.57389 11.7477L17.3273 3.99427C17.5026 3.81903 17.601 3.58135 17.601 3.33352C17.601 3.0857 17.5026 2.84802 17.3273 2.67278C17.1521 2.49754 16.9144 2.39909 16.6666 2.39909ZM14.8273 1.49427C15.3151 1.00647 15.9767 0.732422 16.6666 0.732422C17.3565 0.732422 18.0181 1.00647 18.5059 1.49427C18.9937 1.98207 19.2677 2.64367 19.2677 3.33352C19.2677 4.02338 18.9937 4.68498 18.5059 5.17278L10.5892 13.0894C10.4824 13.1962 10.3486 13.272 10.202 13.3086L6.86872 14.142C6.58474 14.213 6.28433 14.1298 6.07735 13.9228C5.87036 13.7158 5.78716 13.4154 5.85815 13.1314L6.69148 9.79808C6.72812 9.65155 6.80388 9.51773 6.91068 9.41093L14.8273 1.49427Z"
                  fill="#637381"
                />
              </g>
              <defs>
                <clipPath id="clip0_1807_31886">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryAddress;
