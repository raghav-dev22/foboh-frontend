import React, { useEffect, useRef } from "react";
import FilterCustomer from "./SortCustomer";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Select, Space } from "antd";
let filterAndSort = {
  filter: {
    businessName: "",
    status: "",
    postCode: "",
    state: [],
    page: 1,
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
  setTotalPages,
  pageIndex,
  setPageIndex,
  setisSearchResult,
}) {
  const State = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
  const status = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];
  const [First, setFirst] = useState(false);
  const [Second, setSecond] = useState(false);
  const [Third, setThird] = useState(false);
  const [pincode, setPinCode] = React.useState("");
  const [search, setSearch] = React.useState(0);
  const [selectArray, setSelectedArray] = React.useState([]);
  const [isActiveChecked, setIsActiveChecked] = React.useState(false);
  const [isInactiveChecked, setIsInactiveChecked] = React.useState(true);
  const [itemLabel, setItemLabel] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const dropdownRef = useRef(null);
  const { Option } = Select;

  const handleChange = (value) => {
    console.log("Value >>", value);
  };

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

    processChange("filterAndSort");
    // processChange("filterAndSort");
    console.log("val", filterAndSort);
  };

  const addState = (value) => {
    console.log(value, "item");

    const newState = value;
    // Clone the filter object to avoid mutating the state directly
    const updatedFilter = {
      ...filterAndSort.filter,
      state: newState,
    };

    filterAndSort = {
      ...filterAndSort,
      filter: updatedFilter,
    };

    // Update the filterAndSort object with the new state

    console.log("debou >>", filterAndSort);
    // Save input here if needed

    processChange("filterAndSort");
  };

  const DropDownFirst = () => {
    setFirst(true);
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
    // if(value === 0){
    //   saveInput()
    // }
    switch (name) {
      case "text":
        filterAndSort.filter.businessName = value;
        console.log("businessName", filterAndSort.filter.businessName);
        break;
      case "pincode":
        filterAndSort.filter.postCode = value;
        setPinCode(value);
      // saveInput("filterAndSort");
      default:
        break;
    }
  };

  const toggleCategory = (e, value, category) => {
    const checked = e.target.checked;

    const newStatus = checked ? value : "";

    const updatedFilter = {
      ...filterAndSort.filter,
      status: newStatus,
    };

    // Update the filterAndSort object with the new filter object
    filterAndSort = {
      ...filterAndSort,
      filter: updatedFilter,
    };
    // Save input here if needed
    processChange("filterAndSort");
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

  const processChange = debounce((name) => saveInput(name));

  const saveInput = (name) => {
    console.log("debounce val >>", filterAndSort);
    const orgID = localStorage.getItem("organisationId");
    if (name === "filterAndSort") {
      fetch(
        `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Filter?OrganisationId=${orgID}`,
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
          if (data?.data?.length > 0) {
            setTotalPages(data.last_page);
            setPageIndex(data.last_page);
            console.log("filter customer table", data.data);
            setProducts(data.data);
            setSearch(data.data.length);
            setisSearchResult(true);
          } else {
            setisSearchResult(false);
            setTotalPages(0);
          }
        })
        .catch((error) => console.log(error));
    } else {
      let search = filterAndSort?.filter?.businessName;
      const orgID = localStorage.getItem("organisationId");
      fetch(
        `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/SearchByName?search=${search}&page=${pageIndex}&OrganisationId=${orgID}`,
        {
          method: "GET",
        }
      )
        .then((respose) => respose.json())
        .then((data) => {
          if (search) {
            setTotalPages(data.total);
            setisSearchResult(true);
            console.log("search data on filter >>", data);
            setProducts(data.data);
          } else {
            setisSearchResult(false);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("Clicked outside dropdown container");

        const dropdowns = document.querySelectorAll(".product-dropdown");
        let isInsideDropdown = false;

        for (const dropdown of dropdowns) {
          if (dropdown.contains(event.target)) {
            isInsideDropdown = true;
            break;
          }
        }

        if (!isInsideDropdown) {
          setFirst(false);
          setSecond(false);
          setThird(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div
        className=" border border-inherit bg-white h-full py-3	 px-4"
        ref={dropdownRef}
      >
        <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center ">
          <div>
            <div className="relative 	">
              <div
                className="absolute inset-y-0  flex items-center pr-1 pointer-events-none"
                style={{ right: "10px" }}
              >
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
                placeholder="Search customers"
                name="text"
                onKeyUp={() => processChange("filterAndSort")}
                onChange={handleInputChange}
                // onChange={(e) => SetpinCode(e.target.value)
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* <Filter/> */}
            <div
              onClick={() => setIsFilter(!isFilter)}
              className="h-11	w-fit px-5 shadow-md cursor-pointer	border  border-inherit rounded-md flex items-center justify-center gap-2"
            >
              <div className="">
                {/* {search === 0 && (
                  <FilterAltOutlinedIcon style={{ fill: "#637381" }} />
                )}
                {search > 0 && <FilterAltIcon style={{ fill: "#637381" }} />} */}
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
        {isFilter && (
          <div className="flex justify-between items-center pt-4 ">
            <div className="flex  gap-8 relative   flex-wrap">
              <div className="relative">
                <div
                  className="flex items-center gap-2 product-category-box cursor-pointer"
                  onClick={DropDownFirst}
                >
                  <h5 className={`text-base font-medium	text-gray `}>Status</h5>
                  <div className={`arrow-${First}`}>
                    <img src="/assets/dropdownArrow.png" alt="" />
                  </div>

                  {First && (
                    <div
                      className=" z-10 left-0   w-60 absolute product-dropdown bg-white  shadow-md rounded-lg  h-fit py-3  "
                      style={{ top: "37px" }}
                    >
                      <ul className="dropdown-content">
                        {status.map((sts) => (
                          <li className="py-2.5 px-4  ">
                            <div className="flex items-center ">
                              <div className="flex items-center gap-3 green-checkbox">
                                <input
                                  id={sts.label}
                                  checked={
                                    filterAndSort?.filter?.status === sts.value
                                  }
                                  type="checkbox"
                                  value={sts.value}
                                  onClick={(e) =>
                                    toggleCategory(e, sts.value, "status")
                                  }
                                  className=""
                                />
                              </div>

                              <label
                                htmlFor={sts.label}
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
              </div>
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
                    className=" z-10	left-0   w-60 absolute product-dropdown rounded-lg	 overflow-y-scroll py-3	"
                    style={{ height: "175px" }}
                  >
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="select one country"
                      onChange={addState}
                      optionLabelProp="label"
                      open={true}
                    >
                      {State.map((item, index) => {
                        return (
                          <>
                            <Option value={item} label={item}>
                              <Space>{item}</Space>
                            </Option>
                          </>
                        );
                      })}
                    </Select>
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
                      maxLength={4}
                      className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                      placeholder="4739"
                      name="pincode"
                      required=""
                      value={pincode}
                      onKeyUp={() => processChange("filterAndSort")}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setIsFilter(false);
              }}
            >
              <h2 className="text-[#DC3545] font-medium text-base leading-[24px] underline">
                Clear filters
              </h2>
            </div>
            {/* <CustomerPostCode /> */}
            {/* <CustomerVisibility/> */}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchCustomer;
