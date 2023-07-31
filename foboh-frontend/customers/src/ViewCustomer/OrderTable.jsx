import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function OrderTable() {
  const tableItem = Array.from({ length: 8 });

  return (
    <>
      {tableItem.map((product, index) => {
        return (
          <tr
            key={index}
            className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${index}`}
          >
            <td className=" px-6 py-4 ">
              <h5 className="font-medium whitespace-no-wrap text-gray">
                {" "}
                #LF1001024
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                {" "}
                $450.10
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                25 Dec 2023
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                Today
              </h5>
            </td>

            <td className="px-6 py-4">
              {" "}
              <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                <p className="text-green-dark font-normal		text-sm	">New</p>
              </div>
            </td>
            <td className="px-6 py-4 ">
              <ChevronRightIcon />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default OrderTable;
