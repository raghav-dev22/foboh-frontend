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
  liquorLicence: Yup.string().max(13, "Liquor licence cannot be more than 13 characters"),

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
