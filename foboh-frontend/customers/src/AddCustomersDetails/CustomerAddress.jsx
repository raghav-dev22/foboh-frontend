
import React from "react";
import { Link } from "react-router-dom";

function CustomerAddress() {

  return (
    <>

      <div className="flex justify-between mx-auto lg:w-3/5 w-full pb-10 relative	px-4">

        <div className="details-box  flex flex-col gap-2	 items-center justify-center">
          <div className="box-1 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">1</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer details
          </h5>
        </div>
        <div className="line-1 absolute"></div>
        <div className="contact-box flex flex-col gap-2 items-center justify-center">
          <div className="box-2 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">2</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer details
          </h5>
        </div>
        <div className="line-2 absolute"></div>
        <div className="address-box  flex flex-col gap-2 items-center justify-center   ">
          <div className="box-3 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">3</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer details
          </h5>
        </div>
      </div>
      <div className=" mx-auto lg:w-3/5 w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Customer addresses</h6>
        </div>
        <div className="px-6 py-7">
          <form className="w-full ">
            <h5 className="text-green mb-5 text-base font-bold	">
              Ordering contact
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
                  placeholder="126 Juliett Street"
                  name="address"

                />

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
                  placeholder="Jones"
                  name="apartment"

                />

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
                  name="suburb"

                />

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
                  placeholder="2204"
                  name="postcode"

                />

              </div>
              <div className="w-full md:w-1/3	 px-3 relative">
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
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
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
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
                {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
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
                  name="address"

                />

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
                  placeholder="Jones"
                  name="apartment"

                />

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
                  name="suburb"

                />

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
                  placeholder="2204"
                  name="postcode"

                />

              </div>
              <div className="w-full md:w-1/3	 px-3 relative">
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
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 text-end	 flex justify-between ">
              <Link to="/dashboard/add-customer/customer-contact">

                <button className="py-2 px-7 rounded-md	bg-custom-skyBlue	">
                  <h5 className="text-base font-medium text-white">Back</h5>
                </button>
              </Link>
              <Link to="/dashboard/add-customer/customer-addrress">

                <button className="py-2 px-7 rounded-md	bg-custom-skyBlue	">
                  <h5 className="text-base font-medium text-white">Save</h5>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerAddress;
