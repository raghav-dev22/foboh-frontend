import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
import Toast from "../Toast";
const OrderDetails = ({ datas }) => {
  console.log(datas, ">>id");
  const navigate = useNavigate();
  const [data, setCustomerDetails] = React.useState();
  const [activeStatus, setActiveStatus] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [isUpdate, setIsUpDate] = useState(false);
  const [initialValues, setInitialValues] = useState({
    createdBy: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    salesRepId: "",
    pricingProfileId: "",
    defaultPaymentMethodId: "",
    tags: [""],
    organisationId: "",
    wetLiable: true,
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
    billingState: "",
    isActive: true,
  });
  useEffect(() => {
    callCustomerDetails();
  }, []);
  const callCustomerDetails = () => {
    // https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/6191384906
    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/${datas}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer data --->", data.orderingFirstName);
        setInitialValues({
          ...initialValues,
          createdBy: data.createdBy,
          businessName: data.businessName,
          abn: data.abn,
          liquorLicence: data.liquorLicence,
          salesRepId: data.salesRepId,
          pricingProfileId: data.pricingProfileId,
          defaultPaymentMethodId: data.defaultPaymentMethodId,
          tags: [data.tags],
          organisationId: data.organisationId,
          wetLiable: true,
          orderingFirstName: data.orderingFirstName,
          orderingLastName: data.orderingLastName,
          orderingMobile: data.orderingMobile,
          orderingEmail: data.orderingEmail,
          deliveryFirstName: data.deliveryFirstName,
          deliveryLastName: data.deliveryLastName,
          deliveryMobile: data.deliveryMobile,
          deliveryEmail: data.deliveryEmail,
          address: data.address,
          apartment: data.apartment,
          suburb: data.suburb,
          postalCode: data.postalCode,
          state: data.state,
          deliveryNotes: data.deliveryNotes,
          billingAddress: data.billingAddress,
          billingApartment: data.billingApartment,
          billingSuburb: data.billingSuburb,
          billingPostalCode: data.billingPostalCode,
          billingState: data.billingState,
          isActive: true,
        });
        setValues({
          ...values,
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
        });
        setCustomerDetails(data);
      });
  };

  const onFinalSubmit = (event) => {
    console.log(datas, "data");
    event.preventDefault();
    // https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Update/6191384906
    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/Update/${datas}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          abn: values?.abn,
          liquorLicence: values?.liquorLicence,
        }),
      }
    ).then((response) => {
      console.log("updatedd", data);
      setShow(false);
      window.alert("Customer updated successful! ");
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
  const handleCloseToast = () => {
    setOpenToast(false);
  };
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
      <Toast
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
        severity={toastSeverity}
      />
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
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-1"
                      d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z"
                      fill="#fff"
                    />
                  </svg>
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
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-1"
                      d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z"
                      fill="#fff"
                    />
                  </svg>
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
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-1"
                      d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z"
                      fill="#fff"
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
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-1"
                      d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z"
                      fill="#fff"
                    />
                  </svg>
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
              <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
                <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
                  <div className="block">
                    <nav className="flex h-[65px] items-center justify-end gap-5 ">
                      <button
                        className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onFinalSubmit}
                        className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                      >
                        Save
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="p-5">
              <div
                className={`relative overflow-x-auto overflow-y-auto h-80 custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white ${
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
                        Delivery date
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
                  <div className="px-6 py-7">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 h-80 no-scrollbar">
                      <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Tom"
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
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Jones"
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
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="devidjond45@gmail.com"
                            style={{
                              border:
                                errors.orderingEmail &&
                                touched.orderingEmail &&
                                "1px solid red",
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
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="0412 345 678"
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
                    <h6 className="text-lg md:w-1/2 w-full	 font-bold text-darkGreen">
                      Delivery contact
                    </h6>

                    <div className="flex items-center  gap-1 md:w-1/2 w-full">
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
                  <div className="px-6 py-7">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 h-80 no-scrollbar">
                      <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Tom"
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
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Jones"
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
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="devidjond45@gmail.com"
                            style={{
                              border:
                                errors.deliveryEmail &&
                                touched.deliveryEmail &&
                                "1px solid red",
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
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="0412 345 678"
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
                  <div className="px-6 py-7">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 h-80 no-scrollbar">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="126 Juliett Street"
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
                      <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Tom"
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
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Jones"
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
                      <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative md:w-1/2 px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
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
                            placeholder="2204"
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
                        <div className="w-full relative md:w-1/2 px-3">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                          >
                            State
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="Postcode"
                            name="state"
                            // disabled={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.state}
                            placeholder="2204"
                            style={{
                              border:
                                errors.state &&
                                touched.state &&
                                "1px solid red",
                            }}
                          />
                          {errors.state && touched.state && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.state}
                            </p>
                          )}
                          {errors.state && touched.state && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Delivery instructions
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            disabled
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
                    <h6 className="text-lg	 font-bold text-darkGreen md:w-1/2 w-full">
                      Billing address
                    </h6>

                    <div className="flex items-center  gap-1 md:w-1/2 w-full">
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
                  <div className="px-6 py-7">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 h-80 no-scrollbar">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
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
                            placeholder="126 Juliett Street"
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
                      <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Tom"
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
                        <div className="w-full relative md:w-1/2 px-3">
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
                            placeholder="Jones"
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
                      <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
                        <div className="w-full relative  px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
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
                            placeholder="2204"
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
                        <div className="w-full relative  px-3">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                          >
                            State
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="Postcode"
                            name="billingState"
                            // disabled={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.billingState}
                            placeholder="2204"
                            style={{
                              border:
                                errors.billingState &&
                                touched.billingState &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingState && touched.billingState && (
                            <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                              {errors.billingState}
                            </p>
                          )}
                          {errors.billingState && touched.billingState && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[45px] right-5 transition-all duration-[0.3s] " />
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
                  <div className="px-6 py-7">
                    <form className="w-full  overflow-y-auto overflow-x-visible	 h-80 no-scrollbar">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Default payment terms
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            disabled
                            type="email"
                            name="email"
                            autoComplete="on"
                            placeholder="30 day"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full relative px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Default payment method
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            name="mobile"
                            placeholder="Bank transfer"
                          />
                        </div>
                      </div>

                      <div className="">
                        <h5 className="text-base font-medium text-green mb-3">
                          Tax
                        </h5>
                        <div className="flex items-center mb-4 gap-3">
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
                        <div className="flex items-center mb-4 gap-3">
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
                      Personal details
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
                              The Union Hotel{" "}
                            </h5>
                            <p className="text-sm font-normal	text-green">
                              jack@union.com
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
                              The Union Hotel{" "}
                            </h5>
                            <p className="text-sm font-normal	text-green">
                              jack@union.com
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
                              The Union Hotel{" "}
                            </h5>
                            <p className="text-sm font-normal	text-green">
                              jack@union.com
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
                              The Union Hotel{" "}
                            </h5>
                            <p className="text-sm font-normal	text-green">
                              jack@union.com
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
