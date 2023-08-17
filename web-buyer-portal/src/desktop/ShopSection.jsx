import React, { useEffect, useRef } from "react";
import Carousel from "better-react-carousel";

function ShopSection() {
  return (
    <>
      <div className="shop-section xl:bg-[#F8FAFC] md:bg-[#F8FAFC] bg-unset">
        <div className="md:w-4/5	w-full mx-auto">
          <h2 className="text-center font-bold text-[#212B36] text-3xl	py-10 hidden sm:block xl:block md:block">
            Shop the range
          </h2>
         <h6 className="block sm:hidden xl:hidden md:hidden my-5 mx-3 text-[16px] font-[500]">Styles</h6>
          <div className="carousel-container">
          <Carousel
            cols={6}
            rows={1}
            gap={10}
            mobileBreakpoint={0}
            arrowLeft
            loop
            scrollSnap={true}
             className="carousel"
             autoplay= {3000}
          >
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] sm:font-semibold md:text-lg text-center text-sm font-medium ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="">
                <img width="100%" src="/assets/shop.png" />
                <div className="mt-3">
                  <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                    Red
                  </h2>
                  <p className="text-[#637381] text-center text-sm md:block hidden">
                    X products
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
          </div>
          <div className="text-center py-10  hidden sm:block xl:block md:block">
            <div className="py-3	px-7	rounded-md	 bg-[#563FE3] w-fit mx-auto">
              <h6 className="font-semibold text-white text-center text-base">
                Explore all products
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopSection;



