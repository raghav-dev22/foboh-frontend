import React, { useState } from "react";

import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import CustomerTable from "./CustomerTable";

function AddCustomers() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <>
      {/* <ActiveProduct/> */}
      <ActiveCustomers />
      <div className="   ">
        <div className="box-3 px-6 ">
          {/* <SearchProduct/> */}
          <SearchCustomer />
        </div>
        <div className="box-4 pt-6 px-6 ">
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
                {/* <TableRange/> */}
                <CustomerTable />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCustomers;
