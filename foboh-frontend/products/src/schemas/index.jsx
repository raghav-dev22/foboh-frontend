import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  status: Yup.mixed().required("Status is required"),
  visibility: Yup.boolean(),
  region: Yup.array()
    .required("Region is required")
    .min(1, "Region is required"),
  availableQty: Yup.string().required("Available quantity is required"),
  minimumOrder: Yup.string().required("Minimum order is required"),
  trackInventory: Yup.boolean(),
  stockAlertLevel: Yup.string().required("Stock alert level is required"),
  sellOutOfStock: Yup.boolean(),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must have at least 2 characters"),
  skuCode: Yup.string()
    .required("SKU code is required")
    .min(4, "SKU code must have at least 4 characters"),
  brand: Yup.string()
    .required("Brand is required")
    .min(2, "Brand must have at least 2 characters"),
  department: Yup.object().required("Department is required"),
  category: Yup.object().required("Category is required"),
  subcategory: Yup.object().required("Subcategory is required"),
  segment: Yup.object(),
  grapeVariety: Yup.array(),
  regionSelect: Yup.mixed(),
  vintage: Yup.string(),
  awards: Yup.string(),
  abv: Yup.string(),
  country: Yup.mixed(),
  baseUnitMeasure: Yup.object().required("Base unit measure is required"),
  innerUnitMeasure: Yup.object().required("Inner unit measure is required"),
  configuration: Yup.string(),
  description: Yup.string(),
  tags: Yup.array(),
  salePrice: Yup.string().required("Sale price is required"),
  buyPrice: Yup.string().required("Buy price is required"),
  profit: Yup.string(),
  margin: Yup.string(),
  tax: Yup.string(),
  wineEqualisationTax: Yup.string(),
  landedUnitCost: Yup.string(),
});
