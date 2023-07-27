import * as Yup from "yup";

//Reset Password Schema
export const ResetPasswordEmailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid is email")
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
  email: Yup.string().required("Email is required").email("Invalid is email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
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
      /^\+\d{1,3}\s?\d{1,14}$/,
      "Mobile number must be a valid number with country code"
    ),
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
});

// Sign-in Schema
export const SignInSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid is email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Personal Details Schema [User Profile]
export const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50),
  lastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50),
  email: Yup.string().email("Invalid is email"),
  mobile: Yup.string().matches(
    /^\+\d{1,3}\s?\d{1,14}$/,
    "Mobile number must be a valid number with country code"
  ),
  bio: Yup.string(),
});

export const OrganisationSettingsSchema = Yup.object().shape({
  //Organization Details
  tradingName: Yup.string()
    .min(2, "Your trading name should have atleast 2 letters")
    .max(50),
  businessName: Yup.string()
    .min(2, "Your business name should have atleast 2 letters")
    .max(50),
  abn: Yup.string().matches(/^\d{11}$/, "Invalid ABN format"),
  liquorLicence: Yup.string().matches(
    /^\d{11}$/,
    "Invalid liquorLicence format"
  ),

  //Organization Address
  organisationAddress: Yup.string()
    .min(10, "Your address should have atleast 10 letters")
    .max(100),
  organisationAddressApartment: Yup.string()
    .min(2, "Your apartment should have atleast 2 letters")
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
  billingAddressApartment: Yup.string()
    .min(2, "Your apartment should have atleast 2 letters")
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
  orderingContactEmail: Yup.string().email("Invalid is email"),
  orderingContactMobile: Yup.string().matches(
    /^\+\d{1,3}\s?\d{1,14}$/,
    "Mobile number must be a valid number with country code"
  ),

  // Logistics Contacts
  LogisticsContactFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50),
  LogisticsContactLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50),
  LogisticsContactEmail: Yup.string().email("Invalid is email"),
  LogisticsContactMobile: Yup.string().matches(
    /^\+\d{1,3}\s?\d{1,14}$/,
    "Mobile number must be a valid number with country code"
  ),
});

