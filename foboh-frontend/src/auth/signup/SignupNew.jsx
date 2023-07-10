import { useState, useEffect } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import CryptoJS from "crypto-js";

import SignUpImg from "../../image/signup/SignUpImg.png";
import { useNavigate } from "react-router-dom";
import alertCircle from "../../image/alertCircle.png";
import {
  validateEmailHelper,
  validatePasswordHelper,
} from "../../helpers/signup-helper";
import { generateUniqueKey } from "../../helpers/uniqueKey";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../../Redux/Action/authSlice";
import jwtDecode from "jwt-decode";

const SignupNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isAlertIcon, setIsAlertIcon] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailPresent, setEmailPresent] = useState(false);

  // Encrypting Password

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const validateForm = () => {
    validateEmailHelper(
      setIsValidEmail,
      isValidEmail,
      email,
      setIsAlertIcon,
      setIsEmail
    );
    validatePasswordHelper(
      setIsValidPassword,
      password,
      isValidPassword,
      setIsPassword
    );
  };

  // Sign in with google
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);

    //Setting google email credentials to azure b2c
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
        console.log("Data present ->", data);
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

              //Random generated password
              password: `@${password}`,
            },
            mobilePhone: null,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Registration data ->", data);
            if (data.error) {
              if (data.error.details[0].code === "ObjectConflict") {
                setEmailPresent(true);
              }
            } else {
              navigate("/");
            }
          })
          .catch((error) => console.log(error));
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

  // Sign up handler
  const handleSignup = async () => {
    const url = process.env.REACT_APP_URL;

    validateForm();
    const key1 = "12345";
    const encryptedPassword = CryptoJS.AES.encrypt(password, key1).toString();
    console.log(encryptedPassword);
    if (email && password && isValidEmail && isValidPassword) {
      fetch(
        `https://graph.microsoft.com/beta/fobohdev.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'fobohdev.onmicrosoft.com' and i/issuerAssignedId eq '${email}'))`,
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
          console.log("recent email >>>", email);
          console.log(data);

          if (data.value.length > 0) {
            if (data.value[0].mail === email) {
              setEmailPresent(true);
            }
          } else {
            setEmailPresent(false);
            fetch(`${url}/api/api/send-email`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                type: "email-verification",
                name: "email",
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem("email", email);
                localStorage.setItem("password", encryptedPassword);

                dispatch(setEmail(""));
                dispatch(setPassword(""));
                localStorage.setItem("uniqueKey", data.key);
                navigate(`/auth/registration-email/${data.key}`);
              })
              .catch((error) => console.log(error));
          }
        });
    }
  };

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
                <form className="px-4 sm:px-6 md:px-8 lg:px-10 py-4">
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
                      id="email"
                      className="relative"
                      placeholder="Your email"
                      autoComplete="on"
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                    />

                    {isAlertIcon && (
                      <img
                        src={alertCircle}
                        className="absolute top-[55px] right-4 h-[20px]"
                        alt="alert circle"
                      />
                    )}
                    {!isValidEmail && (
                      <p className="mt-2 text-red-500">
                        Please enter a valid email address.
                      </p>
                    )}
                    {!isEmail && (
                      <p className="mt-2 text-red-500">
                        Email field must not be empty!
                      </p>
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
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                      />
                      {isAlertIcon && (
                        <img
                          src={alertCircle}
                          className="absolute top-[55px] right-4 h-[20px]"
                          alt="alert circle"
                        />
                      )}
                    </div>
                  </div>
                  {!isValidPassword && (
                    <p className="mb-6 -mt-4 text-red-500 font-inter">
                      Password must be 8 characters or more and contain at least
                      1 number and 1 special character.
                    </p>
                  )}
                  {!isPassword && (
                    <p className="mb-6 -mt-4 text-red-500 font-inter">
                      Password field must not be empty.
                    </p>
                  )}

                  {/* Remember me checkbox */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="">
                      <CheckBox
                        className="text-[#147D73]"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                      />
                      <label
                        className="text-[#637381] font-thin"
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

                    {/* Forgot password link */}
                  </div>

                  {/* Submit button */}
                  <button
                    type="button"
                    className="foboh-green-btn"
                    onClick={handleSignup}
                  >
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
