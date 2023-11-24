import React, { useEffect } from "react";
import Header from "../main/Header";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Footer from "../main/Footer";
import BottomToTop from "../main/BottomToTop";
import MainHomePage from "./MainHomePage";
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
import { Breadcrumb, theme } from "antd";
import Delivery from "../PaymentPage/Delivery";
import PaymentDetail from "../PaymentPage/PaymentDetail";
import { useDispatch } from "react-redux";
import { updateField } from "../slices/buyerSlice";
import { updateSetting } from "../slices/organisationSlice";
import { setBuyerValues } from "../helpers/setBuyerValues";

import OrderConfirmation from "../Order/OrderConfirmation";
import MyOrders from "../Order/MyOrders";
import OrderDetails from "../Order/OrderDetails";

function HomePage({ setConfig }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      navigate("/auth/sign-in");
    }
  }, []);

  useEffect(() => {
    const buyer = JSON.parse(localStorage.getItem("buyerInfo"));
    setBuyerValues(buyer, dispatch, updateField);

    if (buyer) {
      fetch(
        `https://themesfobohwebapi-fbh.azurewebsites.net/api/Themes/get?organizationId=${buyer?.organisationId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setConfig({ token: data?.data[0]?.theme });
          console.log(data?.data[0]?.theme, "all theme");
        })
        .catch((error) => console.log(error));

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
    }
  }, []);

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/home/")
    .filter((segment) => segment.trim() !== "");
  const title = [
    {
      title: (
        <a href="/home/main" className="text-[#637381]  font-normal  text-lg">
          Home
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
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <style>
        {`
      .ant-breadcrumb a:hover{
        color:${token.commonThemeColor}
      } 
      `}
      </style>
      <Header />
      {location.pathname !== "/home/main" &&
        location.pathname !== "/home/order-confirm" && (
          <div className="md:w-4/5 w-full mx-auto md:px-0 px-6 md:flex gap-3 py-8 hidden">
            <Breadcrumb items={title} />
          </div>
        )}
      <Routes>
        <Route path="/main" element={<MainHomePage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/order-confirm" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/delivery-contact" element={<DeliveryContact />} />
        <Route path="/address-details" element={<AddressDetails />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account*" element={<MyAccount />} />
        <Route path="/my-cart" element={<CartPage />} />
        <Route path="/product-name/:id" element={<ProductDetails />} />
        <Route path="/delivery-contact" element={<DeliveryEdit />} />
        <Route path="/business-details" element={<ProfileEdit />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment-page*" element={<PaymentDetail />} />
        <Route path="/order-history/:id" element={<OrderDetails />} />
      </Routes>
      <Footer />
      <BottomToTop />
    </>
  );
}

export default HomePage;
