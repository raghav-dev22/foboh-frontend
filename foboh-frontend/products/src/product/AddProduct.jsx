import React, { useState } from "react";
import AddProductListing from "../addProduct/AddProductListing";
import UploadImg from "../addProduct/UploadImg";
import AddInventory from "../addProduct/AddInventory";
import AddProductDetails from "../addProduct/AddProductDetails";
import AddPricingDetails from "../addProduct/AddPricingDetails";
import AddProductHeader from "../addProduct/AddProductHeader";
import ProductEditHeader from "../components/ProductEditHeader";
import { useFormik } from "formik";
import { addProductSchema } from "../schema";

const initialValues = {
  status: "",
  visibility: false,
  region: [],
  minimumOrder: "",
  trackInventory: false,
  stockAlertLevel: "",
  sellOutOfStock: false,
  title: "",
  skuCode: "",
  brand: "",
  department: "",
  category: "",
  subcategory: "",
  segment: "",
  grapeVariety: [],
  regionSelect: "",
  vintage: "",
  awards: "",
  abv: "",
  country: "",
  baseUnitMeasure: "",
  innerUnitMeasure: "",
  configuration: "",
  description: "",
  tags: [],
  salePrice: "",
  buyPrice: "",
  profit: "",
  margin: "",
  tax: "",
  wineEqualisationTax: "",
  landedUnitCost: "",
};

function AddProduct() {
  const [product, setProduct] = useState({
    status: "",
    visibility: false,
    region: [],
    minimumOrder: "",
    trackInventory: false,
    stockAlertLevel: "",
    sellOutOfStock: false,
    title: "",
    skuCode: "",
    brand: "",
    department: "",
    category: "",
    subcategory: "",
    segment: "",
    grapeVariety: [],
    regionSelect: "",
    vintage: "",
    awards: "",
    abv: "",
    country: "",
    baseUnitMeasure: "",
    innerUnitMeasure: "",
    configuration: "",
    description: "",
    tags: [],
    salePrice: "",
    buyPrice: "",
    profit: "",
    margin: "",
    tax: "",
    wineEqualisationTax: "",
    landedUnitCost: "",
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

    console.log(values);

  return (
    <>
      <AddProductHeader />
      <div className="grid gap-5 lg:flex  px-6  overflow-y-auto h-96 no-scrollbar">
        {<ProductEditHeader handleSubmit={handleSubmit} />}
        <div className="w-full lg:w-2/5	 h-full	">
          <div className="grid gap-3">
            <UploadImg />

            <AddProductListing values={values}  setValues={setValues} />

            <AddInventory values={values} setValues={setValues} />
          </div>
        </div>
        <div className=" lg:w-3/5 w-full   h-full	 grid gap-3	  ">
          <AddProductDetails values={values} setValues={setValues} />
          <AddPricingDetails />
        </div>
      </div>
    </>
  );
}

export default AddProduct;
