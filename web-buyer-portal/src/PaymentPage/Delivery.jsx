import React, { useState } from "react";
import Order from "../CartPage/Order";
import { Link, useNavigate } from "react-router-dom";
const Delivery = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputContactValue, setInputContactValue] = useState("");
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [contactDisabled, setContactDisabled] = useState(true);

  const handleControlChange = (event) => {
    setIsDisabled(event.target.checked);
    setInputAddressValue(event.target.value);
  };
  const handleContactChange = (event) => {
    setInputContactValue(event.target.value);
    setContactDisabled(event.target.checked);
  };

  const storedValue = JSON.parse(localStorage.getItem("myKey"));
  console.log(storedValue, "local");
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div className="">
          <div className="py-4">
            <div className="border rounded-md border-[#E7E7E7] p-3 mb-4">
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-[#2B4447]">
                  Contact
                </h5>
                <div className="relative">
                  <input
                    //  onChange={handleControlChange}
                    type="checkbox"
                    onChange={handleContactChange}
                    checked={contactDisabled}
                    className="w-full h-full absolute top-0 right-0 opacity-0 cursor-pointer"
                  />
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Change
                  </h5>
                </div>
              </div>
              <input
                disabled={contactDisabled}
                className="appearance-none border-0 text-base font-normal text-[#2B4447]"
                id="DeliveryContact"
                type="text"
                placeholder="Edit Contact"
                value={
                  contactDisabled ? "myemail@gmail.com.au" : inputContactValue
                }
                style={{ padding: "0px", border: "0px" }}
                onChange={handleContactChange}
              />
            </div>
            <div className="border rounded-md border-[#E7E7E7] p-3">
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-[#2B4447]">
                  Delivery Address
                </h5>
                <div className="relative">
                  <input
                    type="checkbox"
                    onChange={handleControlChange}
                    checked={isDisabled}
                    className="w-full h-full absolute top-0 right-0 opacity-0 cursor-pointer"
                  />
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Change
                  </h5>
                </div>
              </div>
              <input
                disabled={isDisabled}
                onChange={handleControlChange}
                className="appearance-none border-0 text-base font-normal text-[#2B4447]"
                id="DeliveryContact"
                type="text"
                placeholder="Edit Delivery Address "
                value={isDisabled ? "myemail@gmail.com.au" : inputAddressValue}
                style={{ padding: "0px", border: "0px" }}
              />
            </div>
            <div className="mt-8">
              <label
                className="block text-[#2B4447] text-lg font-semibold mb-4"
                htmlFor="Delivery Contact"
              >
                Delivery Contact
              </label>
              <input
                className=" appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 "
                id="DeliveryContact"
                type="text"
                placeholder="Delivery Contact"
                value={storedValue.DeliveryContact}
              />
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/home/my-cart/checkout");
            }}
            type="submit"
            className="bg-[#563FE3] rounded-[6px] w-fit px-[20px] py-[9px] text-base font-medium text-white"
          >
            Continue to Payment
          </button>
          <Link to="/home/payment-page/check-out">
            <p className="text-[#637381] text-base font-semibold mt-4">
              Return to Details
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Delivery;
