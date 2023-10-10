import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { DeliveryAddressEditSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getBuyerValues } from "../helpers/setBuyerValues";
import { theme } from "antd";
import { getAddress } from "../helpers/getAddress";
import { getStates } from "../helpers/getStates";
import { addressUpdate } from "../helpers/addressUpdate";

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

  const [states, setStates] = useState([]);

  const { useToken } = theme;
  const { token } = useToken();

  const { values, errors, handleChange, setValues, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: DeliveryAddressEditSchema,
      onSubmit: (values) => {
        console.log(values, "value");
      },
    });

  const handleSubmit = () => {
    console.log(values, "value");
    setDeliveryAddress(values);
    addressUpdate(values, "delivery-address");
  };

  useEffect(() => {
    let statesData = [];
    getStates().then((data) => {
      statesData = data.map((state) => {
        return {
          label: state.stateName,
          value: state.stateId,
        };
      });
      setStates(
        data.map((state) => {
          return {
            label: state.stateName,
            value: state.stateId,
          };
        })
      );
    });

    getAddress("delivery-address").then((data) => {
      if (data.success) {
        const buyerData = data?.data[0];
        const buyerState = statesData.find(
          (state) => state?.label === buyerData.state
        );

        const addressBody = {
          Apartment: buyerData?.apartmentSuite,
          Address: buyerData?.streetaddress,
          Suburb: buyerData?.city,
          State: buyerState,
          Postcode: buyerData?.postcode,
          Notes: buyerData?.instructionsNotes,
        };

        setDeliveryAddress(addressBody);
        setValues(addressBody);
        setInitialValues(addressBody);
      }
    });
  }, []);

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

      <form className="">
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
              options={states}
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
              background: "#F8F8F8",
            }}
          />
          {errors?.Notes && touched?.Notes && (
            <p className="mt-2 mb-2 text-red-500 text-xs">{errors?.Notes}</p>
          )}
          {errors?.Postcode && touched?.Postcode && (
            <ErrorOutlineIcon className="absolute text-red-500 top-[21px] right-3 transition-all duration-[0.3s]" />
          )}
        </div>

        <div className="flex gap-8 justify-end ">
          {" "}
          <button
            onClick={handleSubmit}
            type="button"
            className=" border-[#563FE3] border bg-[#563FE3] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
            style={{
              backgroundColor: token.buttonThemeColor,
              borderColor: token.buttonThemeColor,
            }}
          >
            Save
          </button>
          <button
            type="button"
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
