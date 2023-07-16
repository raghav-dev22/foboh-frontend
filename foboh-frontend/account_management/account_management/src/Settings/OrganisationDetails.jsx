import React from 'react'

function OrganisationDetails() {
  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
    <h6 className="text-base	font-medium	 text-green">Organisation details </h6>
  </div>
  <div className="px-6 py-7">
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
            htmlFor="grid-last-name"
          >
          Trading name
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Lo-Fi Wines"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
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
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
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
            type="email"
            placeholder="69618617344"
          />
          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
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
          />
          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
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
