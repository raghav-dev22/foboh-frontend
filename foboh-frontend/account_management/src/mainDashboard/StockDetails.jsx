import React from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getTilesData } from "../reactQuery/dashboardApiModule";
import { formatPrice } from "../helpers/formatPrice";

function StockDetails() {
  const [order, setOrder] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [customerPercentage, setCustomerPercentage] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

  const {
    data: tilesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchTiles"],
    queryFn: getTilesData,
  });

  const stockBox = [
    {
      title: tilesData?.totalRevenue
        ? `${formatPrice(tilesData?.totalRevenue)}`
        : `$00.00`,

      description: "Total Revenue this month",

      value: (
        <span
          style={
            tilesData?.totalRevenuePercentage > 0
              ? { color: "#45CB85" }
              : { color: "#DC3545" }
          }
        >
          {tilesData?.totalRevenuePercentage
            ? `${tilesData?.totalRevenuePercentage.toFixed(2)}%`
            : "0.00%"}
        </span>
      ),

      Image: <AttachMoneyIcon style={{ fill: "#147D73" }} />,

      Arrow:
        tilesData?.totalRevenuePercentage > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#45CB85" }} />
        ) : (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ),
    },

    {
      title: tilesData?.totalProfit
        ? `${formatPrice(tilesData?.totalProfit)}`
        : `$00.00`,

      description: "Gross Profit this month",

      value: (
        <span
          style={
            tilesData?.totalProfitPercentage
              ? { color: "#45CB85" }
              : { color: "#DC3545" }
          }
        >
          {tilesData?.totalProfitPercentage
            ? `${tilesData?.totalProfitPercentage.toFixed(2)}%`
            : "0.00%"}
        </span>
      ),

      Image: <SignalCellularAltIcon style={{ fill: "#147D73" }} />,

      Arrow:
        tilesData?.totalProfitPercentage > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#45CB85" }} />
        ) : (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ),
    },

    {
      title: tilesData?.noOfOrders ? tilesData?.noOfOrders : 0,

      description: "Total Orders this month",

      value: (
        <span
          style={
            tilesData?.noOfOrdersPercentage > 0
              ? { color: "#45CB85" }
              : { color: "#DC3545" }
          }
        >
          {tilesData?.noOfOrdersPercentage
            ? `${tilesData?.noOfOrdersPercentage.toFixed(2)}%`
            : "0.00%"}
        </span>
      ),

      Image: <ShoppingCartOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow:
        tilesData?.noOfOrdersPercentage > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#45CB85" }} />
        ) : (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ),
    },

    {
      title: customer ? customer : "0",

      description: "Active customers",

      value: (
        <span style={{ color: "#DC3545" }}>
          {customerPercentage ? customerPercentage : "0.00%"}
        </span>
      ),

      Image: <PeopleAltOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow:
        customerPercentage > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#45CB85" }} />
        ) : (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ),
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
          const customerData = data?.data[0];
          setCustomer(customerData?.noOfCustomer);
          setCustomerPercentage(
            `${customerData?.percentageIncrease.toFixed(2)}%`
          );
        }
      })
      .catch((error) => console.log(error));

    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/DashBoard/getAllCards?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    ).th;

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
          const orderData = data?.data[0];
          setOrder(orderData?.noOfOrders);
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
          const revenueData = data?.data[0];
          setRevenue(revenueData?.totalRevenue);
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
          const profitData = data?.data[0];
          setProfit(profitData?.totalProfit);
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
