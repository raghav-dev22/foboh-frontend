import React, { useEffect, useState } from "react";
import Carousel from "better-react-carousel";
import axios from "axios";
import swal from "sweetalert";
function TopRatedSection({ count, setCount, setAddData, addData }) {
  const [CartData, setCartData] = useState([]);
  const data = () => {
    axios.get("https://fakestoreapi.com/products").then((resp) => {
      console.log(resp.data);
      setCartData(resp.data);
    });
  };
  console.log(CartData, "CartDataCartData");

  const [addItem, setAddItem] = useState([]);
  const addCart = (item) => {
    // if (CartData.includes(item)) {
    //   swal("this item is already in cart");
    // } else {
    //   console.log(false);
    //   setAddData([...addItem, item]);
    //   setCount(count + 1);
    // }
    setAddData([...addItem, item]);
    setCount(count + 1);
  };
  useEffect(() => {
    data();
    setAddItem(addData);
  }, [addData]);
  return (
    <>
      <div className="top-rated-section md:w-4/5	w-full mx-auto ">
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
          {/* { base: 2, sm: 2, md: 3, xl: 4 } */}

          {CartData.map((item, index) => {
            return (
              <Carousel.Item>
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
