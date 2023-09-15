import React, { useEffect, useRef, useState } from "react";
import Carousel from "better-react-carousel";
import { Range } from "../data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShopSection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = 'https://product-fobohwepapi-fbh.azurewebsites.net/api/product/GetAll';
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const limitedProducts = (data.data).slice(0, 8);
        setProducts(limitedProducts);
        console.log(data.data, "products data")
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
 
  
  return (
    <>
      <div className="shop-section xl:bg-[#F8FAFC] md:bg-[#F8FAFC] bg-unset">
        <div className="md:w-4/5	w-full mx-auto md:p-0 px-6 ">
          <h2 className="text-center font-bold text-[#212B36] text-3xl	py-10 hidden sm:block xl:block md:block">
            Shop the range
          </h2>
          <h6 className="block sm:hidden xl:hidden md:hidden my-5 mx-3 text-[16px] font-[500]">
            Styles
          </h6>
          <div className="carousel-container">
            <Carousel
              cols={4}
              rows={1}
              gap={10}
              mobileBreakpoint={0}
              scrollSnap={true}
              className="carousel"
              autoplay={3000}
            >
              {
                products.map((product) => {
                return (
                  <Carousel.Item>
                    <div className=" ">
                      <img
                        className="md:w-[270px] md:h-[226px] w-full h-full object-cover rounded-md bg-[#000]"
                        src={product.productImageUrls}
                      />
                      <div className="mt-3">
                        <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm  ">
                          {product.title}
                        </h2>
                        <p className="text-[#637381] text-center text-sm md:block hidden">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          <div className="text-center py-10  hidden sm:block xl:block md:block">
            <div
              onClick={() => navigate("/home/product-list")}
              className="py-3	px-7	rounded-md	 bg-[#563FE3] w-fit mx-auto cursor-pointer"
            >
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
