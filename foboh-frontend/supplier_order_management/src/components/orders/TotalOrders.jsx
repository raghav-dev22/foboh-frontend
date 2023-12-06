import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect } from "react";
import { getAllOrderDetails } from "../../helpers/dashbordApiModule";
import { useState } from "react";
import { formatPrice } from "../../helpers/formatPrice";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState();
  const [openOrders, setOpenOrders] = useState();
  const [paidOrders, setPaidOrders] = useState();
  const [unpaidOrders, setUnPaidOrders] = useState();
  const [allOrders, setAllOrders] = useState({
    totalOrders: 0,
    totalOrdersPercentage: 0,
    openOrders: 0,
    openOrdersPercentage: 0,
    paidOrders: 0,
    paidOrdersPercentage: 0,
    unpaidOrders: 0,
    unpaidOrdersPercentage: 0,
  });
  useEffect(() => {
    TotalAllOrders();
  }, []);

  const TotalAllOrders = async () => {
    const OrdersResponse = await getAllOrderDetails();
    setAllOrders({
      totalOrders: OrdersResponse.totalOrders,
      totalOrdersPercentage: OrdersResponse.totalOrdersPercentage,
      openOrders: OrdersResponse.openOrders,
      openOrdersPercentage: OrdersResponse.openOrdersPercentage,
      paidOrders: OrdersResponse.paidOrders,
      paidOrdersPercentage: OrdersResponse.paidOrdersPercentage,
      unpaidOrders: OrdersResponse.unpaidOrders,
      unpaidOrdersPercentage: OrdersResponse.unpaidOrdersPercentage,
    });
    setTotalOrders(OrdersResponse.totalOrdersPercentage);
    setOpenOrders(OrdersResponse.openOrdersPercentage);
    setPaidOrders(OrdersResponse.paidOrdersPercentage);
    setUnPaidOrders(OrdersResponse.unpaidOrdersPercentage);
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1  py-5 justify-between gap-4 items-center">
        <div className="bg-white relative  px-3 py-2  custom-shadow rounded-[8px] flex justify-between">
          <div className="absolute top-[11px] left-[50%] bg-[#E7E7E7] h-[80%] w-[1px]"></div>
          <div className="w-full py-3 px-4 ">
            <h5 className="text-lg font-bold text-[#212B36]">
              {allOrders?.totalOrders ? allOrders?.totalOrders : "00.00"}
            </h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Total Orders</p>
              <div className="flex justify-center items-center gap-2 ">
                <p
                  className={`text-sm font-medium ${
                    allOrders?.totalOrdersPercentage === 0
                      ? "text-[#637381]"
                      : allOrders?.totalOrdersPercentage > 0
                      ? "text-[#009900]"
                      : "text-[#DC3545]"
                  }`}
                >
                  {allOrders?.totalOrdersPercentage}%
                </p>
                {allOrders?.totalOrdersPercentage > 0 ? (
                  <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
                ) : allOrders?.totalOrdersPercentage < 0 ? (
                  <ArrowDownwardIcon
                    style={{ fill: "#DC3545", width: "20px" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-full py-3 px-4">
            <h5 className="text-lg font-bold text-[#212B36]">
              {allOrders?.openOrders ? allOrders?.openOrders : "00.00"}
            </h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Open Orders</p>
              <div className="flex justify-center items-center gap-2">
                <p
                  className={`text-sm font-medium ${
                    allOrders?.openOrdersPercentage === 0
                      ? "text-[#637381]"
                      : allOrders?.openOrdersPercentage > 0
                      ? "text-[#009900]"
                      : "text-[#DC3545]"
                  }`}
                >
                  {allOrders?.openOrdersPercentage}%
                </p>

                {openOrders > 0 ? (
                  <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
                ) : openOrders < 0 ? (
                  <ArrowDownwardIcon
                    style={{ fill: "#DC3545", width: "20px" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white relative  px-3 py-2  custom-shadow rounded-[8px] flex justify-between">
          <div className="absolute top-[11px] left-[50%] bg-[#E7E7E7] h-[80%] w-[1px]"></div>
          <div className="w-full py-3 px-4 ">
            <h5 className="text-lg font-bold text-[#212B36]">
              {allOrders?.paidOrders
                ? formatPrice(allOrders?.paidOrders)
                : "00.00"}
            </h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">Paid Orders</p>
              <div className="flex justify-center items-center gap-2 ">
                <p
                  className={`text-sm font-medium ${
                    allOrders?.paidOrdersPercentage === 0
                      ? "text-[#637381]"
                      : allOrders?.paidOrdersPercentage > 0
                      ? "text-[#009900]"
                      : "text-[#DC3545]"
                  }`}
                >
                  {allOrders?.paidOrdersPercentage}%
                </p>
                {paidOrders > 0 ? (
                  <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
                ) : paidOrders < 0 ? (
                  <ArrowDownwardIcon
                    style={{ fill: "#DC3545", width: "20px" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-full py-3 px-4">
            <h5 className="text-lg font-bold text-[#212B36]">
              {allOrders?.unpaidOrders
                ? formatPrice(allOrders?.unpaidOrders)
                : "00.00"}
            </h5>
            <div className="flex justify-between items-center pt-3 ">
              <p className="text-sm font-medium text-[#637381]">
                Unpaid Orders
              </p>
              <div className="flex justify-center items-center gap-2">
                <p
                  className={`text-sm font-medium ${
                    allOrders?.unpaidOrdersPercentage === 0
                      ? "text-[#637381]"
                      : allOrders?.unpaidOrdersPercentage > 0
                      ? "text-[#009900]"
                      : "text-[#DC3545]"
                  }`}
                >
                  {allOrders?.unpaidOrdersPercentage}%
                </p>
                {unpaidOrders > 0 ? (
                  <ArrowUpwardIcon style={{ fill: "#009900", width: "20px" }} />
                ) : unpaidOrders < 0 ? (
                  <ArrowDownwardIcon
                    style={{ fill: "#DC3545", width: "20px" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalOrders;
