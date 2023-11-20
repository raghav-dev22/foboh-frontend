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
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgetPasswordSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        fetch(
          `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/getBuyers?email=${values?.email}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            console.log("Customer data", data);
            if (data.success) {
              // sendVerificationMail();

              const firstName = data?.data[0]?.deliveryFirstName;
              const businessName = data?.data[0]?.businessName;
              localStorage.setItem("firstName", firstName);
              localStorage.setItem("buyerEmail", values?.email);
              // localStorage.setItem("org", values?.organisationId);

              sendVerificationMail(businessName);
            } else {
              setIsValidBuyer(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
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
                {isLoading ? (
                  <button
                    disabled
                    className="foboh-green-btn flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* ... (your SVG path for the spinner) */}
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="py-2.5 w-full flex justify-center items-center bg-[#563FE3] rounded-[6px] text-base text-white font-semibold"
                  >
                    Reset password
                  </button>
                )}
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
