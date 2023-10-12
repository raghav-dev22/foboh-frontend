import { React, useState } from "react";
import { Table, Collapse, Checkbox } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu, Button } from "antd";
window.ResizeObserver = undefined;
const { SubMenu } = Menu;
const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
    <SubMenu key="subMenu" title="Submenu">
      <Menu.Item key="3">Submenu Item 1</Menu.Item>
      <Menu.Item key="4">Submenu Item 2</Menu.Item>
    </SubMenu>
  </Menu>
);
const ActionRequired = () => {
  const [page, setPage] = useState(1);
  const [newTotalData, setNewTotalData] = useState();
  const [newTotalPendding, setNewTotalPendding] = useState();
  const [newTotalModification, setNewTotalModification] = useState();
  const [orderNewOrder, setOrderNewOrder] = useState([]);
  const [modification, setModification] = useState([]);
  const [pendding, setpendding] = useState([]);
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

  const newColumns = [
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
      width: 160,
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
      width: 150,
    },
  ];
  const newOrder = orderNewOrder.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p className="text-[15px] font-medium text-[#637381]">{item.orderId}</p>
      ),
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          Lofi Wines xxxxxx
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.orderEntryDate}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.totalPrice}
        </p>
      ),
      Status: (
        <div className="bg-[#D5EEFF]  rounded-md py-[4px] px-[8px] w-[150px]  ">
          <p className="text-[#3498DB] text-[base] font-medium text-center">
            {item.orderStatus}
          </p>
        </div>
      ),
    };
  });

  const pandingColumns = [
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
      width: 160,
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
  const penddingData = pendding.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p className="text-[15px] font-medium text-[#637381]">{item.orderId}</p>
      ),
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          Lofi Wines xxxxxx
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.orderEntryDate}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.totalPrice}
        </p>
      ),
      Status: (
        <div className="bg-[#C9C9C9] rounded-md py-[4px] px-[8px] w-[166px]	  ">
          <p className="text-[#637381] text-[base] font-medium text-center">
            {item.orderStatus}
          </p>
        </div>
      ),
    };
  });

  const buyerColumns = [
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
      width: 160,
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
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Payment</h5>
      ),
      dataIndex: "Payment",
      width: 120,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Status</h5>,
      dataIndex: "Status",
      width: 200,
    },
  ];

  const modificationData = modification.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p className="text-[15px] font-medium text-[#637381]">{item.orderId}</p>
      ),
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.firstname}
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.Region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.orderEntryDate}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.totalPrice}
        </p>
      ),
      Status: (
        <p className="text-[#637381] text-[base] font-medium">
          {item.orderStatus}
        </p>
      ),
    };
  });

  const onShowSizeChange = (current, pageSize) => {
    console.log("page", current, pageSize);
    setPage(current.current);
  };

  useEffect(() => {
    fetch(
      `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/OMSupplier/getNew?page=${page}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("neworders -->", data.data);
        setOrderNewOrder(data.data);
        setNewTotalData(data.total);
      })
      .catch((error) => console.log(error));

    fetch(
      `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/OMSupplier/getPending?page=${page}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("pendding -->", data.data);
        setpendding(data.data);
        setNewTotalPendding(data.total);
      })
      .catch((error) => console.log(error));

    fetch(
      `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/OMSupplier/getBuyerModification?page=${page}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("modification -->", data.data);
        setModification(data.data);
        setNewTotalModification(data.total);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="custom-collapse py-5">
        <Space direction="vertical" className="w-full ">
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full "
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-[#637381] text-637381">
                      New Orders
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#147D73] bg-147D73 w-[31px] mr-2 h-[28px] rounded-[35px] flex justify-center items-center">
                        {" "}
                        <p className="text-white font-medium text-sm">
                          {newTotalData}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end">
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
                    <div className="custom-table-pagination">
                      <Table
                        columns={newColumns}
                        dataSource={newOrder}
                        showSizeChanger={false}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 9,
                          total: newTotalData,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full "
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-[#637381] text-637381">
                      Pending Orders
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#3BA2B8] bg-3BA2B8 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center mr-2">
                        {" "}
                        <p className="text-white font-medium text-sm">
                          {newTotalPendding}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end">
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
                    <div className="custom-table-pagination">
                      <Table
                        columns={pandingColumns}
                        dataSource={penddingData}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 9,
                          total: newTotalPendding,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full "
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-637381 text-[#637381]">
                      Buyer Modification
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#F9C107] mr-2 bg-F9C107 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center">
                        <p className="text-white font-medium text-sm">
                          {newTotalModification}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end">
                      <div className="cursor-pointer flex justify-center items-center gap-2	border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max ">
                        <SortOutlinedIcon style={{ fill: "#637381" }} />
                        <Dropdown overlay={menu}>
                          <p className="text-base font-normal text-[#2B4447] ">
                            Sort
                          </p>
                        </Dropdown>
                        <KeyboardArrowDownIcon
                          style={{ fill: "#2B4447" }}
                          className=""
                        />
                      </div>
                    </div>
                    <div className="custom-table-pagination">
                      <Table
                        columns={buyerColumns}
                        dataSource={modificationData}
                        showSizeChanger={false}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 9,
                          total: newTotalModification,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
        </Space>
      </div>
    </>
  );
};

export default ActionRequired;
