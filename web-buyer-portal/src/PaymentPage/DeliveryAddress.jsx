import React, { useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BillingAddressSchema } from "../schemas";
import { useFormik } from "formik";

function DeliveryAddress() {
  const [value, setValue] = useState();
  const storedValue = JSON.parse(localStorage.getItem("myKey"));
  console.log(storedValue, "storedValue====>");
  //   setValue(storedValue);

  return (
    <>
      <form>
        <div className="mt-8">
          <div className="mb-3">
            <label
              className="block text-[#2B4447] text-lg font-semibold mb-3"
              htmlFor="Country/Region"
            >
              Billing Address
            </label>
            <input
              className=" placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
              id="Country"
              type="text"
              name="Country"
              placeholder="Country"
              value={storedValue.Country}
            />
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 md:mb-0">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="FirstName"
                type="text"
                placeholder="First Name"
                value={storedValue.FirstName}
              />
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="LastName"
                type="text"
                placeholder="Last Name"
                value={storedValue.LastName}
              />
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 md:mb-0">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Company"
                type="text"
                placeholder="Company (Optional)"
                value={storedValue.Company}
              />
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Apartment"
                type="text"
                placeholder="Apartment, Suite, etc"
                value={storedValue.Apartment}
              />
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 md:mb-0">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="City"
                type="text"
                placeholder="City"
                value={storedValue.City}
              />
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="State"
                type="text"
                placeholder="State/Teritory"
                value={storedValue.State}
              />
            </div>
          </div>
          <div className="flex md:flex-nowrap gap-4">
            <div className="w-full   mb-3 md:mb-0">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Postcode"
                type="text"
                placeholder="Postcode"
                value={storedValue.Postcode}
              />
            </div>
            <div className="w-full   mb-3">
              <input
                className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="Mobile"
                type="text"
                placeholder="Phone"
                value={storedValue.Mobile}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          // onClick={handleSubmit}
          className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
        >
          Pay Now
        </button>
      </form>
    </>
  );
}

export default DeliveryAddress;
