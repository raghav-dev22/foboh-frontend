import React, { useMemo, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";
import ModeIcon from "@mui/icons-material/Mode";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Tabs } from "antd";
import CallIcon from "@mui/icons-material/Call";
import ContactEdit from "../MyAccount/ContactEdit";
import DeliveryEditAddress from "../MyAccount/DeliveryEditAddress";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppleIcon from "@mui/icons-material/Apple";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { useSelector } from "react-redux";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
          backgroundColor: "#F8F8F8",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const Payment = () => {
  const EditContactValue = JSON.parse(localStorage.getItem("ContactEdit"));
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  console.log(EditDeliveryVal, "EditDeliveryVal");
  const [activeKey, setActiveKey] = useState("1");
  const [editDelivery, setEditDelivery] = useState(false);
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  const { TabPane } = Tabs;
  const [isChecked, setIsChecked] = useState(false);
  const [cardDetails, setCardDetails] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardErrors, setCardErrors] = useState({});
  const buyer = useSelector((state) => state.buyer);

  // Function to handle checkbox change event
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCardDetails(false);
  };

  const openTab = () => {
    setOpenDetails(!openDetails);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [editContact, setEditContact] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: cardHolderName, // Use the cardholder's name from the input field
      },
    });
    console.log("[PaymentMethod]", payload);
  };

  return (
    <>
      <div className="">
        <div className="py-4">
          <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
            {editContact ? (
              <ContactEdit
                setEditContact={setEditContact}
                editContact={editContact}
              />
            ) : (
              <>
                <div className="flex justify-between">
                  <div className="flex justify-center items-center gap-1.5">
                    <CallIcon
                      style={{ fill: "#2B4447" }}
                      className="w-[18px] h-[18px]"
                    />
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Delivery Contact
                    </h5>
                  </div>
                  {/* <Link to="#"> */}
                  <button
                    className=""
                    onClick={() => setEditContact(!editContact)}
                  >
                    <h5 className="text-base font-semibold text-[#2B4447]">
                      Change
                    </h5>
                  </button>
                  {/* </Link> */}
                </div>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {buyer?.name}
                </p>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {buyer?.email}
                </p>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {buyer?.mobile}
                </p>
              </>
            )}
          </div>

          <div className="border rounded-md border-[#E7E7E7] p-3">
            {editDelivery ? (
              // <DeliveryAddress />
              <DeliveryEditAddress
                setEditDelivery={setEditDelivery}
                editDelivery={editDelivery}
              />
            ) : (
              <>
                <div className="flex justify-between">
                  <div className="flex justify-center items-center gap-1.5">
                    <HomeRoundedIcon
                      style={{ fill: "#2B4447" }}
                      className="w-[18px] h-[18px]"
                    />
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Delivery Address
                    </h5>
                  </div>
                  <button onClick={() => setEditDelivery(!editDelivery)}>
                    <h5 className="text-base font-semibold text-[#2B4447]">
                      Change
                    </h5>
                  </button>
                </div>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditDeliveryVal?.Apartment},{EditDeliveryVal?.Address},
                  {/* {EditDeliveryVal?.State}  */}
                  {EditDeliveryVal?.Postcode},{/* {EditDeliveryVal?.City} */}
                </p>

                <div className="flex items-center gap-1">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_18_521"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                    >
                      <path d="M20 0H0V20H20V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_18_521)">
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66996 2.5 3.333 2.5H9.16634C9.62657 2.5 9.99963 2.8731 9.99963 3.33333C9.99963 3.79357 9.62657 4.16667 9.16634 4.16667H3.333C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.333 17.5H14.9996C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1265 10 17.4996 10.3731 17.4996 10.8333V16.6667C17.4996 17.3297 17.2362 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9996 19.1667H3.333C2.66996 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill="#637381"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6663 2.39909C16.4185 2.39909 16.1808 2.49754 16.0056 2.67278L8.25216 10.4262L7.81166 12.1882L9.57365 11.7477L17.3271 3.99427C17.5023 3.81903 17.6008 3.58135 17.6008 3.33352C17.6008 3.0857 17.5023 2.84802 17.3271 2.67278C17.1518 2.49754 16.9142 2.39909 16.6663 2.39909ZM14.8271 1.49427C15.3149 1.00647 15.9765 0.732422 16.6663 0.732422C17.3562 0.732422 18.0178 1.00647 18.5056 1.49427C18.9934 1.98207 19.2674 2.64367 19.2674 3.33352C19.2674 4.02338 18.9934 4.68498 18.5056 5.17278L10.5889 13.0894C10.4821 13.1962 10.3483 13.272 10.2018 13.3086L6.86847 14.142C6.58449 14.213 6.28408 14.1298 6.0771 13.9228C5.87012 13.7158 5.78691 13.4154 5.8579 13.1314L6.69124 9.79808C6.72787 9.65155 6.80363 9.51773 6.91043 9.41093L14.8271 1.49427Z"
                          fill="#637381"
                        />
                      </g>
                    </g>
                  </svg>
                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {EditDeliveryVal?.DeliveryInstruction}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9668 4.53403C18.9608 4.46526 18.9371 4.39921 18.898 4.34233C18.8589 4.28545 18.8057 4.23968 18.7436 4.20948L10.1749 0.0402787C10.1205 0.0137737 10.0607 0 10.0002 0C9.93965 0 9.87989 0.0137737 9.82545 0.0402787L1.25681 4.20942C1.19473 4.23961 1.14154 4.28538 1.10243 4.34226C1.06331 4.39914 1.03962 4.4652 1.03365 4.53397C1.02271 4.65968 0.776998 7.65531 1.7236 11.3141C2.2812 13.4694 3.13982 15.4028 4.27554 17.0608C5.7 19.1401 7.56414 20.7868 9.81636 21.9552C9.87317 21.9847 9.93624 22.0001 10.0003 22.0001C10.0643 22.0001 10.1273 21.9847 10.1842 21.9552C12.4363 20.7868 14.3006 19.1401 15.725 17.0608C16.8608 15.4028 17.7194 13.4694 18.2769 11.3141C19.2235 7.65531 18.9777 4.65974 18.9668 4.53403ZM10.0002 15.4655C7.1991 15.4655 4.92027 13.1867 4.92027 10.3856C4.92027 7.58447 7.1991 5.30564 10.0002 5.30564C12.8013 5.30564 15.0801 7.58447 15.0801 10.3856C15.0801 13.1867 12.8013 15.4655 10.0002 15.4655Z"
                  fill="black"
                />
              </svg>
              <h5 className="font-semibold text-xl ">Payment</h5>
            </div>
            <p className="text-base font-normal text-[#637381] mb-4">
              Select a payment option
            </p>
            <p className="text-normal font-medium text-[#2B4447]">
              All transactions are encrypted
            </p>
            <Tabs
              defaultActiveKey="1"
              activeKey={activeKey}
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <>
                    <div
                      className={` ${
                        activeKey === "1"
                          ? "bg-[#F0EDFF] border border-[#563FE3]"
                          : "bg-[#fff] border border-[#E7E7E7]"
                      }  rounded-md w-[175px] py-[18px]`}
                    >
                      <h5 className="text-[#2B4447] font-semibold text-base text-center mb-1">
                        Pay Later
                      </h5>
                      <p className="text-base text-[#637381] text-center">
                        {" "}
                        14 days, EFT
                      </p>
                    </div>
                  </>
                }
                key="1"
              >
                <div className=" rounded-md ">
                  <label htmlFor="">
                    <h5 className="text-lg font-semibold  text-[#2B4447]">
                      Your chosen payment terms
                    </h5>
                  </label>
                  <input
                    type="text"
                    className="border border-[#E7E7E7] text-[#2B4447]"
                    placeholder="Payment due in 14 days (dd/mm/yyyy)"
                  />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div
                    className={` ${
                      activeKey === "2"
                        ? "bg-[#F0EDFF] border border-[#563FE3]"
                        : "bg-[#fff] border border-[#E7E7E7]"
                    }  rounded-md w-[175px] py-[18px]`}
                  >
                    <h5 className="text-[#2B4447] font-semibold text-base text-center mb-1">
                      Pay Now
                    </h5>
                    <p className="text-sm text-[#637381] text-center">
                      Credit or Debit Card
                    </p>
                  </div>
                }
                key="2"
              >
                <h5 className="text-lg font-semibold text-[#2B4447]">
                  Choose a Payment Period
                </h5>

                <div className="border border-[#E7E7E7] rounded-md   mt-2">
                  <div
                    className="justify-between flex items-center  border-b p-3 border-[#E7E7E7]"
                    onClick={() => {
                      openTab();
                    }}
                  >
                    <div className=" flex items-center">
                      <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                        <input
                          defaultChecked=""
                          id="default-radio-1"
                          // type="radio"
                          type="checkbox"
                          defaultValue=""
                          name="default-radio"
                          className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                          style={{
                            boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                          }}
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <label
                        htmlFor="default-radio-1"
                        className="ml-4 text-base font-semibold text-[#2B4447] "
                      >
                        {/* Checked: {isChecked ? "true" : "false"} */}
                        Credit/Debit Card
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src="/assets/visa.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/master-card.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/american-express.png"
                        alt=""
                        className="fit-contain"
                      />
                    </div>
                  </div>
                  {isChecked && (
                    <div className="bg-[#E7E7E7] py-5 px-2">
                      <div className="rounded-md bg-white p-3 flex justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/assets/visa.png" alt="" />
                          <h5 className="font-medium text-[#2B4447] text-base">
                            Credit card ending with 3259
                          </h5>
                        </div>
                        <ModeIcon
                          style={{ fill: "#563fe3" }}
                          onClick={() => {
                            setCardDetails(!cardDetails);
                            setIsChecked(!isChecked);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {cardDetails && (
                    <>
                      <div className=" py-5 px-4">
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <label>
                            Card number
                            <CardNumberElement
                              options={options}
                              onChange={(event) => {
                                setCardErrors({
                                  ...cardErrors,
                                  [event.elementType]: event.error,
                                });
                                console.log(
                                  "CardNumberElement [change]",
                                  event
                                );
                              }}
                            />
                          </label>
                          <p className="mt-2 mb-2 text-red-500 text-xs">
                            {cardErrors?.cardNumber?.message}
                          </p>
                          <div className="absolute top-[44px] right-[10px]">
                            <LockOpenIcon style={{ fill: "#979797" }} />
                          </div>
                        </div>
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <label
                            htmlFor="LiquerLicence"
                            className="text-[#2B4447] font-normal text-sm"
                          >
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="LiquerLicence"
                            className=" "
                            onChange={(e) => {
                              setCardHolderName(e.target.value);
                            }}
                            autoComplete="on"
                            // placeholder="Name on Card"
                            style={{ background: "#F8F8F8" }}
                          />
                        </div>
                        <div className="flex flex-nowrap gap-2">
                          <div
                            className={`relative mb-4 `}
                            data-te-input-wrapper-init
                          >
                            <label>
                              Expiration date
                              <CardExpiryElement
                                options={options}
                                onChange={(event) => {
                                  setCardErrors({
                                    ...cardErrors,
                                    [event?.elementType]: event?.error,
                                  });
                                  console.log(
                                    "CardNumberElement [change]",
                                    event
                                  );
                                }}
                              />
                            </label>
                            <p className="mt-2 mb-2 text-red-500 text-xs">
                              {cardErrors?.cardExpiry?.message}
                            </p>
                          </div>
                          <div
                            className={`relative mb-4 `}
                            data-te-input-wrapper-init
                          >
                            <label>
                              CVC
                              <CardCvcElement
                                options={options}
                                onChange={(event) => {
                                  setCardErrors({
                                    ...cardErrors,
                                    [event.elementType]: event.error,
                                  });
                                  console.log(
                                    "CardNumberElement [change]",
                                    event
                                  );
                                }}
                              />
                            </label>
                            <p className="mt-2 mb-2 text-red-500 text-xs">
                              {cardErrors?.cardCvc?.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          <input
                            defaultChecked=""
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            name="default-radio"
                            // onClick={() => {
                            //   addressBtn();
                            // }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
                            // style={{
                            //   boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                            // }}
                          />

                          <label
                            htmlFor="radio-3"
                            className="ml-4 text-base font-normal text-[#2B4447] "
                          >
                            Save card details
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Bank transfer (EFT)
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Direct debit
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447] flex items-center"
                    >
                      <AppleIcon />
                      Pay
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      <img src="/assets/gpay.png" alt="" className="w-[65%]" />
                    </label>
                  </div>
                </div>
              </TabPane>
            </Tabs>
            {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <div className="py-4">
            <BillingAddress />
            <div className="text-right">
              <button
                type="submit"
                // onClick={handleSubmit}
                className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
