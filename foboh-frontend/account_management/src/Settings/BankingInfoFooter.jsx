import React from "react";
import { Link } from "react-router-dom";

const BankingInfoFooter = () => {
  return (
    <div className="px-6 pt-6">
      <h4 className="text-xl font-semibold  text-[#2B4447]">
        Terms and Conditions
      </h4>
      <div className="flex mt-3 justify-start items-center gap-2 green-checkbox">
        <input
          className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
          id="default-radio-1"
          type="checkbox"
          defaultValue=""
          name="default-radio"
        />
        <p className=" text-sm font-medium text-[#637381]">
          By using FOBOH Payments you agree to the{" "}
          <span>
            <Link
              to="https://www.foboh.com/terms-of-service"
              target="_blank"
              className="text-[#147D73]"
            >
              Payments terms of service
            </Link>
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default BankingInfoFooter;
