import React from "react";
import { Table } from "antd";
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
        <div className="border border-[#E7E7E7] rounded-[8px] p-5">
          <input
            className="border border-[#E7E7E7] py-2  rounded-md"
            placeholder="Search|"
            type="search"
          />
          <div className="">
            
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
