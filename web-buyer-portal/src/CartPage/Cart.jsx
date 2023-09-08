import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { remove } from "../slices/CartSlice";

const Cart = ({ open, onClose }) => {
  const dispatch = useDispatch((item) => {
    dispatch(remove(item));
  });
  const CARTdata = useSelector((items) => items.cart);
  const removeItem = (cartItem) => {
    dispatch(remove(cartItem));
  };
  console.log(CARTdata, "CARTdata");
  return (
    <>
      <Dialog
        as="div"
        className=""
        open={open}
        onClose={onClose}
        // onBlur={onClose}
      >
        <div className="fixed inset-0 z-10 " />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0000002e]  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="fixed inset-y-0 right-0 z-10 w-10/12	 overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between px-4">
              <div
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                <h5 className="text-sm font-bold text-center  pt-8  flow-root border-t border-[#CDCED6] ">
                  Your cart is empty.
                </h5>
              ) : (
                <>
                  {CARTdata.map((item, index) => {
                    return (
                      <>
                        <div className="box  my-4 relative cartbox-div">
                          <div className="flex items-center gap-2 p-2 cart-div shadow-md rounded-lg bg-white">
                            <div className="cart-img">
                              <img
                                src={item.product?.img}
                                alt=""
                                className="max-w-[80px] w-[80px] h-[80px] object-cover	"
                              />
                            </div>
                            <div className="w-full flex flex-col gap-[15px]">
                              <div className="">
                                <h5 className="text-sm font-bold">
                                  {item.product?.title}
                                </h5>
                                <p className=" text-[#666666] text-xs">
                                  {item.product?.name}
                                </p>
                              </div>
                              <div className="flex justify-between items-center">
                                <h5 className="text-sm font-bold">
                                  {" "}
                                  {item.product?.price}
                                </h5>
                                <p className=" text-[#666666] text-xs mx-3">
                                  Qty-{item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="z-[-1] remove-div w-full flex justify-end items-center pr-1 absolute bg-black rounded-[13px] top-0 left-0 h-full cursor-pointer"
                            onClick={() => {
                              removeItem(item.product?.id);
                            }}
                          >
                            <DeleteIcon style={{ fill: "#fff" }} />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
            <div className="flex justify-between pt-8 px-6">
              <Link to="/home/cart">
                <div className="border border-[#637381] rounded-md p-[10px] sm:py-[12px] sm:px-[40px]">
                  <h4 className="text-base font-medium text-[#637381]">
                    View Cart
                  </h4>
                </div>
              </Link>
              <Link to="/home/payment-page/check-out">
                <div className="bg-[#563FE3] rounded-md p-[10px] sm:py-[12px] sm:px-[40px]">
                  <h4 className="text-base font-medium text-[#fff]">
                    Checkout
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Cart;