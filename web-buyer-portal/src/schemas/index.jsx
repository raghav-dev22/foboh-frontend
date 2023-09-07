import * as Yup from "yup";

//Sign-in Schema
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email."),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

//Sign-in Schema
export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("Name is required")
    .max(50),

  email: Yup.string().required("Email is required").email("Invalid is email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Personal Details Schema
export const stepOneSchema = Yup.object().shape({
  BusinessName: Yup.string()
    .min(2, "Your business name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Business name should not contain numbers")
    .required("business name is required"),
  ABN: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),
  LiquerLicence: Yup.string()
    .min(2, "Your Liquor licence should have at least 2 letters")
    .max(13, "Liquor licence cannot be more than 13 characters")
    .required("Liquor licence is required"),
});

export const stepTwoSchema = Yup.object().shape({
  DeliveryAddress: Yup.string()
    .min(2, "Delivery address should have atleast 2 letters")
    .max(50)
    .required("Delivery address is required"),
  Apartment: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  Suburb: Yup.string()
    .required("Suburb is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  Postcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  Notes: Yup.string()
    .required("Notes is required")
    .min(2, "Notes should have atleast 2 letters")
    .max(50),
  DeliveryAddressState: Yup.mixed().required("State is required"),
});

export const stepThreeSchema = Yup.object().shape({
  FirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  LastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  email: Yup.string().required("Email is required").email("Invalid is email"),
  Mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  OrderContactState: Yup.string().required("State is required"),

  //Ordering Schema
  OrderingContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  OrderingContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  OrderingContactEmail: Yup.string()
    .required("Email is required")
    .email("Invalid is email"),
  OrderingContactMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  //Delivery Schema
  DeliveryContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  DeliveryContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  DeliveryContactEmail: Yup.string()
    .required("Email is required")
    .email("Invalid is email"),
  DeliveryContactMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});

export const ProfileEditSchema = Yup.object().shape({
  BusinessName: Yup.string()
    .min(2, "Your business name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Business name should not contain numbers")
    .required("business name is required"),
  ABN: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),
  LiquerLicence: Yup.string()
    .min(2, "Your Liquor licence should have at least 2 letters")
    .max(13, "Liquor licence cannot be more than 13 characters")
    .required("Liquor licence is required"),
  //Ordering Schema
  OrderingContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  OrderingContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  // OrderingContactEmail: Yup.string()
  //   .required("Email is required")
  //   .email("Invalid is email"),
  OrderingContactMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  //Delivery Schema
  DeliveryContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  DeliveryContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  DeliveryContactEmail: Yup.string()
    .required("Email is required")
    .email("Invalid is email"),
  DeliveryContactMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});

// Delivery and billing Address Schema

export const DeliveryBillingSchema = Yup.object().shape({
  DeliveryAddress: Yup.string()
    .min(2, "Delivery address should have atleast 2 letters")
    .max(50)
    .required("Delivery address is required"),
  Apartment: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  City: Yup.string()
    .required("City is required")
    .min(2, "City should have atleast 2 letters")
    .max(50),
  Postcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  Notes: Yup.string()
    .required("Notes is required")
    .min(2, "Notes should have atleast 2 letters")
    .max(50),
  DeliveryAddressState: Yup.mixed().required("State is required"),
  Country: Yup.string()
    .required("Country is required")
    .min(2, "Country should have atleast 2 letters")
    .max(50),
  // billing
  BillingAddress: Yup.string()
    .min(2, "Delivery address should have atleast 2 letters")
    .max(50)
    .required("Delivery address is required"),
  BillingApartment: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  // State: Yup.string()
  //   .required("Apartment is required")
  //   .min(2, "State should have atleast 2 letters")
  //   .max(50),
  BillingCity: Yup.string()
    .required("City is required")
    .min(2, "City should have atleast 2 letters")
    .max(50),
  BillingPostcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  BillingNotes: Yup.string()
    .required("Notes is required")
    .min(2, "Notes should have atleast 2 letters")
    .max(50),
  BillingAddressState: Yup.mixed().required("State is required"),
});

export const BillingAddressSchema = Yup.object().shape({
  FirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  LastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  Country: Yup.string()
    .min(2, "Country/Region should have atleast 2 letters")
    .max(50)
    .required("Country/Region is required"),
  Company: Yup.string()
    .min(2, "Your  Company name should have atleast 2 letters")
    .required(" Company name is required")
    .max(50),
  Apartment: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  City: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  Postcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  Mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  State: Yup.mixed().required("State is required"),
});
export const DeliveryAddressSchema = Yup.object().shape({
  FirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
    .max(50),
  LastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .required("last name is required")
    .max(50),
  Country: Yup.string()
    .min(2, "Country/Region should have atleast 2 letters")
    .max(50)
    .required("Country/Region is required"),
  Company: Yup.string()
    .min(2, "Your  Company name should have atleast 2 letters")
    .required(" Company name is required")
    .max(50),
  Apartment: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  City: Yup.string()
    .required("Apartment is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  Postcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  Mobile: Yup.string().required("Mobile number is required"),
  // .matches(
  //   /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
  //   "Mobile number must be a valid Australian mobile number"
  // ),
  State: Yup.mixed().required("State is required"),
  BusinessName: Yup.string()
    .min(2, "Your business name should have atleast 2 letters")
    .required("business name is required")
    .max(50),
  ABN: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),
  LiquerLicence: Yup.string()
    .min(2, "Your Liquor licence should have at least 2 letters")
    .max(13, "Liquor licence cannot be more than 13 characters")
    .required("Liquor licence is required"),
  Representative: Yup.string()
    .min(2, "Your representative should have atleast 2 letters")
    .required("representative is required")
    .max(50),
  DeliveryInstruction: Yup.string()
    .required("Delivery Instruction/Notes is required")
    .max(50),
  DeliveryContact: Yup.string().required("Mobile number is required"),
  // .matches(
  //   /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
  //   "Mobile number must be a valid Australian mobile number"
  // ),
});
// ordering contact Schema
