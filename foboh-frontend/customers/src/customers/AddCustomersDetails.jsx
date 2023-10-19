import React from "react";
import DetailsHeader from "../AddCustomersDetails/DetailsHeader";
import CustomerAddress from "../AddCustomersDetails/CustomerAddress";
import ContactForm from "../AddCustomersDetails/ContactForm";
import CustomerDetails from "../AddCustomersDetails/CustomerDetails";
import CustomerContact from "../AddCustomersDetails/CustomerContact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DetailsHeader from '../customersDetails/DetailsHeader'

function AddCustomersDetails() {
  return (
    <>
      <div className="padding-top-custom">
        <DetailsHeader />
        {/* <ContactForm /> */}
        <Routes>
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/customer-address" element={<CustomerAddress />} />
          <Route path="/customer-contact" element={<CustomerContact />} />
        </Routes>
      </div>
    </>
  );
}

export default AddCustomersDetails;
