import { React, useState } from "react";
import { Table, Checkbox } from "antd";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { Menu } from "antd";
import CustomCalender from "../datePicker/CustomCalender";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const menuItems = [
  getItem(
    <div className="flex items-center gap-3">
      <h5 className="text-lg font-medium text-[#637381]">Status</h5>
      <KeyboardArrowDownIcon />
    </div>,
    "sub1",
    null,
    [
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Select all
        </Checkbox>,
        "1"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          New
        </Checkbox>,
        "2"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Pending approval
        </Checkbox>,
        "3"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Updated
        </Checkbox>,
        "4"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Processing
        </Checkbox>,
        "5"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Shipped
        </Checkbox>,
        "6"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Partially fulfilled
        </Checkbox>,
        "7"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Delivered
        </Checkbox>,
        "8"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Completed
        </Checkbox>,
        "9"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Partially fulfilled
        </Checkbox>,
        "10"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Delivered
        </Checkbox>,
        "11"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Completed
        </Checkbox>,
        "12"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Partially fulfilled
        </Checkbox>,
        "13"
      ),
    ]
  ),

  {
    type: "divider",
  },
  getItem(
    <div className="flex items-center gap-3">
      <h5 className="text-lg font-medium text-[#637381]">Region </h5>
      <KeyboardArrowDownIcon />
    </div>,
    "sub4",
    null,
    [
      getItem(
        <div className="relative">
          <SearchIcon
            className="top-[8px] right-[8px] absolute"
            style={{ fill: "rgb(164, 169, 174)" }}
          />
          <input
            className=""
            style={{ border: "1px solid #E7E7E7 ", borderRadius: "8px" }}
          />
        </div>,
        "10"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>,
        "11"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>,
        "12"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>,
        "13"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>,
        "13"
      ),
    ]
  ),
  getItem(
    <div className="flex items-center gap-3">
      <h5 className="text-lg font-medium text-[#637381]">Date</h5>
      <KeyboardArrowDownIcon />
    </div>,
    "sub2",
    null,
    [
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 7 days
        </Checkbox>,
        "5"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 14 days
        </Checkbox>,
        "6"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 30 days
        </Checkbox>,
        "7"
      ),
      getItem(
        <Checkbox className="text-base font-medium text-[#637381]">
          <CustomCalender />
        </Checkbox>,
        "sub3",
        null,
        [getItem(<CustomCalender />, "7")]
      ),
    ]
  ),
];

const AllOrders = () => {
  const items = [
    {
      key: "1",
      type: "group",
      label: (
        <div className="flex justify-between items-center my-2  ">
          <h5 className="text-base font-medium text-[#2B4447]">Order ID</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-1",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              A -Z
            </Checkbox>
          ),
        },
        {
          key: "1-2",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Z - A
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">Date</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-3",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Oldest - Newest
            </Checkbox>
          ),
        },
        {
          key: "1-4",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Newest - Oldest
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "3",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">Last Update</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-5",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Oldest - Newest
            </Checkbox>
          ),
        },
        {
          key: "1-6",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Newest - Oldest
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "4",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">
            Customer Name
          </h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-7",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              A -Z
            </Checkbox>
          ),
        },
        {
          key: "1-8",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Z - A
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "5",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">Order Amount</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-9",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Low - High
            </Checkbox>
          ),
        },
        {
          key: "1-10",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              High - Low
            </Checkbox>
          ),
        },
      ],
    },
  ];
  // const [startDate, setStartDate] = useState(new Date());

  const [showFilter, setShowFilter] = useState(false);

  const [Sort, setSort] = useState(false);
  const columns = [
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>
      ),
      dataIndex: "OrderID",
      width: 100,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Customer</h5>
      ),
      dataIndex: "Customer",
      width: 200,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Region</h5>,
      dataIndex: "Region",
      width: 150,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order Date</h5>
      ),
      dataIndex: "OrderDate",
      width: 120,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Amount</h5>,
      dataIndex: "Amount",
      width: 120,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Status</h5>,
      dataIndex: "Status",
      width: 180,
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      OrderID: <p className="text-[15px] font-medium text-[#637381]">#23456</p>,
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          Lofi Wines xxxxxx
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">Sydney, NSW</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">19/11/2023</p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">$2345.00</p>
      ),
      Status: (
        <div className="bg-[#C9C9C9] rounded-md py-[4px] px-[8px] max-w-max	  ">
          <p className="text-[#637381] text-[base] font-medium">
            Pending approval
          </p>
        </div>
      ),
    });
  }
  return (
    <>
      <div className="py-5">
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
                placeholder="Search|"
                type="search"
              />
              <SearchIcon
                className="absolute top-[8px] right-[8px] "
                style={{ fill: "rgb(164 169 174)" }}
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
                <Dropdown
                  className=""
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <button className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	">
                      <SortOutlinedIcon style={{ fill: "#637381" }} />
                      <p className="text-base font-normal text-[#2B4447]">
                        Sort
                      </p>
                      <KeyboardArrowDownIcon
                        style={{ fill: "#2B4447" }}
                        className=""
                      />
                    </button>
                  </a>
                </Dropdown>
                {/* <button
                  onClick={() => setSort(!Sort)}
                  className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                >
                  <SortOutlinedIcon style={{ fill: "#637381" }} />
                  <p className="text-base font-normal text-[#2B4447]">Sort</p>
                  <KeyboardArrowDownIcon
                    style={{ fill: "#2B4447" }}
                    className=""
                  />
                </button>

                {Sort && (
                  <>
                    <div className=" border border-[#E7E7E7] w-[262px] bg-white rounded-lg shadow-md p-4 z-50  absolute top-[50px] right-0">
                      <div className="flex justify-between items-center pb-2">
                        <h5 className="text-base font-medium text-[#2B4447] ">
                          Alphabetical
                        </h5>

                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>

                      <div className="pb-4 border-b border-[#E7E7E7]">
                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <h5 className="text-base font-medium text-[#2B4447] ">
                          Price
                        </h5>

                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>

                      <div className="pb-4 border-b border-[#E7E7E7]">
                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </div>
          {showFilter && (
            <div className="flex justify-between items-center pt-5">
              <div className="flex justify-start custom-dropdown items-center gap-5 w-[50%]">
                <Menu
                  mode="horizontal"
                  triggerSubMenuAction="click"
                  items={menuItems}
                  activeBarBorderWidth="false"
                />
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
        <div
          className="border border-[#E0E0E0] rounded-[8px] mb-8 bg-white
    "
        >
          <Table
            columns={columns}
            dataSource={data}
            showSizeChanger={false}
            pagination={{
              showSizeChanger: false,
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
