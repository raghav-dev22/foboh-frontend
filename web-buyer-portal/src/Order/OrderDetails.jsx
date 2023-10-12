import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateQuantity } from "../slices/CartSlice";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Instruction from "../Svg/Instruction";
import { Popover, Steps } from "antd";
import InvoiceModal from "../modal/InvoiceModal";
import { useParams } from "react-router-dom";
import { message } from "antd";

const OrderDetails = () => {
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const [totalCost, setTotleCost] = useState(0);
  const [showPreview, setshowPreview] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const CARTdata = useSelector((items) => items.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  const removeItem = (cartItem) => {
    dispatch(remove(cartItem));
  };

  const handleIncrementDecrement = (id, actionType) => {
    dispatch(updateQuantity({ id, actionType }));
  };

  const calculateTotalCost = () => {
    let total = 0;
    CARTdata.forEach((item) => {
      const productPrice = item?.product?.price;
      const productPriceINR = productPrice;
      const quantity = parseInt(item.quantity);
      total += productPriceINR * quantity;

      console.log("hdgfj", total);
    });
    return total;
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  useEffect(() => {
    const newTotal = calculateTotalCost();
    setTotleCost(newTotal.toFixed(2));
    console.log("Total Cost:", totalCost);
  }, [CARTdata]);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  useEffect(() => {
    const apiUrl = `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getOrderHistoryByOrderId?OrderId=${id}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data[0], "setOrderDetails------>");
        setOrderDetails(data.data[0]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const reOrder = (id) => {
    const apiUrl = `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/ReOrder?OrderId=${id}`;
    fetch(apiUrl)
      .then((data) => {
        if (data.success) {
          success();
        } else {
          warning();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <>
      {contextHolder}
      <div className="md:w-4/5	w-full  p-6  mx-auto md:p-0 ">
        <InvoiceModal show={showPreview} setShow={setshowPreview} />
        <div className="grid sm:grid-cols-2 grid-cols-1 justify-between items-center mb-6 sm:gap-0 gap-3 ">
          <h1 className="md:text-[30px] text-[25px] font-semibold text-[#2B4447] ">
            Order {orderDetails.orderId}
          </h1>
          <div className="flex sm:justify-end justify-start items-center gap-3">
            <button
              onClick={() => reOrder(id)}
              type="button"
              className="text-base text-white py-[11px] px-[25px] font-semibold bg-[#2B4447] rounded-md"
            >
              Reorder
            </button>
            <Button
              icon={<PoweroffOutlined />}
              loading={loadings[1]}
              // onClick={() => enterLoading(1)}
              onClick={() => {
                setshowPreview(true);
              }}
              className=" h-full text-base text-white py-[11px] px-[25px] font-semibold bg-[#2B4447] rounded-md"
            >
              Download Invoice
            </Button>
          </div>
        </div>

        <div className="bg-[#F8F8F8] rounded-[10px] p-5 ">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-0 gap-3 justify-between">
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Delivery Address
              </h5>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                456 King Street, Newton, NSW
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                2304 Australia
              </p>
              <div className="flex gap-2 items-center">
                <Instruction />
                <p className="text-base font-normal text-[#637381]  leading-7	">
                  Instruction
                </p>
              </div>
            </div>
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Contact
              </h5>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                Full Name
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails.orderByEmailID}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                0400 000 000
              </p>
            </div>
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Order Date
              </h5>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                19/11/2023
              </p>
            </div>
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Status
              </h5>
              <p className="text-base font-medium  text-[#637381] leading-7 bg-[#C9C9C9]	px-3 rounded-md">
                {orderDetails.orderStatus}
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="mb-5">
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Order Tracking ID - 012345678910
            </h5>
          </div>
          <Steps
            current={1}
            progressDot={customDot}
            items={[
              {
                title: "Order Placedd",
              },
              {
                title: "Pending",
              },
              {
                title: "Processing",
              },
              {
                title: "Shipped",
              },
              {
                title: "Delivered",
              },
            ]}
          />
        </div>
        <div className="my-3">
          {CARTdata.length === 0 ? (
            <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
              Your cart is empty.
            </h5>
          ) : (
            <>
              {" "}
              {CARTdata.map((item, index) => (
                <div className="flex justify-center items-center gap-3  pb-4 border-b border-b-[#E7E7E7] mb-4">
                  <div className="w-[150px] rounded-md h-[100px] bg-[#c3c3c3]">
                    <img
                      src={item.product?.productImageUrls}
                      alt=""
                      className="w-[150px]  object-cover	rounded-md"
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-10 h-full py-3 w-full">
                    <div>
                      <div className="flex justify-between w-full gap-3">
                        <div className="">
                          <h4 className=" text-base font-semibold text-[#2B4447]">
                            {item.product?.title}
                          </h4>
                          <p className="text-sm text-[#637381] font-medium ">
                            12 x 750ml
                          </p>
                        </div>
                        <p className="text-sm font-medium text-[#2B4447]">
                          Quantity - {item?.quantity}
                        </p>
                        <h4 className=" text-base text-[#2B4447] font-semibold">
                          {item.product?.buyPrice}
                        </h4>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <p className="text-sm font-normal text-[#637381]">
                          Delivery By 14 August
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 justify-between gap-6">
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
                  Credit card ending with 3259
                </h5>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Payment Status - <span className="font-medium">Paid </span>
            </h5>
          </div>
          <div className="border  h-[200px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 mb-4 w-full">
            <div className="">
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">Subtotal</h5>
                <h5 className="text-sm font-medium text-[#2B4447]">
                  ${totalCost}
                </h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">
                  Shipping estimate
                </h5>
                <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">
                  Tax estimate
                </h5>
                <h5 className="text-sm font-medium text-[#2B4447]">$60.00</h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-base font-semibold text-[#2B4447]">
                  Order total
                </h5>
                <h5 className="text-base font-semibold text-[#2B4447]">
                  $60.00
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
