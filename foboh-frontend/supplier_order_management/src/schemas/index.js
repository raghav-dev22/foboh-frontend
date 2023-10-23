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
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
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
