import * as Yup from "yup";

// customers-details Schema
export const AddCustomerSchema = Yup.object().shape({
  businessName: Yup.string()
    .max(50)
    .min(2, "Business name should have atleast 2 letters")
    .required("Business name is required"),
  abn: Yup.string()
    .min(2, "ABN should have atleast 2 letters")
    .max(50)
    .required("ABN is required"),
  // liquorLicence: Yup.string()
  liquorLicence: Yup.string().max(
    13,
    "Liquor licence cannot be more than 13 characters"
  ).required("Liquor licence is required"),

  //customers-contact

  orderingFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  orderingLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  deliveryFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  deliveryLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  orderingEmail: Yup.string().email("Please enter a valid email"),

  orderingMobile: Yup.string().matches(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
    "Mobile number must be a valid Australian mobile number"
  ),

  deliveryEmail: Yup.string().email("Please enter a valid email"),

  deliveryMobile: Yup.string().matches(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
    "Mobile number must be a valid Australian mobile number"
  ),

  address: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  suburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb is required"),

  postalCode: Yup.string().matches(/^\d{4}$/, "Invalid postcode"),
  deliveryNotes: Yup.string()
    .min(2, "postalCode should have atleast 5 letters")
    .max(50)
    .required("postalCode name is required"),
  billingSuburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb  is required"),

  billingPostalCode: Yup.string().matches(/^\d{4}$/, "Invalid postcode"),
});

// export const addProductSchema = Yup.object().shape({
//   status: Yup.mixed().required("Status is required"),
//   visibility: Yup.boolean(),
//   region: Yup.array()
//     .required("Region is required")
//     .min(1, "Region is required"),
//   availableQty: Yup.string().required("Available quantity is required"),
//   minimumOrder: Yup.string().required("Minimum order is required"),
//   trackInventory: Yup.boolean(),
//   stockAlertLevel: Yup.string().required("Stock alert level is required"),
//   title: Yup.string()
//     .required("Title is required")
//     .min(2, "Title must have at least 2 characters"),
//   skuCode: Yup.string()
//     .required("SKU code is required")
//     .min(4, "SKU code must have at least 4 characters"),
//   brand: Yup.string()
//     .required("Brand is required")
//     .min(2, "Brand must have at least 2 characters"),
//   department: Yup.object().required("Department is required"),
//   category: Yup.object().required("Category is required"),
//   subcategory: Yup.object().required("Subcategory is required"),
//   segment: Yup.mixed(),
//   grapeVariety: Yup.array(),
//   regionSelect: Yup.mixed(),
//   vintage: Yup.string(),
//   awards: Yup.string(),
//   abv: Yup.string(),
//   country: Yup.mixed(),
//   baseUnitMeasure: Yup.object().required("Base unit measure is required"),
//   innerUnitMeasure: Yup.object().required("Inner unit measure is required"),
//   configuration: Yup.string(),
//   description: Yup.string(),
//   tags: Yup.array(),
//   salePrice: Yup.string().required("Sale price is required"),
//   buyPrice: Yup.string().required("Buy price is required"),
//   profit: Yup.string(),
//   margin: Yup.string(),
//   tax: Yup.string(),
//   wineEqualisationTax: Yup.string(),
//   landedUnitCost: Yup.string(),
// });

export const stepOneSchema = Yup.object().shape({
  businessName: Yup.string()
    .max(50)
    .min(2, "Business name should have atleast 2 letters")
    .required("Business name is required"),
  abn: Yup.string()
    .min(2, "ABN should have atleast 2 letters")
    .max(50)
    .required("ABN is required"),
  // liquorLicence: Yup.string()
  liquorLicence: Yup.string().max(
    13,
    "Liquor licence cannot be more than 13 characters"
  ).required("Liquor licence is required"),
  salesRepId: Yup.mixed().required("State is required"),
  pricingProfileId: Yup.mixed().required("State is required"),
  defaultPaymentTerms: Yup.mixed().required("State is required"),
  defaultPaymentMethodId: Yup.mixed().required("State is required"),
  tags: Yup.mixed().required("State is required"),
});

export const stepTwoSchema = Yup.object().shape({
  orderingFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  orderingLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  deliveryFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  deliveryLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  orderingEmail: Yup.string()
    .required("Email name is required")
    .email("Please enter a valid email"),

  orderingMobile: Yup.string()
    .required("Mobile name is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  deliveryEmail: Yup.string()
    .required("Email name is required")
    .email("Please enter a valid email"),

  deliveryMobile: Yup.string()
    .required("Mobile name is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});

export const stepThreeSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),
    apartment: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  suburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb is required"),

  postalCode: Yup.string().matches(/^\d{4}$/, "Invalid postcode").required("suburb is required"),
  deliveryNotes: Yup.string()
    .min(2, "postalCode should have atleast 5 letters")
    .max(50)
    .required("postalCode name is required"),

    billingAddress: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),
    billingApartment: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),


  billingSuburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb  is required"),

  billingPostalCode: Yup.string().matches(/^\d{4}$/, "Invalid postcode").required("suburb is required"),

});
