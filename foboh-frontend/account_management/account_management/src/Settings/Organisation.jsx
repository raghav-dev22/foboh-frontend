import React, { useState } from "react";

import OrganisationDetails from "./OrganisationDetails";
import OrganisationAddress from "./OrganisationAddress";
import BillingAddress from "./BillingAddress";
import OrganisationLogo from "./OrganisationLogo";
import LogisticsContact from "./LogisticsContact";
import OrderingContact from "./OrderingContact";

function Organisation() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <>
      <div>
        <div className="profile-section  sm:px-11 px-5 h-custom-half overflow-y-scroll	scroll-smooth	scrollable	">
          <div className="sm:py-12 py-8">
            <h4 className="text-green text-2xl	font-semibold pb-2	">
              {" "}
              Organisation settings
            </h4>
            <p className="text-gray font-medium	 text-sm	">
              Keep your organisation details up to date
            </p>
          </div>
          <div className="grid lg:flex gap-5 ">
            <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
              <OrganisationDetails />
              <OrganisationAddress />
              <BillingAddress />
            </div>
            <div className="w-full lg:w-2/5 grid	 gap-5 h-full	">
              <OrganisationLogo />
              <OrderingContact />
              <LogisticsContact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Organisation;
