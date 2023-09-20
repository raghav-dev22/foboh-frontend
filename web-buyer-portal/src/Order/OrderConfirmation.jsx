import React, { useEffect, useState } from "react";
// import EastIcon from "@mui/icons-material/East";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import { Link } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Header from "../main/Header";
// import Footer from "../main/Footer";
// import Select from "react-select";
import CallIcon from "@mui/icons-material/Call";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../ProductPage/ProductDetails";
import { remove, updateQuantity } from "../slices/CartSlice";
import { timeline } from "@material-tailwind/react";
import { removeDollarAndConvertToInteger } from "../helper/convertToInteger";
import AppliedCoupon from "../modal/AppliedCoupon";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const OrderConfirmation = () => {
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  const EditContactValue = JSON.parse(localStorage.getItem("ContactEdit"));
  const [editDelivery, setEditDelivery] = useState(false);
  const [editContact, setEditContact] = useState(false);
  console.log(EditDeliveryVal, "EditDeliveryVal");
  const [show, setShow] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [bg, setBg] = useState("#000");
  const [color, setColor] = useState();
  const [invalid, setInvalid] = useState("");
  const promoCodes = {
    CODE001: "CODE001",
    CODE002: "CODE002",
    CODE003: "CODE003",
    CODE004: "CODE004",
  };
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === promoCodes.CODE001) {
      setColor("#563FE3");
      setBg("#563FE3");
      setApplied(true);
      setInvalid("");
      setShow(true);
    } else if (promoCode === promoCodes.CODE003) {
      setBg("#000");
      setInvalid("This code is expired.");
    } else if (promoCode === promoCodes.CODE004) {
      setBg("#000");
      setInvalid("This code has already been applied.");
    } else {
      setInvalid("This code is invalid.");
      setBg("#000");
    }
  };
  const [totalCost, setTotleCost] = useState(0);
  const CARTdata = useSelector((items) => items.cart);
  const dispatch = useDispatch();

  const removeItem = (cartItem) => {
    dispatch(remove(cartItem));
  };

  const handleIncrementDecrement = (id, actionType) => {
    dispatch(updateQuantity({ id, actionType }));
  };

  const calculateTotalCost = () => {
    let total = 0;
    CARTdata.forEach((item) => {
      const productPrice = item?.product?.price;
      const productPriceINR = productPrice;
      const quantity = parseInt(item.quantity);
      total += productPriceINR * quantity;

      console.log("hdgfj", total);
    });
    return total;
  };

  useEffect(() => {
    const newTotal = calculateTotalCost();
    setTotleCost(newTotal.toFixed(2));
    console.log("Total Cost:", totalCost);
  }, [CARTdata]);

  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="mt-10">
          <h1 className="text-[30px] font-semibold text-[#2B4447] ">
            Thank you for your order
          </h1>
          <p className="text-sm font-normal mt-2 text-[#2B4447]">
            Thank you for your order. We are currently in the process of
            handling it. Please be patient, and you can expect to receive a
            confirmation from us shortly!
          </p>
        </div>
        <p className="my-6 font-semibold text-base text-[#563FE3]">
          Order Tracking ID - 012345678910
        </p>
        {CARTdata.length === 0 ? (
          <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
            Your cart is empty.
          </h5>
        ) : (
          <>
            {" "}
            {CARTdata.map((item, index) => (
              <div className="flex justify-center items-center gap-3  pb-4 border-b border-b-[#E7E7E7] mb-4">
                <div className="w-[150px] rounded-md h-[100px] bg-[#c3c3c3]">
                  <img
                    src={item.product?.productImageUrls}
                    alt=""
                    className="w-[150px]  object-cover	rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-center gap-10 h-full py-3 w-full">
                  <div>
                    <div className="flex justify-between w-full gap-3">
                      <div className="">
                        <h4 className=" text-base font-semibold text-[#2B4447]">
                          {item.product?.title}
                        </h4>
                        <p className="text-sm text-[#637381] font-medium ">
                          12 x 750ml
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[#2B4447]">
                        Quantity - {item?.quantity}
                      </p>
                      <h4 className=" text-base text-[#2B4447] font-semibold">
                        {item.product?.buyPrice}
                      </h4>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <p className="text-sm font-normal text-[#637381]">
                        Delivery By 14 August
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="py-4">
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">Subtotal</h5>
            <h5 className="text-sm font-medium text-[#2B4447]">${totalCost}</h5>
          </div>
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">
              Shipping estimate
            </h5>
            <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
          </div>
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">Tax estimate</h5>
            <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
          </div>
          <div className="flex justify-between py-3 ">
            <h5 className="text-base font-semibold text-[#2B4447]">
              Order total
            </h5>
            <h5 className="text-base font-semibold text-[#2B4447]">$60.00</h5>
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="border h-[200px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 w-full">
            <div className="mb-4">
              <h5 className="text-lg font-semibold text-[#2B4447] mb-1">
                Payment
              </h5>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/visa.png"
                  alt=""
                  className="w-10		 object-contain	"
                />

                <h5 className="text-base font-medium text-[#2B4447] ">
                  Credit card ending with 3259
                </h5>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Payment Status - <span className="font-medium">Paid </span>
            </h5>
          </div>
          <div className="border  h-[200px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 mb-4 w-full">
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Delivery Address
            </h5>

            <p className="text-base font-normal text-[#2B4447] my-2">
              456 King Street, Newton, NSW 2304 <br /> Australia
            </p>
            <p className="my-1 font-normal text-base text-[#637381] flex items-center">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1092_1890"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                >
                  <path d="M20 0H0V20H20V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1092_1890)">
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
              Instruction
            </p>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default OrderConfirmation;
