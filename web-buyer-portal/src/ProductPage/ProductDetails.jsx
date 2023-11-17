import React, { useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { theme } from "antd";
import { add, setCart, updateQuantity } from "../slices/CartSlice";
import { message } from "antd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { stockStatus } from "../helpers/getStockStatus";
const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.product);
  const { useToken } = theme;
  const { token } = useToken();
  const [selectData, setSelectData] = useState({
    product: {},
    quantity: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const url = process.env.REACT_APP_PRODUCTS_URL;
  const productData = products.find((item) => item?.product?.productId === +id);
  const dispatch = useDispatch();
  let selectedpic = "";

  // const addCart = (product) => {
  //   dispatch(add(product));
  // };
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    `${selectData?.product?.productImageUrls}`,
    `${selectData?.product?.productImageUrls}`,
    `${selectData?.product?.productImageUrls}`,
    // Add more image URLs here
  ];

  console.log(images[0], "selceted image");

  console.log(selectData, "selectData------------------------->");
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };
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
    const { organisationId } = JSON.parse(localStorage.getItem("buyerInfo"));

    fetch(
      `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getByProductId?ProductId=${id}&OrganisationId=${organisationId}`,
      {
        method: "GET",
        // body: JSON.stringify({ organisationId }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("product detail", data);
        setSelectedImage(data?.data[0]?.productImageUrls[0]);
        setSelectData({
          product: data.data[0],
          quantity: 1,
        });
        console.log(data.data[0], " slectedsproductsdata");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const addCart = (id, itemData, actionType) => {
    const data = itemData.product;
    const quantity = itemData.quantity;
    console.log(quantity, "quantity");
    const { buyerId, organisationId } = JSON.parse(
      localStorage.getItem("buyerInfo")
    );
    console.log("id", id, "item", data, "actionType", actionType);

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
        subCategoryId: data?.subCategoryId,
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
        region: "",
        availableQty: data?.availableQty,
        quantity: quantity,
        stockThreshold: data?.stockThreshold,
        stockStatus: data?.stockStatus,
        regionAvailability: data?.regionAvailability,
        productStatus: data?.productStatus,
        visibility: data?.visibility,
        minimumOrder: data?.minimumOrder,
        tags: data?.tags,
        countryOfOrigin: data?.countryOfOrigin,
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
          console.log(data, "add data");
        } else {
          warning(data.message);
        }
      });
  };

  const handleIncrementDecrement = (id, actionType) => {
    if (actionType === "decrement" && selectData.quantity > 0) {
      setSelectData({
        ...selectData,
        quantity: selectData.quantity - 1,
      });
    } else if (actionType === "increment") {
      setSelectData({
        ...selectData,
        quantity: selectData.quantity + 1,
      });
    }
  };

  return (
    <>
      {contextHolder}
      {/* <Header /> */}
      <div className="md:w-[85%] w-full mx-auto md:px-0 px-6">
        <div className="flex md:flex-nowrap flex-wrap gap-8">
          <div className="w-full md:w-2/5	 h-full	">
            <div className="grid gap-5 md:grid-cols-1 grid-cols-2">
              {selectedImage && (
                <div className=" rounded-md flex justify-center relative h-[225px]">
                  {/* <div className="absolute top-[10px] right-[10px] bg-white rounded-full h-[30px] w-[30px] flex justify-center items-center">
                    <FavoriteBorderRoundedIcon className="" />
                  </div> */}
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className=" h-[225px] object-contain w-full"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
                {selectData?.product?.productImageUrls?.map((image, index) => (
                  <div className=" rounded-md h-[99px] flex justify-center  relative">
                    {/* <div className="absolute top-[5px] right-[5px] bg-white rounded-full h-[20px] w-[20px] flex justify-center items-center">
                      <FavoriteBorderRoundedIcon
                        className=""
                        style={{ width: "10px" }}
                      />
                    </div> */}

                    <img
                      key={index}
                      src={image}
                      onClick={() => handleImageClick(image)}
                      className=" h-[99px] object-contain w-full rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div></div>
            </div>
          </div>
          <div className=" md:w-3/5 w-full   h-full	 grid gap-1	  px-4 pt-4 pb-12">
            <h1 className="text-[28px] text-[#2B4447] font-bold">
              {selectData?.product?.title}
            </h1>
            <h5 className="text-lg font-medium text-[#637381]">
              {selectData?.product?.brand}
            </h5>
            <div className="flex  items-center gap-2">
              <h5 className="text-lg font-medium text-[#2B4447]">
                {selectData?.product?.configuration}
              </h5>
            </div>
            <div className="flex items-center gap-3">
              <h5 className="text-lg font-semibold">
                ${selectData?.product?.globalPrice}.00
              </h5>
            </div>
            <div className="py-3">
              <p className="text-sm font-normal text-[#637381] leading-[25px]">
                {selectData?.product?.description}
              </p>
            </div>
            <div className="flex  justify-between md:w-[365px] w-full items-center py-2  mt-2">
              <div className="relative">
                <div className="border border-[#E7E7E7] py-[10px] px-[24px] rounded-md flex justify-center items-center gap-3">
                  <p
                    className="text-[#637381] cursor-pointer"
                    onClick={() =>
                      handleIncrementDecrement(
                        selectData?.product?.productId,
                        "decrement"
                      )
                    }
                  >
                    -
                  </p>
                  <p className="text-[#637381]"> {selectData?.quantity} </p>
                  <p
                    className="text-[#637381] cursor-pointer"
                    onClick={() =>
                      handleIncrementDecrement(
                        selectData?.product?.productId,
                        "increment"
                      )
                    }
                  >
                    +
                  </p>
                </div>
                <p className="text-sm font-medium text-[#2B4447] absolute top-[-10px] left-[11px] bg-white">
                  Quantity
                </p>
              </div>
              <button
                style={{ backgroundColor: token.buttonThemeColor }}
                className=" bg-[#563FE3] rounded-md py-[10px] px-[28px] text-sm font-medium text-white flex justify-center items-center gap-2"
                onClick={() => {
                  if (selectData?.quantity > 0) {
                    addCart(
                      selectData?.product?.productId,
                      selectData,
                      "increment"
                    );
                  }
                }}
                disabled={selectData?.quantity <= 0}
              >
                {" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_128_2591)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.6641 15.1105H4.48791C2.21924 15.1105 0.478794 14.2912 0.973161 10.9931L1.5488 6.52349C1.85354 4.87785 2.90323 4.24805 3.82425 4.24805H11.3549C12.2895 4.24805 13.2782 4.92526 13.6304 6.52349L14.2059 10.9931C14.6258 13.9187 12.9329 15.1105 10.6641 15.1105Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.7659 4.08516C10.7659 2.31981 9.33475 0.8887 7.56937 0.8887C6.71927 0.885107 5.90276 1.22028 5.30038 1.82012C4.698 2.41996 4.35937 3.23506 4.35938 4.08516"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.76376 7.41846H9.72998"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.44988 7.41846H5.41602"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_128_2591">
                      <rect width="15.1111" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Add To Cart
              </button>
            </div>
            <div className="mt-2">
              <h5 className="text-base font-medium text-[#2B4447]">
                Minimum Order Quantity:
                {selectData?.product?.minimumOrder} Case
              </h5>
            </div>
            <div className="my-6">
              {stockStatus(
                selectData?.product?.availableQty,
                selectData?.product?.stockThreshold
              )}
            </div>
            {selectData.product.categoryId === "C5000" && (
              <div className="flex justify-between items-center md:w-[365px] w-full pt-3">
                <div>
                  <div className="">
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Country:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Segment:
                    </p>
                  </div>
                  <div className="">
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Vintage:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Awards:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Region:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      ABV:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Grape variety:
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product?.countryOfOrigin}
                    </p>
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product?.segmentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product?.vintage}
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product.award}
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product.region}
                    </p>
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product.abv}
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      {selectData?.product.variety}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {selectData.product.categoryId === "C6000" && (
              <div className="flex justify-between items-center md:w-[365px] w-full ">
                <div>
                  <div className="">
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Country:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Segment:
                    </p>
                  </div>
                  <div className="">
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Vintage:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Awards:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Region:
                    </p>
                    <p className="text-base font-normal text-[#2B4447] py-2">
                      Grape variety:
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Country
                    </p>
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Segment
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Vintage name
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Awards
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Region name
                    </p>

                    <p className="text-base font-semibold text-[#2B4447] py-2">
                      Grape variety
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
