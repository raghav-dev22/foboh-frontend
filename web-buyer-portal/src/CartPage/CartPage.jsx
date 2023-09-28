import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../main/Header";
import Footer from "../main/Footer";
import Select from "react-select";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../ProductPage/ProductDetails";
import { remove, updateQuantity } from "../slices/CartSlice";
import { timeline } from "@material-tailwind/react";
import { removeDollarAndConvertToInteger } from "../helper/convertToInteger";
import { theme } from "antd";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CartPage = () => {
  const [totalCost, setTotleCost] = useState(0);
  const [addCartPage, setAddCartPage] = useState([]);
  const CARTdata = useSelector((items) => items.cart);
  const [updatedQuantity, setUpdatedQuantity] = useState({
    productId: "",
    quantity: 0,
  });
  const { useToken } = theme;
  const url = process.env.REACT_APP_PRODUCTS_URL;
  const { token } = useToken();
  const dispatch = useDispatch();

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
        console.log("Deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const calculateTotalCost = () => {
    let total = 0;
    CARTdata.forEach((item) => {
      const productPrice = item?.product?.buyPrice;
      const productPriceINR = productPrice;
      const quantity = parseInt(item?.quantity);
      total += productPriceINR * quantity;

      console.log("hdgfj", total);
    });
    return total;
  };

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");

    fetch(`${url}/api/Product/getAddToCartByCartId?CartId=${cartId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "addcart");

        if (data.success) {
          setAddCartPage(
            data.data.map((product) => {
              return {
                product: product,
                quantity: product?.quantity,
              };
            })
          );
        }
      })
      .catch((error) => console.log(error));

    const newTotal = calculateTotalCost();
    setTotleCost(newTotal.toFixed(2));
    console.log("Total Cost:", totalCost);
  }, [CARTdata]);

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

      fetch(`${url}/api/Product/UpdateToCart?ProductId=${productId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          createdBy: deliveryFirstName,
          buyerId: buyerId,
          productStatus: "update",
          productId: productId,
          quantity: newQuantity,
        }),
      })
        .then((response) => {
          return response.json();
          // setQuantity(newQuantity);

          console.log("Updated successfully:", response);
        })
        .then((data) => {
          console.log(data, "updatequantity");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  );

  const handleIncrementDecrement = (productId, quantity, action) => {
    console.log("handleIncrementDecrement", productId, quantity, action);
    setAddCartPage((prevAddCartPage) => {
      return prevAddCartPage.map((product) => {
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
    });
  };

  return (
    <>
      {/* <Header /> */}
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
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
            {addCartPage.length === 0 ? (
              <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
                Your cart is empty.
              </h5>
            ) : (
              <>
                {addCartPage.map((item, index) => (
                  <div className="flex justify-center items-center gap-4  pb-4 border-b border-b-[#E7E7E7] mb-4">
                    <div className="w-[150px] rounded-md h-[100px] bg-[#c3c3c3]">
                      <img
                        src={item.product?.productImageUrls}
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
                                    item?.product?.productId,
                                    item?.quantity,
                                    "decrement"
                                  )
                                }
                              >
                                -
                              </p>
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
                            ${item.product?.buyPrice}
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
              <Link to="/home/payment-page/payment">
                <button
                  className="bg-[#563FE3] rounded-[8px] w-full py-[9px] text-base font-medium text-white"
                  style={{ backgroundColor: token.buttonThemeColor }}
                >
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
