import { React, useEffect, useState } from "react";
import ProductDetails from "../../mainDashboard/ProductDetails";
import OrderDetails from "../../mainDashboard/OrderDetails";
import ActiveOrder from "../../activeOrder/ActiveOrder";
import StockDetails from "../../mainDashboard/StockDetails";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
// import StockDetails from '../mainDashboard/StockDetails';
import SignupModel from "../../modal/SignupModel";
import { stockQuantity } from "../../helpers/stockQuantity";
import { useMutation, useQuery } from "react-query";
import { getAllOrders } from "../../helpers/dashboardApiModule";
import {
  getWeeklyGraphData,
  getmonthlyGraphData,
} from "../../reactQuery/dashboardApiModule";
import { getWeeks } from "../../helpers/weeklyDivisions";
import { useNavigate } from "react-router-dom";

function MainDashBoard() {
  const [show, setShow] = useState(false);
  const [stock, setStock] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const [stockCount, setStockCount] = useState({
    lowStock: 0,
    outOfStock: 0,
  });
  const graphOption = [
    { value: "monthly", label: "monthly" },
    { value: "weekly", label: "weekly" },
  ];

  let monthlyData = {
    ordered: [],
    completed: [],
  };

  let weeklyData = {
    ordered: [],
    completed: [],
  };

  const [selectedOption, setSelectedOption] = useState(graphOption[0]);

  const {
    data: monthlyDataResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getmonthlyData"],
    queryFn: getmonthlyGraphData,
  });

  const {
    data: weeklyDataResult,
    isLoading: weeklyDataisLoading,
    error: weeklyDataError,
  } = useQuery({
    queryKey: ["getWeeklyData"],
    queryFn: getWeeklyGraphData,
  });

  if (weeklyDataResult) {
    weeklyData = {
      ordered: weeklyDataResult?.ordered?.map((item) => item.totalPayAmountLog),
      completed: weeklyDataResult?.completed?.map(
        (item) => item.totalPayAmountLog
      ),
    };
  }

  if (monthlyDataResult) {
    monthlyData = {
      ordered: monthlyDataResult?.ordered?.map(
        (item) => item.totalPayAmountLog
      ),
      completed: monthlyDataResult?.completed?.map(
        (item) => item.totalPayAmountLog
      ),
    };
  }

  const { mutate } = useMutation(getAllOrders, {
    onSuccess: (data) => {
      setOrderDetails(data);
    },
  });

  const weeks = getWeeks();

  const data = {
    labels:
      selectedOption.value === "monthly"
        ? [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
        : weeks,

    datasets: [
      {
        label: "Ordered",
        borderCapStyle: "round",
        data:
          selectedOption.value === "monthly"
            ? monthlyData?.ordered
            : weeklyData?.ordered,
        // [12, 19, 3, 5, 2, 7, 9, 5],
        borderColor: "#147D73",
        borderWidth: 4,
        tension: 0.4,

        fill: false,
        // Set fill to false to make it a line chart without an area underneath
        // pointRadius: 0,
        // pointHitRadius: 0,
      },
      {
        label: "Completed",
        data:
          selectedOption.value === "monthly"
            ? monthlyData?.completed
            : weeklyData?.completed,
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
  function getTodayAndPast30Days() {
    const today = new Date();

    // Get the date 30 days ago
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    // Format the dates as strings
    const formattedToday = formatDate(today);
    const formattedPast30Days = formatDate(past30Days);

    // Return an object with both dates
    return {
      today: formattedToday,
      past30Days: formattedPast30Days,
    };
  }
  function formatDate(date) {
    const isoString = date.toISOString();
    return isoString.slice(0, 23) + "Z";
  }
  const dates = getTodayAndPast30Days();

  useEffect(() => {
    mutate({
      filter: {
        searchByValue: "",
        region: [],
        orderStatus: ["New", "Pending"],
        orderEntryDate: dates.past30Days,
        OrderFilterEndDate: dates.today,
        customeDate: "",
        page: 0,
        pagination: false,
      },
      sort: {
        sortBy: "date",
        sortOrder: "desc",
      },
    });

    const popValue = localStorage.getItem("loginPopup");
    if (popValue === "true") {
      setShow(true);
    }

    fetch(
      `https://dashboardfobohwepapi-fbh.azurewebsites.net/api/StockStatus?OrganisationId=${localStorage.getItem(
        "organisationId"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { lowStock, outOfStock } = stockQuantity(data?.data);
          setStockCount({
            lowStock: lowStock,
            outOfStock: outOfStock,
          });
        }

        setStock(data?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (name) => {
    navigate("/dashboard/products");
    localStorage.setItem("yourBooleanKey", "true");
  };

  return (
    <>
      <SignupModel show={show} setShow={setShow} />
      <div className="    overflow-y-auto	scroll-smooth	scrollable padding-top-custom">
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
                  isSearchable={false}
                  onChange={handleOptionChange}
                />
              </div>
              <div className="px-7 py-6">
                <Line data={data} options={options} className="chart-legend " />
              </div>
            </div>
            <div className="w-full lg:w-2/5  rounded-md  border border-inherit bg-white p-6">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center ">
                  <h5 className="text-xl font-semibold me-2">Stock alerts</h5>
                  <span className="bg-[#F9C107] text-[#212B36] text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[#F9C107] dark:text-[#212B36]">
                    {stockCount.lowStock}
                  </span>
                  <span className="bg-[#DC3545] text-[#ffffff] text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[#DC3545] dark:text-[#ffffff]">
                    {stockCount.outOfStock}
                  </span>
                </div>
                {stock?.length > 0 ? (
                  <span
                    onClick={handleClick}
                    className="text-xs/[10px] font-normal text-darkBlue underline cursor-pointer"
                  >
                    See all
                  </span>
                ) : (
                  ""
                )}
              </div>
              {/* <ProductDetails /> */}
              <div className="scroll-right mt-5">
                <ProductDetails stock={stock} />
              </div>
            </div>
          </div>
        </div>
        <div className="box-3 pt-6 px-6 ">
          <ActiveOrder mutate={mutate} />
        </div>
        <div className="box-4 pt-6 px-6">
          <div className=" rounded-md	 border border-inherit bg-white overflow-x-auto	">
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
                    Order date
                  </th>
                  <th className="pl-12 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
                    Status
                  </th>
                  <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
                    Action required
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 `}>
                {orderDetails.length > 0 ? (
                  <OrderDetails orderDetails={orderDetails} />
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="flex items-center justify-center h-[200px] no-data flex-col">
                        <svg
                          style={{ fill: "#808080", width: "60px" }}
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 74 100"
                        >
                          <defs>
                            <style
                              dangerouslySetInnerHTML={{
                                __html:
                                  "\n      .cls-1 {\n        stroke-width: 0px;\n      }\n    ",
                              }}
                            />
                          </defs>
                          <path
                            className="cls-1"
                            d="m62,30C62,13.4,50.8,0,37,0S12,13.4,12,30H0l6,70h62l6-70h-12ZM37,4c11.6,0,21,11.7,21,26H16c0-14.3,9.4-26,21-26Zm15,46c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm-20,0c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm5,12.6c12.4,0,22.5,10.1,22.5,22.5h-5c0-9.6-7.9-17.5-17.5-17.5s-17.5,7.8-17.5,17.5h-5c0-12.4,10.1-22.5,22.5-22.5Z"
                          />
                        </svg>

                        <h5 className="text-[#808080] text-lg font-medium">
                          No Data
                        </h5>
                      </div>
                    </td>
                  </tr>
                )}
                {/* <OrderDetails /> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashBoard;
