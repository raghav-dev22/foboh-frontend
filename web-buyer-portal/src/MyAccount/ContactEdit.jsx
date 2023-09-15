import React, { useState } from "react";
import { useFormik } from "formik";
import { ContactSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
  Mobile: "",
};

const ContactEdit = ({ setEditContact, editContact }) => {
  const [detail, setDetail] = useState();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      localStorage.setItem("ContactEdit", JSON.stringify(values));

      setDetail(values);
      console.log("detail");
      setEditContact();
      //   console.log(setEditContact(!editContact), "setEditContact");
    },
  });
  const cancleBtn = () => {
    setEditContact(!editContact);
  };

  return (
    <>
      <div className="  md:px-0 pb-4 px-6">
        <div className="  pb-4">
          <h2 className="font-bold text-xl	 text-[#2B4447]">Contact</h2>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-nowrap  gap-8">
            <div className="w-full mb-4 relative">
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                value={values.FirstName}
                placeholder="First Name"
                onChange={handleChange}
                className=""
                style={{
                  border: errors.FirstName && "1px solid red",
                }}
              />
              {errors.FirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.FirstName}
                </p>
              )}
              {errors.FirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full mb-4 relative">
              <input
                placeholder="Last Name"
                type="text"
                id="LastName"
                name="LastName"
                value={values.LastName}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.LastName && "1px solid red",
                }}
              />
              {errors.LastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.LastName}
                </p>
              )}
              {errors.LastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.email && "1px solid red",
                }}
              />
              {errors.email && (
                <p className="mt-2 mb-2 text-red-500 text-xs">{errors.email}</p>
              )}
              {errors.email && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>

          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <input
                type="text"
                id="Mobile"
                placeholder="Phone no."
                name="Mobile"
                value={values.Mobile}
                onChange={handleChange}
                className=""
                style={{
                  border: errors.Mobile && "1px solid red",
                }}
              />
              {errors.Mobile && (
                <p className="mt-2 mb-2 text-red-500 text-xs">
                  {errors.Mobile}
                </p>
              )}
              {errors.Mobile && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>

          <div className="flex gap-8 ">
            <button
              className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal"
              onClick={() => {
                cancleBtn();
              }}
            >
              Cancel
            </button>
            <button
              // type="submit"
              // onClick={handleSubmit}
              type="submit"
              className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactEdit;
