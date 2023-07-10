import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fobohLogo from "../../image/signup/fobohLogo.png";
import userIcon from "../../image/signup/user.png";
import phone from "../../image/signup/install_mobile.png";
import briefCase from "../../image/signup/briefcase 2.png";
import { validateRegistration } from "../../helpers/signup-helper";
import alertCircle from "../../image/alertCircle.png";
import { useParams } from "react-router-dom";


const Registration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isFirstName, setIsFirstName] = useState(true);
  const [isLastName, setIsLastName] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isBusiness, setIsBusiness] = useState(true);
  const [isAlertIcon, setIsAlertIcon] = useState(false);

  // Check if the unique key is matching with the url id or not

  useEffect(() => {
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/sign-up");
    }
      
    
  }, []);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = (details) => {
    validateRegistration(
      setIsFirstName,
      isAlertIcon,
      setIsAlertIcon,
      setIsLastName,
      details,
      setIsMobile,
      setIsBusiness
    );

    fetch("https://graph.microsoft.com/v1.0/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountEnabled: true,
        displayName: `${details.fname} ${details.lname}`,
        jobTitle: details.business,
        mail: localStorage.getItem('email'),
        mailNickname: localStorage.getItem('password'),
        identities: [
          {
            signInType: "emailAddress",
            issuer: "fobohdev.onmicrosoft.com",
            issuerAssignedId: localStorage.getItem('email')
          },
        ],
        passwordProfile: {
          forceChangePasswordNextSignIn: true,
          password: localStorage.getItem('password'),
        },
        mobilePhone : details.mobile
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("uniqueKey");
        console.log(data);
        if (!data.error) {
          localStorage.removeItem("email");
          localStorage.removeItem("uniqueKey");
          localStorage.removeItem('password')
          navigate("/auth/sign-in");
        } else {
          console.log(data);
          localStorage.setItem('id', data.id);
          localStorage.removeItem("email");
          localStorage.removeItem("uniqueKey");
          localStorage.removeItem('password')
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="mx-auto h-full bg-[#F8FAFC]">
      <div className="flex flex-col md:flex-row items-center justify-center scale-[90%]">
        <div className="container max-w-sm flex justify-center px-2">
          <div className="bg-white px-8 py-8 rounded-[15px] shadow-md text-black md:w-[500px]">
            <img
              className="mx-auto my-6 w-[190px]"
              src={fobohLogo}
              alt="account-icon"
            />
            <h1 className="mb-8 text-[23px]  md:text-3xl font-bold font-inter text-center text-[#147D73]">
              Create your account
            </h1>

            <form className="min-w-full registration">
              {/* First name input */}
              <div className="mb-6" data-te-input-wrapper-init>
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="relative"
                  placeholder="Your first name"
                  autoComplete="on"
                  maxLength={50}
                  value={details.fname}
                  onChange={handleChange}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={userIcon}
                  alt="user"
                />
                {isAlertIcon && (
                  <img
                    src={alertCircle}
                    className="absolute top-[55px] right-4 h-[20px]"
                    alt="alert circle"
                  />
                )}
              </div>
              {!isFirstName && (
                <p className="mb-6 -mt-4 text-red-500">
                  First name field must not be empty
                </p>
              )}

              {/* Last name input */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Your last name"
                  autoComplete="on"
                  maxLength={50}
                  value={details.lname}
                  onChange={handleChange}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={userIcon}
                  alt="user"
                />
              </div>
              {!isLastName && (
                <p className="mb-6 -mt-4 text-red-500">
                  Last name field must not be empty
                </p>
              )}

              {/* Mobile input */}
              <div className="relative mb-6">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  name="mobile"
                  maxLength={10}
                  placeholder="Your mobile"
                  value={details.mobile}
                  onChange={handleChange}
                  type="text"
                  onKeyPress={(e) => {
                    if (isNaN(Number(e.key))) {
                      e.preventDefault();
                    }
                  }}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={phone}
                  alt="user"
                />
              </div>
              {!isMobile && (
                <p className="mb-6 -mt-4 text-red-500">
                  Mobile field must not be empty
                </p>
              )}

              {/* Business name input */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="mobile">Business name</label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  placeholder="Your business name"
                  autoComplete="on"
                  maxLength={50}
                  value={details.business}
                  onChange={handleChange}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 -mb-[20px] left-4"
                  src={briefCase}
                  alt="user"
                />
              </div>
              {!isBusiness && (
                <p className="mb-6 -mt-4 text-red-500">
                  Business name field must not be empty
                </p>
              )}

              {/* Submit button */}
              <button
                type="button"
                className="foboh-green-btn"
                onClick={() => handleRegistration(details)}
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
