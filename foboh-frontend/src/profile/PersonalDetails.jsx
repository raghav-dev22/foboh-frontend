import React from 'react'

function PersonalDetails() {
  return (
    <>
         <div className=" md:w-3/5 w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                    <div className=" border-b	 border-inherit px-5 py-4">
                      <h6 className="text-base	font-medium	 text-green">Personal details</h6>
                    </div>
                    <div className="px-6 py-7">
                      <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
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
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
                              htmlFor="grid-password"
                            >
                              Email
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-password"
                              type="email"
                              placeholder="devidjond45@gmail.com"
                            />
                            {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 mb-2"
                              htmlFor="grid-password"
                            >
                              Mobile
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-password"
                              type="number"
                              placeholder="0412 345 678"
                            />
                            {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                            >
                              Your message
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

export default PersonalDetails
