import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "../profile/Profile";
import MainDashBoard from "../components/mainPage/MainDashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Organisation from "../Settings/Organisation";
import Range from "products/Range";
import ViewProduct from "products/ViewProduct";
import AddProduct from "products/AddProduct";
import AddCustomers from "customers/AddCustomers";
import AddCustomersDetails from "customers/AddCustomersDetails";
import ViewCustomer from "customers/ViewCustomer";
import BulkEdit from "products/BulkEdit";
import CustomerBulkEdit from "customers/CustomerBulkEdit";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../Redux/Action/userSlice";
import { updateLogoURI } from "../Redux/Action/organisationLogoSlice";
import SupplierOrderManagement from "orders/SupplierOrderManagement";
import OrderListing from "orders/OrderListing";
import SupplierSetting from "orders/SupplierSetting";
import BankingInformation from "orders/BankingInformation";

// import ViewCustomer from 'customers/ViewCustomer'
// import CustomerContact from 'customers/AddCustomersDetails';

function Dashboard() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(
      `https://user-api-foboh.azurewebsites.net/api/User/get?email=${email}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const userInfo = data?.data[0];
        console.log("user data --->", userInfo);
        localStorage.setItem("organisationId", userInfo.organisationId);
        localStorage.setItem("ccrn", userInfo.ccrn);

        dispatch(
          updateUserData({
            ...user,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            mobile: userInfo.mobile,
            bio: userInfo.bio,
            password: userInfo.password,
            status: true,
            role: userInfo.role,
            meta: userInfo.meta,
            adId: userInfo.adId,
            ccrn: userInfo.ccrn,
            imageUrl: userInfo.imageUrl,
            organisationId: userInfo.organisationId,
          })
        );

        console.log("redux user >>", user);
      })
      .then(() => {
        fetch(
          `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${localStorage.getItem(
            "organisationId"
          )}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("get org --> ", data);
            if (data.success) {
              const org = data?.data[0];

              dispatch(updateLogoURI(org.organisationlogo));
            }
          });
      })
      .catch((error) => console.log(error));
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <>
      <div className="flex flex-no-wrap">
        <div className="w-custom-20 absolute  sm:relative border border-inherit md:h-screen overflow-y-scroll		 flex-col justify-between hidden sm:flex">
          <Sidebar />
        </div>
        <div
          className="w-64 z-40 absolute bg-white  shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out"
          id="mobile-nav"
        >
          <div
            className="h-10 w-10 bg-gray-800 absolute left-4 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer"
            id="mobile-toggler"
            onClick={sidebarHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx={6} cy={10} r={2} />
              <line x1={6} y1={4} x2={6} y2={8} />
              <line x1={6} y1={12} x2={6} y2={20} />
              <circle cx={12} cy={16} r={2} />
              <line x1={12} y1={4} x2={12} y2={14} />
              <line x1={12} y1={18} x2={12} y2={20} />
              <circle cx={18} cy={7} r={2} />
              <line x1={18} y1={4} x2={18} y2={5} />
              <line x1={18} y1={9} x2={18} y2={20} />
            </svg>
          </div>
          <div
            className={`	justify-between h-screen ${
              isDivVisible ? "grid" : "hidden"
            }`}
          >
            <Sidebar />
          </div>
        </div>
        <div className="container-fluid mx-auto  h-64 sm:w-4/5 w-full ">
          <div className="container-fluid mx-auto px-0 sidebar">
            <Header />
            <Routes>
              <Route path="/main" element={<MainDashBoard />} />
              <Route path="/your-profile" element={<Profile />} />
              <Route path="/organisation-settings" element={<Organisation />} />
              <Route path="/products" element={<Range />} />
              <Route path="/view-product/:id" element={<ViewProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/customers" element={<AddCustomers />} />
              <Route path="/view-customer-details" element={<ViewCustomer />} />
              <Route path="/add-customer/*" element={<AddCustomersDetails />} />
              <Route path="/bulk-edit" element={<BulkEdit />} />
              <Route
                path="/supplier-order-management"
                element={<SupplierOrderManagement />}
              />
              <Route path="/settings" element={<SupplierSetting />} />
              <Route
                path="/bank-information"
                element={<BankingInformation />}
              />
              <Route path="/order-listing" element={<OrderListing />} />
              <Route
                path="/customer-bulk-edit"
                element={<CustomerBulkEdit />}
              />
            </Routes>
            {/* <Profile /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
