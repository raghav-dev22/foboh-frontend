import React, { useState } from "react";
import Footer from "./Footer";
import EastIcon from "@mui/icons-material/East";
import Header from "./Header";
import BottomToTop from "./BottomToTop";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { SliderComponent } from "@syncfusion/ej2-react-inputs";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "react-select";
import Slider from "@mui/material/Slider";
// import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";
import { listdata } from "../data";

import ProductListData from "./ProductListData";

const ProductList = () => {
  const Data = listdata
  console.log("data",listdata)
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

  const colourOptions = [
    { value: "1", label: "Opt-1" },
    { value: "2", label: "Opt-2" },
    { value: "3", label: "Opt-3" },
    { value: "4", label: "Opt-4" },
    { value: "5", label: "Opt-5" },
    { value: "6", label: "Opt-6" },
  ];

  const SortBtn = () => {
    setSort(!Sort);
  };
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
  return (
    <>
      <Header />

      {/* <div className="w-1/5	  overflow-y-scroll		  ">jdjijijdj</div> */}
      <div className="md:w-[85%] w-full md:p-0 px-6 mx-auto	">
        <div className="flex justify-start items-center gap-3 py-8">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Account
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Profile
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            DeliveryContact
          </h5>
        </div>
        <div className=" relative border border-[#E7E7E7] rounded-lg  px-4 py-2 flex items-center justify-between">
          <p className="font-semibold text-lg">Red Wine</p>
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
              <div className=" border border-[#E7E7E7] w-[262px] bg-white rounded-lg shadow-md p-4  absolute top-[50px] right-0 z-10">
                <div className="flex justify-between items-center pb-2">
                  <h5 className="text-lg font-medium text-[#2B4447] ">
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
                  <h5 className="text-lg font-medium text-[#2B4447] ">Price</h5>
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
        <div className="flex flex-no-wrap py-8">
          <div className="w-1/4		  overflow-y-scroll	 pr-12 py-4	  ">
            <div className="flex items-center gap-2 pb-3">
              <FilterAltIcon style={{ fill: "#fff", stroke: "#2B4447" }} />
              <h5 className="text-2xl font-semibold text-[#2B4447]">Filter</h5>
            </div>

            <div className=" py-4 border-b border-[#E7E7E7]">
              <div
                className="flex justify-between"
                onClick={() => {
                  WineBtn();
                }}
              >
                <h5 className="text-lg font-medium text-[#2B4447]">Wine</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {wine && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">Segment</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Segment && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">Variety</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Variety && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">Country</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Country && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">
                  Region availability
                </h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Availability && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">Region</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Region && (
                <>
                  <input type="text" placeholder="Search|" />
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                  <div className="flex items-center mt-5">
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
                <h5 className="text-lg font-medium text-[#2B4447]">Price</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Price && (
                <>
                  {/* <div className="flex w-full m-auto items-center py-4 justify-center">
                    <div className="py-1 relative min-w-full">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-2 rounded-full bg-teal-600 w-0"
                          style={{ width: "24.1935%", left: "11.2903%" }}
                        />
                        <div
                          className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "11.2903%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            ></div>
                          </div>
                        </div>
                        <div
                          className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "35.4839%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div id="container">
                    <div className="wrap">
                      <div className="sliderwrap">
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
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
                className="flex justify-between mb-3"
                onClick={() => {
                  TagsBtn();
                }}
              >
                <h5 className="text-lg font-medium text-[#2B4447]">Tags</h5>
                <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
              </div>
              {Tags && (
                <>
                  {/* <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                    isMulti
                    options={colourOptions}
                  /> */}

                  <Select
                    options={colourOptions}
                    isMulti
                    defaultValue={
                      [
                        // colourOptions[2],
                        // colourOptions[3],
                        // colourOptions[4],
                        // colourOptions[5],
                        // colourOptions[6],
                      ]
                    }
                  />
                </>
              )}
            </div>
            {/* <div className="flex justify-between py-4 border-b border-[#E7E7E7]">
              <h5 className="text-lg font-medium text-[#2B4447]">Segment</h5>
              <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
            </div> */}
          </div>
          <div className="md:w-9/12		w-full mx-auto">
            <div className="grid grid-cols-3 gap-8 grid-rows-3	">
            {Data.map((item, index) => (
              <div className="">
                <div className=" relative">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#fff] absolute top-[15px] right-[15px] flex justify-center items-center">
                    <FavoriteBorderIcon style={{ fill: "#2B4447" }} />
                  </div>
                  <img src={item.img} alt="" />
                </div>
                <h4 className="text-lg font-semibold mt-3">
                 {item.title}
                </h4>
                <p className="text-base font-medium text-[#637381] mt-2">
                  {item.name}
                </p>
                <p className="text-base font-medium text-[#2B4447] mt-2">
                  {item.details}
                </p>
                <h4 className="text-base font-semibold text-[#2B4447] mt-1">
                  {item.price}
                </h4>
                <div className="flex justify-between items-center mt-2 ">
                  <div className="border border-[#E7E7E7] py-[6px] px-[12px] rounded-md flex justify-center items-center gap-3">
                    <p className="text-[#637381] ">-</p>
                    <p className="text-[#637381]"> 1</p>
                    <p className="text-[#637381]">+</p>
                  </div>
                  <button className=" bg-[#563FE3] rounded-md py-[6px] px-[12px] text-sm font-medium text-white flex justify-center items-center gap-2">
                    {" "}
                    <ShoppingBasketIcon style={{ fill: "#fff" }} />
                    Add To Cart
                  </button>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BottomToTop />
    </>
  );
};

export default ProductList;
