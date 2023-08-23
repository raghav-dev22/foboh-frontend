import React, { useCallback, useEffect, useRef, useState } from "react";

import OrganisationDetails from "./OrganisationDetails";
import OrganisationAddress from "./OrganisationAddress";
import BillingAddress from "./BillingAddress";
import OrganisationLogo from "./OrganisationLogo";
import LogisticsContact from "./LogisticsContact";
import OrderingContact from "./OrderingContact";
import ProfileHeader from "../dashboard/ProfileHeader";
import { OrganisationSettingsSchema } from "../schemas";
import { useFormik } from "formik";
import Select from "react-select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import {
  updateLogoURI,
  resetLogoURI,
} from "../Redux/Action/organisationLogoSlice";
import { updateUserData } from "../Redux/Action/userSlice";
import { styled } from "@mui/material";

export const options = [
  { value: 1234, label: "Alcoholic Beverage" },
  { value: 2345, label: "Non-Alcoholic Beverage" },
];

let categoryListVar = [];

function Organisation() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [logoUri, setLogoUri] = useState("");
  const fileInputRef = useRef();
  const [showError, setShowError] = useState();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [initialValues, setInitialValues] = useState({
    tradingName: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    organisationAddress: "",
    organisationAddressApartment: "",
    organisationAddressSuburb: "",
    organisationAddressPostcode: "",
    billingAddress: "",
    billingAddressApartment: "",
    billingAddressSuburb: "",
    billingAddressPostcode: "",
    billingAddressState: "",
    orderingContactFirstName: "",
    orderingContactLastName: "",
    orderingContactEmail: "",
    orderingContactMobile: "",
    LogisticsContactFirstName: "",
    LogisticsContactLastName: "",
    LogisticsContactEmail: "",
    LogisticsContactMobile: "",
    categories: [],
    description: "",
    state: "",
    postcode: "",
    categoryList: [],
  });

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
    validationSchema: OrganisationSettingsSchema,
    onSubmit: (values) => {
      console.log(values, "kkk");
      if (!localStorage.getItem("organisationId")) {
        fetch(
          "https://organization-api-foboh.azurewebsites.net/api/Organization/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tradingName: values.tradingName,
              businessName: values.businessName,
              liquorLicense: values.liquorLicence,
              abn: values.abn,
              categories: "",
              organisationlogo: logoUri,
              description: values.description,
              orderingContactFirstName: values.orderingContactFirstName,
              orderingContactLastName: values.orderingContactLastName,
              orderingContactMobile: values.orderingContactMobile,
              orderingContactEmail: values.orderingContactEmail,
              logisticsContactFirstName: values.LogisticsContactFirstName,
              logisticsContactLastName: values.LogisticsContactLastName,
              logisticsContactMobile: values.LogisticsContactMobile,
              logisticsContactEmail: values.LogisticsContactEmail,
              organisationAddress: values.organisationAddress,
              apartment: values.organisationAddress,
              city: "",
              state: values.state,
              suburb: values.organisationAddressSuburb,
              postcode: values.organisationAddressPostcode,
              country: "",
              billingAddress: values.billingAddress,
              billingAddressApartment: values.billingAddressApartment,
              billingAddressSuburb: values.billingAddressSuburb,
              billingAddressPostCode: values.billingAddressPostcode,
              billingAddressState: values.billingAddressState,
              categoryList: values.categoryList.map((obj) => {
                return `${obj.value}`;
              }),
              isActive: true,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              const organisationID = data.data.organisationID;
              console.log("organisationID =>", organisationID);
              localStorage.setItem("organisationId", organisationID);
              const id = localStorage.getItem("ccrn");
              fetch(
                `https://user-api-foboh.azurewebsites.net/api/User/update?ccrn=${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    status: true,
                    role: user.role,
                    meta: user.meta,
                    adId: user.adId,
                    imageUrl: user.imageUrl,
                    bio: user.bio,
                    mobile: user.mobile,
                    organisationId: organisationID,
                    isActive: true,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log("org id updated in user profile--->", data);
                });

              const organisationSettings = data.data;
              setShow(false);
            }
          })
          .catch((error) => console.log(error));
      } else {
        console.log("org id", localStorage.getItem("organisationId"));
        const orgId = localStorage.getItem("organisationId");
        fetch(
          `https://organization-api-foboh.azurewebsites.net/api/Organization/update?id=${orgId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tradingName: values.tradingName,
              businessName: values.businessName,
              liquorLicense: values.liquorLicence,
              abn: values.abn,
              categories: "",
              organisationlogo: logoUri,
              description: values.description,
              orderingContactFirstName: values.orderingContactFirstName,
              orderingContactLastName: values.orderingContactLastName,
              orderingContactMobile: values.orderingContactMobile,
              orderingContactEmail: values.orderingContactEmail,
              logisticsContactFirstName: values.LogisticsContactFirstName,
              logisticsContactLastName: values.LogisticsContactLastName,
              logisticsContactMobile: values.LogisticsContactMobile,
              logisticsContactEmail: values.LogisticsContactEmail,
              organisationAddress: values.organisationAddress,
              apartment: values.organisationAddress,
              city: "",
              state: values.state,
              postcode: values.organisationAddressPostcode,
              country: "",
              suburb: values.organisationAddressSuburb,
              billingAddress: values.billingAddress,
              billingAddressApartment: values.billingAddressApartment,
              billingAddressSuburb: values.billingAddressSuburb,
              billingAddressPostCode: values.billingAddressPostcode,
              billingAddressState: values.billingAddressState,
              categoryList: values.categoryList.map((obj) => {
                return `${obj.value}`;
              }),
              isActive: true,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              setShow(false);
            }
          })
          .catch((error) => console.log(error));
      }
    },
  });
  // console.log("bbbbb", errors)

  useEffect(() => {
    const orgId = localStorage.getItem("organisationId");
    if (orgId) {
      fetch(`https://masters-api-foboh.azurewebsites.net/api/Category/get`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("categories >>", data);
          if (data.success) {
            const catList = data.data.map((item) => {
              return {
                value: item.categoryId,
                label: item.categoryName,
              };
            });
            setCategories([...catList]);
            categoryListVar = [...catList];
          }
        })
        .then(() => {
          fetch(
            `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${orgId}`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("get org --> ", data);
              if (data.success && data.data.length === 1) {
                const organisationSettings = data.data[0];
                dispatch(
                  updateUserData({
                    ...user,
                    organisationId: organisationSettings.organisationID,
                  })
                );
                const categoryList = organisationSettings.categoryList.map(
                  (id) => {
                    return categoryListVar.find((obj) => obj.value === id);
                  }
                );

                setLogoUri(organisationSettings.organisationlogo);
                setInitialValues({
                  tradingName: organisationSettings.tradingName,
                  businessName: organisationSettings.businessName,
                  abn: organisationSettings.abn,
                  liquorLicence: organisationSettings.liquorLicense,
                  organisationAddress: organisationSettings.organisationAddress,
                  organisationAddressApartment: organisationSettings.apartment,
                  organisationAddressSuburb: organisationSettings.suburb,
                  organisationAddressPostcode: organisationSettings.postcode,
                  billingAddress: organisationSettings.billingAddress,
                  billingAddressApartment:
                    organisationSettings.billingAddressApartment,
                  billingAddressSuburb:
                    organisationSettings.billingAddressSuburb,
                  billingAddressPostcode:
                    organisationSettings.billingAddressPostCode,
                  billingAddressState: organisationSettings.billingAddressState,
                  orderingContactFirstName:
                    organisationSettings.orderingContactFirstName,
                  orderingContactLastName:
                    organisationSettings.orderingContactLastName,
                  orderingContactEmail:
                    organisationSettings.orderingContactEmail,
                  orderingContactMobile:
                    organisationSettings.orderingContactMobile,
                  LogisticsContactFirstName:
                    organisationSettings.logisticsContactFirstName,
                  LogisticsContactLastName:
                    organisationSettings.logisticsContactLastName,
                  LogisticsContactEmail:
                    organisationSettings.logisticsContactEmail,
                  LogisticsContactMobile:
                    organisationSettings.logisticsContactMobile,
                  categories: organisationSettings.categories,
                  description: organisationSettings.description,
                  state: organisationSettings.state,
                  postcode: organisationSettings.postcode,
                  categoryList: categoryList,
                });
                setValues({
                  tradingName: organisationSettings.tradingName,
                  businessName: organisationSettings.businessName,
                  abn: organisationSettings.abn,
                  liquorLicence: organisationSettings.liquorLicense,
                  organisationAddress: organisationSettings.organisationAddress,
                  organisationAddressApartment: organisationSettings.apartment,
                  organisationAddressSuburb: organisationSettings.suburb,
                  organisationAddressPostcode: organisationSettings.postcode,
                  billingAddress: organisationSettings.billingAddress,
                  billingAddressApartment:
                    organisationSettings.billingAddressApartment,
                  billingAddressSuburb:
                    organisationSettings.billingAddressSuburb,
                  billingAddressPostcode:
                    organisationSettings.billingAddressPostCode,
                  billingAddressState: organisationSettings.billingAddressState,
                  orderingContactFirstName:
                    organisationSettings.orderingContactFirstName,
                  orderingContactLastName:
                    organisationSettings.orderingContactLastName,
                  orderingContactEmail:
                    organisationSettings.orderingContactEmail,
                  orderingContactMobile:
                    organisationSettings.orderingContactMobile,
                  LogisticsContactFirstName:
                    organisationSettings.logisticsContactFirstName,
                  LogisticsContactLastName:
                    organisationSettings.logisticsContactLastName,
                  LogisticsContactEmail:
                    organisationSettings.logisticsContactEmail,
                  LogisticsContactMobile:
                    organisationSettings.logisticsContactMobile,
                  categories: organisationSettings.categories,
                  description: organisationSettings.description,
                  state: organisationSettings.state,
                  postcode: organisationSettings.postcode,
                  categoryList: categoryList,
                });
              }
            });
        })
        .catch((error) => console.log(error));
    }

    console.log("userData >>", user);
  }, []);

  console.log(values);

  // Category List
  const handleCategoriesChange = (e) => {
    setValues({
      ...values,
      categories: [...e],
      categoryList: [...e],
    });
  };

  // Check Box --- Same as Organisation Address
  const handleCheckbox = (e) => {
    console.log("e --->", e.target.checked);

    setCheck(e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        billingAddress: values.organisationAddress,
        billingAddressApartment: values.organisationAddressApartment,
        billingAddressSuburb: values.organisationAddressSuburb,
        billingAddressPostcode: values.organisationAddressPostcode,
        billingAddressState: values.state,
      });
    }
  };

  // Upload Image
  const [file, setFile] = useState([]);
  const defaultImage = "/assets/update-user.png";

  const handleDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("delet")
    setFile(null);

    setLogoUri(""); 
    setValues({
      ...values,
      organisationlogo: "",
    });
    setShow(true)
  };

  const handleUpdate = () => {
    open();
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("Data >>>", acceptedFiles[0]);
    const file = acceptedFiles[0];
    if (file) {
      const fileNameParts = file.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      // List of allowed image extensions (add more if needed)
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

      if (allowedExtensions.includes(fileExtension)) {
        setShowError(false);
        const reader = new FileReader();
        const formData = new FormData();
        formData.append("file", file);
        const orgId = localStorage.getItem("organisationId");
        fetch(
          `https://organization-api-foboh.azurewebsites.net/api/Organization/UploadOrganizationImage?organisationID=${orgId}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server
            console.log("user value --->", values);
            console.log("Server response:", data);

            if (!data.error) {
              console.log("uri --->", data.blob.uri);
              setShow(true);
              setLogoUri(data?.blob.uri);
              dispatch(updateLogoURI(data?.blob.uri));
            }
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error("Error:", error);
          });
      } else {
        setShowError(true);
        // Clear the file input field
        fileInputRef.current.value = "";
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleReset = () => {
    setShow(false);
    setValues(initialValues);
  };

  const handleFormChange = () => {
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

  return (
    <>
      <div>
        <form onChange={handleFormChange}>
          <div className="profile-section  sm:px-11 px-5 h-[86vh] overflow-y-scroll	scroll-smooth	scrollable	">
            {show && (
              <ProfileHeader
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                setShow={setShow}
              />
            )}
            <div className="sm:py-12 py-8">
              <h4 className="text-green text-2xl	font-semibold pb-2	">
                {" "}
                Organisation settings
              </h4>
              <p className="text-gray font-medium	 text-sm	">
                Keep your organisation details up to date
              </p>
            </div>
            <div className="lg:flex gap-5 ">
              <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
                {/* Organization Details ---START */}
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Organisation details{" "}
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full ">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Trading name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            name="tradingName"
                            type="text"
                            placeholder="Trading name"
                            value={values.tradingName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.tradingName &&
                                touched.tradingName &&
                                "1px solid red",
                            }}
                          />
                          {errors.tradingName && touched.tradingName && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                              {errors.tradingName}
                            </p>
                          )}
                          {errors.tradingName && touched.tradingName && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm font-medium	 "
                            htmlFor="grid-last-name"
                          >
                            Business name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Business name"
                            name="businessName"
                            value={values.businessName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.businessName &&
                                touched.businessName &&
                                "1px solid red",
                            }}
                          />
                          {errors.businessName && touched.businessName && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                              {errors.businessName}
                            </p>
                          )}
                          {errors.businessName && touched.businessName && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 relative">
                        <div className="w-full px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            ABN
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="ABN"
                            name="abn"
                            value={values.abn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.abn && touched.abn && "1px solid red",
                            }}
                          />
                          {errors.abn && touched.abn && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                              {errors.abn}
                            </p>
                          )}
                          {errors.abn && touched.abn && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 relative">
                        <div className="w-full px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="grid-password"
                          >
                            Liquor licence
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="Liquor licence"
                            name="liquorLicence"
                            value={values.liquorLicence}
                            onChange={handleChange}
                            maxLength={14}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.liquorLicence &&
                                touched.liquorLicence &&
                                "1px solid red",
                            }}
                          />
                          {errors.liquorLicence && touched.liquorLicence && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                              {errors.liquorLicence}
                            </p>
                          )}
                          {errors.liquorLicence && touched.liquorLicence && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 relative">
                        <div className="w-full px-3">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            rows={4}
                            name="description"
                            onChange={handleChange}
                            value={values.description}
                            className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                            placeholder="Leave a comment..."
                            maxLength={256}
                            defaultValue={""}
                            style={{
                              border: errors.description && "1px solid red",
                            }}
                          />
                          {errors.description && (
                            <p className="mt-2 mb-2 text-red-500">
                              {errors.description}
                            </p>
                          )}
                          {/* // />  */}
                          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div className="w-full mt-5 px-3">
                          <label
                            className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                            htmlFor="CategoryList"
                          >
                            Categories
                          </label>
                          <div className="w-full">
                            <Select
                              id="CategoryList"
                              name="categoryList"
                              isMulti
                              value={values.categoryList}
                              onChange={handleCategoriesChange}
                              isDisabled={!categories.length}
                              options={categories}
                              className="basic-multi-select "
                              classNamePrefix="select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Organization Details ---END */}

                {/* Organization Address ---START  */}
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Organisation address
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full ">
                      <div className="flex flex-wrap -mx-3 mb-5 items-start">
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="organisationAddress"
                          >
                            Address
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="organisationAddress"
                            type="text"
                            placeholder="Address"
                            name="organisationAddress"
                            value={values.organisationAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.organisationAddress &&
                                touched.organisationAddress &&
                                "1px solid red",
                            }}
                          />
                          {errors.organisationAddress &&
                            touched.organisationAddress && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                {errors.organisationAddress}
                              </p>
                            )}
                          {errors.organisationAddress &&
                            touched.organisationAddress && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="organisationAddressApartment"
                          >
                            Apartment, floor etc. (optional)
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="organisationAddressApartment"
                            type="text"
                            placeholder="Apartment, floor etc. (optional)"
                            name="organisationAddressApartment"
                            value={values.organisationAddressApartment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.organisationAddressApartment &&
                                touched.organisationAddressApartment &&
                                "1px solid red",
                            }}
                          />
                          {errors.organisationAddressApartment &&
                            touched.organisationAddressApartment && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.organisationAddressApartment}
                              </p>
                            )}
                          {errors.organisationAddressApartment &&
                            touched.organisationAddressApartment && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 items-start">
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="organisationAddressSuburb"
                          >
                            Suburb
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="organisationAddressSuburb"
                            type="text"
                            placeholder="Suburb"
                            name="organisationAddressSuburb"
                            value={values.organisationAddressSuburb}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.organisationAddressSuburb &&
                                touched.organisationAddressSuburb &&
                                "1px solid red",
                            }}
                          />
                          {errors.organisationAddressSuburb &&
                            touched.organisationAddressSuburb && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.organisationAddressSuburb}
                              </p>
                            )}
                          {errors.organisationAddressSuburb &&
                            touched.organisationAddressSuburb && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[31px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="organisationAddressPostcode"
                          >
                            Postcode
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="organisationAddressPostcode"
                            type="text"
                            placeholder="Postcode"
                            name="organisationAddressPostcode"
                            value={values.organisationAddressPostcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.organisationAddressPostcode &&
                                touched.organisationAddressPostcode &&
                                "1px solid red",
                            }}
                          />
                          {errors.organisationAddressPostcode &&
                            touched.organisationAddressPostcode && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.organisationAddressPostcode}
                              </p>
                            )}
                          {errors.organisationAddressPostcode &&
                            touched.organisationAddressPostcode && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                            htmlFor="state"
                          >
                            State
                          </label>
                          <div className="relative">
                            <select
                              value={values.state} // Bind the selected state value to the state variable
                              onChange={handleChange}
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="state"
                            >
                              <option value={""}>Select a state</option>
                              <option value={"NSW"}>NSW</option>
                              <option value={"VIC"}>VIC</option>
                              <option value={"QLD"}>QLD</option>
                              <option value={"WA"}>WA</option>
                              <option value={"SA"}>SA</option>
                              <option value={"TAS"}>TAS</option>
                              <option value={"ACT"}>ACT</option>
                              <option value={"NT"}>NT</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Organization Address ---END  */}

                {/* Billing Address ---START */}
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Billing address
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full">
                      <div className="flex items-center mb-5">
                        <input
                          onChange={handleCheckbox}
                          id="same-address"
                          type="checkbox"
                          name="checkbox"
                          checked={check}
                          defaultValue=""
                          className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="same-address"
                          className="ml-2 sm:text-base text-sm		 font-normal	 text-green dark:text-gray-300"
                        >
                          Use same address as Organisation for Billing{" "}
                        </label>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 items-start">
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                            htmlFor="billingAddress"
                          >
                            Address
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="billingAddress"
                            type="text"
                            placeholder="Address"
                            name="billingAddress"
                            value={values.billingAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.billingAddress &&
                                touched.billingAddress &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingAddress && touched.billingAddress && (
                            <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                              {errors.billingAddress}
                            </p>
                          )}
                          {errors.billingAddress && touched.billingAddress && (
                            <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                            htmlFor="billingAddressApartment"
                          >
                            Apartment, floor etc. (optional)
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="billingAddressApartment"
                            type="text"
                            placeholder="Apartment, floor etc. (optional)"
                            name="billingAddressApartment"
                            value={values.billingAddressApartment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.billingAddressApartment &&
                                touched.billingAddressApartment &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingAddressApartment &&
                            touched.billingAddressApartment && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.billingAddressApartment}
                              </p>
                            )}
                          {errors.billingAddressApartment &&
                            touched.billingAddressApartment && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 items-start">
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                            htmlFor="billingAddressSuburb"
                          >
                            Suburb
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="billingAddressSuburb"
                            type="text"
                            placeholder="Suburb"
                            name="billingAddressSuburb"
                            value={values.billingAddressSuburb}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.billingAddressSuburb &&
                                touched.billingAddressSuburb &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingAddressSuburb &&
                            touched.billingAddressSuburb && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.billingAddressSuburb}
                              </p>
                            )}
                          {errors.billingAddressSuburb &&
                            touched.billingAddressSuburb && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                            htmlFor="billingAddressPostcode"
                          >
                            Postcode
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="billingAddressPostcode"
                            type="text"
                            placeholder="Postcode"
                            name="billingAddressPostcode"
                            value={values.billingAddressPostcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.billingAddressPostcode &&
                                touched.billingAddressPostcode &&
                                "1px solid red",
                            }}
                          />
                          {errors.billingAddressPostcode &&
                            touched.billingAddressPostcode && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.billingAddressPostcode}
                              </p>
                            )}
                          {errors.billingAddressPostcode &&
                            touched.billingAddressPostcode && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/3	 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                            htmlFor="billingAddressState"
                          >
                            State
                          </label>
                          <div className="relative">
                            <select
                              value={values.billingAddressState} // Bind the selected state value to the state variable
                              onChange={handleChange}
                              name="billingAddressState"
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="billingAddressState"
                            >
                              <option value={""}>Select a state</option>
                              <option value={"NSW"}>NSW</option>
                              <option value={"VIC"}>VIC</option>
                              <option value={"QLD"}>QLD</option>
                              <option value={"WA"}>WA</option>
                              <option value={"SA"}>SA</option>
                              <option value={"TAS"}>TAS</option>
                              <option value={"ACT"}>ACT</option>
                              <option value={"NT"}>NT</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Billing Address ---END */}
              </div>
              <div className="w-full lg:w-2/5 gap-5 h-full	">
                {/* Organization Logo ---START */}
                <div className="w-full rounded-md border border-inherit bg-white h-full mt-[1rem] sm:mt-0 md:mt-0 lg:mt-0">
                  <div className="border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base font-medium text-green">
                      Organisation logo
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="flex justify-start gap-3 items-center">
                      <div className="update-user rounded-full">
                        {logoUri ? (
                          <img
                            id="previewImage"
                            src={logoUri || defaultImage}
                            alt=""
                            className="w-[187px]	h-[58px]	object-cover"
                          />
                        ) : (
                          <div className="bg-[#D9D9D9] h-[58px] w-[187px]"></div>
                        )}
                      </div>
                      <div className="">
                        <h6 className="font-normal text-base text-green">
                          Edit your logo
                        </h6>
                        <div className=" pt-1 flex justify-start gap-2">
                          <p
                            onClick={handleDelete}
                            className="text-gray font-normal cursor-pointer text-sm"
                          >
                            Delete
                          </p>
                          <p
                            onClick={handleUpdate}
                            className="text-sm font-normal cursor-pointer text-lime-600"
                          >
                            Update
                          </p>
                        </div>
                      </div>
                    </div>
                    {showError && (
                      <p className="mt-2 mb-2 text-red-500 text-sm">
                        Invalid file format. Please upload an image (jpg, jpeg,
                        png, or gif).
                      </p>
                    )}
                    <div
                      {...getRootProps()}
                      className="border-darkGreen border border-dashed	flex justify-center items-center rounded-md	h-44 w-full mt-4"
                    >
                      <div className="text-center ">
                        <div className="download-icon relative mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                          <input
                            {...getInputProps()}
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="download-file w-full h-full rounded-full absolute opacity-0	"
                            // value={imageSrc}
                          />
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z"
                              fill="#147D73"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z"
                              fill="#147D73"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z"
                              fill="#147D73"
                            />
                          </svg>
                        </div>

                        {isDragActive ? (
                          <p className="text-xs	text-gray leading-5 font-normal">
                            Drop the files here ...
                          </p>
                        ) : (
                          <p className="text-xs	text-gray leading-5 font-normal	">
                            <span className="text-lime-600 	">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        )}

                        <p className="text-xs text-gray	font-normal leading-5">
                          SVG, PNG or JPG{" "}
                        </p>
                        <p className="text-xs text-gray	font-normal leading-5">
                          (max, 800 X 800px)
                        </p>
                      </div>
                    </div>
                  </div>
                  {<img src={logoUri} alt="" />}
                </div>
                {/* Organization Logo ---END */}

                {/* Ordering Contact ---START */}
                <div className="   w-full rounded-lg border border-inherit bg-white h-full my-[1rem] ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Ordering contact
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full ">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="orderingContactFirstName"
                          >
                            First name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="orderingContactFirstName"
                            type="text"
                            placeholder="First name"
                            name="orderingContactFirstName"
                            value={values.orderingContactFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[A-Za-z]*$/; // Regular expression to match only letters (both uppercase and lowercase)
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            style={{
                              border:
                                errors.orderingContactFirstName &&
                                touched.orderingContactFirstName &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingContactFirstName &&
                            touched.orderingContactFirstName && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                {errors.orderingContactFirstName}
                              </p>
                            )}
                          {errors.orderingContactFirstName &&
                            touched.orderingContactFirstName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="orderingContactLastName"
                          >
                            Last name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="orderingContactLastName"
                            type="text"
                            placeholder="Last name"
                            name="orderingContactLastName"
                            value={values.orderingContactLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[A-Za-z]*$/; // Regular expression to match only letters (both uppercase and lowercase)
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            style={{
                              border:
                                errors.orderingContactLastName &&
                                touched.orderingContactLastName &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingContactLastName &&
                            touched.orderingContactLastName && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.orderingContactLastName}
                              </p>
                            )}
                          {errors.orderingContactLastName &&
                            touched.orderingContactLastName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 relative">
                        <div className="w-full px-3">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="orderingContactEmail"
                          >
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="orderingContactEmail"
                            type="email"
                            placeholder="Email"
                            name="orderingContactEmail"
                            value={values.orderingContactEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.orderingContactEmail &&
                                touched.orderingContactEmail &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingContactEmail &&
                            touched.orderingContactEmail && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.orderingContactEmail}
                              </p>
                            )}
                          {errors.orderingContactEmail &&
                            touched.orderingContactEmail && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5 relative">
                        <div className="w-full px-3">
                          <label
                            className="tracking-wide text-gray-700 text-base flex items-center	 font-medium	 "
                            htmlFor="orderingContactMobile"
                          >
                            Mobile
                            <CustomTooltip
                              placement="right"
                              arrow
                              title="Please use a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
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
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="orderingContactMobile"
                            type="text"
                            placeholder="Mobile No"
                            name="orderingContactMobile"
                            value={values.orderingContactMobile}
                            onChange={handleChange}
                            maxLength={20}
                            onBlur={handleBlur}
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            style={{
                              border:
                                errors.orderingContactMobile &&
                                touched.orderingContactMobile &&
                                "1px solid red",
                            }}
                          />
                          {errors.orderingContactMobile &&
                            touched.orderingContactMobile && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.orderingContactMobile}
                              </p>
                            )}
                          {errors.orderingContactMobile &&
                            touched.orderingContactMobile && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Organization Contact ---END */}

                {/* Logistics Contact ---START  */}
                <div className="   w-full  rounded-lg border border-inherit bg-white h-full	mb-[1rem] sm:mb-0 md:mb-0 lg:mb-0 ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Logistics contact
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full ">
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium"
                            htmlFor="LogisticsContactFirstName"
                          >
                            First name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="LogisticsContactFirstName"
                            type="text"
                            placeholder="First name"
                            name="LogisticsContactFirstName"
                            value={values.LogisticsContactFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.LogisticsContactFirstName &&
                                touched.LogisticsContactFirstName &&
                                "1px solid red",
                            }}
                          />
                          {errors.LogisticsContactFirstName &&
                            touched.LogisticsContactFirstName && (
                              <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                {errors.LogisticsContactFirstName}
                              </p>
                            )}
                          {errors.LogisticsContactFirstName &&
                            touched.LogisticsContactFirstName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="LogisticsContactLastName"
                          >
                            Last name
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="LogisticsContactLastName"
                            type="text"
                            placeholder="Last name"
                            name="LogisticsContactLastName"
                            value={values.LogisticsContactLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.LogisticsContactLastName &&
                                touched.LogisticsContactLastName &&
                                "1px solid red",
                            }}
                          />
                          {errors.LogisticsContactLastName &&
                            touched.LogisticsContactLastName && (
                              <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                {errors.LogisticsContactLastName}
                              </p>
                            )}
                          {errors.LogisticsContactLastName &&
                            touched.LogisticsContactLastName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="LogisticsContactEmail"
                          >
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="LogisticsContactEmail"
                            type="email"
                            placeholder="Email"
                            name="LogisticsContactEmail"
                            value={values.LogisticsContactEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.LogisticsContactEmail &&
                                touched.LogisticsContactEmail &&
                                "1px solid red",
                            }}
                          />
                          {errors.LogisticsContactEmail &&
                            touched.LogisticsContactEmail && (
                              <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                {errors.LogisticsContactEmail}
                              </p>
                            )}
                          {errors.LogisticsContactEmail &&
                            touched.LogisticsContactEmail && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full px-3 relative">
                          <label
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="LogisticsContactMobile"
                          >
                            Mobile
                            <CustomTooltip
                              placement="right"
                              arrow
                              title="Please use a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
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
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="LogisticsContactMobile"
                            type="text"
                            placeholder="Mobile No"
                            name="LogisticsContactMobile"
                            value={values.LogisticsContactMobile}
                            onChange={handleChange}
                            maxLength={20}
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onBlur={handleBlur}
                            style={{
                              border:
                                errors.LogisticsContactMobile &&
                                touched.LogisticsContactMobile &&
                                "1px solid red",
                            }}
                          />
                          {errors.LogisticsContactMobile &&
                            touched.LogisticsContactMobile && (
                              <p className="mt-2 mb-2 text-red-500 font-normal	text-xs	">
                                {errors.LogisticsContactMobile}
                              </p>
                            )}
                          {errors.LogisticsContactMobile &&
                            touched.LogisticsContactMobile && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                            )}
                          {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Logistics Contact ---END */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Organisation;
