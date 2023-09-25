import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { DeliveryBillingSchema } from "../schemas";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeliveryEditForm from "./DeliveryEditForm";

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
  const [cart, setCart] = useState();

  const {
    values,

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

  const [isChecked, setIsChecked] = useState(false);

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
              <h2 className="font-bold text-xl	 text-[#563FE3]">
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
