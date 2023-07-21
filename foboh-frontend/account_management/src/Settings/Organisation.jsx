import React, { useState } from "react";

import OrganisationDetails from "./OrganisationDetails";
import OrganisationAddress from "./OrganisationAddress";
import BillingAddress from "./BillingAddress";
import OrganisationLogo from "./OrganisationLogo";
import LogisticsContact from "./LogisticsContact";
import OrderingContact from "./OrderingContact";
import ProfileHeader from "../dashboard/ProfileHeader";

function Organisation() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [organisationSettings, setOrganisationSettings] = useState({
    tradingName: "",
    businessName: "",
    liquorLicense: "",
    abn: "",
    categories: "",
    organisationlogo: "",
    description: "",
    orderingContactFirstName: "",
    orderingContactLastName: "",
    orderingContactMobile: "",
    orderingContactEmail: "",
    logisticsContactFirstName: "",
    logisticsContactLastName: "",
    logisticsContactMobile: "",
    logisticsContactEmail: "",
    organisationAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    billingAddress: "",
  });

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleSubmit = () => {
    fetch(
      "https://organization-api-foboh.azurewebsites.net/api/Organization/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tradingName: organisationSettings.tradingName,
          businessName: organisationSettings.businessName,
          liquorLicense: organisationSettings.liquorLicense,
          abn: organisationSettings.abn,
          categories: organisationSettings.categories,
          organisationlogo: organisationSettings.organisationlogo,
          description: organisationSettings.description,
          orderingContactFirstName: organisationSettings.orderingContactFirstName,
          orderingContactLastName: organisationSettings.orderingContactLastName,
          orderingContactMobile: organisationSettings.logisticsContactMobile,
          orderingContactEmail: organisationSettings.orderingContactEmail,
          logisticsContactFirstName: organisationSettings.logisticsContactFirstName,
          logisticsContactLastName: organisationSettings.logisticsContactLastName,
          logisticsContactMobile: organisationSettings.logisticsContactMobile,
          logisticsContactEmail: organisationSettings.logisticsContactEmail,
          organisationAddress: organisationSettings.organisationAddress,
          apartment: organisationSettings.apartment,
          city: organisationSettings.city,
          state: organisationSettings.state,
          postcode: organisationSettings.postcode,
          country: organisationSettings.country,
          billingAddress: organisationSettings.billingAddress,
        }),
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.success) {
          setShow(false);
        }
      }).catch(error => console.log(error))


  };

  const handleReset = () => {
    setShow(false);
    setOrganisationSettings({
      tradingName: "",
      businessName: "",
      liquorLicense: "",
      abn: "",
      categories: "",
      organisationlogo: "",
      description: "",
      orderingContactFirstName: "",
      orderingContactLastName: "",
      orderingContactMobile: "",
      orderingContactEmail: "",
      logisticsContactFirstName: "",
      logisticsContactLastName: "",
      logisticsContactMobile: "",
      logisticsContactEmail: "",
      organisationAddress: "",
      apartment: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      billingAddress: "",
    });
  };

  return (
    <>
      <div>
        <div className="profile-section  sm:px-11 px-5 h-custom-half overflow-y-scroll	scroll-smooth	scrollable	">
          {show && (
            <ProfileHeader
              handleSubmit={handleSubmit}
              handleReset={handleReset}
            />
          )}
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
              <OrganisationDetails
                setShow={setShow}
                organisationSettings={organisationSettings}
                setOrganisationSettings={setOrganisationSettings}
              />
              <OrganisationAddress
                setShow={setShow}
                organisationSettings={organisationSettings}
                setOrganisationSettings={setOrganisationSettings}
              />
              <BillingAddress
                setShow={setShow}
                organisationSettings={organisationSettings}
                setOrganisationSettings={setOrganisationSettings}
                organisationAddress={organisationSettings.organisationAddress}
                apartment={organisationSettings.apartment}
                postcode={organisationSettings.postcode}
                state={organisationSettings.state}
              />
            </div>
            <div className="w-full lg:w-2/5  grid	 gap-5 h-full	">
              <OrganisationLogo />
              <OrderingContact
                setShow={setShow}
                organisationSettings={organisationSettings}
                setOrganisationSettings={setOrganisationSettings}
              />
              <LogisticsContact
                setShow={setShow}
                organisationSettings={organisationSettings}
                setOrganisationSettings={setOrganisationSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Organisation;
