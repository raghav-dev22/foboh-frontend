import * as Yup from "yup";

// customers-details Schema
export const AddCustomerSchema = Yup.object().shape({
  BusinessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
  ABN: Yup.string()
    .min(2, "ABN should have atleast 2 letters")
    .max(50)
    .required("ABN is required"),
  LiquorLicence: Yup.string()
    .required("LiquorLicence is required")
    .matches(/^\+\d{1,3}\s?\d{1,14}$/, "LiquorLicence must be a valid number"),

  //customers-contact

  FirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  LastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),
  Email: Yup.string()
    .min(2, "ABN should have atleast 2 letters")
    .max(50)
    .required("ABN is required"),
  Mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\+\d{1,3}\s?\d{1,14}$/, "Mobile number must be a valid number"),
});
