import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BulkEditTable from "../BulkEdit/BulkEditTable";
import CloseIcon from "@mui/icons-material/Close";
import AlertModal from "../modal/AlertModal";
import Select from "react-select";
import { Button, message } from "antd";
import useUnsavedChangesWarning from "../helpers/useUnsavedChangesWarning";
import { useFormik } from "formik";
import { addProductSchema } from "../schemas";
import { useLocation } from "react-router-dom";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useNavigate } from "react-router-dom";
import UnSavedModal from "../modal/UnSavedModal";
import { getBaseUnitMeasure } from "../helpers/getBaseUnitOfMeasure";
import { getInnerUnitMeasure } from "../helpers/getInnerUnitMeasure";

let baseUnitOfMeasureList = [];
let innerUnitOfMeasureList = [];

let initialValues = [
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

function BulkEdit() {
  const location = useLocation();
  const [unSaved, setUnSaved] = useState(false);
  const [productTable, setProductTable] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [Prompt, setDirty, setPrestine] = useUnsavedChangesWarning();
  const [initialValues, setInitialValues] = useState([{}]);
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

  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {},
    });

  const handleSubmit = () => {
    message.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Products saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });

    fetch(
      `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/UpdateProductBulkData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          values.map((product) => {
            return {
              productId: product?.productId,
              title: product?.title,
              skUcode: product?.skuCode,
              unitofMeasure: product?.baseUnitMeasure?.label,
              innerUnitofMeasure: product?.innerUnitMeasure?.label,
              globalPrice: product?.salePrice,
              configuration: product?.configuration,
              availableQty: product?.stockAlertLevel,
              visibility: product?.visibility?.value === 1 ? "1" : "0",
              productStatus: product?.status?.label,
            };
          })
        ),
      }
    )
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("selectedProducts");
          navigate("/dashboard/products");
        }
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

    const selectedProductsValue = selectedProducts.map((product) => {
      const [state] = status.filter(
        (state) =>
          state?.label.toLowerCase() === product?.productStatus.toLowerCase()
      );

      const visibleFlag = product?.visibility;

      const [visible] = visibility.filter((visibilityObj) => {
        if (visibleFlag) {
          return visibilityObj?.label.toLowerCase() === "visible";
        } else {
          return visibilityObj?.label.toLowerCase() === "hidden";
        }
      });

      return {
        title: product?.title || "",
        skuCode: product?.skUcode || "",
        baseUnitMeasure: product.unitofMeasure || "",
        innerUnitMeasure: product.innerUnitofMeasure || "",
        configuration: product?.configuration || "",
        salePrice: product?.globalPrice || "",
        stockAlertLevel: product?.stockThreshold || "",
        status: state || "",
        visibility: visible || "",
        productId: product?.productId || "",
      };
    });

    setInitialValues(selectedProductsValue);
    setValues(selectedProductsValue);
    asyncFunction();
  }, []);

  const asyncFunction = async () => {
    const innerUnitMeasureData = await getInnerUnitMeasure();
    const baseUnitMeasureData = await getBaseUnitMeasure();

    innerUnitOfMeasureList = innerUnitMeasureData.map((item) => {
      return {
        label: `${item.unit} ${item.type}`,
        value: item.unit,
        key: item.type,
      };
    });

    baseUnitOfMeasureList = baseUnitMeasureData.map((item) => {
      return {
        label: `${item.unit} ${item.type}`,
        value: item.unit,
        key: item.type,
      };
    });

    setValues((prev) => {
      return prev.map((product) => {
        const ium = innerUnitOfMeasureList.find(
          (item) => item.label === product.innerUnitMeasure
        );

        const bum = baseUnitOfMeasureList.find(
          (item) => item.label === product.baseUnitMeasure
        );
        return {
          ...product,
          innerUnitMeasure: ium === undefined ? product.innerUnitMeasure : ium,
          baseUnitMeasure: bum === undefined ? product.unitofMeasure : bum,
        };
      });
    });
  };

  const handleFieldChange = (productId, title, value) => {
    console.log(title, value);
    setIsUpdate(true);

    setValues((values) => {
      const updatedProducts = values.map((product) => {
        if (product.productId === productId && title === "baseUnitMeasure") {
          return {
            ...product,
            baseUnitMeasure: value,
            configuration: `(${value?.value} x ${product.innerUnitMeasure?.value}) ${product.innerUnitMeasure?.key}`,
          };
        } else if (
          product.productId === productId &&
          title === "innerUnitMeasure"
        ) {
          return {
            ...product,
            innerUnitMeasure: value,
            configuration: `(${product.baseUnitMeasure?.value} x ${value?.value}) ${value?.key}`,
          };
        } else if (product.productId === productId) {
          return { ...product, [title]: value };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleCancle = () => {
    setIsUpdate(false);
    setValues(initialValues);
  };
  const backBtn = () => {
    setUnSaved(true);
  };

  return (
    <>
      {isUpdate && (
        <div className="2xl:mx-auto absolute z-50 top-0 right-0 left-0">
          <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
            <div className="block">
              <nav className="flex h-[65px] items-center justify-end gap-5 ">
                <button
                  className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
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

      <div className="padding-top-custom flex flex-col items-start  px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div onClick={backBtn} className="cursor-pointer">
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <div className="">
            <h4 className=" text-2xl font-semibold text-darkGreen">
              Bulk edit
            </h4>
            <p className="text-gray font-normal text-sm">
              Editing {values?.length} selected products
            </p>
          </div>
        </div>

        <div
          className={`relative overflow-x-auto overflow-y-auto custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full`}
          style={{ height: "600px" }}
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
              {values?.map((product, index) => {
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
                          options={baseUnitOfMeasureList}
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
                          options={innerUnitOfMeasureList}
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
      <UnSavedModal
        open={unSaved}
        onOk={() => {
          setUnSaved(false);
        }}
        onCancel={() => {
          setUnSaved(false);
        }}
      />
    </>
  );
}

export default BulkEdit;
