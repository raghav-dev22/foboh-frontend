import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Select } from "antd";
import { fomatDateAndTime } from "../../helpers/formatDateAndTime";
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const OrderDetailHeader = ({ orderAdressDetails }) => {
  return (
    <>
      <div className="flex justify-between mb-5 py-4">
        <div className=" flex justify-start items-start gap-5">
          <div className="border border-[#EDEFF1] bg-white rounded-[6px] p-2">
            <ChevronLeftIcon />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold text-[#212B36]">
              Orders {orderAdressDetails?.orderId}
            </h4>
            <h5 className="font-medium text-base text-[#212B36]">
              {orderAdressDetails?.customerName}
            </h5>
            {/* <h5 className="font-medium text-base text-[#212B36]">
              Business address
            </h5> */}
          </div>
          <h5 className="text-base font-medium text-[#637381] ">
            {fomatDateAndTime(orderAdressDetails?.orderEntryDate)}
          </h5>
          <Select
            labelInValue
            className="Authorised-selector"
            defaultValue={{
              value: "lucy",
              label: (
                <h5 className=" text-[#637381] font-medium text-base ">
                  Authorised
                </h5>
              ),
            }}
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: (
                  <div className="flex justify-center items-center gap-2">
                    <input type="checkbox" />
                    <h5 className="text-base font-medium text-[#147D73] ">
                      Mark as paid
                    </h5>
                  </div>
                ),
              },
            ]}
          />
        </div>
        <button className="h-fit bg-[#147D73] rounded-[6px] text-white text-base font-semibold py-2 px-4">
          New
        </button>
      </div>
    </>
  );
};

export default OrderDetailHeader;
