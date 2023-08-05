import React, { useState } from "react";

import TableRange from "./TableRange";
import SearchProduct from "./SearchProduct";
import CloseIcon from "@mui/icons-material/Close";

import ActiveProduct from "./ActiveProduct";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Range() {
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [filterAndSort, setFilterAndSort] = useState({
    filter: {
      category: [],
      subCategory: [],
      stock: [],
      status: [],
      visibility: [],
    },
    sort: {
      sortBy: "",
      sortOrder: "",
    },
  });

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleBulkEdit = () => {
    navigate("/dashboard/bulk-edit");
  };

  return (
    <>
      <ActiveProduct />
      <div className="   ">
        <div className="box-3 px-6 ">
          <SearchProduct setProducts={setProducts} products={products} />
        </div>
        <div className="box-4 pt-6 px-6 relative">
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
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Configuration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-green	font-medium text-base	"
                  >
                    Stock level
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
                <TableRange
                  setIsBulkEdit={setIsBulkEdit}
                  setProducts={setProducts}
                  products={products}
                />
              </tbody>
            </table>
          </div>
          {isBulkEdit && (
            <div className="bulk-update-popup rounded-lg bg-slate-100 justify-center items-center   border border-darkGreen p-6 w-max  flex gap-3 absolute  bottom-0  left-2/4">
              <button
                onClick={handleBulkEdit}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
                <h6 className="text-white font-semibold text-base ">
                  Bulk edit{" "}
                </h6>
              </button>

              <button className="rounded-md bg-custom-skyBlue py-2.5  px-7  ">
                <h6 className="text-white font-semibold text-base ">
                  Set as Visible{" "}
                </h6>
              </button>

              <button className="rounded-md bg-custom-skyBlue py-2.5  px-7  ">
                <h6 className="text-white font-semibold text-base ">
                  Set as Hidden{" "}
                </h6>
              </button>

              <div className="cursor-pointer">
                <CloseIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Range;
