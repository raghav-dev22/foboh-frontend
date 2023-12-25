import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Skeleton } from "antd";
const DeliveryContact = ({ orderAdressDetails }) => {
  return (
    <div className="bg-white rounded-[8px] custom-shadow p-4">
      <h4 className="font-semibold text-[20px]">Delivery Contact</h4>

      {orderAdressDetails?.customerName && (
        <div className="flex items-center gap-5 py-5">
          <PersonIcon
            style={{ fill: "#147D73", width: "42px", height: "42px" }}
          />
          <div className="">
            <h5 className="text-base font-semibold text-[#1D1E20]">
              {orderAdressDetails.customerName}
            </h5>
            <p className="text-sm font-normal text-[#637381]">
              No previous orders
            </p>
          </div>
        </div>
      )}

      {orderAdressDetails?.emailId && (
        <div className="flex gap-3">
          <MailOutlineRoundedIcon style={{ fill: "#147D73" }} />
          <div className="">
            <h6 className="text-base font-semibold text-[#1D1E20]">
              Email Address
            </h6>
            <p className="text-sm font-normal text-[#637381]">
              {orderAdressDetails.emailId}
            </p>
          </div>
        </div>
      )}

      {orderAdressDetails?.phoneNumber && (
        <div className="flex gap-3 mt-3">
          <LocalPhoneRoundedIcon style={{ fill: "#147D73" }} />
          <div className="">
            <h6 className="text-base font-semibold text-[#1D1E20]">Mobile</h6>
            <p className="text-sm font-normal text-[#637381]">
              {orderAdressDetails.phoneNumber}
            </p>
          </div>
        </div>
      )}

      {/* Render Skeleton for missing data */}
      {!orderAdressDetails?.customerName && (
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          avatar
          className="custom-skeleton-header"
        />
      )}

      {!orderAdressDetails?.emailId && (
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          avatar
          className="custom-skeleton-header"
        />
      )}

      {!orderAdressDetails?.phoneNumber && (
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          avatar
          className="custom-skeleton-header"
        />
      )}
    </div>
  );
};

export default DeliveryContact;
