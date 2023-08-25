import React, { useState } from "react";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import Alert from '@mui/material/Alert';
import CustomerDetailsFirst from "./CustomerDetailsFirst";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
// import AlertModal from "../../../products/src/modal/AlertModal";
export const options = [
  { value: 1234, label: "Chocolate" },
  { value: 2345, label: "Strawberry" },
  { value: 3456, label: "Vanilla" },
];
const initialValues = {
  customerId: "",
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
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [isUpdate,setIsUpDate]=useState(false)
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddCustomerSchema,
    onSubmit: (values) => {
      console.log("its working or not");
      console.log("All Vlaues>>", values);
    },
  });

  const finalHandleSubmit = (event) => {
    event.preventDefault();
    if (values?.businessName && values.abn && values.address && values.apartment && values.billingPostalCode) {
      console.log("final vales>>>", values);
      fetch("https://customer-api-foboh.azurewebsites.net/api/Customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
    } else {
      window.alert("Please fill all the filed")
    }

  };
  const handleCloseToast = () => {
    setOpenToast(false)
  }
  console.log("errros", errors)
  const onChangeText=()=>{
    setIsUpDate(true)
  }
  const handleCancel=()=>{
    setIsUpDate(false)
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
          {/* <AlertModal show={show} setShow={(set) => setShow(set)} /> */}
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
            touched={touched}
            options={options}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        ) : activeStep === 1 ? (
          <CustomerContact
            touched={touched}
            options={options}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setValues={setValues}
            errors={errors}
          />
        ) : activeStep === 2 ? (
          <CustomerAddress
            touched={touched}
            options={options}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        ) : null}
        <div className="px-6 pb-7 flex justify-between">
          <Button
            className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
            onClick={handlePrev}
            disabled={isFirstStep}
          >
            Prev
          </Button>
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
