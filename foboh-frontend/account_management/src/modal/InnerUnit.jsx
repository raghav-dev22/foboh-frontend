import React, { useRef } from "react";
import { Button, Modal } from "antd";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Select } from "antd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
const InnerUnit = ({ open, onOk, onCancel }) => {
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
              className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-[84px] flex justify-center items-center px-5"
            >
              Upload
            </Button>
          </div>,
        ]}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className="text-sm font-normal text-[#2B4447] leading-[24px] my-6">
            <span className="font-bold">Inner unit of measure</span> defines a
            specific packaging quantity within a product's overall
            configuration, allowing products to be grouped and sold in
            quantities beyond the base unit.
          </p>
          <div className="my-6">
            <h5 className="text-base font-normal text-[#147D73]">
              Added units:
            </h5>
            <div className="mt-4 py-4 flex justify-between items-center border-y border-y-[#E7E7E7]">
              <h5 className="text-base font-bold text-[#637381]">
                750ml bottle{" "}
              </h5>
              <div className="flex items-center justify-end gap-3">
                <div className="border border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center">
                  <EditRoundedIcon style={{ fill: "#147D73" }} />
                </div>
                <div className="border border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center">
                  <DeleteIcon style={{ fill: "#147D73" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-nowrap -mx-3 mb-5 relative">
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Inner unit of measure
              </h5>
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Enter amount"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </div>
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Type
              </h5>
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Select type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </div>
          </div>
          <button type="button" className="text-[#147D73] text-base font-bold">
            Add another
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InnerUnit;
