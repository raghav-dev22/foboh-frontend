import React from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useEffect } from "react";

function StockDetails() {
  const [order, setOrder] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const stockBox = [
    {
      title: revenue,

      description: "Total Revenue this month",

      value: <span style={{ color: "#45CB85" }}>0.43%</span>,

      Image: <AttachMoneyIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: profit,

      description: "Gross Profit this month",

      value: <span style={{ color: "#45CB85" }}>4.35%</span>,

      Image: <SignalCellularAltIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: order,

      description: "Total Orders this month",

      value: <span style={{ color: "#45CB85" }}>2.59%</span>,

      Image: <ShoppingCartOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowUpwardIcon style={{ fill: "#45CB85" }} />,
    },

    {
      title: customer,

      description: "Active customers",

      value: <span style={{ color: "#DC3545" }}>0.95%</span>,

      Image: <PeopleAltOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow: <ArrowDownwardIcon style={{ fill: "#DC3545" }} />,
    },
  ];
  const organisationId = localStorage.getItem("organisationId");
  useEffect(() => {
    // // total  customer
    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/DashBoard/getCustomer?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const customerData = data.data[0];
          setCustomer(customerData.noOfCustomer);
        }
      })
      .catch((error) => console.log(error));

    // // total  order
    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/DashBoard/getNoOfoders?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const orderData = data.data[0];
          setOrder(orderData.noOfOrders);
        }
      })
      .catch((error) => console.log(error));

    // // total  order
    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/DashBoard/getTotalRevenue?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const revenueData = data.data[0];
          setRevenue(revenueData.totalRevenue);
        }
        // console.log(data.data[0], "totalrevenue");
      })
      .catch((error) => console.log(error));

    // total profit

    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/DashBoard/getTotalProfit?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const profitData = data.data[0];
          setProfit(profitData.totalProfit);
        }
        // console.log(data.data[0], "totalProfit");
      })
      .catch((error) => console.log(error));
  }, [organisationId]);

  return (
    <>
      {stockBox?.map((item, index) => {
        return (
          <>
            <div
              className={` rounded-md   border border-inherit bg-white grow h-40 stock-${index}`}
            >
              <div className="grid grid-cols-1 gap-6 p-4">
                <div className="flex justify-between ">
                  <div className=" stock-icon h-12 w-12 rounded-full  flex justify-center items-center bg-slate-100 ">
                    {item.Image}
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold ">{item.value}</p>

                    <div className="">{item.Arrow}</div>
                  </div>
                </div>

                <div className="">
                  <h4 className="text-2xl font-bold text-start  ">
                    {item.title}
                  </h4>

                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-zinc-500">
                      {item.description}
                    </p>
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
