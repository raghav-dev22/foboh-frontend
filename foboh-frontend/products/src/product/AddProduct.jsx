import React, { Fragment, useEffect, useState } from "react";
import AddProductListing from "../addProduct/AddProductListing";

import UploadImg from "../addProduct/UploadImg";
import AddInventory from "../addProduct/AddInventory";
import AddProductDetails from "../addProduct/AddProductDetails";
import AddPricingDetails from "../addProduct/AddPricingDetails";
import AddProductHeader from "../addProduct/AddProductHeader";
import ProductEditHeader from "../components/ProductEditHeader";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useFormik } from "formik";
import { Combobox, Transition } from "@headlessui/react";
import { addProductSchema } from "../schemas";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

import {
  segment,
  subCategory,
  region,
  country,
  baseUnitOfMeasurement,
  innerUnitOfMeasurement,
  options,
} from "../data";
import { Box } from "@mui/material";

const initialValues = {
  visibility: "0",
  region: [],
  minimumOrder: 0,
  trackInventory: false,
  stockAlertLevel: 0,
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
  vintage: 0,
  awards: "",
  abv: "",
  country: "",
  baseUnitMeasure: "",
  innerUnitMeasure: "",
  configuration: "",
  description: "",
  tags: "",
  salePrice: "",
  buyPrice: "",
  profit: "",
  margin: "",
  tax: "",
  availableQty: "",
  wineEqualisationTax: 0,
  landedUnitCost: 0,
  status: "",
};

const status = ["Active", "Inactive", "Archived"];

function AddProduct() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isWine, setIsWine] = useState(false);
  const [Stock, setStock] = useState(false);
  const [isWet, setIsWet] = useState(false);
  const [isAlcoholicBeverage, setIsAlcoholicBeverage] = useState(false);
  const [checkGST, setCheckGST] = useState(false);
  const [checkWET, setCheckWET] = useState(false);
  const [salePriceCopy, setSalePriceCopy] = useState(null);
  const [profitCopy, setProfitCopy] = useState(null);
  const [marginCopy, setMarginCopy] = useState(null);
  const [variety, setVariety] = useState([]);
  const [tag, setTag] = useState([]);
  const [country, setCountry] = useState([]);

  const {
    values,
    errors,
    setErrors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductSchema,
    onSubmit: (values) => {
      console.log(values);
      const organisationId = localStorage.getItem("organisationId");

      fetch(
        "https://product-fobohwepapi-fbh.azurewebsites.net/api/product/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            award: values.awards,
            articleId: 0,
            skUcode: values.skuCode,
            productImageUrls: [],
            unitofMeasure: values.baseUnitMeasure.value.toString(),
            innerUnitofMeasure: values.innerUnitMeasure.value.toString(),
            configuration: values.configuration,
            brand: values.brand,
            region: values.regionSelect ? values.regionSelect.label : "",
            trackInventory: values.trackInventory,
            departmentId: values.department.value,
            categoryId: values.category.value,
            subCategoryId: values.subcategory.value,
            segmentId: values.segment.value ? values.segment.value : "",
            variety: values.grapeVariety.map((item) => {
              return item.label;
            }),
            vintage: values?.vintage ? values?.vintage : 0,
            abv: values.abv,
            globalPrice: values?.salePrice,
            luCcost: values?.landedUnitCost,
            buyPrice: values?.buyPrice,
            gstFlag: checkGST,
            wetFlag: checkWET,
            availableQty: values.availableQty,
            stockThreshold: values.stockAlertLevel,
            stockStatus: values.status,
            regionAvailability: values.region,
            productStatus: values.status,
            visibility: values.visibility,
            sellOutOfStock: values.sellOutOfStock,
            minimumOrder: values.minimumOrder,
            tags: values.tags.map((item) => {
              return item.label;
            }),
            countryOfOrigin: values.country.label,
            barcodes: "string",
            esgStatus: "string",
            healthRating: "string",
            organisationId: organisationId,
            isActive: true,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("productAdded", true);
          console.log("Success >>>", data);
          setShow(false);

          navigate("/dashboard/products");
        })
        .catch((error) => console.log(error));
    },
  });

  console.log("err ->", errors);

  const handleReset = () => {
    setShow(false);
    setSelectedState("");
    setValues({
      ...initialValues,
      buyPrice: "",
      salePrice: "",
      region: [],
      newVisibility: [],
    });
    setCheckGST(false);
    setCheckWET(false);
  };

  console.log(values, "ggggggggggggggggggggggg");

  // Handle product image
  const handleProductImage = (e) => {
    alert("You need to save this product first");
    const files = e.target.files;
    console.log("files -->", files);
    if (files.length) {
      files.length = files.length > 3 && 3;
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files[]", file);
      });

      fetch(
        `https://product-api-foboh.azurewebsites.net/api/Product/uploadproductimages?productId=${id}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };

  //  Handlers ---START
  const [selectedState, setSelectedState] = useState("");

  const regionAvailability = [
    "NSW",
    "VIC",
    "QLD",
    "WA",
    "SA",
    "TAS",
    "ACT",
    "NT",
  ];

  const status = ["Active", "Inactive", "Archived"];

  // Product Availability
  const handleVisibility = (e) => {
    console.log("handle visibility", e);

    const checked = e.target.checked;
    let newVisibility;

    checked ? (newVisibility = "1") : (newVisibility = "0");

    setValues({
      ...values,
      visibility: newVisibility,
    });
  };

  // Region Availability
  const handleRegionAvailability = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      if (!values.region.includes(e.target.value)) {
        setValues({
          ...values,
          region: [...values.region, e.target.value],
        });
      }
    } else {
      setValues({
        ...values,
        region: values.region.filter((region) => region !== e.target.value),
      });
    }
  };

  // status
  const handleStateSelection = (event) => {
    console.log("status --->", event.target.value);
    setSelectedState(event.target.value);
    console.log(selectedState, "value");
    setValues({
      ...values,
      status: event.target.value,
    });
  };
  //  Handlers ---END

  // Inventory ----START
  const handleMinimumOrderQuantity = (e) => {
    const inputValue = parseInt(e.target.value, 10);

    setValues({
      ...values,

      minimumOrder: Math.max(0, inputValue),
    });
  };

  const handleAvailableQuantity = (e) => {
    const inputValue = parseInt(e.target.value, 10);

    setValues({
      ...values,

      availableQty: Math.max(0, inputValue),
    });
  };

  const handleTrackInventory = () => {
    setValues({
      ...values,
      trackInventory: !values.trackInventory,
    });
    if (values.trackInventory === false) {
      setStock(true);
    } else {
      setStock(false);
    }
    console.log(values.trackInventory, "hhhhhhhhh");
  };

  const handleStockAlertLevel = (e) => {
    const inputValue = parseInt(e.target.value, 10);

    setValues({
      ...values,

      stockAlertLevel: Math.max(0, inputValue),
    });

    console.log(values.stockAlertLevel);
  };

  const handleSellOutOfStock = () => {
    setValues({
      ...values,
      sellOutOfStock: !values.sellOutOfStock,
    });
    console.log(values.sellOutOfStock);
  };
  // Inventory ----END

  // Product Details ----START
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [segment, setSegment] = useState([]);

  const handleDepartmentChange = (e) => {
    setValues({
      ...values,
      department: e,
    });
    setShow(true);
    // ?DepartmentId=${e.value}
    fetch(`https://masters-api-foboh.azurewebsites.net/api/Category/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("category --->", data);
        if (data.success) {
          setCategory(
            data.data.map((i) => {
              return {
                value: i.categoryId,
                label: i.categoryName,
              };
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryChange = (e) => {
    const item = e.label;
    const itemId = e.value;

    if (item.toLowerCase() === "alcoholic beverage") {
      setIsAlcoholicBeverage(true);
      setShow(true);
    } else {
      setIsAlcoholicBeverage(false);
      setIsWine(false);
      setShow(true);
    }

    setValues({
      ...values,
      subcategory: null,
      category: e,
    });
    fetch(
      `https://masters-api-foboh.azurewebsites.net/api/SubCategory/get?CategoryId=${itemId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSubCategory(
          data.data.map((i) => {
            return {
              value: i.subCategoryId,
              label: i.subCategoryName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSubCategoryChange = (e) => {
    const item = e.label;
    const itemId = e.value;
    console.log("item -->>", item.toLowerCase());
    if (item.toLowerCase() === "wine") {
      setIsWine(true);
      setIsWet(true);
    } else {
      setIsWine(false);
      setIsWet(false);
    }
    setValues({
      ...values,
      subcategory: e,
    });
    fetch(
      `https://masters-api-foboh.azurewebsites.net/api/Segment/get?SubCategoryId=${itemId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("segment data>>", data);
        setSegment(
          data.data.map((i) => {
            return {
              value: i.segmentId,
              label: i.segmentName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSegmentChange = (e) => {
    setValues({
      ...values,
      segment: e,
    });
  };

  const handleregionSelectChange = (e) => {
    setValues({
      ...values,
      regionSelect: e,
    });
  };

  const handleCountryChange = (e) => {
    setValues({
      ...values,
      country: e,
    });
    setShow(true);
  };

  const handleGrapeVarietyChange = (e) => {
    setValues({
      ...values,
      grapeVariety: [...e],
    });
  };

  const handlebaseUnitOfMeasurement = (e) => {
    if (values.innerUnitMeasure?.value) {
      setValues({
        ...values,
        baseUnitMeasure: e,
        configuration: `${values.innerUnitMeasure.value} x ${e.label}`,
      });
      setShow(true);
    } else {
      setValues({
        ...values,
        baseUnitMeasure: e,
      });
      setShow(true);
    }
  };

  const handleinnerUnitOfMeasurement = (e) => {
    console.log(e);

    if (values.baseUnitMeasure?.value) {
      setValues({
        ...values,
        innerUnitMeasure: e,
        configuration: `${e.value} x ${values.baseUnitMeasure.label}`,
      });
      setShow(true);
    } else {
      setValues({
        ...values,
        innerUnitMeasure: e,
      });
      setShow(true);
    }
  };

  const handletagsChange = (e) => {
    setValues({
      ...values,
      tags: [...e],
    });
    setShow(true);
  };

  const handleSalePrice = (e) => {
    const salePrice = e.target.value;
    setSalePriceCopy(salePrice);
    if (values.buyPrice) {
      const profit = salePrice - values.buyPrice;
      setProfitCopy(profit);
      const margin = (profit * 100) / salePrice;
      console.log(margin);
      setMarginCopy(margin);
      setValues({
        ...values,
        salePrice: salePrice,
        profit: profit,
        margin: margin.toFixed(2),
      });
    } else {
      setValues({
        ...values,
        salePrice: salePrice,
      });
    }
  };

  const handleBuyPrice = (e) => {
    const buyPrice = e.target.value;

    if (values.salePrice) {
      const profit = values.salePrice - buyPrice;
      setProfitCopy(profit);
      const margin = (profit * 100) / values.salePrice;
      setMarginCopy(margin);
      setValues({
        ...values,
        buyPrice: buyPrice,
        profit: profit,
        margin: margin.toFixed(2),
      });
    } else {
      setValues({
        ...values,
        buyPrice: buyPrice,
      });
    }
  };

  const handleGSTChange = (e) => {
    setCheckGST(!checkGST);
    console.log(checkGST);
  };

  const handleWETChange = (e) => {
    if (e.target.checked) {
      //Calculating WET & LUC
      const salePrice = values.salePrice;
      const wet = parseInt(salePrice) * 0.29;
      const luc = parseInt(salePrice) + parseInt(wet);

      //Setting WET & Setting LUC
      setValues({
        ...values,
        wineEqualisationTax: wet.toFixed(2),
        landedUnitCost: luc.toFixed(2),
      });
    } else {
      setValues({
        ...values,
        wineEqualisationTax: 0,
        landedUnitCost: 0,
      });
    }

    setCheckWET(!checkWET);
    console.log(checkWET);
  };

  const handleConfiguration = (e) => {
    console.log(values.innerUnitMeasure.value);
    setValues({
      ...values,
      configuration:
        values.innerUnitMeasure.value * values.baseUnitMeasure.value,
    });
  };

  useEffect(() => {
    // Getting organization id
    fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${localStorage.getItem(
        "organisationID"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("organization data--->", data);
      });

    // Department
    fetch("https://masters-api-foboh.azurewebsites.net/api/Department/get", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("department -->", data);
        if (data.success) {
          setDepartment(
            data.data.map((i) => {
              return {
                value: i.departmentId,
                label: i.departmentName,
              };
            })
          );
        }
      })
      .catch((error) => console.log(error));

    // grapeVariety
    fetch("https://masters-api-foboh.azurewebsites.net/api/GrapeVarieties", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("grapeVariety -->", data);
        setVariety(
          data.map((item) => {
            return {
              value: item.grapeVarietyId,
              label: item.grapeVarietyName,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    // tag
    fetch("https://masters-api-foboh.azurewebsites.net/api/tags", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("tag -->", data);
        setTag(
          data.map((item) => {
            return {
              value: item.tagId,
              label: item.tagName,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    // for country
    fetch("https://masters-api-foboh.azurewebsites.net/api/Country/get", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("country -->", data.data);
        setCountry(
          data.data.map((item) => {
            return {
              value: item.countryID,
              label: item.countryName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  // Product Details ----END

  const handleFormChange = (e) => {
    console.log(e.target.value, "inputvalues");
    if (e.target.value) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#2B4447",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: 11,
      lineHeight: "24px",
      fontFamily: "Inter",
      fontSize: "11px",
      fontWeight: 600,
    },
  }));
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <div className="padding-top-custom">
        <AddProductHeader />
        <form
          onChange={handleFormChange}
          className="grid gap-5 lg:flex  px-6  overflow-y-auto no-scrollbar"
          style={{ height: "545px" }}
        >
          {show && (
            <div className="2xl:mx-auto absolute z-50 top-0 right-0 left-0">
              <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
                <div className="block">
                  <nav className="flex h-[65px] items-center justify-end gap-5 ">
                    <button
                      onClick={handleReset}
                      className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                    >
                      Save
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
          <div className="w-full lg:w-2/5 h-full ">
            <div className="grid gap-3">
              {/* Upload Image  */}
              <div className="edit-img">
                <img
                  src="/assets/inventory-img.png"
                  alt=""
                  className=" w-full"
                />
              </div>

              <label
                htmlFor="imageUpload"
                onChange={handleProductImage}
                type="file"
                className="update-img-btn rounded-md cursor-pointer w-full py-3 bg-custom-skyBlue flex justify-center"
              >
                <input
                  id="imageUpload"
                  multiple
                  hidden
                  type="file"
                  onChange={handleProductImage}
                />
                <div className="flex gap-2 items-center justify-center">
                  <div className="">
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_555_25257"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={20}
                        height={21}
                      >
                        <rect y="0.5" width={20} height={20} fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_555_25257)">
                        <path
                          d="M15.7288 7.16681V5.50014H14.0622V4.25016H15.7288V2.5835H16.9788V4.25016H18.6454V5.50014H16.9788V7.16681H15.7288ZM2.6519 18.4168C2.23097 18.4168 1.87467 18.271 1.58301 17.9793C1.29134 17.6876 1.14551 17.3313 1.14551 16.9104V7.42325C1.14551 7.0023 1.29134 6.646 1.58301 6.35433C1.87467 6.06266 2.23097 5.91683 2.6519 5.91683H5.19678L6.73845 4.25016H11.7705V5.50014H7.2833L5.75445 7.16681H2.6519C2.57711 7.16681 2.51567 7.19085 2.46759 7.23893C2.41952 7.28702 2.39549 7.34846 2.39549 7.42325V16.9104C2.39549 16.9852 2.41952 17.0466 2.46759 17.0947C2.51567 17.1428 2.57711 17.1668 2.6519 17.1668H15.4724C15.5472 17.1668 15.6086 17.1428 15.6567 17.0947C15.7048 17.0466 15.7288 16.9852 15.7288 16.9104V9.45846H16.9788V16.9104C16.9788 17.3313 16.8329 17.6876 16.5413 17.9793C16.2496 18.271 15.8933 18.4168 15.4724 18.4168H2.6519ZM9.06215 15.5963C10.0183 15.5963 10.829 15.2637 11.494 14.5987C12.1591 13.9336 12.4916 13.123 12.4916 12.1668C12.4916 11.2106 12.1591 10.4 11.494 9.73494C10.829 9.06988 10.0183 8.73735 9.06215 8.73735C8.10596 8.73735 7.29533 9.06988 6.63028 9.73494C5.96521 10.4 5.63267 11.2106 5.63267 12.1668C5.63267 13.123 5.96521 13.9336 6.63028 14.5987C7.29533 15.2637 8.10596 15.5963 9.06215 15.5963ZM9.06215 14.3463C8.44677 14.3463 7.92967 14.1369 7.51086 13.7181C7.09206 13.2993 6.88265 12.7822 6.88265 12.1668C6.88265 11.5514 7.09206 11.0343 7.51086 10.6155C7.92967 10.1967 8.44677 9.98731 9.06215 9.98731C9.67753 9.98731 10.1946 10.1967 10.6134 10.6155C11.0322 11.0343 11.2416 11.5514 11.2416 12.1668C11.2416 12.7822 11.0322 13.2993 10.6134 13.7181C10.1946 14.1369 9.67753 14.3463 9.06215 14.3463Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="">
                    <p className="text-white font-medium text-base ">
                      Upload images
                    </p>
                  </div>
                </div>
              </label>

              {/*   */}
              <div className="rounded-lg border border-inherit bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium text-lg text-green"> </h5>
                </div>
                <div className="p-5">
                  <div className="">
                    <h5 className="text-base font-medium text-green mb-3">
                      Status
                    </h5>
                    {status.map((state, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-4 gap-3 green-checkbox"
                      >
                        <input
                          id={state}
                          onChange={handleStateSelection}
                          type="checkbox"
                          value={state}
                          name="status"
                          checked={selectedState === state}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                        />
                        <label
                          htmlFor={state}
                          className="ml-2  dark:text-gray-300"
                        >
                          <p className="text-sm font-medium text-gray">
                            {state}
                          </p>
                        </label>
                      </div>
                    ))}
                    {errors.status && touched.status && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.status}
                      </p>
                    )}
                  </div>
                  <div className="pb-5">
                    <h5 className="text-base font-medium text-green mb-2">
                      Product Visibility
                    </h5>
                    <p className="text-gray text-sm font-normal ">
                      Set globally whether this product is shown to customers or
                      not
                    </p>
                  </div>
                  <div className="pb-4 flex justify-between items-center">
                    <h5 className="text-green text-base font-medium">
                      Visible to customers
                    </h5>

                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full">
                      <input
                        onChange={(e) => handleVisibility(e)}
                        type="checkbox"
                        name="availability"
                        id="toggle"
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="toggle"
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-base font-medium text-green mb-3">
                      Region availability
                    </h5>
                    {regionAvailability.map((region, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-4 gap-3 green-checkbox"
                      >
                        <input
                          onChange={handleRegionAvailability}
                          id={region}
                          type="checkbox"
                          checked={values.region.includes(region)}
                          value={region}
                          onBlur={handleBlur}
                          name="region"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                        />
                        <label
                          htmlFor={region}
                          className="ml-2  dark:text-gray-300"
                        >
                          <p className="text-sm font-medium text-gray">
                            {region}
                          </p>
                        </label>
                      </div>
                    ))}
                    {errors.region && touched.region && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.region}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Inventory  */}
              <div className="rounded-lg border border-inherit bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium text-lg text-green">
                    {" "}
                    Inventory{" "}
                  </h5>
                </div>
                <div className="p-5">
                  <div className=" pb-5">
                    <h5 className="text-base font-medium text-green mb-3">
                      Minimum order quantity
                    </h5>
                    <div className="w-72">
                      <input
                        onChange={handleMinimumOrderQuantity}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        value={
                          values.minimumOrder !== 0 ? values.minimumOrder : null
                        }
                        name="minimumOrder"
                        type="number"
                        placeholder="Select"
                      />
                      {errors.minimumOrder && touched.minimumOrder && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.minimumOrder}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className=" pb-5">
                    <h5 className="text-base font-medium text-green mb-3">
                      Available quantity
                    </h5>
                    <div className="w-72">
                      <input
                        onChange={handleAvailableQuantity}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="handleAvailableQuantity"
                        name="availableQty"
                        type="number"
                        value={values.availableQty}
                        placeholder="Select"
                      />
                      {errors.availableQty && touched.availableQty && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.availableQty}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="pb-5">
                    <div className=" flex justify-between items-center mb-3">
                      <h5 className="text-green text-base font-medium">
                        Track inventory
                      </h5>
                      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full ">
                        <input
                          onChange={handleTrackInventory}
                          checked={values.trackInventory}
                          type="checkbox"
                          name="track-inventory"
                          id="track-inventory"
                          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          for="track-inventory"
                          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    <p className="text-gray text-sm font-normal ">
                      Keep track of inventory to receive notifications when
                      products are low or out of stock
                    </p>
                  </div>
                  {Stock && (
                    <div className=" pb-5">
                      <div className=" pb-5">
                        <h5 className="text-base font-medium text-green mb-3">
                          Stock alert level
                        </h5>
                        <div className="w-72">
                          <input
                            onChange={handleStockAlertLevel}
                            value={
                              values.stockAlertLevel !== 0
                                ? values.stockAlertLevel
                                : null
                            }
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="stock-alert-level"
                            name="stockAlertLevel"
                            type="number"
                            placeholder="2 cases"
                          />
                          {errors.stockAlertLevel &&
                            touched.stockAlertLevel && (
                              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                                {errors.stockAlertLevel}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pb-5">
                    <div className=" flex justify-between items-center mb-3">
                      <h5 className="text-green text-base font-medium">
                        Sell when out of stock
                      </h5>
                      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full ">
                        <input
                          onChange={handleSellOutOfStock}
                          checked={values.sellOutOfStock}
                          type="checkbox"
                          name="SellOutOfStock"
                          id="SellOutOfStock"
                          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          for="SellOutOfStock"
                          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    <p className="text-gray text-sm font-normal ">
                      If not selected, customers can still view the product but
                      won’t be able to add to cart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-3/5 w-full h-full grid gap-3  ">
            {/* Product Details  */}
            <div className=" w-full  rounded-lg border border-inherit bg-white h-full grid  ">
              <div className=" border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
                <h6 className="text-base font-medium text-green">
                  Product details
                </h6>
              </div>
              <div className="px-6 py-7">
                <div className="w-full ">
                  <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3 relative">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.title}
                        maxLength={101}
                        onBlur={handleBlur}
                        style={{
                          border:
                            errors.title && touched.title && "1px solid red",
                        }}
                        className="appearance-none  block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="title"
                        type="text"
                        name="title"
                        autoComplete="on"
                        placeholder="Enter Title..."
                      />
                      {errors.title && touched.title && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.title}
                        </p>
                      )}
                      {errors.title && touched.title && (
                        <ErrorOutlineIcon className="absolute text-red-500 error-icon-position right-5 transition-all duration-[0.3s]" />
                      )}
                    </div>
                  </div>
                  {/* <ComboBoxMultiSelect/> */}
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full px-3 relative">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="sku-code"
                      >
                        SKU code
                        <CustomTooltip
                          placement="right"
                          arrow
                          title="Stock Keeping Unit - this is your product identifier which will be shown on customer invoices"
                        >
                          <HelpIcon
                            sx={{
                              color: "#E0E0E0",
                              width: "20px",
                              marginLeft: "15px",
                            }}
                          />{" "}
                        </CustomTooltip>
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.skuCode}
                        onBlur={handleBlur}
                        style={{
                          border:
                            errors.skuCode &&
                            touched.skuCode &&
                            "1px solid red",
                        }}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="sku-code"
                        name="skuCode"
                        type="text"
                        placeholder="Enter SKU code..."
                      />
                      {errors.skuCode && touched.skuCode && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.skuCode}
                        </p>
                      )}
                      {errors.skuCode && touched.skuCode && (
                        <ErrorOutlineIcon
                          style={{ top: "47px" }}
                          className="absolute text-red-500  right-5 transition-all duration-[0.3s]"
                        />
                      )}
                    </div>
                    <div className="w-full px-3 relative">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="brand"
                      >
                        Brands
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.brand}
                        onBlur={handleBlur}
                        style={{
                          border:
                            errors.brand && touched.brand && "1px solid red",
                        }}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="brand"
                        type="text"
                        name="brand"
                        placeholder="Enter brand..."
                      />
                      {errors.brand && touched.brand && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.brand}
                        </p>
                      )}
                      {errors.brand && touched.brand && (
                        <ErrorOutlineIcon
                          style={{ top: "45px" }}
                          className="absolute text-red-500  right-5 transition-all duration-[0.3s]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full  px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Department
                      </h5>
                      <div className="w-full">
                        <Select
                          name="colors"
                          options={department}
                          value={values.department}
                          onBlur={handleBlur}
                          onChange={handleDepartmentChange}
                          className="basic-multi-select "
                          classNamePrefix="select"
                          style={{
                            border:
                              errors.department &&
                              touched.department &&
                              "1px solid red",
                          }}
                        />
                        {errors.department && touched.department && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.department}
                          </p>
                        )}
                      </div>
                    </div>
                    {values.department && (
                      <div className="w-full  px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Category
                        </h5>
                        <div className="w-full">
                          <Select
                            name="colors"
                            options={category}
                            isDisabled={!category.length}
                            onBlur={handleBlur}
                            value={values.category}
                            onChange={handleCategoryChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                          {errors.category && touched.category && (
                            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                              {errors.category}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {values.category && (
                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                      <div className=" w-full  px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Subcategory
                        </h5>
                        <div className="w-full">
                          <Select
                            name="colors"
                            options={subCategory}
                            onBlur={handleBlur}
                            isDisabled={!subCategory.length}
                            value={values.subcategory}
                            onChange={handleSubCategoryChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                          {errors.subcategory && touched.subcategory && (
                            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                              {errors.subcategory}
                            </p>
                          )}
                        </div>
                      </div>
                      {isAlcoholicBeverage && (
                        <div className="  w-full  px-3">
                          <h5 className="text-base font-medium text-green mb-3">
                            Segment
                          </h5>
                          <div className="w-full">
                            <Select
                              name="colors"
                              options={segment}
                              // isDisabled={!segment.length}
                              value={values.segment}
                              onChange={handleSegmentChange}
                              className="basic-multi-select "
                              classNamePrefix="select"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    {isWine && (
                      <div className=" w-full  px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Grape variety
                        </h5>
                        <div className="w-full">
                          <Select
                            isMulti
                            name="variety"
                            // isDisabled={!variety.length}
                            options={variety}
                            value={
                              values.grapeVariety.length > 0
                                ? values.grapeVariety
                                : null
                            }
                            onChange={handleGrapeVarietyChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                          />
                        </div>
                      </div>
                    )}
                    {isWine && (
                      <div className="w-full  px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Region
                        </h5>
                        <div className=" w-full">
                          <Select
                            name="colors"
                            isDisabled={!region.length}
                            options={region}
                            value={values.regionSelect}
                            onChange={handleregionSelectChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    {isWine && (
                      <div className="w-full  px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base font-medium "
                          htmlFor="vintage"
                        >
                          Vintage
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="vintage"
                          name="vintage"
                          type="text"
                          value={values?.vintage !== 0 ? values?.vintage : null}
                          onChange={handleChange}
                          placeholder="2004"
                        />
                      </div>
                    )}
                    {isWine && (
                      <div className="w-full  px-3 relative">
                        <label
                          className="block  tracking-wide text-gray-700 text-base font-medium "
                          htmlFor="awards"
                        >
                          Awards
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="awards"
                          name="awards"
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const allowedCharacters = /^[A-Za-z0-9]*$/;
                            if (!allowedCharacters.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          value={values.awards}
                          type="text"
                          placeholder="WS 93"
                          style={{
                            border:
                              errors.awards &&
                              touched.awards &&
                              "1px solid red",
                          }}
                        />
                        {errors.awards && touched.awards && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.awards}
                          </p>
                        )}
                        {errors.awards && touched.awards && (
                          <ErrorOutlineIcon
                            style={{ top: "45px" }}
                            className="absolute text-red-500  right-5 transition-all duration-[0.3s]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className=" w-full  px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Country
                      </h5>
                      <div className="w-full">
                        <Select
                          name="colors"
                          isDisabled={!country.length}
                          options={country}
                          value={values.country}
                          onChange={handleCountryChange}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                        {errors.country && touched.country && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                    {isAlcoholicBeverage && (
                      <div className="w-full  px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base font-medium "
                          htmlFor="abv"
                        >
                          ABV
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="abv"
                          name="abv"
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const allowedCharacters = /^[0-9.%]*$/;
                            if (!allowedCharacters.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          value={values.abv}
                          type="text"
                          placeholder="Enter ABV..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full  px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Base unit of measure
                      </h5>
                      <div className="w-full">
                        <Select
                          isDisabled={!baseUnitOfMeasurement.length}
                          options={baseUnitOfMeasurement}
                          onBlur={handleBlur}
                          value={values.baseUnitMeasure || null} // Set value to null when no option is selected
                          name="baseUnitMeasure"
                          onChange={handlebaseUnitOfMeasurement}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                        {errors.baseUnitMeasure && touched.baseUnitMeasure && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal">
                            {errors.baseUnitMeasure}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full  px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Inner unit of measure
                      </h5>
                      <div className="w-full">
                        <Select
                          isDisabled={!innerUnitOfMeasurement.length}
                          options={innerUnitOfMeasurement}
                          value={values.innerUnitMeasure}
                          onChange={handleinnerUnitOfMeasurement}
                          onBlur={handleBlur}
                          name="innerUnitMeasure"
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                        {errors.innerUnitMeasure &&
                          touched.innerUnitMeasure && (
                            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                              {errors.innerUnitMeasure}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-nowrap -mx-3 mb-5">
                    <div className="w-full px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="grid-password"
                      >
                        Configuration (ordering unit of measure)
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        name="configuration"
                        disabled
                        value={
                          values.configuration &&
                          `${values.innerUnitMeasure.value} x ${values.baseUnitMeasure.label}`
                        }
                        placeholder={
                          values.configuration &&
                          `${values.innerUnitMeasure.value} x ${values.baseUnitMeasure.label}`
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-nowrap -mx-3 mb-5">
                    <div className=" w-full px-3">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-base font-medium text-gray-700 dark:text-white"
                      >
                        Description
                        <CustomTooltip
                          placement="right"
                          arrow
                          title="This is the description of your product which will appear to customers when visible on the site"
                        >
                          <HelpIcon
                            sx={{
                              color: "#E0E0E0",
                              width: "20px",
                              marginLeft: "15px",
                            }}
                            value={values.abv}
                            type="text"
                            placeholder="Enter ABV..."
                          />
                        </CustomTooltip>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        maxLength={257}
                        className="block p-2.5 w-full text-sm text-gray-900  rounded-md border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                        placeholder="Leave a comment..."
                        defaultValue={""}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      {errors.description && touched.description && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap -mx-3 mb-5">
                    <div className="w-full px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="tags"
                      >
                        Tags
                      </label>
                      <div className="w-full">
                        <Select
                          id="tags"
                          name="tags"
                          isMulti
                          value={values.tags.length ? values.tags : null}
                          onChange={handletagsChange}
                          options={tag}
                          className="basic-multi-select "
                          classNamePrefix="select"
                          isClearable={true}
                          closeMenuOnSelect={false}
                        />
                        {errors.tags && touched.tags && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.tags}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details  */}
            <div className="  w-full  rounded-lg border border-inherit bg-white h-full grid  ">
              <div className=" border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
                <h6 className="text-base font-medium text-green">
                  Pricing details
                </h6>
              </div>
              <div className="px-6 py-7">
                <div className="w-full ">
                  <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full relative md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="Sale-price"
                      >
                        Sale price exc. GST
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Sale-price"
                        name="salePrice"
                        onKeyPress={(e) => {
                          const isValidKey = /[0-9]/.test(e.key); // Test if the pressed key is a number
                          if (!isValidKey) {
                            e.preventDefault(); // Prevent input of non-numeric characters
                          }
                        }}
                        onChange={handleSalePrice}
                        prefix="$"
                        value={values.salePrice !== 0 ? values.salePrice : null}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Sale Price"
                      />
                      {errors.salePrice && touched.salePrice && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.salePrice}
                        </p>
                      )}
                    </div>
                    <div className="w-full relative md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base font-medium "
                        htmlFor="Buy-price"
                      >
                        Buy price
                        <CustomTooltip
                          placement="right"
                          arrow
                          title={
                            <p className="text-white">
                              This is the cost you paid per item.
                              <br /> Customers will not see this
                            </p>
                          }
                        >
                          <HelpIcon
                            sx={{
                              color: "#E0E0E0",
                              width: "20px",
                              marginLeft: "15px",
                            }}
                          />{" "}
                        </CustomTooltip>
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Buy-price"
                        type="text"
                        name="buyPrice"
                        onKeyPress={(event) => {
                          const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                          if (!allowedCharacters.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onChange={handleBuyPrice}
                        value={values.buyPrice !== 0 ? values.buyPrice : null}
                        onBlur={handleBlur}
                        placeholder="Buy Price"
                      />
                      {errors.buyPrice && touched.buyPrice && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.buyPrice}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-3">
                      <div className="w-full relative md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base font-medium "
                          htmlFor="Profit"
                        >
                          Profit
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Profit"
                          disabled
                          value={
                            values.salePrice && values.buyPrice && values.profit
                          }
                          name="firstName"
                          type="text"
                          placeholder="Profit"
                        />
                      </div>
                      <div className="w-full relative md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base font-medium "
                          htmlFor="Margin"
                        >
                          Margin
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Margin"
                          disabled
                          value={
                            values.salePrice &&
                            values.buyPrice &&
                            `${values.margin}%`
                          }
                          type="text"
                          name="lastName"
                          placeholder="Margin"
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs font-normal text-gray">
                      Customers won’t see this
                    </p>
                  </div>
                  <div className="  mb-5">
                    <h5 className="text-base font-medium text-green mb-3">
                      Tax
                    </h5>
                    <div className="flex items-center mb-4 gap-3 green-checkbox">
                      <input
                        id="default-checkbox"
                        checked={checkGST}
                        type="checkbox"
                        value={checkGST}
                        onChange={handleGSTChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2  dark:text-gray-300"
                      >
                        <p className="text-sm font-medium text-gray">
                          GST applicable
                        </p>
                      </label>
                    </div>
                    {isWet && (
                      <div className="flex items-center mb-4 gap-3 green-checkbox">
                        <input
                          id="checked-checkbox"
                          type="checkbox"
                          value={checkWET}
                          checked={checkWET}
                          onChange={handleWETChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                        />

                        <label
                          htmlFor="checked-checkbox"
                          className="ml-2  dark:text-gray-300"
                        >
                          <p className="text-sm font-medium text-gray">
                            WET applicable
                          </p>
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-3">
                      {isWine && checkWET && (
                        <div className="w-full relative md:w-1/2 px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base font-medium "
                            htmlFor="Wine-equalisation-tax"
                          >
                            Wine equalisation tax
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="Wine-equalisation-tax"
                            name="firstName"
                            type="text"
                            disabled
                            value={`$${values.wineEqualisationTax}`}
                            placeholder="$105.27"
                          />
                        </div>
                      )}
                      {isWine && checkWET && (
                        <div className="w-full relative md:w-1/2 px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base font-medium "
                            htmlFor="Landed-unit-cost"
                          >
                            Landed unit cost
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="Landed-unit-cost"
                            type="text"
                            disabled
                            value={`$${values.landedUnitCost}`}
                            name="lastName"
                            placeholder="$224.73"
                          />
                        </div>
                      )}
                    </div>
                    {isWine && checkWET && (
                      <p className="text-center justify-center text-xs font-normal text-gray">
                        Customers won’t see this
                      </p>
                    )}
                  </div>
                </div>
                {/* Main Form End / */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
