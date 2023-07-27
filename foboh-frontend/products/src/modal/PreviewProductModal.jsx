import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ImportProductModal from "./ImportProductModal";

function PreviewProductModal({ show, setShow }) {
  const cancelButtonRef = useRef(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const showModal = () => {
    setShowPreviewModal(true);
    setShow(false);
  };

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=""
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo=""
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl	">
                  <div className="bg-white px-8 pb-8 pt-8 sm:p-6 sm:pb-4 rounded-t-lg">
                    <div className="sm:flex sm:items-center">
                      <div className="">
                        <img src="/assets/downloadBtn.png" alt="" />
                      </div>
                      <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Preview products
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="my-4 rounded-md	border-y	border-r	border-l-8	border-y-custom	border-left-blue py-3 px-4 border-r-custom	">
                        <p className="text-sm font-normal">
                          You are importing X products into FOBOH. You have
                          chosen to overwrite any existing products that have
                          the same SKU. If this preview doesn’t look right
                          please update the file and try again.
                        </p>
                      </div>
                    </div>
                    <div className="relative px-6 py-3  ">
                      <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                        <p className="text-sm font-semibold">Title</p>
                        <p className="text-sm font-normal text-lightGreen">
                          Rising Star Riesling{" "}
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                        <p className="text-sm font-semibold">Title</p>
                        <p className="text-sm font-normal text-lightGreen">
                          Rising Star Riesling{" "}
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                        <p className="text-sm font-semibold">Title</p>
                        <p className="text-sm font-normal text-lightGreen">
                          Rising Star Riesling{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-lg sm:flex grid gap-2 justify-end items-center  pb-6 px-8 ">
                    <div className="flex gap-3">
                      <button
                        className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                        type="button"
                        onclick="history.back()"
                      >
                        <h5 className="text-base	font-medium text-green	">
                          Back
                        </h5>
                      </button>
                      <button
                        className="rounded-lg	bg-custom-skyBlue py-2.5	px-5 w-full"
                        type="button"
                        onClick={showModal}
                        ref={cancelButtonRef}
                      >
                        <h5 className="text-base	font-medium text-white	">
                          {" "}
                          Import
                        </h5>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <ImportProductModal
        show={showPreviewModal}
        setShow={(set) => setShowPreviewModal(set)}
      />
    </>
  );
}

export default PreviewProductModal;
