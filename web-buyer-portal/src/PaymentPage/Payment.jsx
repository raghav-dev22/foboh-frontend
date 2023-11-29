import React, { useEffect, useMemo, useState } from "react";

import { Tooltip } from "antd";
import BillingAddress from "./BillingAddress";
import ModeIcon from "@mui/icons-material/Mode";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Tabs, theme } from "antd";
import CallIcon from "@mui/icons-material/Call";
import ContactEdit from "../MyAccount/ContactEdit";
import DeliveryEditAddress from "../MyAccount/DeliveryEditAddress";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Select } from "antd";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import { Button, message, Space } from "antd";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  AuBankAccountElement,
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import useResponsiveHeight from "./useResponsiveHeight";
import { useSelector } from "react-redux";
import { getBuyerValues } from "../helpers/setBuyerValues";
import { add } from "../slices/CartSlice";
import { addressSubmission } from "../helpers/addressSubmission";
import { useLocation, useNavigate } from "react-router-dom";
import { getAddress } from "../helpers/getAddress";
import { getStates } from "../helpers/getStates";
import { paymentProcess } from "../helpers/PaymentProcess";
import { paymentProcessUpdate } from "../helpers/paymentProcessUpdate";
import { cartStatusUpdate } from "../helpers/cartStatusUpdate";
import { Modal } from "antd";
import { Spin } from "antd";
import { orderStatusUpdate } from "../helpers/orderStatusUpdate";
import Becs from "./Becs";
import { getClientSecret } from "../helpers/getClientSecret";
import { getCart } from "../react-query/cartApiModule";
import { useQuery } from "react-query";
import { getCalculations } from "../helper/getCalculations";
import { convertDefaultPaymentTermValue } from "../helpers/invoiceDateFormat";
import { formatDate } from "../helpers/formatDateToPaymentDueDate";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();

  const options = useMemo(
    () => ({
      style: {
        base: {
          padding: "15px",
          fontSize,
          color: "#424770",
          height: "46px",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            content: "", // Remove placeholder text
          },
          placeholder: "",
          // backgroundColor: "rgb(248, 248, 248)",
          border: "1px solid #e2e8f0",
        },
        invalid: {
          color: "#9e2146",
        },
        ElementsApp: {
          height: "44px !important",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const Payment = ({ cartData, sealedCartError, refetch }) => {
  const [isBecs, setIsBecs] = useState(false);

  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState("");
  const text = <span>Edit</span>;

  const buttonWidth = 78;

  const btnProps = {
    style: {
      width: buttonWidth,
    },
  };
  const paymentMethod = [
    {
      value: "Manual Payment",
      label: (
        <h5 className=" text-base font-medium text-[#637381] py-1">
          Manual Payment (cash / cheque)
        </h5>
      ),
    },
    {
      value: "BECS",
      label: (
        <h5 className=" text-base font-medium text-[#637381] py-1">
          BECS (Direct Debit)
        </h5>
      ),
    },
  ];

  const handleChange = (value) => {
    if (value.value === "BECS") {
      setIsBecs(true);
    } else {
      setIsBecs(false);
    }
  };
  const navigate = useNavigate();
  const payBtn = () => {
    navigate("home/order-confirm");
  };
  // const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  // console.log(EditDeliveryVal, "EditDeliveryVal");
  const [activeKey, setActiveKey] = useState("1");
  const [editDelivery, setEditDelivery] = useState(false);
  const [editBillingAddress, setEditBillingAddress] = useState(false);
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  const { TabPane } = Tabs;
  const [isChecked, setIsChecked] = useState(false);
  const [activeChecked, setActiveChecked] = useState(false);
  const [cardDetails, setCardDetails] = useState(false);
  const [isCheckedTransfer, setIsCheckedTransfer] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [email, setEmail] = useState("");
  const [cardErrors, setCardErrors] = useState({});
  const buyer = useSelector((state) => state.buyer);
  const { useToken } = theme;
  const { token } = useToken();
  const [bankName, setBankName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const errorMessage = (error) => {
    messageApi.open({
      type: "error",
      content: error,
      duration: 4,
    });
  };
  console.log(buyer, "buyesrinformation");
  let billingAddress = {};

  const countDown = (name, convertedPaymentDueDate) => {
    if (name === "payNow") {
      Modal.success({
        title: "Order confirmed!",
        content: `Thank you for your payment.`,
        onOk: () => navigate("/home/order-confirm"),
      });
    } else {
      const fomattedDate = formatDate(convertedPaymentDueDate);
      Modal.success({
        title: "Order confirmed!",
        content: fomattedDate,
        onOk: () => navigate("/home/order-confirm"),
      });
    }
  };

  if (sealedCartError) {
    errorMessage(sealedCartError);
  }
  // Calculating cart
  const { lucUnit, gst, wet, subtotal, total } = useMemo(() => {
    const calculationResult = getCalculations(cartData);
    return calculationResult;
  }, [cartData]);

  useEffect(() => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));
    getBuyerValues(buyerId)
      .then((data) => {
        console.log("getBuyerValues", data);
        const buyerInfo = data;
        addressSubmission(buyerInfo, "delivery-address");
        addressSubmission(buyerInfo, "billing-address");
        addressSubmission(buyerInfo, "delivery-contact");
      })
      .then(() => {
        let statesData = [];

        getStates().then((data) => {
          statesData = data.map((state) => {
            return {
              label: state.stateName,
              value: state.stateId,
            };
          });
        });

        getAddress("delivery-address").then((data) => {
          console.log("delivery-address", data);
          if (data.success) {
            const buyerData = data?.data[0];
            const buyerState = statesData.find(
              (state) => state?.label === buyerData.state
            ).label;
            const addressBody = {
              Apartment: buyerData?.apartmentSuite,
              Address: buyerData?.streetaddress,
              Suburb: buyerData?.city,
              State: buyerState,
              Postcode: buyerData?.postcode,
              Notes: buyerData?.instructionsNotes,
            };
            setDeliveryAddress(addressBody);
          }
        });

        getAddress("billing-address").then((data) => {
          console.log("billing-address", data);
          if (data.success) {
            const buyerData = data?.data[0];
            const buyerState = statesData.find(
              (state) => state?.label === buyerData.state
            ).label;
            const billingAddress = {
              Apartment: buyerData?.apartmentSuite,
              Address: buyerData?.streetaddress,
              Suburb: buyerData?.city,
              State: buyerState,
              Postcode: buyerData?.postcode,
              Notes: buyerData?.instructionsNotes,
            };
            setBillingAddressData(billingAddress);
          }
        });
        getAddress("delivery-contact").then((data) => {
          const buyerData = data?.data[0];
          if (data.success) {
            const contactData = {
              FirstName: buyerData?.firstname,
              LastName: buyerData?.lastname,
              email: buyerData?.emailId,
              Mobile: buyerData?.phoneNumber,
            };
            setDeliveryContact(contactData);
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const openTab = () => {
    setOpenDetails(true);
    setTransfer(false);
    setIsCheckedTransfer(false);
    setIsChecked(true);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const openTransfer = () => {
    setTransfer(true);
    setOpenDetails(false);
    setCardDetails(false);
    setIsChecked(false);
    setIsCheckedTransfer(true);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [editContact, setEditContact] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [billingAddressData, setBillingAddressData] = useState({});
  const [deliveryContact, setDeliveryContact] = useState({});

  const handleSubmit = async (event) => {
    await refetch();
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    if (selectedPaymentTerm === "Pay Now") {
      // Stripe for credit/debit
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardHolderName,
          address: {
            // Include the customer's address here
            line1: deliveryAddress?.Address,
            city: deliveryAddress?.Suburb,
            state: deliveryAddress?.State?.label,
            postal_code: deliveryAddress?.Postcode,
            country: "AU",
          },
        },
      });

      if (payload) {
        const convertedPaymentDueDate = convertDefaultPaymentTermValue(
          "",
          "paymentTodayDate"
        );
        const pm_id = payload?.paymentMethod?.id;
        const last4 = payload.paymentMethod.card.last4;
        const orderId = localStorage.getItem("orderId");
        const { deliveryEmail } = JSON.parse(localStorage.getItem("buyerInfo"));

        const { clientSecret, OrderPaymentIntentId } = await paymentProcess(
          pm_id,
          "PayNow",
          "Card",
          deliveryEmail,
          orderId,
          cardHolderName,
          gst,
          wet,
          subtotal,
          total,
          convertedPaymentDueDate,
          last4
        );

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: pm_id,
          }
        );

        if (error) {
          setLoading(false);
          errorMessage(error?.message);
        } else {
          setLoading(false);
          paymentProcessUpdate(
            orderId,
            cardHolderName,
            paymentIntent.status,
            paymentIntent?.id,
            OrderPaymentIntentId
          );
          cartStatusUpdate();
          orderStatusUpdate();
          countDown("payNow", "");
        }
      }
    } else {
      const payload = await stripe.createPaymentMethod({
        type: "au_becs_debit",
        au_becs_debit: elements.getElement(AuBankAccountElement),
        billing_details: {
          email: email,
          name: cardHolderName, // Use the cardholder's name from the input field
          address: {
            // Include the customer's address here
            line1: deliveryAddress?.Address,
            city: deliveryAddress?.Suburb,
            state: deliveryAddress?.State?.label,
            postal_code: deliveryAddress?.Postcode,
            country: "AU",
          },
        },
      });

      const { defaultPaymentTerm } = JSON.parse(
        localStorage.getItem("buyerInfo")
      );
      if (payload) {
        const pm_id = payload?.paymentMethod?.id;
        const last4 = payload.paymentMethod.au_becs_debit.last4;
        const convertedPaymentDueDate = convertDefaultPaymentTermValue(
          defaultPaymentTerm?.length ? defaultPaymentTerm[0] : "",
          "paymentDueDate"
        );

        const details = {
          orderId: localStorage.getItem("orderId"),
          orderByEmailID: email,
          orderBy: cardHolderName,
          organisationID: localStorage.getItem("organisationId"),
          catalogueID: localStorage.getItem("catalogueId"),
          orderStatus: "InProcessBecs",
          paymentType: "PayLater",
          paymentMethod: "becs",
          paymentMethodID: pm_id,
          paymentMethodType: bankName,
          last4: last4,
          paymentDueDate: convertedPaymentDueDate,
          transactionId: "",
          transactionStatus: "",
          paymentStatus: "PayLater",
          totalPrice: subtotal,
          gst: gst,
          wt: wet,
          paymentAmount: `${total}`,
          payAmountLong: total,
          couponDiscount: "",
          couponKey: "",
        };

        const clientSecret = await getClientSecret(details);
        console.log("clientSecretBecs", clientSecret);

        const auBankAccount = elements.getElement(AuBankAccountElement);

        if (clientSecret) {
          const { error, paymentIntent } =
            await stripe.confirmAuBecsDebitPayment(clientSecret, {
              payment_method: {
                au_becs_debit: auBankAccount,
                billing_details: {
                  name: cardHolderName,
                  email: email,
                },
              },
            });

          if (error) {
            // Show error to your customer.
            setLoading(false);
            errorMessage(error.message);
          } else {
            setLoading(false);
            paymentProcessUpdate(
              localStorage.getItem("orderId"),
              cardHolderName,
              paymentIntent.status,
              paymentIntent.id,
              paymentIntent.id
            );
            cartStatusUpdate();
            orderStatusUpdate();
            countDown("payLater", convertedPaymentDueDate);

            // Show a confirmation message to your customer.
            // The PaymentIntent is in the 'processing' state.
            // BECS Direct Debit is a delayed notification payment
            // method, so funds are not immediately available.
          }
        }
      }
    }
  };

  return (
    <>
      <style>
        {`
     .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled),.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
      background:${token.bannerThemeColor} !important
    }
   
    .ant-select-item:hover h5,.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) h5,.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state{
      color:${token.commonThemeColor} !important;
    }
    .green-checkbox input[type="checkbox"]:checked::before {
      color: ${token.commonThemeColor} !important;
    }
    .green-checkbox input[type="checkbox"]:checked {
    
      border: 1px solid ${token.commonThemeColor} !important;
    }
    `}
      </style>
      <Spin spinning={loading} size="large" delay={500}>
        <div className="">
          <div className="py-4">
            <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
              {editContact ? (
                <ContactEdit
                  setEditContact={setEditContact}
                  editContact={editContact}
                  deliveryContact={deliveryContact}
                  setDeliveryContact={setDeliveryContact}
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
                      className="flex justify-start items-center gap-2 change-btn"
                      onClick={() => setEditContact(!editContact)}
                    >
                      <Tooltip placement="top" title={text}>
                        <EditIcon {...btnProps} style={{ width: "25px" }} />
                      </Tooltip>
                    </button>
                    {/* </Link> */}
                  </div>

                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {deliveryContact?.FirstName} {deliveryContact?.LastName}
                  </p>

                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {deliveryContact?.email}
                  </p>
                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {deliveryContact?.Mobile}
                  </p>
                </>
              )}
            </div>

            <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
              {editDelivery ? (
                <DeliveryEditAddress
                  setEditDelivery={setEditDelivery}
                  editDelivery={editDelivery}
                  setDeliveryAddress={setDeliveryAddress}
                  deliveryAddress={deliveryAddress}
                  setActiveChecked={setActiveChecked}
                  activeChecked={activeChecked}
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
                    <button
                      onClick={() => setEditDelivery(!editDelivery)}
                      className="flex justify-start items-center gap-2 change-btn"
                    >
                      <Tooltip placement="top" title={text}>
                        <EditIcon {...btnProps} style={{ width: "25px" }} />
                      </Tooltip>
                    </button>
                  </div>
                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {`${deliveryAddress?.Apartment}, ${deliveryAddress?.Address}, ${deliveryAddress?.Suburb}, ${deliveryAddress?.State} ${deliveryAddress?.Postcode}`}
                    , Australia
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
                        style={{
                          maskType: "luminance",
                        }}
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
                      {deliveryAddress?.Notes}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
              {editBillingAddress ? (
                <BillingAddress
                  billingAddress={billingAddress}
                  deliveryAddress={deliveryAddress}
                  setEditBillingAddress={setEditBillingAddress}
                  editBillingAddress={editBillingAddress}
                  setBillingAddressData={setBillingAddressData}
                  billingAddressData={billingAddressData}
                  activeChecked={activeChecked}
                  setActiveChecked={setActiveChecked}
                />
              ) : (
                <>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-1.5">
                      <ReceiptLongSharpIcon
                        style={{ fill: "#2B4447" }}
                        className="w-[18px] h-[18px]"
                      />
                      <h5 className="text-lg font-semibold text-[#2B4447]">
                        Billing Address
                      </h5>
                    </div>
                    <button
                      onClick={() => setEditBillingAddress(!editBillingAddress)}
                      className="flex justify-start items-center gap-2 change-btn"
                    >
                      <Tooltip placement="top" title={text}>
                        <EditIcon {...btnProps} style={{ width: "25px" }} />
                      </Tooltip>
                    </button>
                  </div>
                  <p className="text-base font-normal text-[#2B4447] my-1">
                    {`${billingAddressData?.Address}, ${billingAddressData?.Apartment}, ${billingAddressData?.Suburb}, ${billingAddressData?.State} ${billingAddressData?.Postcode}`}
                    , Australia
                  </p>
                </>
              )}
            </div>
            <div className=" mb-3">
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

              <div className=" rounded-md ">
                <label htmlFor="">
                  <h5 className="text-xl font-semibold  text-[#2B4447] mb-3">
                    Your agreed payment term
                  </h5>
                </label>
                <div className="border h-[55px] rounded-lg flex items-center text-start">
                  <h5 className="text-[#2B4447] font-medium text-base mx-[20px]">
                    {buyer.defaultPaymentTerm}
                  </h5>
                </div>
              </div>
              <div className=" rounded-md mt-4">
                <label htmlFor="">
                  <h5 className="text-xl font-semibold  text-[#2B4447] mb-3">
                    Your preferred payment Method
                  </h5>
                </label>
                <div className="border h-[55px] rounded-lg flex items-center text-start mt">
                  <h5 className="text-[#2B4447] font-medium text-base mx-[20px]">
                    {buyer.defaultPaymentMethod}
                  </h5>
                </div>
                <p className="text-normal font-medium text-[#2B4447] mt-2">
                  All transactions are encrypted
                </p>
              </div>

              <Tabs
                defaultActiveKey="1"
                activeKey={activeKey}
                onChange={handleTabChange}
              >
                {buyer.defaultPaymentMethod === "BECS (Direct Debit)" ? (
                  <TabPane
                    tab={
                      <div
                        onClick={() => {
                          setSelectedPaymentTerm("Pay Now");
                          setIsChecked(true);
                          setCardDetails(true);
                        }}
                        className={`  rounded-md w-[175px] py-[18px]`}
                        style={{
                          background:
                            activeKey === "2" ? token.bannerThemeColor : "#fff",
                          border: `1px solid ${
                            activeKey === "2"
                              ? token.commonThemeColor
                              : "#E7E7E7"
                          }
                        `,
                        }}
                      >
                        <h5
                          className="text-[#2B4447] font-semibold text-base text-center mb-1"
                          style={{
                            color:
                              activeKey === "2"
                                ? token.commonThemeColor
                                : "#2B4447",
                          }}
                        >
                          Pay Now
                        </h5>
                        <p
                          className="text-sm text-[#637381] text-center"
                          style={{
                            color:
                              activeKey === "2"
                                ? token.commonThemeColor
                                : "#637381",
                          }}
                        >
                          Credit or Debit Card
                        </p>
                      </div>
                    }
                    key="1"
                  >
                    {/* <h5 className="text-lg font-semibold text-[#2B4447]">
                    No payment period for pay now
                  </h5> */}

                    <div className="border border-[#E7E7E7] rounded-md   mt-2">
                      <div
                        className="justify-between flex items-center  border-b p-3 border-[#E7E7E7]"
                        onClick={() => {
                          openTab();
                        }}
                      >
                        <div className=" flex items-center">
                          <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center cursor-pointer">
                            <style>
                              {`.custom-radio:checked::after {background-color:${token.buttonThemeColor} }`}
                            </style>
                            <input
                              defaultChecked=""
                              id="default-radio-1"
                              type="radio"
                              defaultValue=""
                              name="default-radio"
                              className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                              style={{
                                boxShadow:
                                  " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                              }}
                              checked={true}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                          <label
                            htmlFor="default-radio-1"
                            className="ml-4 text-base font-semibold text-[#2B4447] "
                          >
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
                      {/* {isChecked && ( */}
                      <div className="bg-[#E7E7E7] py-5 px-2">
                        <div className="rounded-md bg-white p-3 flex justify-between">
                          <div className="flex items-center gap-2">
                            <img src="/assets/visa.png" alt="" />
                            <h5 className="font-medium text-[#2B4447] text-base">
                              Credit card ending with XXXX
                            </h5>
                          </div>
                          <div className="change-btn cursor-pointer">
                            <Tooltip placement="top" title={text}>
                              <ModeIcon
                                // style={{ fill: token.buttonThemeColor }}
                                onClick={() => {
                                  setCardDetails(!cardDetails);
                                  setIsChecked(isChecked);
                                  setTransfer(transfer);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      {/* )} */}
                      {/* {cardDetails && (
                        <> */}
                      <div className=" py-5 px-4">
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <label className="mb-2">Card number</label>
                          <div className="custom-card mt-2">
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
                          </div>

                          <p className="mt-2 mb-2 text-red-500 text-xs">
                            {cardErrors?.cardNumber?.message}
                          </p>
                          <div className="absolute top-[39px] right-[10px]">
                            <LockOpenIcon
                              style={{
                                fill: "#979797",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className={`relative mb-4 w-full`}
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
                            style={{
                              background: "#F8F8F8",
                            }}
                          />
                        </div>
                        <div className="flex flex-nowrap gap-2">
                          <div
                            className={`relative mb-4  w-full`}
                            data-te-input-wrapper-init
                          >
                            <label className="mb-2">
                              Expiration date
                              <div className="custom-card mt-2">
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
                              </div>
                            </label>
                            <p className="mt-2 mb-2 text-red-500 text-xs">
                              {cardErrors?.cardExpiry?.message}
                            </p>
                          </div>
                          <div
                            className={`relative mb-4 w-full`}
                            data-te-input-wrapper-init
                          >
                            <label className="mb-2">
                              CVC
                              <div className="custom-card mt-2 ">
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
                              </div>
                            </label>
                            <p className="mt-2 mb-2 text-red-500 text-xs">
                              {cardErrors?.cardCvc?.message}
                            </p>
                          </div>
                        </div>
                        {contextHolder}
                        <div className="flex items-center mb-4">
                          <input
                            defaultChecked=""
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
                          />

                          <label
                            htmlFor="radio-3"
                            className="ml-4 text-base font-normal text-[#2B4447] "
                          >
                            Save card details
                          </label>
                        </div>
                      </div>
                      {/* </> */}
                      {/* )} */}

                      {/* <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                      <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center cursor-pointer">
                        <input
                          defaultChecked=""
                          id="default-radio-2"
                          type="checkbox"
                          name="default-radio"
                          checked={isCheckedTransfer}
                          onChange={() => openTransfer()}
                          className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                          style={{
                            boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                          }}
                        />
                      </div>
                      <label
                        htmlFor="default-radio-2"
                        className="ml-4 text-base font-semibold text-[#2B4447]"
                      >
                        Bank transfer (EFT)
                      </label>
                    </div>
                    {transfer && (
                      <>
                        <div className=" py-5 px-4">
                          <div className="flex flex-nowrap gap-2">
                            <div
                              className={`relative mb-4 w-full`}
                              // data-te-input-wrapper-init
                            >
                              <label
                                htmlFor="Name"
                                className="text-[#2B4447] font-normal text-sm"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="Name"
                                name="Name"
                                placeholder="Name"
                                autoComplete="on"
                                style={{ background: "#F8F8F8" }}
                              />
                            </div>
                            <div
                              className={`relative mb-4 w-full`}
                              // data-te-input-wrapper-init
                            >
                              <label
                                htmlFor="Email"
                                className="text-[#2B4447] font-normal text-sm"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                id="Email"
                                name="Email"
                                placeholder="Email"
                                autoComplete="on"
                                style={{ background: "#F8F8F8" }}
                              />
                            </div>
                          </div>
                          <div
                            className={`relative mb-4 w-full`}
                            // data-te-input-wrapper-init
                          >
                            <label
                              htmlFor="BSBNumber"
                              className="text-[#2B4447] font-normal text-sm"
                            >
                              BSB Number
                            </label>
                            <input
                              type="email"
                              id="BSBNumber"
                              name="BSBNumber"
                              placeholder="BSB Number"
                              autoComplete="on"
                              style={{ background: "#F8F8F8" }}
                            />
                          </div>
                          <div
                            className={`relative mb-4 w-full`}
                            // data-te-input-wrapper-init
                          >
                            <label
                              htmlFor="AccountNumber"
                              className="text-[#2B4447] font-normal text-sm"
                            >
                              Account Number
                            </label>
                            <input
                              type="text"
                              id="AccountNumber"
                              name="AccountNumber"
                              placeholder="Account Number"
                              autoComplete="on"
                              style={{ background: "#F8F8F8" }}
                            />
                          </div>
                        </div>
                      </>
                    )} */}
                    </div>
                  </TabPane>
                ) : (
                  <TabPane
                    tab={
                      <>
                        <div
                          onClick={() => setSelectedPaymentTerm("Pay Later")}
                          className={`  rounded-md w-[175px] py-[18px]`}
                          style={{
                            background:
                              activeKey === "1"
                                ? token.bannerThemeColor
                                : "#fff",
                            border: `1px solid ${
                              activeKey === "1"
                                ? token.commonThemeColor
                                : "#E7E7E7"
                            }
                          `,
                          }}
                        >
                          <h5
                            className="text-[#2B4447] font-semibold text-base text-center mb-1"
                            style={{
                              color:
                                activeKey === "1"
                                  ? token.commonThemeColor
                                  : "#2B4447",
                            }}
                          >
                            Pay Later
                          </h5>
                          <p
                            className="text-base text-[#637381] text-center"
                            style={{
                              color:
                                activeKey === "1"
                                  ? token.commonThemeColor
                                  : "#637381",
                            }}
                          >
                            {" "}
                            Manual, BECS
                          </p>
                        </div>
                      </>
                    }
                    key="1"
                  >
                    {
                      <Becs
                        setBankName={setBankName}
                        setCardHolderName={setCardHolderName}
                        cardHolderName={cardHolderName}
                        setEmail={setEmail}
                        email={email}
                      />
                    }
                    {/* </div> */}
                  </TabPane>
                )}
              </Tabs>
            </div>
            <div className="text-right">
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: token.buttonThemeColor,
                }}
                className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white hover:bg-[#6a59ce]"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default Payment;
