import React, { useState } from "react";
import CustomCalender from "./CustomCalender";
import Filter from "./CustomFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Dropdown, Space, DatePicker, Table, Checkbox } from "antd";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function ActiveOrder() {
  const { RangePicker } = DatePicker;
  const [selectedDates, setSelectedDates] = useState([]);

  const onChange = (dates) => {
    setSelectedDates(dates);
  };
  const handleCustomClear = () => {
    setSelectedDates([]);
    setShow("false"); // Clear the selected dates when the custom close button is clicked
  };
  const [show, setShow] = useState("false");
  return (
    <div>
      <div className="border rounded-md border-inherit bg-white h-full py-3	 px-6 md:flex justify-between items-center ">
        <div>
          <h4 className="md:text-2xl text-base	font-medium		md:font-semibold	">
            Active orders
          </h4>
        </div>
        {show === "true" ? (
          <div className="relative w-[40%]">
            <RangePicker
              className="w-full h-[42px] px-[40px]"
              onChange={onChange}
              suffixIcon={null}
            />
            <div className="custom-icons">
              <CalendarTodayRoundedIcon
                className="calendar-icon absolute top-[21%] left-[12px]  "
                style={{ fill: "#d9d9d9", width: "18px" }}
              />
              <CloseRoundedIcon
                onClick={handleCustomClear}
                className="clear-icon absolute top-[21%] right-[12px]  "
                style={{
                  fill: "#d9d9d9",
                  width: "18px",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setShow("true");
            }}
            className="flex justify-center items-center gap-2 px-3 py-2 border border-[#E7E7E7] cursor-pointer rounded-md"
          >
            <div className="">
              <FilterAltIcon style={{ fill: "#fff", stroke: "#637381" }} />
            </div>
            <h6 className="text-base	font-normal	text-gray">
              Filter by Order Date
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveOrder;
