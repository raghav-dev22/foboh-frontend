import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { DeliveryAddressEditSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getBuyerValues } from "../helpers/setBuyerValues";
import { theme } from "antd";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const DeliveryEditAddress = ({
  setEditDelivery,
  editDelivery,
  setDeliveryAddress,
  deliveryAddress,
}) => {
  const [initialValues, setInitialValues] = useState({
    Address: "",
    Suburb: "",
    Apartment: "",
    Postcode: "",
    State: "",
    Notes: "",
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const { useToken } = theme;
  const { token } = useToken();
  const buyer = useSelector((state) => state.buyer);

  useEffect(() => {
    const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));

    getBuyerValues(buyerId)
      .then((buyerData) => {
        const buyerState = states.find(
          (state) => state?.label === buyerData.state
        );

        setDeliveryAddress({
          Apartment: buyerData?.apartment,
          Address: buyerData?.address,
          Suburb: buyerData?.suburb,
          State: buyerState,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.deliveryNotes,
        });

        setValues({
          Apartment: buyerData?.apartment,
          Address: buyerData?.address,
          Suburb: buyerData?.suburb,
          State: buyerState,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.deliveryNotes,
        });

        setInitialValues({
          Apartment: buyerData?.apartment,
          Address: buyerData?.address,
          Suburb: buyerData?.suburb,
          State: buyerState,
          Postcode: buyerData?.postalCode,
          Notes: buyerData?.deliveryNotes,
        });
      })
      .catch((error) => console.log(error));
  }, []);

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
    if (name === "Suburb") {
      setValues({
        ...values,
        Suburb: e,
      });
      setDeliveryAddress({
        ...deliveryAddress,
        Suburb: e,
      });
    } else {
      setValues({
        ...values,
        Suburb: e,
      });
      setDeliveryAddress({
        ...deliveryAddress,
        Suburb: e,
      });
    }
  };
  const handleDeliveryState = (e, name) => {
    if (name === "State") {
      setValues({
        ...values,
        State: e,
      });
      setDeliveryAddress({
        ...deliveryAddress,
        State: e,
      });
    } else {
      setValues({
        ...values,
        State: e,
      });
      setDeliveryAddress({
        ...deliveryAddress,
        State: e,
      });
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: DeliveryAddressEditSchema,
    onSubmit: (values) => {
      console.log(values, "value");
      setDeliveryAddress(values);
    },
  });

  const cancleBtn = () => {
    setValues(initialValues);
    setEditDelivery(!editDelivery);
  };

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
              value={values?.Address}
              onChange={handleChange}
              name="Address"
              className=""
              style={{
                border: errors?.Address && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors?.Address && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors?.Address}
              </p>
            )}
            {errors?.Address && (
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
              value={values?.Apartment}
              onChange={handleChange}
              name="Apartment"
              className=""
              style={{
                border: errors?.Apartment && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors?.Apartment && (
              <p className="mt-2 mb-2 text-red-500 text-xs">
                {errors?.Apartment}
              </p>
            )}
            {errors.Apartment && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[44px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full mb-4 relative">
            <label
              htmlFor="Suburb"
              className="text-base font-normal text-[#2B4447]"
            >
              Suburb
            </label>
            <input
              type="text"
              id="Suburb"
              onChange={handleChange}
              name="City"
              value={values?.Suburb}
              className="custom-bg"
              style={{
                border: errors?.Suburb && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors?.Suburb && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.Suburb}</p>
            )}
            {errors?.Suburb && (
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
              value={values?.Postcode}
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
              value={values?.State}
              options={stateOptions}
              className="custom-bg"
              style={{
                border: errors?.State && "1px solid red",
                background: "#F8F8F8",
              }}
            />
            {errors?.State && (
              <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.State}</p>
            )}
          </div>
        </div>

        <div className="w-full   mb-3 relative">
          {" "}
          <lable className="mb-2">Notes</lable>
          <textarea
            className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 mt-2"
            id="Postcode"
            type="text"
            placeholder="Notes"
            value={values?.Notes}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              border: errors?.Notes && touched?.Notes && "1px solid red",
              background : "#F8F8F8"
            }}
          />
          {errors?.Notes && touched?.Notes && (
            <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.Notes}</p>
          )}
          {errors?.Postcode && touched?.Postcode && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
          )}
        </div>

        <div className="flex gap-8 pt-5 pb-5 justify-end">
          <button
            // type="submit"
            // onClick={handleSubmitBtn}
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
    </>
  );
};

export default DeliveryEditAddress;
