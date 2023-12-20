import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
    searchByValue: "",
    category: [],
    subCategory: [],
    segment: [],
    variety: [],
    countryOfOrigin: [],
    regionAvailability: [],
    region: [],
    minPrice: 0,
    maxPrice: 0,
    tags: [],
    page: 1,
  },
  sort: {
    sortBy: "",
    sortOrder: "",
  },
};

let categoryList = [];

const ProductList = () => {
  const url = process.env.REACT_APP_PRODUCTS_URL;
  const catalogueId = localStorage.getItem("catalogueId");
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);
  const [selectSubcategory, setSelectSubcategory] = useState([]);

  const { Option } = Select;

  localFilterSort = {
    ...localFilterSort,
    filter: {
      ...localFilterSort.filter,

      searchByValue: searchTerm,
    },
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="  hover:text-black">
          <ArrowBackIosIcon style={{ width: "13px" }} />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="  hover:text-black">
          <ArrowForwardIosIcon style={{ width: "13px" }} />
        </a>
      );
    }
    return originalElement;
  };

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
  const [selectSlider, setSelectSlider] = useState([]);
  const navigate = useNavigate();
  const [filterAndSort, setFilterAndSort] = useState({
    filter: {
      category: [],
      subCategory: [],
      segment: [],
      variety: [],
      countryOfOrigin: [],
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
    const availableQty = itemData.product.availableQty;

    const { buyerId, organisationId } = JSON.parse(
      localStorage.getItem("buyerInfo")
    );

    if (quantity <= availableQty) {
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
          } else {
            warning(data.message);
          }
        });
    } else {
      warning(`Please add product below available quantity ${availableQty}`);
    }
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      processChange((searchTerm || "") && "clear");
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function saveInput(name) {
    setLoading(true);

    if (name === "clear") {
      setPage(1);
      localFilterSort = {
        ...localFilterSort,
        filter: {
          ...localFilterSort.filter,
          page: 1,
        },
      };
    }

    fetch(
      `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/product/Filter?CatalogueId=${catalogueId}`,
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
        } else {
          dispatch(setProductData([]));

          dispatch(setTotalProducts(data.total));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const processChange = debounce((name) => saveInput(name));

  const onShowSizeChange = (current, pageSize) => {
    setPage(current);
    localFilterSort = {
      ...localFilterSort,
      filter: {
        ...localFilterSort.filter,
        page: current,
      },
    };
    processChange();
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

  const handleIncrementDecrement = (id, actionType, availableQty) => {
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
    setPage(1);
    setSelectSlider(e);
    const newFilter = {
      ...localFilterSort.filter,
      minPrice: e[0],
      maxPrice: e[1],
      page: 1,
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
    processChange();
    setWine(false);
  };
  const [regionAvailability, setRegionAvailability] = useState([]);
  const [tagsValue, setTagsvalue] = useState([]);

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

  const [filter, setFilter] = useState(false);

  const toggleCategoryAndSubcategory = (e, id, name, categoryName) => {
    setPage(1);
    if (name === "category") {
      const newCategoryIds = e.target.checked
        ? [...localFilterSort.filter.category, id]
        : localFilterSort.filter.category.filter((catId) => catId !== id);

      if (!e.target.checked) {
        setSelectSubcategory((prev) => {
          categoryList = prev.filter((item) => item.cat !== id);
          return prev.filter((item) => item.cat !== id);
        });
      }

      const newFilter = {
        ...localFilterSort.filter,
        category: newCategoryIds,
        subCategory: categoryList.flatMap((i) => i.sub),
        page: 1,
      };

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
    } else if (name === "subcategory") {
      const newSubcategoryIds = e;

      setSelectSubcategory((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.cat === categoryName
        );

        if (existingIndex !== -1) {
          // Update existing object if categoryName matches prev cat
          categoryList = [
            ...prev.slice(0, existingIndex),
            {
              cat: categoryName,
              sub: e,
            },
            ...prev.slice(existingIndex + 1),
          ];
          return [
            ...prev.slice(0, existingIndex),
            {
              cat: categoryName,
              sub: e,
            },
            ...prev.slice(existingIndex + 1),
          ];
        } else {
          // Create a new object if categoryName doesn't match any prev cat

          categoryList = [
            ...prev,
            {
              cat: categoryName,
              sub: e,
            },
          ];
          return [
            ...prev,
            {
              cat: categoryName,
              sub: e,
            },
          ];
        }
      });

      setIsWine(e.includes("wine") || e.includes("Wine"));

      const newFilter = {
        ...localFilterSort.filter,
        subCategory: categoryList.flatMap((item) => item.sub),
        page: 1,
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
      const newSegmentsName = e;

      const newFilter = {
        ...localFilterSort.filter,
        segment: newSegmentIds,
        page: 1,
      };

      const newSegmentFilter = {
        ...localFilterSort.filter,
        segment: newSegmentsName,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newSegmentFilter,
      });
    } else if (name === "variety") {
      const newVarietyIds = id.map((variety) => variety.key);
      const newVarietyName = e;

      const newFilter = {
        ...localFilterSort.filter,
        variety: newVarietyIds,
        page: 1,
      };

      const newVarietyFilter = {
        ...localFilterSort.filter,
        variety: newVarietyName,
        page: 1,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newVarietyFilter,
      });
    } else if (name === "country") {
      const newCountryIds = id.map((country) => country.value);
      setCountryList(id);
      id.length > 0 ? setFilter(true) : setFilter(false);

      const newFilter = {
        ...localFilterSort.filter,
        countryOfOrigin: newCountryIds,
        page: 1,
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
        page: 1,
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
      const newRegionAvailableName = e;


      setRegionAvailability(id);
      id.length > 0 ? setFilter(true) : setFilter(false);
      const newFilter = {
        ...localFilterSort.filter,
        regionAvailability: newRegionAvailableIds,
        page: 1,
      };

      const newRegionAvailableFilter = {
        ...localFilterSort.filter,
        regionAvailability: newRegionAvailableName,
        page: 1,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newRegionAvailableFilter,
      });
    } else if (name === "tags") {
      id.length > 0 ? setFilter(true) : setFilter(false);

      const newTagsIds = id.map((tag) => tag.key);
      setTagsvalue(id);

      const newFilter = {
        ...localFilterSort.filter,
        tags: newTagsIds,
        page: 1,
      };

      localFilterSort = {
        ...localFilterSort,
        filter: newFilter,
        page: 1,
      };

      setFilterAndSort({
        ...localFilterSort,
        filter: newFilter,
      });
    }

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
    processChange();
  };

  const handleClearSort = () => {
    localFilterSort = {
      ...localFilterSort,
      sort: {
        sortBy: "",
        sortOrder: "",
      },
    };
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
      <div className="xl:w-4/5  w-full xl:p-0 px-6 mx-auto">
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
                <div
                  className="flex justify-end"
                  style={{ paddingRight: "12px" }}
                  onClick={() => {
                    handleClearSort();
                    setSort(false);
                  }}
                >
                  <p
                    className=" cursor-pointer border-b"
                    style={{
                      color: "#fa0000",
                      borderBottom: "1px solid #fa0000",
                    }}
                  >
                    clear
                  </p>
                </div>
                <div className="flex justify-start items-center pb-2">
                  <h5 className="text-base font-medium text-[#2B4447] ">
                    Alphabetical
                  </h5>
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
                <div className="flex justify-start items-center pt-4">
                  <h5 className="text-base font-medium text-[#2B4447] ">
                    Price
                  </h5>
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
          className="flex md:flex-nowrap  gap-6 flex-wrap py-8 min-h-[590px] max-h-[100%]"
          ref={dropdownRef}
        >
          <div className="md:w-1/4 w-full overflow-y-auto   py-4">
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
                <div className=" z-10   left-0 w-full product-dropdown rounded-lg   h-fit py-3  ">
                  <ul className="dropdown-content  min-h-[100%] max-h-[165px] overflow-auto custom-scroll-bar">
                    {categoryAndSubcategory &&
                      categoryAndSubcategory?.map((category, idx) => (
                        <li className="py-2.5   px-4 " key={idx}>
                          <div className="flex items-center green-checkbox">
                            <input
                              id={idx}
                              type="checkbox"
                              checked={filterAndSort.filter.category.includes(
                                category.categoryId
                              )}
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
                                mode="multiple"
                                style={{
                                  width: "260px",
                                }}
                                placeholder="Search"
                                value={selectSubcategory
                                  .filter(
                                    (item) => item.cat === category.categoryId
                                  )
                                  .flatMap((item) => item.sub)}
                                onChange={(e, value) =>
                                  toggleCategoryAndSubcategory(
                                    e,
                                    value,
                                    "subcategory",
                                    category.categoryId
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
                                        value={subcat.id}
                                        label={subcat.name}
                                        key={i}
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
                          width: "260px",
                        }}
                        placeholder="Search"
                        className=""
                        value={filterAndSort?.filter?.segment}
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
                          width: "260px",
                        }}
                        placeholder="Search"
                        className=""
                        optionLabelProp="label"
                        value={filterAndSort.filter.variety}
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
                        width: "260px",
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
                        );
                      })}
                    </Select>
                  </div>
                </>
              )}
            </div>

            <div className="  border-b border-[#E7E7E7] cursor-pointer ">
              <div
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff]  product-list`}
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
                  <div className="relative ">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      mode="multiple"
                      style={{
                        minWidth: "250px",
                        maxWidth: "100%",
                      }}
                      placeholder="Search"
                      className=""
                      optionLabelProp="label"
                      value={filterAndSort.filter.regionAvailability}
                      onChange={(e, value) =>
                        toggleCategoryAndSubcategory(
                          e,
                          value,
                          "regionAvailable"
                        )
                      }
                      open={true}
                    >
                      {regionsAvailable.map((item, i) => {
                        return (
                          <React.Fragment key={item.value}>
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
                          </React.Fragment>
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
                          width: "260px",
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
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list`}
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
                  <div id="container ">
                    <div className="wrap">
                      <div className="sliderwrap">
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          range
                          defaultValue={[20, 50]}
                          value={selectSlider}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                        />
                      </div>

                      <div className="pt-4 flex justify-between items-center mb-3">
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
                className={`flex justify-between  px-2 py-4 hover:bg-[#f4f7ff] product-list`}
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
                  <div className="relative min-h-[300px] max-h-[100%]">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      mode="multiple"
                      style={{
                        width: "250px",
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
                      {tagsList?.map((item) => {
                        return (
                          <React.Fragment key={item.value}>
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
                          </React.Fragment>
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
                    key={item?.product?.productId}
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="rounded-md border border-[#eaeaeae9] shadow-custom">
                      <div
                        className={`h-[200px]  ${
                          item?.product?.productImageUrls?.length > 0
                            ? "bg-[#0000]"
                            : "bg-[#f8f7f7]"
                        }   flex justify-center items-center `}
                      >
                        <img
                          src={
                            item?.product?.productImageUrls?.length > 0
                              ? item?.product?.productImageUrls[0]
                              : "/assets/filter.png"
                          }
                          alt=""
                          className={`cursor-pointer ${
                            item?.product?.productImageUrls?.length > 0
                              ? "w-full h-full"
                              : "h-[80px] w-[80px]"
                          }  object-contain`}
                          onClick={() =>
                            navigate(
                              `/home/all-products/product/${item?.product?.productId}`
                            )
                          }
                        />
                      </div>

                      <div className=" p-3 ">
                        <h4
                          onClick={() =>
                            navigate(
                              `/home/all-products/product/${item?.product?.productId}`
                            )
                          }
                          className="text-lg font-semibold mt-3 cursor-pointer"
                        >
                          {item?.product?.title.length > 12
                            ? `${item?.product?.title.slice(0, 15)}...`
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

                        <div className="flex sm:justify-between sm:items-center sm:flex-row flex-col     sm:gap-0 gap-2 mt-2 ">
                          <div className="w-fit border border-[#E7E7E7] md:py-[6px] py-[4px] md:px-[12px] px-[8px] rounded-md flex justify-center items-center md:gap-1 gap-1">
                            <p
                              className="text-[#637381] cursor-pointer"
                              onClick={() =>
                                handleIncrementDecrement(
                                  item?.product?.productId,
                                  "decrement",
                                  item?.product?.availableQty
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
                                  "increment",
                                  item?.product?.availableQty
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
                                <g clipPath="url(#clip0_128_2591)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.6641 15.1105H4.48791C2.21924 15.1105 0.478794 14.2912 0.973161 10.9931L1.5488 6.52349C1.85354 4.87785 2.90323 4.24805 3.82425 4.24805H11.3549C12.2895 4.24805 13.2782 4.92526 13.6304 6.52349L14.2059 10.9931C14.6258 13.9187 12.9329 15.1105 10.6641 15.1105Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.7659 4.08516C10.7659 2.31981 9.33475 0.8887 7.56937 0.8887C6.71927 0.885107 5.90276 1.22028 5.30038 1.82012C4.698 2.41996 4.35937 3.23506 4.35938 4.08516"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.76376 7.41846H9.72998"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M5.44988 7.41846H5.41602"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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
                  current={page}
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
