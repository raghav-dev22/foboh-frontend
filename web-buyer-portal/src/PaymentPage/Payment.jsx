import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";
import ModeIcon from "@mui/icons-material/Mode";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Tabs } from "antd";
import ContactEdit from "../MyAccount/ContactEdit";
import DeliveryEditAddress from "../MyAccount/DeliveryEditAddress";

const Payment = () => {
  const EditContactValue = JSON.parse(localStorage.getItem("ContactEdit"));
  const EditDeliveryVal = JSON.parse(localStorage.getItem("deliveryAddress"));
  console.log(EditDeliveryVal, "EditDeliveryVal");
  const [activeKey, setActiveKey] = useState("1");
  const [editDelivery, setEditDelivery] = useState(false);
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  const { TabPane } = Tabs;

  const [isChecked, setIsChecked] = useState(false);
  const [cardDetails, setCardDetails] = useState(false);

  // Function to handle checkbox change event
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCardDetails(false);
  };

  const openTab = () => {
    setOpenDetails(!openDetails);
  };
  const [openDetails, setOpenDetails] = useState(false);

  const [editContact, setEditContact] = useState(false);
  return (
    <>
      <div className="">
        <div className="py-4">
          <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
            {editContact ? (
              <ContactEdit
                setEditContact={setEditContact}
                editContact={editContact}
              />
            ) : (
              <>
                <div className="flex justify-between">
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Contact
                  </h5>
                  {/* <Link to="#"> */}
                  <button
                    className=""
                    onClick={() => setEditContact(!editContact)}
                  >
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Change
                    </h5>
                  </button>
                  {/* </Link> */}
                </div>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditContactValue?.FirstName}
                </p>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditContactValue?.email}
                </p>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditContactValue?.Mobile}
                </p>
              </>
            )}
          </div>

          <div className="border rounded-md border-[#E7E7E7] p-3">
            {editDelivery ? (
              // <DeliveryAddress />
              <DeliveryEditAddress
                setEditDelivery={setEditDelivery}
                editDelivery={editDelivery}
              />
            ) : (
              <>
                <div className="flex justify-between">
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Delivery
                  </h5>
                  <button onClick={() => setEditDelivery(!editDelivery)}>
                    <h5 className="text-lg font-semibold text-[#2B4447]">
                      Change
                    </h5>
                  </button>
                </div>
                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditDeliveryVal?.Apartment},{EditDeliveryVal?.Address},
                  {/* {EditDeliveryVal?.State}  */}
                  {EditDeliveryVal?.Postcode},{/* {EditDeliveryVal?.City} */}
                </p>

                <h5 className="text-lg font-semibold text-[#2B4447] my-1">
                  Notes
                </h5>

                <p className="text-base font-normal text-[#2B4447] my-1">
                  {EditDeliveryVal?.DeliveryInstruction}
                </p>
              </>
            )}
          </div>

          <div className="mt-8 mb-3">
            <h5 className="font-semibold text-xl mb-2">Payment</h5>
            <p className="text-base font-normal text-[#637381] mb-4">
              Select a payment option
            </p>
            <p className="text-normal font-medium text-[#2B4447]">
              All transactions are encrypted
            </p>
            <Tabs
              defaultActiveKey="1"
              activeKey={activeKey}
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <>
                    <div
                      className={` ${
                        activeKey === "1"
                          ? "bg-[#F0EDFF] border border-[#563FE3]"
                          : "bg-[#fff] border border-[#E7E7E7]"
                      }  rounded-md w-[175px] py-[18px]`}
                    >
                      <h5 className="text-[#2B4447] font-semibold text-base text-center mb-1">
                        Pay Later
                      </h5>
                      <p className="text-sm text-[#637381] text-center">
                        {" "}
                        14 days, EFT
                      </p>
                    </div>
                  </>
                }
                key="1"
              >
                <div className="mt-3 border border-[#E7E7E7] rounded-md ">
                  <div className=" flex items-center p-3 border-b border-[#E7E7E7]">
                    <div className="relative flex justify-center items-center">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        // type="checkbox"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447] "
                    >
                      {/* Checked: {isChecked ? "true" : "false"} */}
                      Payment in 14 Days
                    </label>
                  </div>
                  <div className=" flex items-center p-3  border-b border-[#E7E7E7]">
                    <div className="relative flex justify-center items-center">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        // type="checkbox"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447] "
                    >
                      {/* Checked: {isChecked ? "true" : "false"} */}
                      Payment in 30 Days
                    </label>
                  </div>
                  <div className=" flex items-center p-3">
                    <div className="relative flex justify-center items-center">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        // type="checkbox"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447] "
                    >
                      {/* Checked: {isChecked ? "true" : "false"} */}
                      Payment in 2 Months
                    </label>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div
                    className={` ${
                      activeKey === "2"
                        ? "bg-[#F0EDFF] border border-[#563FE3]"
                        : "bg-[#fff] border border-[#E7E7E7]"
                    }  rounded-md w-[175px] py-[18px]`}
                  >
                    <h5 className="text-[#2B4447] font-semibold text-base text-center mb-1">
                      Pay Now
                    </h5>
                    <p className="text-sm text-[#637381] text-center">
                      Credit or Debit Card
                    </p>
                  </div>
                }
                key="2"
              >
                <h5 className="text-lg font-semibold text-[#2B4447]">
                  Choose a Payment Period
                </h5>

                <div className="border border-[#E7E7E7] rounded-md   mt-2">
                  <div
                    className="justify-between flex items-center  border-b p-3 border-[#E7E7E7]"
                    onClick={() => {
                      openTab();
                    }}
                  >
                    <div className=" flex items-center">
                      <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                        <input
                          defaultChecked=""
                          id="default-radio-1"
                          // type="radio"
                          type="checkbox"
                          defaultValue=""
                          name="default-radio"
                          className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                          style={{
                            boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                          }}
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <label
                        htmlFor="default-radio-1"
                        className="ml-4 text-base font-semibold text-[#2B4447] "
                      >
                        {/* Checked: {isChecked ? "true" : "false"} */}
                        Credit/Debit Card
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src="/assets/visa.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/master-card.png"
                        alt=""
                        className="fit-contain"
                      />
                      <img
                        src="/assets/american-express.png"
                        alt=""
                        className="fit-contain"
                      />
                    </div>
                  </div>
                  {isChecked && (
                    <div className="bg-[#E7E7E7] py-5 px-2">
                      <div className="rounded-md bg-white p-3 flex justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/assets/visa.png" alt="" />
                          <h5 className="font-medium text-[#2B4447] text-base">
                            Credit card ending with 3259
                          </h5>
                        </div>
                        <ModeIcon
                          style={{ fill: "#563fe3" }}
                          onClick={() => {
                            setCardDetails(!cardDetails);
                            setIsChecked(!isChecked);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {cardDetails && (
                    <>
                      <div className="bg-[#E7E7E7] py-5 px-4">
                        <div
                          className={`relative mb-4  `}
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="LiquerLicence"
                            className=" "
                            autoComplete="off"
                            placeholder="Card Number"
                          />
                          <div className="absolute top-[10px] right-[10px]">
                            <LockOpenIcon style={{ fill: "#979797" }} />
                          </div>
                        </div>
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="LiquerLicence"
                            className=" "
                            autoComplete="off"
                            placeholder="Name on Card"
                          />
                        </div>
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="LiquerLicence"
                            className=" "
                            autoComplete="off"
                            placeholder="Expiration Date (MM/YY)"
                          />
                        </div>
                        <div
                          className={`relative mb-4 `}
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="LiquerLicence"
                            className=" "
                            autoComplete="off"
                            placeholder="Security Code"
                          />
                          <div className="absolute top-[10px] right-[10px]">
                            <ErrorOutlineIcon style={{ fill: "#979797" }} />
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          <input
                            defaultChecked=""
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            name="default-radio"
                            // onClick={() => {
                            //   addressBtn();
                            // }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800"
                            // style={{
                            //   boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                            // }}
                          />

                          <label
                            htmlFor="radio-3"
                            className="ml-4 text-base font-normal text-[#2B4447] "
                          >
                            Save card details
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Cash on delivery
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Bank transfer (EFT)
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Direct debit
                    </label>
                  </div>
                  <div className=" flex items-center border-b border-[#E7E7E7] p-3">
                    <div className="relative rounded-full w-[28px] h-[28px] custom-shadow flex justify-center items-center ">
                      <input
                        defaultChecked=""
                        id="default-radio-1"
                        type="radio"
                        defaultValue=""
                        name="default-radio"
                        className="w-4 h-4 text-[#000] bg-gray-100 border-gray-300  custom-radio"
                        style={{
                          boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.75);",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="default-radio-1"
                      className="ml-4 text-base font-semibold text-[#2B4447]"
                    >
                      Apple pay
                    </label>
                  </div>
                </div>
              </TabPane>
            </Tabs>
            {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
          </div>

          <div className="py-4">
            <BillingAddress />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
