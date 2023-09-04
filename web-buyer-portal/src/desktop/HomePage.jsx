// import { Fragment, useState } from "react";

import React from "react";
import Header from "./Header";

import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import BottomToTop from "./BottomToTop";
import MainHomePage from "./MainHomePage";
import MyAccount from "../MyAccount/MyAccount";
import Profile from "../MyAccount/Profile";
import BusinessDetails from "../MyAccount/ProfileEdit";
import AddressDetails from "../MyAccount/AddressDetails";
import DeliveryContact from "../MyAccount/DeliveryEdit";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProfileEdit from "../MyAccount/ProfileEdit";
import DeliveryEdit from "../MyAccount/DeliveryEdit";
import CartPage from "../MyAccount/CartPage";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Link from "antd/es/typography/Link";
import CheckOut from "../MyAccount/CheckOut";
import Delivery from "../MyAccount/Delivery";
import Payment from "../MyAccount/Payment";

const routes = [
  { path: "/home/my-account", breadcrumb: "Account" },
  { path: "/home/address-details", breadcrumb: "Example 2" },
];
function HomePage() {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();
  console.log(breadcrumbs, "breadcrumbs");

  return (
    <>
      <Header />
      <div className="md:w-4/5	w-full mx-auto md:px-0 px-6 md:flex gap-3 py-8 hidden ">
        {breadcrumbs.map(({ match, breadcrumb }) => {
          return (
            <Link
              key={match.url}
              to={match.url}
              className={
                match.pathname === location.pathname ? "active" : "inactive"
              }
            >
              <div className="flex gap-3 items-center">
                <h5
                  className="text-black font-medium text-base cursor-pointer m-0"
                  style={{ margin: "0px" }}
                >
                  {breadcrumb}
                </h5>
                <h5
                  className="text-black font-medium text-base cursor-pointer m-0"
                  style={{ margin: "0px" }}
                >
                  /
                </h5>
              </div>
              {console.log(breadcrumb, "md:w-4/5	w-full mx-auto md:p-0 px-6")}
            </Link>
          );
        })}
      </div>
      <Routes>
        {/* <Route path="/home-page" element={<MainHomePage />} /> */}
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/delivery-contact" element={<DeliveryContact />} />
        <Route path="/address-details" element={<AddressDetails />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account*" element={<MyAccount />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/home-page" element={<MainHomePage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/delivery-edit" element={<DeliveryEdit />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      <Footer />
      <BottomToTop />
    </>
  );
}

export default HomePage;
