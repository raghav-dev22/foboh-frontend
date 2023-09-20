import React, { useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import { listdata } from "../data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/CartSlice";
// import { increment, decrement } from "../slices/counterSlice";
import { setProductData } from "../slices/ProductSlice";
import { useEffect } from "react";


const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.product);
  const [selectData, setSelectData] = useState({
    product: {},
    quantity: 1,
  });
  const productData = products.find((item) => item?.product?.productId === +id);
  // for add to card redux
  const dispatch = useDispatch();
  const addCart = (product) => {
    dispatch(add(product));
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    `${selectData?.product?.productImageUrls}`,
    `${selectData?.product?.productImageUrls}`,
    `${selectData?.product?.productImageUrls}`,
    // Add more image URLs here
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const apiUrl = `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getByProductId?ProductId=${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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

 
  const handleIncrementDecrement = (id, actionType) => {
  
        if (actionType === "decrement" && selectData.quantity > 0) {
          setSelectData(
            {
              ...selectData,
              quantity: selectData.quantity - 1,
            }
          ) 
        } else if (actionType === "increment") {
          setSelectData(
            {
              ...selectData,
              quantity: selectData.quantity + 1,
            }
          )
        }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="md:w-[85%] w-full mx-auto md:px-0 px-6">
        <div className="flex md:flex-nowrap flex-wrap gap-8">
          <div className="w-full md:w-2/5	 h-full	">
            <div className="grid gap-5 md:grid-cols-1 grid-cols-2">
              {selectedImage && (
                <div className="bg-[#C4C4C4] rounded-md">
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="mix-blend-multiply"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
                {images.map((image, index) => (
                  <div className="bg-[#C4C4C4] rounded-md">
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      onClick={() => handleImageClick(image)}
                      className="mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
              <div>
                {/* <div className="image-container">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div> */}
                {/* {selectedImage && (
                  <div className="image-preview">
                    <button onClick={handleClosePreview}>Close</button>
                    <img src={selectedImage} alt="Selected Image" />
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className=" md:w-3/5 w-full   h-full	 grid gap-1	  p-4">
            <h1 className="text-[28px] text-[#2B4447] font-bold">
              {" "}
              {selectData?.product?.title}
            </h1>
            <h5 className="text-lg font-medium text-[#637381]">
              {selectData?.product?.brand}
            </h5>
            <div className="flex  items-center gap-2">
              {/* <h5 className="text-lg font-medium text-[#2B4447]">
                {selectData?.product?.description}{" "}s
              </h5> */}
              <h5 className="text-lg font-medium text-[#2B4447]">*</h5>
              <h5 className="text-lg font-medium text-[#2B4447]">
                {selectData?.product?.configuration}{" "}
              </h5>
            </div>
            <div className="flex items-center gap-3">
              <h5 className="text-[#DC3545] text-lg font-medium">25% off</h5>
              <h5 className="text-lg font-semibold">
                {selectData?.product?.price}
              </h5>
            </div>
            <div className="py-3">
              <p className="text-sm font-normal text-[#637381] leading-[25px]">
                {selectData?.product?.description}
              </p>
            </div>
            <div className="flex  justify-between md:w-[365px] w-full items-center py-2 ">
              <div className="border border-[#E7E7E7] py-[10px] px-[20px] rounded-md flex justify-center items-center gap-3">
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
              <button
                className=" bg-[#563FE3] rounded-md py-[10px] px-[28px] text-sm font-medium text-white flex justify-center items-center gap-2"
                onClick={() => {
                  addCart(selectData);
                }}
              >
                {" "}
                <ShoppingBasketIcon style={{ fill: "#fff" }} />
                Add To Cart
              </button>
            </div>
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
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      {/* <BottomToTop /> */}
    </>
  );
};

export default ProductDetails;
