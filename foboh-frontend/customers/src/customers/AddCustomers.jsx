import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import { Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PaginationCustomer } from "./PaginationCustomer";
import createArrayWithNumber from "../../../products/src/helpers/createArrayWithNumbers";
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
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [tableRecords, setTableRecords] = useState([]);
  const[prevCustomer,setPrevCustomer]=useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBulkEdit, setIsBulkEdit] = useState(false);
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
    // Call the debounced function
    handleDebounce(newValue);
  };
  useEffect(() => {
    callApi(page);
  }, []);
  const callApi = (item) => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/GetAll?page=${item}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("user data --->", data);
        setTableRecords(data.data);
        setPrevCustomer(data.data)
        const array = createArrayWithNumber(data.last_page);
        setTotalPages(data.last_page);
        setPages(array);
      });
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
    e.target.checked
      ? setSelectedProducts([...selectedProducts, product])
      : setSelectedProducts(
        selectedProducts.filter((prod) => prod !== product)
      );

    if (selectedProducts.length > 0) {
      setIsBulkEdit(true);
    }
  };
  const handleBulkEdit = () => {
    localStorage.setItem("selectedCustomers", JSON.stringify(selectedProducts));
  };
  // const isFilter = (item) => {
  //   console.log("Filter values", item)
  //   const debounceTimeout = setTimeout(() => {
  //     callFilterApi(item);
  //   }, 500);
  // };
  // const callFilterApi = (item) => {
  
  //   fetch(
  //     `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Filter`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(item),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("user data --->", data);
  //       setTableRecords(data.data);
  //     });
  // };

  return (
    <>
      <ActiveCustomers />
      <div className="   " style={{ height: "503px", overflowY: "scroll" }}>
        <div className="box-3 px-6 ">
          <SearchCustomer 
           setProducts={setTableRecords}
           products={tableRecords}
           prevProducts={prevCustomer}
          />
        </div>
        <div className="pt-6 px-6 relative">
          <div className="box-4 relative overflow-x-auto overflow-y-auto h-[250px] no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white">
            <CardBody className="p-0">
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
                          className="font-medium leading-none text-base text-[#2B4447]"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRecords.map((item, index) => {
                    const isLast = index === tableRecords.length - 1;
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
                              defaultValue=""
                              onClick={(e) => handleCheckbox(e, item)}
                              className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                            />
                            <div onClick={() => handleCustomerId(item)}>
                              <Typography className="font-medium	md:text-base text-sm text-[#637381]">
                                {item?.businessName}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            {item?.orderingEmail}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="font-normal md:text-base text-sm text-[#637381]">
                            {item?.address}
                            {item?.state}
                          </Typography>
                        </td>
                        <td className={classes}>
                          {item?.isActive === 1 ? (
                            <div className="flex justify-center items-center gap-1 radius-20 bg-custom-green h-7	w-32		px-3">
                              <p className="text-green-dark font-normal		text-sm	">
                                Active
                              </p>
                            </div>
                          ) : (
                            <div className="flex justify-center items-center gap-1 radius-20 bg-custom-red h-7	w-32		px-3">
                              <p
                                style={{ color: "#FFA70B" }}
                                className="text-red-dark font-normal		text-sm	"
                              >
                                Inactive
                              </p>
                            </div>
                          )}
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal capitalize"
                              >
                                {10} orders
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {/* {expiry} */}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            ${10 * 10}
                          </Typography>
                        </td>
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
