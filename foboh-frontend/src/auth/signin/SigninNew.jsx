import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Visibility,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import SignInImg from "../../image/signin/SignInImg.png";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";

import { useFormik } from "formik";
import { SignInSchema } from "../../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { generateUniqueKey } from "../../helpers/uniqueKey";

const initialValues = {
  email: "",
  password: "",
};

const SigninNew = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const key = "12345";

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values) => {
    
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
              if (data.value.length > 0) {
                console.log(data);
                console.log(data.value[0].mailNickname);
                // localStorage.setItem('mailNickname', data.value[0].mailNickname)
                const bytes = CryptoJS.AES.decrypt(data.value[0].mailNickname, key);
                const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
                console.log(decryptedPassword);
                if (decryptedPassword === values.password) {
                  navigate("/");
                } else {
                  setIsValidPassword(false);
                }
              } else {
                setIsValidPassword(false);
              }
            })
            .catch((error) => console.log(error));
        
      
    
      },
    });

  //Google handle callback
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);

    fetch(
      `https://graph.microsoft.com/beta/fobohdev.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'fobohdev.onmicrosoft.com' and i/issuerAssignedId eq '${googleResponse.email}'))`,
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
        let randomPassword = generateUniqueKey();
        let password = randomPassword.slice(0, 8);
        console.log(data);

        console.log("Email >>>", googleResponse);
        fetch("https://graph.microsoft.com/v1.0/users", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountEnabled: true,
            displayName: `${googleResponse.given_name} ${googleResponse.family_name}`,
            jobTitle: null,
            mail: googleResponse.email,
            identities: [
              {
                signInType: "emailAddress",
                issuer: "fobohdev.onmicrosoft.com",
                issuerAssignedId: googleResponse.email,
              },
            ],
            passwordProfile: {
              forceChangePasswordNextSignIn: true,
              password: `@${password}`,
            },
            mobilePhone: null,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate("/");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  // Sign in with google

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "751295795620-4kts1rr5gelpjt2eo22ta6gnunakune7.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };

  return (
    <>
      <div className="absolute md:bg-[#F8FAFC]  w-full h-screen flex items-center justify-center ">
        <div className="container mx-auto px-6 ">
          <div className="w-full scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white gap-12  ">
              <div className="w-full md:w-1/2 lg:ps-12">
                <div className="px-4 sm:px-6 md:px-8  lg:px-10">
                  <h1 className="mb-6 mt-8 text-3xl text-[#212B36]">Log in</h1>
                  <p
                    onClick={() => navigate("/auth/sign-up")}
                    className="text-[#637381] mb-5 text-base cursor-pointer"
                  >
                    Don't have an account?{" "}
                    <span className="text-[#147D73]">Sign up</span>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8 lg:px-10  py-4 ">
                  {/* Email input  */}
                  <div
                    className={`relative mb-6 ${
                      !isEmail ? "text-red-500" : ""
                    }`}
                    data-te-input-wrapper-init
                  >
                    <label
                      htmlFor="email"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your email
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Your email"
                      autoComplete="on"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.email && touched.email && "1px solid red",
                      }}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                    )}
                    {errors.email && touched.email && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* Password input */}

                  <div
                    className={`relative mb-6 ${
                      !isPassword ? "text-red-500" : ""
                    }`}
                    data-te-input-wrapper-init
                  >
                    <label
                      htmlFor="password"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your Password{" "}
                    </label>
                    <div className="inset-y-0 right-0 flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`js-password ${
                          !isValidPassword || !isPassword
                            ? "border-red-500"
                            : ""
                        }`}
                        autoComplete="off"
                        placeholder="Your password"
                        style={{
                          border:
                            errors.password &&
                            touched.password &&
                            "1px solid red",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <label
                        className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                        htmlFor="password"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <Visibility fontSize="small" />
                        ) : (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        )}
                      </label>
                    </div>
                      {errors.password && touched.password && (
                        <p className="mt-2 mb-2 text-red-500">
                          {errors.password}
                        </p>
                      )}
                      
                  </div>
                  {!isValidPassword && (
                    <p className="mb-6 -mt-4 text-red-500">
                      Email or password are incorrect, please try again
                    </p>
                  )}

                  {!isPassword && (
                    <p className="mb-6 -mt-4 text-red-500">
                      Password field must not be empty
                    </p>
                  )}

                  {/* Remember me checkbox  */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="">
                      {rememberMe ? (
                        <CheckBox className="text-[#147D73]" />
                      ) : (
                        <CheckBoxOutlineBlank className="text-[#147D73]" />
                      )}

                      <label
                        className="text-[#637381]  font-thin"
                        style={{
                          position: "relative",
                          top: "2px",
                          left: "5px",
                          cursor: "pointer",
                        }}
                        onClick={handleRememberMe}
                      >
                        Remember me
                      </label>
                    </div>

                    {/* Forgot password link  */}
                    <p
                      className="text-[#147D73] cursor-pointer transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      onClick={() => navigate("/auth/password-reset-email")}
                    >
                      Forgot password?
                    </p>
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="foboh-green-btn">
                    Login
                  </button>

                  {/* Divider  */}
                  <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                    <p className="mx-4  my-5 text-center  text-[#637381] font-inter text-lg">
                      Or continue with
                    </p>
                  </div>

                  {/* Social login buttons  */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
                    <div id="signInDiv"></div>
                  </div>
                </form>
              </div>
              <div className="  md:basis-1/2  hidden lg:block ">
                <img src={SignInImg} className="h-full w-full  " alt="signin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninNew;
