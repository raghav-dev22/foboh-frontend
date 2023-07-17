import React from 'react'

function OrganisationAddress() {
  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
    <h6 className="text-base	font-medium	 text-green">Organisation address</h6>
  </div>
  <div className="px-6 py-7">
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-5 items-end">
        <div className="w-full md:w-1/2 px-3">
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
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
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
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5 items-end">
        <div className="w-full md:w-1/3	 px-3">
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
          />
        </div>
        <div className="w-full md:w-1/3	 px-3">
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
          />
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
                viewBox="0 0 20 20">
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

export default OrganisationAddress
