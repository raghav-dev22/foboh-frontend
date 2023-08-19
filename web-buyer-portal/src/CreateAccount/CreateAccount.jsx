import React, { useState } from "react";

import { Stepper, Step, Button } from "@material-tailwind/react";
import BusinessDetails from "./BusinessDetails";
import DeliveryAddress from "./DeliveryAddress";
import OrderContact from "./OrderContact";
import SuccessModal from "../modal/SuccessModal";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "../schemas";

import { useFormik } from "formik";



function CreateAccount() {
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const [currentStep, setCurrentStep]  = useState(0)

  const formik =
    useFormik({
      initialValues: {
        BusinessName: "",
        ABN: "",
        LiquerLicence: "",
        DeliveryAddress: "",
        Apartment: "",
        Suburb: "",
        Postcode: "",
        Notes: "",
        FirstName: "",
        LastName: "",
        email: "",
        Mobile: "",
        DeliveryAddressState : "",
        OrderContactState: ""
      },
      validationSchema: validationSchemas[currentStep],
      onSubmit: (values) => {
        console.log(values, "saksii");
        setShow(true);
      },
    });

  // const handleNext = () => {
  //   !isLastStep && setActiveStep((cur) => cur + 1);
  // };
  const [show, setShow] = useState(false);
 

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  // const handleNext = () => {
  //   let isStepValid = true;
  
  //   if (activeStep === 0) {
  //     const step0Errors = Object.keys(errors).filter(
  //       (key) =>
  //         key.startsWith("BusinessName") ||
  //         key.startsWith("ABN") ||
  //         key.startsWith("LiquerLicence")
  //     );
  //     if (step0Errors.length > 0) {
  //       isStepValid = false;
  //     }
  //   } else if (activeStep === 1) {
  //     const step1Errors = Object.keys(errors).filter(
  //       (key) =>
  //         key.startsWith("DeliveryAddress") ||
  //         key.startsWith("Apartment") ||
  //         key.startsWith("Suburb") ||
  //         key.startsWith("Postcode")
  //     );
  //     if (step1Errors.length > 0) {
  //       isStepValid = false;
  //     }
  //   }
  
  //   if (isStepValid) {
  //     setActiveStep((cur) => cur + 1);
  //   } else {
  //     console.log("error");
  //   }
  // };
  
  const handleNext = () => {
    const currentValidationSchema = validationSchemas[currentStep];
    formik.validateForm().then(errors => {
       if (currentStep !== 2 && Object.values(errors).length === 0 ) { // Assuming 2 corresponds to the index of the 3rd step
        // Handle the final form submission, for example, call an API or perform other actions
        setCurrentStep((cur) => cur + 1);

      } else if (currentStep === 2) {
        console.log("Form submitted");
        formik.submitForm();
      }
      console.log("res",errors);
    })
  };
  

  return (
    <>
      <div className=" bg-[#F8FAFC]  w-full flex items-center justify-center top-0 left-0 bottom-0 right-0 h-full">
        <div className="lg:container container-fluid mx-auto lg:px-6  px-0">
          <div className="w-full lg:scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white  ">
              <div className="    block md:hidden">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-36	object-cover	 w-full  "
                  alt="signin"
                />
              </div>
              <form
                className="w-full md:w-1/2 lg:ps-12  py-8  md:bg-white bg-[#F8FAFC] px-4 sm:px-6 md:px-8 lg:px-10"
                
              >
                <Stepper
                  activeStep={currentStep}
                  isLastStep={(value) => setIsLastStep(value)}
                  className="mt-8 mb-14"
                >
                  <Step
                    onClick={() => setCurrentStep(0)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">1</p>
                  </Step>
                  <Step
                    onClick={() => setCurrentStep(1)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">2</p>
                  </Step>
                  <Step
                    onClick={() => setCurrentStep(2)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">3</p>
                  </Step>
                </Stepper>
                {currentStep === 0 && (
                  <BusinessDetails
                    values={formik.values}
                    errors={formik.errors}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched}
                  />
                )  
                }
                {
                currentStep === 1 && (
                  <DeliveryAddress
                    values={formik.values}
                    errors={formik.errors}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched}
                    setValues={formik.setValues}
                  />
                ) 
                }
                {
                 currentStep === 2 && (
                  <>
                    <OrderContact
                      values={formik.values}
                    errors={formik.errors}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched}
                    setValues={formik.setValues}
                    />
                  </>
                ) 
                }

                {currentStep ===2  ? (
                  <Button
                    onClick={formik.submitForm}
                    className="login-btn bg-custom-blue rounded-md	w-full p-3 custom-shadow"
                    // onClick={submit}
                  >
                    <p className="text-white text-center font-semibold	text-sm	 ">
                      Done
                    </p>
                  </Button>
                ) : (
                  <button type="button" onClick={handleNext} disabled={!formik.isValid || formik.isSubmitting}>
        Next
      </button>
                )}
              </form>
              <div className="  md:basis-1/2  hidden md:block ">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-full w-full  "
                  alt="signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal show={show} setShow={(set) => setShow(set)} />
    </>
  );
}

export default CreateAccount;
