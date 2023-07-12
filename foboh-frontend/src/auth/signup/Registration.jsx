import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fobohLogo from "../../image/signup/fobohLogo.png";
import userIcon from "../../image/signup/user.png";
import phone from "../../image/signup/install_mobile.png";
import briefCase from "../../image/signup/briefcase 2.png";
import { useParams } from "react-router-dom";
import { RegistrationSchema } from "../../schemas";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  businessName: "",
};

const Registration = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/sign-up");
    }
    
  }, []);


  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegistrationSchema,
      onSubmit: (values) => {
        fetch("https://graph.microsoft.com/v1.0/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountEnabled: true,
        displayName: `${values.firstName} ${values.lastName}`,
        jobTitle: values.businessName,
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
        mobilePhone : values.mobile
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
      },
    });


  // Check if the unique key is matching with the url id or not

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
            <form onSubmit={handleSubmit} className="min-w-full registration">
              {/* First name input */}
              <div className="mb-6 relative" data-te-input-wrapper-init>
                <label htmlFor="fname">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="transition-all duration-[0.3s]"
                  placeholder="Your first name"
                  autoComplete="on"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.firstName && touched.firstName && "1px solid red",
                  }}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={userIcon}
                  alt="user"
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.firstName}</p>
                )}
                {errors.firstName && touched.firstName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>

              {/* Last name input */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  autoComplete="on"
                  className="transition-all duration-[0.3s]"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.lastName && touched.lastName && "1px solid red",
                  }}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={userIcon}
                  alt="user"
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.lastName}</p>
                )}
                {errors.lastName && touched.lastName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>

              {/* Mobile input */}
              <div className="relative mb-6">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  name="mobile"
                  placeholder="Your mobile"
                  type="text"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.mobile && touched.mobile && "1px solid red",
                  }}
                  
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                  src={phone}
                  alt="user"
                />
                {errors.mobile && touched.mobile && (
                  <p className="mt-2 mb-2 text-red-500">{errors.mobile}</p>
                )}
                {errors.mobile && touched.mobile && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>

              {/* Business name input */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="mobile">Business name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  placeholder="Your business name"
                  autoComplete="on"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.businessName &&
                      touched.businessName &&
                      "1px solid red",
                  }}
                />
                <img
                  className="relative h-[20px] w-[20px] bottom-9 -mb-[20px] left-4"
                  src={briefCase}
                  alt="user"
                />
                {errors.businessName && touched.businessName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.businessName}</p>
                )}
                {errors.businessName && touched.businessName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                )}
              </div>

              {/* Submit button */}
              <button type="submit" className="foboh-green-btn">
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
