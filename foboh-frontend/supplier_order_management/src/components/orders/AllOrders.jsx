import { React, useState } from "react";
import { Table, Checkbox } from "antd";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { DatePicker } from "antd";

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import "react-datepicker/dist/react-datepicker.css";

import { Menu } from "antd";

import { useEffect } from "react";

const AllOrders = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [openStatus, setOpenStatus] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const statusMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox className="text-base font-medium text-[#637381]">
          Select all
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox className="text-base font-medium text-[#637381]">
          New
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox className="text-base font-medium text-[#637381]">
          Pending approval
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        <Checkbox className="text-base font-medium text-[#637381]">
          Changes requested
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="5">
        <Checkbox className="text-base font-medium text-[#637381]">
          Updated
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="6">
        <Checkbox className="text-base font-medium text-[#637381]">
          Processing
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="7">
        <Checkbox className="text-base font-medium text-[#637381]">
          Shipped
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="8 ">
        <Checkbox className="text-base font-medium text-[#637381]">
          Partially fulfilled
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="9 ">
        <Checkbox className="text-base font-medium text-[#637381]">
          Delivered
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="10 ">
        <Checkbox className="text-base font-medium text-[#637381]">
          Completed
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="11 ">
        <Checkbox className="text-base font-medium text-[#637381]">
          Cancelled
        </Checkbox>
      </Menu.Item>
    </Menu>
  );
  const regionMenu = (
    <Menu>
      <Menu.Item key="1">
        <div className="relative">
          <SearchIcon
            className="top-[8px] right-[8px] absolute"
            style={{ fill: "rgb(164, 169, 174)" }}
          />
          <input
            className=""
            style={{ border: "1px solid #E7E7E7 ", borderRadius: "8px" }}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="5">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="6">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="7">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="8">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="9">
        {" "}
        <Checkbox className="text-base font-medium text-[#637381]">
          City, State
        </Checkbox>
      </Menu.Item>
    </Menu>
  );
  const dateMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 7 days
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 14 days
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox className="text-base font-medium text-[#637381]">
          Last 30 days
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        <div className="relative custom-datePicker">
          <div className=" absolute top-0 left-0 w-full h-full">
            <Checkbox className="text-base font-medium text-[#637381]">
              Custom
            </Checkbox>
          </div>
          <DatePicker onChange={onChange} />
        </div>
      </Menu.Item>
    </Menu>
  );
  const handleOpenStatus = (flag) => {
    setOpenStatus(flag);
  };
  const handleOpenDate = (flag) => {
    setOpenDate(flag);
  };
  const handleOpenRegion = (flag) => {
    setOpenRegion(flag);
  };
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
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [Sort, setSort] = useState(false);

  const columns = [
    {
      title: <h5 className="text-base font-medium text-[#2B4447]">Order ID</h5>,
      dataIndex: "OrderID",
      width: 100,
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
      width: 180,
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

  const data = orderData.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item.orderId}
        </p>
      ),
      Customer: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item.firstname}
        </p>
      ),
      Region: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item.region}
        </p>
      ),
      OrderDate: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item.orderEntryDate}
        </p>
      ),
      Amount: (
        <p className="text-sm md:text-base font-normal text-[#637381]">
          {item.totalPrice}
        </p>
      ),
      Status: (
        <div className="bg-[#C9C9C9] rounded-md py-[4px] px-[8px] w-[166px]	  ">
          <p className="text-[#637381] text-[base] font-medium">
            {item.orderStatus}
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
    fetch(
      `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/OMSupplier/getAll?page=${page}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("getAllssssssssssss -->", data.data);
        setOrderData(data.data);
        setTotalData(data.total);
      })
      .catch((error) => console.log(error));
  }, []);
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
                placeholder="Search"
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
                  trigger={["click"]}
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
              </div>
            </div>
          </div>
          {showFilter && (
            <div className="flex justify-between items-center pt-5">
              <div className="flex justify-start custom-dropdown items-center gap-5 w-[50%]">
                <div className="flex justify-center items-center gap-5">
                  <Dropdown
                    overlay={statusMenu}
                    open={openStatus}
                    onOpenChange={handleOpenStatus}
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-3">
                        <h5 className="text-lg font-medium text-[#637381]">
                          Status
                        </h5>

                        <KeyboardArrowDownIcon />
                      </div>
                    </a>
                  </Dropdown>
                  <Dropdown
                    overlay={regionMenu}
                    open={openRegion}
                    onOpenChange={handleOpenRegion}
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-3">
                        <h5 className="text-lg font-medium text-[#637381]">
                          Region
                        </h5>

                        <KeyboardArrowDownIcon />
                      </div>
                    </a>
                  </Dropdown>
                  <Dropdown
                    overlay={dateMenu}
                    open={openDate}
                    onOpenChange={handleOpenDate}
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-3">
                        <h5 className="text-lg font-medium text-[#637381]">
                          Date
                        </h5>

                        <KeyboardArrowDownIcon />
                      </div>
                    </a>
                  </Dropdown>
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
        <div
          className="border border-[#E0E0E0] rounded-[8px] mb-8 bg-white custom-table-pagination
    "
        >
          <Table
            columns={columns}
            dataSource={data}
            showSizeChanger={false}
            onChange={onShowSizeChange}
            pagination={{
              current: page,
              pageSize: 9,
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
