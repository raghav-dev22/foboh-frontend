import React, { useState } from "react";
import fobohLogo from "../../image/reset/fobohLogo.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordEmailSchema } from "../../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  email: "",
};

const ResetPasswordEmail = () => {
  const navigate = useNavigate()


  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: ResetPasswordEmailSchema,
    onSubmit: (values) => {
      const url = process.env.REACT_APP_URL
      localStorage.setItem('email', values.email)
  
  
      fetch(
        `https://graph.microsoft.com/beta/tenant.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'tenant.onmicrosoft.com' and i/issuerAssignedId eq '${values.email}'))&mailNickname`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.value) {
            if (data.value.length > 0) {
              const userName = data.value[0].displayName;
              localStorage.setItem('userName', userName);
  
              fetch(`https://dev-orderflow.foboh.com.au/api/api/send-email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  type: "password-reset",
                  name: userName
                }),
              })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                localStorage.setItem('uniqueKey', data.key);
                navigate(`/auth/reset-link/${data.key}`);
              })
              .catch((error) => console.log(error));
            } 
            }
        })
        .catch((error) => console.log(error));
    },
  });



  console.log(errors);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white md:mt-0 sm:max-w-md  rounded-[22px] sm:p-8  shadow-md">
          <div className="flex flex-col items-center">
            <img
              className=" mb-6 mt-10 w-[190px]"
              src={fobohLogo}
              alt="foboh-icon"
            />

            <h2
              className="mb-6 text-[20px]  md:text-3xl font-bold leading-tight text-[#147D73] font-Inter
"
            >
              Reset your Password
            </h2>
            <p className="text-[#637381] text-[15px] font-inter leading-[20px] flex flex-col my-2 flex-shrink-0 tracking-tight text-center">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div className="relative">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-inter font-medium text-[#2B4447] "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email-input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ border: errors.email && '1px solid red' }}
                className="border transition duration-[0.3s]  border-[#E2E8F0] bg-white  sm:text-sm rounded-[8px]
                flex flex-col px-[20px] items-center 
                  w-full p-2.5 border-solid 
                  outline-none dark:placeholder-[#A0AEC0] 
                    text-[#656e7b]
                "
                placeholder="test@gmail.com"
                required=""
              />
              {<p className="mt-2 mb-2 text-red-500">{errors.email}</p>}
              {errors.email && (
                <ErrorOutlineIcon className="absolute text-red-500 top-10 right-3 transition-all duration-[0.3s]" />
              )}
            </div>

            <button
              type="submit"
              className="inline-block h-[47px] font-bold w-full rounded-[15px] bg-[#147D73] px-6 pb-2 pt-2.5 text-[16px] leading-normal text-[#FCFCFC] font-inter shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]  dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-[#0e6158] dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordEmail;
