import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../main/Header";
import Footer from "../main/Footer";
import Select from "react-select";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../ProductPage/ProductDetails";
import { remove, updateQuantity } from "../slices/CartSlice";
import { timeline } from "@material-tailwind/react";
import { removeDollarAndConvertToInteger } from "../helper/convertToInteger";
import AppliedCoupon from "../modal/AppliedCoupon";

const Order = () => {
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
      const productPrice = removeDollarAndConvertToInteger(
        item?.product?.price
      );
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
      {CARTdata.length === 0 ? (
        <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
          Your cart is empty.
        </h5>
      ) : (
        <>
          {" "}
          {CARTdata.map((item, index) => (
            <div className="flex justify-center items-center gap-3  pb-4 border-b border-b-[#E7E7E7] mb-4">
              <div className="">
                <img
                  src={item.product?.img}
                  alt=""
                  className="w-[150px]  object-cover	rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center gap-12 h-full py-3 w-full">
                <div>
                  <div className="flex justify-between w-full gap-3">
                    <h4 className=" text-base font-semibold text-[#2B4447]">
                      {item.product?.title}
                    </h4>

                    <h4 className=" text-base text-[#2B4447] font-semibold">
                      {item.product?.price}
                    </h4>
                  </div>

                  <div className="">
                    <p className="text-sm font-medium text-[#637381]">
                      Quantity - {item?.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full w-[14px] h-[14px] border border-[#637381] flex justify-center items-center">
                      <CheckIcon style={{ fill: "#637381", width: "8px" }} />
                    </div>
                    <p className="text-sm font-normal text-[#637381]">
                      Available In Stock
                    </p>
                  </div>
                  <p
                    onClick={() => removeItem(item.product?.id)}
                    className="text-[#DC3545] text-sm font-medium cursor-pointer"
                  >
                    Remove
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="pt-5">
        <h4 className="text-lg font-semibold text-[#2B4447]">
          Promotional Code
        </h4>
        <div className="relative">
          <input
            className={`placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-[${color}] `}
            id="grid-first-name"
            type="text"
            placeholder="Promotional Code"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          <button
            className={`bg-[${bg}] absolute top-0 right-0 h-full w-[65px] flex justify-center items-center rounded-r-[8px]`}
            onClick={applyPromoCode}
          >
            <ChevronRightIcon style={{ fill: "#fff" }} />
          </button>

          <AppliedCoupon show={show} setShow={setShow} />
        </div>
        <p className="text-[#E94444] text-sm font-normal mt-2">{invalid}</p>
      </div>
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

      {/* <Footer /> */}
    </>
  );
};

export default Order;
