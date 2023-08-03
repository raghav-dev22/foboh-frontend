import React from "react";
// import { Formik } from "formik";
import { useFormik } from "formik";
// import { AddCustomerSchema } from "../schemas";
import { AddCustomerSchema } from "../schemas";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

// import { Stepper, Step, Button } from "@material-tailwind/react";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import CustomerDetailsFirst from "./CustomerDetailsFirst";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const initialValues = {
  businessName: "string",
  abn: "string",
  liquorLicence: "string",
  salesRepId: "string",
  pricingProfileId: "string",
  defaultPaymentMethodId: "string",
  tags: "string",
  wetLiable: true,
  orderingFirstName: "string",
  orderingLastName: "string",
  orderingMobile: "string",
  orderingEmail: "string",
  deliveryFirstName: "string",
  deliveryLastName: "string",
  deliveryMobile: "string",
  deliveryEmail: "string",
  address: "string",
  apartment: "string",
  suburb: "string",
  postalCode: "string",
  state: "string",
  deliveryNotes: "string",
  billingAddress: "string",
  billingApartment: "string",
  billingSuburb: "string",
  billingPostalCode: "string",
  billingState: "string",
  isActive: 0,
};

function CustomerDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  // const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const handleNext = () => {
    // if (active === 2) {
    // } else {
    !isLastStep && setActiveStep((cur) => cur + 1);
    // setActiveStep((cur) => cur + 1);
    // }
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    // if (active === 0) {

    // }
    // else {
    // setActiveStep((cur) => cur - 1);
    // }
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
  const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ];
  const handleSubmit12 = () => {
    console.log("final vales>>>", values);
  };
  return (
    <>
      {/* <div className="flex justify-between mx-auto lg:w-3/5 w-full pb-10 relative	px-4">
        <div className="details-box  flex flex-col gap-2	 items-center justify-center">
          <div className="box-1 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">1</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer details
          </h5>
        </div>
        <div className="line-1 border-[#0000005e] bg-[#0000005e]  absolute"></div>
        <div className="contact-box flex flex-col gap-2 items-center justify-center">
          <div className="box-2 flex justify-center items-center bg-dark-gray w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">2</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer Contact
          </h5>
        </div>
        <div className="line-2 absolute"></div>
        <div className="address-box  flex flex-col gap-2 items-center justify-center   ">
          <div className="box-3 flex justify-center items-center bg-dark-gray w-5	h-5 rounded-full	">
            <p className="text-white font-normal text-xs">3</p>
          </div>
          <h5 className="text-base	text-center text-darkGreen font-medium	">
            Customer Address
          </h5>
        </div>
      </div> */}
      <div className="mx-auto lg:w-3/5 w-full pb-20 lg:px-20 px-10 custom-stepper">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
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

      <form className=" mx-auto lg:w-3/5 w-full   rounded-lg		 border border-inherit bg-white h-80	overflow-y-scroll		 flex flex-col	  ">
        {activeStep === 0 ? (
          <CustomerDetailsFirst
            touched={touched}
            options={options}
            values={values}
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
          <Button
            className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
            onClick={handleNext}
            disabled={isLastStep}
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
}

export default CustomerDetails;
