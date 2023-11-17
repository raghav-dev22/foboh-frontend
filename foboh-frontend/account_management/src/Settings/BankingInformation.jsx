import React from "react";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
// import { BankingSchema } from "../../../supplier_order_management/src/schemas";
import { BankingSchema } from "../schemas";
import { getOrganisationDetails } from "../helpers/getOrganisationDetails";
import { postSetupBankingDetails } from "../helpers/postSetupBankinDetails";
import { Button, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { getSetupBankingDetails } from "../helpers/getSetupBankingDetails";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";

import { useElements, AuBankAccountElement } from "@stripe/react-stripe-js";
import BusinessDetails from "./BusinessDetails";
import RepresentativeInformation from "./RepresentativeInformation";
import BankingInfoForm from "./BankingInfoForm";
import CustomerBillingStatement from "./CustomerBillingStatement";
import BankingInfoFooter from "./BankingInfoFooter";

const BankingInformation = () => {
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#2B4447",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: 11,
      lineHeight: "24px",
      fontFamily: "Inter",
      fontSize: "11px",
      fontWeight: 600,
    },
  }));
  const navigate = useNavigate();
  const [bankingDetails, setBankingDetails] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const elements = useElements();

  const [initialValues, setInitialValues] = useState({
    BusinessName: "",
    BusinessSuburb: "",
    LegalBusiness: "",
    ACN: "",
    ABN: "",
    BusinessAddress: "",
    Suburb: "",
    Postcode: "",
    State: "",
    Country: "Australia",
    BSB: "",
    AccountNumber: "",
    StatementDescriptor: "",
    PhoneNumber: "",
    BusinessWebsiteURL: "",
    BusinessMobileNumber: "",
    firstName: "",
    lastName: "",
    RepresentativeAddress: "",
    Suburb: "",
    email: "",
    BankName: "",
    RepresentativePhoneNumber: "",
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BankingSchema,
    onSubmit: (values) => {
      console.log(values, "kkk");
    },
  });

  const DetilsUpdated = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Details updated!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  useEffect(() => {
    fetch("https://masters-api-foboh.azurewebsites.net/api/State", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("state -->", data);
        setStateOptions(
          data.map((ele) => {
            return {
              value: ele.stateId,
              label: ele.stateName,
            };
          })
        );
      });

    fetch(
      "https://masters-api-foboh.azurewebsites.net/api/BusinessType/options",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("setBusinessType -->", data);
        const businessTypeOptions = data.map((item) => ({
          value: item,
          label: item,
        }));
        console.log(businessTypeOptions, "businessTypeOptions====>");
        setBusinessType(businessTypeOptions);
      });

    asyncFuntion();
  }, []);

  const asyncFuntion = async () => {
    const organisationDetails = await getOrganisationDetails();
    console.log(organisationDetails, "mainData");
    await postSetupBankingDetails(organisationDetails);

    const setupBankingDetails = await getSetupBankingDetails();
    setInitialValues({
      LegalBusiness: setupBankingDetails.legalbusinessname,
      ACN: setupBankingDetails.acn,
      ABN: setupBankingDetails.abn,
      BusinessAddress: setupBankingDetails.businessAddress,
      Suburb: setupBankingDetails.city,
      Postcode: setupBankingDetails.postcode,
      State: setupBankingDetails.state,
      BSB: setupBankingDetails.bsBnumber,
      AccountNumber: setupBankingDetails.accountNumber,
      StatementDescriptor: setupBankingDetails.statementDescriptor,
      PhoneNumber: setupBankingDetails.phoneNumber,
      BusinessName: setupBankingDetails.businessType,
      BusinessWebsiteURL: setupBankingDetails.BusinessWebsiteURL,
      BusinessMobileNumber: setupBankingDetails.BusinessMobileNumber,
      firstName: setupBankingDetails.firstName,
      lastName: setupBankingDetails.lastName,
      Suburb: setupBankingDetails.Suburb,
      RepresentativeAddress: setupBankingDetails.RepresentativeAddress,
      email: setupBankingDetails.email,
      BankName: setupBankingDetails.BankName,
      BusinessSuburb: setupBankingDetails.BusinessSuburb,
      RepresentativePhoneNumber: setupBankingDetails.RepresentativePhoneNumber,
    });
    setValues({
      LegalBusiness: setupBankingDetails.legalbusinessname,
      ACN: setupBankingDetails.acn,
      ABN: setupBankingDetails.abn,
      BusinessAddress: setupBankingDetails.businessAddress,
      Suburb: setupBankingDetails.city,
      Postcode: setupBankingDetails.postcode,
      State: setupBankingDetails.state,
      BSB: setupBankingDetails.bsBnumber,
      AccountNumber: setupBankingDetails.accountNumber,
      StatementDescriptor: setupBankingDetails.statementDescriptor,
      PhoneNumber: setupBankingDetails.phoneNumber,
      BusinessName: setupBankingDetails.businessType,
      BusinessWebsiteURL: setupBankingDetails.BusinessWebsiteURL,
      BusinessMobileNumber: setupBankingDetails.BusinessMobileNumber,
      firstName: setupBankingDetails.firstName,
      lastName: setupBankingDetails.lastName,
      RepresentativeAddress: setupBankingDetails.RepresentativeAddress,
      Suburb: setupBankingDetails.Suburb,
      email: setupBankingDetails.email,
      BankName: setupBankingDetails.BankName,
      BusinessSuburb: setupBankingDetails.BusinessSuburb,
      RepresentativePhoneNumber: setupBankingDetails.RepresentativePhoneNumber,
    });
  };

  const handleSave = () => {
    const auBankAccount = elements.getElement(AuBankAccountElement);
    console.log("auBankAccount", auBankAccount);

    return true;

    if (isValid) {
      const orgID = localStorage.getItem("organisationId");
      fetch(
        `https://setupbankinginfofobohwebapi-fbh.azurewebsites.net/api/SetupBanking/UpdateBankingInfo?OrganisationID=${orgID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organisationID: localStorage.getItem("organisationId"),
            businessType: values?.BusinessName,
            legalbusinessname: values?.LegalBusiness,
            acn: values?.ACN,
            abn: values?.ABN,
            businessAddress: values?.BusinessAddress,
            city: values?.Suburb,
            postcode: values?.Postcode,
            state: values?.State,
            country: "Australia",
            bsBnumber: values?.BSB,
            accountNumber: values?.AccountNumber,
            statementDescriptor: values?.StatementDescriptor,
            phoneNumber: values?.PhoneNumber,
            createdBy: "string",
            BusinessWebsiteURL: values?.BusinessWebsiteURL,
            BusinessMobileNumber: values?.BusinessMobileNumber,
            firstName: values?.firstName,
            lastName: values?.lastName,
            RepresentativeAddress: values?.RepresentativeAddress,
            Suburb: values?.Suburb,
            email: values?.email,
            BankName: values?.BankName,
            BusinessSuburb: values?.BusinessSuburb,
            RepresentativePhoneNumber: values?.RepresentativePhoneNumber,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setShow(false);
          DetilsUpdated();
          console.log(data, "postbanking data");
        })
        .catch((error) => console.log(error));
    } else {
      console.log(
        "Form has validation errors. Save operation aborted.",
        errors
      );
    }
  };

  const handleState = (e) => {
    const item = e.label;
    const itemId = e.value;
    setValues({
      ...values,
      State: e,
    });
    setShow(true);
  };

  const handleBusinessDetails = (e) => {
    const item = e.label;
    const itemId = e.value;
    setValues({
      ...values,
      BusinessName: e,
    });
    setShow(true);
  };

  const formChange = () => {
    setShow(true);
  };

  const handleReset = () => {
    setValues(initialValues);
    setShow(false);
  };

  return (
    <>
      {contextHolder}
      {show && (
        <div className="2xl:mx-auto absolute z-50 top-0 right-0 left-0">
          <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
            <div className="block">
              <nav className="flex h-[65px] items-center justify-end gap-5 ">
                <button
                  onClick={handleReset}
                  className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                >
                  Save
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
      <div className="bank-information-page padding-top-custom">
        <div className="pb-6 px-6 flex justify-start items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <h4 className="text-xl font-semibold text-[#2B4447]">
            Set up banking Information
          </h4>
        </div>
        <div className="lg:flex flex-col gap-5 px-6 ">
          <div className="  w-full  gap-5 h-full	 grid	  ">
            <BusinessDetails
              values={values}
              formChange={formChange}
              businessType={businessType}
              handleBusinessDetails={handleBusinessDetails}
              handleBlur={handleBlur}
              errors={errors}
              handleChange={handleChange}
              stateOptions={stateOptions}
              handleState={handleState}
              CustomTooltip={CustomTooltip}
              HelpIcon={HelpIcon}
              touched={touched}
            />
          </div>
          <div className="  w-full  gap-5 h-full	 grid	  ">
            <RepresentativeInformation
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              stateOptions={stateOptions}
              handleState={handleState}
            />
          </div>
          <div className="w-full  gap-5  overflow-y-scroll	lg:flex">
            <BankingInfoForm
              formChange={formChange}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
            />
            <CustomerBillingStatement
              formChange={formChange}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
          </div>
        </div>
        <BankingInfoFooter />
      </div>
    </>
  );
};

export default BankingInformation;
