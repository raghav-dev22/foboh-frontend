import React, { useEffect, useState } from "react";
import Carousel from "better-react-carousel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/CartSlice";
import { theme } from "antd";

function TopRatedSection() {
  const [CartData, setCartData] = useState([]);
  const { useToken } = theme;
  const { token } = useToken();
  const dispatch = useDispatch();
  const addCart = (item) => {
    dispatch(add(item));
  };
  const catalogueId = localStorage.getItem("catalogueId");

  useEffect(() => {
    const topRated = "Top rated";
    const apiUrl = `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/GetTopratedTag?TopRatedtags=${topRated}&page=1&CatalogueId=${catalogueId}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setCartData(data.data);
        } else {
          setCartData([]);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  return (
    <>
      <style>
        {`
      .top-rated-section .dZkckO:hover,.top-rated-section .bBfHpH:hover {
        background:${token.commonThemeColor} !important;
      }
      `}
      </style>
      <div className="top-rated-section md:w-4/5	w-full mx-auto md:p-0 px-6  ">
        <div className="relative">
          <h2 className="text-left xl:text-center md:text-center xl:mx-0 md:mx-0 mx-3 xl:font-bold md:font-bold font-[500] text-[#212B36] xl:text-3xl md:text-3xl text-[16px]	xl:py-10 md:py-10 py-7">
            Top rated
          </h2>
          <a
            href=""
            className="absolute top-[27px] right-0 xl block xl:hidden md:hidden mx-3 font-[500] text-[#3669C9] text-[12px] border-b border-[#3669C9]"
          >
            view all
          </a>
        </div>

        <Carousel cols={4} rows={1} gap={10} mobileBreakpoint={575} loop>
          {CartData.map((item, idx) => {
            return (
              <Carousel.Item key={`${idx}`}>
                <div className="border border-inherit rounded-lg">
                  <div className="relative">
                    <img
                      className="w-full object-cover	"
                      src="/assets/top-rated.png"
                    />
                    <div className="absolute top-[15px] right-[15px]">
                      <div className="rounded-[4px] py-[3px] px-[15px] bg-[#DC2626]">
                        <p className="text-white font-bold text-center">
                          Promo
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col justify-between lg:p-8 p-3 h-[240px]">
                    <div className=" ">
                      <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm">
                        Product name 123
                      </h2>
                      <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm">
                        ${item.price}
                      </h2>
                    </div>
                    <div
                      className="py-3	lg:px-7 px-3	rounded-md	 bg-[#563FE3] w-fit mx-auto cursor-pointer"
                      style={{ background: token.buttonThemeColor }}
                      onClick={() => {
                        addCart(item);
                      }}
                    >
                      <h6 className="font-semibold text-white text-center md:text-base text-sm">
                        Add to Cart
                      </h6>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
export default TopRatedSection;
