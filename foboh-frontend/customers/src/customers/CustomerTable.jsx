import React from "react";

function CustomerTable() {
  const tableItem = Array.from({ length: 8 });
  return (
    <>
      {tableItem.map((item, index) => {
        return (
          <tr
            key={index}
            className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${index}`}
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>

            <th
              scope="row"
              className="flex justify-center items-center gap-3 px-6 py-4 whitespace-nowrap dark:text-white"
            >
              <img
                src="/assets/defaultRange.png"
                alt=""
                className=" mx-auto object-contain	"
              />

              <h5 className="font-normal	 whitespace-no-wrap text-gray">
                {" "}
                Banks Fine Wine
              </h5>
            </th>
            <td className="px-6 py-4">
              <h5 className="font-medium whitespace-no-wrap text-gray">
                {" "}
                Jane Don{" "}
              </h5>
              <p className="text-gray font-normal text-sm">
                orders@banks.com.au
              </p>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal	 whitespace-no-wrap text-gray">
                Paddington, NSW
              </h5>
            </td>
            <td className="px-6 py-4">
              {" "}
              <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                <p className="text-green-dark font-normal		text-sm	">Active</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal	 whitespace-no-wrap text-gray">
                10 orders
              </h5>
            </td>
            {/* <td className="px-6 py-4"><h5 className="font-normal	 whitespace-no-wrap text-gray">Yes</h5></td>
            <td className="px-6 py-4"><h5 className="font-normal	 whitespace-no-wrap text-gray">$2999</h5></td> */}

            <td className="px-6 py-4 ">
              <p className="text-sm	font-normal		 whitespace-no-wrap text-gray">
                $5600
              </p>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default CustomerTable;
