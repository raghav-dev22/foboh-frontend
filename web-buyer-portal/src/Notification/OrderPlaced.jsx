import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const OrderPlaced = () => {
  return (
    <>
      <div className="w-full flex justify-center h-full bg-[#F8FAFC] py-4  ">
        <div className="h-full  md:w-[825px] w-full flex justify-center flex-col items-center">
          <div className="w-full md:w-[550px] p-6 md:mx-0 mx-6 border border-[#E7E7E7] rounded-[8px] bg-white">
            <div className="w-full flex justify-center">
              <div className="bg-[#F2DE74] h-[96px] w-[258px] flex justify-center items-center">
                <h5 className="text-sm font-bold text-[#000000]">
                  [SUPPLIER LOGO]
                </h5>
              </div>
            </div>
            <h4 className="text-[24px] font-semibold text-[#2B4447] my-4">
              Order placed
            </h4>
            <p className="my-2 text-sm font-normal text-[#5C5E64]">
              15th October, 2023
            </p>
            <p className="my-2 text-sm font-normal text-[#1C1E23]">
              [SUPPLIER NAME] Order #[ORDER NUMBER] has been received and is
              being reviewed. We will confirm it as soon as possible.
            </p>
            <button className="my-2 py-2 px-4 bg-[#2B4447] text-sm font-semibold text-white rounded-[8px]">
              View order
            </button>
            <hr className="my-2" />
            <h5 className="my-2 text-lg font-semibold text-[#1C1E23]">
              Order summary
            </h5>
            <div className="">
              <div className="flex justify-start items-center gap-2 border-b border-[#F1F1F6] mb-4 pb-4">
                <div className="">
                  <img
                    src="/assets/product-1.png"
                    className="w-[100px] h-[100px]"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col  gap-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-semibold text-[#1C1E23]">
                      Product Title
                    </h5>
                    <div className="flex justify-end gap-2 items-center">
                      <p className="text-sm font-normal text-[#8F98B1]">X</p>
                      <p className="text-sm font-normal text-[#8F98B1]">
                        $X,XXX.XX
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-normal text-[#8F98B1] ">
                    1 x 750ml Bottle
                  </p>
                  <p className="text-sm font-bold text-[#8F98B1]">
                    PROMOCODE (-$X.XX)
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 border-b border-[#F1F1F6] mb-4 pb-4">
                <div className="">
                  <img
                    src="/assets/product-1.png"
                    className="w-[100px] h-[100px]"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col  gap-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-semibold text-[#1C1E23]">
                      Product Title
                    </h5>
                    <div className="flex justify-end gap-2 items-center">
                      <p className="text-sm font-normal text-[#8F98B1]">X</p>
                      <p className="text-sm font-normal text-[#8F98B1]">
                        $X,XXX.XX
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-normal text-[#8F98B1] ">
                    1 x 750ml Bottle
                  </p>
                  <p className="text-sm font-bold text-[#8F98B1]">
                    PROMOCODE (-$X.XX)
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between py-3 ">
                <h5 className="text-sm font-medium text-[#2B4447]">Subtotal</h5>
                <h5 className="text-sm font-medium text-[#8F98B1]">
                  $3,000.00
                </h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-sm font-medium text-[#2B4447]">Shipping</h5>
                <h5 className="text-sm font-medium text-[#8F98B1]">Free</h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-sm font-medium text-[#2B4447]">
                  Promo code
                </h5>
                <h5 className="text-sm font-medium text-[#23C367]">-$0.00</h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-sm font-medium text-[#2B4447]">GST</h5>
                <h5 className="text-sm font-medium text-[#8F98B1]">$0.00</h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-base font-semibold text-[#2B4447]">
                  Order total
                </h5>
                <h5 className="text-base font-semibold text-[#2B4447]">
                  $3,000.00
                </h5>
              </div>
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-3 my-4">
              <div className="col-span-2 flex flex-col justify-between">
                <div className="">
                  <h5 className="text-[#1C1E23] font-semibold text-base ">
                    Payment status
                  </h5>
                  <p className="text-sm font-normal text-[#1C1E23]">
                    Due on XX/XX/XX
                  </p>
                </div>
                <div className="">
                  <h5 className="text-[#1C1E23] text-base font-semibold ">
                    Payment method
                  </h5>
                  <p className="text-sm font-normal text-[#1C1E23]">
                    Direct debit
                  </p>
                </div>
              </div>
              <div className="">
                <h5 className="text-base font-semibold text-[#1C1E23]">
                  Delivery address
                </h5>
                <p className="mt-2 text-sm font-normal text-[#1C1E23]">
                  Ordering contact name 123 Shipping Street Suburb, STATE 2000
                  Australia
                </p>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex justify-start items-center gap-2 mt-4">
              <HelpOutlineIcon style={{ fill: "#5C5E64", width: "19px" }} />
              <p className="text-sm font-normal text-[#5C5E64]">
                If you have any questions, contact us at
                
                [orderingcontact@email.com]
              </p>
            </div>
          </div>

          <div className="my-6 text-center w-full md:w-[550px] ">
            <p className="text-[20px] font-normal text-[#D0D6D8]">POWERED BY</p>
            <div className="flex justify-center mt-2">
              <img src="/assets/foboh.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
