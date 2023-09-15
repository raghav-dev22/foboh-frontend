import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import { Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PaginationCustomer } from "./PaginationCustomer";
import createArrayWithNumber from "../../../products/src/helpers/createArrayWithNumbers";
import { Skeleton } from "@mui/material";
const TABLE_HEAD = [
  "Name",
  "Contact",
  "Region",
  "Status",
  "Orders",
  "Amount spent",
];
function AddCustomers() {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [tableRecords, setTableRecords] = useState([]);
  const [prevCustomer, setPrevCustomer] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [selected, setSlected] = useState(0);

  let timeoutId;
  const handleDebounce = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log("Performing action with value:", value);
      setInputValue(value);
      searchApi(value);
    }, 300);
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleDebounce(newValue);
  };
  useEffect(() => {
    callApi(1);
  }, []);
  const callApi = (item) => {
    // https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/GetAll?page=1
    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/GetAll?page=${item}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("customer data --->", data);
        setTableRecords(data.data);
        setLoading(false);
        setPrevCustomer(data.data);
        const array = createArrayWithNumber(data.last_page);
        setTotalPages(data.last_page);
        setPages(array);
      });
    console.log(tableRecords, "data1");
  };
  const handleCustomerId = (item) => {
    navigate(`/dashboard/view-customer-details/`, { state: { data: item } });
  };

  const searchApi = () => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/SearchByName?search=${inputValue}&page=1`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("user data --->", data);
        setTableRecords(data.data);
      });
  };

  const handleCheckbox = (e, product) => {
    const checked = e.target.checked;
    const updatedSelectedProducts = checked
      ? [...selectedProducts, product]
      : selectedProducts.filter((prod) => prod !== product);
    setSelectedProducts(updatedSelectedProducts);
    setIsBulkEdit(updatedSelectedProducts.length > 1);
    console.log("selected products >>", selectedProducts);
    setSlected(selectedProducts.length);
  };

  const handleBulkEdit = () => {
    localStorage.setItem("selectedCustomers", JSON.stringify(selectedProducts));
    navigate("/dashboard/customer-bulk-edit");
  };

  const handleSelectAllChange = (e) => {
    console.log("flag >>", e);
    const checked = e.target.checked;
    checked ? setSelectedProducts([...tableRecords]) : setSelectedProducts([]);
    setIsBulkEdit(true);
    if (!checked) {
      setIsBulkEdit(false);
    }
    console.log("selected products >>", selectedProducts);
  };

  return (
    <>
      <ActiveCustomers
        selectedProductsLength={selectedProducts.length}
        product={selectedProducts[0]}
      />
      <div className="   " style={{ height: "503px", overflowY: "scroll" }}>
        <div className="box-3 px-6 ">
          <SearchCustomer
            setProducts={setTableRecords}
            products={tableRecords}
            prevProducts={prevCustomer}
            totalPages={setTotalPages}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
        <div className="pt-6 px-6 relative">
          <div className="box-4 relative overflow-x-auto overflow-y-auto h-[250px] custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white">
            <CardBody className="p-0">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="p-4 border-y">
                      <div className="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          onChange={(e) => handleSelectAllChange(e)}
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>
                    <th scope="col" className="p-4 border-y">
                      <div className="flex items-center"></div>
                    </th>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          className="font-medium leading-none text-base text-[#2B4447]"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRecords.map((product, index) => {
                    const isLast = index === products.length - 1;
                    const classes = isLast ? "p-4" : "p-4  ";

                    return (
                      <tr
                        key={name}
                        style={
                          loading
                            ? { position: "relative", height: "55px" }
                            : { position: "relative" }
                        }
                        className="border-b border-blue-gray-50"
                      >
                        {/* <Skeleton
                          style={{
                            padding: "10px",
                            width: "95%",
                            position: "absolute",
                            top: "20px",
                            left: "14px",
                          }}
                          paragraph={{ rows: 1 }}
                          loading={loading}
                          active
                          avatar
                          className="custom-skeleton"
                        > */}
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              name={product.title}
                              checked={
                                selectedProducts.includes(product)
                                  ? true
                                  : false
                              }
                              onClick={(e) => handleCheckbox(e, product)}
                              className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                        </td>
                        <td className={classes}></td>
                        <td className={classes}>
                          <div
                            onClick={
                              () => handleCustomerId(product)
                              // navigate(
                              //   `/dashboard/view-product/${product.productId}`
                              // )
                            }
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Typography className="font-medium	md:text-base text-sm text-[#637381]">
                              {product.businessName}
                              {/* {item?.businessName} */}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            {product.orderingEmail}
                          </Typography>
                        </td>
                        <td className={`${classes} w-44`}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            {product.address}
                            {product.state}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <td className={classes}>
                            {product?.isActive === true ? (
                              <div
                                style={{
                                  background: "rgba(33, 150, 83, 0.08)",
                                  borderRadius: "30px",
                                }}
                                className="flex justify-center items-center gap-1 radius-20 bg-custom-green h-7	w-32		px-3"
                              >
                                <p className="text-green-dark font-normal	text-sm	">
                                  Active
                                </p>
                              </div>
                            ) : (
                              <div
                                style={{
                                  background: "rgba(255, 167, 11, 0.08)",
                                  borderRadius: "30px",
                                }}
                                className="flex justify-center items-center rounded-[30px] gap-1 radius-20  h-7	w-32		px-3"
                              >
                                <p
                                  style={{ color: "#FFA70B" }}
                                  className="text-red-dark font-normal text-sm	"
                                >
                                  Inactive
                                </p>
                              </div>
                            )}
                          </td>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            10
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            ${10 * 20}
                          </Typography>
                        </td>
                        {/* </Skeleton> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex w-full items-center justify-between border-t border-blue-gray-50 p-4">
              <PaginationCustomer
                totalPages={totalPages}
                getProductList={callApi}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </CardFooter>
          </div>
        </div>
        {isBulkEdit ? (
          <div className="bulk-update-popup rounded-lg bg-slate-100 justify-center items-center   border border-darkGreen p-6 w-max  flex gap-3 absolute  bottom-0  left-2/4">
            <button
              onClick={handleBulkEdit}
              className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
            >
              <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium">
                Bulk edit{" "}
              </h6>
            </button>

            <button className="rounded-md bg-custom-skyBlue py-2.5  px-7  ">
              <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium ">
                Set as Visible{" "}
              </h6>
            </button>

            <button className="rounded-md bg-custom-skyBlue py-2.5  px-7  ">
              <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium ">
                Set as Hidden{" "}
              </h6>
            </button>

            <div
              className="cursor-pointer"
              onClick={() => {
                setIsBulkEdit(false);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AddCustomers;
