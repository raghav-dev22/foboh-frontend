import React, { useEffect, useState } from "react";
import Carousel from "better-react-carousel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, setCart } from "../slices/CartSlice";
import {
  theme,
  Select,
  Space,
  Skeleton,
  Pagination,
  Slider,
  message,
} from "antd";

function TopRatedSection() {
  const [CartData, setCartData] = useState([]);
  const { useToken } = theme;
  const { token } = useToken();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const url = process.env.REACT_APP_PRODUCTS_URL;

  const catalogueId = localStorage.getItem("catalogueId");

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Product added successfully!",
    });
  };

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

  const addCart = (id, itemData, actionType) => {
    const data = itemData;
    const quantity = itemData?.minimumOrder;
    const availableQty = itemData.availableQty;

    const { buyerId, organisationId } = JSON.parse(
      localStorage.getItem("buyerInfo")
    );

    if (quantity <= availableQty) {
      fetch(`${url}/api/Product/AddToCart`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          buyerId: buyerId,
          productId: data?.productId,
          title: data?.title,
          description: data?.description,
          articleId: data?.articleID,
          skUcode: data?.skUcode,
          productImageUrls: data?.productImageUrls,
          unitofMeasure: data?.unitofMeasure,
          innerUnitofMeasure: data?.innerUnitofMeasure,
          configuration: data?.configuration,
          award: data?.award,
          brand: data?.brand,
          departmentId: data?.departmentId,
          categoryId: data?.categoryId,
          subCategoryId: data?.subCategoryId ? data?.subCategoryId : "",
          segmentId: data?.segmentId,
          variety: [],
          vintage: data?.vintage,
          abv: data?.abv,
          globalPrice: data?.globalPrice,
          luCcost: data?.luCcost,
          buyPrice: data?.buyPrice,
          gstFlag: true,
          wetFlag: true,
          trackInventory: true,
          region: data?.region ? data?.region : "",
          availableQty: data?.availableQty,
          quantity: quantity,
          stockThreshold: data?.stockThreshold,
          stockStatus: data?.stockStatus,
          regionAvailability: data?.regionAvailability,
          productStatus: data?.productStatus,
          visibility: data?.visibility,
          minimumOrder: data?.minimumOrder,
          tags: data?.tags,
          countryOfOrigin: data?.countryOfOrigin || "",
          barcodes: data?.barcodes,
          esgStatus: data?.esgStatus,
          healthRating: data?.healthRating,
          organisationId: organisationId,
          isActive: true,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            success();
            const cartId = data.data[0].cartId;
            const updatedCartList = data?.data.map((item) => {
              return {
                product: item,
                quantity: item?.quantity,
              };
            });
            dispatch(setCart(updatedCartList));
            localStorage.setItem("cartId", cartId);
          } else {
            warning(data.message);
          }
        });
    } else {
      warning(`Please add product below available quantity ${availableQty}`);
    }
  };

  return (
    <>
      {contextHolder}
      <style>
        {`
      .top-rated-section .dZkckO:hover,.top-rated-section .bBfHpH:hover {
        background:${token.commonThemeColor} !important;
      }
      `}
      </style>
      <div className="top-rated-section md:w-4/5  w-full mx-auto md:p-0 px-6  ">
        <div className="relative">
          <h2 className="text-left xl:text-center md:text-center xl:mx-0 md:mx-0 mx-3 xl:font-bold md:font-bold font-[500] text-[#212B36] xl:text-3xl md:text-3xl text-[16px] xl:py-10 md:py-10 py-7">
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
                    {item?.productImageUrls?.length > 0 ? (
                      <img
                        className="w-full object-contain h-[250px] "
                        src={item?.productImageUrls[0]}
                        alt="productImage"
                      />
                    ) : (
                      <img
                        className="w-full object-cover h-[250px] "
                        src="/assets/top-rated.png"
                        alt="top-rated"
                      />
                    )}
                    {item?.tags?.some((i) => i === "Promo") && (
                      <div className="absolute top-[15px] right-[15px]">
                        <div className="rounded-[4px] py-[3px] px-[15px] bg-[#DC2626]">
                          <p className="text-white font-bold text-center">
                            Promo
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col justify-between lg:p-8 p-3 h-[240px]">
                    <div className=" ">
                      <h2 className="text-[#000] md:font-semibold font-medium md:text-lg text-center text-sm">
                        {item.title}
                      </h2>
                      <h2 className="text-[#000] mt-1 md:font-semibold font-medium md:text-lg text-center text-sm">
                        ${item?.globalPrice}
                      </h2>
                    </div>
                    <div
                      className="py-3 lg:px-7 px-3  rounded-md   bg-[#563FE3] w-fit mx-auto cursor-pointer"
                      style={{ background: token.buttonThemeColor }}
                      onClick={() => {
                        addCart(item?.productId, item, "increment");
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
