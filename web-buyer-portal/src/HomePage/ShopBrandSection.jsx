import React, { useEffect, useState } from "react";
import axios from "axios";
import { theme } from "antd";
function ShopBrandSection() {
  const { useToken } = theme;
  const { token } = useToken();
  const [BrandData, setBrandData] = useState([]);

  useEffect(() => {
    const buyer = JSON.parse(localStorage.getItem("buyerInfo"));

    fetch(
      `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getAllByBrands?OrganisationId=${buyer?.organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBrandData(data.data);
        console.log(data, "brand2");
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(BrandData, "brand");

  return (
    <>
      <div className="Shop-brands-section bg-[#F4F7FF] md:p-0 p-6">
        <h2 className="text-center font-bold text-[#212B36] text-3xl py-10 hidden  xl:block md:block">
          Shop by brands
        </h2>
        <div className="relative">
          <h2 className="text-left  block xl:hidden md:hidden xl:mx-0 md:mx-0 mx-3 xl:font-bold md:font-bold font-[500] text-[#212B36] xl:text-3xl md:text-3xl text-[16px]	xl:py-10 md:py-10 py-7">
            Brands
          </h2>
          <a
            href=""
            className="absolute top-[27px] right-0  block xl:hidden md:hidden mx-3 font-[500] text-[#3669C9] text-[12px] border-b border-[#3669C9]"
          >
            view all
          </a>
        </div>
        <div className="grid grid-rows-2	md:grid-cols-3	 sm:grid-cols-2  md:w-4/5	w-full mx-auto md:p-0 px-6 gap-8">
          {BrandData.map((item, index) => {
            return (
              <div className="rounded-lg	shadow-md	bg-white w-full py-12">
                <h4 className="text-[#212B36] font-bold text-xl	text-center">
                  {item.brand}
                </h4>
              </div>
            );
          })}
        </div>
        <div className="text-center py-10">
          <div
            style={{ background: token.buttonThemeColor }}
            className="py-3	px-7	rounded-md	 bg-[#563FE3] w-fit mx-auto hidden xl:block md:block"
          >
            <h6 className="font-semibold text-white text-center text-base">
              Explore all products
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopBrandSection;
