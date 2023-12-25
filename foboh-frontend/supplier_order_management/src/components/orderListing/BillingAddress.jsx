import React from "react";
import { Skeleton } from "antd";
const BillingAddress = ({ orderAdressDetails }) => {
  return (
    <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
      <h4 className="font-semibold text-[20px]">Billing Address</h4>
      {orderAdressDetails?.billingApartmentSuite ? (
        <p className="text-lg font-normal text-[#2B4447] mt-2">
          {`${orderAdressDetails?.billingApartmentSuite} ${orderAdressDetails?.billingStreetaddress}, ${orderAdressDetails?.billingCity}, ${orderAdressDetails?.billingState} ${orderAdressDetails?.billingPostcode} Australia`}
        </p>
      ) : (
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          // loading={loading}
          avatar
          className="custom-skeleton-header"
        />
      )}
    </div>
  );
};

export default BillingAddress;
