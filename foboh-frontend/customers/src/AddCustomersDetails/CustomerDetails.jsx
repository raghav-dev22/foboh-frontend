import React, { useState } from "react";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import Alert from "@mui/material/Alert";
import CustomerDetailsFirst from "./CustomerDetailsFirst";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "../schemas";
import Toast from "../Toast";
export const options = [
  { value: 1234, label: "Chocolate" },
  { value: 2345, label: "Strawberry" },
  { value: 3456, label: "Vanilla" },
];
const initialValues = {
  buyerId: "",
  businessName: "",
  abn: "",
  liquorLicence: "",
  salesRepId: "",
  pricingProfileId: "",
  defaultPaymentTerms: "",
  defaultPaymentMethodId: "",
  tags: "",
  organisationId: "",
  wetLiable: true,
  orderingFirstName: "",
  orderingLastName: "",
  orderingMobile: "",
  orderingEmail: "",
  deliveryFirstName: "",
  deliveryLastName: "",
  deliveryMobile: "",
  deliveryEmail: "",
  address: "",
  apartment: "",
  suburb: "",
  postalCode: "",
  state: {},
  deliveryNotes: "",
  billingAddress: "",
  billingApartment: "",
  billingSuburb: "",
  billingPostalCode: "",
  billingState: {},
  isActive: true,
};

function CustomerDetails() {
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [isUpdate, setIsUpDate] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      console.log("All Vlaues>>", values);
    },
  });
  const handleSubmit = () => {
    console.log(">>>>>>>>>>>");
    // e.preventDefault();
    fetch(
      "https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(formik.values),
        body: JSON.stringify({
          buyerId: formik.values.buyerId,
          businessName: formik.values.businessName,
          abn: formik.values.abn,
          liquorLicence: formik.values.liquorLicence,
          salesRepId: formik.values.salesRepId.label,
          pricingProfileId: formik.values.pricingProfileId.label,
          defaultPaymentTerms: formik.values.defaultPaymentTerms.label,
          defaultPaymentMethodId: formik.values.defaultPaymentMethodId.label,
          tags: formik.values.tags.label,
          organisationId: formik.values.organisationId,
          wetLiable: true,
          orderingFirstName: formik.values.orderingFirstName,
          orderingLastName: formik.values.orderingLastName,
          orderingMobile: formik.values.orderingMobile,
          orderingEmail: formik.values.orderingEmail,
          deliveryFirstName: formik.values.deliveryFirstName,
          deliveryLastName: formik.values.deliveryLastName,
          deliveryMobile: formik.values.deliveryMobile,
          deliveryEmail: formik.values.deliveryEmail,
          address: formik.values.address,
          apartment: formik.values.apartment,
          suburb: formik.values.suburb,
          postalCode: formik.values.postalCode,
          state: formik.values.state.label,
          deliveryNotes: formik.values.deliveryNotes,
          billingAddress: formik.values.billingAddress,
          billingApartment: formik.values.billingApartment,
          billingSuburb: formik.values.billingSuburb,
          billingPostalCode: formik.values.billingPostalCode,
          billingState: formik.values.billingState.label,
          isActive: "1",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer added>>", data);
        window.alert("Customer added successfully!");
        navigate("/dashboard/customers/");
      })
      .catch((error) => console.log(error));
  };
  const handleCloseToast = () => {
    setOpenToast(false);
  };
  const onChangeText = () => {
    setIsUpDate(true);
  };
  const handleCancel = () => {
    setIsUpDate(false);
    formik.setValues(initialValues);
  };
  const handleNext = () => {
    formik.validateForm().then((errors) => {
      console.log("error on submit button click>>", errors);
      if (activeStep !== 2 && Object.values(errors).length === 0) {
        setActiveStep((cur) => cur + 1);
      } else if (
        activeStep === 2 &&
        Object.values(errors).length === 0 &&
        Object.values(formik.values).some(
          (value) => value == !null || value == !""
        )
      ) {
        console.log("Form submitted");
        formik.submitForm();
        handleSubmit();
      }
    });
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
      formik.setErrors({});
      formik.setValues(formik.values);
    }
  };

  return (
    <>
      <div className="mx-auto lg:w-3/5 w-full pb-20 lg:px-20 px-10 custom-stepper">
        {isUpdate && (
          <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button
                    onClick={handleCancel}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
                    Save
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => {
            setIsLastStep(value);
          }}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              1
            </h5>

            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 0
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer details
              </Typography>
            </div>
          </Step>
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              2
            </h5>
            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 1
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer contacts
              </Typography>
            </div>
          </Step>
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              3
            </h5>
            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 2
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer addresses.
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      <form
        onChange={onChangeText}
        className=" mx-auto lg:w-3/5 w-full   rounded-lg		 border border-inherit bg-white h-96	overflow-y-scroll		 flex flex-col	  "
      >
        {activeStep === 0 ? (
          <CustomerDetailsFirst
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            setIsUpDate={setIsUpDate}
          />
        ) : activeStep === 1 ? (
          <CustomerContact
            touched={formik.touched}
            options={options}
            values={formik.values}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            setValues={formik.setValues}
            errors={formik.errors}
          />
        ) : activeStep === 2 ? (
          <CustomerAddress
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            setIsUpDate={setIsUpDate}
          />
        ) : null}
        <div className="px-6 pb-7 flex justify-between">
          {activeStep > 0 ? (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              Prev
            </Button>
          ) : (
            <div></div>
          )}
          {isLastStep ? (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handleNext}
              // onClick={{ finalHandleSubmit(); handleNext(); }}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handleNext}
              disabled={isLastStep}
            >
              Next
            </Button>
          )}
        </div>
      </form>
      <Toast
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  );
}

export default CustomerDetails;
