import * as Yup from "yup";

export const deliveryContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});


export const deliveryAddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(10, "Your address should have atleast 10 letters")
    .max(100),
  apartment: Yup.string(),
  suburb: Yup.string().min(2, "Suburb should have atleast 2 letters").max(50),
  postcode: Yup.string().matches(/^\d{4}$/, "Invalid postcode"),
  state: Yup.mixed().required("State is required"),
});

export const billingAddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(10, "Your address should have atleast 10 letters")
    .max(100),
  apartment: Yup.string(),
  suburb: Yup.string().min(2, "Suburb should have atleast 2 letters").max(50),
  postcode: Yup.string().matches(/^\d{4}$/, "Invalid postcode"),
  state: Yup.mixed().required("State is required"),
});


export const BankingSchema = Yup.object().shape({
  LegalBusiness: Yup.string()
    .min(2, "Your trading name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Trading name is required"),

  ACNABN: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),

  BusinessAddress: Yup.string()
    .min(2, "Your trading name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Trading name is required"),

  Suburb: Yup.string()
    .required("Suburb name is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),

  Postcode: Yup.string()
    .required("Postcode name is required")
    .matches(/^\d{4}$/, "Invalid postcode"),
  State: Yup.mixed().required("state is required"),

  BSB: Yup.string()
    .required("BSB Number is required")
    .matches(/^[0-9]{6}$/, "Mobile number must be a 6-digit number"),
  AccountNumber: Yup.string()
    .required("Account Number is required")
    .matches(
      /^[A-Za-z0-9]{16}$/,
      "IBAN must be 16 characters containing numbers and letters"
    ),

  StatementDescriptor: Yup.string().required("StatementDescriptor is required"),
  BusinessName: Yup.mixed().required("BusinessName is required"),

  PhoneNumber: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
});


