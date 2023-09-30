import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import EastIcon from "@mui/icons-material/East";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Select, Space, theme } from "antd";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { add, setCart, updateQuantity } from "../slices/CartSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { listdata } from "../data";
import { useNavigate } from "react-router";
import { Slider } from "antd";
import { setProductData } from "../slices/ProductSlice";
import { Pagination } from "antd";
import { Checkbox } from "antd";
import { button, select } from "@material-tailwind/react";
import { Avatar, List, Skeleton, Switch } from "antd";
import { useRef } from "react";
import { getCountry } from "../helpers/getCountry";
import { getSegments } from "../helpers/getSegments";
import { getVariety } from "../helpers/getVariety";
import { getRegion } from "../helpers/getRegion";
import { getRegionAvailable } from "../helpers/getRegionAvailable";
import { getTags } from "../helpers/getTags";

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

  const SubCategory = [
    {
      title: (
        <h5 className="text-base font-normal text-[#637381] my-1">
          Alcoholic beverage
        </h5>
      ),
      key: "0-0",
      children: [
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-1"
            </h5>
          ),
          key: "1",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "2",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-3
            </h5>
          ),
          key: "3",
        },
      ],
    },
    {
      title: (
        <h5 className="text-base font-normal text-[#637381]  my-1">
          Alcoholic beverage
        </h5>
      ),
      key: "0-1",
      children: [
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "4",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "5",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "6",
        },
      ],
    },
    {
      title: (
        <h5 className="text-base font-normal text-[#637381]  my-1">
          Alcoholic beverage
        </h5>
      ),
      key: "0-3",
      children: [
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "7",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "8",
        },
        {
          title: (
            <h5 className="text-base font-normal text-[#637381]  my-1">
              Option-2
            </h5>
          ),
          key: "9",
        },
      ],
    },
  ];

  const [loading, setLoading] = useState(true);

  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // const options = [];
  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     value: i.toString(36) + i,
  //     label: i.toString(36) + i,
  //   });
  // }

  const { Option } = Select;
  const handleChangeOption = (value) => {
    console.log(`selected ${value}`);
    setWine(false);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="border-[#E7E7E7] border rounded-[8px] py- px-5 flex justify-center items-center gap-3">
          <ArrowBackIcon style={{ width: "22px" }} />
          Previous
        </a>
        // <a>Previous</a>
      );
    }
    if (type === "next") {
      return (
        <a className="border-[#E7E7E7] border rounded-[8px] py- px-5 flex justify-center items-center gap-3">
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

  const { useToken } = theme;
  const { token } = useToken();
  const dropdownRef = useRef(null);
  const sortRef = useRef(null);
  const productData = useSelector((state) => state.product);

  const availabilityData = [
    {
      title: " Option-1",
    },
    {
      title: " Option-2",
    },
    {
      title: " Option-3",
    },
    {
      title: " Option-4",
    },
  ];

  const RegionData = [
    {
      title: " Option-1",
    },
    {
      title: " Option-2",
    },
    {
      title: " Option-3",
    },
    {
      title: " Option-4",
    },
  ];

  const TagsProduct = [
    {
      title: " Option-1",
    },
    {
      title: " Option-2",
    },
    {
      title: " Option-3",
    },
    {
      title: " Option-4",
    },
  ];

  const [value, setValue] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
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

  const colourOptions = [];

  const SortBtn = () => {
    setSort(!Sort);
  };

  //  for redux

  const dispatch = useDispatch();
  const CARTdata = useSelector((items) => items.cart);

  const addCart = (id, itemData, actionType) => {
    const data = itemData.product;
    const quantity = itemData.quantity;
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));
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
        region: "",
        availableQty: data?.availableQty,
        quantity: quantity,
        stockThreshold: data?.stockThreshold,
        stockStatus: data?.stockStatus,
        regionAvailability: data?.regionAvailability,
        productStatus: data?.productStatus,
        visibility: data?.visibility,
        minimumOrder: data?.minimumOrder,
        tags: data?.tags,
        countryOfOrigin: data?.countryOfOrigin,
        barcodes: data?.barcodes,
        esgStatus: data?.esgStatus,
        healthRating: data?.healthRating,
        isActive: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
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
      });
  };

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

    const apiUrl = `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getAll?page=${page}&OrganisationId=${organisationId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.total, "data------>");
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
            ),
            setTotal(data.total)
          );
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
  const handleChange = (e, value) => {
    console.log("price slider", e, value);
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

  const toggleCategoryAndSubcategory = (e, id, name) => {
    console.log("toggleCategoryAndSubcategory", e, id, name);
    // Handling pagination

    if (name === "category") {
      // setOpen(!Open);
      const newCategoryIds = e.target.checked
        ? [...filterAndSort.filter.category, id]
        : filterAndSort.filter.category.filter((catId) => catId !== id);

      const newFilter = {
        ...filterAndSort.filter,
        category: newCategoryIds,
      };

      // filterAndSort = {
      //  ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
      console.log(newCategoryIds);
    } else if (name === "subcategory") {
      const newSubcategoryIds = id.map((subCat) => subCat.key);

      setIsWine(e.includes("wine") || e.includes("Wine"));

      const newFilter = {
        ...filterAndSort.filter,
        subCategory: newSubcategoryIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
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
        ...filterAndSort.filter,
        segment: newSegmentIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    } else if (name === "variety") {
      const newVarietyIds = id.map((variety) => variety.key);

      const newFilter = {
        ...filterAndSort.filter,
        variety: newVarietyIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    } else if (name === "country") {
      const newCountryIds = id.map((country) => country.key);

      const newFilter = {
        ...filterAndSort.filter,
        country: newCountryIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    } else if (name === "region") {
      const newRegionIds = id.map((region) => region.key);

      const newFilter = {
        ...filterAndSort.filter,
        region: newRegionIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    } else if (name === "regionAvailable") {
      const newRegionAvailableIds = id.map((region) => region.key);

      const newFilter = {
        ...filterAndSort.filter,
        regionAvailability: newRegionAvailableIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    } else if (name === "tags") {
      const newTagsIds = id.map((tag) => tag.key);

      const newFilter = {
        ...filterAndSort.filter,
        tags: newTagsIds,
      };

      // filterAndSort = {
      //   ...filterAndSort,
      //   filter: newFilter,
      // };

      setFilterAndSort({
        ...filterAndSort,
        filter: newFilter,
      });
    }
    console.log("filterAndSort", filterAndSort);
    //  else if (name === "stock") {
    //   const newStockValues = e.target.checked
    //     ? [...filterAndSort.filter.stock, id]
    //     : filterAndSort.filter.stock.filter(
    //       (stockValue) => stockValue !== id
    //     );

    //   console.log("stock", newStockValues);

    //   const newFilter = {
    //     ...filterAndSort.filter,
    //     stock: newStockValues,
    //   };

    //   filterAndSort = {
    //     ...filterAndSort,
    //     filter: newFilter,
    //   };
    // } else if (name === "status") {
    //   const newStatusValues = e.target.checked
    //     ? [...filterAndSort.filter.productStatus, id] // Replace id with the actual status value
    //     : filterAndSort.filter.productStatus.filter(
    //       (statusValue) => statusValue !== id
    //     );

    //   const newFilter = {
    //     ...filterAndSort.filter,
    //     productStatus: newStatusValues,
    //   };

    //   filterAndSort = {
    //     ...filterAndSort,
    //     filter: newFilter,
    //   };
    // } else if (name === "visibility") {
    //   const newVisibilityValue = id ? true : false;
    //   const newFilter = {
    //     ...filterAndSort.filter,
    //     visibility: newVisibilityValue,
    //   };

    //   filterAndSort = {
    //     ...filterAndSort,
    //     filter: newFilter,
    //   };
    // }
    // console.log(filterAndSort);

    // processChange("filterAndSort");
  };

  const toggleSort = (value) => {
    console.log("toggle sort", JSON.parse(value));
  };

  return (
    <>
      <div className="md:w-4/5	w-full md:p-0 px-6 mx-auto">
        <div
          className=" relative border border-[#E7E7E7] rounded-lg  px-4 py-2 flex items-center justify-between"
          ref={sortRef}
        >
          <div className="">
            <p className="font-semibold md:text-2xl text-xl">Products</p>
            <p className="text-sm font-normal text-[#637381]">
              ({total} results)
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
              <div className=" border border-[#E7E7E7] w-[262px] bg-white rounded-lg shadow-md p-4 z-50  absolute top-[50px] right-0">
                <div className="flex justify-between items-center pb-2">
                  <h5 className="text-base font-medium text-[#2B4447] ">
                    Alphabetical
                  </h5>

                  <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                </div>

                <div className="pb-4 border-b border-[#E7E7E7]">
                  <div className="flex items-center mt-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value={{
                        sortBy: "alphabetical",
                        sortOrder: "asc",
                      }}
                      onChange={toggleSort}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        A - Z
                      </h5>
                    </label>
                  </div>

                  <div className="flex items-center mt-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value={{
                        sortBy: "alphabetical",
                        sortOrder: "desc",
                      }}
                      onChange={toggleSort}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
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

                  <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                </div>

                <div className="pb-4 border-b border-[#E7E7E7]">
                  <div className="flex items-center mt-3">
                    <input
                      id="lowHigh"
                      type="checkbox"
                      value={{
                        sortBy: "price",
                        sortOrder: "asc",
                      }}
                      onChange={toggleSort}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="lowHigh" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        Low - High
                      </h5>
                    </label>
                  </div>

                  <div className="flex items-center mt-3">
                    <input
                      id="highLow"
                      type="checkbox"
                      value={{
                        sortBy: "price",
                        sortOrder: "asc",
                      }}
                      onChange={toggleSort}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="highLow" className="ml-2 ">
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

        <div className="flex md:flex-nowrap	flex-wrap py-8" ref={dropdownRef}>
          <div className="md:w-1/4 w-full overflow-y-scroll  md:pr-12 py-4">
            <div className="flex items-center gap-2 pb-3">
              <FilterAltIcon style={{ fill: "#fff", stroke: "#2B4447" }} />
              <h5 className="text-[20px] font-semibold text-[#2B4447]">
                Filter
              </h5>
            </div>
            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  WineBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">
                  Sub-category
                </h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {wine && (
                <div className=" z-10	left-0 w-max product-dropdown rounded-lg	h-fit py-3	">
                  <ul className="dropdown-content ">
                    {categoryAndSubcategory &&
                      categoryAndSubcategory.map((category, idx) => (
                        <li className="py-2.5	px-4	">
                          <div className="flex items-center">
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
                              // checked={filterAndSort.filter.category.includes(
                              //   category.categoryId
                              // )}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
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
                                open={true}
                                mode="multiple"
                                style={{
                                  width: "100%",
                                }}
                                placeholder="select one country"
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
              <div className=" py-4 border-b border-[#E7E7E7]">
                <div
                  className="flex justify-between"
                  onClick={() => {
                    SegmentBtn();
                  }}
                >
                  <h5 className="text-base font-medium text-[#2B4447]">
                    Segment
                  </h5>

                  <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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
              <div className=" py-4 border-b border-[#E7E7E7]">
                <div
                  className="flex justify-between"
                  onClick={() => {
                    VarietyBtn();
                  }}
                >
                  <h5 className="text-base font-medium text-[#2B4447]">
                    Variety
                  </h5>

                  <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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

            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  CountryBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">
                  Country
                </h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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

            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  AvailabilityBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">
                  Region availability
                </h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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
              <div className=" py-4 border-b border-[#E7E7E7]">
                <div
                  className="flex justify-between"
                  onClick={() => {
                    RegionBtn();
                  }}
                >
                  <h5 className="text-base font-medium text-[#2B4447]">
                    Region
                  </h5>

                  <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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

            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  PriceBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">Price</h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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
                          getAriaValueText={() => {
                            return `${value}`;
                          }}
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

            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  TagsBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">Tags</h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2  md:gap-8 gap-6 grid-rows-3  ">
              {productData.map((item, index) => (
                <Skeleton
                  style={{ padding: "10px" }}
                  loading={loading}
                  active
                  avatar
                >
                  <div className="">
                    <div className=" relative">
                      <div className="w-[30px] h-[30px] rounded-full bg-[#fff] absolute top-[15px] right-[15px] flex justify-center items-center">
                        <FavoriteBorderIcon style={{ fill: "#2B4447" }} />
                      </div>
                      <div className="h-[150px] bg-[#c3c3c3]">
                        <img
                          src={item?.product?.productImageUrls}
                          alt=""
                          className="cursor-pointer w-full h-full object-cover"
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
                      {item?.product?.title}
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
                      {item?.product?.description}
                    </p>

                    <h4 className="md:text-base text-sm font-semibold text-[#2B4447] mt-1">
                      ${item?.product?.buyPrice}
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
                        className={`${
                          item?.quantity > 0 ? "bg-[#563FE3]" : "bg-[#D1D5DB]"
                        } rounded-md py-[6px] px-[12px] md:text-sm text-[10px] font-medium text-white flex justify-center items-center gap-2`}
                        style={{
                          backgroundColor:
                            item?.quantity > 0
                              ? token.buttonThemeColor
                              : "#D1D5DB",
                        }}
                      >
                        <button
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
                          <ShoppingBasketIcon
                            style={{ fill: "#fff", width: "16px" }}
                          />
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              ))}
            </div>
            <div className="mt-8">
              {loading === false && (
                <Pagination
                  // itemActiveBg={"#F8FAFC"}
                  showSizeChanger={false}
                  total={total}
                  onChange={onShowSizeChange}
                  // onShowSizeChange={onShowSizeChange}
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
