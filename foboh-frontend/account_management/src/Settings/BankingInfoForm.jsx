import React from "react";
import { AuBankAccountElement, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const BankingInfoForm = ({
  formChange,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  setValues,
}) => {
  const [cardErrors, setCardErrors] = useState({});
  const [bankName, setBankName] = useState("");

  const element = document.getElementById("AuBankAccountElement~root");
  console.log("au ele", element);

  const AU_BANK_ACCOUNT_STYLE = {
    base: {
      color: "#32325d",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      ":-webkit-autofill": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
      ":-webkit-autofill": {
        color: "#fa755a",
      },
    },
  };

  const val = document.getElementsByClassName("InputElement is-complete Input");

  console.log(val);

  const AU_BANK_ACCOUNT_ELEMENT_OPTIONS = {
    style: AU_BANK_ACCOUNT_STYLE,
    disabled: false,
    hideIcon: true,

    iconStyle: "default", // or "solid"
  };

  return (
    <div className="border w-full border-[#E7E7E7] rounded-md  bg-white ">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447] mb-2">
          Banking information
        </h5>
        <p className="text-sm font-medium text-[#637381] leading-[20px]">
          Nominate your bank account for fund deposit.
        </p>
      </div>
      <div className="py-6 px-6">
        <form action="" onChange={formChange}>
          <AuBankAccountElement
            id="AuBankAccountElement"
            options={AU_BANK_ACCOUNT_ELEMENT_OPTIONS}
            onChange={(event) => {
              setCardErrors({
                ...cardErrors,
                [event.elementType]: event.error,
              });
              setBankName(event.bankName);
              setValues((prev) => {
                return {
                  ...prev,
                  bankingInformationBankName: event.bankName,
                };
              });
              console.log("CardNumberElement [change]", event);
            }}
          />
          <p className="mt-2 mb-2 text-red-500 text-xs">
            {cardErrors?.cardNumber?.message}
          </p>
          {/* <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="username"
            >
              Bank State Branch (BSB) number
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="XXY-ZZZ"
              name="BSB"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.BSB}
            />
            {errors.BSB && touched.BSB && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.BSB}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="Account number"
            >
              Account number
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Account number"
              type="text"
              placeholder="XXXXXX YYYYYYY ZZZ"
              onChange={handleChange}
              onBlur={handleBlur}
              name="AccountNumber"
              value={values.AccountNumber}
            />
            {errors.AccountNumber && touched.AccountNumber && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.AccountNumber}
              </p>
            )}
          </div> */}
          <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="BankName"
            >
              Bank Name
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="BankName"
              type="text"
              placeholder="Bank Name"
              name="BankName"
              value={bankName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.BankName && touched.BankName && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.BankName}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankingInfoForm;
