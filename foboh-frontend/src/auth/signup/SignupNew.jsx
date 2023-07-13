import { useState, useEffect } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SignUpImg from "../../image/signup/SignUpImg.png";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { SignUpSchema } from "../../schemas";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { generateUniqueKey } from "../../helpers/uniqueKey";
import CryptoJS from "crypto-js";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const initialValues = {
  email: "",
  password: "",
};

const SignupNew = () => {
  const navigate = useNavigate();
  const [emailPresent, setEmailPresent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        const url = process.env.REACT_APP_URL;

        const key1 = "12345";
        const encryptedPassword = CryptoJS.AES.encrypt(
          values.password,
          key1
        ).toString();
        console.log(encryptedPassword);

        fetch(`https://fobauthservice.azurewebsites.net/api/Verify/GetUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            filters: {
              issuer: "fobohdev.onmicrosoft.com",
              issuerAssignedId: values.email,
              email: null,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log(data.userdetails.value.length);
            if (data.userdetails.value.length > 0 && !data.error) {
              if (data.userdetails.value[0].mail === values.email) {
                setEmailPresent(true);
              }
            } else {
              setEmailPresent(false);
              fetch(`https://dev-orderflow.foboh.com.au/api/api/send-email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  type: "email-verification",
                  name: "email",
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  localStorage.setItem("email", values.email);
                  localStorage.setItem("password", encryptedPassword);

                  localStorage.setItem("uniqueKey", data.key);
                  navigate(`/auth/registration-email/${data.key}`);
                })
                .catch((error) => console.log(error));
            }
          });
      },
    });

  const handleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };
  // Sign in with google
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);
    console.log(googleResponse);
    let randomPassword = generateUniqueKey();
    let password = randomPassword.slice(0, 8);
    fetch(`https://fobauthservice.azurewebsites.net/api/Verify/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        userProfile: {
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
            password: password,
          },
          mobilePhone: null,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Registration data ->", data);
        if (data.error) {
          if (data.error.error) {
            setEmailPresent(true);
          }
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  //Calling login with google api
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

  return (
    <>
      <div className="absolute md:bg-[#F8FAFC] w-full h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="w-full scale-90 ">
            <div className="flex flex-col md:flex-row md:justify-center bg-white gap-12">
              <div className="w-full md:w-1/2 lg:ps-12">
                <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                  <h1 className="mb-6 mt-8 text-3xl text-[#212B36]">Sign up</h1>
                  <p
                    onClick={() => navigate("/auth/sign-in")}
                    className="text-[#637381] cursor-pointer mb-5 text-base"
                  >
                    Already have an account?{" "}
                    <span className="text-[#147D73]">Log in</span>
                  </p>
                  {emailPresent && (
                    <p className="mt-2 text-red-500">
                      Email already exists. Please use a different email or
                      please login.
                    </p>
                  )}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-4 sm:px-6 md:px-8 lg:px-10 py-4"
                >
                  {/* Email input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <label
                      htmlFor="email"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="transition-all duration-[0.3s]"
                      placeholder="Your email"
                      autoComplete="on"
                      style={{
                        border:
                          errors.email && touched.email && "1px solid red",
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                    )}
                    {errors.email && touched.email && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* Password input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <label
                      htmlFor="password"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your Password
                    </label>
                    <div className="inset-y-0 right-0 flex items-center">
                      <input
                        type="password"
                        id="password"
                        className="js-password relative"
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
                    </div>
                    {!errors.password && values.password && (
                      <p className="mt-2 mb-2 text-green-500">
                        Your password is strong.
                      </p>
                    )}
                    {!errors.password && values.password && (
                      <TaskAltOutlinedIcon className="absolute text-green-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                    {errors.password && touched.password && (
                      <p className="mt-2 mb-2 text-red-500">
                        {errors.password}
                      </p>
                    )}
                    {errors.password && touched.password && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* Remember me checkbox */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="">
                      {rememberMe ? (
                        <CheckBoxOutlinedIcon
                          onClick={handleRememberMe}
                          className="text-[#147D73] cursor-pointer"
                        />
                      ) : (
                        <CheckBoxOutlineBlank
                          onClick={handleRememberMe}
                          className="text-[#147D73] cursor-pointer"
                        />
                      )}
                      <label
                        onClick={handleRememberMe}
                        className="text-[#637381] font-normal"
                        style={{
                          position: "relative",
                          top: "2px",
                          left: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Remember me
                      </label>
                    </div>

                    {/* Forgot password link */}
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="foboh-green-btn">
                    Sign up
                  </button>

                  {/* Divider */}
                  <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                    <p className="mx-4 my-5 text-center text-[#637381] font-openSans text-lg">
                      Or continue with
                    </p>
                  </div>

                  {/* Social login buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
                    <div id="signInDiv"></div>
                  </div>
                </form>
              </div>
              <div className="md:basis-1/2 hidden lg:block">
                <img src={SignUpImg} className="h-full w-full" alt="signup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupNew;
