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
      {orderDetails.map((value, index) => {
        return (
          <tr className={`orderNo-${index}`}>
            <td className="px-4 py-4 border-b border-gray-200 text-base ">
              <h5 className="sm:font-normal font-light text-xs sm:text-sm whitespace-no-wrap text-gray">
                {value.orderId}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-semibold  font-semibold   text-xs    sm:text-sm   whitespace-no-wrap text-gray">
                {value.customerName}
              </h5>

              <p className="text-xs   sm:text-sm sm:font-normal font-light        text-gray"></p>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal font-light    text-xs sm:text-sm   whitespace-no-wrap text-gray">
                {value.payAmountLong}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal   text-xs sm:text-sm whitespace-no-wrap text-gray">
                {formatDate(value.orderEntryDate)}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              {value.orderStatus}
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <div>
                <span
                  onClick={() => handleClick(value.orderId)}
                  className="border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium"
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
