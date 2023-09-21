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
import DeliveryEditForm from "./DeliveryEditForm";
import { theme } from "antd";

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

const DeliveryEdit = () => {
  const navigate = useNavigate();
  const buyer = useSelector((state) => state.buyer);
  // console.log(buyer, "hhhh");
  const [selectedOption, setSelectedOption] = useState(null);
  const [cart, setCart] = useState();
  const { useToken } = theme;
  const { token } = useToken();


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

  const handleBillingAddress = (e, name) => {
    if (name === "handleBillingAddress") {
      setValues({
        ...values,
        handleBillingAddress: e,
      });
    } else {
      setValues({
        ...values,
        handleBillingAddress: e,
      });
    }
  };

  const handleDeliveryCity = (e, name) => {
    if (name === "City") {
      setValues({
        ...values,
        City: e,
      });
    } else {
      setValues({
        ...values,
        City: e,
      });
    }
  };

  const handleDeliveryState = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
    } else {
      setValues({
        ...values,
        State: e,
      });
    }
  };

  const handleBillingCity = (e, name) => {
    if (name === "BillingCity") {
      setValues({
        ...values,
        BillingCity: e,
      });
    } else {
      setValues({
        ...values,
        BillingCity: e,
      });
    }
  };

  const handleDeliveryCountry = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
    } else {
      setValues({
        ...values,
        State: e,
      });
    }
  };


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
    setValues(buyer);
  }, []);


  console.log("error>>", values);

  const handleSubmitBtn = (e) => {
    navigate("/home/profile");
  };

  const handleBillingState = (e, name) => {
    if (name === "BillingAddressState") {
      setValues({
        ...values,
        BillingAddressState: e,
      });
    } else {
      setValues({
        ...values,
        DeliveryAddressState: e,
      });
    }
  };
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  console.log(isChecked, "toggleCheckbox");
  return (
    <>
      <div className="md:w-4/5	w-full mx-auto  ">
        <div className="md:w-4/5 w-full">
          <div className="  mb-12 md:hidden block  bg-[#563FE3] md:p-0 p-4 relative">
            <h2 className="md:font-bold font-semibold md:text-4xl text-2xl	 md:text-[#563FE3] text-[#fff] md:text-left text-center">
              Edit Profile
            </h2>
            <div className="md:hidden sm:block">
              <ArrowBackIcon
                className="absolute top-[32%] left-[20px] "
                style={{ fill: "#fff" }}
              />
            </div>
          </div>

          <div className="  md:px-0 pb-8 px-6">
            <div className="  pb-8">
              <h2 style={{color: token.commonThemeColor}} className="font-bold text-xl	 text-[#563FE3]">
                Delivery Address
              </h2>
            </div>
            <DeliveryEditForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryEdit;
