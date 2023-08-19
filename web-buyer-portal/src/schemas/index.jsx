import * as Yup from "yup";

//Sign-up Schema
export const LoginSchema = Yup.object().shape({
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
export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .required("name is required")
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

// Business Details Schema
// export const AccountDetailsSchema = Yup.object().shape({
//   BusinessName: Yup.string()
//     .min(2, "Business name should have atleast 2 letters")
//     .max(50)
//     .required("Business name is required"),

//   ABN: Yup.string()
//     .min(2, "ABN should have atleast 2 letters")
//     .max(50)
//     .required("ABN is required"),
//   LiquerLicence: Yup.string()
//     .required("LiquorLicence is required")
//     .min(2, "ABN should have atleast 2 letters")
//     .max(50),
//   // .matches(/^(?=.*[1-100])+$/, "LiquorLicence must be a valid number"),
//   DeliveryAddress: Yup.string()
//     .min(2, "Delivery address should have atleast 2 letters")
//     .max(50)
//     .required("Delivery address is required"),

//   Apartment: Yup.string()

//     .required("Apartment is required")
//     .min(2, "Suburb should have atleast 2 letters")
//     .max(50),
//   // .matches(/^(?=.*[1-100])+$/, "Apartment must be a valid number"),

//   Suburb: Yup.string()
//     .required("Suburb is required")
//     .min(2, "Suburb should have atleast 2 letters")
//     .max(50),

//   Postcode: Yup.string()
//     .matches(/^\d{4}$/, "Invalid postcode")
//     .required("postcode is required"),

//   Notes: Yup.string()
//     .required("Notes is required")
//     .min(2, "Notes should have atleast 2 letters")
//     .max(50),
//   FirstName: Yup.string()
//     .min(2, "Your first name should have atleast 2 letters")
//     .required("name is required")
//     .max(50),
//   LastName: Yup.string()
//     .min(2, "Your last name should have atleast 2 letters")
//     .required("last name is required")
//     .max(50),
//   email: Yup.string().required("Email is required").email("Invalid is email"),

//   Mobile: Yup.string()
//     .required("Mobile number is required")
//     .matches(/^\+\d{1,3}\s?\d{1,14}$/, "Mobile number must be a valid number"),
// });

export const stepOneSchema = Yup.object().shape({
  BusinessName: Yup.string().required('Business name is required'),
  ABN: Yup.string().required('ABN is required'),
  LiquerLicence: Yup.string().required('Liquor licence is required'),
});

export const stepTwoSchema = Yup.object().shape({
  DeliveryAddress: Yup.string().min(2, "Delivery address should have atleast 2 letters") .max(50).required("Delivery address is required"),
  Apartment: Yup.string().required("Apartment is required").min(2, "Suburb should have atleast 2 letters").max(50),
  Suburb: Yup.string() .required("Suburb is required").min(2, "Suburb should have atleast 2 letters").max(50),
  Postcode: Yup.string() .matches(/^\d{4}$/, "Invalid postcode").required("postcode is required"),
  Notes: Yup.string().required("Notes is required").min(2, "Notes should have atleast 2 letters").max(50),
  DeliveryAddressState : Yup.string().required("State is required"),
});

export const stepThreeSchema = Yup.object().shape({
  FirstName: Yup.string() .min(2, "Your first name should have atleast 2 letters").required("name is required").max(50),
  LastName: Yup.string().min(2, "Your last name should have atleast 2 letters").required("last name is required").max(50),
  email: Yup.string().required("Email is required").email("Invalid is email"),
  Mobile: Yup.string().required("Mobile number is required").matches(/^\+\d{1,3}\s?\d{1,14}$/, "Mobile number must be a valid number"),
  OrderContactState : Yup.string().required("State is required"),

 });


// Delivery Address Schema

// ordering contact Schema
