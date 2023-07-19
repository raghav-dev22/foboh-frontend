import React from 'react'
import { useFormik } from "formik";
import { OrganisationDetailsSchema} from '../schemas';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const initialValues = {
  tradingName: "",
  businessName: "",
  abn: "",
  liquorLicence: "",
};


function OrganisationDetails() {

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: OrganisationDetailsSchema,
      onSubmit: (values) => {
        console.log(values,"kkk");
      },
    });

    console.log(values);

  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Organisation details </h6>
        </div>
        <div className="px-6 py-7">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Trading name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="tradingName"
                  type="text"
                  placeholder="Lo-Fi Wines"
                  value={values.tradingName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.tradingName && touched.tradingName && "1px solid red",
                  }}
                />
                {errors.tradingName && touched.tradingName && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">{errors.tradingName}</p>
                )}
                {errors.tradingName && touched.tradingName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Business name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="LO-FI WINES PTY LTD"
                  name="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.businessName && touched.businessName && "1px solid red",
                  }}
                />
                {errors.businessName && touched.businessName && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">{errors.businessName}</p>
                )}
                {errors.businessName && touched.businessName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 relative">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                  htmlFor="grid-password"
                >
                  ABN
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="abn"
                  placeholder="69618617344"
                  name="abn"
                  value={values.abn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.abn && touched.abn && "1px solid red",
                  }}
                />
                {errors.abn && touched.abn && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">{errors.abn}</p>
                )}
                {errors.abn && touched.abn && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[31px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 relative">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Liquor licence
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="number"
                  placeholder="LIQO10000000"
                  name="liquorLicence"
                  value={values.liquorLicence}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.liquorLicence && touched.liquorLicence && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">{errors.liquorLicence}</p>
                )}
                {errors.liquorLicence && touched.liquorLicence && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 relative">
              <div className="w-full px-3">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
                {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default OrganisationDetails
