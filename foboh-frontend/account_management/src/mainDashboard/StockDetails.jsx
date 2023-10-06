import React from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function StockDetails() {
  const stockBox = [
    {
      title: "$12,489",

      description: "Total revenue",

      value: <span style={{ color: "#45CB85" }}>0.43%</span>,

      Image: <AttachMoneyIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: "$2,572",

      description: "Gross profit",

      value: <span style={{ color: "#45CB85" }}>4.35%</span>,

      Image: <SignalCellularAltIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: "585",

      description: "Total orders",

      value: <span style={{ color: "#45CB85" }}>2.59%</span>,

      Image: <ShoppingCartOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: "120",

      description: "Active customers",

      value: <span style={{ color: "#DC3545" }}>0.95%</span>,

      Image: <PeopleAltOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowDownwardIcon style={{ fill: "#DC3545" }} />,
    },
  ];

  return (
    <>
      {stockBox.map((item, index) => {
        return (
          <>
            <div
              className={` rounded-md   border border-inherit bg-white grow h-40 stock-${index}`}
            >
              <div className="grid grid-cols-1 gap-6 p-4">
                <div className=" stock-icon h-12 w-12 rounded-full  flex justify-center items-center bg-slate-100 ">
                  {item.Image}
                </div>

                <div className="">
                  <h4 className="text-2xl font-bold text-start  ">
                    {item.title}
                  </h4>

                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-zinc-500">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold ">{item.value}</p>

                      <div className="">{item.Arrow}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default StockDetails;
