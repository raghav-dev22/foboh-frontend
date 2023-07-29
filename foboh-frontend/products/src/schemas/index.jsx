import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  status: Yup.mixed(),
  visibility: Yup.boolean(),
  region: Yup.array(),
  minimumOrder: Yup.string(),
  trackInventory: Yup.boolean(),
  stockAlertLevel: Yup.string(),
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
  baseUnitMeasure: Yup.object(),
  innerUnitMeasure: Yup.object(),
  configuration: Yup.string(),
  description: Yup.string(),
  tags: Yup.array(),
  salePrice: Yup.string(),
  buyPrice: Yup.string(),
  profit: Yup.string(),
  margin: Yup.string(),
  tax: Yup.string(),
  wineEqualisationTax: Yup.string(),
  landedUnitCost: Yup.string(),
});
