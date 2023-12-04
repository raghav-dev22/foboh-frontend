import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { SignUpSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormik } from "formik";
import { buyers } from "../data";
import { useNavigate } from "react-router-dom";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Visibility,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function Signup() {
  const [isValidBuyer, setIsValidBuyer] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        fetch(
          `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/getBuyers?email=${values.email.toLowerCase()}`,
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

              const buyerCred = {
                name: values.name,
                email: values.email,
                password: values.password,
              };
              localStorage.setItem("buyerCred", JSON.stringify(buyerCred));
              localStorage.setItem("buyerData", JSON.stringify(data?.data[0]));
              localStorage.setItem(
                "orgID",
                JSON.stringify(data?.data[0].organisationId)
              );
              sendVerificationMail();
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

  // Sign in with google
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "751295795620-kn4cla1rp9jr3vl50e3o65m9t97dtaoc.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  //Google handle callback
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);
    console.log("googleResponse", googleResponse);
  };

  const sendVerificationMail = () => {
    fetch(
      `https://notification-api-foboh.azurewebsites.net/api/notify/GenerateMailContentAndSendEmailSimply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailtype: "wbp-emailverification",
          to: values?.email,
          name: values?.name,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("uniqueKey", data.key);
        navigate("/auth/verify-email");
      })
      .catch((error) => console.log(error));
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    console.log(showPassword);
  };
  // console.log(values, "values");
  return (
    <>
      <div>
        <div className="h-screen w-full relative">
          <img src="/assets/login-bg.png" alt="" className="w-full h-full" />
          <div
            className="w-full lg:scale-90 absolute top-[50%] left-[50%] "
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <div className="flex flex-col md:flex-row md:justify-center  md:gap-12 items-center ">
              <div className="md:w-[60%] w-[90%] xl:w-[35%] lg:w-[50%] bg-white ">
                <div className="px-4 sm:px-6 md:px-8  lg:px-10">
                  <h1 className="mb-6 mt-8 text-3xl	 text-[#212B36]  font-bold	">
                    Sign up
                  </h1>
                  <p className="text-[#637381] mb-5 md:text-base text-sm cursor-pointer">
                    Already have an account?{" "}
                    <Link to="/">
                      <span className="text-custom-blue">Log in</span>
                    </Link>
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-4 sm:px-6 md:px-8 lg:px-10   pb-8 "
                >
                  {/* name input  */}
                  <div className={`relative mb-4 `} data-te-input-wrapper-init>
                    <label
                      htmlFor="name"
                      className="md:text-base text-sm	 font-normal text-[#2B4447]"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      autoComplete="on"
                      value={values.name}
                      // onChange={(e) => setName(e.target.value)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border: errors.name && touched.name && "1px solid red",
                      }}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.name}
                      </p>
                    )}
                    {errors.name && touched.name && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* name input */}

                  <div className={`relative mb-4 `} data-te-input-wrapper-init>
                    <label
                      htmlFor="email"
                      className="md:text-base text-sm	 font-normal text-[#2B4447]"
                    >
                      Your email
                    </label>

                    <input
                      type="email"
                      id="email"
                      className={`js-email `}
                      autoComplete="on"
                      value={values.email}
                      // onChange={(e) => setEmail(e.target.value)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.email && touched.email && "1px solid red",
                      }}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.email}
                      </p>
                    )}
                    {errors.email && touched.email && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                    <label
                      className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                      htmlFor="password"
                    ></label>
                  </div>

                  <div className={`relative mb-4 `} data-te-input-wrapper-init>
                    <label
                      htmlFor="password"
                      className="md:text-base text-sm	 font-normal text-[#2B4447]"
                    >
                      Your password
                    </label>
                    <div className="inset-y-0 right-0 flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        // type="password"
                        id="password"
                        className={`js-password `}
                        autoComplete="off"
                        style={{
                          border:
                            errors.password &&
                            touched.password &&
                            "1px solid red",
                        }}
                        onChange={handleChange}
                        // onChange={(e) => setPwd(e.target.value)}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <label
                        style={{ zIndex: "50" }}
                        className="opacity-[0.5] mb-[5px] z-50 rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
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
                    {!errors.password && values.password && (
                      <div className="flex justify-start items-center gap-2">
                        {!errors.password && values.password && (
                          <TaskAltOutlinedIcon className=" text-green-500  transition-all duration-[0.3s]" />
                        )}
                        <p className="mt-2 mb-2 text-green-500 ">
                          Your password is strong.
                        </p>
                      </div>
                    )}
                    {!isValidBuyer && (
                      <p className="mt-2 mb-2 text-red-500">
                        This buyer is not registered, please try again with
                        different account.
                      </p>
                    )}

                    {errors.password && touched.password && (
                      <p className="mt-2 mb-2 text-red-500 text-xs">
                        {errors.password}
                      </p>
                    )}
                    <label
                      className="opacity-[0.5] mb-[5px] rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                      htmlFor="password"
                    ></label>
                  </div>
                  {/* Remember me checkbox  */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className=" flex items-center green-checkbox">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        className="text-[#637381]  font-normal md:text-sm text-xs"
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

                    {/* Forgot password link  */}
                  </div>

                  {/* Submit button */}
                  {/* <Link to="/verify-email"> */}

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
                      className="login-btn bg-custom-blue rounded-md	w-full p-2.5 hover:bg-[#6a59ce]"
                      // onClick={() => navigate("/verify-email")}
                    >
                      <p className="text-white text-center font-semibold	text-sm">
                        {" "}
                        Sign up
                      </p>{" "}
                    </button>
                  )}

                  {/* </Link> */}

                  {/* Divider  */}
                  {/* <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                    <p className="mx-4  my-5 text-center  text-[#637381] font-inter font-normal md:text-sm text-xs">
                      Or continue with
                    </p>
                  </div> */}

                  {/* Social login buttons  */}
                  {/* <div className="flex justify-center items-center">
                    <div className="googleBtn">
                      <div id="signInDiv"></div>
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
