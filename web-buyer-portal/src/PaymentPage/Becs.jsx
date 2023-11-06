import { AuBankAccountElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const Becs = ({ cardHolderName, setCardHolderName, email, setEmail }) => {
  const [cardErrors, setCardErrors] = useState({});

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

  const AU_BANK_ACCOUNT_ELEMENT_OPTIONS = {
    style: AU_BANK_ACCOUNT_STYLE,
    disabled: false,
    hideIcon: false,
    iconStyle: "default", // or "solid"
  };

  return (
    <>
      <div className="mt-5 py-5 px-4 border rounded-lg">
        <div className="flex flex-nowrap gap-2">
          <div
            className={`relative mb-4 w-full`}
            // data-te-input-wrapper-init
          >
            <label
              htmlFor="Name"
              className="text-[#2B4447] font-normal text-sm"
            >
              Name
            </label>
            <input
              onChange={(e) => setCardHolderName(e.target.value)}
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              value={cardHolderName}
              autoComplete="on"
              style={{ background: "#F8F8F8" }}
            />
          </div>
          <div
            className={`relative mb-4 w-full`}
            // data-te-input-wrapper-init
          >
            <label
              htmlFor="Email"
              className="text-[#2B4447] font-normal text-sm"
            >
              Email
            </label>
            <input
              type="text"
              id="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
              placeholder="Email"
              autoComplete="on"
              value={email}
              style={{ background: "#F8F8F8" }}
            />
          </div>
        </div>

        <div
          className={`relative mb-4 w-full`}
          // data-te-input-wrapper-init
        >
          <label
            htmlFor="AccountNumber"
            className="text-[#2B4447] font-normal text-sm"
          >
            Account Details
          </label>
          <AuBankAccountElement
            options={AU_BANK_ACCOUNT_ELEMENT_OPTIONS}
            onChange={(event) => {
              setCardErrors({
                ...cardErrors,
                [event.elementType]: event.error,
              });
              console.log("CardNumberElement [change]", event);
            }}
          />
          <p className="mt-2 mb-2 text-red-500 text-xs">
            {cardErrors?.cardNumber?.message}
          </p>
        </div>
      </div>
    </>
  );
};

export default Becs;
