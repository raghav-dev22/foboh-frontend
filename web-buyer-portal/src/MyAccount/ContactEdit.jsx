import React, { useState } from "react";
import { useFormik } from "formik";
import { ContactSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CallIcon from "@mui/icons-material/Call";
import { useEffect } from "react";
import { getBuyerValues } from "../helpers/setBuyerValues";
import { theme } from "antd";
import { getAddress } from "../helpers/getAddress";
import { addressUpdate } from "../helpers/addressUpdate";

const ContactEdit = ({ setEditContact, editContact }) => {
  const { useToken } = theme;
  const { token } = useToken();
  const [initialValues, setInitialValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    Mobile: "",
  });
  const { values, errors, handleChange, handleSubmit, setValues, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ContactSchema,
      onSubmit: (values) => {
        console.log(values, "values");
        addressUpdate(values, 'delivery-contact')
      },
    });
  const cancleBtn = () => {
    setValues(initialValues);
    setEditContact(!editContact);
  };

  useEffect(() => {
    getAddress("delivery-contact").then((data) => {
      const buyerData = data?.data[0]
      if (data.success) {
        setValues({
          FirstName: buyerData?.firstname,
          LastName: buyerData?.lastname,
          email: buyerData?.emailId,
          Mobile: buyerData?.phoneNumber,
        });
        setInitialValues({
          FirstName: buyerData?.firstname,
          LastName: buyerData?.lastname,
          email: buyerData?.emailId,
          Mobile: buyerData?.phoneNumber,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="  md:px-0 pb-4 px-6">
        <div className="flex  items-center gap-1.5 pb-6">
          <CallIcon style={{ fill: "#2B4447" }} className="w-[18px] h-[18px]" />
          <h5 className="text-lg font-semibold text-[#2B4447]">
            Delivery Contact
          </h5>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-nowrap  gap-8">
            <div className="w-full mb-4 relative">
              <label
                htmlFor=""
                className="text-base font-normal text-[#2B4447]"
              >
                First Name
              </label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                value={values.FirstName}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.FirstName && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors.FirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.FirstName}
                </p>
              )}
              {errors.FirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full mb-4 relative">
              <label
                htmlFor=""
                className="text-base font-normal text-[#2B4447]"
              >
                Last Name
              </label>
              <input
                // placeholder="Last Name"
                type="text"
                id="LastName"
                name="LastName"
                value={values.LastName}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.LastName && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors.LastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.LastName}
                </p>
              )}
              {errors.LastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <label
                htmlFor=""
                className="text-base font-normal text-[#2B4447]"
              >
                Email
              </label>
              <input
                type="text"
                // placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.email && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors.email && (
                <p className="mt-2 mb-2 text-red-500 text-xs">{errors.email}</p>
              )}
              {errors.email && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>

          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <label
                htmlFor=""
                className="text-base font-normal text-[#2B4447]"
              >
                Phone no.{" "}
              </label>
              <input
                type="text"
                id="Mobile"
                name="Mobile"
                value={values.Mobile}
                onChange={handleChange}
                className="border border-[#E0E0E0] "
                style={{
                  border: errors.Mobile && "1px solid red",
                  background: "#F8F8F8",
                }}
              />
              {errors.Mobile && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.Mobile}
                </p>
              )}
              {errors.Mobile && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>

          <div className="flex gap-8 justify-end ">
            <button
              onClick={handleSubmit}
              type="submit"
              className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
              style={{
                backgroundColor: token.buttonThemeColor,
                borderColor: token.buttonThemeColor,
              }}
            >
              Save
            </button>
            <button
              className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal"
              style={{
                color: token.buttonThemeColor,
                borderColor: token.buttonThemeColor,
              }}
              onClick={() => {
                cancleBtn();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactEdit;
