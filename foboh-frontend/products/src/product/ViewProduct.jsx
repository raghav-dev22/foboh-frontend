import React, { useEffect, Fragment, useState } from "react";
import AddProductHeader from "../addProduct/AddProductHeader";
import { useFormik } from "formik";
import Select from "react-select";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";

// import ActiveProduct from './ActiveProduct'

import ViewProductHeader from "./ViewProductHeader";
import EditProductDetails from "../editProduct/EditProductDetails";
import UpdateImg from "../editProduct/UpdateImg";
import Inventory from "../editProduct/Inventory";
import ProductListing from "../editProduct/ProducrListing";
import PricingDetails from "../editProduct/PricingDetails";
import { useParams } from "react-router-dom";
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

function ViewProduct() {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [isWine, setIsWine] = useState(false);
  const [isAlcoholicBeverage, setIsAlcoholicBeverage] = useState(false);
  const [checkGST, setCheckGST] = useState(false);
  const [checkWET, setCheckWET] = useState(false);
  const [salePriceCopy, setSalePriceCopy] = useState(null);
  const [profitCopy, setProfitCopy] = useState(null);
  const [marginCopy, setMarginCopy] = useState(null);
  const [departmentObj, setDepartmentObj] = useState({});

  const productPromise = new Promise((resolve, reject) => {
    fetch(
      `https://product-api-foboh.azurewebsites.net/api/Product/get?ProductId=${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const departmentPromise = new Promise((resolve, reject) => {
    fetch("https://masters-api-foboh.azurewebsites.net/api/Department/get", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const categoryPromise = new Promise((resolve, reject) => {
    fetch(`https://masters-api-foboh.azurewebsites.net/api/Category/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const subCategoryPromise = new Promise((resolve, reject) => {
    fetch(`https://masters-api-foboh.azurewebsites.net/api/SubCategory/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const segmentPromise = new Promise((resolve, reject) => {
    fetch(`https://masters-api-foboh.azurewebsites.net/api/Segment/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  useEffect(() => {
    productPromise.then((data) => {
      if (data.success) {
        console.log("product promise --->", data);

        const product = data.data[0];
        const departmentId = product.departmentId;
        const profit = product.globalPrice - product.buyPrice;
        const margin = (profit * 100) / product.globalPrice;
        const wet = parseInt(product.salePrice) * 0.29;

        setCheckGST(product.gstFlag);
        setCheckWET(product.wetFlag);
        setSelectedState(product.productStatus);
        setValues({
          ...values,
          visibility: product.visibility,
          region: product.regionAvailability,
          minimumOrder: product.minimumOrder,
          trackInventory: false,
          stockAlertLevel: product.stockThreshold,
          sellOutOfStock: product.stockStatus,
          title: product.title,
          skuCode: product.skUcode,
          brand: product.brand,
          category: product.categoryId,
          subcategory: product.subCategoryId,
          segment: product.segmentId,
          grapeVariety: product.variety,
          regionSelect: "",
          vintage: product.vintage,
          awards: "",
          abv: product.abv,
          country: product.countryOfOrigin,
          baseUnitMeasure: product.unitofMeasure,
          innerUnitMeasure: {},
          configuration: product.configuration,
          description: product.description,
          tags: product.tags,
          salePrice: product.globalPrice,
          buyPrice: product.buyPrice,
          profit: profit,
          margin: margin,
          wineEqualisationTax: wet,
          landedUnitCost: values.luCcost,
          status: product.productStatus,
        }).then(() => {
          Promise.all([
            departmentPromise,
            categoryPromise,
            subCategoryPromise,
            segmentPromise,
          ])
            .then((data) => {
              console.log("Promise all --->", data);

              setDepartment(
                data[0].data.map((item) => {
                  console.log(
                    "obj ===>",
                    item.data.find((obj) => obj.departmentId === departmentId)
                  );
                  setDepartmentObj(
                    item.data.find((obj) => obj.departmentId === departmentId)
                  );
                  const department = item.data.find(
                    (obj) => obj.departmentId === departmentId
                  );

                  return {
                    value: item.departmentId,
                    label: item.departmentName,
                  };
                })
              );
              setCategory(
                data[1].data.map((item) => {
                  return {
                    value: item.categoryId,
                    label: item.categoryName,
                  };
                })
              );
              setSubCategory(
                data[2].data.map((item) => {
                  return {
                    value: item.subCategoryId,
                    label: item.subCategoryName,
                  };
                })
              );

              setSegment(
                data[3].data.map((item) => {
                  return {
                    value: item.segmentId,
                    label: item.segmentName,
                  };
                })
              );
            })
            .catch((error) => console.log(error));
        });
      }
    });

    // fetch(
    //   `https://product-api-foboh.azurewebsites.net/api/Product/get?ProductId=${id}`,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("product data -->", data);
    //     if (data.success) {
    //       const product = data.data[0];
    //       const departmentId = product.departmentId;
    //       fetch("https://masters-api-foboh.azurewebsites.net/api/Department/get",
    //         {
    //           method: "GET",
    //         }
    //       )
    //         .then((response) => response.json())
    //         .then((data) => {
    //           console.log("department -->", data);
    //           if (data.success) {
    //             console.log("obj ===>", data.data.find(obj => obj.departmentId === departmentId))
    //             setDepartmentObj(data.data.find(obj => obj.departmentId === departmentId))
    //             const department = data.data.find(obj => obj.departmentId === departmentId)
    //             setValues({
    //               ...values,
    //               ...product,
    //               department: {
    //                 value: department.departmentId,
    //                 label: department.departmentName
    //               }
    //             })
    //             setDepartment(
    //               data.data.map((i) => {

    //                 return {
    //                   value: i.departmentId,
    //                   label: i.departmentName,
    //                 };
    //               })
    //             );
    //           }
    //         })
    //         .catch((error) => console.log(error));

    //       const profit = product.globalPrice - product.buyPrice;
    //       const margin = (profit * 100) / product.globalPrice;
    //       const wet = parseInt(product.salePrice) * 0.29;

    //       setValues({
    //         ...values,
    //         ...product.visibility,
    //         region: product.regionAvailability,
    //         minimumOrder: product.minimumOrder,
    //         trackInventory: false,
    //         stockAlertLevel: product.stockThreshold,
    //         sellOutOfStock: product.stockStatus,
    //         title: product.title,
    //         skuCode: product.skUcode,
    //         brand: product.brand,
    //         category: product.categoryId,
    //         subcategory: product.subCategoryId,
    //         segment: product.segmentId,
    //         grapeVariety: product.variety,
    //         regionSelect: "",
    //         vintage: product.vintage,
    //         awards: "",
    //         abv: product.abv,
    //         country: product.countryOfOrigin,
    //         baseUnitMeasure: product.unitofMeasure,
    //         innerUnitMeasure: {},
    //         configuration: product.configuration,
    //         description: product.description,
    //         tags: product.tags,
    //         salePrice: product.globalPrice,
    //         buyPrice: product.buyPrice,
    //         profit: profit,
    //         margin: margin,
    //         wineEqualisationTax: wet,
    //         landedUnitCost: values.luCcost,
    //         status: product.stockStatus,
    //       });
    //       setCheckGST(product.gstFlag);
    //       setCheckWET(product.wetFlag);
    //     }
    //   }).then(() => {
    //     fetch(`https://masters-api-foboh.azurewebsites.net/api/Category/get`, {
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("category --->", data);
    //     if (data.success) {
    //       setCategory(
    //         data.data.map((i) => {
    //           return {
    //             value: i.categoryId,
    //             label: i.categoryName,
    //           };
    //         })
    //       );
    //     }
    //   })
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values.configuration);
      },
    });

  console.log(values);
  // Product Listing Handlers ---START
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
  const handleVisibility = () => {
    setValues({
      ...values,
      visibility: !values.visibility,
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
    setSelectedState(event.target.value);
    console.log(selectedState);
    setValues({
      ...values,
      status: event.target.value,
    });
  };
  // Product Listing Handlers ---END

  // Inventory ----START
  const handleMinimumOrderQuantity = (e) => {
    setValues({
      ...values,
      minimumOrder: e.target.value,
    });
  };

  const handleTrackInventory = () => {
    setValues({
      ...values,
      trackInventory: !values.trackInventory,
    });
    console.log(values.trackInventory);
  };

  const handleStockAlertLevel = (e) => {
    setValues({
      ...values,
      stockAlertLevel: e.target.value,
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

  // Edit Product Details ----START
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [segment, setSegment] = useState([]);

  const handleDepartmentChange = (e) => {
    setValues({
      ...values,
      department: e,
    });
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

    if (item.toLowerCase() === "alcoholic beverages") {
      setIsAlcoholicBeverage(true);
    } else {
      setIsAlcoholicBeverage(false);
    }

    setValues({
      ...values,
      category: e,
    });
    fetch(`https://masters-api-foboh.azurewebsites.net/api/SubCategory/get`, {
      method: "GET",
    })
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
    console.log("item -->>", item.toLowerCase());
    if (item.toLowerCase() === "wine") {
      setIsWine(true);
    } else {
      setIsWine(false);
    }
    setValues({
      ...values,
      subcategory: e,
    });
    fetch(
      `https://masters-api-foboh.azurewebsites.net/api/Segment/get?SubCategoryId=${e.value}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
    } else {
      setValues({
        ...values,
        baseUnitMeasure: e,
      });
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
    } else {
      setValues({
        ...values,
        innerUnitMeasure: e,
      });
    }
  };

  const handletagsChange = (e) => {
    setValues({
      ...values,
      tags: [...e],
    });
  };

  const handleSalePrice = (e) => {
    const salePrice = e.target.value;
    setSalePriceCopy(salePrice);
    if (values.buyPrice) {
      const profit = salePrice - values.buyPrice;
      setProfitCopy(profit);
      onsole.log("profit >>>", profit);
      const margin = (profit * 100) / values.salePrice;
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
      console.log("profit >>>", profit);
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
        wineEqualisationTax: "",
        landedUnitCost: "",
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

  // useEffect(() => {
  //   fetch("https://masters-api-foboh.azurewebsites.net/api/Department/get", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("department -->", data);
  //       if (data.success) {
  //         setDepartment(
  //           data.data.map((i) => {
  //             return {
  //               value: i.departmentId,
  //               label: i.departmentName,
  //             };
  //           })
  //         );
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

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

  // Edit Product Details ----END

  const handleFormChange = () => {
    setShow(true);
  };

  return (
    <>
      <ViewProductHeader />
      <form
        onChange={handleFormChange}
        className="grid gap-5 lg:flex  px-6  overflow-y-auto h-96 no-scrollbar"
      >
        {show && (
          <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                    Cancel
                  </button>
                  <button className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
                    Save
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        <div className="grid gap-5 lg:flex  px-6  overflow-y-auto h-96 no-scrollbar">
          <div className="w-full lg:w-2/5	 h-full	">
            <div className="grid gap-3">
              <UpdateImg />

              {/* Product Listing ---START */}
              <div className="rounded-lg	border border-inherit	bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium	text-lg	text-green">
                    {" "}
                    Product listing{" "}
                  </h5>
                </div>
                <div className="p-5">
                  <div className="">
                    <h5 className="text-base font-medium text-green mb-3">
                      Status
                    </h5>
                    {status.map((state, index) => (
                      <div key={index} className="flex items-center mb-4 gap-3">
                        <input
                          id={state}
                          onChange={handleStateSelection}
                          type="radio"
                          checked={selectedState === state}
                          value={selectedState}
                          name="status"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                        />
                        <label
                          htmlFor={state}
                          className="ml-2  dark:text-gray-300"
                        >
                          <p className="text-sm	 font-medium text-gray">
                            {state}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="pb-5">
                    <h5 className="text-base font-medium text-green mb-2">
                      Product Visibility
                    </h5>
                    <p className="text-gray text-sm font-normal	">
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
                        onChange={handleVisibility}
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
                      <div key={index} className="flex items-center mb-4 gap-3">
                        <input
                          onChange={handleRegionAvailability}
                          id={region}
                          type="checkbox"
                          value={region}
                          name={region}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                        />
                        <label
                          htmlFor={region}
                          className="ml-2  dark:text-gray-300"
                        >
                          <p className="text-sm	 font-medium text-gray">
                            {region}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Product Listing ---END  */}

              {/* Inventory ---START  */}
              <div className="rounded-lg	border border-inherit	bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium	text-lg	text-green"> Inventory </h5>
                </div>
                <div className="p-5">
                  <div className=" pb-5">
                    <h5 className="text-base font-medium text-green mb-3">
                      Minimum order quantity
                    </h5>
                    <div className="w-72">
                      <input
                        onChange={handleMinimumOrderQuantity}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        name="firstName"
                        type="number"
                        placeholder="2 cases"
                      />
                    </div>
                  </div>
                  <div className="pb-5">
                    <div className=" flex justify-between items-center mb-3">
                      <h5 className="text-green text-base font-medium">
                        Track inventory
                      </h5>
                      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                        <input
                          onChange={handleTrackInventory}
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
                    <p className="text-gray text-sm font-normal	">
                      Keep track of inventory to receive notifications when
                      products are low or out of stock
                    </p>
                  </div>
                  <div className=" pb-5">
                    <div className=" pb-5">
                      <h5 className="text-base font-medium text-green mb-3">
                        Stock alert level
                      </h5>
                      <div className="w-72">
                        <input
                          onChange={handleStockAlertLevel}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="stock-alert-level"
                          name="stock-alert-level"
                          type="number"
                          placeholder="2 cases"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pb-5">
                    <div className=" flex justify-between items-center mb-3">
                      <h5 className="text-green text-base font-medium">
                        Sell when out of stack
                      </h5>
                      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                        <input
                          onChange={handleSellOutOfStock}
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
                    <p className="text-gray text-sm font-normal	">
                      If not selected, customers can still view the product but
                      won’t be able to add to cart
                    </p>
                  </div>
                </div>
              </div>
              {/* Inventory ---END */}
            </div>
          </div>
          <div className=" lg:w-3/5 w-full   h-full	 grid gap-3	  ">
            {/* Edit product details ---START  */}
            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
              <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                <h6 className="text-base	font-medium	 text-green">
                  Product details
                </h6>
              </div>
              <div className="px-6 py-7">
                <div className="w-full ">
                  <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.title}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="title"
                        type="text"
                        name="title"
                        autoComplete="on"
                        placeholder="Good Intentions 'Cape Jaffa' Chardonnay   "
                      />
                    </div>
                  </div>
                  {/* <ComboBoxMultiSelect/> */}
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
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
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="sku-code"
                        name="skuCode"
                        type="text"
                        placeholder="GOODINTCJCHARD22"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="brand"
                      >
                        Brand
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.brand}
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="brand"
                        type="text"
                        name="brand"
                        placeholder="Lo-Fi Wines"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="  w-full md:w-1/2 px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Department
                      </h5>
                      <div className="w-full">
                        <Select
                          name="colors"
                          options={department}
                          value={values.department}
                          onChange={handleDepartmentChange}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="  w-full md:w-1/2 px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Category
                      </h5>
                      <div className="w-full">
                        <Select
                          name="colors"
                          options={category}
                          isDisabled={!category.length}
                          value={values.category}
                          onChange={handleCategoryChange}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className=" w-full md:w-1/2 px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Subcategory
                      </h5>
                      <div className="w-full">
                        <Select
                          name="colors"
                          options={subCategory}
                          isDisabled={!subCategory.length}
                          value={values.subcategory}
                          onChange={handleSubCategoryChange}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    {isAlcoholicBeverage && (
                      <div className="  w-full md:w-1/2 px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Segment
                        </h5>
                        <div className="w-full">
                          <Select
                            name="colors"
                            options={segment}
                            isDisabled={!segment.length}
                            value={values.segment}
                            onChange={handleSegmentChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    {isWine && (
                      <div className=" w-full md:w-1/2 px-3">
                        <h5 className="text-base font-medium text-green mb-3">
                          Grape variety
                        </h5>
                        <div className="w-full">
                          <Select
                            isMulti
                            name="colors"
                            isDisabled={!options.length}
                            options={options}
                            value={values.grapeVariety}
                            onChange={handleGrapeVarietyChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    )}
                    {isWine && (
                      <div className="w-full md:w-1/2 px-3">
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
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    {isWine && (
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="vintage"
                        >
                          Vintage
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="vintage"
                          name="vintage"
                          type="text"
                          value={values.vintage}
                          onChange={handleChange}
                          placeholder="2004"
                        />
                      </div>
                    )}

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="awards"
                      >
                        Awards
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="awards"
                        name="awards"
                        onChange={handleChange}
                        value={values.awards}
                        type="text"
                        placeholder="WS 93"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className=" w-full md:w-1/2 px-3">
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
                      </div>
                    </div>
                    {isAlcoholicBeverage && (
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="abv"
                        >
                          ABV
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="abv"
                          name="abv"
                          onChange={handleChange}
                          value={values.abv}
                          type="text"
                          placeholder="15%"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="  w-full md:w-1/2 px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Base unit of measure
                      </h5>
                      <div className="w-full">
                        <Select
                          isDisabled={!baseUnitOfMeasurement.length}
                          options={baseUnitOfMeasurement}
                          value={values.baseUnitMeasure}
                          onChange={handlebaseUnitOfMeasurement}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <h5 className="text-base font-medium text-green mb-3">
                        Inner unit of measure
                      </h5>
                      <div className="w-full">
                        <Select
                          isDisabled={!innerUnitOfMeasurement.length}
                          options={innerUnitOfMeasurement}
                          value={values.innerUnitMeasure}
                          onChange={handleinnerUnitOfMeasurement}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="grid-password"
                      >
                        Configuration (ordering unit of measure)
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  <div className="flex flex-wrap -mx-3 mb-5">
                    <div className=" w-full px-3">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
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
                          />{" "}
                        </CustomTooltip>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                        placeholder="Leave a comment..."
                        defaultValue={""}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="tags"
                      >
                        Tags
                      </label>
                      <div className="w-full">
                        <Select
                          id="tags"
                          name="tags"
                          isMulti
                          value={values.tags}
                          onChange={handletagsChange}
                          options={options}
                          className="basic-multi-select "
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Edit product details ---END  */}

            {/* Pricing Details ---START  */}
            <div className="  w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
              <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                <h6 className="text-base	font-medium	 text-green">
                  Pricing details
                </h6>
              </div>
              <div className="px-6 py-7">
                <div className="w-full ">
                  <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                    <div className="w-full relative md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                        htmlFor="Sale-price"
                      >
                        Sale price exc. GST
                      </label>
                      <input
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Sale-price"
                        name="salePrice"
                        onChange={handleSalePrice}
                        prefix="$"
                        value={values.salePrice}
                        type="text"
                        placeholder="$330.00"
                      />
                    </div>
                    <div className="w-full relative md:w-1/2 px-3">
                      <label
                        className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
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
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Buy-price"
                        type="text"
                        name="buyPrice"
                        onChange={handleBuyPrice}
                        value={values.buyPrice}
                        placeholder="$250.00"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-3">
                      <div className="w-full relative md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="Profit"
                        >
                          Profit
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Profit"
                          disabled
                          value={
                            values.salePrice && values.buyPrice && values.profit
                          }
                          name="firstName"
                          type="text"
                          placeholder="$80.00"
                        />
                      </div>
                      <div className="w-full relative md:w-1/2 px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="Margin"
                        >
                          Margin
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Margin"
                          disabled
                          value={
                            values.salePrice &&
                            values.buyPrice &&
                            `${values.margin}%`
                          }
                          type="text"
                          name="lastName"
                          placeholder="24.2%"
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs font-normal	text-gray">
                      Customers won’t see this
                    </p>
                  </div>
                  <div className="  mb-5">
                    <h5 className="text-base font-medium text-green mb-3">
                      Tax
                    </h5>
                    <div className="flex items-center mb-4 gap-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={checkGST}
                        onChange={handleGSTChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2  dark:text-gray-300"
                      >
                        <p className="text-sm	 font-medium text-gray">
                          GST applicable
                        </p>
                      </label>
                    </div>
                    <div className="flex items-center mb-4 gap-3">
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        checked={checkWET}
                        onChange={handleWETChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ml-2  dark:text-gray-300"
                      >
                        <p className="text-sm	 font-medium text-gray">
                          WET applicable
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-3">
                      {isWine && checkWET && (
                        <div className="w-full relative md:w-1/2 px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="Wine-equalisation-tax"
                          >
                            Wine equalisation tax
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="Landed-unit-cost"
                          >
                            Landed unit cost
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                      <p className="text-center justify-center text-xs font-normal	text-gray">
                        Customers won’t see this
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing Details ---END */}
          </div>
        </div>
      </form>
    </>
  );
}

export default ViewProduct;
