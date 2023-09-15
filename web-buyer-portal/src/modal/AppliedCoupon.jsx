import React, { useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";

function AppliedCoupon({ show, setShow }) {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full md:items-center items-end	 justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden md:rounded-2xl rounded-se-3xl rounded-tl-3xl	 bg-white px-[75px] py-8 text-center  align-middle shadow-xl transition-all flex flex-col justify-center gap-4 relative">
                  <button
                    onClick={() => setShow(false)}
                    className="absolute top-[15px] right-[15px]"
                  >
                    <CloseIcon />
                  </button>
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="text-[#563FE3] mx-auto text-xl	font-semibold	text-center border-dashed border-2	w-fit px-[20px] py-[8px] border-[#563FE3]"
                    >
                      CODE001
                    </Dialog.Title>
                  </div>

                  <h5 className="text-lg font-semibold text-[#2B4447] text-center ">
                    Coupon has been
                    <br />
                    <span className="text-[#563FE3]">
                      successfully applied{" "}
                    </span>
                    to your
                    <br />1 Item.
                  </h5>
                  <p className="text-base    font-medium text-[#2B4447] text-center ">
                    Please note discount may not apply to all items.
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AppliedCoupon;
