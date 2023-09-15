import React, { useEffect, useState } from "react";

import { Stepper, Step, Button } from "@material-tailwind/react";
import BusinessDetails from "./BusinessDetails";
import DeliveryAddress from "./DeliveryAddress";
import OrderContact from "./OrderContact";
import SuccessModal from "../modal/SuccessModal";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "../schemas";
import separateFullName from "../helper/separateFullName";

//Need to be deleted after api integration
import { options } from "../data";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const [currentStep, setCurrentStep] = useState(0);
  const [buyer, setBuyer] = useState({});
  const [states, setStates] = useState([]);
  const [isBuyerExist, setIsbuyerExist] = useState(false)

  // Getting buyer data from local storage
  const buyerCred = JSON.parse(localStorage.getItem("buyerCred"));
  const buyerData = JSON.parse(localStorage.getItem("buyerData"));

  useEffect(() => {
    setBuyer(buyer);

    console.log(buyer);

    fetch(
      "https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/PopulateState",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("states", data);
        const statesData = data.map((state) => {
          return {
            label: state.stateName,
            value: state.id,
          };
        });
        setStates(statesData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        const { firstName, lastName } = separateFullName(buyerCred?.name);

        formik.setValues({
          BusinessName: buyerData?.businessName,
          ABN: buyerData?.abn,
          LiquerLicence: buyerData?.liquorLicence,
          DeliveryAddress: buyerData?.address,
          Apartment: buyerData?.apartment,
          Suburb: buyerData?.suburb,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.Notes,
          FirstName: firstName,
          LastName: lastName,
          email: buyerCred?.email,
          Mobile: buyerData?.mobile,
          DeliveryAddressState: states.find(
            (state) => state?.label === buyerData?.state
          ),
          OrderContactState: states.find(
            (state) => state?.label === buyerData?.billingState
          ),
          OrderingContactFirstName: buyerData?.orderingFirstName,
          OrderingContactLastName: buyerData?.orderingLastName,
          OrderingContactEmail: buyerData?.orderingEmail,
          OrderingContactMobile: buyerData?.orderingMobile,
          DeliveryContactFirstName: buyerData?.deliveryFirstName,
          DeliveryContactLastName: buyerData?.deliveryLastName,
          DeliveryContactEmail: buyerData?.deliveryEmail,
          DeliveryContactMobile: buyerData?.deliveryMobile,
        });
      });
  }, []);

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
      OrderingContactFirstName: "",
      OrderingContactLastName: "",
      OrderingContactEmail: "",
      OrderingContactMobile: "",
      DeliveryContactFirstName: "",
      DeliveryContactLastName: "",
      DeliveryContactEmail: "",
      DeliveryContactMobile: "",
    },
    validationSchema: validationSchemas[currentStep],
  });

  const handleNext = () => {
    formik
      .validateForm()
      .then((errors) => {
        if (currentStep < 2 && Object.values(errors).length === 0) {
          setCurrentStep((cur) => cur + 1);
        } else if (currentStep === 2) {
          console.log("Form submitted");
          formik.submitForm();
        }
        console.log("res", errors);
      })
      .catch((error) => console.log(error));
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((cur) => cur - 1);
      formik.setErrors({});
    } else {
    }
  };
  const onSubmit = (values) => {
    const data = {
      buyerId: buyerData?.buyerId || "",
      businessName: values?.BusinessName || "",
      abn: values?.ABN || "",
      liquorLicence: values?.LiquerLicence || "",
      salesRepId: buyerData?.salesRepId || "",
      pricingProfileId: buyerData?.pricingProfileId || "",
      defaultPaymentMethodId: buyerData?.defaultPaymentMethodId || "",
      tags: buyerData?.tags || [],
      organisationId: buyerData?.organisationId || "",
      wetLiable: buyerData?.wetLiable,
      orderingFirstName: values?.OrderingContactFirstName || "",
      orderingLastName: values?.OrderingContactLastName || "",
      orderingMobile: values?.OrderingContactMobile || "",
      orderingEmail: values?.OrderingContactEmail || "",
      deliveryFirstName: values?.DeliveryContactFirstName || "",
      deliveryLastName: values?.DeliveryContactLastName || "",
      deliveryMobile: values?.DeliveryContactMobile || "",
      deliveryEmail: values?.DeliveryContactEmail || "",
      address: buyerData?.address || "",
      apartment: buyerData?.apartment || "",
      suburb: buyerData?.suburb || "",
      postalCode: buyerData?.postalCode || "",
      state: buyerData?.state || "",
      deliveryNotes: values?.Notes || "",
      billingAddress: values?.billingAddress || "",
      billingApartment: values?.billingApartment || "",
      billingSuburb: values?.billingSuburb || "",
      billingPostalCode: values?.billingPostalCode || "",
      billingState: values?.billingState || "",
      isActive: true || "",
      password: buyerCred?.password || "",
      status: true,
      role: "",
      meta: "",
      adId: "",
      imageUrl: "",
      bio: buyerData?.bio || "",
      mobile: buyerData?.mobile || "",
      createdBy: "",
    };

    fetch(
      "https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("response data", data);
        if(data.success) {
          localStorage.removeItem("buyerCred")
          localStorage.removeItem("buyerData")
          localStorage.setItem("buyerInfo", JSON.stringify(data.data))
          localStorage.setItem("email", data.data.deliveryEmail)
          setShow(true)
        } else if(!data.success && !data.data) {
          setIsbuyerExist(true)
        }
      })
      .catch((error) => console.log(error));
    
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
                    states={states}
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
                      isBuyerExist={isBuyerExist}
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
                      onClick={() => onSubmit(formik.values)}
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
                      className={`login-btn bg-custom-blue rounded-md p-3 custom-shadow mx-1 ${
                        currentStep === 0 ? "w-full" : "w-36"
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
