import React, { useState } from "react";

import { Stepper, Step, Button } from "@material-tailwind/react";
import BusinessDetails from "./BusinessDetails";
import DeliveryAddress from "./DeliveryAddress";
import OrderContact from "./OrderContact";
import SuccessModal from "../modal/SuccessModal";
import { AccountDetailsSchema } from "../schemas";

import { useFormik } from "formik";
function CreateAccount() {
  const initialValues = {
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
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AccountDetailsSchema,
      onSubmit: (values) => {
        console.log(values, "saksii");
        setShow(true);
      },
    });

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const [show, setShow] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);

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
                onSubmit={handleSubmit}
              >
                <Stepper
                  activeStep={activeStep}
                  isLastStep={(value) => setIsLastStep(value)}
                  className="mt-8 mb-14"
                >
                  <Step
                    onClick={() => setActiveStep(0)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">1</p>
                  </Step>
                  <Step
                    onClick={() => setActiveStep(1)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">2</p>
                  </Step>
                  <Step
                    onClick={() => setActiveStep(2)}
                    className="custom-stepper rounded-full flex items-center justify-center"
                  >
                    <p className="font-sm font-medium">3</p>
                  </Step>
                </Stepper>
                {activeStep === 0 ? (
                  <BusinessDetails
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                  />
                ) : activeStep === 1 ? (
                  <DeliveryAddress
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                  />
                ) : activeStep === 2 ? (
                  <>
                    <OrderContact
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                    />
                  </>
                ) : null}

                {isLastStep ? (
                  <Button
                    type="submit"
                    className="login-btn bg-custom-blue rounded-md	w-full p-3 custom-shadow"
                    // onClick={submit}
                  >
                    <p className="text-white text-center font-semibold	text-sm	 ">
                      Done
                    </p>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="login-btn bg-custom-blue rounded-md	w-full p-3 custom-shadow"
                    onClick={handleNext}
                    disabled={isLastStep}
                  >
                    <p className="text-white text-center font-semibold	text-sm	">
                      Next
                    </p>
                  </Button>
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
