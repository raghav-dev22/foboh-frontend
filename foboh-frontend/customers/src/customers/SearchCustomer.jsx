import React, { useEffect } from "react";

import FilterCustomer from "./SortCustomer";
import { useState } from "react";

let filterAndSort = {
  filter: {
    businessName: "",
    status: true,
    postCode: "",
    state: "",
    page: 0,
  },
  sort: {
    sortBy: "",
    sortOrder: "asc",
  },
};

function SearchCustomer({
  products,
  setProducts,
  prevProducts,
  totalPages,
  pageIndex,
  setPageIndex,
}) {
  const State = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
  const status = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "inactive" },
  ];
  const [First, setFirst] = useState(false);
  const [Second, setSecond] = useState(false);
  const [Third, setThird] = useState(false);
  const [pincode, setPinCode] = React.useState("");
  const [search, setSearch] = React.useState();
  const [selectArray, setSelectedArray] = React.useState([]);
  const [isActiveChecked, setIsActiveChecked] = React.useState(false);
  const [isInactiveChecked, setIsInactiveChecked] = React.useState(true);
  const [itemLabel, setItemLabel] = useState("");

  

  const handleSortChange = (sortBy, sortOrder) => {
    // Handling pagination
    const newFilter = {
      ...filterAndSort.filter,
      page: pageIndex,
    };

    filterAndSort = {
      ...filterAndSort,
      filter: newFilter,
    };

    console.log(sortBy, sortOrder);
    setItemLabel(sortBy);

    filterAndSort = {
      ...filterAndSort,
      sort: {
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    };

    // processChange("filterAndSort");
    console.log("val", filterAndSort);
  };

  const addState = (item) => {
    console.log(item, "item");
    if (!selectArray.includes(item)) {
      setSelectedArray([...selectArray, item]);
      saveInput("filterAndSort");
    }
  };

  const DropDownFirst = () => {
    setFirst(!First);
    setSecond(false);
    setThird(false);
  };

  const DropDownSecond = () => {
    setFirst(false);
    setSecond(!Second);
    setThird(false);
  };

  const DropDownThird = () => {
    setFirst(false);
    setSecond(false);
    setThird(!Third);
  };

  const filterClick = () => {
    isFilter(filterAndSort);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("values is>", name, value);
    switch (name) {
      case "search":
        setSearch(value);
        break;
      case "pincode":
        setPinCode(value);
        saveInput("filterAndSort");
      default:
        break;
    }
  };

  const toggleCheckbox = (name, e) => {
    switch (name) {
      case "active":
        setIsActiveChecked(true);
        setIsInactiveChecked(false);
        filterClick();
        break;
      case "inactive":
        setIsActiveChecked(false);
        setIsInactiveChecked(true);
        filterClick();
      default:
        break;
    }
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const saveInput = (name) => {
    if (name === "filterAndSort") {
      fetch(
        "https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterAndSort),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          totalPages(data.total);
          console.log("filter customer table", data.data);
          setProducts(data.data);
        })
        .catch((error) => console.log(error));
    } else {
      fetch(
        `https://fobohwepapifbh.azurewebsites.net/api/Customer/SearchByName?search=${search}`,
        {
          method: "GET",
        }
      )
        .then((respose) => respose.json())
        .then((data) => {
          if (!data.status) {
            totalPages(data.total);
            console.log("search data on filter >>", data);
            setProducts(data.data);
          } else {
            setProducts(prevProducts);
          }
        });
    }
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    if (value?.length > 0) {
      setPinCode(value);
      saveInput("filterAndSort");
    } else {
      setProducts(prevProducts);
    }
  };
  const toggleCategory = () => {};
  return (
    <>
      <div className=" border border-inherit bg-white h-full py-3	 px-4">
        <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center ">
          <div>
            <div className="relative 	">
              <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                placeholder="search customer"
                name="text"
                onKeyUp={saveInput}
                onChange={handleInputChange}
                // onChange={(e) => SetpinCode(e.target.value)
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* <Filter/> */}
            <div className="h-11	w-fit px-5 shadow-md	border  border-inherit rounded-md flex items-center justify-center gap-2">
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
            <FilterCustomer
              filterAndSort={filterAndSort}
              handleSortChange={handleSortChange}
              itemLabel={itemLabel}
            />
          </div>
        </div>
        <div className="flex gap-8 relative  pt-4 flex-wrap">
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box cursor-pointer"
              onClick={DropDownFirst}
            >
              <h5 className={`text-base font-medium	text-gray `}>Status</h5>
              <div className={`arrow-${First}`}>
                <img src="/assets/dropdownArrow.png" alt="" />
              </div>
            </div>
            {First && (
              <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
                <ul className="dropdown-content 	 ">
                  {status.map((sts) => (
                    <li className="py-2.5	px-4	">
                      <div className="flex items-center">
                        <input
                          id={sts.value}
                          type="checkbox"
                          value={sts.value}
                          onClick={(e) =>
                            toggleCategory(e, sts.value, "status")
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={sts.value}
                          className="ml-2 text-sm font-medium text-gray"
                        >
                          {sts.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* <CustomerState /> */}
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box cursor-pointer"
              onClick={DropDownSecond}
            >
              <h5 className="text-base font-medium	text-gray">State</h5>
              <div className={`arrow-${Second}`}>
                <img src="/assets/dropdownArrow.png" alt="" />
              </div>
            </div>
            {Second && (
              <div
                className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	 overflow-y-scroll py-3	"
                style={{ height: "175px" }}
              >
                <ul className="dropdown-content 	 ">
                  {State.map((item, index) => {
                    return (
                      <>
                        <li className="py-2.5	px-4	">
                          <div className="flex items-center">
                            <input
                              onClick={() => {
                                addState(item);
                              }}
                              defaultChecked=""
                              id="checked-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checked-checkbox"
                              className="ml-2 text-sm font-medium text-gray"
                            >
                              {item}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}

                  {/* <li className="py-2.5	px-4	">
                    <div className="flex items-center">
                      <input
                        defaultChecked=""
                        id="checked-checkbox"
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ml-2 text-sm font-medium text-gray"
                      >
                        Hidden
                      </label>
                    </div>
                  </li> */}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box cursor-pointer"
              onClick={DropDownThird}
            >
              <h5 className="text-base font-medium	text-gray">Postcode</h5>
              <div className={`arrow-${Third}`}>
                <img src="/assets/dropdownArrow.png" alt="" />
              </div>
            </div>
            {Third && (
              <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit 	">
                <input
                  type="search"
                  id="default-search"
                  className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                  placeholder="4739"
                  name="pincode"
                  required=""
                  value={pincode}
                  onChange={handleInputChange1}
                />
              </div>
            )}
          </div>
          {/* <CustomerPostCode /> */}
          {/* <CustomerVisibility/> */}
        </div>
      </div>
    </>
  );
}

export default SearchCustomer;
