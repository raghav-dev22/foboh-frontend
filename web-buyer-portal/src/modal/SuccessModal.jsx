import React, { useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function SuccessModal({ show, setShow }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden md:rounded-2xl rounded-se-3xl rounded-tl-3xl	 bg-white px-6 py-14 text-left  align-middle shadow-xl transition-all flex flex-col justify-center gap-6">
                  <Dialog.Title
                    as="h3"
                    className="text-[#563FE3] text-2xl	font-bold	text-center"
                  >
                    Success 🎉
                  </Dialog.Title>

                  <p className="text-sm font-normal text-[#637381] text-center ">
                    Your account has now been created.
                  </p>
                  <p className="text-sm font-normal text-[#637381] text-center ">
                    Follow the prompt below to proceed to the <br /> homepage.
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("loginPopup");
                        navigate("/home-page");
                      }}
                      className="login-btn bg-custom-blue rounded-md	w-full p-3 shadow-md"
                    >
                      <p className="text-white text-center font-semibold	text-sm	">
                        Continue
                      </p>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SuccessModal;
