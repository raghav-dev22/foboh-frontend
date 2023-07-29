import React, { useCallback, useEffect, useState } from "react";

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

export const options = [
  { value: 1234, label: "Chocolate" },
  { value: 2345, label: "Strawberry" },
  { value: 3456, label: "Vanilla" },
];

const initialValues = {
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
};

function Organisation() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [logoUri, setLogoUri] = useState("");

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
      if (!localStorage.getItem("organisationID")) {
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
              const organisationSettings = data.data;
              localStorage.setItem("organisationID", organisationID);
              setShow(false);
            }
          })
          .catch((error) => console.log(error));
      } else {
        fetch(
          `https://organization-api-foboh.azurewebsites.net/api/Organization/update?id=${localStorage.getItem(
            "organisationID"
          )}`,
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

  useEffect(() => {
    fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${localStorage.getItem(
        "organisationID"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("get org --> ", data);
        if (data.success) {
          const organisationSettings = data.data[0];
          const categoryList = organisationSettings.categoryList.map((id) => {
            return options.find((obj) => obj.value === parseInt(id));
          });

          setLogoUri(organisationSettings.organisationlogo);
          setValues({
            tradingName: organisationSettings.tradingName,
            businessName: organisationSettings.businessName,
            abn: organisationSettings.abn,
            liquorLicence: organisationSettings.liquorLicense,
            organisationAddress: organisationSettings.organisationAddress,
            organisationAddressApartment: organisationSettings.apartment,
            organisationAddressSuburb:
              organisationSettings.organisationAddressSuburb,
            organisationAddressPostcode: organisationSettings.postcode,
            billingAddress: organisationSettings.billingAddress,
            billingAddressApartment:
              organisationSettings.billingAddressApartment,
            billingAddressSuburb: organisationSettings.billingAddressSuburb,
            billingAddressPostcode: organisationSettings.billingAddressPostCode,
            billingAddressState: organisationSettings.billingAddressState,
            orderingContactFirstName:
              organisationSettings.orderingContactFirstName,
            orderingContactLastName:
              organisationSettings.orderingContactLastName,
            orderingContactEmail: organisationSettings.orderingContactEmail,
            orderingContactMobile: organisationSettings.orderingContactMobile,
            LogisticsContactFirstName:
              organisationSettings.logisticsContactFirstName,
            LogisticsContactLastName:
              organisationSettings.logisticsContactLastName,
            LogisticsContactEmail: organisationSettings.logisticsContactEmail,
            LogisticsContactMobile: organisationSettings.logisticsContactMobile,
            categories: organisationSettings.categories,
            description: organisationSettings.description,
            state: organisationSettings.state,
            postcode: organisationSettings.postcode,
            categoryList: categoryList,
          });
        }
      });
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
    setFile(null);
    setValues({
      ...values,
      organisationlogo: "",
    });
  };

  const handleUpdate = () => {
    open();
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("Data >>>", acceptedFiles[0]);
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("file", file);

      fetch(
        `https://organization-api-foboh.azurewebsites.net/api/Organization/UploadOrganizationImage?organisationID=${localStorage.getItem(
          "organisationID"
        )}`,
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
            setLogoUri(data.blob.uri);
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });

      reader.onload = () => {
        // Do whatever you want with the file contents
        const imgData = reader.result;
        // setImageSrc(imgData);
      };
      reader.readAsDataURL(file);
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
  };

  const handleFormChange = () => {
    setShow(true);
  };

  return (
    <>
      <div>
        <form onChange={handleFormChange}>
          <div className="profile-section  sm:px-11 px-5 h-custom-half overflow-y-scroll	scroll-smooth	scrollable	">
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
            <div className="grid lg:flex gap-5 ">
              <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
                {/* Organization Details ---START */}
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Organisation details{" "}
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full max-w-lg">
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
                            placeholder="Lo-Fi Wines"
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
                            placeholder="LO-FI WINES PTY LTD"
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
                            placeholder="69618617344"
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
                            <ErrorOutlineIcon className="absolute text-red-500 top-[31px] right-5 transition-all duration-[0.3s]" />
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
                            placeholder="LIQO10000000"
                            name="liquorLicence"
                            value={values.liquorLicence}
                            onChange={handleChange}
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
                            defaultValue={""}
                          />
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
                              options={options}
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
                    <div className="w-full max-w-lg">
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
                            placeholder="126 Juliett Street"
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
                            placeholder="Jones"
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
                            placeholder="Marrickville"
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
                            placeholder="2204"
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
                              <option value={"Missouri"}>Missouri</option>
                              <option value={"Texas"}>Texas</option>
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
                    <div className="w-full max-w-lg">
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
                            placeholder="126 Juliett Street"
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
                            placeholder="Jones"
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
                            placeholder="Tom"
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
                            placeholder="Jones"
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
                              <option value={"Missouri"}>Missouri</option>
                              <option value={"Texas"}>Texas</option>
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
              <div className="w-full lg:w-2/5  grid	 gap-5 h-full	">
                {/* Organization Logo ---START */}
                <div className="w-full rounded-md border border-inherit bg-white h-full">
                  <div className="border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base font-medium text-green">
                      Personal details
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="flex justify-start gap-3 items-center">
                      <div className="update-user rounded-full">
                        <img
                          id="previewImage"
                          src={logoUri || defaultImage}
                          alt=""
                          className="w-14	h-14	object-contain	"
                        />
                      </div>
                      <div className="">
                        <h6 className="font-normal text-base text-green">
                          Edit your photo
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
                    <div
                      {...getRootProps()}
                      className="border-darkGreen border border-dashed	flex justify-center items-center rounded-md	h-44 w-full mt-4"
                    >
                      <div className="text-center ">
                        <div className="download-icon relative mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                          <input
                            {...getInputProps()}
                            type="file"
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
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-full	 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Ordering contact
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full max-w-lg">
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
                            placeholder="Tom"
                            name="orderingContactFirstName"
                            value={values.orderingContactFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            placeholder="Jones"
                            name="orderingContactLastName"
                            value={values.orderingContactLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            placeholder="devidjond45@gmail.com"
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
                            className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                            htmlFor="orderingContactMobile"
                          >
                            Mobile
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="orderingContactMobile"
                            type="text"
                            placeholder="0412 345 678"
                            name="orderingContactMobile"
                            value={values.orderingContactMobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-full	 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Logistics contact
                    </h6>
                  </div>
                  <div className="px-6 py-7">
                    <div className="w-full max-w-lg">
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
                            placeholder="Tom"
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
                            placeholder="Jones"
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
                            placeholder="devidjond45@gmail.com"
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
                          </label>
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="LogisticsContactMobile"
                            type="text"
                            placeholder="0412 345 678"
                            name="LogisticsContactMobile"
                            value={values.LogisticsContactMobile}
                            onChange={handleChange}
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
