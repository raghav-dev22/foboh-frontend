import { React, useState } from "react";

import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dropdown, Space, DatePicker, Table, Checkbox } from "antd";
import { Menu } from "antd";
import { useEffect } from "react";
import { searchOrders } from "../../helpers/searchOrders";
import Select from "react-select";
import { getCityStates } from "../../helpers/getCityStates";
import { formatDateAfterRelativeDate } from "../../helpers/dateFormatter";
import { formatDate } from "../../helpers/dateFormate";
import { useNavigate } from "react-router-dom";

let filterAndSort = {
  filter: {
    searchByValue: "",
    region: [],
    orderStatus: [],
    orderEntryDate: "",
    orderFilterEndDate: "",
    customeDate: "",
    page: 0,
  },
  sort: {
    sortBy: "",
    sortOrder: "",
  },
};

const statusList = [
  "New",
  "Pending",
  "Changes requested",
  "Updated",
  "Processing",
  "Shipped",
  "Partially fulfilled",
  "Delivered",
  "Complete",
  "Cancelled",
];

const lastDateList = ["Last 7 days", "Last 14 days", "Last 30 days"];

const AllOrders = () => {
  const [sortItem, setSortItem] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [Sort, setSort] = useState(false);
  const [input, setInput] = useState("");
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [lastDate, setLastDate] = useState("");
  const [sortValue, setSortValue] = useState({
    sortBy: "",
    sortOrder: "",
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusCheckAll = statusList.length === selectedStatus.length;

  let stateList = [];

  const sortBtn = () => {
    setSortItem(!sortItem);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowDatePicker(e.target.checked);
  };
  const handleDatePickerChange = (date) => {
    console.log("Selected date:", date);
  };

  console.log(
    orderData,
    "orderData----------------------------------------------------->"
  );
  const [statusMenu, setStatusMenu] = useState(false);
  const [regionMenu, setRegionMenu] = useState(false);
  const [dateMenu, setDateMenu] = useState(false);
  const statusMenuBtn = () => {
    setStatusMenu(!statusMenu);
    setRegionMenu(false);
    setDateMenu(false);
  };
  const regionMenuBtn = () => {
    setRegionMenu(!regionMenu);
    setStatusMenu(false);

    setDateMenu(false);
  };
  const dateBtn = () => {
    setDateMenu(!dateMenu);
    setStatusMenu(false);
    setRegionMenu(false);
  };

  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const handleOpenStatus = (flag) => {
    setOpenStatus(flag);
  };
  const handleOpenDate = (flag) => {
    setOpenDate(flag);
  };
  const handleOpenRegion = (flag) => {
    setOpenRegion(flag);
  };

  // const [startDate, setStartDate] = useState(new Date());

  const columns = [
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Order ID</h5>,
      dataIndex: "OrderID",
      width: 130,
    },
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Customer</h5>,
      dataIndex: "Customer",
      width: 160,
    },
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Region</h5>,
      dataIndex: "Region",
      width: 150,
    },
    {
      title: (
        <h5 className="text-base font-medium text-[#2B4447]">Order Date</h5>
      ),
      dataIndex: "OrderDate",
      width: 120,
    },
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Amount</h5>,
      dataIndex: "Amount",
      width: 120,
    },
    {
      title: (
        <h5 className="text-base font-medium text-[#2B4447]">Last Updated</h5>
      ),
      dataIndex: "LastUpdated",
      width: 130,
    },
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Payment</h5>,
      dataIndex: "Payment",
      width: 120,
    },
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Status</h5>,
      dataIndex: "Status",
      width: 180,
    },
  ];

  console.log("orderData", orderData);
  const data = orderData?.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p
          onClick={() => navigate(`/dashboard/order-details/${item?.orderId}`)}
          className="text-sm md:text-base font-normal text-[#637381] cursor-pointer"
        >
          {item.orderId}
        </p>
      ),
      Customer: (
        <p
          onClick={() => navigate(`/dashboard/order-details/${item?.orderId}`)}
          className="text-sm md:text-base font-normal text-[#637381] cursor-pointer"
        >
          {item?.customerName}
        </p>
      ),
      Region: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item?.region}
        </p>
      ),
      OrderDate: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {formatDate(item?.orderEntryDate)}
        </p>
      ),
      Amount: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          ${item?.payAmountLong}
        </p>
      ),
      LastUpdated: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {formatDate(item?.modifiedDate)}
        </p>
      ),
      Payment: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item?.transactionStatus}
        </p>
      ),
      Status: (
        <div
          className={`
         
            rounded-md py-[4px] px-[8px] w-[166px]	 flex justify-center items-center  `}
          style={{
            backgroundColor: (() => {
              if (
                item?.orderStatus === "Complete" ||
                item?.orderStatus === "Delivered"
              ) {
                return "#CFEBE6";
              } else if (item?.orderStatus === "Pending") {
                return "#C9C9C9";
              } else if (item?.orderStatus === "Updated") {
                return "#D5EEFF";
              } else if (item?.orderStatus === "Cancelled") {
                return "#FFDFDB";
              }
              // Default background color if none of the conditions match
              return "transparent";
            })(),
          }}
        >
          <p className="text-[#637381] text-[base] font-medium">
            {item?.orderStatus}
          </p>
        </div>
      ),
    };
  });

  const onShowSizeChange = (current, pageSize) => {
    console.log("page", current, pageSize);
    setPage(current.current);
  };

  useEffect(() => {
    getStateList();
  }, []);

  const getStateList = () => {
    getCityStates().then((data) => {
      stateList = data.map((state) => {
        return {
          label: `${state?.cityName}, ${state?.stateName}`,
          value: state?.cityName,
        };
      });
      setStates(stateList);
    });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      processChange();
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  function debounce(func, timeout = input ? 0 : 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const saveInput = async () => {
    const ordersData = await searchOrders(filterAndSort);
    console.log("ordersData", ordersData);
    if (ordersData.success) {
      setOrderData(ordersData?.data);
      setTotalData(ordersData?.total);
    } else {
      setOrderData([]);
      setTotalData(0);
    }
  };

  const processChange = debounce(() => saveInput());

  const handleSearch = (e) => {
    const search = e.target.value;
    const newFilter = {
      ...filterAndSort.filter,
      searchByValue: search,
    };

    filterAndSort = {
      ...filterAndSort,
      filter: newFilter,
    };
    setInput(search);
  };

  const handleCheckAll = (e, name) => {
    const checked = e.target.checked;

    if (name === "status") {
      const newFilter = {
        ...filterAndSort.filter,
        orderStatus: checked ? statusList : [],
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
      setSelectedStatus(checked ? statusList : []);
    }

    processChange("filterAndSort");
  };

  const handleFilter = (value, name) => {
    console.log(value, name, "value============>");
    if (name === "status") {
      setSelectedStatus(value);
      const newFilter = {
        ...filterAndSort.filter,
        orderStatus: value,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
    } else if (name === "region") {
      const regions = value.map((state) => state.value);
      setRegions(value);

      const newFilter = {
        ...filterAndSort.filter,
        region: regions,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
    } else if (name === "lastDate") {
      const date = value.target.value;
      const checked = value.target.checked;
      setLastDate(checked ? date : "");

      const formattedData = formatDateAfterRelativeDate(date);

      const newFilter = {
        ...filterAndSort.filter,
        orderEntryDate: checked ? formattedData : "",
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
    } else if (name === "customDate") {
      const formatedDate = value
        ? `${value.$y}-${value.$M + 1}-${value.$D}`
        : "";

      const newFilter = {
        ...filterAndSort.filter,
        customeDate: formatedDate,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
    }
    processChange("filterAndSort");
    console.log("filterAndSort", filterAndSort);
  };

  const handleSort = (name, value) => {
    const newSort = {
      ...filterAndSort.sort,
      sortBy: name,
      sortOrder: value,
    };

    setSortValue(newSort);

    filterAndSort = {
      ...filterAndSort,
      sort: newSort,
    };

    processChange("filterAndSort");
  };
  const { RangePicker } = DatePicker;
  return (
    <>
      <div className="pt-5">
        <div className="mb-6">
          <h1 className="text-[24px] font-semibold text-[#212B36] leading-[30px] mb-2">
            All Orders
          </h1>
          <p className="text-sm font-medium  text-[#637381] leading-[20px]">
            View all your orders here starting with the most recent ones
          </p>
        </div>
        <div className="border border-[#E7E7E7] rounded-[8px]   mb-6  p-5 bg-white">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-3 justify-between items-center ">
            <div className="relative max-w-max	">
              <input
                className="border border-[#E7E7E7] py-2  rounded-md px-2"
                placeholder="Search"
                type="text"
                onChange={handleSearch}
              />
              <SearchIcon
                className="absolute right-[8px] "
                style={{ fill: "rgb(164 169 174)", top: "20px" }}
              />
            </div>
            <div className="flex justify-end items-center gap-3 ">
              <button
                className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                onClick={() => {
                  setShowFilter(true);
                }}
              >
                <FilterAltOutlinedIcon style={{ fill: "#637381" }} />
                <p className="text-base font-normal text-[#2B4447]">Filter</p>
              </button>
              <div className="relative">
                <button
                  onClick={sortBtn}
                  className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                >
                  <SortOutlinedIcon style={{ fill: "#637381" }} />
                  <p className="text-base font-normal text-[#2B4447]">Sort</p>
                  <KeyboardArrowDownIcon
                    style={{ fill: "#2B4447" }}
                    className=""
                  />
                </button>
                {sortItem && (
                  <div className=" z-10 left-[-20px] top-[110%] px-3 min-h-fit max-h-[180px]  w-max   absolute  bg-white custom-shadow rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                    <ul className="dropdown-content ">
                      <li className="py-1">
                        <div className="flex justify-between items-center  my-2">
                          <h5 className="text-base font-medium text-[#2B4447]">
                            Date
                          </h5>
                          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                        </div>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="checkbox-Oldest-Newest"
                          value={"asc"}
                          checked={
                            sortValue.sortBy === "date" &&
                            sortValue.sortOrder === "asc"
                          }
                          onChange={(e) => handleSort("date", e.target.value)}
                          type="checkbox"
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-Oldest-Newest"
                          className="text-base font-normal text-[#637381]"
                        >
                          Oldest - Newest
                        </label>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="checkbox-Newest-Oldest"
                          type="checkbox"
                          value={"desc"}
                          checked={
                            sortValue.sortBy === "date" &&
                            sortValue.sortOrder === "desc"
                          }
                          onChange={(e) => handleSort("date", e.target.value)}
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-Newest-Oldest"
                          className="text-base font-normal text-[#637381]"
                        >
                          Newest - Oldest
                        </label>
                      </li>
                      <li className="py-1">
                        <div className="flex justify-between items-center  my-2">
                          <h5 className="text-base font-medium text-[#2B4447]">
                            Last Update
                          </h5>
                          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                        </div>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          value={"asc"}
                          id="default-Oldest-Newest"
                          type="checkbox"
                          checked={
                            sortValue.sortBy === "modifieddate" &&
                            sortValue.sortOrder === "asc"
                          }
                          onChange={(e) =>
                            handleSort("modifieddate", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-Oldest-Newest"
                          className="text-base font-normal text-[#637381]"
                        >
                          Oldest - Newest
                        </label>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="default-Newest-Oldest"
                          type="checkbox"
                          value={"desc"}
                          checked={
                            sortValue.sortBy === "modifieddate" &&
                            sortValue.sortOrder === "desc"
                          }
                          onChange={(e) =>
                            handleSort("modifieddate", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-Newest-Oldest"
                          className="text-base font-normal text-[#637381]"
                        >
                          Newest - Oldest
                        </label>
                      </li>
                      <li className="py-1">
                        <div className="flex justify-between items-center my-2  ">
                          <h5 className="text-base font-medium text-[#2B4447]">
                            Customer Name
                          </h5>
                          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                        </div>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="checkbox-A-Z"
                          type="checkbox"
                          value={"asc"}
                          checked={
                            sortValue.sortBy === "customername" &&
                            sortValue.sortOrder === "asc"
                          }
                          onChange={(e) =>
                            handleSort("customername", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-A-Z"
                          className="text-base font-normal text-[#637381]"
                        >
                          A - Z
                        </label>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="checkbox-Z-A"
                          type="checkbox"
                          checked={
                            sortValue.sortBy === "customername" &&
                            sortValue.sortOrder === "desc"
                          }
                          value={"desc"}
                          onChange={(e) =>
                            handleSort("customername", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-Z-A"
                          className="text-base font-normal text-[#637381]"
                        >
                          Z - A
                        </label>
                      </li>
                      <li className="py-1">
                        <div className="flex justify-between items-center my-2  ">
                          <h5 className="text-base font-medium text-[#2B4447]">
                            Order Amount
                          </h5>
                          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                        </div>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="Order-A-Z"
                          type="checkbox"
                          value={"asc"}
                          checked={
                            sortValue.sortBy === "paymentpmount" &&
                            sortValue.sortOrder === "asc"
                          }
                          onChange={(e) =>
                            handleSort("paymentpmount", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="Order-A-Z"
                          className="text-base font-normal text-[#637381]"
                        >
                          Low - High
                        </label>
                      </li>
                      <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                        <input
                          id="Order-Z-A"
                          type="checkbox"
                          checked={
                            sortValue.sortBy === "paymentpmount" &&
                            sortValue.sortOrder === "desc"
                          }
                          value={"desc"}
                          onChange={(e) =>
                            handleSort("paymentpmount", e.target.value)
                          }
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="Order-Z-A"
                          className="text-base font-normal text-[#637381]"
                        >
                          High - Low
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showFilter && (
            <div className="flex justify-between items-center pt-5">
              <div className="flex justify-center items-center gap-5">
                <div className="relative">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={statusMenuBtn}
                  >
                    <h5 className="text-lg font-medium text-[#637381]">
                      Status
                    </h5>
                    <KeyboardArrowDownIcon />
                  </div>
                  {statusMenu && (
                    <>
                      <div className=" z-10 left-0 px-3 h-[200px] custom-product-dropdown  w-max   absolute product-dropdown bg-white shadow-md rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                        <ul className="dropdown-content ">
                          <li className="py-1">
                            <Checkbox
                              checked={statusCheckAll}
                              onChange={(e) => handleCheckAll(e, "status")}
                              className="text-base font-medium text-[#637381]"
                            >
                              Select all
                            </Checkbox>
                          </li>
                          <li className="py-1">
                            <Checkbox.Group
                              onChange={(value) =>
                                handleFilter(value, "status")
                              }
                              options={statusList}
                              value={selectedStatus}
                              className="text-base grid font-medium text-[#637381]"
                            />
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={regionMenuBtn}
                  >
                    <h5 className="text-lg font-medium text-[#637381]">
                      Region
                    </h5>
                    <KeyboardArrowDownIcon />
                  </div>

                  {regionMenu && (
                    <div
                      style={{ width: "350px", height: "380px" }}
                      className="z-10 left-0 px-3 absolute product-dropdown bg-white shadow-md rounded-lg overflow-y-auto custom-scroll-bar py-3"
                    >
                      <Select
                        name="colors"
                        isMulti={true}
                        isDisabled={!states.length}
                        menuIsOpen={true}
                        options={states}
                        value={regions}
                        onChange={(value) => handleFilter(value, "region")}
                        className="basic-multi-select "
                        classNamePrefix="select"
                      />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={dateBtn}
                  >
                    <h5 className="text-lg font-medium text-[#637381]">Date</h5>
                    <KeyboardArrowDownIcon />
                  </div>

                  {dateMenu && (
                    <div className=" z-10 left-0 px-3 max-h-[200px] min-h-fit  w-max   absolute product-dropdown bg-white shadow-md rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                      <ul className="dropdown-content ">
                        {lastDateList.map((date) => (
                          <li className="py-1 green-checkbox flex gap-1">
                            <input
                              onChange={(e) => handleFilter(e, "lastDate")}
                              value={date}
                              checked={date === lastDate}
                              id={date}
                              type="checkbox"
                            />
                            <label
                              htmlFor={date}
                              className="text-base font-medium text-[#637381]"
                            >
                              {date}
                            </label>
                          </li>
                        ))}
                        <li className="py-1">
                          <div className="relative custom-datePicker h-[40px]">
                            {showDatePicker ? (
                              <RangePicker
                                // renderExtraFooter={() => (
                                //   <div className="flex justify-center items-center gap-2 ">
                                //     <div className="bg-[#2B4447] py-2.5 w-full flex justify-center items-center rounded-[4px] font-semibold text-white text-sm">
                                //       Remove
                                //     </div>
                                //     <div className="bg-[#147D73] py-2.5 w-full flex justify-center items-center rounded-[4px] font-semibold text-white text-sm">
                                //       Done
                                //     </div>
                                //   </div>
                                // )}
                                onChange={(value) =>
                                  handleFilter(value, "customDate")
                                }
                              />
                            ) : (
                              <div className=" absolute top-0 left-0 w-full h-full">
                                <div className="flex gap-1  green-checkbox ">
                                  <input
                                    id="datePicker"
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    checked={showDatePicker}
                                  ></input>
                                  <label
                                    htmlFor="datePicker"
                                    className="text-base font-medium text-[#637381]"
                                  >
                                    Custom
                                  </label>
                                </div>
                              </div>
                            )}
                            {/* <DatePicker onChange={onChange} /> */}
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowFilter(false);
                }}
              >
                <h5 className="font-medium text-base text-[#DC3545] border-b border-b-[#DC3545]">
                  Clear Filters
                </h5>
              </div>
            </div>
          )}
        </div>
        <div className="border border-[#E0E0E0] rounded-[8px]  bg-white custom-table-pagination">
          <Table
            columns={columns}
            dataSource={data}
            showSizeChanger={false}
            onChange={onShowSizeChange}
            pagination={{
              current: page,
              pageSize: 15,
              total: totalData,
              showSizeChanger: false,
              showQuickJumper: false,
            }}
            scroll={{
              y: 240,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AllOrders;
