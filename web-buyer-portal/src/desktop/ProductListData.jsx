import React, { useState, useEffect } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@material-tailwind/react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { useDispatch } from "react-redux";
import { add } from "../store/CartSlice";
import axios from "axios";
const ProductListData = () => {
  const [CartData, setCartData] = useState([]);
  const data = () => {
    axios.get("https://fakestoreapi.com/products").then((resp) => {
      console.log(resp.data);
      setCartData(resp.data);
    });
  };
  useEffect(() => {
    data();
  }, []);
  const dispatch = useDispatch();
  const addCart = (item) => {
    dispatch(add(item));
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-8 grid-rows-3	">
        {CartData.map((item, index) => {
          return (
            <div className="">
              <div className=" relative">
                <div className="w-[30px] h-[30px] rounded-full bg-[#fff] absolute top-[15px] right-[15px] flex justify-center items-center">
                  <FavoriteBorderIcon style={{ fill: "#2B4447" }} />
                </div>
                <img src="./assets/product.png" alt="" />
              </div>
              <h4 className="text-lg font-semibold mt-3">
                Write Product Full Name
              </h4>
              <p className="text-base font-medium text-[#637381] mt-2">
                Brand name
              </p>
              <p className="text-base font-medium text-[#2B4447] mt-2">
                12 bottle case (750ml)
              </p>
              <h4 className="text-base font-semibold text-[#2B4447] mt-1">
                Price: ${item.price}
              </h4>
              <div className="flex justify-between items-center mt-2 ">
                <div className="border border-[#E7E7E7] py-[6px] px-[12px] rounded-md flex justify-center items-center gap-3">
                  <p className="text-[#637381] ">-</p>
                  <p className="text-[#637381]"> 1</p>
                  <p className="text-[#637381]">+</p>
                </div>
                <button
                  className=" bg-[#563FE3] rounded-md py-[6px] px-[12px] text-sm font-medium text-white flex justify-center items-center gap-2"
                  onClick={() => {
                    addCart(item);
                  }}
                >
                  {" "}
                  <ShoppingBasketIcon style={{ fill: "#fff" }} />
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center py-20">
        <Button
          variant="outlined"
          size="sm"
          className="py-[8px] px-[18px]  border border-[#E7E7E7]"
        >
          <ArrowBackSharpIcon style={{ marginRight: "10px" }} />
          Previous
        </Button>

        <ul className="flex gap-2 justify-center ">
          <li className="w-[36px] h-[36px] rounded-md flex justify-center items-center hover:bg-[#F8FAFC]">
            1{" "}
          </li>
          <li className="w-[36px] h-[36px] rounded-md flex justify-center items-center hover:bg-[#F8FAFC]">
            2
          </li>
          <li className="w-[36px] h-[36px] rounded-md flex justify-center items-center hover:bg-[#F8FAFC]">
            3
          </li>
          <li className="w-[36px] h-[36px] rounded-md flex justify-center items-center hover:bg-[#F8FAFC]">
            4
          </li>
          <li className="w-[36px] h-[36px] rounded-md flex justify-center items-center hover:bg-[#F8FAFC]">
            5
          </li>
        </ul>

        <Button
          variant="outlined"
          size="sm"
          className="py-[8px] px-[18px]  border border-[#E7E7E7]"
        >
          Next <ArrowForwardSharpIcon style={{ marginLeft: "10px" }} />
        </Button>
      </div>
    </>
  );
};

export default ProductListData;
