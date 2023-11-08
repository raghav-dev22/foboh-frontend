import React from "react";
import { Select } from "antd";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { BankingSchema } from "../../schemas";
import { getOrganisationDetails } from "../../helpers/getOrganisationDetails";
import { postSetupBankingDetails } from "../../helpers/postSetupBankinDetails";
import { Button, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { getSetupBankingDetails } from "../../helpers/getSetupBankingDetails";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";

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
            <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-scroll">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447]">
                  Business Details
                </h5>
              </div>
              <div className="py-6 px-6">
                <form onChange={formChange} action="">
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Business type
                      </label>
                      <Select
                        className="mt-[3px]"
                        showSearch
                        style={{
                          width: "100%",
                          height: "48px",
                        }}
                        placeholder="Search to Select"
                        options={businessType}
                        onChange={handleBusinessDetails}
                        onBlur={handleBlur}
                        name="BusinessName"
                        value={values.BusinessName}
                      />
                      {errors.BusinessName && touched.BusinessName && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.BusinessName}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Legal business name
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="LegalBusiness"
                        type="text"
                        name="LegalBusiness"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Business Name PVT LTD"
                        value={values.LegalBusiness}
                      />
                      {errors.LegalBusiness && touched.LegalBusiness && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.LegalBusiness}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        ACN
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="ACN"
                        type="text"
                        name="ACN"
                        placeholder="XXX XXX XXX"
                        value={values.ACN}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.ACN && touched.ACN && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.ACN}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        ABN
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="ABN"
                        type="text"
                        name="ABN"
                        placeholder="XX XXX XXX XXX"
                        value={values.ABN}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.ABN && touched.ABN && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.ABN}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Business Address
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="BusinessAddress"
                        placeholder="Enter Business Address "
                        value={values.BusinessAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.BusinessAddress && touched.BusinessAddress && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.BusinessAddress}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="BusinessMobileNumber"
                      >
                        Business Phone Number
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="BusinessMobileNumber"
                        type="text"
                        name="BusinessMobileNumber"
                        placeholder="Enter Phone Number"
                        value={values.BusinessMobileNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.BusinessMobileNumber &&
                        touched.BusinessMobileNumber && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.BusinessMobileNumber}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Suburb
                      </label>

                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="BusinessSuburb"
                        type="text"
                        name="BusinessSuburb"
                        placeholder="Enter Suburb"
                        value={values.BusinessSuburb}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.BusinessSuburb && touched.BusinessSuburb && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.BusinessSuburb}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Postcode
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="XXXX"
                        name="Postcode"
                        value={values.Postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.Postcode && touched.Postcode && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.Postcode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        State
                      </label>
                      <Select
                        className="mt-[3px]"
                        showSearch
                        name="State"
                        style={{ width: "100%", height: "48px" }}
                        placeholder="Search to Select"
                        options={stateOptions}
                        onChange={handleState}
                        onBlur={handleBlur}
                        value={values.State}
                      />
                      {errors.State && touched.State && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.State}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Country
                      </label>
                      <input
                        disabled
                        className="appearance-none  border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Australia "
                        value={values.Country}
                        style={{ background: "#E0E0E0" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        <CustomTooltip
                          placement="right"
                          arrow
                          title="Please provide the URL of your business website or social media profile."
                        >
                          <HelpIcon
                            sx={{
                              color: "#E0E0E0",
                              width: "20px",
                              marginLeft: "10px",
                            }}
                          />{" "}
                        </CustomTooltip>{" "}
                        Business website URL
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Business website URL"
                        name="BusinessWebsiteURL"
                        value={values.BusinessWebsiteURL}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.BusinessWebsiteURL &&
                        touched.BusinessWebsiteURL && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.BusinessWebsiteURL}
                          </p>
                        )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="  w-full  gap-5 h-full	 grid	  ">
            <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-scroll">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447]">
                  Representative Information
                </h5>
              </div>
              <div className="py-6 px-6">
                <form action="">
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Last Name
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="Dateofbirth"
                      >
                        Date of birth
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Dateofbirth"
                        type="date"
                        name="DateOfBirth"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Address
                      </label>

                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="RepresentativeAddress"
                        type="text"
                        placeholder="Enter address"
                        name="RepresentativeAddress"
                        value={values.RepresentativeAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.RepresentativeAddress &&
                        touched.RepresentativeAddress && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.RepresentativeAddress}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="Suburb"
                      >
                        Suburb
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Suburb"
                        name="Suburb"
                        id="Suburb"
                        type="text"
                        value={values.Suburb}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.Suburb && touched.Suburb && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.Suburb}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="Postcode"
                      >
                        Postcode
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Postcode"
                        type="text"
                        placeholder="XXXX "
                        name="Postcode"
                        value={values.Postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.Postcode && touched.Postcode && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.Postcode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        State
                      </label>
                      <Select
                        className="mt-[3px]"
                        showSearch
                        name="State"
                        style={{ width: "100%", height: "48px" }}
                        placeholder="Search to Select"
                        options={stateOptions}
                        onChange={handleState}
                        onBlur={handleBlur}
                        value={values.State}
                      />
                      {errors.State && touched.State && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.State}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="RepresentativePhoneNumber"
                      >
                        Phone No.
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="RepresentativePhoneNumber"
                        type="text"
                        placeholder="04XX XXX XXX / +61 4XX XXX XXX"
                        name="RepresentativePhoneNumber"
                        value={values.RepresentativePhoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.RepresentativePhoneNumber &&
                        touched.RepresentativePhoneNumber && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.RepresentativePhoneNumber}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="email"
                    >
                      Email ID
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Enter valid email ID"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className=" gap-2 w-full green-checkbox flex justify-start items-center">
                      <div className="w-4 h-4">
                        <input
                          className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                          id="default-radio-1"
                          type="checkbox"
                          defaultValue=""
                          name="default-radio"
                        />
                      </div>
                      <label
                        for="default-radio-1"
                        className="ml-2 text-lg font-normal text-[#2B4447] "
                      >
                        I own more than 25% of the company
                      </label>
                    </div>
                    <div className=" gap-2 w-full green-checkbox flex justify-start items-center ">
                      <div className="w-4 h-4">
                        <input
                          id="default-radio-1"
                          type="checkbox"
                          name="default-radio"
                          defaultValue=""
                          className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <label
                        for="default-radio-1"
                        className="ml-2 text-lg font-normal text-[#2B4447] "
                      >
                        I am a member of the governing board of the company
                      </label>
                    </div>
                    <div className=" gap-2 w-full green-checkbox flex justify-start items-center">
                      <div className="w-4 h-4">
                        <input
                          className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                          id="default-radio-3"
                          type="checkbox"
                          defaultValue=""
                          name="default-radio"
                        />
                      </div>
                      <label
                        for="default-radio-3"
                        className="ml-2 text-lg font-normal text-[#2B4447] "
                      >
                        I am a company executive.
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full  gap-5  overflow-y-scroll	lg:flex">
            <div className="border w-full border-[#E7E7E7] rounded-md  bg-white ">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447] mb-2">
                  Banking information
                </h5>
                <p className="text-sm font-medium text-[#637381] leading-[20px]">
                  Nominate your bank account for fund deposit.
                </p>
              </div>
              <div className="py-6 px-6">
                <form action="" onChange={formChange}>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Bank State Branch (BSB) number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="XXY-ZZZ"
                      name="BSB"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.BSB}
                    />
                    {errors.BSB && touched.BSB && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.BSB}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="Account number"
                    >
                      Account number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Account number"
                      type="text"
                      placeholder="XXXXXX YYYYYYY ZZZ"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="AccountNumber"
                      value={values.AccountNumber}
                    />
                    {errors.AccountNumber && touched.AccountNumber && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.AccountNumber}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="BankName"
                    >
                      Bank Name
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="BankName"
                      type="text"
                      placeholder="Bank Name"
                      name="BankName"
                      value={values.BankName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.BankName && touched.BankName && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.BankName}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="border w-full border-[#E7E7E7] rounded-md bg-white">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447] mb-2">
                  Customer billing statement
                </h5>
                <p className="text-sm font-medium text-[#637381] leading-[20px]">
                  This information will be shown on the buyer’s card statements.{" "}
                </p>
              </div>
              <div className="py-6 px-6">
                <form action="" onChange={formChange}>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Statement descriptor
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Trade Name Inc."
                      name="StatementDescriptor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.StatementDescriptor}
                    />
                    {errors.StatementDescriptor &&
                      touched.StatementDescriptor && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.StatementDescriptor}
                        </p>
                      )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Phone number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="PhoneNumber"
                      type="text"
                      name="PhoneNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.PhoneNumber}
                      placeholder="04XX XXX XXX / +61 4XX XXX XXX
                      "
                    />
                    {errors.PhoneNumber && touched.PhoneNumber && (
                      <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                        {errors.PhoneNumber}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6">
          <h4 className="text-xl font-semibold  text-[#2B4447]">
            Terms and Conditions
          </h4>
          <div className="flex mt-3 justify-start items-center gap-2 green-checkbox">
            <input
              className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
              id="default-radio-1"
              type="checkbox"
              defaultValue=""
              name="default-radio"
            />
            <p className=" text-sm font-medium text-[#637381]">
              By using FOBOH Payments you agree to the
              <Link to="#" className="text-[#147D73]">
                {" "}
                Payments terms of service
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankingInformation;
