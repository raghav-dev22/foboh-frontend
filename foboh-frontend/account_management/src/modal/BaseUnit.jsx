import React, { useRef } from "react";
import { Button, Modal } from "antd";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const BaseUnit = ({ open, onOk, onCancel }) => {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#F8FAFC] h-[48px] w-[48px] rounded-full flex justify-center items-center ">
              <CategoryOutlinedIcon style={{ fill: "#147D73" }} />
            </div>
            <h5 className="text-[20px] font-medium text-[#2B4447]">
              Configure unit of measure
            </h5>
          </div>
        }
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className="text-sm font-normal text-[#2B4447] leading-[20px]">
            <span className="font-bold">Base unit of measure</span> is the
            foundational measurement unit that establishes the primary quantity
            for a product, forming the basis for ordering configurations.
          </p>
          <div className="flex flex-wrap -mx-3 mb-5 relative">
            <div className="w-full md:w-1/2 px-3 relative"></div>
            <div className="w-full md:w-1/2 px-3 relative"></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BaseUnit;
