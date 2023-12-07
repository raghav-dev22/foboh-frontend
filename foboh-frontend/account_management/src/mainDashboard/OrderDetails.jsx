import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers/Dateformate";

function OrderDetails({ orderDetails }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/dashboard/order-details/${id}`);
  };

  return (
    <>
      {orderDetails?.map((value, index) => {
        return (
          <tr key={index} className={`orderNo-${index}`}>
            <td className="px-4 py-4 border-b border-gray-200 text-base ">
              <h5 className="sm:font-normal font-light text-xs sm:text-sm whitespace-no-wrap text-gray">
                {value?.orderId}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-semibold font-semibold text-xs sm:text-sm whitespace-no-wrap text-gray">
                {value?.businessName}
              </h5>

              <p className="text-xs sm:text-sm sm:font-normal font-light text-gray">
                {" "}
                ({value?.customerName})
              </p>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal font-light text-xs sm:text-sm whitespace-no-wrap text-gray">
                ${value?.payAmountLong}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal  text-xs sm:text-sm whitespace-no-wrap text-gray">
                {formatDate(value?.orderEntryDate)}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <div
                className="rounded-md flex justify-center px-2 py-1"
                style={{
                  backgroundColor: (() => {
                    if (
                      value.orderStatus === "Complete" ||
                      value?.orderStatus === "Delivered"
                    ) {
                      return "#CFEBE6";
                    } else if (
                      value?.orderStatus === "Pending" ||
                      value?.orderStatus === "InProcess" ||
                      value?.orderStatus === "Processing"
                    ) {
                      return "#F8F1E5";
                    } else if (value?.orderStatus === "Updated") {
                      return "#D5EEFF";
                    } else if (value?.orderStatus === "Cancelled") {
                      return "#FFDFDB";
                    } else if (value?.orderStatus === "New") {
                      return "#F1F3FE";
                    }
                    // Default background color if none of the conditions match
                    return "transparent";
                  })(),
                  color: (() => {
                    if (
                      value.orderStatus === "Complete" ||
                      value?.orderStatus === "Delivered"
                    ) {
                      return "#CFEBE6";
                    } else if (
                      value?.orderStatus === "Pending" ||
                      value?.orderStatus === "InProcess" ||
                      value?.orderStatus === "Processing"
                    ) {
                      return "#FFA70B";
                    } else if (value?.orderStatus === "Updated") {
                      return "#D5EEFF";
                    } else if (value?.orderStatus === "Cancelled") {
                      return "#D34053";
                    } else if (value?.orderStatus === "New") {
                      return "#4A6CF7";
                    }
                    // Default background color if none of the conditions match
                    return "transparent";
                  })(),
                }}
              >
                {value.orderStatus}
              </div>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <div>
                <span
                  onClick={() => handleClick(value.orderId)}
                  className="cursor-pointer border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium"
                >
                  Review Order
                </span>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default OrderDetails;
