import React, { useState } from "react";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import Alert from '@mui/material/Alert';
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
  defaultPaymentMethodId: "",
  defaultPaymentTerms: "",
  tags: "",
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
  state: "",
  deliveryNotes: "",
  billingAddress: "",
  billingApartment: "",
  billingSuburb: "",
  billingPostalCode: "",
  billingState: "",
  isActive: 0,
};
function CustomerDetails() {
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [isUpdate, setIsUpDate] = useState(false)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      console.log("its working or not");
      console.log("All Vlaues>>", values);
    },
  });
  const finalHandleSubmit = (event) => {
    event.preventDefault();
    console.log("final vales>>>", formik.values);
    fetch("https://customer-api-foboh.azurewebsites.net/api/Customer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer added>>", data);
        if (data.success) {
          window.alert("Customer added successfully!")
          navigate("/dashboard/customers/");
        } else {
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCloseToast = () => {
    setOpenToast(false)
  }
  const onChangeText = () => {
    setIsUpDate(true)
  }
  const handleCancel = () => {
    setIsUpDate(false)
  }
  const handleNext = () => {
    formik.validateForm().then((errors) => {
      console.log("error on submit button click>>", errors)
      if (activeStep !== 2 && Object.values(errors).length === 0) {
        setActiveStep((cur) => cur + 1);
      } else if (activeStep === 2) {
        console.log("Form submitted");
        formik.submitForm();
      }
      console.log("res", errors);
    });
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
      formik.setErrors({})
    }
    else {

    }
    // !isFirstStep && setActiveStep((cur) => cur - 1);
  };
  const handleSubmit = () => {

  }
  return (
    <>
      <div className="mx-auto lg:w-3/5 w-full pb-20 lg:px-20 px-10 custom-stepper">
        {isUpdate && (
          <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button onClick={handleCancel} className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	">
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
          <Step onClick={() => setActiveStep(0)}>
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
          <Step onClick={() => setActiveStep(1)}>
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
          <Step onClick={() => setActiveStep(2)}>
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
      <form onChange={onChangeText} className=" mx-auto lg:w-3/5 w-full   rounded-lg		 border border-inherit bg-white h-85	overflow-y-scroll		 flex flex-col	  ">
        {activeStep === 0 ? (
          <CustomerDetailsFirst
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
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
          />
        ) : null}
        <div className="px-6 pb-7 flex justify-between">
          {activeStep > 0 ?
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              Prev
            </Button> :
            <div></div>
          }
          {isLastStep ? (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={finalHandleSubmit}
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
