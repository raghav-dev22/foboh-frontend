import React, { useState } from 'react'

function ImportProductBtn() {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button type='button' className="shadow-md border-inherit border rounded	w-28		h-10	flex justify-center items-center text-base	font-medium	" onClick={() => setShowModal(true)}>
        <h6 className="text-gray">Import</h6>
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-start gap-4 py-3 px-8 ">
                  <div className="h-12	w-12 rounded-full bg-slate-100	flex justify-center items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z" fill="#147D73" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z" fill="#147D73" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z" fill="#147D73" />
                    </svg>

                  </div>
                  <div className="">
                    <h5 className="font-medium	 text-green text-xl	">Import products</h5>
                  </div>
                </div>
                <div className="relative pb-6  px-8 ">
                  <div className="border-darkGreen border border-dashed	flex justify-center items-center   bg-slate-100 	 rounded-md	h-44	w-full mt-2">
                    <div className="text-center ">
                      <div className="download-icon relative	mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                        <input
                          type="file"
                          className="download-file w-full h-full rounded-full absolute opacity-0	"
                        // value={imageSrc}
                        // onChange={handleImageChange}
                        />
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z"
                            fill="#147D73"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z"
                            fill="#147D73"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z"
                            fill="#147D73"
                          />
                        </svg>
                      </div>
                      <p className="text-sm	text-gray leading-5 font-normal	">
                        <span className="text-lime-600 	">Click to upload</span> or drag
                        and drop
                      </p>

                    </div>
                  </div>
                </div>
                <div className="flex items-center px-8 pb-6">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <p className="text-gray text-sm	 font-normal	">Overwrite any current products that have the same SKU code. Existing values will be used for any missing columns</p>
                  </label>
                </div>
                <div className="sm:flex grid gap-2 justify-center items-center sm:justify-between pb-6 px-8 ">
                  <a href="#" className='anchor-blue'>
                    <p className="text-blue text-sm font-medium">Need help uploading products?</p>
                  </a>
                  <div className="flex gap-3">

                    <button
                      className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      <h5 className="text-base	font-medium text-green	">Cancel</h5>

                    </button>
                    <button
                      className="rounded-lg	bg-custom-skyBlue py-2.5	px-5 w-full"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      <h5 className="text-base	font-medium text-white	">    Submit</h5>

                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      ) : null}
    </>
  )
}

export default ImportProductBtn
