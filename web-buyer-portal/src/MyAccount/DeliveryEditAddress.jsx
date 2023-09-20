import React from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { DeliveryAddressEditSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const DeliveryEditAddress = ({ setEditDelivery, editDelivery }) => {
  const initialValues = {
    Apartment: "",
    Address: "",
    City: "",
    State: "",
    Postcode: "",
    DeliveryInstruction: "",
  };

  //   const navigate = useNavigate();
  //   const [cart, setCart] = useState();
  const stateOptions = [
    { label: "Victoria", value: "option1" },
    { label: "Queensland", value: "option2" },
    { label: "Western Australia", value: "option3" },
  ];
  const cityOptions = [
    { label: "Ballina", value: "option1" },
    { label: "Balranald	", value: "option2" },
    { label: "Batemans Bay", value: "option3" },
  ];
  const handleDeliveryCity = (e, name) => {
    if (name === "City") {
      setValues({
        ...values,
        City: e,
      });
    } else {
      setValues({
        ...values,
        City: e,
      });
    }
  };
  const handleDeliveryState = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
    } else {
      setValues({
        ...values,
        State: e,
      });
    }
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: DeliveryAddressEditSchema,
    onSubmit: (values) => {
      console.log(values, "kkk");
      const value = localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(values)
      );
      console.log(value, "value");
      setEditDelivery();
    },
  });
  const cancleBtn = () => {
    setEditDelivery(!editDelivery);
  };
  //   const handleSubmitBtn = () => {
  //     localStorage.setItem("deliveryAddress", JSON.stringify(values));
  //   };
  //   console.log("error>>", values);

  return (
    <>
      <div className="flex  items-center gap-1.5  pb-4">
        <HomeRoundedIcon
          style={{ fill: "#2B4447" }}
          className="w-[18px] h-[18px]"
        />
        <h5 className="text-lg font-semibold text-[#2B4447]">
          Delivery Address
        </h5>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Address
            </label>
            <input
              type="text"
              id="Address"
              value={values.Address}
              onChange={handleChange}
              name="Address"
              className=""
              style={{
                border: errors.Address && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors.Address && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.Address}</p>
            )}
            {errors.Address && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Apartment etc
            </label>
            <input
              type="text"
              id="Apartment"
              value={values.Apartment}
              onChange={handleChange}
              name="Apartment"
              className=""
              style={{
                border: errors.Apartment && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors.Apartment && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.Apartment}
              </p>
            )}
            {errors.Apartment && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              City
            </label>
            <Select
              type="text"
              defaultValue={`Country`}
              id="City"
              onChange={(e) => handleDeliveryCity(e, "City")}
              name="City"
              value={values.City}
              options={cityOptions}
              className="custom-bg"
              style={{
                border: errors.City && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors.City && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.City}</p>
            )}
            {errors.City && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>

        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Postcode
            </label>
            <input
              type="text"
              id="Postcode"
              value={values.Postcode}
              onChange={handleChange}
              name="Postcode"
              className=""
              style={{
                border: errors.Postcode && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors.Postcode && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors.Postcode}
              </p>
            )}
            {errors.Postcode && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              State
            </label>
            <Select
              type="text"
              id="State"
              onChange={(e) => handleDeliveryState(e, "State")}
              name="State"
              value={values.State}
              options={stateOptions}
              className="custom-bg"
              style={{
                border: errors.State && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors.State && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors.State}</p>
            )}
            {errors.State && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>

        <div className={`relative mb-4 `} data-te-input-wrapper-init>
          <label htmlFor="" className="text-base font-normal text-[#2B4447]">
            Delivery Instruction/Notes
          </label>
          <input
            type="text"
            id="DeliveryInstruction"
            className=""
            name="DeliveryInstruction"
            value={values.DeliveryInstruction}
            onChange={handleChange}
            autoComplete="off"
            style={{
              border: errors.DeliveryInstruction && "1px solid red",
              background: "#F8F8F8",
            }}
          />
          {errors.DeliveryInstruction && (
            <p className="mt-2 mb-2 text-red-500 text-xs">
              {errors.DeliveryInstruction}
            </p>
          )}
          {errors.DeliveryInstruction && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
          )}
        </div>

        <div className="flex gap-8 pt-5 pb-5 justify-end">
          <button
            // type="submit"
            // onClick={handleSubmitBtn}
            type="submit"
            className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
          >
            Save
          </button>
          <button
            className=" border-[#563FE3] border rounded-md py-[12px] px-[33px] text-base text-[#563FE3] font-normal"
            onClick={() => {
              cancleBtn();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default DeliveryEditAddress;
