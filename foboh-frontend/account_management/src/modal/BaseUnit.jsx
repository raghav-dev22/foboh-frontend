import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Select } from "antd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { postBaseUnitMeasure } from "../helpers/postBaseUnitMeasure";
import { message } from "antd";

const BaseUnit = ({
  baseUnitMeasureTypeList,
  baseUnitMeasureUnitList,
  open,
  onOk,
  onCancel,
}) => {
  const [unit, setUnit] = useState([]);
  const cancelButtonRef = useRef(null);
  const [selectedBaseUnit, setSelectedBaseUnit] = useState(null);
  const [selectedBaseType, setSelectedBaseType] = useState(null);
  const [amount, setAmount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSelectUnit = (value) => {
    setSelectedBaseUnit(value);
  };
  const handleSelectType = (value) => {
    setSelectedBaseType(value);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Base unit measure added successfully!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Some error has occurred, please try again!",
    });
  };

  const addBtn = () => {
    setUnit((prev) => [
      ...prev,
      {
        type: selectedBaseType,
        amount: amount,
        bumUnit: selectedBaseUnit,
        editable: false,
      },
    ]);
  };

  const handleDelete = (idx) => {
    setUnit(unit.filter((item, itemIndex) => itemIndex !== idx));
  };

  const handleIsEdit = (idx) => {
    setUnit((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex === idx) {
          return {
            ...item,
            editable: true,
          };
        }
        return item;
      })
    );
  };

  const handleEdit = (idx, name, value) => {
    setUnit((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex === idx && name === "amount") {
          return {
            ...item,
            amount: value,
          };
        } else if (itemIndex === idx && name === "baseUnitMeasureUnit") {
          return {
            ...item,
            bumUnit: value,
          };
        } else if (itemIndex === idx && name === "baseUnitMeasureTypeList") {
          return {
            ...item,
            type: value,
          };
        }
        return item;
      })
    );
  };

  const handleSaveEdit = (idx) => {
    setUnit((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex === idx) {
          return {
            ...item,
            editable: false,
          };
        }
        return item;
      })
    );
  };

  const handleUpload = async () => {
    const response = await postBaseUnitMeasure(unit);
    response ? success() : error();
    onCancel();
  };

  return (
    <>
      {contextHolder}
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
              onClick={handleUpload}
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
            <span className="font-bold">Base unit of measure</span> is the
            foundational measurement unit that establishes the primary quantity
            for a product, forming the basis for ordering configurations.
          </p>
          {unit && (
            <div className="my-6">
              {unit.length > 0 && (
                <h5 className="text-base font-normal text-[#147D73]">
                  Added units:
                </h5>
              )}
              {unit?.map((item, idx) => (
                <div className="mt-4 py-4 flex justify-between items-center border-y border-y-[#E7E7E7]">
                  {item.editable ? (
                    <div className="flex flex-nowrap -mx-3 mb-5 relative">
                      <div className="w-full  px-3 relative">
                        <h5 className="text-base font-medium text-[#2B4447] mb-2">
                          Base unit of measure
                        </h5>
                        <div className="flex items-center justify-center">
                          <input
                            style={{ width: "150px", height: "32px" }}
                            placeholder="Enter amount"
                            type="text"
                            onChange={(e) =>
                              handleEdit(idx, "amount", e.target.value)
                            }
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <Select
                            showSearch
                            style={{
                              width: "50px",
                            }}
                            placeholder="Enter amount"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={baseUnitMeasureUnitList}
                            onChange={(value) =>
                              handleEdit(idx, "baseUnitMeasureUnit", value)
                            }
                          />
                        </div>
                      </div>
                      <div className="w-full  px-3 relative">
                        <h5 className="text-base font-medium text-[#2B4447] mb-2">
                          Type
                        </h5>
                        <div className="flex items-center">
                          <Select
                            showSearch
                            onChange={(value) =>
                              handleEdit(idx, "baseUnitMeasureTypeList", value)
                            }
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={baseUnitMeasureTypeList}
                          />
                        </div>
                      </div>
                      <div
                        onClick={() => handleSaveEdit(idx)}
                        className="ml-[16px]"
                      >
                        <CheckCircleOutlineIcon
                          style={{ fill: "#147D73", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="text-base font-bold text-[#637381]">
                        {`${item?.amount} ${item?.bumUnit}`} {item?.type}
                      </h5>
                      <div className="flex items-center justify-end gap-3">
                        <div
                          onClick={() => handleIsEdit(idx)}
                          className="border border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center"
                        >
                          <EditRoundedIcon style={{ fill: "#147D73" }} />
                        </div>
                        <div
                          onClick={() => handleDelete(idx)}
                          className="border cursor-pointer border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center"
                        >
                          <DeleteIcon style={{ fill: "#147D73" }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-nowrap -mx-3 mb-5 relative">
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Base unit of measure
              </h5>
              <div className="flex items-center justify-center">
                <input
                  style={{ width: "150px", height: "32px" }}
                  placeholder="Enter amount"
                  type="text"
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyPress={(event) => {
                    const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                    if (!allowedCharacters.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <Select
                  showSearch
                  style={{
                    width: "50px",
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
                  options={baseUnitMeasureUnitList}
                  onChange={handleSelectUnit}
                />
              </div>
            </div>
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Type
              </h5>
              <div className="flex items-center">
                <Select
                  showSearch
                  onChange={handleSelectType}
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
                  options={baseUnitMeasureTypeList}
                />
                <AddCircleOutlineIcon
                  className=""
                  style={{
                    fill: "#147D73",
                    cursor: "pointer",
                    marginLeft: "16px",
                  }}
                  onClick={addBtn}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BaseUnit;
