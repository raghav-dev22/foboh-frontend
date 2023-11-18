import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Select,
  Space,
  Skeleton,
  theme,
  Pagination,
  Slider,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../slices/CartSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import { setProductData } from "../slices/ProductSlice";
import { useRef } from "react";
import { getCountry } from "../helpers/getCountry";
import { getSegments } from "../helpers/getSegments";
import { getVariety } from "../helpers/getVariety";
import { getRegion } from "../helpers/getRegion";
import { getRegionAvailable } from "../helpers/getRegionAvailable";
import { getTags } from "../helpers/getTags";
import { setTotalProducts } from "../slices/totalPageSlice";

let localFilterSort = {
  filter: {
    category: [],
    subCategory: [],
    segment: [],
    variety: [],
    country: [],
    regionAvailability: [],
    region: [],
    minPrice: 0,
    maxPrice: 0,
    tags: [],
    page: 0,
  },
  sort: {
    sortBy: "",
    sortOrder: "",
  },
};

//   filter: {
//     category: [],
//     subcategory: [],
//     stock: [],
//     productStatus: [],
//     visibility: true,
//     page: 1,
//   },
//   sort: {
//     sortBy: "",
//     sortOrder: "asc",
//   },
// };

const ProductList = () => {
  const url = process.env.REACT_APP_PRODUCTS_URL;

  console.log("url", url);

  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);

  const { Option } = Select;
  const handleChangeOption = (value) => {
    console.log(`selected ${value}`);
    setWine(false);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="border-[#E7E7E7] border rounded-[8px] py- px-5 flex justify-center items-center gap-3 hover:text-black">
          <ArrowBackIcon style={{ width: "22px" }} />
          Previous
        </a>
        // <a>Previous</a>
      );
    }
    if (type === "next") {
      return (
        <a className="border-[#E7E7E7] border rounded-[8px] py- px-5 flex justify-center items-center gap-3 hover:text-black">
          Next
          <ArrowForwardIcon style={{ width: "22px" }} />
        </a>
      );
    }
    return originalElement;
  };
  // const Data = listdata;
  // console.log("data", listdata);

  const [wine, setWine] = useState(false);
  const [Segment, setSegment] = useState(false);
  const [Variety, setVariety] = useState(false);
  const [Country, setCountry] = useState(false);
  const [Region, setRegion] = useState(false);
  const [categoryAndSubcategory, setCategoryAndSubcategory] = useState([]);
  const [Availability, setAvailability] = useState(false);
  const [Price, setPrice] = useState(false);
  const [Tags, setTags] = useState(false);
  const [Sort, setSort] = useState(false);
  const [page, setPage] = useState(1);
  const [isWine, setIsWine] = useState(false);
  const [totalData, setTotalData] = useState({});
  const [countries, setCountries] = useState([]);
  const [segments, setSegments] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [regions, setRegions] = useState([]);
  const [regionsAvailable, setRegionsAvailable] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { useToken } = theme;
  const { token } = useToken();
  const dropdownRef = useRef(null);
  const sortRef = useRef(null);
  const productData = useSelector((state) => state.product);

  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [filterAndSort, setFilterAndSort] = useState({
    filter: {
      category: [],
      subCategory: [],
      segment: [],
      variety: [],
      country: [],
      regionAvailability: [],
      region: [],
      minPrice: 0,
      maxPrice: 0,
      tags: [],
      page: 0,
    },
    sort: {
      sortBy: "",
      sortOrder: "",
    },
  });

  const SortBtn = () => {
    setSort(!Sort);
  };

  //  for redux
  const dispatch = useDispatch();
  const totalProducts = useSelector((state) => state.totalPage.totalProducts);

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Product added successfully!",
    });
  };

  const addCart = (id, itemData, actionType) => {
    const data = itemData.product;
    const quantity = itemData.quantity;
    console.log(quantity, "quantity");
    const { buyerId, organisationId } = JSON.parse(
      localStorage.getItem("buyerInfo")
    );
    console.log("id", id, "item", data, "actionType", actionType);

    fetch(`${url}/api/Product/AddToCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId,
        productId: data?.productId,
        title: data?.title,
        description: data?.description,
        articleId: data?.articleID,
        skUcode: data?.skUcode,
        productImageUrls: data?.productImageUrls,
        unitofMeasure: data?.unitofMeasure,
        innerUnitofMeasure: data?.innerUnitofMeasure,
        configuration: data?.configuration,
        award: data?.award,
        brand: data?.brand,
        departmentId: data?.departmentId,
        categoryId: data?.categoryId,
        subCategoryId: data?.subCategoryId,
        segmentId: data?.segmentId,
        variety: [],
        vintage: data?.vintage,
        abv: data?.abv,
        globalPrice: data?.globalPrice,
        luCcost: data?.luCcost,
        buyPrice: data?.buyPrice,
        gstFlag: true,
        wetFlag: true,
        trackInventory: true,
        region: data?.region,
        availableQty: data?.availableQty,
        quantity: quantity,
        stockThreshold: data?.stockThreshold,
        stockStatus: data?.stockStatus,
        regionAvailability: data?.regionAvailability,
        productStatus: data?.productStatus,
        visibility: data?.visibility,
        minimumOrder: data?.minimumOrder,
        tags: data?.tags,
        countryOfOrigin: data?.countryOfOrigin || "",
        barcodes: data?.barcodes,
        esgStatus: data?.esgStatus,
        healthRating: data?.healthRating,
        organisationId: organisationId,
        isActive: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          success();
          const cartId = data.data[0].cartId;
          const updatedCartList = data?.data.map((item) => {
            return {
              product: item,
              quantity: item?.quantity,
            };
          });
          dispatch(setCart(updatedCartList));
          localStorage.setItem("cartId", cartId);
          console.log(data, "add data");
        } else {
          warning(data.message);
        }
        console.log("cat response", data);
      });
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput(name) {
    const { organisationId } = JSON.parse(localStorage.getItem("buyerInfo"));
    setLoading(true);
    fetch(
      `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/product/Filter?OrganisationId=${organisationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localFilterSort),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("filter response", data);
        if (data.success) {
          dispatch(
            setProductData(
              data.data.map((item) => {
                return {
                  product: item,
                  quantity: 0,
                };
              })
            )
          );
          dispatch(setTotalProducts(data.total));
        }
        //  else {
        //   warning();
        // }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const processChange = debounce((name) => saveInput(name));

  const onShowSizeChange = (current, pageSize) => {
    console.log("page", current, pageSize);
    setPage(current);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSort(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const selectDropdowns = document.querySelectorAll(
          ".ant-select-dropdown"
        );
        let isInsideSelectDropdown = false;

        for (const dropdown of selectDropdowns) {
          if (dropdown.contains(event.target)) {
            isInsideSelectDropdown = true;
            break;
          }
        }

        if (!isInsideSelectDropdown) {
          setWine(false);
          setSegment(false);
          setVariety(false);
          setCountry(false);
          setRegion(false);
          setAvailability(false);
          setPrice(false);
          setTags(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, sortRef]);

  useEffect(() => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/ShowCategorySubcategory`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Category and Subcategory >>", data);

        console.log(
          "cat drop",
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );

        setCategoryAndSubcategory(
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );
      });

    getCountry()
      .then((data) => {
        console.log("country", data);
        setCountries(
          data.map((country) => {
            return {
              label: country?.countryName,
              value: country?.countryID,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    getRegionAvailable()
      .then((data) => {
        setRegionsAvailable(
          data.map((region) => {
            return {
              label: region.stateName,
              value: region.stateId,
            };
          })
        );
      })
      .catch((error) => console.log(error));

    getTags()
      .then((data) => {
        setTagsList(
          data.map((tag) => {
            return {
              label: tag.tagName,
              value: tag.tagId,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const { organisationId } = JSON.parse(localStorage.getItem("buyerInfo"));
    console.log("dfg", localStorage.getItem("buyerInfo"));
    const apiUrl = `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getAll?page=${page}&OrganisationId=${organisationId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const prodauctData = data.data[0];
        localStorage.setItem("organisationId", prodauctData.organisationId);
        localStorage.setItem("catalogueId", prodauctData.catalogueId);
        if (data.success) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);

          dispatch(
            setProductData(
              data.data.map((item) => {
                return {
                  product: item,
                  quantity: 0,
                };
              })
            )
          );
          dispatch(setTotalProducts(data.total));
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [page]);

  console.log(totalData, "alldata");

  console.log(productData, "products data");

  const WineBtn = () => {
    setWine(!wine);

    setSegment(false);

    setVariety(false);

    setCountry(false);

    setRegion(false);

    setAvailability(false);

    setPrice(false);

    setTags(false);
  };
  const SegmentBtn = () => {
    setSegment(!Segment);

    setWine(false);

    setVariety(false);

    setCountry(false);

    setRegion(false);

    setAvailability(false);

    setPrice(false);

    setTags(false);
  };
  const VarietyBtn = () => {
    setVariety(!Variety);

    setWine(false);

    setSegment(false);

    setCountry(false);

    setRegion(false);

    setAvailability(false);

    setPrice(false);

    setTags(false);
  };
  const CountryBtn = () => {
    setCountry(!Country);

    setWine(false);

    setSegment(false);

    setVariety(false);

    setRegion(false);

    setAvailability(false);

    setPrice(false);

    setTags(false);
  };
  const RegionBtn = () => {
    setRegion(!Region);

    setWine(false);

    setSegment(false);

    setVariety(false);

    setCountry(false);

    setAvailability(false);

    setPrice(false);

    setTags(false);
  };
  const AvailabilityBtn = () => {
    setAvailability(!Availability);

    setWine(false);

    setSegment(false);

    setVariety(false);

    setCountry(false);

    setRegion(false);

    setPrice(false);

    setTags(false);
  };
  const PriceBtn = () => {
    setPrice(!Price);
    setWine(false);
    setSegment(false);
    setVariety(false);
    setCountry(false);
    setRegion(false);
    setAvailability(false);
    setTags(false);
  };
  const TagsBtn = () => {
    setTags(!Tags);
    setWine(false);
    setSegment(false);
    setVariety(false);
    setCountry(false);
    setRegion(false);
    setAvailability(false);
    setPrice(false);
  };

  const getWineSpecific = (e, newSubcategoryIds) => {
    getSegments(newSubcategoryIds).then((data) => {
      console.log("segments", data);
      if (data) {
        setSegments(
          data.map((segment) => {
            return {
              label: segment?.segmentName,
              value: segment?.segmentId,
            };
          })
        );
      }
    });

    getRegion()
      .then((data) => {
        setRegions(
          data.map((region) => {
            return {
              label: region?.regionName,
              value: region?.regionId,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleIncrementDecrement = (id, actionType) => {
    const updatedProductData = productData.map((item) => {
      if (item?.product?.productId === id) {
        if (actionType === "decrement" && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else if (actionType === "increment") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }
      return item;
    });

    dispatch(setProductData(updatedProductData));
  };

  // Price slider handler
  const handleChange = (e, value) => {
    console.log("price slider", e, value);

    const newFilter = {
      ...localFilterSort.filter,
      minPrice: e[0],
      maxPrice: e[1],
    };

    localFilterSort = {
      ...localFilterSort,
      filter: newFilter,
    };

    setFilterAndSort((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        minPrice: e[0],
        maxPrice: e[1],
      },
    }));
    setWine(false);
  };

  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [regionAvailability, setRegionAvailability] = useState([]);
  const [tagsValue, setTagsvalue] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSort(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const selectDropdowns = document.querySelectorAll(
          ".ant-select-dropdown"
        );
        let isInsideSelectDropdown = false;

        for (const dropdown of selectDropdowns) {
          if (dropdown.contains(event.target)) {
            isInsideSelectDropdown = true;
            break;
          }
        }

        if (!isInsideSelectDropdown) {
          setWine(false);
          setSegment(false);
          setVariety(false);
          setCountry(false);
          setRegion(false);
          setAvailability(false);
          setPrice(false);
          setTags(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, sortRef]);

  useEffect(() => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/ShowCategorySubcategory`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Category and Subcategory >>", data);

        console.log(
          "cat drop",
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );

        setCategoryAndSubcategory(
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );
      });
  }, []);

  const updatedFilterAndSort = () => {
    return filterAndSort;
  };
  const [filter, setFilter] = useState(false);

  const toggleCategoryAndSubcategory = (e, id, name) => {
    console.log("toggleCategoryAndSubcategory", e, id, name);
    // Handling pagination

    if (name === "category") {
      // setOpen(!Open);
      const newCategoryIds = e.target.checked
        ? [...localFilterSort.filter.category, id]
        : localFilterSort.filter.category.filter((catId) => catId !== id);

      const newFilter = {
        ...localFilterSort.filter,
        category: newCategoryIds,
      };
      console.log(newCategoryIds, "id.key");
      if (e.target.checked) {
        setFilter(true);
      } else {
        setFilter(false);
      }

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
      console.log(newCategoryIds, "newCategoryIds--->");
    } else if (name === "subcategory") {
      const newSubcategoryIds = id.map((subCat) => subCat.key);

      setIsWine(e.includes("wine") || e.includes("Wine"));

      const newFilter = {
        ...localFilterSort.filter,
        subCategory: newSubcategoryIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });

      (e.includes("wine") || e.includes("Wine")) &&
        getVariety()
          .then((data) => {
            console.log("variety", data);
            setVarieties(
              data.map((variety) => {
                return {
                  label: variety?.grapeVarietyName,
                  value: variety?.grapeVarietyId,
                };
              })
            );
          })
          .catch((error) => console.log(error));

      getWineSpecific(e, newSubcategoryIds);
    } else if (name === "segment") {
      const newSegmentIds = id.map((segment) => segment.key);

      const newFilter = {
        ...localFilterSort.filter,
        segment: newSegmentIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    } else if (name === "variety") {
      const newVarietyIds = id.map((variety) => variety.key);

      const newFilter = {
        ...localFilterSort.filter,
        variety: newVarietyIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    } else if (name === "country") {
      const newCountryIds = id.map((country) => country.key);
      setCountryList(id);
      id.length > 0 ? setFilter(true) : setFilter(false);

      const newFilter = {
        ...localFilterSort.filter,
        country: newCountryIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };
      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    } else if (name === "region") {
      const newRegionIds = id.map((region) => region.key);

      const newFilter = {
        ...localFilterSort.filter,
        region: newRegionIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    } else if (name === "regionAvailable") {
      const newRegionAvailableIds = id.map((region) => region.key);
      setRegionAvailability(id);
      id.length > 0 ? setFilter(true) : setFilter(false);
      const newFilter = {
        ...localFilterSort.filter,
        regionAvailability: newRegionAvailableIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    } else if (name === "tags") {
      id.length > 0 ? setFilter(true) : setFilter(false);

      const newTagsIds = id.map((tag) => tag.key);
      setTagsvalue(id);

      const newFilter = {
        ...localFilterSort.filter,
        tags: newTagsIds,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    }
    console.log("filterAndSort", filterAndSort);
    console.log("localFilterAndSort", localFilterSort);

    processChange();
  };

  const toggleSort = (e, sortBy, sortOrder) => {
    const newSort = {
      ...localFilterSort.sort,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    localFilterSort = {
      ...localFilterSort,
      sort: newSort,
    };

    setFilterAndSort((prevState) => ({
      ...prevState,
      sort: {
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    }));
    console.log("filterAndSort", filterAndSort);
    console.log("localFilterAndSort", localFilterSort);

    processChange();
  };

  return (
    <>
      <style>
        {`
       .product-list:hover{
        background:${token.bannerThemeColor} !important
       }
       .product-list:hover h5{
        color: ${token.commonThemeColor} !important;
       }
       .product-list:hover svg{
        fill: ${token.commonThemeColor} !important;
       }
        .green-checkbox input[type="checkbox"]:checked::before {
         
          color: ${token.commonThemeColor} !important;
        }
        .green-checkbox input[type="checkbox"]:checked {
          background-color: white;
        
          border: 1px solid ${token.commonThemeColor} !important;
        }
        .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled),.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
          background:${token.bannerThemeColor} !important
        }
       
        .ant-select-item:hover h5,.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) h5,.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state,.ant-pagination .ant-pagination-item-active a{
          color:${token.commonThemeColor} !important;
        }
        .ant-pagination .ant-pagination-item-active{
          border-color:${token.commonThemeColor} !important;
        }
        `}
      </style>
      {contextHolder}
      <div className="md:w-4/5	w-full md:p-0 px-6 mx-auto">
        <div
          className=" relative border border-[#E7E7E7] rounded-lg  px-4 py-2 flex items-center justify-between"
          ref={sortRef}
        >
          <div className="">
            <p className="font-semibold md:text-2xl text-xl">Products</p>
            <p className="text-sm font-normal text-[#637381]">
              ({totalProducts} results)
            </p>
          </div>
          <button
            className="border border-[#E7E7E7] rounded-md px-[13px] py-[8px] flex items-center justify-center gap-2"
            onClick={() => {
              SortBtn();
            }}
          >
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.403809 9.61193V8.07468H5.01556V9.61193H0.403809ZM0.403809 5.76881V4.23156H9.62731V5.76881H0.403809ZM0.403809 1.92568V0.388428H14.2391V1.92568H0.403809Z"
                fill="#637381"
              />
            </svg>

            <p className="text-base font-normal text-[#2B4447]">Sort</p>
          </button>

          {Sort && (
            <>
              <div className=" border border-[#E7E7E7] w-[262px] bg-white rounded-lg shadow-md p-4 z-50 absolute top-[50px] right-0">
                <div className="flex justify-between items-center pb-2">
                  <h5 className="text-base font-medium text-[#2B4447] ">
                    Alphabetical
                  </h5>
                  <KeyboardArrowRightIcon style={{ fill: "#2B4447" }} />
                </div>
                <div className="pb-4 border-b border-[#E7E7E7]">
                  <div className="flex items-center mt-3 green-checkbox">
                    <input
                      id="az"
                      type="checkbox"
                      checked={
                        filterAndSort.sort.sortBy === "title" &&
                        filterAndSort.sort.sortOrder === "asc"
                      }
                      onChange={(e) => toggleSort(e, "title", "asc")}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="az" className="ml-2">
                      <h5 className="text-base font-normal text-[#637381]">
                        A - Z
                      </h5>
                    </label>
                  </div>
                  <div className="flex items-center mt-3 green-checkbox">
                    <input
                      id="za"
                      type="checkbox"
                      checked={
                        filterAndSort.sort.sortBy === "title" &&
                        filterAndSort.sort.sortOrder === "desc"
                      }
                      onChange={(e) => toggleSort(e, "title", "desc")}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="za" className="ml-2">
                      <h5 className="text-base font-normal text-[#637381]">
                        Z - A
                      </h5>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <h5 className="text-base font-medium text-[#2B4447] ">
                    Price
                  </h5>
                  <KeyboardArrowRightIcon style={{ fill: "#2B4447" }} />
                </div>
                <div className="pb-4 border-b border-[#E7E7E7]">
                  <div className="flex items-center mt-3 green-checkbox">
                    <input
                      id="lowHigh"
                      type="checkbox"
                      checked={
                        filterAndSort.sort.sortBy === "price" &&
                        filterAndSort.sort.sortOrder === "asc"
                      }
                      onChange={(e) => toggleSort(e, "price", "asc")}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="lowHigh" className="ml-2">
                      <h5 className="text-base font-normal text-[#637381]">
                        Low - High
                      </h5>
                    </label>
                  </div>
                  <div className="flex items-center mt-3 green-checkbox">
                    <input
                      id="highLow"
                      type="checkbox"
                      checked={
                        filterAndSort.sort.sortBy === "price" &&
                        filterAndSort.sort.sortOrder === "desc"
                      }
                      onChange={(e) => toggleSort(e, "price", "desc")}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="highLow" className="ml-2">
                      <h5 className="text-base font-normal text-[#637381]">
                        High - Low
                      </h5>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className="flex md:flex-nowrap  gap-10	flex-wrap py-8"
          ref={dropdownRef}
        >
          <div className="md:w-1/4 w-full overflow-y-scroll   py-4">
            <div className="flex items-center gap-2 pb-3">
              {filter === true ? (
                <FilterAltIcon style={{ fill: "#2B4447", stroke: "#2B4447" }} />
              ) : (
                <FilterAltIcon style={{ fill: "#fff", stroke: "#2B4447" }} />
              )}

              <h5 className="text-[20px] font-semibold text-[#2B4447]">
                Filter
              </h5>
            </div>
            <div className="border-b border-[#E7E7E7] cursor-pointer">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list `}
                onClick={() => {
                  WineBtn();
                }}
                style={{
                  background: wine === true ? token.bannerThemeColor : "#fff",
                }}
              >
                <h5
                  className={`text-base font-medium `}
                  style={{
                    color: wine === true ? token.commonThemeColor : "#2B4447",
                  }}
                >
                  Sub-category
                </h5>

                <KeyboardArrowRightIcon
                  style={{
                    fill: wine === true ? token.buttonThemeColor : "#2B4447",
                  }}
                  className={` ${wine === true ? "rotate-90" : "rotate-0"}`}
                />
              </div>
              {wine && (
                <div className=" z-10	left-0 w-max product-dropdown rounded-lg	h-fit py-3	">
                  <ul className="dropdown-content ">
                    {categoryAndSubcategory &&
                      categoryAndSubcategory.map((category, idx) => (
                        <li className="py-2.5	px-4	">
                          <div className="flex items-center green-checkbox">
                            <input
                              id={idx}
                              type="checkbox"
                              value={category.categoryId}
                              onClick={(e) =>
                                toggleCategoryAndSubcategory(
                                  e,
                                  category.categoryId,
                                  "category"
                                )
                              }
                            />
                            <label
                              htmlFor={idx}
                              className="ml-2 text-sm font-medium text-gray"
                            >
                              {category.categoryName}
                            </label>
                          </div>
                          {filterAndSort.filter.category.includes(
                            category.categoryId
                          ) && (
                            <ul className="dropdown-content">
                              <Select
                                // open={true}
                                mode="multiple"
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Search|"
                                onChange={(e, value) =>
                                  toggleCategoryAndSubcategory(
                                    e,
                                    value,
                                    "subcategory"
                                  )
                                }
                                optionLabelProp="label"
                              >
                                {category.subcategory.map((subcat, i) => (
                                  <>
                                    {filterAndSort.filter.category.includes(
                                      category.categoryId
                                    ) && (
                                      <Option
                                        value={subcat.name}
                                        key={subcat.id}
                                      >
                                        <Space>{subcat.name}</Space>
                                      </Option>
                                    )}
                                  </>
                                ))}
                              </Select>
                            </ul>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {segments.length > 0 && (
              <div className=" border-b border-[#E7E7E7]">
                <div
                  className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff]
                 
                  `}
                  onClick={() => {
                    SegmentBtn();
                  }}
                  style={{
                    background:
                      Segment === true ? token.bannerThemeColor : "#fff",
                  }}
                >
                  <h5
                    className={`text-base font-medium  `}
                    style={{
                      color:
                        Segment === true ? token.commonThemeColor : "#2B4447",
                    }}
                  >
                    Segment
                  </h5>

                  <KeyboardArrowRightIcon
                    style={{
                      fill:
                        Segment === true ? token.buttonThemeColor : "#2B4447",
                    }}
                    className={`${Segment === true ? "rotate-90" : "rotate-0"}`}
                  />
                </div>

                {Segment && (
                  <>
                    <div className="relative">
                      <SearchIcon
                        className="absolute top-[22px] right-[8px] z-10"
                        style={{ fill: "#d9d9db" }}
                      />
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Search"
                        className=""
                        optionLabelProp="label"
                        onChange={(e, value) =>
                          toggleCategoryAndSubcategory(e, value, "segment")
                        }
                        open={true}
                      >
                        {segments.map((item) => {
                          return (
                            <>
                              <Option value={item.label} key={item.value}>
                                <div className="flex items-center my-1">
                                  <label
                                    htmlFor="default-checkbox"
                                    className="ml-2 "
                                  >
                                    <h5 className="text-base font-normal text-[#637381]">
                                      {item.label}
                                    </h5>
                                  </label>
                                </div>
                              </Option>
                            </>
                          );
                        })}
                      </Select>
                    </div>
                  </>
                )}
              </div>
            )}

            {isWine && (
              <div className="  border-b border-[#E7E7E7]">
                <div
                  className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] ${
                    Variety === true ? "bg-[#f4f7ff]" : "bg-[#fff]"
                  }`}
                  onClick={() => {
                    VarietyBtn();
                  }}
                >
                  <h5 className="text-base font-medium text-[#2B4447]">
                    Variety
                  </h5>

                  <KeyboardArrowRightIcon style={{ fill: "#2B4447" }} />
                </div>

                {Variety && (
                  <>
                    <div className="relative">
                      <SearchIcon
                        className="absolute top-[22px] right-[8px] z-10"
                        style={{ fill: "#d9d9db" }}
                      />
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Search"
                        className=""
                        optionLabelProp="label"
                        onChange={(e, value) =>
                          toggleCategoryAndSubcategory(e, value, "variety")
                        }
                        open={true}
                      >
                        {varieties.map((item) => {
                          return (
                            <>
                              <Option value={item.label} key={item.value}>
                                <div className="flex items-center my-1">
                                  <label
                                    htmlFor="default-checkbox"
                                    className="ml-2 "
                                  >
                                    <h5 className="text-base font-normal text-[#637381]">
                                      {item.label}
                                    </h5>
                                  </label>
                                </div>
                              </Option>
                            </>
                          );
                        })}
                      </Select>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="  border-b border-[#E7E7E7] cursor-pointer">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list
              
                `}
                onClick={() => {
                  CountryBtn();
                }}
                style={{
                  background:
                    Country === true ? token.bannerThemeColor : "#fff",
                }}
              >
                <h5
                  className={`text-base font-medium`}
                  style={{
                    color:
                      Country === true ? token.commonThemeColor : "#2B4447",
                  }}
                >
                  Country
                </h5>

                <KeyboardArrowRightIcon
                  style={{
                    fill: Country === true ? token.buttonThemeColor : "#2B4447",
                  }}
                  className={` ${Country === true ? "rotate-90" : "rotate-0"}`}
                />
              </div>

              {Country && (
                <>
                  <div className="relative">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search"
                      className=""
                      optionLabelProp="label"
                      value={countryList}
                      onChange={(e, value) =>
                        toggleCategoryAndSubcategory(e, value, "country")
                      }
                      open={true}
                    >
                      {countries.map((item) => {
                        return (
                          <>
                            <Option value={item.label} key={item.value}>
                              <div className="flex items-center my-1">
                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.label}
                                  </h5>
                                </label>
                              </div>
                            </Option>
                          </>
                        );
                      })}
                    </Select>
                  </div>
                </>
              )}
            </div>

            <div className="  border-b border-[#E7E7E7] cursor-pointer ">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff]  product-list
`}
                onClick={() => {
                  AvailabilityBtn();
                }}
                style={{
                  background:
                    Availability === true ? token.bannerThemeColor : "#fff",
                }}
              >
                <h5
                  className={`text-base font-medium `}
                  style={{
                    color:
                      Availability === true
                        ? token.commonThemeColor
                        : "#2B4447",
                  }}
                >
                  Region availability
                </h5>

                <KeyboardArrowRightIcon
                  style={{
                    fill:
                      Availability === true
                        ? token.buttonThemeColor
                        : "#2B4447",
                  }}
                  className={` ${
                    Availability === true ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {Availability && (
                <>
                  <div className="relative">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search"
                      className=""
                      optionLabelProp="label"
                      onChange={(e, value) =>
                        toggleCategoryAndSubcategory(
                          e,
                          value,
                          "regionAvailable"
                        )
                      }
                      open={true}
                    >
                      {regionsAvailable.map((item) => {
                        return (
                          <>
                            <Option value={item.label} key={item.value}>
                              <div className="flex items-center my-1">
                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.label}
                                  </h5>
                                </label>
                              </div>
                            </Option>
                          </>
                        );
                      })}
                    </Select>
                  </div>
                </>
              )}
            </div>

            {isWine && (
              <div className=" border-b border-[#E7E7E7] cursor-pointer">
                <div
                  className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list
                
                  `}
                  onClick={() => {
                    RegionBtn();
                  }}
                  style={{
                    background:
                      Region === true ? token.bannerThemeColor : "#fff",
                  }}
                >
                  <h5
                    className={`text-base font-medium `}
                    style={{
                      color:
                        Region === true ? token.commonThemeColor : "#2B4447",
                    }}
                  >
                    Region
                  </h5>

                  <KeyboardArrowRightIcon
                    style={{
                      fill:
                        Region === true ? token.buttonThemeColor : "#2B4447",
                    }}
                    className={` ${Region === true ? "rotate-90" : "rotate-0"}`}
                  />
                </div>

                {Region && (
                  <>
                    <div className="relative">
                      <SearchIcon
                        className="absolute top-[22px] right-[8px] z-10"
                        style={{ fill: "#d9d9db" }}
                      />
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Search"
                        className=""
                        optionLabelProp="label"
                        value={regionAvailability}
                        onChange={(e, value) =>
                          toggleCategoryAndSubcategory(e, value, "region")
                        }
                        open={true}
                      >
                        {regions.map((item) => {
                          return (
                            <>
                              <Option value={item.label} key={item.value}>
                                <div className="flex items-center my-1">
                                  <label
                                    htmlFor="default-checkbox"
                                    className="ml-2 "
                                  >
                                    <h5 className="text-base font-normal text-[#637381]">
                                      {item.label}
                                    </h5>
                                  </label>
                                </div>
                              </Option>
                            </>
                          );
                        })}
                      </Select>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className=" border-b border-[#E7E7E7] cursor-pointer ">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list
               
                `}
                onClick={() => {
                  PriceBtn();
                }}
                style={{
                  background: Price === true ? token.bannerThemeColor : "#fff",
                }}
              >
                <h5
                  className={`text-base font-medium `}
                  style={{
                    color: Price === true ? token.commonThemeColor : "#2B4447",
                  }}
                >
                  Price
                </h5>

                <KeyboardArrowRightIcon
                  style={{
                    fill: Price === true ? token.buttonThemeColor : "#2B4447",
                  }}
                  className={` ${Price === true ? "rotate-90" : "rotate-0"}`}
                />
              </div>

              {Price && (
                <>
                  <div id="container">
                    <div className="wrap">
                      <div className="sliderwrap">
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          range
                          defaultValue={[20, 50]}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                        />
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <div className="box">
                          <h5 className="text-base font-medium text-[#637381] mb-2">
                            Min. Price
                          </h5>

                          <div className="border border-[#E7E7E7] rounded-md py-[5px] px-[14px]">
                            <p className="font-normal text-sm text-[#637381]">
                              $ {filterAndSort?.filter?.minPrice}
                            </p>
                          </div>
                        </div>

                        <div className="box">
                          <h5 className="text-base font-medium text-[#637381] mb-2">
                            Max. Price
                          </h5>

                          <div className="border border-[#E7E7E7] rounded-md py-[5px] px-[14px]">
                            <p className="font-normal text-sm text-[#637381]">
                              $ {filterAndSort?.filter?.maxPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className=" border-b border-[#E7E7E7] cursor-pointer">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list
               
                `}
                onClick={() => {
                  TagsBtn();
                }}
                style={{
                  background: Tags === true ? token.bannerThemeColor : "#fff",
                }}
              >
                <h5
                  className={`text-base font-medium`}
                  style={{
                    color: Tags === true ? token.commonThemeColor : "#2B4447",
                  }}
                >
                  Tags
                </h5>

                <KeyboardArrowRightIcon
                  style={{
                    fill: Tags === true ? token.buttonThemeColor : "#2B4447",
                  }}
                  className={` ${Tags === true ? "rotate-90" : "rotate-0"}`}
                />
              </div>

              {Tags && (
                <>
                  <div className="relative">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search"
                      className=""
                      optionLabelProp="label"
                      onChange={(e, value) =>
                        toggleCategoryAndSubcategory(e, value, "tags")
                      }
                      open={true}
                      value={tagsValue}
                    >
                      {tagsList.map((item) => {
                        return (
                          <>
                            <Option value={item.label} key={item.value}>
                              <div className="flex items-center my-1">
                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.label}
                                  </h5>
                                </label>
                              </div>
                            </Option>
                          </>
                        );
                      })}
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="md:w-9/12   w-full mx-auto">
            {productData.length === 0 ? (
              <div className="flex justify-center items-center h-full w-full">
                {/* <h5 className="text-2xl font-semibold capitalize ">
                no product found
              </h5> */}
                <img
                  src="/assets/no-product.jpg"
                  className="w-[100px]"
                  alt=""
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2  sm:grid-cols-3 lg:grid-cols-3  md:gap-4 gap-2   ">
                {productData.map((item, index) => (
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="border border-[#00000021] shadow-custom p-3 rounded-md">
                      <div className=" relative">
                        {/* <div className="w-[30px] h-[30px] rounded-full bg-[#fff] absolute top-[15px] right-[15px] flex justify-center items-center">
                          <FavoriteBorderIcon style={{ fill: "#2B4447" }} />
                        </div> */}
                        <div className="h-[150px]  ">
                          <img
                            src={
                              item?.product?.productImageUrls
                                ? item?.product?.productImageUrls[0]
                                : ""
                            }
                            alt=""
                            className="cursor-pointer w-full h-full object-contain"
                            onClick={() =>
                              navigate(
                                `/home/product-details/${item?.product?.productId}`
                              )
                            }
                          />
                        </div>
                      </div>
                      <h4
                        onClick={() =>
                          navigate(
                            `/home/product-details/${item?.product?.productId}`
                          )
                        }
                        className="text-lg font-semibold mt-3 cursor-pointer"
                      >
                        {item?.product?.title.length > 12
                          ? `${item?.product?.title.slice(0, 25)}...`
                          : item?.product?.title}
                      </h4>
                      <h4 className="md:text-base text-sm font-semibold text-[#2B4447] mt-1">
                        {item?.product?.brand}
                      </h4>

                      <p
                        className="md:text-base text-sm font-medium text-[#637381] mt-2"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "25ch",
                        }}
                      >
                        {item?.product?.configuration}
                      </p>

                      <h4 className="md:text-base text-sm font-semibold text-[#2B4447] mt-1">
                        ${item?.product?.globalPrice}
                      </h4>

                      <div className="flex sm:justify-between sm:items-center sm:flex-row flex-col	 sm:gap-0 gap-2 mt-2 ">
                        <div className="w-fit border border-[#E7E7E7] md:py-[6px] py-[4px] md:px-[12px] px-[8px] rounded-md flex justify-center items-center md:gap-3 gap-2">
                          <p
                            className="text-[#637381] cursor-pointer"
                            onClick={() =>
                              handleIncrementDecrement(
                                item?.product?.productId,
                                "decrement"
                              )
                            }
                          >
                            -
                          </p>

                          <p className="text-[#637381] md:text-sm text-[10px]">
                            {" "}
                            {item?.quantity}
                          </p>

                          <p
                            className="text-[#637381] cursor-pointer"
                            onClick={() =>
                              handleIncrementDecrement(
                                item?.product?.productId,
                                "increment"
                              )
                            }
                          >
                            +
                          </p>
                        </div>

                        <div
                          className={`add-to-cart-btn ${
                            item?.quantity > 0
                              ? "bg-[#563FE3] "
                              : "bg-[#D1D5DB]"
                          } rounded-md py-2.5 px-3 md:text-sm text-[10px] font-medium text-white flex justify-center items-center gap-2`}
                          style={{
                            background:
                              item?.quantity > 0
                                ? token.buttonThemeColor
                                : "#D1D5DB",
                          }}
                        >
                          <button
                            className="flex justify-center items-center gap-2 "
                            onClick={() => {
                              if (item?.quantity > 0) {
                                addCart(
                                  item?.product?.productId,
                                  item,
                                  "increment"
                                );
                              }
                            }}
                            disabled={item?.quantity <= 0}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_128_2591)">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.6641 15.1105H4.48791C2.21924 15.1105 0.478794 14.2912 0.973161 10.9931L1.5488 6.52349C1.85354 4.87785 2.90323 4.24805 3.82425 4.24805H11.3549C12.2895 4.24805 13.2782 4.92526 13.6304 6.52349L14.2059 10.9931C14.6258 13.9187 12.9329 15.1105 10.6641 15.1105Z"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10.7659 4.08516C10.7659 2.31981 9.33475 0.8887 7.56937 0.8887C6.71927 0.885107 5.90276 1.22028 5.30038 1.82012C4.698 2.41996 4.35937 3.23506 4.35938 4.08516"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9.76376 7.41846H9.72998"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5.44988 7.41846H5.41602"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_128_2591">
                                  <rect
                                    width="15.1111"
                                    height="16"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                ))}
              </div>
            )}

            <div className="mt-8">
              {loading === false && (
                <Pagination
                  // itemActiveBg={"#F8FAFC"}
                  showSizeChanger={false}
                  defaultCurrent={1}
                  pageSize={9}
                  total={totalProducts}
                  onChange={onShowSizeChange}
                  itemRender={itemRender}
                  className="flex justify-between items-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
