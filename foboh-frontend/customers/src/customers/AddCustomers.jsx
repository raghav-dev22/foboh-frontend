import React, { useEffect, useState } from "react";

import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import CustomerTable from "./CustomerTable";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Name", "Contact", "Region", "Status", "Orders", " Amount Spent"];
function AddCustomers() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [page, setPage] = useState(1);
  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    getCustomerList(1)
  }, [])

  const getCustomerList = (values) => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/GetAll?page=${values}`,
      {
        method: "GET",
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log("user data --->", data);
        setCustomerList(data.data)
      })
  }
  const buttonClik = (type) => {
    switch (type) {
      case 'next':
        let newPage = page + 1;
        setPage(page + 1)
        getCustomerList(newPage)
        break;
      case 'previous':
        if (page > 0) {
          let newPage = page - 1
          setPage(page > 0 ? page - 1 : 1)
          getCustomerList(newPage)
        } else {
          getCustomerList(1)
        }
        break;
      default:
        break;
    }
    // alert("button clikc",type)
  }
  return (
    <>
      <ActiveCustomers />
      <div className="   ">
        <div className="box-3 px-6 ">
          <SearchCustomer />
        </div>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerList.map(
                (
                  {
                    businessName,
                    orderingMobile,
                    address,
                    state,
                    isActive,
                    availableQty = 10,
                    stockStatus = 100,
                  },
                  index,
                ) => {
                  const isLast = index === customerList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            name={businessName}
                            onClick={() => handleCheckbox(product)}
                            className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {businessName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {orderingMobile}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {address}{state}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {isActive === 1 ?
                          <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                            <p className="text-green-dark font-normal		text-sm	">Active</p>
                          </div> :
                          <div className="flex justify-center items-center gap-1 radius-30 bg-custom-red h-7	w-32		px-3">
                            <p className="text-red-dark font-normal		text-sm	">InActive</p>
                          </div>}
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {availableQty}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {stockStatus * availableQty}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button onClick={() => buttonClik('previous')} variant="outlined" size="sm" >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <div>

            </div>
          </div>
          <Button onClick={() => buttonClik('next')} variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>


        {/* <div className="box-4 pt-6 px-6 ">
          <div className="relative overflow-x-auto overflow-y-auto h-80 no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className=" border-b">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base text-center	"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	w-44"
                  >
                    Region
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base w-44	"
                  >
                    Orders
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <CustomerTable />
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default AddCustomers;
