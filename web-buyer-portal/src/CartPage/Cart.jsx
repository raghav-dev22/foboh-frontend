import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { setCart } from "../slices/CartSlice";
import { Modal } from "antd";
import { theme } from "antd";

const Cart = ({ open, onClose }) => {
  // const dispatch = useDispatch((item) => {
  //   dispatch(remove(item));
  // });
  const dispatch = useDispatch();
  const { useToken } = theme;
  const url = process.env.REACT_APP_PRODUCTS_URL;
  const { token } = useToken();
  const CARTdata = useSelector((items) => items.cart);

  const navigate = useNavigate();

  const warning = () => {
    Modal.warning({
      title: "Warning",
      content: (
        <div>
          <h1>No products are available on your cart page</h1>
          {/* <p>Some error has occurred.</p> */}
        </div>
      ),
    });
  };

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
        if (data.success) {
          const updatedCartList = data?.data.map((item) => {
            return {
              product: item,
              quantity: item?.quantity,
            };
          });
          dispatch(setCart(updatedCartList));
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      Navigate("/auth/sign-in");
    }
  }, []);
  const handleViewCart = () => {
    navigate("/home/my-cart");
    onClose(!onClose);
  };
  const handleExplore = () => {
    navigate("/home/all-products");
    onClose(!onClose);
  };
  const handleCheckout = () => {
    onClose(!onClose);
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
      <style>
        {`
      .ant-btn{
        background:${token.commonThemeColor} !important
      }`}
      </style>

      <div className="fixed inset-0 z-50 bg-[#00000024] backdrop-blur-[1px]">
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0000002e]  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="fixed inset-y-0 right-0 z-10 w-10/12	 overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between px-4">
              <div
                className="-m-2.5 rounded-md p-2.5 text-gray-700 cursor-pointer"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h5 className="text-base font-semibold text-[#1D1E20]">
                Shopping Cart
              </h5>
              <Link to="#">
                <div className="box-rounded bg-[#F4F7FF] rounded-full h-[40px] object-contain		w-[40px] flex justify-center items-center">
                  <ShoppingCartIcon className="icon-svg" />
                </div>
              </Link>
            </div>
            <div className="mx-5 mt-6">
              {CARTdata.length === 0 ? (
                <>
                  <h5 className="text-sm font-bold text-center  pt-8  flow-root border-t border-[#CDCED6] ">
                    Your cart is empty.
                  </h5>
                  <div className="flex justify-center pt-8 px-6">
                    <button
                      onClick={handleExplore}
                      style={{ backgroundColor: token.buttonThemeColor }}
                      className="bg-[#563FE3] cursor-pointer rounded-md p-[10px] sm:py-[12px] sm:px-[40px]"
                    >
                      <h4 className="text-base font-medium text-[#fff]">
                        Explore all products
                      </h4>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {CARTdata.map((item, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="box  my-4 relative cartbox-div"
                        >
                          <div className="flex items-center gap-2 p-2 cart-div shadow-md rounded-lg bg-white">
                            <div className="max-w-[80px] w-[80px] h-[80px]  bg-[#c3c3c3]">
                              <img
                                src={item.product?.productImageUrls[0]}
                                alt=""
                                className="max-w-[80px] w-[80px] h-[80px] object-cover	"
                              />
                            </div>
                            <div className="w-full flex flex-col gap-[15px]">
                              <div className="">
                                <h5 className="text-sm font-bold">
                                  {item.product?.title}
                                </h5>
                                <p
                                  className=" text-[#666666] text-xs"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "25ch",
                                  }}
                                >
                                  {item.product?.configuration}
                                </p>
                              </div>
                              <div className="flex justify-between items-center">
                                <h5 className="text-sm font-bold">
                                  $
                                  {(
                                    item?.product?.globalPrice * item.quantity
                                  ).toFixed(2)}
                                </h5>
                                <p className=" text-[#666666] text-xs mx-3">
                                  Qty:{item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            className="z-[-1] remove-div w-full flex justify-end items-center pr-1 absolute bg-black rounded-[13px] top-0 left-0 h-full cursor-pointer"
                            onClick={() => {
                              removeItem(
                                item.product?.productId
                                // item.product?.productId
                              );
                            }}
                            style={{ background: token.commonThemeColor }}
                          >
                            <DeleteIcon style={{ fill: "#fff" }} />
                          </button>
                        </div>
                      </>
                    );
                  })}
                  <div className="flex justify-between pt-8 ">
                    <button
                      onClick={handleViewCart}
                      className="border cursor-pointer border-[#637381] rounded-md p-[10px] sm:py-[12px] sm:px-[40px] active:bg-slate-200 focus:outline-none focus:ring focus:ring-slate-200"
                    >
                      <h4 className="text-base font-medium text-[#637381]">
                        View Cart
                      </h4>
                    </button>

                    <button
                      onClick={handleCheckout}
                      style={{ backgroundColor: token.buttonThemeColor }}
                      className="bg-[#563FE3] cursor-pointer rounded-md p-[10px] sm:py-[12px] sm:px-[40px]"
                    >
                      <h4 className="text-base font-medium text-[#fff]">
                        Checkout
                      </h4>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
