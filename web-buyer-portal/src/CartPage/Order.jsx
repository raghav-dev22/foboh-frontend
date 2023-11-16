import React, { useEffect, useState } from "react";

import Select from "react-select";
import { theme } from "antd";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { setCart, updateQuantity } from "../slices/CartSlice";
import AppliedCoupon from "../modal/AppliedCoupon";
import { useMemo } from "react";
import { getCalculations } from "../helper/getCalculations";
import { useQuery } from "react-query";
import { getCart } from "../react-query/cartApiModule";
import { message } from "antd";

const Order = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const [show, setShow] = useState(false);
  const [addCart, setAddCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [isWineSubcat, setIsWineSubcat] = useState(false);
  const [applied, setApplied] = useState(false);
  const [bg, setBg] = useState(false);
  const [color, setColor] = useState();
  const [invalid, setInvalid] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const url = process.env.REACT_APP_PRODUCTS_URL;
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
      setBg(true);
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
  const CARTdata = useSelector((items) => items.cart);
  const dispatch = useDispatch();

  const handleIncrementDecrement = (id, actionType) => {
    dispatch(updateQuantity({ id, actionType }));
  };

  const error = (error) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };
  
  if (cartError) {
    error(cartError);
  }

  // Fetching cart data
  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
    refetch: cartRefetch,
  } = useQuery("getCartApi", getCart);


  // Calculating cart
  const [gst, wet, subtotal, total] = useMemo(() => {
    const calculationResult = getCalculations(cartData);
    return calculationResult;
  }, [cartData]);

  const removeItem = (productId, productStatus) => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));
    fetch(`${url}/api/Product/RemoveAddToCart?ProductId=${productId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId,
        productStatus: "remove",
        productId: productId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data response", data);
        if (data.success) {
          const updatedCartList = data?.data.map((item) => {
            return {
              product: item,
              quantity: item?.quantity,
            };
          });
          cartRefetch();
          dispatch(setCart(updatedCartList));
        }
        console.log(data, "add data");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

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
              <div className="w-[150px] rounded-md h-[100px] bg-[#c3c3c3]">
                <img
                  src={item.product?.productImageUrls}
                  alt=""
                  className="w-[150px]  h-[100px]  object-cover	rounded-md"
                />
              </div>

              <div className="flex flex-col justify-center gap-12 h-full py-3 w-full">
                <div>
                  <div className="flex justify-between w-full gap-3">
                    <h4 className=" text-base font-semibold text-[#2B4447]">
                      {item.product?.title}
                    </h4>

                    <h4 className=" text-base text-[#2B4447] font-semibold">
                      {item.product?.globalPrice}
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
                    <div className="rounded-full w-[14px] h-[14px] border border-[#009900] flex justify-center items-center">
                      <CheckIcon style={{ fill: "#009900", width: "8px" }} />
                    </div>
                    <p className="text-sm font-normal text-[#637381]">
                      Available In Stock
                    </p>
                  </div>
                  <p
                    onClick={() => removeItem(item.product?.productId)}
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
            className={`placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 `}
            id="grid-first-name"
            type="text"
            placeholder="Promotional Code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            style={{ color: bg === true ? token.commonThemeColor : "#000" }}
          />
          <button
            className={`bg-[#000] absolute top-0 right-0 h-full w-[65px] flex justify-center items-center rounded-r-[8px]`}
            onClick={applyPromoCode}
            style={{
              background: bg === true ? token.commonThemeColor : "#000",
            }}
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
          <h5 className="text-sm font-medium text-[#2B4447]">${subtotal}</h5>
        </div>
        <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
          <h5 className="text-sm font-medium text-[#2B4447]">
            Shipping estimate
          </h5>
          <h5 className="text-sm font-medium text-[#2B4447]">$0</h5>
        </div>
        {wet > 0 && (
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">WET</h5>
            <h5 className="text-sm font-medium text-[#2B4447]">${wet}</h5>
          </div>
        )}
        <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
          <h5 className="text-sm font-medium text-[#2B4447]">GST</h5>
          <h5 className="text-sm font-medium text-[#2B4447]">${gst}</h5>
        </div>
        <div className="flex justify-between py-3 ">
          <h5 className="text-base font-semibold text-[#2B4447]">
            Order total
          </h5>
          <h5 className="text-base font-semibold text-[#2B4447]"> ${total}</h5>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Order;
