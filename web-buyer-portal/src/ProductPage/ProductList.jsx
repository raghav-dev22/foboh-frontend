import React, { useEffect, useState } from "react";

import EastIcon from "@mui/icons-material/East";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Select from "react-select";
import { Select, Space } from "antd";
import makeAnimated from "react-select/animated";

import { useDispatch, useSelector } from "react-redux";

import { add, updateQuantity } from "../slices/CartSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { listdata } from "../data";

import { useNavigate } from "react-router";

import counterSlice, { increment, decrement } from "../slices/counterSlice";

import { Slider } from "antd";
import { setProductData } from "../slices/ProductSlice";
import { Pagination } from "antd";
import { Checkbox } from "antd";
import { button } from "@material-tailwind/react";
import { Avatar, List, Skeleton, Switch } from "antd";

const ProductList = () => {
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

  const animatedComponents = makeAnimated();
  const [wine, setWine] = useState(false);
  const [Segment, setSegment] = useState(false);
  const [Variety, setVariety] = useState(false);
  const [Country, setCountry] = useState(false);
  const [Region, setRegion] = useState(false);
  const [Availability, setAvailability] = useState(false);
  const [Price, setPrice] = useState(false);
  const [Tags, setTags] = useState(false);
  const [Sort, setSort] = useState(false);
  const [page, setPage] = useState(1);
  const productData = useSelector((state) => state.product);
  const wineProduct = [
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
  const SegmentProduct = [
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
  const varietyProduct = [
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
  const countryData = [
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
  const [value, setValue] = useState([15, 65]);

  const navigate = useNavigate();

  const colourOptions = [];

  const SortBtn = () => {
    setSort(!Sort);
  };

  //  for redux

  const dispatch = useDispatch();
  const CARTdata = useSelector((items) => items.cart);

  // const addCart = (id,itemData, actionType) => {
  //   if(CARTdata.length > 0) {
  //     CARTdata.map(item => {
  //       item.product?.id === (id) ? dispatch(updateQuantity({ id, actionType })) : dispatch(add(itemData))
  //     })
  //   }
  //    else {
  //     dispatch(add(itemData))
  //   }
  // };
  const addCart = (id, itemData, actionType) => {
    if (CARTdata.length > 0) {
      CARTdata.forEach((item) => {
        if (item.product?.productId === id) {
          dispatch(updateQuantity({ id, actionType }));
        }
      });
      const isNewProduct = !CARTdata.some(
        (item) => item.product?.productId === id
      );
      if (isNewProduct) {
        dispatch(add(itemData));
      }
    } else {
      dispatch(add(itemData));
    }
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log("page", current, pageSize);
    setPage(current);
  };

  // useEffect(() => {
  //   dispatch(
  //     setProductData(
  //       Data.map((item) => {
  //         return {
  //           product: item,
  //           quantity: 0,
  //         };
  //       })
  //     )
  //   );
  // }, []);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const apiUrl = `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getAll?page=${page}`;

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

  const handleIncrementDecrement = (id, actionType) => {
    const updatedProductData = productData.map((item) => {
      if (item?.product?.productId === id) {
        if (actionType === "decrement" && item.quantity > 1) {
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
    setValue(value);
  };

  return (
    <>
      <div className="md:w-4/5	w-full md:p-0 px-6 mx-auto ">
        <div className=" relative border border-[#E7E7E7] rounded-lg  px-4 py-2 flex items-center justify-between">
          <div className="">
            <p className="font-semibold md:text-2xl text-xl">Red Wine</p>
            <p className="text-sm font-normal text-[#637381]">
              ({total} Products)
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
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        Option-1
                      </h5>
                    </label>
                  </div>

                  <div className="flex items-center mt-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        Option-1
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
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        Option-1
                      </h5>
                    </label>
                  </div>

                  <div className="flex items-center mt-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />

                    <label htmlFor="default-checkbox" className="ml-2 ">
                      <h5 className="text-base font-normal text-[#637381]">
                        Option-1
                      </h5>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex md:flex-nowrap	flex-wrap py-8">
          <div className="md:w-1/4 w-full    overflow-y-scroll  md:pr-12 py-4   ">
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
                <h5 className="text-base font-medium text-[#2B4447]">Wine</h5>

                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>

              {wine && (
                <>
                  <div className="relative">
                    <SearchIcon
                      className="absolute top-[22px] right-[8px] z-10"
                      style={{ fill: "#d9d9db" }}
                    />
                    <Select
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {wineProduct.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="my-1 flex items-center ">
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}
                                {/* <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                  /> */}

                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
                                  </h5>
                                </label>
                                {/* </Checkbox> */}
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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {SegmentProduct.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}
                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {varietyProduct.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}

                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {countryData.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}

                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {availabilityData.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}

                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                  RegionBtn();
                }}
              >
                <h5 className="text-base font-medium text-[#2B4447]">Region</h5>

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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {RegionData.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}
                                {/* <Checkbox
                                  className="w-4 h-4"
                                  onChange={onChangeCheckBox}
                                /> */}
                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                          value={value}
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
                              $ {value}
                            </p>
                          </div>
                        </div>

                        <div className="box">
                          <h5 className="text-base font-medium text-[#637381] mb-2">
                            Max. Price
                          </h5>

                          <div className="border border-[#E7E7E7] rounded-md py-[5px] px-[14px]">
                            <p className="font-normal text-sm text-[#637381]">
                              $ {value}
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
                      // mode="tags"
                      // defaultValue={["china"]}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Search|"
                      className=""
                      // onChange={handleChange}
                      optionLabelProp="label"
                      onChange={handleChangeOption}
                      // options={options}
                      open={true}
                    >
                      {TagsProduct.map((item) => {
                        return (
                          <>
                            <Option value={item.title} label={item.title}>
                              <div className="flex items-center my-1">
                                {/* <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                /> */}

                                <label
                                  htmlFor="default-checkbox"
                                  className="ml-2 "
                                >
                                  <h5 className="text-base font-normal text-[#637381]">
                                    {item.title}
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
                      {item?.product?.buyPrice}
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

                      <button
                        className=" bg-[#563FE3] rounded-md py-[6px] px-[12px] md:text-sm text-[10px] font-medium text-white flex justify-center items-center gap-2"
                        onClick={() => {
                          addCart(item?.product?.productId, item, "increment");
                        }}
                      >
                        {" "}
                        <ShoppingBasketIcon
                          style={{ fill: "#fff", width: "16px" }}
                          // className="md:w-full w-[12px]"
                        />
                        Add To Cart
                      </button>
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
                  total={500}
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
