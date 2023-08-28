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
  const [currentStep, setCurrentStep] = useState(0);
  
  const formik = useFormik({
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
      DeliveryAddressState: "",
      OrderContactState: "",
      OrderingContactFirstName : "",
      OrderingContactLastName : "",
      OrderingContactEmail : "",
      OrderingContactMobile : "",
      DeliveryContactFirstName : "",
      DeliveryContactLastName : "" ,
      DeliveryContactEmail :"",
      DeliveryContactMobile :"",
    },
    validationSchema: validationSchemas[currentStep],
  });
  const [show, setShow] = useState(false);
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  
  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (currentStep < 2 && Object.values(errors).length === 0) {
        setCurrentStep((cur) => cur + 1);
      } else if (currentStep === 2) {
        console.log("Form submitted");
        formik.submitForm();
      }
      console.log("res", errors);
    }).catch(error => console.log(error))
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((cur) => cur - 1);
      formik.setErrors({})
    }
    else {

    }
  }
  const onSubmit=(values) => {
    setShow(true);
  }

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
              <form className="w-full md:w-1/2 lg:ps-12  py-8  md:bg-white bg-[#F8FAFC] px-4 sm:px-6 md:px-8 lg:px-10">
                <Stepper
                  activeStep={currentStep}
                  isLastStep={(value) => setIsLastStep(value)}
                  className="mt-8 mb-14"
                >
                  <Step
                    onClick={handleNext}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">1</p>
                  </Step>
                  <Step
                    onClick={handleNext}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">2</p>
                  </Step>
                  <Step
                    onClick={handleNext}
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
                    setValues={formik.setValues}
                  />
                )}
                {currentStep === 1 && (
                  <DeliveryAddress
                    values={formik.values}
                    errors={formik.errors}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched}
                    setValues={formik.setValues}
                  />
                )}
                {currentStep === 2 && (
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
                )}

                {currentStep === 2 ? (
                  <div className="flex justify-between">
                    <button
                      className="login-btn bg-transparent border-2 border-[#563fe3] rounded-md w-36 p-3 custom-shadow mx-1"
                      type="button"
                      onClick={handleBack}
                    >
                      <p className="text-custom-blue text-center font-semibold text-sm">
                        Back
                      </p>
                    </button>
                    <Button
                      // onClick={formik.submitForm}
                      className="login-btn bg-custom-blue rounded-md	w-36 p-3 custom-shadow"
                      onClick={onSubmit}
                    >
                      <p className="text-white text-center font-semibold	text-sm	 ">
                        Save
                      </p>
                    </Button>
                  </div>
                ) : (
                  <div className="items-start	flex justify-between">
                    {currentStep > 0 && (
                      <button
                        className="login-btn bg-transparent border-2 border-[#563fe3] rounded-md w-36 p-3 custom-shadow mx-1"
                        type="button"
                        onClick={handleBack}
                      >
                        <p className="text-custom-blue text-center font-semibold text-sm">
                          Back
                        </p>
                      </button>
                    )}
                    <button
                      className={`login-btn bg-custom-blue rounded-md p-3 custom-shadow mx-1 ${currentStep === 0 ? "w-full" : "w-36"
                        }`}
                      type="button"
                      onClick={handleNext}
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      <p className="text-white text-center font-semibold text-sm">
                        {currentStep === 1 ? "Next" : "Next"}
                      </p>
                    </button>
                  </div>

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
      <SuccessModal show={show} setShow={setShow} />
    </>
  );
}

export default CreateAccount;
