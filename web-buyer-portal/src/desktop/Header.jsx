import React, { useState, useEffect } from "react";

import { Popover, Dialog } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MenuIcon from "./MenuIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";

import Cart from "./Cart";
import { useSelector } from "react-redux";
import MobileSidebar from "./MobileSidebar";
function Header() {
  const selector = useSelector((items) => items.cart);

  const [showUser, setShowUser] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  // const userDropdown = () => {
  //   setShowUser(!showUser);
  // };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className={`top-header bg-white flex justify-between items-center p-6 ${
          scroll && "fixed top-0 right-0 left-0 z-40 border-b border-inherit"
        }`}
      >
        <div className="flex md:hidden w-[50px]">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            {/* <span className="sr-only">Open main menu</span> */}
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <h2 className="text-[#637381] font-bold md:text-3xl text-xl	"> LOGO</h2>
        <div className=" relative md:block hidden">
          <input
            type="text"
            className="roun8ded-md	font-normal text-sm placeholder:text-sm"
            placeholder="Search by product or brand"
            style={{
              padding: "12px 16px 12px 38px",
              border: "0px",
              background: "#F4F7FF",
              margin: "0px",
            }}
          />
          <SearchIcon
            className="absolute top-1/4 left-2.5 "
            style={{ fill: "#563FE3" }}
          />
        </div>

        <div className="flex items-center gap-2 relative">
          <div
            className="box-rounded md:bg-[#F4F7FF] rounded-full md:h-10	md:w-10 flex justify-center items-center"
            // onClick={() => {
            //   userDropdown();
            // }}
            onClick={() => {
              setShowUser(!showUser);
            }}
          >
            <AccountCircleIcon className="icon-svg" />
          </div>
          {/* {showUser && ( */}
          <Dialog
            as="div"
            className=""
            open={showUser}
            onClose={setShowUser}
            // onBlur={onClose}
          >
            <Dialog.Panel>
              <div
                className="md:right-16 md:top-20 top-0  right-0	 z-50 w-60 md:absolute fixed user-dropdown bg-white	 md:rounded-lg	md:h-fit h-full 	"
                style={{
                  boxShadow: "rgb(0 0 0 / 14%) 0px 0px 5px 0px",
                }}
              >
                <div className="flex justify-between flex-col h-full">
                  <div className="">
                    <div className="flex md:hidden items-center justify-between mx-4 py-6 border-b border-[#CDCED6]">
                      <div
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setShowUser(false)}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h5 className="text-base font-semibold text-[#1D1E20]">
                        Name
                      </h5>
                      <Link to="#">
                        <div className="box-rounded bg-[#F4F7FF] rounded-full h-[40px] object-contain		w-[40px] flex justify-center items-center">
                          <ShoppingCartIcon className="icon-svg" />
                        </div>
                      </Link>
                    </div>

                    <ul className="dropdown-content pt-3">
                      <Link
                        to="/home/product-list"
                        className="focus-visible:outline-offset-0 focus-visible:outline-0		"
                      >
                        <li className="py-2.5	px-4 cursor-pointer	flex items-center gap-2">
                          <FormatListBulletedIcon style={{ fill: "#637381" }} />
                          <h6 className="text-sm font-medium		text-[#637381]">
                            Lists
                          </h6>
                        </li>
                      </Link>

                      <Link
                        to="#"
                        className="focus-visible:outline-offset-0 focus-visible:outline-0		"
                      >
                        <li className="py-2.5	px-4 cursor-pointer flex items-center justify-between gap-2	">
                          <div className=" flex items-center gap-2">
                            <ShoppingBasketIcon style={{ fill: "#637381" }} />
                            <h6 className="text-sm font-medium text-[#637381]">
                              Orders
                            </h6>
                          </div>
                          <div className="rounded-md h-[30px] w-[30px] bg-[#563FE3] flex justify-center items-center">
                            <p className="text-white text-xs font-bold">10</p>
                          </div>
                        </li>
                      </Link>
                      <li className="py-2.5	px-4 border-inherit cursor-pointer flex items-center gap-2">
                        <CreditCardIcon style={{ fill: "#637381" }} />
                        <h6 className="text-sm font-medium	text-[#637381]	">
                          Payments
                        </h6>
                      </li>
                      <Link to="/home/account">
                        <li className="py-2.5	px-4 border-inherit cursor-pointer flex items-center gap-2">
                          <AccountCircleIcon style={{ fill: "#637381" }} />
                          <h6 className="text-sm font-medium		text-[#637381]">
                            Account
                          </h6>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <ul className="dropdown-content pb-3">
                    <li
                      onClick={handleLogout}
                      className="py-2.5	px-4 border-t-2	 border-inherit cursor-pointer flex items-center gap-2"
                    >
                      <LogoutIcon style={{ fill: "#FF5757" }} />
                      <h6 className="text-sm font-medium text-[#FF5757]">
                        Logout
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          {/* )} */}

          <div
            className="box-rounded md:bg-[#F4F7FF] rounded-full md:h-10	md:w-10 flex justify-center items-center relative"
            onClick={() => setMobileCartOpen(true)}
          >
            <ShoppingCartIcon className="icon-svg" />
            <div className=" absolute top-[-4px] right-[-2px] cart-box w-[15px] h-[15px] rounded-full bg-[#563FE3] flex justify-center items-center">
              <p className="text-white text-[8px] font-normal">
                {selector.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <header className="bg-[#563FE3] md:block hidden ">
        <nav
          className="mx-auto flex max-w-7xl items-center md:justify-center justify-end p-6 md:px-8 "
          aria-label="Global"
        >
          <Popover.Group className=" md:flex md:gap-x-12">
            <Popover className="relative"></Popover>
            <Link to="/product-list">
              <h6 className="header-font text-base	text-white font-normal hover:font-bold">
                Products
              </h6>
            </Link>
            <Link to="#">
              <h6 className="header-font text-base	text-white font-normal hover:font-bold">
                Features
              </h6>
            </Link>
            <Link to="#">
              <h6 className="header-font text-base	text-white font-normal hover:font-bold">
                Marketplace
              </h6>
            </Link>
            <Link to="#">
              <h6 className=" header-font text-base	text-white font-normal hover:font-bold">
                Company
              </h6>
            </Link>
          </Popover.Group>
        </nav>
        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
          }}
        />
        <Cart
          open={mobileCartOpen}
          onClose={() => {
            setMobileCartOpen(false);
          }}
        />
      </header>
      <div className=" relative md:hidden xl:hidden block mx-6 mb-4">
        <input
          type="text"
          className="roun8ded-md	font-normal text-sm placeholder:text-sm"
          placeholder="Search by product or brand"
          style={{
            padding: "12px 16px 12px 38px",
            border: "0px",
            background: "#F4F7FF",
            margin: "0px",
          }}
        />
        <SearchIcon
          className="absolute top-1/4 left-2.5 "
          style={{ fill: "#563FE3" }}
        />
      </div>
    </>
  );
}

export default Header;
