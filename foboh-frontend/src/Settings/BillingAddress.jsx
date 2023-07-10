import React from 'react'

function BillingAddress() {
  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
  <div className=" border-b	 border-inherit px-5 py-4">
    <h6 className="text-base	font-medium	 text-green">Personal details</h6>
  </div>
  <div className="px-6 py-7">
    <form className="w-full max-w-lg">
      <div className="flex items-center mb-5">
        <input
          id="default-checkbox"
          type="checkbox"
          defaultValue=""
          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-base	 font-normal	 text-green dark:text-gray-300"
        >
          Use same address as Organisation for Billing{" "}
        </label>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
            htmlFor="grid-last-name"
          >
            First name
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Tom"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
            htmlFor="grid-last-name"
          >
            Last name
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Jones"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full md:w-1/3	 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
            htmlFor="grid-last-name"
          >
            First name
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Tom"
          />
        </div>
        <div className="w-full md:w-1/3	 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
            htmlFor="grid-last-name"
          >
            Last name
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Jones"
          />
        </div>
        <div className="w-full md:w-1/3	 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
            htmlFor="grid-last-name"
          >
            State
          </label>
          <div className="relative">
            <select
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option>New Mexico</option>
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
  )
}

export default BillingAddress
