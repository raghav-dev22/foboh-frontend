import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TotalOrders = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1  py-5 justify-between gap-4 items-center">
        <div className="bg-white relative  px-3 py-2  custom-shadow rounded-[8px] flex justify-between">
          <div className="absolute top-[11px] left-[50%] bg-[#E7E7E7] h-[80%] w-[1px]"></div>
          <div className="w-full py-3 px-4 ">
            <h5 className="text-lg font-bold text-[#212B36]">40</h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Total Orders</p>
              <div className="flex justify-center items-center gap-2 ">
                <p className="text-sm font-medium text-[#009900]">0.24%</p>
                <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
              </div>
            </div>
          </div>
          <div className="w-full py-3 px-4">
            <h5 className="text-lg font-bold text-[#212B36]">40</h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Open Orders</p>
              <div className="flex justify-center items-center gap-2">
                <p className="text-sm font-medium text-[#DC3545]">0.24%</p>
                <ArrowDownwardIcon style={{ fill: "#DC3545", width: "20px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white relative  px-3 py-2  custom-shadow rounded-[8px] flex justify-between">
          <div className="absolute top-[11px] left-[50%] bg-[#E7E7E7] h-[80%] w-[1px]"></div>
          <div className="w-full py-3 px-4 ">
            <h5 className="text-lg font-bold text-[#212B36]">$24,413</h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Paid Orders</p>
              <div className="flex justify-center items-center gap-2 ">
                <p className="text-sm font-medium text-[#009900]">0.24%</p>
                <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
              </div>
            </div>
          </div>
          <div className="w-full py-3 px-4">
            <h5 className="text-lg font-bold text-[#212B36]">$40,320</h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">
                Unpaid Orders
              </p>
              <div className="flex justify-center items-center gap-2">
                <p className="text-sm font-medium text-[#DC3545]">0.24%</p>
                <ArrowDownwardIcon style={{ fill: "#DC3545", width: "20px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalOrders;
