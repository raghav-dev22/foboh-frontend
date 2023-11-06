import React, { useState } from "react";
import { Table } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import CancelOrderModal from "../../Modal/CancelOrderModal";
import ChangeStatusModal from "../../Modal/ChangeStatusModal";
import OrderDetailHeader from "../orderDetailHeader/OrderDetailHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getOrderDetails,
  getOrderStatusList,
  getTimeline,
  nameShortner,
  orderStatusChange,
  timelineConvert,
} from "../../helpers/orderDetailsHelper";
import { message } from "antd";
import OrderDetailsTimeline from "./OrderDetailsTimeline";
import DeliveryContact from "./DeliveryContact";
import DeliveryAddress from "./DeliveryAddress";
import BillingAddress from "./BillingAddress";
import PaymentDetails from "./PaymentDetails";

const OrderListing = () => {
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [orderAdressDetails, setOrderAdressDetails] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [orderProductsDetails, setOrderProductsDetails] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [shortenName, setShortenName] = useState("");

  const { id } = useParams();

  const columns = [
    {
      title: (
        <h5 className="text-lg font-semibold text-[#2B4447]">Product Detail</h5>
      ),
      dataIndex: "ProductDetail",
      width: 400,
    },
    {
      title: <h5 className="text-lg font-semibold text-[#2B4447]">Quantity</h5>,
      dataIndex: "Quantity",
      width: 150,
    },
    {
      title: <h5 className="text-lg font-semibold text-[#2B4447]">Price</h5>,
      dataIndex: "Price",
      width: 150,
    },
  ];

  // Handling event notifications
  const success = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };
  const error = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };
  const warning = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };

  useEffect(() => {
    // Calling asynchronous function
    asyncFunction();
  }, []);

  //Order status change modal opening
  const confirmOrderStatusChange = async (status) => {
    const orderStatusChangeResponse = await orderStatusChange(
      status,
      orderAdressDetails
    );

    if (orderStatusChangeResponse) {
      setChangeStatusModal(false);
      setCancelOrderModal(false);
      success(`Order status successfully changed to ${status} !`);
      asyncFunction();
    } else {
      setChangeStatusModal(false);
      setCancelOrderModal(false);
      error("Some error has occurred, please try again later!");
    }
  };

  //Order status change modal opening
  const handleOrderStatusChange = (status) => {
    setChangeStatusModal(true);
    setUpdatedOrderStatus(status);
  };

  const handleCancelOrder = (status) => {
    setCancelOrderModal(true);
    setUpdatedOrderStatus(status);
  };

  // Asynchronously fetching data for apis
  const asyncFunction = async () => {
    const orderDetailsResponse = await getOrderDetails(id);

    const timelineResponse = await getTimeline(orderDetailsResponse[0]);
    if (timelineResponse) {
      const updatedTimeline = timelineConvert(timelineResponse);
      setTimeline(updatedTimeline);
    }

    if (orderDetailsResponse) {
      const updatedName = nameShortner(orderDetailsResponse[0]?.customerName);
      setShortenName(updatedName);

      //If order status is New then it will be updated to Pending Order
      if (orderDetailsResponse[0]?.orderStatus === "New") {
        const orderStatusChangeResponse = await orderStatusChange(
          "Pending",
          orderDetailsResponse[0]
        );
        if (orderStatusChangeResponse) {
          success(`Order status successfully changed to Pending !`);
          asyncFunction();
        } else {
          error("Some error has occurred, please try again later!");
        }
      }

      //If order status is Delivered and payment is Paid then order status will be Complete
      if (
        orderDetailsResponse[0]?.orderStatus === "Delivered" &&
        orderDetailsResponse[0]?.transactionStatus === "Paid"
      ) {
        const orderStatusChangeResponse = await orderStatusChange(
          "Complete",
          orderDetailsResponse[0]
        );
        if (orderStatusChangeResponse) {
          success(`Order status successfully changed to Complete !`);
          asyncFunction();
        } else {
          error("Some error has occurred, please try again later!");
        }
      }

      //Setting payment status to useState on loading
      setPaymentStatus(orderDetailsResponse[0]?.transactionStatus);

      //Setting order status to useState on loading
      setOrderStatus(orderDetailsResponse[0]?.orderStatus);

      //Setting order details to useState on loading
      setOrderAdressDetails(orderDetailsResponse[0]);

      //Setting order product details to useState on loading
      setOrderProductsDetails(
        orderDetailsResponse.map((product, idx) => {
          return {
            key: idx,
            ProductDetail: (
              <div className="flex justify-start gap-4">
                <div
                  className="flex items-center justify-center"
                  style={{ width: "65px" }}
                >
                  <img
                    src={
                      product?.productImageUrls.length > 0
                        ? product?.productImageUrls[0]
                        : "/assets/order.png"
                    }
                    alt=""
                    style={{ height: "65px" }}
                  />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    {product?.title}
                  </h5>
                  <p className="font-medium text-lg text-[#637381]">
                    {product?.configuration}
                  </p>
                </div>
              </div>
            ),
            Quantity: (
              <p className="text-lg font-semibold text-[#2B4447]">
                {product?.quantity}
              </p>
            ),
            Price: (
              <p className="text-lg font-semibold text-[#2B4447]">
                ${product?.globalPrice}
              </p>
            ),
          };
        })
      );

      if (
        orderDetailsResponse[0]?.orderStatus === "Processing" ||
        orderDetailsResponse[0]?.orderStatus === "Shipped" ||
        orderDetailsResponse[0]?.orderStatus === "Partially fulfilled"
      ) {
        const status = orderDetailsResponse[0]?.orderStatus;
        const orderStatusListResponse = await getOrderStatusList(status);
        setOrderStatusList(
          orderStatusListResponse.map((item, idx) => {
            return {
              label: item,
              value: idx,
            };
          })
        );
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="padding-top-custom px-7 ">
        <OrderDetailHeader
          success={success}
          error={error}
          warning={warning}
          orderAdressDetails={orderAdressDetails}
          asyncFunction={asyncFunction}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          setOrderStatus={setOrderStatus}
          orderStatus={orderStatus}
          orderStatusList={orderStatusList}
        />
        <div className="flex lg:flex-nowrap flex-wrap   gap-5 ">
          <div className="lg:w-[70%] w-full">
            <div className="bg-white rounded-[8px] custom-shadow">
              <Table
                columns={columns}
                dataSource={orderProductsDetails}
                showSizeChanger={false}
                pagination={false}
                scroll={{
                  y: 240,
                }}
              />
              <div className=" p-4 ">
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">
                    Subtotal
                  </h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    {/* ${totalCost} */}${orderAdressDetails?.totalPrice}
                  </h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">
                    Shipping estimate
                  </h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    ${orderAdressDetails?.shippingcharges}
                  </h5>
                </div>
                {orderAdressDetails?.wt !== 0 && (
                  <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                    <h5 className="text-base font-medium text-[#637381]">
                      WET
                    </h5>
                    <h5 className="text-base font-medium text-[#637381]">
                      ${orderAdressDetails?.wt}
                    </h5>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">GST</h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    ${orderAdressDetails?.gst}
                  </h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    ${orderAdressDetails?.payAmountLong}
                  </h5>
                </div>
                <div className="py-5 flex justify-between ">
                  <button
                    onClick={() => {
                      handleCancelOrder("Cancelled");
                    }}
                    className={`cursor-pointer
                      ${
                        orderAdressDetails.orderStatus !== "Pending"
                          ? "rounded-[6px] py-2 bg-[#ffffff] border text-gray-500  text-base font-semibold w-fit px-6"
                          : "rounded-[6px] py-2 bg-[#DC3545] text-white  text-base font-semibold w-fit px-6"
                      }
                      `}
                    disabled={orderAdressDetails.orderStatus !== "Pending"}
                  >
                    Cancel
                  </button>
                  <div className="flex gap-3 ">
                    {/* <button
                      className="bg-[#F8B02B] py-2 px-6 rounded-[6px] text-white font-semibold text-base"
                    >
                      Request Changes
                    </button> */}
                    <button
                      onClick={() => {
                        handleOrderStatusChange("Processing");
                      }}
                      disabled={orderAdressDetails.orderStatus !== "Pending"}
                      className={`cursor-pointer
                      ${
                        orderAdressDetails.orderStatus !== "Pending"
                          ? "bg-[#ffffff] py-2 px-6 rounded-[6px] border text-gray-500 font-semibold text-base"
                          : "bg-[#147D73] py-2 px-6 rounded-[6px] text-white font-semibold text-base"
                      }
                      `}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <OrderDetailsTimeline
              orderAdressDetails={orderAdressDetails}
              success={success}
              error={error}
              timeline={timeline}
              asyncFunction={asyncFunction}
              shortenName={shortenName}
            />
          </div>
          <div className="lg:w-[30%] w-full">
            <DeliveryContact orderAdressDetails={orderAdressDetails} />
            <DeliveryAddress orderAdressDetails={orderAdressDetails} />
            <BillingAddress orderAdressDetails={orderAdressDetails} />
            <PaymentDetails orderAdressDetails={orderAdressDetails} />
          </div>
        </div>
      </div>
      <CancelOrderModal
        handleCancel={() => {
          setCancelOrderModal(false);
        }}
        isModalOpen={cancelOrderModal}
        handleOk={() => {
          confirmOrderStatusChange(updatedOrderStatus);
        }}
        closeIcon={false}
      />
      <ChangeStatusModal
        orderStatus={orderStatus}
        updatedOrderStatus={updatedOrderStatus}
        handleCancel={() => {
          setChangeStatusModal(false);
        }}
        isModalOpen={changeStatusModal}
        handleOk={() => confirmOrderStatusChange(updatedOrderStatus)}
        closeIcon={false}
      />
    </>
  );
};

export default OrderListing;
