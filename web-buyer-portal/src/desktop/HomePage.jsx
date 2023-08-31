// import { Fragment, useState } from "react";

import React from "react";
import Header from "./Header";

import { BrowserRouter as Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import BottomToTop from "./BottomToTop";
import MainHomePage from "./MainHomePage";
import MyAccount from "../MyAccount/MyAccount";
import Profile from "../MyAccount/Profile";
import BusinessDetails from "../MyAccount/ProfileEdit";
import AddressDetails from "../MyAccount/AddressDetails";
import DeliveryContact from "../MyAccount/DeliveryEdit";
import ProductList from "./ProductList";
function HomePage() {
  return (
    <>
      <Header />
      {/* <ProductList /> */}
      {/* <DeliveryContact /> */}
      {/* <AddressDetails /> */}
      {/* <BusinessDetails /> */}
      {/* <Profile /> */}
      <MainHomePage />
      {/* <MyAccount /> */}
      {/* <MainHomePage /> */}
      {/* <MyAccount /> */}
      {/* <Routes>
        <Route path="/home-page" element={<MainHomePage />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes> */}

      <Footer />
      {/* <BottomToTop /> */}
    </>
  );
}

export default HomePage;
