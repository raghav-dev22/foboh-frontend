import React from "react";
import { Table } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Checkbox, Col, Row } from "antd";
const columns = [
  {
    title: "Order ID",
    dataIndex: "OrderID",
    width: 100,
  },
  {
    title: "Order date",
    dataIndex: "OrderDate",
    width: 140,
  },
  {
    title: "Items",
    dataIndex: "Items",
    width: 80,
  },
  {
    title: "Total",
    dataIndex: "Total",
    width: 120,
  },
  {
    title: "Payment",
    dataIndex: "Payment",
    width: 120,
  },
  {
    title: "Status",
    dataIndex: "Status",
    width: 120,
  },
  {
    title: "Action",
    dataIndex: "Action",
    width: 120,
  },
];
const items = [
  {
    label: <Checkbox value="A">Oldest - Newest</Checkbox>,
    key: "0",
  },
  {
    label: <Checkbox value="A">Newest - Oldest</Checkbox>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <Checkbox value="A">Low - High</Checkbox>,
    key: "3",
  },
  {
    label: <Checkbox value="A">High - Low</Checkbox>,
    key: "4",
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    OrderID: `#23456`,
    OrderDate: "19 / 11 / 2023",
    Items: `15`,
    Total: `$2345.00`,
    Payment: `Pending`,
    Status: `Order placed`,
    Action: `jkjk`,
  });
}
const OrderHistory = () => {
  return (
    <>
      <div className=" md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-[#2B4447] ">
            Order History
          </h1>
        </div>
        <div className="border border-[#E7E7E7] rounded-[8px]  p-5">
          <div className="flex justify-between items-center">
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
            <div className="flex justify-between items-center gap-3">
              <div className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	">
                <FilterAltOutlinedIcon style={{ fill: "#637381" }} />
                <p className="text-base font-normal text-[#2B4447]">Filter</p>
              </div>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <button
                  onClick={(e) => e.preventDefault()}
                  className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                >
                  <SortOutlinedIcon style={{ fill: "#637381" }} />
                  <p className="text-base font-normal text-[#2B4447]">Sort</p>
                  <DownOutlined style={{ fill: "#2B4447" }} className="" />
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div
          className="border border-[#E0E0E0] rounded-[8px]
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
export default OrderHistory;
