import React from "react";

function OrderDetails() {
  const orderItem = [
    {
      CustomerId: "#LF1001024",

      Customer: "The Union Hotel",

      subtitle: " jack@union.com",

      Amount: "$450.10",

      DeliveryDate: "25 Dec 2023",

      Status: (
        <span className="dotcircle  bg-[#4A6CF714] text-[#4A6CF7] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#4A6CF714] dark:text-[#4A6CF7]">
          New
        </span>
      ),

      ActionRequired: (
        <span className="border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium ">
          Review Order
        </span>
      ),
    },

    {
      CustomerId: "#LF1001023",

      Customer: "The Union Hotel",

      subtitle: " jack@union.com",

      Amount: "$350.60",

      DeliveryDate: "25 Dec 2023",

      Status: (
        <span className=" dotcircle pending-bg bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Pending
        </span>
      ),

      ActionRequired: (
        <span className="border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium ">
          View Order
        </span>
      ),
    },

    {
      CustomerId: "#LF1001022",

      Customer: "Red Bottle",

      subtitle: " orders@redbottle.com",

      Amount: "$1000.60",

      DeliveryDate: "25 Dec 2023",

      Status: (
        <span className="dotcircle pending-bg bg-[#FFA70B14] text-[#FFA70B] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#FFA70B14] dark:text-[#FFA70B]">
          Pending
        </span>
      ),

      ActionRequired: (
        <span className="border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium">
          View Order
        </span>
      ),
    },

    {
      CustomerId: "#LF1001022",

      Customer: "Red Bottle",

      subtitle: "  orders@redbottle.com",

      Amount: "$1000.60",

      DeliveryDate: "25 Dec 2023",

      Status: (
        <span className="dotcircle cancel-bg bg-[#D3405314] text-[#DC3545] text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-[#D3405314] dark:text-[#DC3545]">
          Cancelled
        </span>
      ),
    },
  ];

  return (
    <>
      {orderItem.map((value, index) => {
        return (
          <tr className={`orderNo-${index}`}>
            <td className="px-4 py-4 border-b border-gray-200 text-base ">
              <h5 className="sm:font-normal font-light    text-xs sm:text-sm       whitespace-no-wrap text-gray">
                {value.CustomerId}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-semibold  font-semibold   text-xs    sm:text-sm   whitespace-no-wrap text-gray">
                {value.Customer}
              </h5>

              <p className="text-xs   sm:text-sm sm:font-normal font-light        text-gray">
                {value.subtitle}
              </p>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal font-light    text-xs sm:text-sm   whitespace-no-wrap text-gray">
                {value.Amount}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <h5 className="sm:font-normal   text-xs sm:text-sm whitespace-no-wrap text-gray">
                {value.DeliveryDate}
              </h5>
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              {value.Status}
            </td>

            <td className="px-4 py-4 border-b border-gray-200   ">
              <a className="no-underline" href="#">
                <div>
                  {/* <h6 className="text-darkGreen">Review order</h6> */}

                  {value.ActionRequired}
                </div>
              </a>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default OrderDetails;
