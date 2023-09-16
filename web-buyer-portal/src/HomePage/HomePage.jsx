// import { Fragment, useState } from "react";

import React, { useEffect } from "react";
import Header from "../main/Header";

import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "../main/Footer";
import BottomToTop from "../main/BottomToTop";
import MainHomePage from "./MainHomePage";
// import MyAccount from "../MyAccount/MyAccount";
import MyAccount from "../MyAccount/MyAccount";
import Profile from "../MyAccount/Profile";
import BusinessDetails from "../MyAccount/ProfileEdit";
import AddressDetails from "../MyAccount/AddressDetails";
import DeliveryContact from "../MyAccount/DeliveryEdit";
import ProductList from "../ProductPage/ProductList";
import ProductDetails from "../ProductPage/ProductDetails";
import ProfileEdit from "../MyAccount/ProfileEdit";
import DeliveryEdit from "../MyAccount/DeliveryEdit";
import CartPage from "../CartPage/CartPage";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Link from "antd/es/typography/Link";
import { Breadcrumb } from "antd";
import CheckOut from "../PaymentPage/CheckOut";
import Delivery from "../PaymentPage/Delivery";
import Payment from "../PaymentPage/Payment";
// import PaymentPage from "../PaymentPage/PaymentDetail";
import PaymentDetail from "../PaymentPage/PaymentDetail";
import { useDispatch } from "react-redux";
// import PaymentPage from "../PaymentPage/paymentPage";
import { updateField } from "../slices/buyerSlice";
import { updateSetting } from "../slices/organisationSlice";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const buyer = JSON.parse(localStorage.getItem("buyerInfo"));
    console.log("buyer", buyer);
    dispatch(
      updateField({
        name: buyer?.businessName,
        email: buyer?.deliveryEmail,
        password: "",
        brn: buyer?.brn,
        cbrn: buyer?.cbrn,
        businessName: buyer?.businessName,
        abn: buyer?.abn,
        liquorLicence: buyer?.liquorLicence,
        deliveryAddress: buyer?.address,
        apartment: buyer?.apartment,
        suburb: buyer?.suburb,
        postcode: buyer?.postalCode,
        notes: buyer?.deliveryNotes,
        deliveryAddressState: buyer?.state,
        firstName: buyer?.deliveryFirstName,
        lastName: buyer?.deliveryLastName,
        mobile: buyer?.mobile,
        organisationId: buyer?.organisationId,
        orderContactState: buyer?.orderingState,
        orderingContactFirstName: buyer?.orderingFirstName,
        orderingContactLastName: buyer?.orderingLastName,
        orderingContactEmail: buyer?.orderingEmail,
        orderingContactMobile: buyer?.orderingMobile,
        deliveryContactFirstName: buyer?.deliveryFirstName,
        deliveryContactLastName: buyer?.deliveryLastName,
        deliveryContactEmail: buyer?.deliveryEmail,
        deliveryContactMobile: buyer?.deliveryMobile,
      })
    );

    fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${buyer?.organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Organisation response", data);
        if (data.success && data?.data.length === 1) {
          const org = data?.data[0];
          dispatch(updateSetting(org));
        }
      })
      .catch((error) => console.log(error));
      
  }, []);

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/home/")
    .filter((segment) => segment.trim() !== "");
  const title = [
    {
      title: (
        <a href="/home/main" className="text-[#637381]  font-normal  text-lg">
          home
        </a>
      ),
    },
    {
      title: (
        <a href="" className="text-[#637381]  font-normal  text-lg">
          {pathSegments}
        </a>
      ),
    },
  ];

  return (
    <>
      <Header />
      {location.pathname !== "/home/main" && (
        <div className="md:w-4/5	w-full mx-auto md:px-0 px-6 md:flex gap-3 py-8 hidden ">
          <Breadcrumb items={title} />
        </div>
      )}
      <Routes>
        <Route path="/main" element={<MainHomePage />} />
        <Route path="/product-list" element={<ProductList />} />

        <Route path="/delivery-contact" element={<DeliveryContact />} />
        <Route path="/address-details" element={<AddressDetails />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account*" element={<MyAccount />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/delivery-edit" element={<DeliveryEdit />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        {/* <Route path="/check-out" element={<CheckOut />} /> */}
        <Route path="/delivery" element={<Delivery />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/payment-page*" element={<PaymentDetail />} />
        {/* <Route path="/payment-page" element={<PaymentPage />} /> */}
      </Routes>

      <Footer />
      <BottomToTop />
    </>
  );
}

export default HomePage;
