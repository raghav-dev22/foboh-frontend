import React, { useState } from "react";
import { Space, Table, Tag, Checkbox, Divider, Steps } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Button, Modal } from "antd";
import PaymentStatusModal from "../../Modal/PaymentStatusModal";
import CancelOrderModal from "../../Modal/CancelOrderModal";
import ChangeStatusModal from "../../Modal/ChangeStatusModal";
import OrderDetailHeader from "../orderDetailHeader/OrderDetailHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderDetails } from "../../helpers/orderDetailsHelper";

const OrderListing = () => {
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [orderAdressDetails, setOrderAdressDetails] = useState({});
  const [orderProductsDetails, setOrderProductsDetails] = useState([]);
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

  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i,
      ProductDetail: (
        <div className="flex justify-start gap-4">
          <img src="/assets/order.png" alt="" />
          <div>
            <h5 className="text-lg font-semibold text-[#2B4447]">
              Write Product Full Name
            </h5>
            <p className="font-medium text-lg text-[#637381]">12 x 750ml</p>
          </div>
        </div>
      ),
      Quantity: <p className="text-lg font-semibold text-[#2B4447]">1</p>,
      Price: <p className="text-lg font-semibold text-[#2B4447]">$369.00</p>,
    });
  }

  useEffect(() => {
    // Calling asynchronous function 
    asyncFunction();
  }, []);

  // Asynchronously fetching data for apis
  const asyncFunction = async () => {
    const orderDetailsResponse = await getOrderDetails();

    if(orderDetailsResponse){
      setOrderAdressDetails(orderDetailsResponse[0])
      setOrderProductsDetails(orderDetailsResponse)
    }

  };

  return (
    <>
      <div className="padding-top-custom px-7 ">
        <OrderDetailHeader orderAdressDetails={orderAdressDetails} />
        <div className="flex lg:flex-nowrap flex-wrap   gap-5 ">
          <div className="lg:col-span-4 w-full">
            <div className="bg-white rounded-[8px] custom-shadow">
              <Table
                columns={columns}
                dataSource={data}
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
                    {/* ${totalCost} */}
                    $1280.00
                  </h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">
                    Shipping estimate
                  </h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    $60.00
                  </h5>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">
                    Tax estimate
                  </h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    $60.00
                  </h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    $60.00
                  </h5>
                </div>
                <div className="py-5 flex justify-between ">
                  <button
                    onClick={() => {
                      setCancelOrderModal(true);
                    }}
                    className="rounded-[6px] py-2 bg-[#DC3545] text-white  text-base font-semibold w-fit px-6"
                  >
                    Cancel
                  </button>
                  <div className="flex gap-3 ">
                    <button
                      onClick={() => {
                        setChangeStatusModal(true);
                      }}
                      className="bg-[#F8B02B] py-2 px-6 rounded-[6px] text-white font-semibold text-base"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={() => {
                        setPaymentStatusModal(true);
                      }}
                      className="bg-[#147D73] py-2 px-6 rounded-[6px] text-white font-semibold text-base"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
                <form action=""></form>
              </div>
            </div>
            <div className="timeLine-section mt-8">
              <div className="flex justify-between py-2 border-b border-[#C4C4C4]">
                <h4 className="text-lg font-semibold text-[#2B4447]">
                  Timeline
                </h4>
                <Checkbox>
                  <p className="text-base font-medium text-[#2B4447]">
                    Show Comments
                  </p>
                </Checkbox>
              </div>
              <div className="">
                <div className="box py-12 relative">
                  <div className="absolute top-[50px] left-[18px] bg-[#C4C4C4] h-[80%] w-[1px]"></div>
                  <ul className="relative flex justify-end ">
                    <div className="flex justify-center items-center absolute top-0 left-0 h-[37px] w-[37px] rounded-[50%] border border-[#CCCCCC] bg-[#F1F1F1] text-base font-semibold text-[#2B4447]">
                      HM
                    </div>

                    <li className=" w-[92%]">
                      <textarea
                        type="text"
                        placeholder="Add a comment"
                        className="rounded-[8px] p-3 w-full"
                        style={{ border: "1px solid #CDCED6" }}
                      />
                      <div className="flex justify-between">
                        <label
                          htmlFor=""
                          className="text-[12px] font-noraml text-[#212B36]"
                        >
                          Only you and other staff can see comments
                        </label>
                        <button className="py-3 px-6 bg-[#147D73] rounded-[6px] text-base font-semibold text-white">
                          Post
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div className="pt-4 ">
                    <ul className=" flex justify-end ">
                      <div className="w-[92%]">
                        <h4 className="text-lg font-bold text-[#212B36] mb-5">
                          Date of Order action
                        </h4>
                        <li className="relative flex justify-between items-center mb-4 ">
                          <div className="absolute top-[4px] left-[-63px]  h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            First detail of action
                          </p>
                          <p className="text-base font-normal text-[#212B36]">
                            Time
                          </p>
                        </li>
                        <li className="flex justify-between items-center mb-4  relative">
                          <div className="absolute top-[4px] left-[-63px] h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            First detail of action
                          </p>
                          <p className="text-base font-normal text-[#212B36]">
                            Time
                          </p>
                        </li>
                      </div>
                    </ul>
                    <ul className=" flex justify-end ">
                      <div className="w-[92%]">
                        <h4 className="text-lg font-bold text-[#212B36] mb-5">
                          Date of Order action
                        </h4>
                        <li className="relative flex justify-between items-center mb-4 ">
                          <div className="absolute top-[4px] left-[-63px]  h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            First detail of action
                          </p>
                          <p className="text-base font-normal text-[#212B36]">
                            Time
                          </p>
                        </li>
                        <li className="flex justify-between items-center mb-4  relative">
                          <div className="absolute top-[4px] left-[-63px] h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            First detail of action
                          </p>
                          <p className="text-base font-normal text-[#212B36]">
                            Time
                          </p>
                        </li>
                      </div>
                    </ul>
                    <ul className=" flex justify-end ">
                      <div className="w-[92%]">
                        <h4 className="text-lg font-bold text-[#212B36] mb-5">
                          Date of Order action
                        </h4>
                        <li className="relative flex justify-between items-center mb-4 ">
                          <div className="absolute top-[4px] left-[-63px]  h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            First detail of action
                          </p>
                          <p className="text-base font-normal text-[#212B36]">
                            Time
                          </p>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 w-full">
            <div className="bg-white rounded-[8px] custom-shadow p-4">
              <h4 className="font-semibold text-[20px]">Delivery Contact</h4>

              <div className="flex items-center gap-5 py-5">
                <PersonIcon
                  style={{ fill: "#147D73", width: "42px", height: "42px" }}
                />
                <div className="">
                  <h5 className="text-base font-semibold text-[#1D1E20]">
                    Musharof
                  </h5>
                  <p className="text-sm font-normal text-[#637381]">
                    No previous orders
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MailOutlineRoundedIcon style={{ fill: "#147D73" }} />
                <div className="">
                  <h6 className="text-base font-semibold text-[#1D1E20]">
                    Email Address
                  </h6>
                  <p className="text-sm font-normal text-[#637381]">
                    email@example.com
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <LocalPhoneRoundedIcon style={{ fill: "#147D73" }} />
                <div className="">
                  <h6 className="text-base font-semibold text-[#1D1E20]">
                    Mobile
                  </h6>
                  <p className="text-sm font-normal text-[#637381]">
                    0467 333 444
                  </p>
                </div>
              </div>
              <button className=" w-full mt-6 bg-[#147D73] rounded-[6px] py-3 text-base font-semibold text-white">
                Edit Details
              </button>
            </div>
            <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
              <h4 className="font-semibold text-[20px]">Delivery Address</h4>

              <p className="text-lg font-normal text-[#2B4447] mt-2">
                456 King Street, Newton, NSW 2304 Australia
              </p>
              <h4 className="font-semibold text-[20px] mt-6">
                Delivery Instructions
              </h4>

              <p className="text-lg font-normal text-[#2B4447] mt-2">
                Ring delivery contact on arrival
              </p>
              <button className=" w-full mt-6 bg-[#147D73] rounded-[6px] py-3 text-base font-semibold text-white">
                Edit Details
              </button>
            </div>
            <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
              <h4 className="font-semibold text-[20px]">Delivery Address</h4>

              <p className="text-lg font-normal text-[#2B4447] mt-2">
                456 King Street, Newton, NSW 2304 Australia
              </p>

              <button className=" w-full mt-6 bg-[#147D73] rounded-[6px] py-3 text-base font-semibold text-white">
                Edit Details
              </button>
            </div>
            <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
              <h4 className="font-semibold text-[20px]">Payment</h4>
              <div className="flex items-start gap-2 mt-3">
                <img src="./assets/visa.png" alt="" className="" />
                <p className="text-lg font-normal text-[#2B4447] ">
                  Credit card ending with 3259
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentStatusModal
        handleCancel={() => {
          setPaymentStatusModal(false);
        }}
        isModalOpen={paymentStatusModal}
        handleOk={() => {
          setPaymentStatusModal(false);
        }}
        closeIcon={false}
      />
      <ChangeStatusModal
        handleCancel={() => {
          setChangeStatusModal(false);
        }}
        isModalOpen={changeStatusModal}
        handleOk={() => {
          setChangeStatusModal(false);
        }}
        closeIcon={false}
      />
      <CancelOrderModal
        handleCancel={() => {
          setCancelOrderModal(false);
        }}
        isModalOpen={cancelOrderModal}
        handleOk={() => {
          setCancelOrderModal(false);
        }}
        closeIcon={false}
      />
    </>
  );
};

export default OrderListing;
