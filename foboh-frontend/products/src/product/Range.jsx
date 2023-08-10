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
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
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

  console.log("range products", products);

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
                  setPages={setPages}
                  selectedPage={selectedPage}
                />
              </tbody>
            </table>
            <div className="flex justify-between items-center p-4">
              <a
                href="#"
                className="px-4 py-2 mx-1 text-green  bg-white rounded-md cursor-not-allowed  border border-inherit"
              >
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span className="mx-1">previous</span>
                </div>
              </a>
              <div className=" flex justify-center items-center gap-3">
                {pages.map((page, index) => {
                  return (
                    <div
                      onClick={() => navigate(`/dashboard/prooducts/${index+1}`)}
                      className="hidden px-4 py-2 mx-1 text-green  bg-white rounded-md sm:inline  dark:text-gray-200  table-pagination "
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>

              <a
                href="#"
                className="px-4 py-2 mx-1 text-green  transform bg-white border border-inherit rounded-md"
              >
                <div className="flex items-center -mx-1">
                  <span className="mx-1">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            </div>
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
