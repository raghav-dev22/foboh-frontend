import React, { useState } from "react";

import ControlPointIcon from "@mui/icons-material/ControlPoint";

import ActionRequired from "./ActionRequired";
import TotalOrders from "./TotalOrders";
import AllOrders from "./AllOrders";
import CreateOrderHeader from "../createOrderHeader/CreateOrderHeader";
const SupplierOrderManagement = () => {
  return (
    <>
      <div className="py-5 px-7">
        <CreateOrderHeader />
        <TotalOrders />
        <div className="py-5">
          <h5 className=" mb-2 text-[#212B36] font-semibold text-[24px] leading-[30px]">
            Action required
          </h5>
          <p className="text-sm font-medium text-[#637381] leading-[20px]">
            Review and confirming new and pending orders
          </p>
        </div>
        <ActionRequired />
        <AllOrders />
      </div>
    </>
  );
};

export default SupplierOrderManagement;
