import React from "react";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import CustomerDetailsFirst from "./CustomerDetailsFirst";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
export const options = [
  { value: 1234, label: "Chocolate" },
  { value: 2345, label: "Strawberry" },
  { value: 3456, label: "Vanilla" },
];
const initialValues = {
  businessName: "test",
  abn: "",
  liquorLicence: "",
  salesRepId: "",
  pricingProfileId: "",
  defaultPaymentMethodId: "",
  defaultPaymentTerms : "",
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

  console.log("All customer Vlaues>>", values);


  const finalHandleSubmit = () => {
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
          console.log("navigate")
          navigate('/dashboard/customers/')
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="mx-auto lg:w-3/5 w-full pb-20 lg:px-20 px-10 custom-stepper">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => {
            // console.log("last is>>", value)
            setIsLastStep(value)
          }}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            1
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
            2
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
            3
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
      <form className=" mx-auto lg:w-3/5 w-full   rounded-lg		 border border-inherit bg-white h-85	overflow-y-scroll		 flex flex-col	  ">
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
          {isLastStep ?
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={finalHandleSubmit}
            >
              Submit
            </Button> :
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handleNext}
              disabled={isLastStep}
            >
              Next
            </Button>}
        </div>
      </form>
    </>
  );
}

export default CustomerDetails;
