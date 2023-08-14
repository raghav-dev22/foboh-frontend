import React, { useEffect, useState } from "react";

import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import CustomerTable from "./CustomerTable";
import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const TABLE_HEAD = ["Name", "Contact", "Region", "Status", "Orders", "Amount spent", "Action"];
function AddCustomers() {
  const navigate = useNavigate();
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  const [lastPage, setlasetPage] = React.useState();
  const [tableRecords, setTableRecords] = useState([])
  const [page, setPage] = React.useState(1);
  const [inputValue, setInputValue] = useState('');
  // Create a variable to store the timeout ID
  let timeoutId;
  // Function to handle the debounced action
  const handleDebounce = (value) => {
    // Clear the previous timeout if it exists
    clearTimeout(timeoutId);
    // Set a new timeout
    timeoutId = setTimeout(() => {
      // Perform the action here (e.g., API call, state update)
      console.log('Performing action with value:', value);
      setInputValue(value)
      searchApi(value)
    }, 300); // Adjust the delay time as needed
  };
  // Event handler for input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // Call the debounced function
    handleDebounce(newValue);
  };
  useEffect(() => {
    callApi(page)
  }, [])
  const callApi = (item) => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/GetAll?page=${item}`,
      {
        method: "GET",
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log("user data --->", data);
        setTableRecords(data.data)
      })
  }
  const onButtonClick = (item) => {
    switch (item) {
      case 'previous':
        let newItme = page > 0 ? page - 1 : 1;
        setPage(newItme);
        callApi(newItme)
        break;
      case 'next':
        let newItmes = page + 1
        setPage(newItmes);
        callApi(newItmes)

      default:
        break;
    }
  }
  const handleCustomerId = (item) => {
    navigate(`/dashboard/view-customer-details/`, { state: { data: item } });
  };

  const searchApi = () => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/SearchByName?search=${inputValue}&page=1`,
      {
        method: "GET",
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log("user data --->", data);
        setTableRecords(data.data)
      })
  }

  const itemDelected = (item) => {
    console.log("item>>", item)
    // https://fobohwepapifbh.azurewebsites.net/api/Customer/Delete/64b6bdd4a631d5f7b9058af9
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/Delete/${item?.id}`,
      {
        method: "DELETE",
      }
    ).then((response) =>callApi('1') )
  }
  return (
    <>
      <ActiveCustomers />
      <div className="   ">
        <div className="box-3 px-6 ">
          <SearchCustomer onChange={handleInputChange} />
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
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div onClick={() => handleCustomerId(item)}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item?.businessName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.orderingEmail}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.address}{item?.state}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {item?.isActive === 1 ?
                        <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                          <p className="text-green-dark font-normal		text-sm	">Active</p>
                        </div> :
                        <div className="flex justify-center items-center gap-1 radius-30 bg-custom-red h-7	w-32		px-3">
                          <p className="text-red-dark font-normal		text-sm	">InActive</p>
                        </div>}

                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">

                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {10}
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
                        {10 * 10}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div onClick={() => itemDelected(item)}>
                        <DeleteIcon />
                      </div>
                    </td>
                  </tr>
                );
              },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button disabled={page === '1' ? true : false} variant="outlined" onClick={() => onButtonClick('previous')} size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton onClick={() => callApi('1')} variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton onClick={() => callApi('2')} variant="text" size="sm">
              2
            </IconButton>
            <IconButton onClick={() => callApi('3')} variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
          </div>
          <Button onClick={() => onButtonClick('next')} variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </div>
    </>
  );
}

export default AddCustomers;
