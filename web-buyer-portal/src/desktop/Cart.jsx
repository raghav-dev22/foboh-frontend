import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { remove } from "../store/CartSlice";

const Cart = () => {
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
      <div className="mx-5 mt-8">
        {CARTdata.length === 0 ? (
          <h5 className="text-sm font-bold text-center  pt-8 mt-8 flow-root border-t border-[#CDCED6] ">
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
                          src={item.img}
                          alt=""
                          className="max-w-[80px] w-[80px] h-[80px] object-cover	"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-[15px]">
                        <div className="">
                          <h5 className="text-sm font-bold">
                            Product name 123
                          </h5>
                          <p className=" text-[#666666] text-xs">
                            Product name 123
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-bold"> ${item.price}</h5>
                          <div className="bg-[#EEEEEE] rounded-[30px]  w-[70px] flex gap-2 justify-center items-center">
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                const _CART = CARTdata.map(
                                  (cartItem, index) => {
                                    return item.id === cartItem.id
                                      ? {
                                          ...cartItem,
                                          quantity:
                                            cartItem.quantity > 1
                                              ? cartItem.quantity - 1
                                              : 1,
                                        }
                                      : cartItem;
                                  }
                                );
                                // setCARTData(_CART);
                              }}
                            >
                              -
                            </div>
                            <div className="text-xs">
                              {/* {item.quantity} */}1
                            </div>
                            <div
                              className="cursor-pointer	"
                              onClick={() => {
                                const _CART = CARTdata.map(
                                  (cartItem, index) => {
                                    return item.id === cartItem.id
                                      ? {
                                          ...cartItem,
                                          quantity: cartItem.quantity + 1,
                                        }
                                      : cartItem;
                                  }
                                );
                                // setCARTData(_CART);
                              }}
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="z-[-1] remove-div w-full flex justify-end items-center pr-1 absolute bg-black rounded-[13px] top-0 left-0 h-full cursor-pointer"
                      onClick={() => {
                        removeItem(item.id);
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
    </>
  );
};

export default Cart;
