import React from "react";
import EditCustomerBtn from "../customers/EditCustomerBtn";
import AddCustomerBtn from "../customers/AddCustomerBtn";
import { Link } from "react-router-dom";
function ViewCustomerHeader() {
  return (
    <>
      <div className="py-8 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <Link to="/dashboard/customers">
            <div className="">
              <img src="/assets/previousBtn.png" alt="" />
            </div>
          </Link>
          <h4 className=" text-2xl font-semibold text-darkGreen">
            The Union Hotel{" "}
          </h4>
        </div>
        <div className=" flex-wrap	 flex judstify-center items-center gap-3">
          <EditCustomerBtn />
          <AddCustomerBtn title="Create Order" />
        </div>
      </div>
    </>
  );
}

export default ViewCustomerHeader;
