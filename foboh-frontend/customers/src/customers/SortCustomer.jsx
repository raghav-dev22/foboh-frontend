import React, { useState } from "react";

function FilterCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [check, setCheck] = useState({
    filterTextFirst: false,
    filterTextSecond: false,
    filterTextThird: false,
    filterTextForth: false,
  });

  const {
    filterTextFirst,
    filterTextSecond,
    filterTextThird,
    filterTextForth,
  } = check;

  const changeHandler = (e) => {
    setCheck({
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <div className="relative sm:w-24 w-2/4	">
        <div
          className="h-11	w-fit px-5  shadow-md	border  border-inherit rounded-md flex items-center justify-center gap-2 cursor-pointer	"
          onClick={toggleDropdown}
        >
          <div className="">
            <svg
              width={13}
              height={10}
              viewBox="0 0 13 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.367676 9.19262V7.79512H4.56018V9.19262H0.367676ZM0.367676 5.69887V4.30137H8.75268V5.69887H0.367676ZM0.367676 2.20512V0.807617H12.9452V2.20512H0.367676Z"
                fill="#637381"
              />
            </svg>
          </div>
          <h6 className="text-base	font-normal	text-gray">Sort</h6>
        </div>
        {isOpen && (
          <>
            <div className=" z-10	right-0 w-56   sm:w-30 absolute top-14 border border-inherit bg-white	shadow-md rounded-lg	h-fit py-3	">
              <ul className="dropdown-content 	 ">
                <li className="py-2.5	px-4	">
                  <div className="flex items-center">
                    <input
                      defaultChecked=""
                      id="default-radio-1"
                      type="radio"
                      name="filterTextFirst"
                      checked={filterTextFirst}
                      onChange={changeHandler}
                      defaultValue=""
                      className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full	      dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-1"
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray"
                    >
                      Name
                    </label>
                  </div>
                </li>

                <li className="py-2.5	px-4	">
                  <div className="flex items-center">
                    <input
                      defaultChecked=""
                      id="default-radio-2"
                      type="radio"
                      name="filterTextSecond"
                      checked={filterTextSecond}
                      onChange={changeHandler}
                      defaultValue=""
                      className="w-4 relative h-4 text-lightGreen bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray"
                    >
                      Contact
                    </label>
                  </div>
                </li>

                <li className="py-2.5	px-4 	">
                  <div className="flex items-center">
                    <input
                      defaultChecked=""
                      id="default-radio-3"
                      type="radio"
                      name="filterTextThird"
                      checked={filterTextThird}
                      onChange={changeHandler}
                      defaultValue=""
                      className="w-4 h-4 relative text-lightGreen bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray"
                    >
                      No. orders
                    </label>
                  </div>
                </li>
                <li className="py-2.5	px-4 	">
                  <div className="flex items-center">
                    <input
                      defaultChecked=""
                      id="default-radio-4"
                      type="radio"
                      name="filterTextForth"
                      checked={filterTextForth}
                      onChange={changeHandler}
                      defaultValue=""
                      className="w-4 h-4 text-lightGreen bg-gray-100 border-gray-300 rounded  relative     dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray"
                    >
                      Amount spent
                    </label>
                  </div>
                </li>
              </ul>
              {filterTextFirst && (
                <div className="border-t border-inherit ">
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img src="/assets/arrow_upward.png" alt="" className="" />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">A - Z</h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img
                        src="/assets/arrow_upward.png"
                        alt=""
                        className=" rotate-180"
                      />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">A - Z</h5>
                    </div>
                  </div>
                </div>
              )}
              {filterTextSecond && (
                <div className="border-t border-inherit ">
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img src="/assets/arrow_upward.png" alt="" className="" />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Oldest first
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img
                        src="/assets/arrow_upward.png"
                        alt=""
                        className=" rotate-180"
                      />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Newest first
                      </h5>
                    </div>
                  </div>
                </div>
              )}

              {filterTextThird && (
                <div className="border-t border-inherit ">
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img src="/assets/arrow_upward.png" alt="" className="" />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Lowest to highest
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img
                        src="/assets/arrow_upward.png"
                        alt=""
                        className=" rotate-180"
                      />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Highest to lowest
                      </h5>
                    </div>
                  </div>
                </div>
              )}
              {filterTextForth && (
                <div className="border-t border-inherit ">
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img src="/assets/arrow_upward.png" alt="" className="" />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Oldest first
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3 py-2.5	px-4 box-range">
                    <div className="">
                      <img
                        src="/assets/arrow_upward.png"
                        alt=""
                        className=" rotate-180"
                      />
                    </div>
                    <div className="">
                      <h5 className="text-base font-medium text-gray">
                        Newest first
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FilterCustomer;
