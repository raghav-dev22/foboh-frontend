import { useFormik } from "formik";
import React from "react";
import { OrganisationAddressSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  address: "",
  apartment: "",
  suburb: "",
  postcode: "",
};

function OrganisationAddress() {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: OrganisationAddressSchema,
      onSubmit: (values) => {},
    });

  return (
    <>
      <div className="w-full rounded-lg border border-inherit bg-white h-fit">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">
            Organisation address
          </h6>
        </div>
        <div className="px-6 py-7">
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-5 items-end">
              <div className="w-full relative md:w-1/2 px-3">
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
                  placeholder="126 Juliett Street"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.address && touched.address && "1px solid red",
                  }}
                />
                {errors.address && touched.address && (
                  <p className="mt-2 mb-2 text-red-500">{errors.address}</p>
                )}
                {errors.address && touched.address && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full relative md:w-1/2 px-3">
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
                  name="apartment"
                  placeholder="Jones"
                  value={values.apartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.apartment && touched.apartment && "1px solid red",
                  }}
                />
                {errors.apartment && touched.apartment && (
                  <p className="mt-2 mb-2 text-red-500">{errors.apartment}</p>
                )}
                {errors.apartment && touched.apartment && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 items-end">
              <div className="w-full relative md:w-1/3	 px-3">
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
                  name="suburb"
                  placeholder="Marrickville"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.suburb && touched.suburb && "1px solid red",
                  }}
                />
                {errors.suburb && touched.suburb && (
                  <p className="mt-2 mb-2 text-red-500">{errors.suburb}</p>
                )}
                {errors.suburb && touched.suburb && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full relative md:w-1/3	 px-3">
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
                  name="postcode"
                  placeholder="2204"
                  value={values.postcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.postcode && touched.postcode && "1px solid red",
                  }}
                />
                {errors.postcode && touched.postcode && (
                  <p className="mt-2 mb-2 text-red-500">{errors.postcode}</p>
                )}
                {errors.postcode && touched.postcode && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/3	 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  State
                </label>
                <div className="relative">
                  <select
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>NSW</option>
                    <option>Missouri</option>
                    <option>Texas</option>
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
          </form>
        </div>
      </div>
    </>
  );
}

export default OrganisationAddress;
