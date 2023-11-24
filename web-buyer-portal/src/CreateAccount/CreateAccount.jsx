import React, { useEffect, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import BusinessDetails from "./BusinessDetails";
import DeliveryAddress from "./DeliveryAddress";
import OrderContact from "./OrderContact";
import SuccessModal from "../modal/SuccessModal";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "../schemas";
import separateFullName from "../helper/separateFullName";
import { useParams } from "react-router-dom/dist";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLastStep, setIsLastStep] = React.useState(false);
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const [currentStep, setCurrentStep] = useState(0);
  const [buyer, setBuyer] = useState({});
  const [isBuyerExist, setIsbuyerExist] = useState(false);
  const [organisationlogo, setOrganisationLogo] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
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
  });

  // Getting buyer data from local storage
  const buyerCred = JSON.parse(localStorage.getItem("buyerCred"));
  const buyerData = JSON.parse(localStorage.getItem("buyerData"));
  const key = localStorage.getItem("uniqueKey");
  let states = [];

  useEffect(() => {
    if (key !== id) {
      navigate("/auth/sign-up");
    }

    setBuyer(buyer);
    getStates();
  }, []);

  const getStates = () => {
    fetch("https://masters-api-foboh.azurewebsites.net/api/State", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("states", data);
        states = data.map((state) => {
          return {
            label: state.stateName,
            value: state.stateId,
          };
        });
      })
      .then(() => {
        const { firstName, lastName } = separateFullName(buyerCred?.name);
        setInitialValues({
          BusinessName: buyerData?.businessName,
          ABN: buyerData?.abn,
          LiquerLicence: buyerData?.liquorLicence,
          DeliveryAddress: buyerData?.address,
          Apartment: buyerData?.apartment,
          Suburb: buyerData?.suburb,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.deliveryNotes,
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
        formik.setValues({
          BusinessName: buyerData?.businessName,
          ABN: buyerData?.abn,
          LiquerLicence: buyerData?.liquorLicence,
          DeliveryAddress: buyerData?.address,
          Apartment: buyerData?.apartment,
          Suburb: buyerData?.suburb,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.deliveryNotes,
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
      })
      .catch((error) => console.log(error));
  };

  const formik = useFormik({
    initialValues,
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
      defaultPaymentMethodId: buyerData?.defaultPaymentMethodId || [],
      defaultPaymentTerm: buyerData?.defaultPaymentTerm || [],
      tags: buyerData?.tags || [],
      organisationId: buyerData?.organisationId || "",
      wetLiable: buyerData?.wetLiable,
      orderingFirstName: values?.OrderingContactFirstName || "",
      orderingLastName: values?.OrderingContactLastName || "",
      orderingMobile: values?.OrderingContactMobile || "",
      orderingEmail: values?.OrderingContactEmail.toLowerCase() || "",
      deliveryFirstName: values?.DeliveryContactFirstName || "",
      deliveryLastName: values?.DeliveryContactLastName || "",
      deliveryMobile: values?.DeliveryContactMobile || "",
      deliveryEmail: values?.DeliveryContactEmail.toLowerCase() || "",
      address: buyerData?.address || "",
      apartment: buyerData?.apartment || "",
      suburb: buyerData?.suburb || "",
      postalCode: buyerData?.postalCode || "",
      state: buyerData?.state || "",
      deliveryNotes: values?.Notes || "",
      billingAddress: buyerData?.billingAddress || "",
      billingApartment: buyerData?.billingApartment || "",
      billingSuburb: buyerData?.billingSuburb || "",
      billingPostalCode: buyerData?.billingPostalCode || "",
      billingState: buyerData?.billingState || "",
      isActive: "1",
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
    setIsLoading(true);
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
        setIsLoading(false);
        console.log("response data", data);
        if (data.success) {
          localStorage.removeItem("buyerCred");
          localStorage.removeItem("buyerData");
          localStorage.setItem("buyerInfo", JSON.stringify(data.data));
          localStorage.setItem("email", data.data.deliveryEmail);
          localStorage.setItem("loginPopup", true);
        } else if (!data.success && !data.data) {
          setIsbuyerExist(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const organisationId = JSON.parse(localStorage.getItem("orgID"));
    fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0], "for logo");
        setOrganisationLogo(data.data[0]);
      })
      .catch((error) => console.log(error));
    const popValue = localStorage.getItem("loginPopup");
    if (popValue === "true") {
      setShow(true);
    }
  });

  return (
    <>
      <div className=" bg-[#F8FAFC]  w-full flex items-center justify-center top-0 left-0 bottom-0 right-0 h-full">
        <div className="lg:container container-fluid mx-auto lg:px-6  px-0 ">
          <div className="w-full lg:scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white items-center ">
              <div className="    block md:hidden">
                <img
                  src={organisationlogo?.organisationlogo}
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
                      initialValues={initialValues}
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
                    {isLoading ? (
                      <button
                        disabled
                        className="login-btn bg-custom-blue rounded-md	w-36 p-3 custom-shadow hover:bg-[#6a59ce]"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* ... (your SVG path for the spinner) */}
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </button>
                    ) : (
                      <Button
                        // onClick={formik.submitForm}
                        className="login-btn bg-custom-blue rounded-md	w-36 p-3 custom-shadow hover:bg-[#6a59ce]"
                        onClick={() => onSubmit(formik.values)}
                      >
                        <p className="text-white text-center font-semibold	text-sm	 ">
                          Save
                        </p>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="items-start	flex justify-between">
                    {currentStep > 0 && (
                      <button
                        className="login-btn bg-transparent border-2 border-[#563fe3] rounded-md w-36 p-3 custom-shadow mx-1 hover:bg-[#6a59ce]"
                        type="button"
                        onClick={handleBack}
                      >
                        <p className="text-custom-blue text-center font-semibold text-sm">
                          Back
                        </p>
                      </button>
                    )}
                    <button
                      className={`login-btn bg-custom-blue rounded-md p-3 hover:bg-[#6a59ce] custom-shadow mx-1 ${
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
                  src={organisationlogo?.organisationlogo}
                  className="h-full w-full object-contain "
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
