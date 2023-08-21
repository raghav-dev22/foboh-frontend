import React from "react";
import { Link } from "react-router-dom";
import { LoginSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormik } from "formik";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  // const onClick = () => {
  //   history.push("/verify-email");
  // };
  return (
    <div className="absolute md:bg-[#F8FAFC]  w-full flex items-center justify-center h-full">
      <div className="lg:container container-fluid mx-auto lg:px-6  px-0">
        <div className="w-full lg:scale-90">
          <div className="flex flex-col md:flex-row md:justify-center bg-white md:gap-12  ">
            <div className="    block md:hidden">
              <img
                src="/assets/supplier-logo.png"
                className="h-36	object-cover	 w-full  "
                alt="signin"
              />
            </div>
            <div className="w-full md:w-1/2 lg:ps-12 ">
              <div className="px-4 sm:px-6 md:px-8  lg:px-10">
                <h1 className="mb-6 mt-8 text-3xl	 text-[#212B36]  font-bold	">
                  Log in
                </h1>
                <p className="text-[#637381] mb-5 md:text-base text-sm cursor-pointer">
                  Don't have an account?{" "}
                  <Link to="/sign-up">
                    <span className="text-custom-blue">Sign up</span>
                  </Link>
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="px-4 sm:px-6 md:px-8 lg:px-10  py-4 "
              >
                {/* Email input  */}
                <div className={`relative mb-6 `} data-te-input-wrapper-init>
                  <label
                    htmlFor="email"
                    className="md:text-base text-sm	 font-normal text-[#2B4447]"
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
                      border: errors.email && touched.email && "1px solid red",
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
                </div>

                {/* Password input */}

                <div className={`relative mb-6 `} data-te-input-wrapper-init>
                  <label
                    htmlFor="password"
                    className="md:text-base text-sm	 font-normal text-[#2B4447]"
                  >
                    Your Password{" "}
                  </label>
                  <div className="inset-y-0 right-0 flex items-center">
                    <input
                      type={"password"}
                      id="password"
                      className={`js-password 
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
                    ></label>
                  </div>
                  {errors.password && touched.password && (
                    <p className="mt-2 mb-2 text-red-500 text-xs">
                      {errors.password}
                    </p>
                  )}
                  {errors.password && touched.password && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>

                {/* Remember me checkbox  */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="">
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
                  <p className="md:text-sm text-xs text-custom-blue cursor-pointer transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                    Forgot password?
                  </p>
                </div>

                {/* Submit button */}

                {/* <Link to="/verify-email"> */}
                <button
                  type="submit"
                  className="login-btn bg-custom-blue rounded-md	w-full p-2.5	"
                  onClick={() => {
                    // onClick();
                  }}
                >
                  <p className="text-white text-center font-semibold	text-sm	">
                    {" "}
                    Login
                  </p>{" "}
                </button>
                {/* </Link> */}

                {/* Divider  */}
                <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                  <p className="mx-4  my-5 text-center  text-[#637381] font-inter font-normal md:text-sm text-xs">
                    Or continue with
                  </p>
                </div>

                {/* Social login buttons  */}
                <div className="flex justify-between items-center">
                  <div className="googleBtn">
                    <img src="/assets/googleBtn.png" alt="" />
                  </div>
                  <div className="microsoftBtn">
                    <img src="/assets/microsoftBtn.png" alt="" />
                  </div>
                </div>
              </form>
            </div>
            <div className="  md:basis-1/2  hidden md:block ">
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
  );
}

export default Login;
