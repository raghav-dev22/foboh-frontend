import React, { useEffect, useRef, useState } from "react";
import SearchProduct from "./SearchProduct";
import CloseIcon from "@mui/icons-material/Close";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ActiveProduct from "./ActiveProduct";
import { useNavigate } from "react-router-dom";
import "../style.css";
import {
  Typography,
  CardBody,
  CardFooter,
  select,
} from "@material-tailwind/react";
import createArrayWithNumber from "../helpers/createArrayWithNumbers";
import { PaginationNav1Presentation } from "./Pagination";
import { Avatar, List, Skeleton, Switch } from "antd";
const TABLE_HEAD = [
  "Title",
  "Code",
  "Configuration",
  "Price",
  "Stock level",
  " Status",
];
function Range() {
  const childRef = useRef(null);
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [prevProducts, setPrevProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSlected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSearchResult, setisSearchResult] = useState(true);

  useEffect(() => {
    getProductList(1);
    getAllproduct();
  }, []);

  const getAllproduct = () => {
    fetch(
      `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/GetAll?page=1`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("product list >>", data);
        setProducts(data.data);
        setPrevProducts(data.data);
        setTotalProducts(data.total);
        const array = createArrayWithNumber(data.last_page); //error
        setTotalPages(data.last_page);
        setPages(array);
        // console.log("bbbbbb", products)
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  const getProductList = (values) => {
    setLoading(true);
    if (childRef.current) {
      console.log("values>>", values);
      childRef.current.handleFilterPagination(values);
    }
    setSelectedProducts([]);
    setIsBulkEdit(false);
  };

  const handleSelectAllChange = (e) => {
    // console.log("flag >>", e);
    const checked = e.target.checked;
    checked ? setSelectedProducts([...products]) : setSelectedProducts([]);
    setIsBulkEdit(true);
    if (!checked) {
      setIsBulkEdit(false);
    }
    console.log("selected products >>", selectedProducts);
  };

  const handleBulkEdit = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    navigate("/dashboard/bulk-edit");
  };

  const handleCheckbox = (e, product) => {
    const checked = e.target.checked;
    const updatedSelectedProducts = checked? [...selectedProducts, product]: selectedProducts.filter((prod) => prod !== product);
    setSelectedProducts(updatedSelectedProducts);
    setIsBulkEdit(updatedSelectedProducts.length > 1);
    console.log("selected products >>", selectedProducts);
    setSlected(selectedProducts.length);
  };

  // visibility handle
  const handleBulkVisibility = (name) => {
    // console.log("handle visibility >>",selectedProducts);
    // return true

    fetch(
      `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/UpdateProductBulkData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          selectedProducts.map((product) => {
            return {
              productId: product.productId,
              title: product.title,
              skUcode: product.skUcode,
              configuration: product.configuration,
              globalPrice: product.globalPrice,
              buyPrice: product.buyPrice,
              availableQty: product.availableQty,
              visibility: name === "visible" ? true : false,
              productStatus: product.productStatus,
            };
          })
        ),
      }
    )
      .then((response) => {
        console.log("response product bulk update >>", response);
        response.json();
      })
      .then((data) => {
        console.log("response data1:", data);
        setIsBulkEdit(false);
        setSelectedProducts([]);
        getAllproduct();
      })
      .catch((error) => console.log(error));
  };

  const stockStatus = (availableQty, stockThreshold) => {
    if (availableQty === 0) {
      return (
        <div
          className="bg-[#EDF7F1] py-2 px-3.5	rounded-[30px]"
          style={{
            background: "rgba(220, 53, 69, 0.05)",
            paddingLeft: "0.875rem",
            paddingRight: "0.875rem",
            borderRadius: "30px",
            maxWidth: "134px",
          }}
        >
          <Typography className="font-normal md:text-sm text-sm text-[#DC3545] text-center">
            {`Out of stock(${availableQty})`}
          </Typography>
        </div>
      );
    } else if (availableQty <= stockThreshold) {
      return (
        <div
          className="bg-[#EDF7F1] py-2 px-3.5	rounded-[30px]"
          style={{
            background: "rgba(255, 167, 11, 0.08)",
            paddingLeft: "0.875rem",
            paddingRight: "0.875rem",
            borderRadius: "30px",
            maxWidth: "134px",
          }}
        >
          <Typography className="font-normal md:text-sm text-sm text-[#FFA70B] text-center">
            {`Low stock(${availableQty})`}
          </Typography>
        </div>
      );
    } else if (availableQty >= stockThreshold) {
      return (
        <div
          className="bg-[#EDF7F1] py-1 px-3.5	rounded-[30px]"
          style={{
            background: "rgba(33, 150, 83, 0.08)",
            paddingLeft: "0.875rem",
            paddingRight: "0.875rem",
            borderRadius: "30px",
            maxWidth: "134px",
            color: "#219653",
          }}
        >
          <Typography
            style={{ color: "#219653" }}
            className="font-normal md:text-sm text-sm text-center"
          >
            {`In stock(${availableQty})`}
          </Typography>
        </div>
      );
    }
  };

  return (  
    <>
      <ActiveProduct
        totalProducts={totalProducts}
        selectedProductsLength={selectedProducts.length}
        productId={selectedProducts[0]?.productId}
      />
      <div className="   " style={{ height: "100%" }}>
        <div className="box-3 px-6 ">
          <SearchProduct
            ref={childRef}
            setLoading={setLoading}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setisSearchResult={setisSearchResult}
            setProducts={setProducts}
            products={products}
            prevProducts={prevProducts}
          />
        </div>
        <div className="pt-6 px-6 relative">
          <div
            className="box-4 relative overflow-x-auto overflow-y-auto no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white"
            style={{ height: "435px" }}
          >
            <CardBody className="p-0">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="p-4 border-y">
                      <div className="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={selectedProducts.length === 9 ? true : false}
                          // defaultValue=""
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
                {isSearchResult && (
                  <tbody>
                    {products.map((product, index) => {
                      const isLast = index === products.length - 1;
                      const classes = isLast ? "p-4" : "p-4  ";

                      return (
                        <tr
                          key={name}
                          style={
                            loading
                              ? { position: "relative", height: "85px" }
                              : { position: "relative" }
                          }
                          className="border-b border-blue-gray-50"
                        >
                          <Skeleton
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
                          >
                            <td className={classes}>
                              <div className="flex items-center gap-3 cursor-pointer">
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
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded cursor-pointer dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </td>
                            <td className={classes}>
                              <div
                                onClick={() =>
                                  navigate(
                                    `/dashboard/view-product/${product.productId}`
                                  )
                                }
                                className="flex items-center gap-3"
                              >
                                {product.productImageUrls ? (
                                  <>
                                    <div className="">
                                      <img
                                        src={product.productImageUrls[0]}
                                        alt=""
                                        className="object-cover cursor-pointer	"
                                        style={{
                                          borderRadius: "6px",
                                          height: "40px",
                                          width: "40px",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div
                                    className=" rounded-[6px] bg-[#D9D9D9]"
                                    style={{
                                      height: "40px",
                                      width: "40px",
                                      borderRadius: "6px",
                                    }}
                                  ></div>
                                )}
                              </div>
                            </td>
                            <td className={classes}>
                              <div
                                onClick={() =>
                                  navigate(
                                    `/dashboard/view-product/${product.productId}`
                                  )
                                }
                                className="flex items-center gap-3"
                              >
                                <Typography className="font-medium	md:text-base text-sm text-[#637381] cursor-pointer">
                                  {product.title}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                {product.skUcode}
                              </Typography>
                            </td>
                            <td className={`${classes} w-44`}>
                              <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                {product.configuration}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                {`$${product.globalPrice}`}
                              </Typography>
                            </td>
                            <td className={classes}>
                              {stockStatus(
                                product.availableQty,
                                product.stockThreshold
                              )}
                            </td>
                            <td className={classes}>
                              <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                {product.stockStatus}
                                <br />
                                {product.visibility ? "Visible" : "Hidden"}
                              </Typography>
                            </td>
                          </Skeleton>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </CardBody>
            <CardFooter
              className={
                isSearchResult
                  ? "flex w-full items-center justify-between border-t border-blue-gray-50 p-4"
                  : "flex w-full items-center justify-center border-t border-blue-gray-50 p-4"
              }
            >
              {!loading && isSearchResult &&  (
                <PaginationNav1Presentation
                  totalPages={totalPages}
                  getProductList={getProductList}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                />
              )}
              {!isSearchResult && (
                <div
                  style={{
                    marginTop: "30px",
                  }}
                  className="text-center mt-7"
                >
                  <SearchOffIcon fontSize="large" />
                  <p className="font-semibold">No Result Found</p>
                </div>
              )}
            </CardFooter>
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

              <button
                onClick={() => handleBulkVisibility("visible")}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
                <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium ">
                  Set as Visible{" "}
                </h6>
              </button>

              <button
                onClick={() => handleBulkVisibility("hidden")}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
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
                <div onClick={() => setSelectedProducts([])}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Range;
