import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { remove, setCart, updateQuantity } from "../slices/CartSlice";
import { message, theme } from "antd";
import { useQuery } from "react-query";
import { getCart } from "../react-query/cartApiModule";
import { getCalculations } from "../helper/getCalculations";

const CartPage = () => {
  const [updatedQuantity, setUpdatedQuantity] = useState({
    productId: "",
    quantity: 0,
  });
  const { useToken } = theme;
  const url = process.env.REACT_APP_PRODUCTS_URL;
  const { token } = useToken();
  const dispatch = useDispatch();
  const cart = useSelector((items) => items.cart);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Quantity changed successfully!",
    });
  };
  const error = (error) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
    refetch: cartRefetch,
  } = useQuery("getCartApi", getCart);

  const { lucUnit, gst, wet, subtotal, total } = useMemo(() => {
    const calculationResult = getCalculations(cartData);
    return calculationResult;
  }, [cartData]);

  if (cartError) {
    error(cartError);
  }

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
          cartRefetch();
          const updatedCartList = data?.data.map((item) => {
            return {
              product: item,
              quantity: item?.quantity,
            };
          });
          dispatch(setCart(updatedCartList));
        }
        console.log(data, "add data");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      debouncedHandleIncrementDecrement(
        updatedQuantity.productId,
        updatedQuantity.quantity
      );
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [updatedQuantity]);

  function debounce(func, timeout = 0) {
    let timer;
    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  const debouncedHandleIncrementDecrement = debounce(
    (productId, newQuantity) => {
      const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));
      const { deliveryFirstName } = JSON.parse(
        localStorage.getItem("buyerInfo")
      );

      fetch(
        `${url}/api/Product/UpdateToCart?ProductId=${updatedQuantity.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            createdBy: deliveryFirstName,
            buyerId: buyerId,
            productStatus: "update",
            productId: updatedQuantity.productId,
            quantity: newQuantity,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            success();
          } else {
            if (updatedQuantity?.productId !== "") {
              warning(data.message);
            }
          }
          cartRefetch();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  );

  const handleIncrementDecrement = (productId, quantity, action) => {
    console.log("handleIncrementDecrement", productId, quantity, action);

    const updatedList = () => {
      return cart.map((product) => {
        if (product.product.productId === productId) {
          let newQuantity = product.quantity;

          if (action === "increment") {
            newQuantity++;
          } else if (action === "decrement" && newQuantity > 0) {
            newQuantity--;
          }
          setUpdatedQuantity({
            productId: productId,
            quantity: newQuantity,
          });
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
    };

    const x = updatedList();

    dispatch(setCart(x));
  };

  const handleCheckout = () => {
    const cartId = localStorage.getItem("cartId");
    const { deliveryEmail, deliveryFirstName, organisationId } = JSON.parse(
      localStorage.getItem("buyerInfo")
    );

    fetch(
      "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/OrderMain_Create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartID: cartId,
          orderByEmailID: deliveryEmail,
          orderBy: deliveryFirstName,
          organisationID: organisationId,
          catalogueID: localStorage.getItem("catalogueId"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const orderId = data?.data?.orderId;
          localStorage.setItem("orderId", orderId);
          navigate("/home/my-cart/checkout");
        } else {
          warning();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {contextHolder}
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="  mb-12 md:bg-white  bg-[#563FE3] md:p-0 p-4 relative">
          <h2
            style={{ color: token.commonThemeColor }}
            className="md:font-semibold font-medium md:text-2xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center"
          >
            My Cart
          </h2>
          <div className="md:hidden sm:block">
            <ArrowBackIcon
              className="absolute top-[32%] left-[20px] "
              style={{ fill: "#fff" }}
            />
          </div>
        </div>
        <div className="flex  justify-between flex-wrap md:px-0 px-6 overflow-scroll pb-10">
          <div className="lg:w-[60%] w-full overflow-scroll  mb-[2rem]">
            {cart.length === 0 ? (
              <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
                Your cart is empty.
              </h5>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center gap-4  pb-4 border-b border-b-[#E7E7E7] mb-4"
                  >
                    <div className="w-[150px] rounded-md h-[160px] bg-[#c3c3c3]">
                      <img
                        src={item.product?.productImageUrls[0]}
                        alt=""
                        className="w-[150px] h-[160px]  object-cover	rounded-md"
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
                                    item?.product?.productId,
                                    item?.quantity,
                                    "decrement"
                                  )
                                }
                              >
                                -
                              </p>
                              {item?.quantity}
                              <p
                                className="text-[#637381] cursor-pointer "
                                onClick={() =>
                                  handleIncrementDecrement(
                                    item?.product?.productId,
                                    item?.quantity,
                                    "increment"
                                  )
                                }
                              >
                                +
                              </p>
                            </div>
                          </div>
                          <h4 className="md:text-lg text-base text-[#2B4447] font-semibold">
                            $
                            {(
                              item?.product?.globalPrice * item.quantity
                            ).toFixed(2)}
                          </h4>
                        </div>

                        <div className="mb-2">
                          <p className="text-base font-medium text-[#637381]">
                            {item?.product?.configuration}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-base font-medium text-[#637381]">
                            ${item?.product?.globalPrice}
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
                        <div
                          className="bg-[#ed1c1c36] py-1.5 px-3 rounded-md"
                          onClick={() => removeItem(item.product?.productId)}
                        >
                          <p className="text-[#DC3545]  text-sm font-medium cursor-pointer">
                            Remove
                          </p>
                        </div>
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
                    ${subtotal}
                  </h5>
                </div>

                {wet > 0 && (
                  <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                    <h5 className="text-sm font-medium text-[#2B4447]">WET</h5>
                    <h5 className="text-sm font-medium text-[#2B4447]">
                      ${wet}
                    </h5>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">GST</h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">${gst}</h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    ${total}
                  </h5>
                </div>
              </div>

              <button
                className="bg-[#563FE3] rounded-[8px] w-full py-[9px] text-base font-medium text-white"
                style={{ backgroundColor: token.buttonThemeColor }}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
