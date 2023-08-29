import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CustomerBulkEdit() {
  const navigate = useNavigate();
  const values = [
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
    {
      jhashd: "hbhsad",
      jhashd: "hbhsad",
      jhashd: "hbhsad",
    },
  ];

  return (
    <>
      <div className="py-8 flex flex-col items-start justify-start px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={() => navigate("/dashboard/customers")}
            className="cursor-pointer"
          >
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <div className="">
            <h4 className=" text-2xl font-semibold text-darkGreen">
              Customer Bulk edit
            </h4>
            <p className="text-gray font-normal text-sm">
              Editing X selected products
            </p>
          </div>
        </div>
        <div
          className={`relative overflow-x-auto overflow-y-auto no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full`}
          style={{ height: "530px" }}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" border-b">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Region
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Orders{" "}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Amount spent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Visibility
                </th>
              </tr>
            </thead>
            <tbody>
              {values.map((product, index) => {
                return (
                  <tr
                    key={index.toString()}
                    className={`bg-white border-b  dark:border-gray-700   tableNo-${index}`}
                  >
                    <th
                      scope="row"
                      className=" whitespace-nowrap dark:text-white"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="title"
                          value="hnisdh"
                          // onChange={(e) =>
                          //   handleFieldChange(
                          //     product.productId,
                          //     "title",
                          //     e.target.value
                          //   )
                          // }
                          id="title"
                          className="mt-0   border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
              flex flex-col  items-center 
             p-0
                outline-none dark:placeholder-[#A0AEC0] 
                  text-[#656e7b]
              "
                          placeholder="Good Intentions 'Cape Jaffa' Chardonnay"
                        />
                      </td>
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="skuCode"
                        value="hjhjsxn"
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     product.productId,
                        //     "skuCode",
                        //     e.target.value
                        //   )
                        // }
                        id="skuCode"
                        className="mt-0  border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
              flex flex-col px-[20px] items-center 
              p-0
                outline-none dark:placeholder-[#A0AEC0] 
                  text-[#656e7b]
              "
                        placeholder="GOODINTC22"
                      />
                    </td>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          // options={configurations}
                          value="jnsjdh"
                          // onChange={(e) =>
                          //   handleFieldChange(
                          //     product.productId,
                          //     "configuration",
                          //     e
                          //   )
                          // }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="salePrice"
                        value={product.salePrice}
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     product.productId,
                        //     "salePrice",
                        //     e.target.value
                        //   )
                        // }
                        id="salePrice"
                        className="mt-0  border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
              flex flex-col px-[20px] items-center 
              p-0
                outline-none dark:placeholder-[#A0AEC0] 
                  text-[#656e7b]
              "
                        placeholder="$330.00"
                        required=""
                      />
                    </td>

                    <td className="px-6 py-4">
                      {" "}
                      <input
                        type="text"
                        name="stockAlertLevel"
                        id="stockAlertLevel"
                        value={product.stockAlertLevel}
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     product.productId,
                        //     "stockAlertLevel",
                        //     e.target.value
                        //   )
                        // }
                        className="mt-0  border-0 w-44 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
              flex flex-col px-[20px] items-center 
              p-0
                outline-none dark:placeholder-[#A0AEC0] 
                  text-[#656e7b]
              "
                        placeholder="test@gmail.com"
                        required=""
                      />
                    </td>
                    <td className="px-6 py-4 relative ">
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={status}
                          value={product.status}
                          // onChange={(e) =>
                          //   handleFieldChange(product.productId, "status", e)
                          // }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <Select
                        name="colors"
                        // options={visibility}
                        value="jhnsd"
                        // onChange={(e) =>
                        //   handleFieldChange(product.productId, "visibility", e)
                        // }
                        className="basic-multi-select-1 "
                        classNamePrefix="select"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default CustomerBulkEdit;
