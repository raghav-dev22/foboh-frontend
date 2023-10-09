import React from "react";
import { Table, Collapse, Checkbox, Dropdown, Space, Menu } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { DownOutlined } from "@ant-design/icons";
import NewOrders from "./NewOrders";
import PendingOrders from "./PendingOrders";
import BuyerModification from "./BuyerModification";
const DropdownContent1 = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>
);



const ActionRequired = () => {
  return (
    <>
      <div className="custom-collapse py-5">
        <Space direction="vertical" className="w-full ">
          <Collapse
            expandIcon={({ isActive }) => null}
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
                      <div className="bg-[#147D73] bg-147D73 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center">
                        {" "}
                        <p className="text-white font-medium text-sm">5</p>
                      </div>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                ),
                children: <NewOrders />,
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            expandIcon={({ isActive }) => null}
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
                      <div className="bg-[#3BA2B8] bg-3BA2B8 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center">
                        <p className="text-white font-medium text-sm">5</p>
                      </div>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                ),
                children: <PendingOrders />,
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            expandIcon={({ isActive }) => null}
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
                      <div className="bg-[#F9C107] bg-F9C107 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center">
                        {" "}
                        <p className="text-white font-medium text-sm">5</p>
                      </div>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                ),
                children: <BuyerModification />,
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
