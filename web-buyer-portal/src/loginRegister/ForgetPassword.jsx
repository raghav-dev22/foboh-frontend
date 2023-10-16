import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgetPasswordSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  email: "",
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isValidBuyer, setIsValidBuyer] = useState(true);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgetPasswordSchema,
      onSubmit: (values) => {
        fetch(
          `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/getBuyers?email=${values?.email}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Customer data", data);
            if (data.success) {
              // sendVerificationMail();

              const firstName = data?.data[0]?.deliveryFirstName;
              const businessName = data?.data[0]?.businessName;
              localStorage.setItem("firstName", firstName);
              localStorage.setItem("buyerEmail", values?.email);


              sendVerificationMail(businessName);
            } else {
              setIsValidBuyer(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  const sendVerificationMail = (businessName) => {
    fetch(
      `https://notification-api-foboh.azurewebsites.net/api/notify/GenerateMailContentAndSendEmailSimply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailtype: "wbp-passwordreset",
          to: values?.email,
          name: businessName,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("uniqueKey", data.key);
        navigate("/auth/verify-password");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="absolute md:bg-[#F8FAFC]  w-full flex items-center justify-center  top-0	right-0	bottom-0	left-0	">
        <div className="lg:container container-fluid mx-auto lg:px-6  px-0">
          <div className="w-full lg:scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white   ">
              <div className="    block md:hidden">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-36	object-cover	 w-full  "
                  alt="signin"
                />
              </div>
              <form
                className="w-fit	 md:w-1/2  #FFFFFF
                  rounded-lg custom-shadow p-8 mx-10 my-14 flex flex-col justify-center items-center gap-8"
                onSubmit={handleSubmit}
              >
                <h2 className="text-[#563FE3]  text-3xl	font-bold text-center	">
                  {" "}
                  Reset your password
                </h2>
                <p className="text-center">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
                <div className="w-full relative">
                  <label
                    htmlFor="email"
                    className="md:text-base text-sm	 font-normal text-[#2B4447]"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="test@gmail.com"
                    autoComplete="on"
                    style={{ border: errors.email && "1px solid red" }}
                  />
                  {errors.email && touched.email && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors.email}
                    </p>
                  )}
                  {errors.email && touched.email && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                  {!isValidBuyer && (
                    <p className="mt-2 mb-2 text-red-500">
                      This buyer is not registered, please try again with
                      different account.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="py-2.5 w-full flex justify-center items-center bg-[#563FE3] rounded-[6px] text-base text-white font-semibold"
                >
                  Reset password
                </button>
              </form>

              <div className="  md:w-1/2  hidden md:block ">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-full w-full  "
                  alt="signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
