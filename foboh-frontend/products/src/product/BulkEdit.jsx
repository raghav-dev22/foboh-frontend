import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BulkEditTable from "../BulkEdit/BulkEditTable";
import AlertModal from "../modal/AlertModal";
import Select from "react-select";
import { useFormik } from "formik";
import { addProductSchema } from "../schemas";

import {
  segment,
  subCategory,
  region,
  country,
  baseUnitOfMeasurement,
  innerUnitOfMeasurement,
  options,
} from "../data";
function BulkEdit() {
  const tableItem = [1, 2, 3, 4, 5];

  //   const status = ["Active", "Inactive", "Archived"];

  const handleDepartmentChange = (e) => {
    setValues({
      ...values,
      region: e,
    });
  };
  const initialValues = {
    visibility: false,
    region: [],
    minimumOrder: "",
    trackInventory: false,
    stockAlertLevel: "",
    sellOutOfStock: false,
    title: "",
    skuCode: "",
    brand: "",
    department: "",
    category: "",
    subcategory: "",
    segment: "",
    grapeVariety: [],
    regionSelect: "",
    vintage: "",
    awards: "",
    abv: "",
    country: "",
    baseUnitMeasure: {},
    innerUnitMeasure: {},
    configuration: "",
    description: "",
    tags: [],
    salePrice: null,
    buyPrice: null,
    profit: "",
    margin: "",
    tax: "",
    wineEqualisationTax: "",
    landedUnitCost: "",
    status: ["Active", "Inactive", "Archived"],
  };
  const [department, setDepartment] = useState([]);
  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values.configuration);
      },
    });
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
        <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
          <div className="block">
            <nav className="flex h-[65px] items-center justify-end gap-5 ">
              <button
                className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                onClick={showModal}
              >
                Cancel
              </button>
              <button className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                Save
              </button>
            </nav>
          </div>
        </div>
        <AlertModal show={show} setShow={(set) => setShow(set)} />
      </div>

      <div className="py-8 flex flex-col items-start justify-start px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div className="">
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <div className="">
            <h4 className=" text-2xl font-semibold text-darkGreen">
              Bulk edit
            </h4>
            <p className="text-gray font-normal text-sm">
              Editing X selected products
            </p>
          </div>
        </div>

        <div
          className={`relative overflow-x-auto overflow-y-auto h-80 no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full`}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" border-b">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Configuration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Available stock
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
                  Visibility
                </th>
              </tr>
            </thead>
            <tbody>
              {tableItem.map((product, index) => {
                return (
                  <tr
                    key={product.index}
                    className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${product.index}`}
                  >
                    <th
                      scope="row"
                      className=" whitespace-nowrap dark:text-white"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="email"
                          name="email"
                          id="email-input"
                          className="mt-0   border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
                flex flex-col  items-center 
               p-0
                  outline-none dark:placeholder-[#A0AEC0] 
                    text-[#656e7b]
                "
                          placeholder="test@gmail.com"
                          required=""
                        />
                      </td>
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        className="mt-0  border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
                flex flex-col px-[20px] items-center 
                p-0
                  outline-none dark:placeholder-[#A0AEC0] 
                    text-[#656e7b]
                "
                        placeholder="test@gmail.com"
                        required=""
                      />
                    </td>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={region}
                          value={values.region}
                          onChange={handleDepartmentChange}
                          className="basic-multi-select-1 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        className="mt-0  border-0	w-44	 transition duration-[0.3s]  bg-white  sm:text-sm rounded-[8px]
                flex flex-col px-[20px] items-center 
                p-0
                  outline-none dark:placeholder-[#A0AEC0] 
                    text-[#656e7b]
                "
                        placeholder="test@gmail.com"
                        required=""
                      />
                    </td>

                    <td className="px-6 py-4">
                      {" "}
                      <input
                        type="email"
                        name="email"
                        id="email-input"
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
                          options={region}
                          value={values.region}
                          onChange={handleDepartmentChange}
                          className="basic-multi-select-1 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <p className="text-sm	font-normal		 whitespace-no-wrap text-gray">
                        Visible
                      </p>
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

export default BulkEdit;
