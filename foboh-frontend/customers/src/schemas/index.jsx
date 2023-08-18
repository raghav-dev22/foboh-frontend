import * as Yup from "yup";

// customers-details Schema
export const AddCustomerSchema = Yup.object().shape({
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
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
  orderingEmail: Yup.string()
    .min(2, "Email should have atleast 2 letters")
    .max(50)
    .required("Email is required"),
  orderingMobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\+\d{1,3}\s?\d{1,14}$/, "Mobile number must be a valid number"),
  deliveryEmail: Yup.string()
    .min(2, "Email should have atleast 2 letters")
    .max(50)
    .required("Email is required"),
  deliveryMobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\+\d{1,3}\s?\d{1,14}$/, "Mobile number must be a valid number"),

  address: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  suburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb is required"),
  postalCode: Yup.string()
    .min(2, "postalCode should have atleast 5 letters")
    .max(50)
    .required("postalCode is required"),
  deliveryNotes: Yup.string()
    .min(2, "postalCode should have atleast 5 letters")
    .max(50)
    .required("postalCode name is required"),
  billingSuburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb  is required"),
  billingPostalCode: Yup.string()
    .min(2, "postalCode should have atleast 5 letters")
    .max(50)
    .required("postalCode is required"),
});
