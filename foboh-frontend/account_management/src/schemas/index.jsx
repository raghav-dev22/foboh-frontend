import * as Yup from "yup";

//Reset Password Schema
export const ResetPasswordEmailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email."),
});

export const ResetPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  repeatPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match, please try again"
    ),
}); 

//Sign-up Schema
export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Registration Form Schema
export const RegistrationSchema = Yup.object().shape({
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

// Sign-in Schema
export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
 
// Personal Details Schema [User Profile]
export const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Your first name should have at least 2 letters")
    .max(50),
  lastName: Yup.string()
    .min(2, "Your last name should have at least 2 letters")
    .max(50),
  email: Yup.string().email("Please enter a valid email"),
  mobile: Yup.string().matches(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
    "Mobile number must be a valid Australian mobile number"
  ),
  bio: Yup.string().max(255, "Bio cannot be more than 255 characters"), // Set max limit to 225 and error message
});

export const OrganisationSettingsSchema = Yup.object().shape({
  //Organization Details
  tradingName: Yup.string()
    .min(2, "Your trading name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Trading name is required"),
  businessName: Yup.string()
    .min(2, "Your business name should have at least 2 letters")
    .max(50)
    .matches(/^[^\d]*$/, "Business name should not contain numbers")
    .required("Business name is required"),
    abn: Yup.string().matches(/^\d{11}$/, "Invalid ABN format").required('ABN is required'),
    liquorLicence: Yup.string().max(13, "Liquor licence cannot be more than 13 characters").required("Liquor licence is required"),
    description: Yup.string().max(255, "Bio cannot be more than 255 characters"),

  //Organization Address
  organisationAddress: Yup.string()
    .min(10, "Your address should have atleast 10 letters")
    .max(100),
  organisationAddressSuburb: Yup.string()
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  organisationAddressPostcode: Yup.string().matches(
    /^\d{4}$/,
    "Invalid postcode"
  ),

  // Billing address
  billingAddress: Yup.string()
    .min(10, "Your address should have atleast 10 letters")
    .max(100),
  billingAddressSuburb: Yup.string()
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),
  billingAddressPostcode: Yup.string().matches(/^\d{4}$/, "Invalid postcode"),

  // Ordering contact
  orderingContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50),
  orderingContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50),
  orderingContactEmail: Yup.string().email("Please enter a valid email"),
  orderingContactMobile: Yup.string().matches(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
    "Mobile number must be a valid Australian mobile number"
  ),

  // Logistics Contacts
  LogisticsContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50),
  LogisticsContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50),
  LogisticsContactEmail: Yup.string().email("Please enter a valid email"),
  LogisticsContactMobile: Yup.string().matches(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
    "Mobile number must be a valid Australian mobile number"
  ),
});
