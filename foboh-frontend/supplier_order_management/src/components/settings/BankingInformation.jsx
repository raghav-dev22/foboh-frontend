import React from "react";
import { Select } from "antd";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { BankingSchema } from "../../schemas";
import { getOrganisationDetails } from "../../helpers/getOrganisationDetails";
import { postSetupBankingDetails } from "../../helpers/postSetupBankinDetails";
import { Button, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { getSetupBankingDetails } from "../../helpers/getSetupBankingDetails";

const BankingInformation = () => {
  const navigate = useNavigate();
  const [bankingDetails, setBankingDetails] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [initialValues, setInitialValues] = useState({
    BusinessName: "",
    LegalBusiness: "",
    ACNABN: "",
    BusinessAddress: "",
    Suburb: "",
    Postcode: "",
    State: "",
    Country: "Australia",
    BSB: "",
    AccountNumber: "",
    StatementDescriptor: "",
    PhoneNumber: "",
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
      ACNABN: setupBankingDetails.acnabn,
      BusinessAddress: setupBankingDetails.businessAddress,
      Suburb: setupBankingDetails.city,
      Postcode: setupBankingDetails.postcode,
      State: setupBankingDetails.state,
      BSB: setupBankingDetails.bsBnumber,
      AccountNumber: setupBankingDetails.accountNumber,
      StatementDescriptor: setupBankingDetails.statementDescriptor,
      PhoneNumber: setupBankingDetails.phoneNumber,
      BusinessName: setupBankingDetails.businessType,
    });
    setValues({
      LegalBusiness: setupBankingDetails.legalbusinessname,
      ACNABN: setupBankingDetails.acnabn,
      BusinessAddress: setupBankingDetails.businessAddress,
      Suburb: setupBankingDetails.city,
      Postcode: setupBankingDetails.postcode,
      State: setupBankingDetails.state,
      BSB: setupBankingDetails.bsBnumber,
      AccountNumber: setupBankingDetails.accountNumber,
      StatementDescriptor: setupBankingDetails.statementDescriptor,
      PhoneNumber: setupBankingDetails.phoneNumber,
      BusinessName: setupBankingDetails.businessType,
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
            acnabn: values?.ACNABN,
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
            className=""
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
                        placeholder="XX XXX XXX XXX"
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
                        htmlFor="username"
                      >
                        Business Phone Number
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="BusinessPhoneNumber"
                        placeholder="Enter Phone Number"
                        value={values.BusinessPhoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.BusinessPhoneNumber &&
                        touched.BusinessPhoneNumber && (
                          <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                            {errors.BusinessPhoneNumber}
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
                        City
                      </label>

                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="City"
                        type="text"
                        name="City"
                        placeholder="Enter City"
                        value={values.City}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.City && touched.City && (
                        <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                          {errors.City}
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
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Australia "
                        value={values.Country}
                      />
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
                        id=" FirstName"
                        type="text"
                        name=" FirstName"
                        placeholder="Enter first name"
                      />
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
                        id="LastName"
                        type="text"
                        name="LastName"
                        placeholder="Enter last name"
                      />
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
                        type="text"
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
                        id="Suburb"
                        type="text"
                        name="Suburb"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="City"
                      >
                        City
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="City"
                        type="text"
                        placeholder="Enter city"
                        name="City"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="Postcode"
                      >
                        Postcode
                      </label>
                      <input
                        disabled
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Postcode"
                        type="text"
                        placeholder="XXXX "
                      />
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
                        htmlFor="PhoneNo"
                      >
                        Phone No.
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="PhoneNo"
                        type="text"
                        placeholder="04XX XXX XXX / +61 4XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="EmailID"
                    >
                      Email ID
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="EmailID"
                      type="text"
                      placeholder="Enter valid email ID"
                    />
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full green-checkbox flex justify-start items-center">
                      <div className="w-4 h-4">
                        <input
                          className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                          id="default-radio-1"
                          type="radio"
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
                    <div className="mb-4 w-full green-checkbox flex justify-start items-center ">
                      <div className="w-4 h-4">
                        <input
                          id="default-radio-1"
                          type="radio"
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
                      htmlFor="username"
                    >
                      Account number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
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
          <p className="mt-3 text-sm font-medium text-[#637381]">
            By using FOBOH Payments you agree to the Payments terms of service.
          </p>
        </div>
      </div>
    </>
  );
};

export default BankingInformation;
