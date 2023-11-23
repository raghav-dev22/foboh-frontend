import React from "react";

const CustomerBillingStatement = ({
  formChange,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}) => {
  return (
    <div className="border w-full border-[#E7E7E7] rounded-md bg-white">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447] mb-2">
          Customer billing statement
        </h5>
        <p className="text-sm font-medium text-[#637381] leading-[20px]">
          This information will be shown on the buyer’s card statements.{" "}
        </p>
      </div>
      <div className="py-6 px-6">
        <form action="" onChange={formChange}>
          <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="username"
            >
              Statement descriptor
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter statement descriptor"
              name="StatementDescriptor"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.StatementDescriptor}
            />
            {errors.StatementDescriptor && touched.StatementDescriptor && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.StatementDescriptor}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="username"
            >
              Mobile number
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PhoneNumber"
              type="text"
              name="PhoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.PhoneNumber}
              placeholder="04XX XXX XXX / +61 4XX XXX XXX
                      "
            />
            {errors.PhoneNumber && touched.PhoneNumber && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.PhoneNumber}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerBillingStatement;
