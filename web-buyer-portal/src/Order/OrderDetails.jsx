import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, setCart, updateQuantity } from "../slices/CartSlice";
import { DownloadOutlined } from "@ant-design/icons";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Instruction from "../Svg/Instruction";
import { Popover, Steps } from "antd";
import InvoiceModal from "../modal/InvoiceModal";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { getTrackerStatus } from "../helpers/getTrackerStatus";
import { getSealedCart } from "../helpers/getSealedCart";

const OrderDetails = () => {
  const customDot = (dot, { status, index }) => (
    <Popover content={<span>Status: {status}</span>}>{dot}</Popover>
  );
  const childRef = useRef();
  const [totalCost, setTotleCost] = useState(0);
  const [showPreview, setshowPreview] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [currentStep, setCurrentStep] = useState(0);
  const [productList, setProductList] = useState([]);
  const [calculations, setCalculations] = useState({
    total: 0,
    subTotal: 0,
    gst: 0,
    wet: 0,
  });
  const [isWine, setIsWine] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [invoiceDataProducts, setInvoiceDataProducts] = useState([]);
  let orderId = "";
  const CARTdata = useSelector((items) => items.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  let cart = "";

  const calculateTotalCost = () => {
    let total = 0;

    const { totalPrice, payAmountLong, gst, wet, subCategoryId } = cart[0];
    CARTdata.forEach((item) => {
      const productPrice = item?.product?.globalPrice;
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
      content: "Reorder succeeeded, items added to your cart.",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Error has occurred, please try again.",
    });
  };

  useEffect(() => {
    //Handling Stepper
    getTrackerStatus(id).then((status) => {
      console.log("getTrackerStatus", status);
      if (status === "Order Placed") {
        setCurrentStep(0);
      } else if (status === "Pending") {
        setCurrentStep(1);
      } else if (status === "Processing") {
        setCurrentStep(2);
      } else if (status === "Shipped") {
        setCurrentStep(3);
      } else if (status === "Delivered") {
        setCurrentStep(4);
      }
    });

    //Handling Cart details of order
    getSealedCart(id).then((data) => {
      if (data.success) {
        const { gst, payAmountLong, totalPrice, wet } = data?.data[0];
        setCalculations({
          total: payAmountLong,
          subTotal: totalPrice,
          gst: gst,
          wet: wet,
        });
        data.data.forEach((subCat) => {
          if (
            subCat.subCategoryId === "SC5000" ||
            subCat.subCategoryId === "SC500"
          ) {
            setIsWine(true);
          }
        });
        const updatedList = data.data.map((product) => {
          return {
            product: product,
            quantity: product?.quantity,
          };
        });

        cart = updatedList;
        setProductList(updatedList);
        calculateTotalCost();
      }
    });
  }, []);
  console.log(productList[0], "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");

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
    const apiUrl = `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getOrderDetailsByOrderId?OrderId=${id}`;

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
          warning();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleInvoiceDownload = async (orderId) => {
    const invoiceData = await fetchInvoice(orderId);
    if (childRef.current && invoiceData) {
      childRef.current.handlePrint(orderId);
    }
  };

  const fetchInvoice = async (id) => {
    const apiUrl = `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getOrderInvoiceByOrderId?OrderId=${id}`;

    const invoiceData = await fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.total, "data------>");
        setshowPreview(true);
        setInvoiceData(data.data[0]);
        orderId = data.data[0]?.orderId;
        setInvoiceDataProducts(
          data.data.map((item) => {
            let gstPerItem = 0;
            let wetPerItem = null;
            let amountPerItem = 0;

            const salePrice = item?.globalPrice;
            const quantity = item?.quantity;
            const subCatId = item?.subCategoryId;
            const gst = 0.1;
            const wet = 0.29;

            const subTotal = salePrice * quantity;
            const subTotalGst = subTotal * gst;
            const subTotalIncGst = subTotal + subTotalGst;
            let subTotalWet = 0;
            let subTotalIncWet = 0;

            if (subCatId === "SC500" || subCatId === "SC5000") {
              setIsWine(true);
              subTotalWet = subTotal * wet;
              subTotalIncWet = subTotal + subTotalWet;
              wetPerItem = subTotalIncWet;
            }

            amountPerItem = subTotalIncGst;
            gstPerItem = subTotalGst;

            return {
              totalPrice: item?.totalPrice,
              quantity: item?.quantity,
              cartId: item?.cartId,
              subTotalPrice: item?.subTotalPrice,
              shippingcharges: item?.shippingcharges,
              gst: item?.gst,
              wet: item?.wet,
              productId: item?.productId,
              skUcode: item?.skUcode,
              configuration: item?.configuration,
              luCcost: item?.luCcost,
              globalPrice: item?.globalPrice,
              title: item?.title,
              unitofMeasure: item?.unitofMeasure,
              amountPerItem: amountPerItem,
              gstPerItem: gstPerItem,
              wetPerItem: wetPerItem,
            };
          })
        );
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    return invoiceData;
  };

  return (
    <>
      {contextHolder}
      <div className="md:w-4/5	w-full  p-6  mx-auto md:p-0 ">
        <InvoiceModal
          ref={childRef}
          show={showPreview}
          setShow={setshowPreview}
          invoiceData={invoiceData}
          invoiceDataProducts={invoiceDataProducts}
          isWine={isWine}
        />
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
              icon={<DownloadOutlined />}
              loading={loadings[1]}
              // onClick={() => enterLoading(1)}
              onClick={() => {
                handleInvoiceDownload(id);
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
                {`${orderDetails?.apartmentSuite} ${orderDetails?.streetaddress}, ${orderDetails?.city}, ${orderDetails?.state}`}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails?.postcode} Australia
              </p>
              <div className="flex gap-2 items-center">
                <Instruction />
                <p className="text-base font-normal text-[#637381]  leading-7	">
                  {orderDetails?.instructionsNotes}
                </p>
              </div>
            </div>
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Contact
              </h5>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails?.firstname} {orderDetails?.lastname}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails.emailId}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails?.phoneNumber}
              </p>
            </div>
            <div className="">
              <h5 className="font-semibold text-lg text-[#2B4447] leading-[30px]	">
                Order Date
              </h5>
              <p className="text-base font-normal text-[#2B4447] leading-7	">
                {orderDetails?.orderEntryDate}
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
          <div className="custom-step">
            <Steps
              current={currentStep}
              progressDot={customDot}
              items={[
                {
                  title: "Order Placed",
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
        </div>
        <div className="my-3">
          {productList.length === 0 ? (
            <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
              Your cart is empty.
            </h5>
          ) : (
            <>
              {" "}
              {productList.map((item, index) => (
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
                            {item.product?.configuration}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-[#2B4447]">
                          Quantity - {item?.quantity}
                        </p>
                        <h4 className=" text-base text-[#2B4447] font-semibold">
                          {item.product?.globalPrice}
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
          <div className="border h-[235px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 w-full">
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
          <div className="border  h-[235px] rounded-md bg-[#F8F8F8] border-[#E7E7E7] p-3 mb-4 w-full">
            <div className="">
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">Subtotal</h5>
                <h5 className="text-sm font-medium text-[#2B4447]">
                  ${calculations.subTotal}
                </h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">
                  Shipping estimate
                </h5>
                <h5 className="text-sm font-medium text-[#2B4447]">$60</h5>
              </div>

              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#2B4447]">GST</h5>
                <h5 className="text-sm font-medium text-[#2B4447]">
                  ${calculations.gst}
                </h5>
              </div>
              {isWine && (
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-sm font-medium text-[#2B4447]">WET</h5>
                  <h5 className="text-sm font-medium text-[#2B4447]">
                    ${calculations.wet}
                  </h5>
                </div>
              )}
              <div className="flex justify-between py-3 ">
                <h5 className="text-base font-semibold text-[#2B4447]">
                  Order total
                </h5>
                <h5 className="text-base font-semibold text-[#2B4447]">
                  ${calculations.total}
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
