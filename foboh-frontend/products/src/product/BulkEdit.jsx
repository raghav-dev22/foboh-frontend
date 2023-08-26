import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BulkEditTable from "../BulkEdit/BulkEditTable";
import AlertModal from "../modal/AlertModal";
import Select from "react-select";
import { useFormik } from "formik";
import { addProductSchema } from "../schemas";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  segment,
  subCategory,
  region,
  country,
  baseUnitOfMeasurement,
  innerUnitOfMeasurement,
  options,
  configurations,
} from "../data";
import { useNavigate } from "react-router-dom";
function BulkEdit() {
  const [productTable, setProductTable] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const status = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
    { value: 3, label: "Archived" },
  ];

  const visibility = [
    { value: 1, label: "Visible" },
    { value: 2, label: "Hidden" },
  ];

  const handleDepartmentChange = (e) => {
    setValues({
      ...values,
      region: e,
    });
  };
  const initialValues = [
    {
      visibility: false,
      region: [],
      minimumOrder: "",
      trackInventory: false,
      stockAlertLevel: "",
      sellOutOfStock: false,
      title: "",
      skuCode: "",
      productId: "",
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
    },
  ];

  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const handleSubmit = () => {
    fetch(
      `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/UpdateProductBulkData`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          values.map((product) => {
            return {
              productId: product.productId,
              title: product.title,
              skUcode: product.skuCode,
              unitofMeasure: product?.baseUnitMeasure?.label,
              innerUnitofMeasure: product?.innerUnitMeasure?.label,
              globalPrice: product.salePrice,
              buyPrice: product.buyPrice,
              configuration: product.configuration,
              availableQty: product.stockAlertLevel,
              visibility: product.visibility.label === "Visible" ? true : false,
              productStatus: product.status.label,
            };
          })
        ),
      }
    )
      .then((response) => {
        response.json()
      })
      .then((data) => {
        console.log("response data:", data);
        localStorage.removeItem("selectedProducts");
        navigate("/dashboard/products");
      })
      .catch((error) => console.log(error));
  };

  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };

  useEffect(() => {
    const selectedProducts = JSON.parse(
      localStorage.getItem("selectedProducts")
    );

    console.log(
      "selectedProducts:",
      JSON.parse(localStorage.getItem("selectedProducts"))
    );

    const selectedProductsValue = selectedProducts.map((product) => {
      const [state] = status.filter(
        (state) =>
          state.label.toLowerCase() === product.stockStatus.toLowerCase()
      );

      const visibleFlag = product.visibility;

      const [visible] = visibility.filter((visibilityObj) => {
        if (visibleFlag) {
          return visibilityObj.label.toLowerCase() === "visible";
        } else {
          return visibilityObj.label.toLowerCase() === "hidden";
        }
      });

      const bum = baseUnitOfMeasurement.find(
        (bumObj) => bumObj.value.toString() === product.unitofMeasure
      );
      const ium = innerUnitOfMeasurement.find(
        (iumObj) => iumObj.value.toString() === product.innerUnitofMeasure
      );
      console.log("bum --->", bum);
      console.log("ium --->", ium);

      const configuration = {};

      return {
        title: product.title,
        skuCode: product.skUcode,
        baseUnitMeasure: bum,
        innerUnitMeasure: ium,
        configuration: product.configuration,
        salePrice: product.globalPrice,
        stockAlertLevel: product.stockThreshold,
        status: state,
        visibility: visible,
        productId: product.productId,
      };
    });

    setValues(selectedProductsValue);
  }, []);

  const handleFieldChange = (productId, title, value) => {
    setIsUpdate(true);

    setValues((values) => {
      const updatedProducts = values.map((product) => {
        if (product.productId === productId && title === "baseUnitMeasure") {
          return {
            ...product,
            baseUnitMeasure: value,
            configuration: `${product.innerUnitMeasure.value} x ${value.label}`,
          };
        } else if (product.productId === productId && title === "innerUnitMeasure") {
          return {
            ...product,
            innerUnitMeasure: value,
            configuration: `${value.value} x ${product.baseUnitMeasure.label}`,
          };
        } else if (product.productId === productId ) {
          return {...product,  [title]: value  }
        }
        return product;
      });
      return updatedProducts;
    });
  };

  console.log("values", values);

  const handleIsUpdate = () => {};

  return (
    <>
      {isUpdate && (
        <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
          <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
            <div className="block">
              <nav className="flex h-[65px] items-center justify-end gap-5 ">
                <button className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                >
                  Save
                </button>
              </nav>
            </div>
          </div>
          <AlertModal show={show} setShow={(set) => setShow(set)} />
        </div>
      )}

      <div className="py-8 flex flex-col items-start justify-start px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={() => navigate("/dashboard/products")}
            className="cursor-pointer"
          >
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
                  Base unit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Inner unit
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
              {values.map((product, index) => {
                return (
                  <tr
                    key={index.toString()}
                    className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${index}`}
                  >
                    <th
                      scope="row"
                      className=" whitespace-nowrap dark:text-white"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="title"
                          value={product.title}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "title",
                              e.target.value
                            )
                          }
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
                        value={product.skuCode}
                        onChange={(e) =>
                          handleFieldChange(
                            product.productId,
                            "skuCode",
                            e.target.value
                          )
                        }
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
                      <div className="w-44 flex justify-between items-center">
                        <Select
                          name="colors"
                          options={baseUnitOfMeasurement}
                          value={product.baseUnitMeasure}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "baseUnitMeasure",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                        {/* <KeyboardArrowDownIcon /> */}
                      </div>
                    </td>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44 flex justify-between items-center">
                        <Select
                          name="colors"
                          options={innerUnitOfMeasurement}
                          value={product.innerUnitMeasure}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "innerUnitMeasure",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                        {/* <KeyboardArrowDownIcon /> */}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={(e) =>
                          handleFieldChange(
                            product.productId,
                            "salePrice",
                            e.target.value
                          )
                        }
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
                        onChange={(e) =>
                          handleFieldChange(
                            product.productId,
                            "stockAlertLevel",
                            e.target.value
                          )
                        }
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
                          onChange={(e) =>
                            handleFieldChange(product.productId, "status", e)
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <Select
                        name="colors"
                        options={visibility}
                        value={product.visibility}
                        onChange={(e) =>
                          handleFieldChange(product.productId, "visibility", e)
                        }
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

export default BulkEdit;
