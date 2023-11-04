import React from "react";

const DeliveryAddress = ({ orderAdressDetails }) => {
  return (
    <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
      <h4 className="font-semibold text-[20px]">Delivery Address</h4>

      <p className="text-lg font-normal text-[#2B4447] mt-2">
        {`${orderAdressDetails?.apartmentSuite} ${orderAdressDetails?.streetaddress}, ${orderAdressDetails?.city}, ${orderAdressDetails?.state} ${orderAdressDetails?.postcode} Australia`}
      </p>
      <h4 className="font-semibold text-[20px] mt-6">Delivery Instructions</h4>

      <p className="text-lg font-normal text-[#2B4447] mt-2">
        {orderAdressDetails?.instructionsNotes}
      </p>
    </div>
  );
};

export default DeliveryAddress;
