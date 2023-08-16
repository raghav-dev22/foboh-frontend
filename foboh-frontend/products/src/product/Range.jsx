import React, { useEffect, useState } from "react";
import SearchProduct from "./SearchProduct";
import CloseIcon from "@mui/icons-material/Close";
import ActiveProduct from "./ActiveProduct";
import { useNavigate } from "react-router-dom";
import "../style.css";
import {
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import createArrayWithNumber from "../helpers/createArrayWithNumbers";
import { PaginationNav1Presentation } from "./Pagination";
const TABLE_HEAD = [
  "Title",
  "Code",
  "Configuration",
  "Price",
  "Stock level",
  " Status",
];
function Range() {
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [prevProducts, setPrevProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProductList(1);
  }, []);

  const getProductList = (values) => {
    console.log("vales>>", values);
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/product/GetAll?page=${values}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setPrevProducts(data.data);
        const array = createArrayWithNumber(data.last_page);
        setTotalPages(data.last_page);
        setPages(array);
      })
      .catch((error) => console.log(error));
  };

  const handleBulkEdit = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    navigate("/dashboard/bulk-edit");
  };
  const handleCheckbox = (e, product) => {
    e.target.checked
      ? setSelectedProducts([...selectedProducts, product])
      : setSelectedProducts(
        selectedProducts.filter((prod) => prod !== product)
      );

    if (selectedProducts.length > 0) {
      setIsBulkEdit(true);
    }
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
      <ActiveProduct />
      <div className="   " style={{ height: "420px", overflowY: "scroll" }}>
        <div className="box-3 px-6 ">
          <SearchProduct
            setProducts={setProducts}
            products={products}
            prevProducts={prevProducts}
          />
        </div>
        <div className="pt-6 px-6 relative">
          <div className="box-4 relative overflow-x-auto overflow-y-auto h-[250px] no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white">
            <CardBody className="p-0">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="p-4 border-y">
                      <div className="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          defaultValue=""
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
                  {products.map((product, index) => {
                    const isLast = index === products.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50 ";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              name={product.title}
                              onClick={(e) => handleCheckbox(e, product)}
                              className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {product.productImage ? (
                              <>
                                <div className="">
                                  <img
                                    src={product.productImage}
                                    alt=""
                                    className="object-cover	"
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
                            <Typography className="font-medium	md:text-base text-sm text-[#637381]">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex w-full items-center justify-between border-t border-blue-gray-50 p-4">
              <PaginationNav1Presentation
                totalPages={totalPages}
                getProductList={getProductList}
              />
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
      </div>
    </>
  );
}

export default Range;
