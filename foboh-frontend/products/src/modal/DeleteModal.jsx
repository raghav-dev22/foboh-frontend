import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Select } from "antd";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
const DeleteModal = ({ open, onOk, onCancel }) => {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#FED4C7] border-[#FFE9E3] border-[4px] h-[48px] w-[48px] rounded-full flex justify-center items-center ">
              <ReportProblemOutlinedIcon style={{ fill: "#DC3545" }} />
            </div>
            <h5 className="text-[20px] font-medium text-[#2B4447]">
              Delete product
            </h5>
          </div>
        }
        footer={[
          <div className="flex justify-end items-center">
            <Button
              key="cancel"
              onClick={onCancel}
              className="border border-[#D0D5DD] text-[#344054] text-base font-medium rounded-[8px]  h-[44px] w-[84px]  flex justify-center items-center px-5"
            >
              Cancel
            </Button>

            <Button
              key="ok"
              type="primary"
              onClick={onCancel}
              className="bg-[#DC3545] text-white text-base font-medium rounded-[8px]  h-[44px] w-[84px] flex justify-center items-center px-5"
            >
              Delete
            </Button>
          </div>,
        ]}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className=" font-bold text-sm  text-[#2B4447] leading-[24px] my-6">
            Are you sure you want to delete this product?{" "}
          </p>
          <p className=" font-normal text-sm  text-[#2B4447] leading-[24px] mt-6">
            This change cannot be undone, this product and all of its pricing
            will be removed.{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
