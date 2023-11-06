import { React, useState } from "react";
import ProductDetails from "../../mainDashboard/ProductDetails";
import OrderDetails from "../../mainDashboard/OrderDetails";
import ActiveOrder from "../../activeOrder/ActiveOrder";
import StockDetails from "../../mainDashboard/StockDetails";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto";
// import StockDetails from '../mainDashboard/StockDetails';
function MainDashBoard() {
  const graphOption = [
    { value: "monthly", label: "monthly" },
    { value: "weekly", label: "weekly" },
  ];
  const monthlyOrderData = [5, 19, 6, 8, 16, 8, 5, 1];
  const weeklyOrderData = [50, 75, 60, 80, 90, 70, 55, 65];
  const monthlyDeliveryData = [12, 19, 3, 5, 2, 7, 9, 5];
  const weeklyDeliveryData = [40, 70, 50, 60, 75, 65, 55, 65];
  const [selectedOption, setSelectedOption] = useState(graphOption[0]);
  const data = {
    labels:
      selectedOption.value === "monthly"
        ? [
            "January",
            "February",
            "March",
            "April",
            "May",
            "june",
            "july",
            "august",
          ]
        : [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6",
            "Week 7",
            "Week 8",
          ],

    datasets: [
      {
        label: "Ordered",
        borderCapStyle: "round",
        data:
          selectedOption.value === "monthly"
            ? monthlyOrderData
            : weeklyOrderData,
        // [12, 19, 3, 5, 2, 7, 9, 5],
        borderColor: "#147D73",
        borderWidth: 4,
        tension: 0.4,

        fill: false, // Set fill to false to make it a line chart without an area underneath
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        label: "Delivered",
        data:
          selectedOption.value === "monthly"
            ? monthlyDeliveryData
            : weeklyDeliveryData,
        // [5, 19, 6, 8, 16, 8, 5, 1],
        borderColor: "#563FE3",
        borderWidth: 4,
        tension: 0.4,

        // fill: false,
        // pointRadius: 0,
        // pointHitRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        // display: false,
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
    x: {
      position: "bottom",
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true, // Optionally use point style for legend items
          boxWidth: 15, // Set a 15px width for the legend items
          boxHeight: 15, // Set a 15px height for the legend items
        },
      },
    },
  };
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className="    overflow-y-scroll	scroll-smooth	scrollable padding-top-custom">
      <div className="box pt-6 px-6 ">
        <div className="  lg:flex gap-6 grid sm:grid-cols-2 	grid-cols-1 	">
          {/* <StockDetails /> */}
          <StockDetails />
        </div>
      </div>
      <div className="box-2 pt-6 px-6">
        <div className="grid lg:flex gap-6">
          <div className=" lg:w-3/5 w-full		 rounded-md	 border border-inherit bg-white h-356 grid	  ">
            <div className="flex justify-between pt-7 px-7 pb-2 items-center">
              <h4 className="text-lg font-semibold text-[#212B36]">
                Order snapshot
              </h4>
              <Select
                className="bg-[#F4F7FF]"
                value={selectedOption}
                options={graphOption}
                onChange={handleOptionChange}
              />
            </div>
            <div className="px-7 py-6">
              <Line data={data} options={options} className="chart-legend " />
            </div>
          </div>
          <div className="w-full lg:w-2/5	 rounded-md	 border border-inherit bg-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center ">
                <h5 className="text-xl font-semibold me-2">Stock alerts</h5>
                <span className="bg-[#F9C107] text-[#212B36] text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[#F9C107] dark:text-[#212B36]">
                  4
                </span>
                <span className="bg-[#DC3545] text-[#ffffff] text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[#DC3545] dark:text-[#ffffff]">
                  1
                </span>
              </div>
              <a
                href="#"
                className="text-xs/[10px] font-normal	text-darkBlue underline"
              >
                See all
              </a>
            </div>
            {/* <ProductDetails /> */}
            <div className="scroll-right">
              <ProductDetails />
            </div>
          </div>
        </div>
      </div>
      <div className="box-3 pt-6 px-6 ">
        <ActiveOrder />
      </div>
      <div className="box-4 pt-6 px-6">
        <div className=" rounded-md	 border border-inherit bg-white overflow-x-scroll	">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                  Order ID
                </th>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                  Customer
                </th>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                  Amount
                </th>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm			 font-semibold ">
                  Delivery date
                </th>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
                  Status
                </th>
                <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
                  Action required
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* <OrderDetails /> */}
              <OrderDetails />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainDashBoard;
