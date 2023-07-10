import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fobohLogo from "../../image/reset/fobohLogo.png";
import CryptoJS from "crypto-js";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const key1 = "12345";

  const email = localStorage.getItem("email");

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isNewPassword, setIsNewPassword] = useState(true);
  const [isRepeatPassword, setIsRepeatPassword] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    console.log("idddddd >>>>", localStorage.getItem("uniqueKey"));
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/password-reset-email");
    }

    fetch(
      `https://graph.microsoft.com/beta/tenant.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'tenant.onmicrosoft.com' and i/issuerAssignedId eq '${email}'))`,
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
            const id = data.value[0].id;
            localStorage.setItem("id", id);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatpasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const validateEmail = () => {
    //Regex for password
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    setIsNewPasswordValid(passwordPattern.test(newPassword));

    if (!newPassword) {
      setIsNewPassword(false);
      setIsNewPasswordValid(true);
    } else {
      setIsNewPassword(true);
    }

    if (!repeatPassword) {
      setIsRepeatPassword(false);
    } else {
      setIsRepeatPassword(true);
    }

    if (newPassword && repeatPassword) {
      setErrorMessage(true);
      if (newPassword === repeatPassword) {
        setIsPasswordMatch(true);
      } else {
        setIsPasswordMatch(false);
      }
    } else {
      setErrorMessage(false);
    }
  };

  // Encrypting the password
  

  const handleClick = () => {
    validateEmail();

    const key1 = "12345";
    const encryptedPassword = CryptoJS.AES.encrypt(
      repeatPassword,
      key1
    ).toString();
    console.log(encryptedPassword);

    if (
      newPassword &&
      repeatPassword &&
      isNewPasswordValid &&
      isPasswordMatch
    ) {
      fetch(
        `https://graph.microsoft.com/v1.0/users/${localStorage.getItem("id")}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailNickname: encryptedPassword,
          }),
        }
      )
        .then((response) => {
          console.log(response); // Log the response here

          if (response.status === 204) {
            localStorage.removeItem('uniqueKey')
            localStorage.removeItem('email')
            localStorage.removeItem('userName')
            localStorage.removeItem('id')
            navigate('/auth/password-reset-success')
          } else {
            localStorage.removeItem('uniqueKey')
            localStorage.removeItem('email')
            localStorage.removeItem('userName')
            localStorage.removeItem('id')
            alert("Some error occurred, please try again later.")
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <section className="container mx-auto ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white px-6 py-8 rounded-[15px] min-w-min lg:w-1/3 md:w-1/2 sm:w-2/3   shadow-md text-black">
          <img
            className="mx-auto my-6 w-[190px]"
            src={fobohLogo}
            alt="foboh-icon"
          />
          <h2
            className="mb-6 mt-4 text-center text-[20px] font-bold leading-tight text-[#147D73] font-inter md:text-3xl
"
          >
            Reset your Password
          </h2>
          <p className="text-[#637381] text-[15px] font-inter leading-[20px] flex flex-col my-2 flex-shrink-0 tracking-tight text-center">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <form>
            {/* Mobile input */}

            <div className="relative mb-6">
              <label htmlFor="newPassword">New password</label>
              <input
                id="newPassword"
                name="newPassword"
                maxLength={50}
                placeholder="Your new password"
                onChange={handleNewPasswordChange}
                type="password"
                autoComplete="off"
              />
            </div>

            {!isNewPasswordValid && (
              <p className="mt-2 mb-4 text-red-500">
                Password must be 8 characters or more and contain at least 1
                number and 1 special character
              </p>
            )}

            {!isNewPassword && (
              <p className="mb-6 text-red-500">
                Password field must not be empty
              </p>
            )}

            {/* Business name input  */}

            <div className="relative mb-6" data-te-input-wrapper-init>
              <label htmlFor="repeatPassword">Repeat password</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Your new password"
                autoComplete="off"
                maxLength={50}
                onChange={handleRepeatpasswordChange}
              />
            </div>
            {!isRepeatPassword && (
              <p className="mb-6 -mt-4 text-red-500">
                Password field must not be empty
              </p>
            )}
            {isPasswordMatch && errorMessage && (
              <p className="mb-6 -mt-4 text-green-500">Password is matched!</p>
            )}
            {!isPasswordMatch && errorMessage && (
              <p className="mb-6 -mt-4 text-red-500">
                Passwords do not match, please try again
              </p>
            )}

            {/* Submit button */}
            <button
              type="button"
              className="foboh-green-btn"
              onClick={handleClick}
            >
              Reset Password
            </button>

            {/* Divider  */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
