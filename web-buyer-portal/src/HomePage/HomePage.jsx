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
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../slices/buyerSlice";
import { updateSetting } from "../slices/organisationSlice";
import { setBuyerValues } from "../helpers/setBuyerValues";

import OrderConfirmation from "../Order/OrderConfirmation";
import MyOrders from "../Order/MyOrders";
import OrderDetails from "../Order/OrderDetails";
import AllProducts from "../ProductPage/AllProducts";

function HomePage({ setConfig }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.productBreadcrum);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    const buyer = JSON.parse(localStorage.getItem("buyerInfo"));
    localStorage.setItem("catalogueId", buyer?.catalogueId);
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
          if (data.success && data?.data.length === 1) {
            const org = data?.data[0];
            dispatch(updateSetting(org));
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const location = useLocation();

  let pathname = "";
  const orderIdArr = location.pathname
    .split("/")
    .filter((segment) => segment.trim() !== "");
  let pathArr = location.pathname
    .split("/")
    .filter((segment) => segment.trim() !== "");

  pathArr.forEach((item) => {
    if (item === "order") {
      pathArr.pop();
    } else if (item === "product") {
      pathArr.pop();
    }
  });

  const segments = pathArr.map((crum) => {
    let orderId = orderIdArr[orderIdArr.length - 1];

    pathname += `/${crum}`;

    let crumName;
    if (crum === "order") {
      pathname = `/${crum}/${orderId}`;
      orderId = orderIdArr[orderIdArr.length - 1];
      crumName =
        "order #".charAt(0).toUpperCase() +
        `order #${orderId}`.slice(1).split("-").join(" ");
    } else if (crum === "product") {
      pathname = `${orderId}`;
      crumName =
        "product >".charAt(0).toUpperCase() +
        `product > ${product?.product?.title}`.slice(1).split("-").join(" ");
    } else {
      crumName =
        crum.charAt(0).toUpperCase() + crum.slice(1).split("-").join(" ");
    }
    if (crumName === orderId) {
      return "";
    } else {
      return {
        title: (
          <a href={pathname} className="text-[#637381]  font-normal  text-lg">
            {crumName}
          </a>
        ),
      };
    }
  });

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
      {location.pathname !== "/home" &&
        location.pathname !== "/home/order-confirm" && (
          <div className="md:w-4/5 w-full mx-auto md:px-0 px-6 md:flex gap-3 py-8 hidden">
            <Breadcrumb items={segments} />
          </div>
        )}
      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/all-products/*" element={<AllProducts />} />
        <Route path="/order-confirm" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/delivery-contact" element={<DeliveryContact />} />
        <Route path="/address-details" element={<AddressDetails />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        <Route
          path="account/profile/profile-details"
          element={<ProfileEdit />}
        />
        <Route
          path="account/addresses/addresses-details"
          element={<DeliveryEdit />}
        />
        <Route path="/account/*" element={<MyAccount />} />
        <Route path="/my-cart" element={<CartPage />} />
        <Route path="/all-products/product/:id" element={<ProductDetails />} />
        {/* <Route
          path="/account/account-details/addresses"
          element={<DeliveryEdit />}
        />
        <Route
          path="/account/account-details/profile"
          element={<ProfileEdit />}
        /> */}
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/my-cart/*" element={<PaymentDetail />} />
        <Route path="/my-orders/order/:id" element={<OrderDetails />} />
      </Routes>
      <Footer />
      <BottomToTop />
    </>
  );
}

export default HomePage;
