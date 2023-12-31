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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  segment,
  subCategory,
  region,
  country,
  baseUnitOfMeasurement,
  innerUnitOfMeasurement,
  options,
} from "../data";
import { Skeleton } from "antd";

function ViewProduct() {
  const { id } = useParams();
  // console.log("product id>>",id)
  const [productImageUris, setProductImageUris] = useState([]);
  const [show, setShow] = useState(false);
  const [isWine, setIsWine] = useState(false);
  const [isAlcoholicBeverage, setIsAlcoholicBeverage] = useState(false);
  const [checkGST, setCheckGST] = useState(false);
  const [checkWET, setCheckWET] = useState(false);
  const [productId, setProductId] = useState("");
  const [regions, setRegions] = useState([]);
  const [salePriceCopy, setSalePriceCopy] = useState(null);
  const [profitCopy, setProfitCopy] = useState(null);
  const [marginCopy, setMarginCopy] = useState(null);
  const [productName, setProductName] = useState("");
  const [prevImgUrl, setPrevImgUrl] = useState([]);
  const [loading, setLoading] = useState(true);

  const [initialValues, setInitialValues] = useState({
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
    availableQty: "",
    grapeVariety: [],
    regionSelect: {},
    vintage: "",
    awards: "",
    abv: "",
    country: "",
    baseUnitMeasure: "",
    innerUnitMeasure: "",
    configuration: "",
    description: "",
    tags: [],
    salePrice: null,
    buyPrice: null,
    profit: "",
    margin: "",
    tax: "",
    wineEqualisationTax: "",
    landedUnitCost: 0,
    status: ["Active", "Inactive", "Archived"],
    productImageUrls: [],
    catalogueId: 0,
    cCatalogueId: "string",
    organisationId: "string",
  });

  const productPromise = new Promise((resolve, reject) => {
    fetch(
      `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/${id}`,
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
      console.log("selected product data>>", data);

      console.log("product promise --->", data);

      const product = data;
      const productId = product.productId;
      setProductName(product.title);
      setProductId(productId);
      const departmentId = product.departmentId;
      const categoryId = product.categoryId;
      const subCategoryId = product.subCategoryId;
      const segmentId = product.segmentId;
      const grapeVarietyName = product.variety;
      const countryOfOrigin = product.countryOfOrigin;
      const baseUnitMeasure = product.unitofMeasure;
      const innerUnitMeasure = product.innerUnitofMeasure;
      const regions = product.regionAvailability;
      const regionName = product.region;
      setRegions(regions);
      // console.log("vikas tags >>",product.tags)
      const tags = product.tags;
      const profit = product.globalPrice - product.buyPrice;
      const margin = (profit * 100) / product.globalPrice;
      const wet = parseInt(product.globalPrice) * 0.29;
      const imageUris = product.productImageUrls;
      setProductImageUris(imageUris);
      setPrevImgUrl(imageUris);
      setCheckGST(product.gstFlag);
      setCheckWET(product.wetFlag);
      setSelectedState(product.productStatus);
      setInitialValues({
        ...initialValues,
        visibility: product.visibility,
        region: product.regionAvailability,
        minimumOrder: product.minimumOrder,
        trackInventory: product.trackInventory,
        stockAlertLevel: product.stockThreshold,
        sellOutOfStock: product.sellOutOfStock,
        title: product.title,
        skuCode: product.skUcode,
        brand: product.brand,
        availableQty: product.availableQty,
        category: product.categoryId,
        subcategory: product.subCategoryId,
        segment: product.segmentId,
        grapeVariety: product.variety,
        regionSelect: product.region,
        vintage: product.vintage,
        awards: product.award && product.award,
        abv: product.abv,
        country: product.countryOfOrigin,
        baseUnitMeasure: product.unitofMeasure,
        innerUnitMeasure: {},
        configuration: product.configuration,
        description: product.description,
        salePrice: product.globalPrice,
        buyPrice: product.buyPrice,
        profit: profit,
        margin: margin,
        wineEqualisationTax: wet && wet.toFixed(2),
        landedUnitCost: product.luCcost && product.luCcost.toFixed(2),
        status: product.productStatus,
        productImageUrls: imageUris,
      });
      setValues({
        ...values,
        visibility: product.visibility,
        region: product.regionAvailability,
        minimumOrder: product.minimumOrder,
        trackInventory: product.trackInventory,
        stockAlertLevel: product.stockThreshold,
        sellOutOfStock: product.sellOutOfStock,
        title: product.title,
        skuCode: product.skUcode,
        brand: product.brand,
        availableQty: product.availableQty,
        category: product.categoryId,
        subcategory: product.subCategoryId,
        segment: product.segmentId,
        grapeVariety: product.variety,
        regionSelect: product.region,
        vintage: product.vintage,
        awards: product.award && product.award,
        abv: product.abv,
        country: product.countryOfOrigin,
        baseUnitMeasure: product.unitofMeasure,
        innerUnitMeasure: {},
        configuration: product.configuration,
        description: product.description,
        salePrice: product.globalPrice,
        buyPrice: product.buyPrice,
        profit: profit,
        margin: margin,
        wineEqualisationTax: wet && wet.toFixed(2),
        landedUnitCost: product.luCcost && product.luCcost.toFixed(2),
        status: product.productStatus,
        productImageUrls: imageUris,
        catalogueId: product.catalogueId,
        cCatalogueId: product.cCatalogueId,
        organisationId: product.organisationId,
      }).then(() => {
        Promise.all([
          departmentPromise,
          categoryPromise,
          subCategoryPromise,
          segmentPromise,
        ])
          .then((data) => {
            console.log("Promise all --->", data);

            const departmentObj = [
              data[0].data.find((obj) => obj.departmentId === departmentId),
            ];

            const [dept] = departmentObj.map((item) => {
              return {
                label: item.departmentName,
                value: item.departmentId,
              };
            });

            const categoryObj = [
              data[1].data.find((obj) => obj.categoryId === categoryId),
            ];

            const [cate] = categoryObj.map((item) => {
              return {
                label: item.categoryName,
                value: item.categoryId,
              };
            });

            const subCategoryObj = [
              data[2].data.find((obj) => obj.subCategoryId === subCategoryId),
            ];

            const [subCate] = subCategoryObj.map((item) => {
              return {
                label: item.subCategoryName,
                value: item.subCategoryId,
              };
            });

            const segmentObj = [
              data[3].data.find((obj) => obj.segmentId === segmentId),
            ];

            const grapeVarietyObj = options.filter((option) =>
              grapeVarietyName.includes(option.label)
            );

            const countryObj = country.find(
              (country) => country.label === countryOfOrigin
            );

            const baseUnitOfMeasureObj = baseUnitOfMeasurement.find(
              (BUM) => BUM.value === parseInt(baseUnitMeasure)
            );

            const innerUnitofMeasureObj = innerUnitOfMeasurement.find(
              (IUM) => IUM.value === parseInt(innerUnitMeasure)
            );

            const tagsObj = options.filter((option) =>
              tags.includes(option.label)
            );
            console.log("tags : --->", tagsObj);

            const regionObj = region.find((rgn) => rgn.label === regionName);

            console.log("region obj ---->", regionObj);

            const imageUris = product.productImageUrls;
            setProductImageUris(imageUris);
            setPrevImgUrl(imageUris);
            setInitialValues({
              visibility: product.visibility,
              region: product.regionAvailability,
              minimumOrder: product.minimumOrder,
              regionSelect: regionObj,
              trackInventory: product.trackInventory,
              stockAlertLevel: product.stockThreshold,
              sellOutOfStock: product.sellOutOfStock,
              title: product.title,
              skuCode: product.skUcode,
              availableQty: product.availableQty,
              brand: product.brand,
              productImageUrls: imageUris,
              category: categoryId && cate,
              subcategory: subCategoryId && subCate,
              segment:
                segmentId &&
                segmentObj.map((item) => {
                  return {
                    label: item.segmentName,
                    value: item.segmentId,
                  };
                }),
              grapeVariety: grapeVarietyObj,
              vintage: product.vintage,
              awards: product.award,
              abv: product.abv,
              country: countryObj,
              baseUnitMeasure: baseUnitOfMeasureObj,
              innerUnitMeasure: innerUnitofMeasureObj,
              configuration: product.configuration,
              description: product.description,
              tags: tagsObj,
              salePrice: product.globalPrice,
              buyPrice: product.buyPrice,
              profit: profit,
              margin: margin.toFixed(2),
              wineEqualisationTax: wet.toFixed(2),
              landedUnitCost: product.luCcost,
              status: product.productStatus,
              department: departmentId && dept,
              catalogueId: product.catalogueId,
              cCatalogueId: product.cCatalogueId,
              organisationId: product.organisationId,
            });
            setValues({
              ...values,
              visibility: product.visibility,
              region: product.regionAvailability,
              minimumOrder: product.minimumOrder,
              regionSelect: regionObj,
              trackInventory: product.trackInventory,
              stockAlertLevel: product.stockThreshold,
              sellOutOfStock: product.sellOutOfStock,
              title: product.title,
              skuCode: product.skUcode,
              availableQty: product.availableQty,
              brand: product.brand,
              productImageUrls: imageUris,
              category: categoryId && cate,
              subcategory: subCategoryId && subCate,
              segment:
                segmentId &&
                segmentObj.map((item) => {
                  return {
                    label: item.segmentName,
                    value: item.segmentId,
                  };
                }),
              grapeVariety: grapeVarietyObj,
              vintage: product.vintage,
              awards: product.award,
              abv: product.abv,
              country: countryObj,
              baseUnitMeasure: baseUnitOfMeasureObj,
              innerUnitMeasure: innerUnitofMeasureObj,
              configuration: product.configuration,
              description: product.description,
              tags: tagsObj,
              salePrice: product.globalPrice,
              buyPrice: product.buyPrice,
              profit: profit,
              margin: margin.toFixed(2),
              wineEqualisationTax: wet.toFixed(2),
              landedUnitCost: product.luCcost,
              status: product.productStatus,
              department: departmentId && dept,
              catalogueId: product.catalogueId,
              cCatalogueId: product.cCatalogueId,
              organisationId: product.organisationId,
            }).then(() => {
              const [category] = categoryObj.map((item) => {
                return {
                  label: item.categoryName,
                  value: item.categoryId,
                };
              });

              const [subCategory] = subCategoryObj.map((item) => {
                return {
                  label: item.subCategoryName,
                  value: item.subCategoryId,
                };
              });

              if (category.label.toLowerCase() === "alcoholic beverages") {
                setIsAlcoholicBeverage(true);
              } else {
                setIsAlcoholicBeverage(false);
              }

              if (subCategory.label.toLowerCase() === "wine") {
                setIsWine(true);
              } else {
                setIsWine(false);
              }
            });

            setDepartment(
              data[0]?.data.map((item) => {
                return {
                  label: item.departmentName,
                  value: item.departmentId,
                };
              })
            );

            setCategory(
              data[1]?.data.map((item) => {
                return {
                  value: item.categoryId,
                  label: item.categoryName,
                };
              })
            );
            setSubCategory(
              data[2]?.data.map((item) => {
                return {
                  value: item.subCategoryId,
                  label: item.subCategoryName,
                };
              })
            );

            setSegment(
              data[3]?.data.map((item) => {
                return {
                  value: item.segmentId,
                  label: item.segmentName,
                };
              })
            );
          })
          .then(() => {
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          })
          .catch((error) => console.log(error));
      });
    });
  }, []);

  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values.configuration);
      },
    });

  console.log("values >>", values);
  console.log("errors", errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const organisationId = localStorage.getItem("organisationId");
    const err = Object.values(errors);
    console.log("err val", err);
    console.log("result", values);
    if (err.length < 1) {
      setInitialValues({
        ...initialValues,
        visibility: values?.visibility,
        region: values?.region,
        minimumOrder: values?.minimumOrder,
        trackInventory: values?.trackInventory,
        stockAlertLevel: values?.stockAlertLevel,
        sellOutOfStock: values?.sellOutOfStock,
        title: values?.title,
        skuCode: values?.skuCode,
        brand: values?.brand,
        availableQty: values?.availableQty,
        category: values?.category,
        subcategory: values?.subcategory,
        segment: values?.segment,
        grapeVariety: values.variety,
        regionSelect: values.region,
        vintage: values.vintage,
        awards: values?.awards,
        abv: values?.abv,
        country: values?.country,
        baseUnitMeasure: values?.baseUnitMeasure,
        innerUnitMeasure: values?.innerUnitMeasure,
        configuration: values?.configuration,
        description: values?.description,
        salePrice: values?.salePrice,
        buyPrice: values?.buyPrice,
        profit: values?.profit,
        margin: values?.margin,
        wineEqualisationTax: values?.wineEqualisationTax,
        landedUnitCost: values?.landedUnitCost,
        status: values?.status,
        productImageUrls: productImageUris,
        catalogueId: values.catalogueId,
        cCatalogueId: values.cCatalogueId,
        organisationId: values.organisationId,
      });
      fetch(
        `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/Update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values?.title,
            description: values?.description,
            award: values?.awards,
            articleId: 0,
            skUcode: values?.skuCode,
            productImageUrls: productImageUris,
            unitofMeasure: values?.baseUnitMeasure?.value.toString(),
            innerUnitofMeasure: values?.innerUnitMeasure?.value.toString(),
            configuration: values?.configuration,
            brand: values?.brand,
            region: values?.regionSelect ? values.regionSelect.label : "",
            trackInventory: values?.trackInventory,
            departmentId: values?.department?.value,
            categoryId: values?.category?.value,
            subCategoryId: values?.subcategory?.value,
            segmentId: values?.segment.value ? values.segment.value : "",
            variety: values?.grapeVariety.map((item) => {
              return item?.label;
            }),
            vintage: values?.vintage,
            abv: values?.abv,
            globalPrice: values?.salePrice,
            luCcost: values?.landedUnitCost ? values.landedUnitCost : 0,
            buyPrice: values?.buyPrice,
            gstFlag: checkGST,
            wetFlag: checkWET,
            availableQty: values?.availableQty,
            stockThreshold: values?.stockAlertLevel,
            sellOutOfStock: values?.sellOutOfStock,
            stockStatus: values?.status,
            regionAvailability: values?.region,
            productStatus: values?.status,
            visibility: values?.visibility,
            minimumOrder: values?.minimumOrder,
            tags: values?.tags.map((item) => {
              return item?.label;
            }),
            countryOfOrigin: values?.country?.label,
            barcodes: "string",
            esgStatus: "string",
            healthRating: "string",
            catalogueId: 0,
            cCatalogueId: "string",
            organisationId: organisationId,
            cCatalogueId: values.cCatalogueId,
            organisationId: values.organisationId,
            isActive: true,
          }),
        }
      )
        .then((response) => {
          console.log("product response >>", response);
        })
        .then((data) => {
          console.log("response after update>>", data);
          setShow(false);
        })
        .catch((error) => console.log(error));
    }
  };

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
    console.log("status --->", event.target.value);
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

  const handleAvailableQuantity = (e) => {
    setValues({
      ...values,
      availableQty: e.target.value,
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
    console.log("nikit", !values.sellOutOfStock);
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

    if (item.toLowerCase() === "alcoholic beverages") {
      setIsAlcoholicBeverage(true);
    } else {
      setIsAlcoholicBeverage(false);
    }

    setValues({
      ...values,
      category: e,
    });
    setShow(true);
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
    } else {
      setIsWine(false);
    }
    setValues({
      ...values,
      subcategory: e,
    });
    setShow(true);
    fetch(
      `https://masters-api-foboh.azurewebsites.net/api/Segment/get?SubCategoryId=${itemId}`,
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
    setShow(true);
  };

  const handleregionSelectChange = (e) => {
    setValues({
      ...values,
      regionSelect: e,
    });
    setShow(true);
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
    setShow(true);
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
    setShow(true);
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
    setShow(true);
  };

  const handletagsChange = (e) => {
    console.log("tags -->", e);
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
      console.log("profit >>>", profit);
      const margin = (profit * 100) / salePrice;
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
    setShow(true);
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
    setShow(true);
  };

  const handleGSTChange = (e) => {
    setCheckGST(!checkGST);
    console.log(checkGST);
    setShow(true);
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
    setShow(true);
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

  const handleImageUpload = (e) => {
    const files = e.target.files;

    console.log("files -->", files);
    if (files.length) {
      // files.length = files.length > 3 ? 3 : files.length
      const formData = new FormData();
      for (let i in files) {
        if (files[i] instanceof File) {
          console.log("--->", files[i]);
          formData.append("files", files[i]);
        }
      }
      console.log("form data", formData);

      // files.forEach(file => {

      //   formData.append("files[]", file)
      // })

      fetch(
        `https://product-fobohwepapi-fbh.azurewebsites.net/api/uploadproductimages?productId=${id}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProductImageUris(
            data.map((item) => {
              return item.blob.uri;
            })
          );
        })
        .catch((error) => console.log(error));
    }
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

  const handleReset = () => {
    setShow(false);
    setValues(initialValues);
    setProductImageUris(prevImgUrl);
  };

  return (
    <>
      <ViewProductHeader productName={productName} />
      <form
        onChange={handleFormChange}
        className="grid gap-5 lg:flex nikit px-6  overflow-y-auto no-scrollbar"
        style={{ height: "545px" }}
      >
        {show && (
          <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button
                    onClick={handleReset}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
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
          </div>
        )}
        <div
          className="grid gap-5 lg:flex  px-6  overflow-y-auto no-scrollbar"
          style={{ height: "545px", width: "100%" }}
        >
          <div className="w-full lg:w-2/5	 h-full	">
            <div className="grid gap-3">
              {/* Update Image ---START */}
              <Skeleton
                style={{ padding: "10px" }}
                loading={loading}
                active
                avatar
              >
                <div className="edit-img">
                  <img
                    src={
                      productImageUris
                        ? productImageUris[0]
                        : "/assets/inventory-img.png"
                    }
                    alt=""
                    className=" w-full"
                  />
                </div>
              </Skeleton>
              <div className="flex gap-3">
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="">
                    <img
                      src={
                        productImageUris
                          ? productImageUris[1]
                          : "/assets/inventory-img.png"
                      }
                      alt=""
                      className=""
                    />
                  </div>
                </Skeleton>
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="">
                    <img
                      src={
                        productImageUris
                          ? productImageUris[2]
                          : "/assets/inventory-img.png"
                      }
                      alt=""
                      className=""
                    />
                  </div>
                </Skeleton>
              </div>
              {!loading && (
                <label
                  htmlFor="upload-image"
                  className="update-img-btn rounded-md	w-full py-3	bg-custom-skyBlue flex cursor-pointer justify-center"
                >
                  <input
                    onChange={handleImageUpload}
                    id="upload-image"
                    type="file"
                    name="files[]"
                    multiple
                    hidden
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
                      <h6 className="text-white font-medium	text-base	">
                        Update images
                      </h6>
                    </div>
                  </div>
                </label>
              )}
              {/* Update Image ---END  */}

              {/* Product Listing ---START */}
              <div className="rounded-lg	border border-inherit	bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium	text-lg	text-green">
                    {" "}
                    Product listing{" "}
                  </h5>
                </div>
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="p-5">
                    <div className="">
                      <h5 className="text-base font-medium text-green mb-3">
                        Status
                      </h5>
                      {status.map((state, index) => (
                        <div
                          key={index}
                          className="flex items-center mb-4 gap-3"
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
                            <p className="text-sm	 font-medium text-gray">
                              {state}
                            </p>
                          </label>
                        </div>
                      ))}
                      {errors.status && touched.status && (
                        <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                          {errors.status}
                        </p>
                      )}
                    </div>
                    <div className="pb-5">
                      <h5 className="text-base font-medium text-green mb-2">
                        Product Visibility
                      </h5>
                      <p className="text-gray text-sm font-normal	">
                        Set globally whether this product is shown to customers
                        or not
                      </p>
                    </div>
                    <div className="pb-4 flex justify-between items-center">
                      <h5 className="text-green text-base font-medium">
                        Visible to customers
                      </h5>

                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full">
                        <input
                          onChange={handleVisibility}
                          checked={values.visibility}
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
                          className="flex items-center mb-4 gap-3"
                        >
                          <input
                            onChange={handleRegionAvailability}
                            id={region}
                            type="checkbox"
                            value={region}
                            checked={values?.region?.includes(region)}
                            name="region"
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
                      {errors.region && touched.region && (
                        <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                          {errors.region}
                        </p>
                      )}
                    </div>
                  </div>
                </Skeleton>
              </div>
              {/* Product Listing ---END  */}

              {/* Inventory ---START  */}
              <div className="rounded-lg	border border-inherit	bg-white">
                <div className="border-b border-inherit  py-3 px-5">
                  <h5 className="font-medium	text-lg	text-green"> Inventory </h5>
                </div>
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="p-5">
                    <div className=" pb-5">
                      <h5 className="text-base font-medium text-green mb-3">
                        Minimum order quantity
                      </h5>
                      <div className="w-72">
                        <input
                          onChange={handleMinimumOrderQuantity}
                          value={values.minimumOrder}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          name="firstName"
                          type="number"
                          placeholder="2 cases"
                        />
                      </div>
                    </div>
                    <div className=" pb-5">
                      <h5 className="text-base font-medium text-green mb-3">
                        Available quantity
                      </h5>
                      <div className="w-72">
                        <input
                          onChange={handleAvailableQuantity}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="handleAvailableQuantity"
                          name="availableQty"
                          type="number"
                          value={values.availableQty}
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
                            value={values.stockAlertLevel}
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
                          Sell when out of stock
                        </h5>
                        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                          <input
                            onChange={handleSellOutOfStock}
                            checked={values.sellOutOfStock}
                            // value={values.sellOutOfStock}
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
                        If not selected, customers can still view the product
                        but won’t be able to add to cart
                      </p>
                    </div>
                  </div>
                </Skeleton>
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
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="w-full ">
                    <div className="flex flex-wrap -mx-3 mb-5">
                      <div className="w-full px-3 relative">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <input
                          onChange={handleChange}
                          value={values.title}
                          onBlur={handleBlur}
                          style={{
                            border:
                              errors.title && touched.title && "1px solid red",
                          }}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="title"
                          type="text"
                          name="title"
                          autoComplete="on"
                          placeholder="Good Intentions 'Cape Jaffa' Chardonnay"
                        />
                        {errors.title && touched.title && (
                          <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
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
                      <div className="w-full  px-3 relative">
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
                          style={{
                            border:
                              errors.skuCode &&
                              touched.skuCode &&
                              "1px solid red",
                          }}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="sku-code"
                          name="skuCode"
                          type="text"
                          placeholder="GOODINTCJCHARD22"
                        />
                        {errors.skuCode && touched.skuCode && (
                          <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                            {errors.skuCode}
                          </p>
                        )}
                        {errors.skuCode && touched.skuCode && (
                          <ErrorOutlineIcon
                            style={{ top: "45px" }}
                            className="absolute text-red-500  right-5 transition-all duration-[0.3s]"
                          />
                        )}
                      </div>
                      <div className="w-full  px-3 relative">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="brand"
                        >
                          Brand
                        </label>
                        <input
                          onChange={handleChange}
                          value={values.brand}
                          onBlur={handleBlur}
                          style={{
                            border:
                              errors.brand && touched.brand && "1px solid red",
                          }}
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="brand"
                          type="text"
                          name="brand"
                          placeholder="Lo-Fi Wines"
                        />
                        {errors.brand && touched.brand && (
                          <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
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
                      <div className="  w-full  px-3 relative">
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
                          {errors.department && touched.department && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                              {errors.department}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="  w-full  px-3">
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
                          {errors.category && touched.category && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                              {errors.category}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                      <div className=" w-full  px-3">
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
                          {errors.subcategory && touched.subcategory && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
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
                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                      {isWine && (
                        <div className=" w-full  px-3">
                          <h5 className="text-base font-medium text-green mb-3">
                            Grape variety
                          </h5>
                          <div className="w-full">
                            <Select
                              isMulti
                              name="colors"
                              isDisabled={!options.length}
                              options={options}
                              value={
                                values.grapeVariety.length > 0
                                  ? values.grapeVariety
                                  : null
                              }
                              onChange={handleGrapeVarietyChange}
                              className="basic-multi-select "
                              classNamePrefix="select"
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

                      <div className="w-full  px-3">
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
                          onKeyPress={(event) => {
                            const allowedCharacters = /^[A-Za-z0-9]*$/;
                            if (!allowedCharacters.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          value={values.awards}
                          type="text"
                          placeholder="WS 93"
                        />
                      </div>
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
                        </div>
                      </div>
                      {isAlcoholicBeverage && (
                        <div className="w-full  px-3">
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

                    <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                      <div className="  w-full  px-3">
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
                          {errors.baseUnitMeasure &&
                            touched.baseUnitMeasure && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
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
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                          {errors.innerUnitMeasure &&
                            touched.innerUnitMeasure && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                {errors.innerUnitMeasure}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-nowrap -mx-3 mb-5">
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
                            `${values?.innerUnitMeasure?.value} x ${values?.baseUnitMeasure?.label}`
                          }
                          placeholder={
                            values.configuration &&
                            `${values?.innerUnitMeasure?.value} x ${values?.baseUnitMeasure?.label}`
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-nowrap -mx-3 mb-5">
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
                    <div className="flex flex-nowrap -mx-3 mb-5">
                      <div className="w-full px-3">
                        <label
                          className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                          htmlFor="tags"
                        >
                          Tags
                        </label>
                        <div className="w-full">
                          <Select
                            isMulti
                            id="tags"
                            name="colors"
                            isDisabled={!options.length}
                            options={options}
                            value={values.tags.length > 0 ? values.tags : null}
                            onChange={handletagsChange}
                            className="basic-multi-select "
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Skeleton>
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
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
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
                          onBlur={handleBlur}
                          type="text"
                          placeholder="$330.00"
                        />
                        {errors.salePrice && touched.salePrice && (
                          <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                            {errors.salePrice}
                          </p>
                        )}
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
                          onBlur={handleBlur}
                          placeholder="$250.00"
                        />
                        {errors.buyPrice && touched.buyPrice && (
                          <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                            {errors.buyPrice}
                          </p>
                        )}
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
                              values.salePrice &&
                              values.buyPrice &&
                              values.profit
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
                </Skeleton>
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
