import React from "react";
// import ActiveProduct from './ActiveProduct'

import ViewProductHeader from "./ViewProductHeader";
import EditProductDetails from "../editProduct/EditProductDetails";
import UpdateImg from "../editProduct/UpdateImg";
import Inventory from "../editProduct/Inventory";
import ProductListing from "../editProduct/ProducrListing";
import PricingDetails from "../editProduct/PricingDetails";
function ViewProduct() {
  return (
    <>
      <ViewProductHeader />
      <div className="grid gap-5 lg:flex  px-6  overflow-y-auto h-96 no-scrollbar">
        <div className="w-full lg:w-2/5	 h-full	">
          <div className="grid gap-3">
            <UpdateImg />

            <ProductListing />

            <Inventory />
          </div>
        </div>
        <div className=" lg:w-3/5 w-full   h-full	 grid gap-3	  ">
          <EditProductDetails />
          <PricingDetails />
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
