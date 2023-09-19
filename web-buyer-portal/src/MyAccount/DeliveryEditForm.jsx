import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import Select from "react-select";
import { DeliveryBillingSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getBuyerValues } from "../helpers/setBuyerValues";

const DeliveryEditForm = () => {
  const initialValues = {
    DeliveryAddress: "",
    Apartment: "",
    City: "",
    Postcode: "",
    Notes: "",
    DeliveryAddressState: "",
    Country: "",
    BillingAddress: "",
    BillingApartment: "",
    BillingCity: "",
    BillingPostcode: "",
    BillingNotes: "",
    BillingAddressState: "",
  };

  const navigate = useNavigate();
  // console.log(buyer, "hhhh");
  const [selectedOption, setSelectedOption] = useState(null);
  const [cart, setCart] = useState();

  const stateOptions = [
    { label: "Victoria", value: "option1" },
    { label: "Queensland", value: "option2" },
    { label: "Western Australia", value: "option3" },
  ];

  const countryOptions = [
    { label: "Victoria", value: "option1" },
    { label: "Queensland", value: "option2" },
    { label: "Western Australia", value: "option3" },
  ];

  const cityOptions = [
    { label: "Ballina", value: "option1" },
    { label: "Balranald	", value: "option2" },
    { label: "Batemans Bay", value: "option3" },
  ];

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: DeliveryBillingSchema,
    onSubmit: (values) => {
      console.log(values);
      localStorage.setItem("deliveryEdit", JSON.stringify(cart));
      navigate("/home/profile");
      setCart(values);
      console.log(cart, "flag>>");
    },
  });

  useEffect(() => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));

    getBuyerValues(buyerId).then((buyer) => {
      const deliveryCity = cityOptions.find(
        (city) => city.label === buyer?.suburb
      );

      const billingCity = cityOptions.find(
        (city) => city.label === buyer?.billingSuburb
      );

      const deliveryState = stateOptions.find(
        (state) => state.label === buyer?.state
      );

      const billingState = stateOptions.find(
        (state) => state.label === buyer?.billingState
      );

      setValues({
        DeliveryAddress: buyer?.address,
        Apartment: buyer?.apartment,
        City: deliveryCity,
        Postcode: buyer?.postalCode,
        Notes: buyer?.deliveryNotes,
        DeliveryAddressState: deliveryState,
        Country: "",
        BillingAddress: buyer?.billingAddress,
        BillingApartment: buyer?.billingApartment,
        BillingCity: billingCity,
        BillingPostcode: buyer?.billingPostalCode,
        BillingNotes: "",
        BillingAddressState: billingState,
      });
    });
  }, []);

  const handleSelect = (e, name) => {
    if (name === "City") {
      setValues({
        ...values,
        City: e,
      });
    } else if (name === "DeliveryAddressState") {
      setValues({
        ...values,
        DeliveryAddressState: e,
      });
    } else if (name === "BillingCity") {
      setValues({
        ...values,
        BillingCity: e,
      });
    } else if (name === "BillingAddressState") {
      setValues({
        ...values,
        BillingCity: e,
      });
    }
  };

  console.log("error>>", values);

  const handleSubmitBtn = (e) => {
    const { cbrn } = JSON.parse(localStorage.getItem("buyerInfo"));
    console.log("cbrn", cbrn);

    fetch(
      `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/Buyer-AddressUpdate?cbrn=${cbrn}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: values?.DeliveryAddress,
          apartment: values?.Apartment,
          suburb: values?.City?.label,
          postalCode: values?.Postcode,
          state: values?.DeliveryAddressState?.label,
          deliveryNotes: values?.Notes,
          billingAddress: values?.BillingAddress,
          billingApartment: values?.BillingApartment,
          billingSuburb: values?.BillingCity?.label,
          billingPostalCode: values?.BillingPostcode,
          billingState: values?.BillingAddressState?.label,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Buyer address update", data);
        navigate("/home/profile");
      })
      .catch((error) => console.log(error));
  };

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = (e) => {
    const checked = e.target.checked;

    checked
      ? setValues({
          ...values,
          BillingAddress: values?.DeliveryAddress,
          BillingApartment: values?.Apartment,
          BillingCity: values?.City,
          BillingPostcode: values?.Postcode,
          BillingNotes: values?.Notes,
          BillingAddressState: values?.DeliveryAddressState,
        })
      : setValues({
          ...values,
          BillingAddress: "",
          BillingApartment: "",
          BillingCity: {},
          BillingPostcode: "",
          BillingNotes: "",
          BillingAddressState: {},
        });
  };

  console.log(isChecked, "toggleCheckbox");
  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className={`relative mb-8 `} data-te-input-wrapper-init>
          <label
            htmlFor="DeliveryAddress"
            className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
          >
            Address
          </label>

          <input
            type="text"
            id="DeliveryAddress"
            name="DeliveryAddress"
            className="pl-custom-left"
            value={values?.DeliveryAddress}
            autoComplete="on"
            onChange={handleChange}
            style={{
              border: errors.DeliveryAddress && "1px solid red",
            }}
          />
          {errors.DeliveryAddress && (
            <p className="mt-2 mb-2 text-red-500 text-xs">
              {errors.DeliveryAddress}
            </p>
          )}
          {errors.DeliveryAddress && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
          )}
        </div>
        <div className="flex flex-nowrap  gap-8">
          <div className="w-full mb-8 relative">
            <label
              htmlFor="Apartment"
              className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
            >
              Appartment, Floor etc.
            </label>
            <input
              type="text"
              id="Apartment"
              name="Apartment"
              value={values.Apartment}
              onChange={handleChange}
              className="pl-custom-left"
              style={{
                border: errors.Apartment && "1px solid red",
              }}
            />
            {errors.Apartment && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.Apartment}
              </p>
            )}
            {errors.Apartment && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-8 relative">
            <label
              htmlFor="City"
              className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
            >
              City
            </label>
            <Select
              type="text"
              placeholder="City"
              id="City"
              onChange={(e) => handleSelect(e, "City")}
              name="City"
              value={values.City}
              options={cityOptions}
              className=""
              style={{
                border: errors.City && "1px solid red",
              }}
            />
            {errors.City && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.City}</p>
            )}
          </div>
          <div className="w-full mb-8 relative">
            <label
              htmlFor="Postcode"
              className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
            >
              Postcode
            </label>
            <input
              type="text"
              id="Postcode"
              value={values.Postcode}
              onChange={handleChange}
              name="Postcode"
              className="pl-custom-left"
              style={{
                border: errors.Postcode && "1px solid red",
              }}
            />
            {errors.Postcode && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.Postcode}
              </p>
            )}
            {errors.Postcode && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-8 relative">
            <label
              htmlFor="DeliveryAddressState"
              className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
            >
              State
            </label>
            <Select
              type="text"
              defaultValue={`DeliveryAddressState`}
              placeholder="State"
              id="DeliveryAddressState"
              onChange={(e) => handleSelect(e, "DeliveryAddressState")}
              name="DeliveryAddressState"
              value={values.DeliveryAddressState}
              options={stateOptions}
              className=""
              style={{
                border: errors.DeliveryAddressState && "1px solid red",
              }}
            />
            {errors.DeliveryAddressState && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.DeliveryAddressState}
              </p>
            )}
          </div>
        </div>
        <div className={`relative mb-8 `} data-te-input-wrapper-init>
          <label
            htmlFor="Notes"
            className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
          >
            Notes
          </label>

          <input
            type="text"
            id="Notes"
            className="pl-custom-left"
            name="Notes"
            value={values.Notes}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Delivery instructions"
            style={{
              border: errors.Notes && "1px solid red",
            }}
          />
          {errors.Notes && (
            <p className="mt-2 mb-2 text-red-500 text-xs">{errors.Notes}</p>
          )}
          {errors.Notes && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
          )}
          <div className="absolute top-[46px] left-[12px]">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_18_521"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={20}
                height={20}
              >
                <path d="M20 0H0V20H20V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_18_521)">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.56524 3.23223C2.03408 2.76339 2.66996 2.5 3.333 2.5H9.16634C9.62657 2.5 9.99963 2.8731 9.99963 3.33333C9.99963 3.79357 9.62657 4.16667 9.16634 4.16667H3.333C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.333 17.5H14.9996C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1265 10 17.4996 10.3731 17.4996 10.8333V16.6667C17.4996 17.3297 17.2362 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9996 19.1667H3.333C2.66996 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                    fill="#637381"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.6663 2.39909C16.4185 2.39909 16.1808 2.49754 16.0056 2.67278L8.25216 10.4262L7.81166 12.1882L9.57365 11.7477L17.3271 3.99427C17.5023 3.81903 17.6008 3.58135 17.6008 3.33352C17.6008 3.0857 17.5023 2.84802 17.3271 2.67278C17.1518 2.49754 16.9142 2.39909 16.6663 2.39909ZM14.8271 1.49427C15.3149 1.00647 15.9765 0.732422 16.6663 0.732422C17.3562 0.732422 18.0178 1.00647 18.5056 1.49427C18.9934 1.98207 19.2674 2.64367 19.2674 3.33352C19.2674 4.02338 18.9934 4.68498 18.5056 5.17278L10.5889 13.0894C10.4821 13.1962 10.3483 13.272 10.2018 13.3086L6.86847 14.142C6.58449 14.213 6.28408 14.1298 6.0771 13.9228C5.87012 13.7158 5.78691 13.4154 5.8579 13.1314L6.69124 9.79808C6.72787 9.65155 6.80363 9.51773 6.91043 9.41093L14.8271 1.49427Z"
                    fill="#637381"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="">
          <div className="  pb-8">
            <h2 className="font-bold text-xl	 text-[#563FE3]">
              Billing Address
            </h2>
          </div>

          <div className={`relative mb-8 `} data-te-input-wrapper-init>
            <label className="md:w-2/3 flex items-center ">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                onClick={toggleCheckbox}
              />
              <span className="text-sm font-normal text-[#2B4447]">
                Billing same as delivery address
              </span>
            </label>
          </div>
          <div className={`relative mb-8 `} data-te-input-wrapper-init>
            <label
              htmlFor="BillingAddress"
              className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
            >
              Address
            </label>

            <input
              type="text"
              id="BillingAddress"
              name="BillingAddress"
              className="pl-custom-left"
              // value={values.BillingAddress}
              value={values?.BillingAddress}
              onChange={handleChange}
              autoComplete="on"
              style={{
                border: errors.BillingAddress && "1px solid red",
              }}
            />
            {errors.BillingAddress && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.BillingAddress}
              </p>
            )}
            {errors.BillingAddress && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="flex flex-nowrap   gap-8">
            <div className="w-full mb-8 relative">
              <label
                htmlFor="BusinessName"
                className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
              >
                Appartment, Floor etc.
              </label>
              <input
                type="text"
                id="BusinessName"
                name="BillingApartment"
                onChange={handleChange}
                value={values?.BillingApartment}
                className="pl-custom-left"
                style={{
                  border: errors.BillingApartment && "1px solid red",
                }}
              />
              {errors.BillingApartment && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.BillingApartment}
                </p>
              )}
              {errors.BillingApartment && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>

            <div className="w-full mb-8 relative">
              <label
                htmlFor="BillingCity"
                className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
              >
                City
              </label>
              <Select
                type="text"
                placeholder="City"
                id="BillingCity"
                onChange={(e) => handleSelect(e, "BillingCity")}
                name="BillingCity"
                value={values?.BillingCity}
                options={cityOptions}
                className=""
                style={{
                  border: errors.BillingCity && "1px solid red",
                }}
              />

              {errors.BillingCity && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.BillingCity}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-8 relative">
              <label
                htmlFor="BillingPostcode"
                className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
              >
                Postcode
              </label>
              <input
                type="text"
                id="BillingPostcode"
                name="BillingPostcode"
                onChange={handleChange}
                value={values?.BillingPostcode}
                onBlur={handleBlur}
                className="pl-custom-left"
                style={{
                  border: errors.BillingPostcode && "1px solid red",
                }}
              />
              {errors.BillingPostcode && touched.BillingPostcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.BillingPostcode}
                </p>
              )}
              {errors.BillingPostcode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>

            <div className="w-full mb-8 relative">
              <label
                htmlFor="BillingAddressState"
                className="md:text-base text-sm	 md:font-medium font-semibold text-[#1D1E20]"
              >
                State{" "}
              </label>

              <Select
                type="text"
                placeholder="State"
                id="BillingAddressState"
                onChange={(e) => handleSelect(e, "BillingAddressState")}
                name="BillingAddressState"
                value={values.BillingAddressState}
                options={cityOptions}
                className=""
                style={{
                  border: errors.BillingAddressState && "1px solid red",
                }}
              />
              {errors.BillingAddressState && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.BillingAddressState}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8 pt-5 pb-16">
          <button className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal">
            Cancel
          </button>
          <button
            // type="submit"
            onClick={handleSubmitBtn}
            type="submit"
            className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default DeliveryEditForm;
