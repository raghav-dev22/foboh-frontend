import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalculations } from "../helper/getCalculations";
import { useLocation, useNavigate } from "react-router-dom";
import { getAddress } from "../helpers/getAddress";
import { getStates } from "../helpers/getStates";
import { getSealedCart } from "../helpers/getSealedCart";

const OrderConfirmation = () => {
  const [totalCost, setTotleCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [wetTax, setWetTax] = useState(0);
  const [gstTax, setGstTax] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const CARTdata = useSelector((items) => items.cart);
  const location = useLocation();
  const [isWine, setIsWine] = useState(false);
  const [calculations, setCalculations] = useState({
    total: 0,
    subTotal: 0,
    gst: 0,
    wet: 0,
  });

  useEffect(() => {
    getDeliveryAddress();
    const handleBeforeUnload = (e) => {
      localStorage.removeItem("orderId");
      localStorage.removeItem("cartId");
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [location]);

  const calculateTotalCost = async () => {
    const orderId = localStorage.getItem("orderId");
    //Handling Cart details of order
    getSealedCart(orderId).then((data) => {
      if (data.success) {
        const { gst, payAmountLong, totalPrice, wt } = data?.data[0];
        setCalculations({
          total: payAmountLong,
          subTotal: totalPrice,
          gst: gst,
          wet: wt,
        });
        data.data.forEach((subCat) => {
          if (
            subCat.subCategoryId === "SC5000" ||
            subCat.subCategoryId === "SC500"
          ) {
            setIsWine(true);
          }
        });

        calculateTotalCost();
      }
    });
  };

  useEffect(() => {
    calculateTotalCost();
  }, [CARTdata]);

  const getDeliveryAddress = () => {
    let statesData = [];

    getStates()
      .then((data) => {
        statesData = data.map((state) => {
          return {
            label: state.stateName,
            value: state.stateId,
          };
        });
      })
      .then(() => {
        getAddress("delivery-address").then((data) => {
          console.log("delivery-address", data);
          console.log("statesData", statesData);

          if (data.success) {
            const buyerData = data?.data[0];
            const buyerState = statesData.find(
              (stateInfo) => stateInfo?.label === buyerData?.state
            );

            const addressBody = {
              Apartment: buyerData?.apartmentSuite,
              Address: buyerData?.streetaddress,
              Suburb: buyerData?.city,
              State: buyerState?.label,
              Postcode: buyerData?.postcode,
              Notes: buyerData?.instructionsNotes,
            };
            setDeliveryAddress(addressBody);
          }
        });
      });
  };

  return (
    <>
      <div className="md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="mt-10">
          <h1 className="text-[30px] font-semibold text-[#2B4447] ">
            We have received your order.
          </h1>
          <p className="text-sm font-normal  text-[#2B4447] mt-8 mb-12">
            Thank you for your order. We are currently in the process of
            handling it. Please be patient, and you can expect to receive a
            confirmation from us shortly!
          </p>
        </div>
        {/* <p className="my-6 font-semibold text-base text-[#563FE3]">
          Order Tracking ID - 012345678910
        </p> */}
        {CARTdata.length === 0 ? (
          <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
            Your cart is empty.
          </h5>
        ) : (
          <>
            {" "}
            {CARTdata.map((item, index) => (
              <div className="flex justify-center items-start gap-3  pb-4 border-b border-b-[#E7E7E7] mb-4">
                <div className="w-[150px] rounded-md h-[100px] bg-[#c3c3c3]">
                  <img
                    src={item?.product?.productImageUrls[0]}
                    alt=""
                    className="w-[150px]  h-[100px] object-cover	rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-center gap-10 h-full  w-full">
                  <div>
                    <div className="flex justify-between w-full gap-3">
                      <div className="">
                        <h4 className=" text-base font-semibold text-[#2B4447]">
                          {item.product?.title}
                        </h4>
                        <p className="text-sm text-[#637381] font-medium ">
                          {item?.product?.configuration}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[#2B4447] w-[150px]">
                        Quantity - {item?.quantity}
                      </p>
                      <h4 className=" text-base text-[#2B4447] font-semibold w-[150px] text-right">
                        ${item?.product?.globalPrice * item.quantity}.00
                      </h4>
                    </div>
                  </div>
                  {/* <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <p className="text-sm font-normal text-[#637381]">
                        Delivery By 14 August
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="py-4">
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">Subtotal</h5>
            <h5 className="text-sm font-medium text-[#2B4447]">
              ${calculations.subTotal}
            </h5>
          </div>
          {/* <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">
              Shipping estimate
            </h5>
            <h5 className="text-sm font-medium text-[#2B4447]">$0</h5>
          </div> */}
          {isWine && (
            <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
              <h5 className="text-sm font-medium text-[#2B4447]">WET</h5>
              <h5 className="text-sm font-medium text-[#2B4447]">
                {" "}
                ${calculations.wet}
              </h5>
            </div>
          )}
          <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
            <h5 className="text-sm font-medium text-[#2B4447]">GST</h5>
            <h5 className="text-sm font-medium text-[#2B4447]">
              {" "}
              ${calculations.gst}
            </h5>
          </div>
          <div className="flex justify-between py-3 ">
            <h5 className="text-base font-semibold text-[#2B4447]">
              Order total
            </h5>
            <h5 className="text-base font-semibold text-[#2B4447]">
              ${calculations.total}
            </h5>
          </div>
        </div>
        <div className="flex justify-between gap-6 pb-6">
          <div className="border h-[200px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 w-full">
            <div className="mb-4">
              <h5 className="text-lg font-semibold text-[#2B4447] mb-1">
                Payment
              </h5>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/visa.png"
                  alt=""
                  className="w-10		 object-contain	"
                />

                <h5 className="text-base font-medium text-[#2B4447] ">
                  Credit card ending with XXXX
                </h5>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Payment Status - <span className="font-medium">Paid </span>
            </h5>
          </div>
          <div className="border  h-[200px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 mb-4 w-full">
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Delivery Address
            </h5>

            <p className="text-base font-normal text-[#2B4447] my-2">
              {deliveryAddress?.Apartment} {deliveryAddress?.Address},{" "}
              {deliveryAddress?.Suburb}, {deliveryAddress?.State}{" "}
              {deliveryAddress?.Postcode}
              <br /> Australia
            </p>
            <p className="my-1 font-normal text-base text-[#637381] flex items-center">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1092_1890"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                >
                  <path d="M20 0H0V20H20V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1092_1890)">
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.56524 3.23223C2.03408 2.76339 2.66996 2.5 3.333 2.5H9.16634C9.62657 2.5 9.99963 2.8731 9.99963 3.33333C9.99963 3.79357 9.62657 4.16667 9.16634 4.16667H3.333C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.333 17.5H14.9996C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1265 10 17.4996 10.3731 17.4996 10.8333V16.6667C17.4996 17.3297 17.2362 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9996 19.1667H3.333C2.66996 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                      fill="#637381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6663 2.39909C16.4185 2.39909 16.1808 2.49754 16.0056 2.67278L8.25216 10.4262L7.81166 12.1882L9.57365 11.7477L17.3271 3.99427C17.5023 3.81903 17.6008 3.58135 17.6008 3.33352C17.6008 3.0857 17.5023 2.84802 17.3271 2.67278C17.1518 2.49754 16.9142 2.39909 16.6663 2.39909ZM14.8271 1.49427C15.3149 1.00647 15.9765 0.732422 16.6663 0.732422C17.3562 0.732422 18.0178 1.00647 18.5056 1.49427C18.9934 1.98207 19.2674 2.64367 19.2674 3.33352C19.2674 4.02338 18.9934 4.68498 18.5056 5.17278L10.5889 13.0894C10.4821 13.1962 10.3483 13.272 10.2018 13.3086L6.86847 14.142C6.58449 14.213 6.28408 14.1298 6.0771 13.9228C5.87012 13.7158 5.78691 13.4154 5.8579 13.1314L6.69124 9.79808C6.72787 9.65155 6.80363 9.51773 6.91043 9.41093L14.8271 1.49427Z"
                      fill="#637381"
                    />
                  </g>
                </g>
              </svg>
              {deliveryAddress.Notes}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
