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
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.13131 2.44682C1.2458 2.2053 1.4931 2.05078 1.76513 2.05078H15.7395C16.0115 2.05078 16.2588 2.2053 16.3733 2.44682C16.4878 2.68833 16.4487 2.97292 16.273 3.17621L10.8485 9.45426V15.044C10.8485 15.281 10.7231 15.5011 10.5171 15.6257C10.3111 15.7503 10.0539 15.7616 9.83727 15.6556L7.0424 14.2879C6.80569 14.1721 6.65616 13.9353 6.65616 13.6763V9.45426L1.23161 3.17621C1.05596 2.97292 1.01682 2.68833 1.13131 2.44682ZM3.27108 3.41848L7.8884 8.76229C7.99507 8.88574 8.0536 9.04219 8.0536 9.20387V13.2536L9.45103 13.9375V9.20387C9.45103 9.04219 9.50956 8.88574 9.61623 8.76229L14.2335 3.41848H3.27108Z"
                fill="#637381"
              />
            </svg>
          </div>
          <h6 className="text-base	font-normal	text-gray">Filter</h6>
        </div>
        {isOpen && (
          <>
            <div className=" z-10	left-0 w-56   sm:w-30 absolute top-14 border border-inherit bg-white	shadow-md rounded-lg	h-fit py-3	">
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
