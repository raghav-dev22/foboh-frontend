import { useFormik } from "formik";
import { React, useState } from "react";
import { ResetPasswordFormSchema } from "../schemas";
import { useNavigate, useParams } from "react-router-dom/dist";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useEffect } from "react";
import { Visibility } from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const initialValues = {
  password: "",
  repeatPassword: "",
};

const ForgetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/forget-password-email");
    }
  }, []);

  const buyerEmail = localStorage.getItem("buyerEmail");

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ResetPasswordFormSchema,
      onSubmit: (values) => {
        fetch(
          `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: buyerEmail,
              password: values.repeatPassword,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.clear();
              navigate("/auth/sign-in");
            } else {
              localStorage.clear();
              alert("Some error occurred, please try again later.");
            }
          })
          .catch((error) => console.log(error));
      },
    });

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
                className="w-fit md:w-1/2  #FFFFFF
                  rounded-lg custom-shadow p-8 mx-10 my-14 flex flex-col justify-center items-center gap-8"
                onSubmit={handleSubmit}
              >
                <h2 className="text-[#563FE3]  text-3xl	font-bold text-center	">
                  {" "}
                  Reset your password
                </h2>
                {/* <p className="text-center">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p> */}
                <div className="relative w-full">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    id="password"
                    name="password"
                    placeholder="Your new password"
                    className="transition-all duration-[0.3s]"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.password && touched.password && "1px solid red",
                    }}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
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
                  {!errors.password && values.password && (
                    <p className="mt-2 mb-2 text-green-500">
                      Your password is strong.
                    </p>
                  )}
                  {/* {!errors.password && values.password && (
                    <TaskAltOutlinedIcon className="absolute text-green-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                  )} */}

                  {<p className="mt-2 mb-2 text-red-500">{errors.password}</p>}
                </div>
                <div className="relative w-full" data-te-input-wrapper-init>
                  <label htmlFor="repeatPassword">Repeat password</label>
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="repeatPassword"
                    name="repeatPassword"
                    className="transition duration-[0.3s]"
                    placeholder="Your new password"
                    autoComplete="off"
                    value={values.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.repeatPassword &&
                        touched.repeatPassword &&
                        "1px solid red ",
                    }}
                  />
                  <label
                    style={{ zIndex: "50" }}
                    className="opacity-[0.5] mb-[5px] z-50 rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                    htmlFor="password"
                    onClick={handleToggleRepeatPassword}
                  >
                    {showRepeatPassword ? (
                      <Visibility fontSize="small" />
                    ) : (
                      <VisibilityOffOutlinedIcon fontSize="small" />
                    )}
                  </label>
                  {!errors.repeatPassword && values.repeatPassword && (
                    <p className="mt-2 mb-2 text-green-500">
                      Your password is matched.
                    </p>
                  )}
                  {errors.repeatPassword && touched.repeatPassword && (
                    <p className="mt-2 mb-2 text-red-500">
                      {errors.repeatPassword}
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

export default ForgetPasswordForm;
