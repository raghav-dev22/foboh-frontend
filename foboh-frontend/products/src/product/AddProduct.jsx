import React from "react";
import AddProductListing from "../addProduct/AddProductListing";
import UploadImg from "../addProduct/UploadImg";
import AddInventory from "../addProduct/AddInventory";
import AddProductDetails from "../addProduct/AddProductDetails";
import AddPricingDetails from "../addProduct/AddPricingDetails";
import AddProductHeader from "../addProduct/AddProductHeader";
function AddProduct() {
  return (
    <>
     <AddProductHeader />
      <div className="grid gap-5 lg:flex  px-6  overflow-y-auto h-96 no-scrollbar">
        <div className="w-full lg:w-2/5	 h-full	">
          <div className="grid gap-3">
           <UploadImg/>

          <AddProductListing/>

          <AddInventory/>
          </div>
        </div>
        <div className=" lg:w-3/5 w-full   h-full	 grid gap-3	  ">
        <AddProductDetails/>
      <AddPricingDetails/>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
