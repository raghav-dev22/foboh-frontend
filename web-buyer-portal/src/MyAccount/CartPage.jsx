import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../desktop/Header";
import Footer from "../desktop/Footer";
import Select from "react-select";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../desktop/ProductDetails";
import { remove, updateQuantity } from "../slices/CartSlice";
import { timeline } from "@material-tailwind/react";
import { removeDollarAndConvertToInteger } from "../helper/convertToInteger";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CartPage = () => {
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
      {/* <Header /> */}
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        {/* <div className="justify-start items-center gap-3 pt-8 md:flex hidden">
          <h5 className="text-black font-medium text-base cursor-pointer">
            Home
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Products
          </h5>
          <EastIcon />
          <h5 className="text-black font-medium text-base cursor-pointer">
            Cart Page
          </h5>
        </div> */}
        <div className="  mb-12 md:bg-white  bg-[#563FE3] md:p-0 p-4 relative">
          <h2 className="md:font-semibold font-medium md:text-2xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center">
            My Cart
          </h2>
          <div className="md:hidden sm:block">
            <ArrowBackIcon
              className="absolute top-[32%] left-[20px] "
              style={{ fill: "#fff" }}
            />
          </div>
        </div>
        <div className="flex  justify-between flex-wrap md:px-0 px-6 overflow-scroll">
          <div className="lg:w-[60%] w-full overflow-scroll  mb-[2rem]">
            {CARTdata.length === 0 ? (
              <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
                Your cart is empty.
              </h5>
            ) : (
              <>
                {CARTdata.map((item, index) => (
                  <div className="flex justify-center items-center gap-4  pb-4 border-b border-b-[#E7E7E7] mb-4">
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
                          <h4 className="md:text-lg text-base font-semibold text-[#2B4447]">
                            {item.product?.title}
                          </h4>
                          <div className="">
                            <div className="border border-[#E7E7E7] py-[6px] px-[12px] rounded-md flex justify-center items-center gap-3">
                              <p
                                className="text-[#637381] cursor-pointer"
                                onClick={() =>
                                  handleIncrementDecrement(
                                    item.product.id,
                                    "decrement"
                                  )
                                }
                              >
                                -
                              </p>

                              {/* <p className="text-[#637381]"> {item.quantity}</p> */}

                              <p
                                className="text-[#637381] cursor-pointer "
                                onClick={() =>
                                  handleIncrementDecrement(
                                    item.product.id,
                                    "increment"
                                  )
                                }
                              >
                                +
                              </p>
                            </div>
                          </div>
                          <h4 className="md:text-lg text-base text-[#2B4447] font-semibold">
                            {item.product?.price}
                          </h4>
                        </div>

                        <div className="">
                          <p className="text-base font-medium text-[#637381]">
                            Quantity - {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full w-[14px] h-[14px] border border-[#637381] flex justify-center items-center">
                            <CheckIcon
                              style={{ fill: "#637381", width: "8px" }}
                            />
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
          </div>
          <div className="lg:w-[30%]	w-full">
            <div className="bg-[#FBFAFF] p-5">
              <h2 className="text-xl font-semibold text-[#2B4447] ">
                Order Summary
              </h2>
              <div className="py-4">
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Subtotal
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    ${totalCost}
                  </h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Shipping estimate
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Tax estimate
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
                </div>
              </div>
              <Link to="/home/check-out">
                <button className="bg-[#563FE3] rounded-[8px] w-full py-[9px] text-base font-medium text-white">
                  {" "}
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CartPage;
