import React, { useEffect } from "react";
import ViewCustomerHeader from "../ViewCustomer/ViewCustomerHeader";
import CustomerAddress from "../ViewCustomer/CustomerAddress";
import OrderDetails from "../ViewCustomer/OrderDetails";
import { useLocation } from "react-router-dom";
function ViewCustomer() {
 
  const location = useLocation()
  console.log("params location for checking at view time>>", location?.state?.data)
 
  return (
    <div className="px-6">
      <ViewCustomerHeader />
      <CustomerAddress />
      <OrderDetails datas={location?.state?.data?.buyerId} />
    </div>
  );
}

export default ViewCustomer;
