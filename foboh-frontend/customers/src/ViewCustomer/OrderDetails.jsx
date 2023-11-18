import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { AddCustomerSchema } from "../schemas";
import Select from "react-select";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import { message } from "antd";
import SaveCancel from "../customers/SaveCancel";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getStates,
  getdefaultPaymentMethod,
  getdefaultPaymentTerm,
} from "../reactQuery/viewCustomerApiModule";

const OrderDetails = ({ datas, handleCustomerDetails }) => {
  console.log(datas, ">>id");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [customerDetails, setCustomerDetails] = React.useState();
  const [activeStatus, setActiveStatus] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [stateData, setStateData] = useState([]);
  const saveCustomer = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Customer saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState();
  const [initialValues, setInitialValues] = useState({
    buyerId: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    salesRepId: "",
    pricingProfileId: "",
    defaultPaymentTerms: "",
    defaultPaymentMethodId: "",
    tags: "",
    organisationId: "",
    wetLiable: false,
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
    billingState: {},
    isActive: "",
  });
  useEffect(() => {
    callCustomerDetails();
  }, []);

  const {
    data: statesData,
    error: statesError,
    isLoading: statesIsLoading,
  } = useQuery({
    queryKey: ["getStates"],
    queryFn: getStates,
  });
  let allStateData = [];
  if (statesData && !statesIsLoading) {
    const list = statesData.map((item) => {
      return {
        value: item.stateId,
        label: item.stateName,
      };
    });
    allStateData = list;
  }

  const {
    data: paymentTermData,
    error: paymentTermError,
    isLoading: paymentTermIsLoading,
  } = useQuery({
    queryKey: ["defaultPaymentTerm"],
    queryFn: getdefaultPaymentTerm,
  });

  let paymentTerm = [];
  if (paymentTermData && !paymentTermIsLoading) {
    const data = paymentTermData.map((item) => {
      return {
        value: item.id,
        label: item.paymentTermName,
      };
    });
    paymentTerm = data;
  }

  const handleSelect = async (e, name) => {
    console.log("selected tags>>>>...", e, name);
    if (name === "defaultPaymentTerms") {
      setValues({
        ...values,
        defaultPaymentTerms: e,
      });

      const defaultPaymentMethodList = await getdefaultPaymentMethod(e);
      setDefaultPaymentMethod(
        defaultPaymentMethodList?.data.map((item) => {
          return {
            value: item,
            label: item,
          };
        })
      );
      console.log(defaultPaymentMethod, "all method data");
    } else {
      setValues({
        ...values,
        [name]: e,
      });
    }
  };

  const callCustomerDetails = () => {
    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/${datas}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer data --->", data.orderingFirstName);
        handleCustomerDetails(data);
        setInitialValues({
          ...initialValues,
          buyerId: data?.buyerId,
          orderingFirstName: data.orderingFirstName,
          orderingLastName: data.orderingLastName,
          orderingMobile: data.orderingMobile,
          orderingEmail: data.orderingEmail,
          address: data.address,
          apartment: data.apartment,
          suburb: data.suburb,
          billingState: data.billingState,
          billingPostalCode: data.billingPostalCode,
          billingSuburb: data.billingSuburb,
          billingApartment: data.billingApartment,
          deliveryNotes: data.deliveryNotes,
          billingAddress: data.billingAddress,
          state: data.state,
          postalCode: data.postalCode,
          deliveryEmail: data.deliveryEmail,
          deliveryMobile: data.deliveryMobile,
          deliveryLastName: data.deliveryLastName,
          deliveryFirstName: data.deliveryFirstName,
          businessName: data.businessName,
          abn: data.abn,
          liquorLicence: data.liquorLicence,
          organisationId: data?.organisationId,
          defaultPaymentMethodId: data?.defaultPaymentMethodId,
          defaultPaymentTerms: data?.defaultPaymentTerm,
          tags: [],
          pricingProfileId: "",
          salesRepId: "",
          isActive: data?.isActive,
        });

        setValues({
          ...values,
          buyerId: data?.buyerId,
          orderingFirstName: data.orderingFirstName,
          orderingLastName: data.orderingLastName,
          orderingMobile: data.orderingMobile,
          orderingEmail: data.orderingEmail,
          address: data.address,
          apartment: data.apartment,
          suburb: data.suburb,
          billingState: allStateData?.map(
            (item) => data?.billingState === item?.label
          ),
          billingPostalCode: data.billingPostalCode,
          billingSuburb: data.billingSuburb,
          billingApartment: data.billingApartment,
          deliveryNotes: data.deliveryNotes,
          billingAddress: data.billingAddress,
          state: data.state,
          postalCode: data.postalCode,
          deliveryEmail: data.deliveryEmail,
          deliveryMobile: data.deliveryMobile,
          deliveryLastName: data.deliveryLastName,
          deliveryFirstName: data.deliveryFirstName,
          businessName: data.businessName,
          abn: data.abn,
          liquorLicence: data.liquorLicence,
          organisationId: data?.organisationId,
          defaultPaymentMethodId: data?.defaultPaymentMethodId,
          defaultPaymentTerms: data?.defaultPaymentTerm,
          tags: [],
          pricingProfileId: "",
          salesRepId: "",
          isActive: data?.isActive,
        });
        setCustomerDetails(data);
      });
  };

  const onFinalSubmit = (event) => {
    console.log(datas, "data");
    event.preventDefault();
    const organisationId = localStorage.getItem("organisationId");

    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Update/${datas}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: values?.buyerId,
          orderingFirstName: values?.orderingFirstName,
          orderingLastName: values?.orderingLastName,
          orderingMobile: values?.orderingMobile,
          orderingEmail: values?.orderingEmail,
          address: values?.address,
          apartment: values?.apartment,
          suburb: values?.suburb,
          billingState: values?.billingState,
          billingPostalCode: values?.billingPostalCode,
          billingSuburb: values?.billingSuburb,
          billingApartment: values?.billingApartment,
          deliveryNotes: values?.deliveryNotes,
          billingAddress: values?.billingAddress,
          state: values?.state,
          postalCode: values?.postalCode,
          deliveryEmail: values?.deliveryEmail,
          deliveryMobile: values?.deliveryMobile,
          deliveryLastName: values?.deliveryLastName,
          deliveryFirstName: values?.deliveryFirstName,
          businessName: values?.businessName,
          defaultPaymentMethodId: "",
          defaultPaymentTerm: "",
          abn: values?.abn,
          liquorLicence: values?.liquorLicence,
          organisationId: organisationId,
          defaultPaymentMethodId: values?.defaultPaymentMethodId,
          defaultPaymentTerm: values?.defaultPaymentTerms,
          tags: [],
          pricingProfileId: "",
          salesRepId: "",
          isActive: values?.isActive,
        }),
      }
    )
      .then((response) => {
        console.log("updatedd", response);
      })
      .then((data) => {
        console.log("response after update>>", data);
        setShow(false);
        saveCustomer();
      });
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
    onSubmit: (values) => {},
  });

  console.log("errors", errors);
  console.log("values", values);

  const handleInputChange = () => {
    setShow(true);
  };
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

  const addressSame = (e) => {
    console.log("e --->", e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        deliveryFirstName: values.orderingFirstName,
        deliveryLastName: values.orderingLastName,
        deliveryEmail: values.orderingEmail,
        deliveryMobile: values.orderingMobile,
        billingApartment: values.apartment,
        billingAddress: values.address,
        billingSuburb: values.suburb,
        billingPostalCode: values.postalCode,
        billingState: values.state,
      });
    } else {
      setValues({
        ...initialValues,
      });
    }
  };

  const handleCancel = () => {
    setShow(false);
    setValues({
      ...initialValues,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="px-12 pt-6">
        <form onChange={handleInputChange}>
          <div className="xl:w-full xl:mx-0  sm:block rounded-lg border border-darkGreen	">
            <ul className="flex      gap-5 bg-custom-skyBlue rounded-s-lg	rounded-e-lg	pt-4 overflow-x-scroll">
              <li
                onClick={() => setActiveStatus(1)}
                className={
                  activeStatus == 1
                    ? "text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 py-3 px-4	 cursor-pointer rounded-s-lg rounded-e-lg bg-white customer-tab-active"
                    : "customer-tab text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer  px-4"
                }
              >
                <div className="flex gap-2 items-center">
                  <LocalMallOutlinedIcon style={{ fill: "#fff" }} />
                  <div className="flex items-center">
                    <span
                      className={`${
                        activeStatus == 1
                          ? " text-black font-bold	"
                          : " font-normal	 text-white"
                      } text-base`}
                    >
                      Orders
                    </span>
                  </div>
                </div>
              </li>
              <li
                onClick={() => setActiveStatus(2)}
                className={
                  activeStatus == 2
                    ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700  rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab-active"
                    : "customer-tab  px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"
                }
              >
                <div className="flex gap-2 items-center">
                  <ContactPageOutlinedIcon style={{ fill: "#fff" }} />
                  <div className="flex items-center">
                    <span
                      className={`${
                        activeStatus == 2
                          ? " text-black font-bold	"
                          : " font-normal	 text-white"
                      } text-base`}
                    >
                      Contacts
                    </span>
                  </div>
                </div>
              </li>
              <li
                onClick={() => setActiveStatus(3)}
                className={
                  activeStatus == 3
                    ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700  rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab-active"
                    : "customer-tab  px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"
                }
              >
                <div className="flex gap-2 items-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.75H19M1 10.25H19M6.25 5.75V14.75M1 1.25H19V14C19 14.1989 18.921 14.3897 18.7803 14.5303C18.6397 14.671 18.4489 14.75 18.25 14.75H1.75C1.55109 14.75 1.36032 14.671 1.21967 14.5303C1.07902 14.3897 1 14.1989 1 14V1.25Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="flex items-center">
                    <span
                      className={`${
                        activeStatus == 3
                          ? " text-black font-bold	"
                          : " font-normal	 text-white"
                      } text-base`}
                    >
                      Addresses
                    </span>
                  </div>
                </div>
              </li>
              <li
                onClick={() => setActiveStatus(4)}
                className={
                  activeStatus == 4
                    ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab-active"
                    : "customer-tab  px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"
                }
              >
                <div className="flex gap-2 items-center">
                  <AddCardIcon style={{ fill: "#fff" }} />
                  <div className="flex items-center">
                    <span
                      className={`${
                        activeStatus == 4
                          ? " text-black font-bold	"
                          : " font-normal	 text-white"
                      } text-base`}
                    >
                      Payments
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            {show ? (
              <SaveCancel
                onFinalSubmit={onFinalSubmit}
                handleCancel={handleCancel}
              />
            ) : null}

            <div className="p-5">
              <div
                className={`relative overflow-x-auto overflow-y-auto  custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white ${
                  activeStatus == 1
                    ? "Active active-table"
                    : "hide-table hidden"
                }`}
              >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className=" border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base "
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base	"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base	"
                      >
                        Order date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base	"
                      >
                        Last updated{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base	"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-green	font-medium text-base	"
                      >
                        {/* Status */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <OrderTable />
                  </tbody>
                </table>
              </div>
              <div
                className={`${
                  activeStatus == 2
                    ? "Active active-table"
                    : "hide-table hidden"
                } grid lg:grid-cols-2 grid-cols-1 gap-4`}
              >
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-lg	 font-bold	 text-darkGreen">
                      Ordering contact
                    </h6>
                  </div>
                  <div className="px-6 py-7   custom-scroll-bar overflow-y-auto">
                    <form className="w-full  overflow-y-auto overflow-x-visible	">
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            First name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            name="orderingFirstName"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.orderingFirstName}
                            placeholder="Enter First Name"
                            style={{
                              border:
                                errors.orderingFirstName &&
                                touched.orderingFirstName &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingFirstName &&
                            touched.orderingFirstName && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.orderingFirstName}
                              </p>
                            )}
                          {errors.orderingFirstName &&
                            touched.orderingFirstName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Last name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.orderingLastName}
                            name="orderingLastName"
                            placeholder="Enter Last Name"
                            style={{
                              border:
                                errors.orderingLastName &&
                                touched.orderingLastName &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingLastName &&
                            touched.orderingLastName && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.orderingLastName}
                              </p>
                            )}
                          {errors.orderingLastName &&
                            touched.orderingLastName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            disabled
                            type="email"
                            // onChange={handleChange}
                            value={values?.orderingEmail}
                            name="orderingEmail"
                            autoComplete="on"
                            placeholder="Enter Email Address"
                            style={{
                              border:
                                errors.orderingEmail &&
                                touched.orderingEmail &&
                                "1px solid red",
                              background: "#E0E0E0",
                            }}
                          />
                          {errors.orderingEmail && touched.orderingEmail && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.orderingEmail}
                            </p>
                          )}
                          {errors.orderingEmail && touched.orderingEmail && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Mobile
                            <CustomTooltip
                              placement="right"
                              arrow
                              title="Mobile - a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
                            >
                              <HelpIcon
                                sx={{
                                  color: "#E0E0E0",
                                  width: "20px",
                                  marginLeft: "10px",
                                }}
                              />{" "}
                            </CustomTooltip>
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.orderingMobile}
                            name="orderingMobile"
                            placeholder="04XX XXX XXX / +61 4XX XXX XXX"
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            style={{
                              border:
                                errors.orderingMobile &&
                                touched.orderingMobile &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingMobile && touched.orderingMobile && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.orderingMobile}
                            </p>
                          )}
                          {errors.orderingMobile && touched.orderingMobile && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center ">
                    <h6 className="text-lg 	 font-bold text-darkGreen">
                      Delivery contact
                    </h6>

                    <div className="flex items-center  gap-1 green-checkbox">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        defaultValue=""
                        onClick={addressSame}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="  dark:text-gray-300"
                      >
                        <p className="text-xs		font-normal	 text-gray">
                          Same ordering and delivery contact{" "}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="px-6 py-7  custom-scroll-bar overflow-y-auto">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 ">
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            First name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            name="deliveryFirstName"
                            type="text"
                            value={values?.deliveryFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter First Name"
                            style={{
                              border:
                                errors.deliveryFirstName &&
                                touched.deliveryFirstName &&
                                "1px solid red",
                            }}
                          />
                          {errors.deliveryFirstName &&
                            touched.deliveryFirstName && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.deliveryFirstName}
                              </p>
                            )}
                          {errors.deliveryFirstName &&
                            touched.deliveryFirstName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Last name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={values?.deliveryLastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="deliveryLastName"
                            placeholder="Enter Last Name"
                            style={{
                              border:
                                errors.deliveryLastName &&
                                touched.deliveryLastName &&
                                "1px solid red",
                            }}
                          />
                          {errors.deliveryLastName &&
                            touched.deliveryLastName && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.deliveryLastName}
                              </p>
                            )}
                          {errors.deliveryLastName &&
                            touched.deliveryLastName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            disabled
                            type="email"
                            // onChange={handleChange}
                            value={values?.deliveryEmail}
                            name="deliveryEmail"
                            autoComplete="on"
                            placeholder="Enter Email Address"
                            style={{
                              border:
                                errors.deliveryEmail &&
                                touched.deliveryEmail &&
                                "1px solid red",
                              background: "#E0E0E0",
                            }}
                          />
                          {errors.deliveryEmail && touched.deliveryEmail && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.deliveryEmail}
                            </p>
                          )}
                          {errors.deliveryEmail && touched.deliveryEmail && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Mobile
                            <CustomTooltip
                              placement="right"
                              arrow
                              title="Mobile - a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
                            >
                              <HelpIcon
                                sx={{
                                  color: "#E0E0E0",
                                  width: "20px",
                                  marginLeft: "10px",
                                }}
                              />{" "}
                            </CustomTooltip>
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.deliveryMobile}
                            name="deliveryMobile"
                            placeholder="04XX XXX XXX / +61 4XX XXX XXX"
                            style={{
                              border:
                                errors.deliveryMobile &&
                                touched.deliveryMobile &&
                                "1px solid red",
                            }}
                          />
                          {errors.deliveryMobile && touched.deliveryMobile && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.deliveryMobile}
                            </p>
                          )}
                          {errors.deliveryMobile && touched.deliveryMobile && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  activeStatus == 3
                    ? "Active active-table"
                    : "hide-table hidden"
                } grid lg:grid-cols-2 grid-cols-1 gap-4`}
              >
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-lg	 font-bold	 text-darkGreen">
                      Delivery address
                    </h6>
                  </div>
                  <div className="px-6 py-7   custom-scroll-bar overflow-y-auto">
                    <form className="w-full  overflow-y-auto overflow-x-visible	">
                      <div className="flex flex-wrap  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            // disabled
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="address"
                            value={values?.address}
                            autoComplete="on"
                            placeholder="Enter Address"
                            style={{
                              border:
                                errors.address &&
                                touched.address &&
                                "1px solid red",
                            }}
                          />
                          {errors.address && touched.address && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.address}
                            </p>
                          )}
                          {errors.address && touched.address && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative  ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Apartment, floor etc.
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            name="apartment"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.apartment}
                            placeholder="Enter Apartment"
                            style={{
                              border:
                                errors.apartment &&
                                touched.apartment &&
                                "1px solid red",
                            }}
                          />
                          {errors.apartment && touched.apartment && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.apartment}
                            </p>
                          )}
                          {errors.apartment && touched.apartment && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                        <div className="w-full relative  ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Suburb
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.suburb}
                            name="suburb"
                            placeholder="Enter Suburb"
                            style={{
                              border:
                                errors.suburb &&
                                touched.suburb &&
                                "1px solid red",
                            }}
                          />
                          {errors.suburb && touched.suburb && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.suburb}
                            </p>
                          )}
                          {errors.suburb && touched.suburb && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block mb-2  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Postcode
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="Postcode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="postalCode"
                            value={values?.postalCode}
                            placeholder="XXXX"
                            style={{
                              border:
                                errors.postalCode &&
                                touched.postalCode &&
                                "1px solid red",
                            }}
                          />
                          {errors.postalCode && touched.postalCode && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.postalCode}
                            </p>
                          )}
                          {errors.postalCode && touched.postalCode && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                        <div className="w-full relative">
                          <label
                            className="block text-[#2B4447] text-base font-medium mb-2"
                            htmlFor="username"
                          >
                            State
                          </label>
                          <Select
                            className="mt-[3px]"
                            showSearch
                            name="state"
                            style={{ width: "100%", height: "48px" }}
                            placeholder="Select"
                            options={allStateData}
                            onBlur={handleBlur}
                            onChange={(selectedValue) => {
                              // Assuming setValues is a function that updates the state
                              setValues((prevValues) => ({
                                ...prevValues,
                                billingState: selectedValue,
                              }));
                            }}
                            value={values.billingState}
                          />
                        </div>
                      </div>

                      <div className="flex flex-nowrap mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Delivery instructions
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            onChange={handleChange}
                            name="deliveryNotes"
                            value={values?.deliveryNotes}
                            autoComplete="on"
                            placeholder="Notes here -"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center">
                    <h6 className="text-lg	 font-bold text-darkGreen ">
                      Billing address
                    </h6>

                    <div className="flex items-center  gap-1  green-checkbox">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        defaultValue=""
                        onClick={addressSame}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="  dark:text-gray-300"
                      >
                        <p className="text-xs		font-normal	 text-gray">
                          Same delivery and billing address
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="px-6 py-7  custom-scroll-bar overflow-y-auto">
                    <form className="w-full  	 ">
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            // disabled
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="billingAddress"
                            value={values?.billingAddress}
                            autoComplete="on"
                            placeholder="Enter Address"
                            style={{
                              border:
                                errors.billingAddress &&
                                touched.billingAddress &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingAddress && touched.billingAddress && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.billingAddress}
                            </p>
                          )}
                          {errors.billingAddress && touched.billingAddress && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Apartment, floor etc.
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            name="billingApartment"
                            onChange={handleChange}
                            value={values?.billingApartment}
                            type="text"
                            placeholder="Enter Apartment"
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.billingApartment &&
                                touched.billingApartment &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingApartment &&
                            touched.billingApartment && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.billingApartment}
                              </p>
                            )}
                          {errors.billingApartment &&
                            touched.billingApartment && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                        <div className="w-full relative ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Suburb
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="billingSuburb"
                            value={values?.billingSuburb}
                            placeholder="Enter Suburb"
                            style={{
                              border:
                                errors.billingSuburb &&
                                touched.billingSuburb &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingSuburb && touched.billingSuburb && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.billingSuburb}
                            </p>
                          )}
                          {errors.billingSuburb && touched.billingSuburb && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative  ">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	mb-2 "
                            htmlFor="grid-password"
                          >
                            Postcode
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="Postcode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="billingPostalCode"
                            value={values?.billingPostalCode}
                            placeholder="XXXX"
                            style={{
                              border:
                                errors.billingPostalCode &&
                                touched.billingPostalCode &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingPostalCode &&
                            touched.billingPostalCode && (
                              <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                                {errors.billingPostalCode}
                              </p>
                            )}
                          {errors.billingPostalCode &&
                            touched.billingPostalCode && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[49px] right-5 transition-all duration-[0.3s] " />
                            )}
                        </div>
                        <div className="w-full relative  ">
                          <label
                            className="block text-[#2B4447] text-base font-medium mb-2"
                            htmlFor="username"
                          >
                            State
                          </label>
                          <Select
                            className="mt-[3px]"
                            showSearch
                            name="state"
                            style={{ width: "100%", height: "48px" }}
                            placeholder="Select"
                            options={allStateData}
                            onBlur={handleBlur}
                            onChange={(selectedValue) => {
                              setValues((prevValues) => ({
                                ...prevValues,
                                state: selectedValue,
                              }));
                            }}
                            value={values.state}
                          />
                          {errors.billingState && touched.billingState && (
                            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                              {errors.billingState}
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  activeStatus == 4
                    ? "Active active-table"
                    : " hide-table hidden"
                } grid lg:grid-cols-2 grid-cols-1 gap-4`}
              >
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-lg	 font-bold	 text-darkGreen">
                      Payment details
                    </h6>
                  </div>
                  <div className="px-6 py-7   custom-scroll-bar overflow-y-auto ">
                    <form className="w-full  overflow-y-auto overflow-x-visible	">
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block text-[#2B4447] text-base font-medium mb-2"
                            htmlFor="username"
                          >
                            Default payment term
                          </label>
                          <Select
                            className="mt-[3px]"
                            showSearch
                            name="defaultPaymentTerms"
                            style={{ width: "100%", height: "48px" }}
                            placeholder="Select"
                            options={paymentTerm}
                            onBlur={handleBlur}
                            value={values.defaultPaymentTerms}
                            onChange={(e) =>
                              handleSelect(e, "defaultPaymentTerms")
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-nowrap gap-2  mb-5">
                        <div className="w-full relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Default payment method
                          </label>
                          <Select
                            className="mt-[3px]"
                            showSearch
                            name="billingState"
                            style={{ width: "100%", height: "48px" }}
                            placeholder="Select"
                            options={defaultPaymentMethod}
                            // isDisabled={defaultPaymentMethod.length < 1}
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleSelect(e, "defaultPaymentMethodId")
                            }
                            // value={values.billingState}
                          />
                        </div>
                      </div>

                      <div className="">
                        <h5 className="text-base font-medium text-green mb-3">
                          Tax
                        </h5>
                        <div className="flex items-center mb-4 gap-3 hidden ">
                          <input
                            id="NSW"
                            type="checkbox"
                            name="NSW"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                            defaultValue="NSW"
                          />
                          <label
                            htmlFor="NSW"
                            className="ml-2  dark:text-gray-300"
                          >
                            <p className="text-sm	 font-medium text-gray">
                              GST applicable
                            </p>
                          </label>
                        </div>
                        <div className="flex items-center mb-4 gap-2 green-checkbox">
                          <input
                            id="VIC"
                            type="checkbox"
                            name="VIC"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                            defaultValue="VIC"
                          />
                          <label
                            htmlFor="VIC"
                            className="ml-2  dark:text-gray-300"
                          >
                            <p className="text-sm	 font-medium text-gray">
                              WET applicable
                            </p>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className=" w-full  rounded-lg		 border border-inherit bg-white h-fit	 flex flex-col  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center">
                    <h6 className="text-lg	 font-bold text-darkGreen md:w-1/2 w-full">
                      Payment History
                    </h6>

                    <a
                      href="#"
                      className="text-base font-normal	text-darkBlue underline"
                    >
                      See all
                    </a>
                  </div>
                  <div className="w-full  ">
                    {/* <ProductDetails /> */}
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <tbody>
                        <tr
                          className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  `}
                        >
                          <td className=" px-4 py-4 ">
                            <h5 className="font-medium whitespace-no-wrap text-green">
                              Order Number
                            </h5>
                            <p
                              className="text-sm font-normal	text-green cursor-pointer"
                              onClick={() =>
                                navigate(`/dashboard/order-details`)
                              }
                            >
                              Order Date
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <h5 className="font-normal whitespace-no-wrap text-green">
                              $1004.50
                            </h5>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-max	px-3">
                              <div className="dot bg-custom-darkGreen rounded-full	" />
                              <p className="text-green font-medium	text-sm	">
                                Overdue
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr
                          className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  `}
                        >
                          <td className=" px-4 py-4 ">
                            <h5 className="font-medium whitespace-no-wrap text-green">
                              Order Number
                            </h5>
                            <p
                              className="text-sm font-normal	text-green cursor-pointer"
                              onClick={() =>
                                navigate(`/dashboard/order-details`)
                              }
                            >
                              Order Date
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <h5 className="font-normal whitespace-no-wrap text-green">
                              $1004.50
                            </h5>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-center items-center gap-1 radius-30 bg-custom-red h-7	w-max	px-3">
                              <div className="dot bg-custom-darkRed rounded-full	" />
                              <p className="text-red font-medium	text-sm	">
                                Overdue
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr
                          className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  `}
                        >
                          <td className=" px-4 py-4 ">
                            <h5 className="font-medium whitespace-no-wrap text-green">
                              Order Number
                            </h5>
                            <p
                              className="text-sm font-normal	text-green cursor-pointer"
                              onClick={() =>
                                navigate(`/dashboard/order-details`)
                              }
                            >
                              Order Date
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <h5 className="font-normal whitespace-no-wrap text-green">
                              $1004.50
                            </h5>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-max	px-3">
                              <div className="dot bg-custom-darkGreen rounded-full	" />
                              <p className="text-green font-medium	text-sm	">
                                Overdue
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr
                          className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  `}
                        >
                          <td className=" px-4 py-4 ">
                            <h5 className="font-medium whitespace-no-wrap text-green">
                              Order Number
                            </h5>
                            <p
                              className="text-sm font-normal	text-green cursor-pointer"
                              onClick={() =>
                                navigate(`/dashboard/order-details`)
                              }
                            >
                              Order Date
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <h5 className="font-normal whitespace-no-wrap text-green">
                              $1004.50
                            </h5>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-center items-center gap-1 radius-30 bg-custom-yellow h-7	w-max	px-3">
                              <div className="dot bg-custom-darkYellow rounded-full	" />
                              <p className="text-yellow font-medium	text-sm	">
                                Overdue
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default OrderDetails;
