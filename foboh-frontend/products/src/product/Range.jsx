import React, { useEffect, useState } from "react";

import TableRange from "./TableRange";
import SearchProduct from "./SearchProduct";
import CloseIcon from "@mui/icons-material/Close";
import ActiveProduct from "./ActiveProduct";
import { useNavigate } from "react-router-dom";
import "../style.css";
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
import createArrayWithNumber from "../helpers/createArrayWithNumbers";
const TABLE_HEAD = ["Title", "Code", "Configuration", "Price", "Stock level", " Status"];
function Range() {
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(0);
  const navigate = useNavigate();

  const TABLE_ROWS = [
    {
      img: "/img/logos/logo-spotify.svg",
      name: "Spotify",
      amount: "$2,500",
      date: "Wed 3:00pm",
      status: "paid",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "/img/logos/logo-amazon.svg",
      name: "Amazon",
      amount: "$5,000",
      date: "Wed 1:00pm",
      status: "paid",
      account: "master-card",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "/img/logos/logo-pinterest.svg",
      name: "Pinterest",
      amount: "$3,400",
      date: "Mon 7:40pm",
      status: "pending",
      account: "master-card",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "/img/logos/logo-google.svg",
      name: "Google",
      amount: "$1,000",
      date: "Wed 5:00pm",
      status: "paid",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
    {
      img: "/img/logos/logo-netflix.svg",
      name: "netflix",
      amount: "$14,000",
      date: "Wed 3:30am",
      status: "cancelled",
      account: "visa",
      accountNumber: "1234",
      expiry: "06/2026",
    },
  ];

  useEffect(() => {
    getProductList(1)
  }, [])

  const getProductList = (values) => {
    console.log("vales>>", values)
    fetch(`https://fobohwepapifbh.azurewebsites.net/api/product/GetAll?page=${values}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("product lists --->", data);
        setProducts(data.data);
        const array = createArrayWithNumber(data.last_page)
        setPages(array)
      })
      .catch((error) => console.log(error));
  }

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

  const buttonClik = (type) => {
    switch (type) {
      case 'next':
        let newPage = page + 1;
        setPage(page + 1)
        getProductList(newPage)
        break;
      case 'previous':
        if (page > 0) {
          let newPage = page - 1
          setPage(page > 0 ? page - 1 : 1)
          getProductList(newPage)
        } else {
          getProductList(1)
        }
        break;
      default:
        break;
    }
    // alert("button clikc",type)
  }
  // console.log("range products", products);
  const handleCheckbox = (product) => {
    console.log("prod :->", product);
    setSelectedProducts(product);
    if (selectedProducts.includes(product)) {
      const newSelectedProducts = selectedProducts.filter(
        (prod) => prod !== product
      );
      setSelectedProducts(newSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  return (
    <>
      <ActiveProduct />
      <div className="   ">
        <div className="box-3 px-6 ">
          <SearchProduct setProducts={setProducts} products={products} />
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
              {products.map(
                (
                  {
                    title,
                    skUcode,
                    configuration,
                    globalPrice,
                    availableQty,
                    stockStatus,
                  },
                  index,
                ) => {
                  const isLast = index === products.length - 1;
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
                            name={title}
                            onClick={() => handleCheckbox(product)}
                            className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {skUcode}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {configuration}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {globalPrice}
                        </Typography>
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
                          {stockStatus}
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
              {pages.map((page, index) => {
                return (
                  <div
                    onClick={() => navigate(`/dashboard/prooducts/${index + 1}`)}
                    className="hidden px-4 py-2 mx-1 text-green  bg-white rounded-md sm:inline  dark:text-gray-200  table-pagination "
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <Button onClick={() => buttonClik('next')} variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
        {/* <div className="box-4 pt-6 px-6 relative">
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
                <div className="flex items-center -mx-1" onClick={() => buttonClik('previous')}>
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
                      onClick={() => navigate(`/dashboard/prooducts/${index + 1}`)}
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
                <div className="flex items-center -mx-1" onClick={() => buttonClik('next')}>
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
        </div> */}
      </div>
    </>
  );
}

export default Range;
