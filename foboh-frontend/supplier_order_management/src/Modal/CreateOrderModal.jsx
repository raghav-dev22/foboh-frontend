import React, { useState, useRef } from "react";
import { Divider, Space, Button, Modal } from "antd";
import { Stepper, Step, Typography, button } from "@material-tailwind/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CallIcon from "@mui/icons-material/Call";
import ShieldIcon from "@mui/icons-material/Shield";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AlertModal from "./AlertModal";
import Select from "react-select";
// import { Select } from "antd";

let index = 0;

const CreateOrderModal = ({ handleOk, isModalOpen, handleCancel }) => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  const productQty = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
  ];
  const [selectedState, setSelectedState] = useState(null);
  const [customerSelectedOption, setCustomerSelectedOption] = useState(null);
  const stateOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const customerOptions = [
    {
      value: "createNew",
      label: (
        <div className=" cursor-pointer bg-[#EAEAEA] rounded-[6px] py-2 w-full px-3 flex justify-start items-center gap-2.5">
          <AddCircleOutlineRoundedIcon style={{ fill: "#637381" }} />
          <p className="text-sm font-medium text-[#637381]">
            Create New Customer
          </p>
        </div>
      ),
    },
    { value: "Apples", label: "Apples" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const options = [
    { value: "Apples", label: "Apples" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [editDeliveryContact, setEditDeliveryContact] = useState(false);
  const [editDeliveryAddress, setEditDeliveryAddress] = useState(false);
  const [editBillingAddress, setEditBillingAddress] = useState(false);

  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  const paymentOption = [
    {
      value: "opt-1",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          7 days from invoice date
        </h5>
      ),
    },
    {
      value: "opt-2",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          15 days from invoice date
        </h5>
      ),
    },
    {
      value: "opt-3",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          30 days from invoice date
        </h5>
      ),
    },
    {
      value: "opt-4",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          45 days from invoice date
        </h5>
      ),
    },
    {
      value: "opt-5",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          60 days from invoice date
        </h5>
      ),
    },
    {
      value: "opt-6",
      label: (
        <h5 className="text-base font-medium text-[#637381] py-1">
          90 days from Invoice date
        </h5>
      ),
    },
  ];
  const [alertModal, setAlertModal] = useState(false);
  const [details, setDetails] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1),
      setDetails(true),
      setSelectedItems("");
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const items = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = items.filter((o) => !selectedItems.includes(o));
  const [show, setShow] = useState(false);
  const itemOption = (itemIndex) => {
    console.log(selectedItems, "itemIndex");
  };

  return (
    <>
      <Modal
        width="75%"
        // height="100%"
        className="custom-modal-height"
        title={
          <>
            <div
              className={`flex  items-center bg-[#F8F8F8] p-2.5 rounded-t-[8px] ${
                isFirstStep ? "justify-end" : " justify-between"
              }`}
            >
              <div
                onClick={handlePrev}
                className={` flex justify-center items-center border border-[#EDEFF1] rounded-[8px] h-[35px] w-[35px] bg-white ${
                  isFirstStep && "hidden"
                } `}
              >
                <ArrowBackIosRoundedIcon
                  style={{ width: "14px", fill: "#2B4447" }}
                />
              </div>
              <CloseRoundedIcon
                style={{ width: "20px", fill: "#2B4447" }}
                onClick={() => {
                  setAlertModal(true);
                }}
              />
            </div>

            <div className=" createOrderStepper mt-6 px-5">
              <Stepper
                activeStep={activeStep}
                className="w-[90%]"
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)} size="sm">
                  <div
                    className={`w-[40px] h-[40px]  rounded-full   flex justify-center items-center  `}
                  >
                    <p className=" text-sm font-normal text-white ">1</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Find Customer
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center `}
                  >
                    <p className=" text-sm font-normal text-white">2</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 1 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Select Products
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center `}
                  >
                    <p className=" text-sm font-normal text-white">3</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 2 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Add Shipping Details
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(3)}>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center 
                     `}
                  >
                    <p className=" text-sm font-normal text-white">4</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 3 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Finalise Order
                    </Typography>
                  </div>
                </Step>
              </Stepper>
              <div className="mt-24">
                {activeStep === 0 && (
                  <>
                    <div className="mb-5">
                      <h5 className="text-[24px] font-bold text-[#212B36] mb-5">
                        Business full name
                      </h5>
                      <div className="h-[300px] overflow-y-scroll">
                        <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                          {editDeliveryContact ? (
                            <div className="  md:px-0 pb-4 px-6">
                              <div className="flex  items-center gap-1.5 pb-6">
                                <CallIcon
                                  style={{ fill: "#2B4447" }}
                                  className="w-[18px] h-[18px]"
                                />
                                <h5 className="text-lg font-semibold text-[#2B4447]">
                                  Delivery Contact
                                </h5>
                              </div>

                              <form className="">
                                <div className="flex flex-nowrap  gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="FirstName"
                                      name="FirstName"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      // placeholder="Last Name"
                                      type="text"
                                      id="LastName"
                                      name="LastName"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-nowrap gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="text"
                                      id="email"
                                      name="email"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-nowrap gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Phone no.{" "}
                                    </label>
                                    <input
                                      type="text"
                                      id="Mobile"
                                      name="Mobile"
                                      className="border border-[#E0E0E0] "
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="flex gap-8 justify-end ">
                                  <button
                                    type="submit"
                                    onClick={() => {
                                      setEditDeliveryContact(false);
                                    }}
                                    className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
                                  >
                                    Save
                                  </button>
                                  <button
                                    className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal"
                                    onClick={() => {
                                      setEditDeliveryContact(false);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <div className="">
                              <div className="flex justify-between items-center ">
                                <div className="flex justify-start items-center gap-2">
                                  <LocalPhoneRoundedIcon />
                                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                    Delivery Contact
                                  </h4>
                                </div>

                                <button
                                  onClick={() => {
                                    setEditDeliveryContact(true);
                                  }}
                                  className="text-base font-semibold text-[#2B4447]"
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                                Full Name
                              </p>
                              <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                                myemail@gmail.com.au
                              </p>
                              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                                0400 000 000
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                          {editDeliveryAddress ? (
                            <div className="  md:px-0 pb-4 px-6">
                              <div className="flex  items-center gap-1.5  pb-4">
                                <HomeRoundedIcon
                                  style={{ fill: "#2B4447" }}
                                  className="w-[18px] h-[18px]"
                                />
                                <h5 className="text-lg font-semibold text-[#2B4447]">
                                  Delivery Address
                                </h5>
                              </div>

                              <form className="">
                                <div className="flex flex-nowrap gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      id="Address"
                                      name="Address"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-nowrap gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Apartment etc
                                    </label>
                                    <input
                                      type="text"
                                      id="Apartment"
                                      name="Apartment"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor="Suburb"
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Suburb
                                    </label>
                                    <input
                                      type="text"
                                      id="Suburb"
                                      className="custom-bg"
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-nowrap gap-8">
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      Postcode
                                    </label>
                                    <input
                                      type="text"
                                      id="Postcode"
                                      name="Postcode"
                                      className=""
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                  <div className="w-full mb-4 relative">
                                    <label
                                      htmlFor=""
                                      className="text-base font-normal text-[#2B4447]"
                                    >
                                      State
                                    </label>
                                    <Select
                                      defaultValue={selectedOption}
                                      onChange={setSelectedOption}
                                      options={options}
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="w-full   mb-3 relative">
                                  {" "}
                                  <lable className="mb-2">Notes</lable>
                                  <textarea
                                    className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 mt-2"
                                    id="Postcode"
                                    type="text"
                                    placeholder="Notes"
                                    style={{
                                      background: "#F8F8F8",
                                    }}
                                  />
                                </div>

                                <div className="flex gap-8 justify-end ">
                                  {" "}
                                  <button
                                    onClick={() =>
                                      setEditDeliveryAddress(false)
                                    }
                                    type="button"
                                    className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal"
                                    onClick={() =>
                                      setEditDeliveryAddress(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <div>
                              <div className="flex justify-between items-center ">
                                <div className="flex justify-start items-center gap-2">
                                  <HomeRoundedIcon />
                                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                    Delivery Address
                                  </h4>
                                </div>
                                <button
                                  className="text-base font-semibold text-[#2B4447]"
                                  onClick={() => {
                                    setEditDeliveryAddress(true);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                                456 King Street, Newton, NSW 2304 Australia
                              </p>
                              <h4 className=" mt-2 text-xl font-semibold text-[#2B4447] leading-[30px]">
                                Notes
                              </h4>
                              <div className="flex justify-start items-center gap-2">
                                <img src="/assets/notesIcon.png" alt="" />

                                <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                                  Delivery instruction
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                          <div className="flex justify-between items-center ">
                            <div className="flex justify-start items-center gap-2">
                              <ShieldIcon />
                              <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                Payment
                              </h4>
                            </div>
                            <button className="text-base font-semibold text-[#2B4447]">
                              Edit
                            </button>
                          </div>
                          <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                            Your chosen payment terms
                          </p>
                          <div className="border mt-2 border-[#E0E0E0] rounded-[6px] py-2 px-4">
                            <h4 className=" text-lg font-medium text-[#2B4447] leading-[30px]">
                              Payment due in 14 days (dd/mm/yyyy)
                            </h4>
                          </div>
                        </div>
                        <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                          {editBillingAddress ? (
                            <form className="mt-8 mb-5 border border-[#E7E7E7] rounded-md p-3">
                              <div className="">
                                <div className="mb-3 relative">
                                  <div className="flex justify-start items-center gap-1.5 mb-6">
                                    <HomeRoundedIcon
                                      style={{ fill: "#2B4447" }}
                                      className="w-[18px] h-[18px]"
                                    />
                                    <label
                                      className="block text-[#2B4447] text-lg font-semibold "
                                      htmlFor="Country/Region"
                                    >
                                      Billing Address
                                    </label>
                                  </div>
                                </div>

                                <div className="flex md:flex-nowrap gap-4 my-3">
                                  <div className="w-full   mb-3  md:mb-0 relative">
                                    <lable>Address</lable>
                                    <input
                                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                                      id="Company"
                                      type="text"
                                      // placeholder="Company (Optional)"
                                      name="Address"
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex md:flex-nowrap gap-4 my-3">
                                  <div className="w-full   mb-3 relative">
                                    <lable>Apartment, Suite, etc</lable>
                                    <input
                                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                                      id="Apartment"
                                      type="text"
                                      placeholder="Apartment, Suite, etc"
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                  <div className="w-full   mb-3 relative md:mb-0 ">
                                    <lable>Suburb</lable>
                                    <input
                                      type="text"
                                      placeholder="suburb"
                                      id="Suburb"
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex md:flex-nowrap gap-4 my-3">
                                  <div className="w-full   mb-3 relative">
                                    <lable>Postcode</lable>
                                    <input
                                      className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                                      id="Postcode"
                                      type="text"
                                      placeholder="XXXX"
                                      style={{
                                        background: "#F8F8F8",
                                      }}
                                    />
                                  </div>
                                  <div className="w-full   mb-3 relative md:mb-0 basic-multi-select">
                                    <h5 style={{ marginBottom: "10px" }}>
                                      State
                                    </h5>
                                    <Select
                                      defaultValue={selectedState}
                                      onChange={setSelectedState}
                                      options={stateOptions}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="text-right flex justify-end items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditBillingAddress(false);
                                  }}
                                  className="bg-[#563FE3] rounded-[6px] w-fit py-[12px] px-[33px] text-base font-medium text-white"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditBillingAddress(false);
                                  }}
                                  type="submit"
                                  className="border-[#637381] border rounded-[6px] w-fit py-[12px] px-[33px] text-base font-medium text-[#637381]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div>
                              <div className="flex justify-between items-center ">
                                <div className="flex justify-start items-center gap-2">
                                  <HomeRoundedIcon />
                                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                    Billing Address
                                  </h4>
                                </div>

                                <button
                                  onClick={() => {
                                    setEditBillingAddress(true);
                                  }}
                                  className="text-base font-semibold text-[#2B4447]"
                                >
                                  Edit
                                </button>
                              </div>

                              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                                456 King Street, Newton, NSW 2304 Australia
                              </p>
                            </div>
                          )}
                        </div>
                        <div className=" mb-4 flex justify-center items-center gap-3">
                          <div className="w-full">
                            <h4 className="text-xl font-semibold text-[#2B4447] mb-3">
                              Pricing
                            </h4>
                            <input
                              type="text"
                              disabled
                              value="Pricing"
                              className="bg-[#DCDCDC] border border-[#B5B4B4] p-2 rounded-md  w-full"
                            />
                          </div>
                          <div className="w-full">
                            <h4 className="text-xl font-semibold text-[#2B4447] mb-3">
                              Freight
                            </h4>
                            <input
                              type="text"
                              disabled
                              value="Freight"
                              className="bg-[#DCDCDC] border border-[#B5B4B4] p-2 rounded-md  w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="  mb-5 ">
                      <h5 className="text-lg font-semibold text-[#212B36] mb-5">
                        Find Customer
                      </h5>
                      <Select
                        defaultValue={customerSelectedOption}
                        onChange={setCustomerSelectedOption}
                        options={customerOptions}
                      />
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div className="my-5">
                      <h4 className="text-[24px] font-bold  text-[#2B4447] text-center">
                        Business full name
                      </h4>
                    </div>
                    <div className="">
                      <h5 className="font-semibold text-lg text-[#212B36] mb-3">
                        Select Products
                      </h5>
                      <div className="flex justify-between items-center mb-10">
                        <Select
                          showSearch
                          placeholder="Search product by name"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={[
                            {
                              value: "1",
                              label: "Not Identified",
                            },
                            {
                              value: "2",
                              label: "Closed",
                            },
                            {
                              value: "3",
                              label: "Communicated",
                            },
                            {
                              value: "4",
                              label: "Identified",
                            },
                            {
                              value: "5",
                              label: "Resolved",
                            },
                            {
                              value: "6",
                              label: "Cancelled",
                            },
                          ]}
                        />
                        <button className="border border-[#DC3545] rounded-[6px] p-2 text-base font-medium text-[#DC3545]">
                          Remove All
                        </button>
                      </div>
                      <div className="flex items-center gap-2 py-5 border-b border-[#E7E7E7]">
                        <div className="">
                          <img src="/assets/customProduct.png" alt="" />
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center w-full">
                            <h3 className="text-xl font-semibold text-[#2B4447]">
                              Write Product Full Name
                            </h3>
                            <div className="">
                              <Select
                                options={productQty}
                                defaultInputValue="1"
                              />
                            </div>
                            <h4 className="text-lg font-semibold text-[#2B4447]">
                              $369.00
                            </h4>
                          </div>
                          <p className="text-base font-medium text-[#637381] ">
                            12 x 750ml
                          </p>
                          <div className="flex justify-between  items-center mt-6 ">
                            <div className="flex justify-start items-center gap-3">
                              <button className="px-4 py-1 bg-[#EEF7F2] rounded-[30px] text-sm font-medium text-[#219653]">
                                In stock
                              </button>
                              <button className="bg-[#F0F0F0] px-4 py-1  rounded-[30px] text-sm font-medium text-[#656565]">
                                Hidden
                              </button>
                            </div>
                            <a href="#" className="">
                              <p className="text-base font-medium  text-[#DC3545] border-b border-[#DC3545]">
                                Remove
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <div className="flex justify-between items-center mt-5">
                      <h4 className="text-xl font-bold  text-[#2B4447]">
                        Add Shipping Details
                      </h4>
                      <div class="relative inline-block w-[50px] mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                        <input
                          type="checkbox"
                          name="wetLiable"
                          checked={checked}
                          onChange={handleCheckboxChange}
                          id="toggle"
                          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          for="toggle"
                          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    {checked === true && (
                      <div>
                        <div className="md:w-[60%] w-full mb-5">
                          <h5 className="text-lg font-semibold text-[#212B36] mt-3">
                            Add shipping estimate as a separate line item during
                            checkout.
                          </h5>
                          <p className="text-sm font-normal text-[#637381] mt-2">
                            Turning this On will add the Shipping Estimate
                            separately during checkout. Turning this Off will
                            NOT add it as a separate line item.
                          </p>
                        </div>
                        <div className="">
                          <h5 className="font-semibold text-lg text-[#212B36] mb-5">
                            Add product
                          </h5>
                          <form>
                            <div className="flex flex-col mb-5 w-[50%]">
                              <label className="text-[#2B4447] text-base font-normal ">
                                Shipping Name
                              </label>
                              <input
                                type="text"
                                className="border border-[#E0E0E0] rounded-[8px] bg-[#F8F8F8] py-2 px-3"
                                disabled
                                value="Shipping name"
                              />
                            </div>
                            <div className="flex flex-col mb-5 w-[50%]">
                              <label className="text-[#2B4447] text-base font-normal ">
                                Price
                              </label>
                              <input
                                type="text"
                                className="border border-[#E0E0E0] rounded-[8px] bg-[#F8F8F8] py-2 px-3"
                                disabled
                                value="$350"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <div className="my-5">
                      <h4 className="text-xl font-bold  text-[#2B4447]">
                        Business full name
                      </h4>
                    </div>
                    <div className="">
                      <h5 className="font-semibold text-lg text-[#212B36] mb-5">
                        Add product
                      </h5>
                      <div className="grid md:grid-cols-2 gap-3 ">
                        <div className="h-[600px] overflow-y-scroll">
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-start items-center gap-2">
                                <LocalPhoneRoundedIcon />
                                <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                  Delivery Contact
                                </h4>
                              </div>
                              {/* 
                              <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
                            </div>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              Full Name
                            </p>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                              myemail@gmail.com.au
                            </p>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              0400 000 000
                            </p>
                          </div>

                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-start items-center gap-2">
                                <HomeRoundedIcon />
                                <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                  Delivery Contact
                                </h4>
                              </div>
                              {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
                            </div>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              456 King Street, Newton, NSW 2304 Australia
                            </p>
                            <h4 className=" mt-2 text-xl font-semibold text-[#2B4447] leading-[30px]">
                              Notes
                            </h4>
                            <div className="flex justify-start items-center gap-2">
                              <img src="/assets/notesIcon.png" alt="" />

                              <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                                Delivery instruction
                              </p>
                            </div>
                          </div>
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-start items-center gap-2">
                                <ShieldIcon />
                                <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                  Payment
                                </h4>
                              </div>
                              {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
                            </div>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              Your chosen payment terms
                            </p>

                            <Select
                              labelInValue
                              className="payment-dropdown mt-3"
                              defaultValue={{
                                value: "lucy",
                                label: (
                                  <h4 className=" text-lg font-medium text-[#2B4447] leading-[30px]">
                                    Payment due in 14 days (dd/mm/yyyy)
                                  </h4>
                                ),
                              }}
                              style={{
                                width: "100%",
                              }}
                              onChange={handleChange}
                              options={paymentOption}
                            />
                          </div>
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-start items-center gap-2">
                                <HomeRoundedIcon />
                                <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                  Billing Address
                                </h4>
                              </div>

                              {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
                            </div>

                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              456 King Street, Newton, NSW 2304 Australia
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <div className="h-[300px] overflow-y-scroll">
                            <div className="flex justify-start items-center gap-2 pb-5 border-b border-[#E7E7E7]">
                              <img src="/assets/customProduct.png" alt="" />

                              <div className="w-full h-full">
                                <div className="flex justify-between ">
                                  <div>
                                    <h5 className="text-base font-semibold text-[#2B4447] ">
                                      Write Product Full Name
                                    </h5>
                                    <p className="text-base font-medium text-[#637381]">
                                      Quantity - 1
                                    </p>
                                  </div>
                                  <h5 className="text-base font-semibold text-[#2B4447]">
                                    $369
                                  </h5>
                                </div>
                                <div className="mt-10 flex justify-between items-center">
                                  <div className="flex justify-start gap-1.5">
                                    <h5 className="text-base font-normal text-[#2B4447]">
                                      Available In Stock
                                    </h5>
                                  </div>
                                  <a href="" className="">
                                    <p className="text-base font-medium text-[#DC3545]">
                                      Remove
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start items-center gap-2 py-5 border-b border-[#E7E7E7]">
                              <img src="/assets/customProduct.png" alt="" />

                              <div className="w-full h-full">
                                <div className="flex justify-between ">
                                  <div>
                                    <h5 className="text-base font-semibold text-[#2B4447] ">
                                      Write Product Full Name
                                    </h5>
                                    <p className="text-base font-medium text-[#637381]">
                                      Quantity - 1
                                    </p>
                                  </div>
                                  <h5 className="text-base font-semibold text-[#2B4447]">
                                    $369
                                  </h5>
                                </div>
                                <div className="mt-10 flex justify-between items-center">
                                  <div className="flex justify-start gap-1.5">
                                    <h5 className="text-base font-normal text-[#2B4447]">
                                      Available In Stock
                                    </h5>
                                  </div>
                                  <a href="" className="">
                                    <p className="text-base font-medium text-[#DC3545]">
                                      Remove
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start items-center gap-2 py-5 border-b border-[#E7E7E7]">
                              <img src="/assets/customProduct.png" alt="" />

                              <div className="w-full h-full">
                                <div className="flex justify-between ">
                                  <div>
                                    <h5 className="text-base font-semibold text-[#2B4447] ">
                                      Write Product Full Name
                                    </h5>
                                    <p className="text-base font-medium text-[#637381]">
                                      Quantity - 1
                                    </p>
                                  </div>
                                  <h5 className="text-base font-semibold text-[#2B4447]">
                                    $369
                                  </h5>
                                </div>
                                <div className="mt-10 flex justify-between items-center">
                                  <div className="flex justify-start gap-1.5">
                                    <h5 className="text-base font-normal text-[#2B4447]">
                                      Available In Stock
                                    </h5>
                                  </div>
                                  <a href="" className="">
                                    <p className="text-base font-medium text-[#DC3545]">
                                      Remove
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start items-center gap-2 py-5 border-b border-[#E7E7E7]">
                              <img src="/assets/customProduct.png" alt="" />

                              <div className="w-full h-full">
                                <div className="flex justify-between ">
                                  <div>
                                    <h5 className="text-base font-semibold text-[#2B4447] ">
                                      Write Product Full Name
                                    </h5>
                                    <p className="text-base font-medium text-[#637381]">
                                      Quantity - 1
                                    </p>
                                  </div>
                                  <h5 className="text-base font-semibold text-[#2B4447]">
                                    $369
                                  </h5>
                                </div>
                                <div className="mt-10 flex justify-between items-center">
                                  <div className="flex justify-start gap-1.5">
                                    <h5 className="text-base font-normal text-[#2B4447]">
                                      Available In Stock
                                    </h5>
                                  </div>
                                  <a href="" className="">
                                    <p className="text-base font-medium text-[#DC3545]">
                                      Remove
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start items-center gap-2 py-5 border-b border-[#E7E7E7]">
                              <img src="/assets/customProduct.png" alt="" />

                              <div className="w-full h-full">
                                <div className="flex justify-between ">
                                  <div>
                                    <h5 className="text-base font-semibold text-[#2B4447] ">
                                      Write Product Full Name
                                    </h5>
                                    <p className="text-base font-medium text-[#637381]">
                                      Quantity - 1
                                    </p>
                                  </div>
                                  <h5 className="text-base font-semibold text-[#2B4447]">
                                    $369
                                  </h5>
                                </div>
                                <div className="mt-10 flex justify-between items-center">
                                  <div className="flex justify-start gap-1.5">
                                    <h5 className="text-base font-normal text-[#2B4447]">
                                      Available In Stock
                                    </h5>
                                  </div>
                                  <a href="" className="">
                                    <p className="text-base font-medium text-[#DC3545]">
                                      Remove
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-5">
                            <h4 className="text-lg font-semibold text-[#2B4447]">
                              Promo Code
                            </h4>
                            <div className="relative mt-3">
                              <input
                                className={`placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-[#563FE3]`}
                                id="grid-first-name"
                                type="text"
                                placeholder="Promotional Code"
                                value="CODE001"
                              />
                              <button
                                className={`bg-[#563FE3] absolute top-0 right-0 h-full w-[65px] flex justify-center items-center rounded-r-[8px]`}
                                // onClick={applyPromoCode}
                              >
                                <ChevronRightIcon style={{ fill: "#fff" }} />
                              </button>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                              <h5 className="text-sm font-medium text-[#637381]">
                                Subtotal
                              </h5>
                              <h5 className="text-sm font-medium text-[#637381]">
                                $1280
                              </h5>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                              <h5 className="text-sm font-medium text-[#637381]">
                                Shipping estimate
                              </h5>
                              <h5 className="text-sm font-medium text-[#637381]">
                                $60.00
                              </h5>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                              <h5 className="text-sm font-medium text-[#637381]">
                                GST
                              </h5>
                              <h5 className="text-sm font-medium text-[#637381]">
                                $60.00
                              </h5>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                              <h5 className="text-sm font-medium text-[#637381]">
                                WET
                              </h5>
                              <h5 className="text-sm font-medium text-[#637381]">
                                $60.00
                              </h5>
                            </div>
                            <div className="flex justify-between py-3 ">
                              <h5 className="text-base font-semibold text-[#2B4447]">
                                Order total
                              </h5>
                              <h5 className="text-base font-semibold text-[#2B4447]">
                                $60.00
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        }
        footer={[
          <div className="flex justify-end items-center  px-5 pb-5 mt-5">
            <Button
              // onClick={handlePrev}
              disabled={isFirstStep}
              className={`bg-[#2B4447] text-white text-base font-medium rounded-[8px]  h-[44px] w-fit flex justify-center items-center px-5 
              ${isFirstStep && "hidden"}
              }`}
            >
              Save & Exit
            </Button>
            <Button
              onClick={handleNext}
              onCancel={handleCancel}
              // disabled={isLastStep}
              className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-[84px]  flex justify-center items-center px-5"
            >
              Next
            </Button>
          </div>,
        ]}
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={false}
      ></Modal>
      <AlertModal
        SaveCancel={handleCancel}
        handleCancel={() => {
          setAlertModal(false);
        }}
        isModalOpen={alertModal}
        handleOk={() => {
          setAlertModal(false);
        }}
        closeIcon={false}
      />
    </>
  );
};

export default CreateOrderModal;
