import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MenuIcon from "./MenuIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import WineBarIcon from "@mui/icons-material/WineBar";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
function Header({ count, addData }) {
  const [wine, setWine] = useState(false);
  const [lists, setLists] = useState(false);
  const [orders, setOrders] = useState(false);
  const [payments, setPayments] = useState(false);
  const [account, setAccount] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [number, setNumber] = useState(0);
  const wineData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
  const data = addData;
  const [CARTdata, setCARTData] = useState([]);
  useEffect(() => {
    setCARTData(data);
  }, [data]);
  const WineDropDown = () => {
    setWine(!wine);
    setLists(false);
    setOrders(false);
    setPayments(false);
    setAccount(false);
  };
  const ListsDropDown = () => {
    setLists(!lists);
    setWine(false);
    setOrders(false);
    setPayments(false);
    setAccount(false);
  };
  const ordersDropDown = () => {
    setOrders(!orders);
    setLists(false);
    setWine(false);
    setPayments(false);
    setAccount(false);
  };
  const PaymentsDropDown = () => {
    setPayments(!payments);
    setLists(false);
    setWine(false);
    setOrders(false);
    setAccount(false);
  };
  const AccountDropDown = () => {
    setAccount(!account);
    setLists(false);
    setWine(false);
    setOrders(false);
    setPayments(false);
  };
  const userDropdown = () => {
    setShowUser(!showUser);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);
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
            <span className="sr-only">Open main menu</span>
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
            onClick={() => {
              userDropdown();
            }}
          >
            <AccountCircleIcon className="icon-svg" />
          </div>
          {showUser && (
            <>
              <div
                className="right-0 md:top-16 top-0 	 z-50 w-60 md:absolute fixed user-dropdown bg-white	 md:rounded-lg	md:h-fit h-full 	"
                style={{
                  boxShadow: "rgb(0 0 0 / 14%) 0px 0px 5px 0px",
                }}
              >
                <div className="flex justify-between flex-col h-full">
                  <div className="">
                    <div className="flex md:hidden items-center justify-between mx-4 py-8 border-b border-[#CDCED6]">
                      <div
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setShowUser(false)}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h5 className="text-base font-semibold text-[#1D1E20]">
                        Shopping Cart
                      </h5>
                      <Link to="#">
                        <div className="box-rounded bg-[#F4F7FF] rounded-full h-[40px] object-contain		w-[40px] flex justify-center items-center">
                          <ShoppingCartIcon className="icon-svg" />
                        </div>
                      </Link>
                    </div>

                    <ul className="dropdown-content pt-3">
                      <Link to="#">
                        <li className="py-2.5	px-4 cursor-pointer	flex items-center gap-2">
                          <FormatListBulletedIcon style={{ fill: "#637381" }} />
                          <h6 className="text-sm font-medium		text-[#637381]">
                            Lists
                          </h6>
                        </li>
                      </Link>
                      <Link to="#">
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
                      <li className="py-2.5	px-4 border-inherit cursor-pointer flex items-center gap-2">
                        <AccountCircleIcon style={{ fill: "#637381" }} />
                        <h6 className="text-sm font-medium		text-[#637381]">
                          Account
                        </h6>
                      </li>
                    </ul>
                  </div>
                  <ul className="dropdown-content pb-3">
                    <li className="py-2.5	px-4 border-t-2	 border-inherit cursor-pointer flex items-center gap-2">
                      <LogoutIcon style={{ fill: "#FF5757" }} />
                      <h6 className="text-sm font-medium text-[#FF5757]">
                        Logout
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div
            className="box-rounded md:bg-[#F4F7FF] rounded-full md:h-10	md:w-10 flex justify-center items-center relative"
            onClick={() => setMobileCartOpen(true)}
          >
            <ShoppingCartIcon className="icon-svg" />
            <div className=" absolute top-[-4px] right-[-2px] cart-box w-[15px] h-[15px] rounded-full bg-[#563FE3] flex justify-center items-center">
              <p className="text-white text-[8px] font-normal">{count}</p>
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
            <Link to="#">
              <h6 className="header-font text-base	text-white font-normal hover:font-bold">
                Product
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
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-[#0000002e]  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="fixed inset-y-0 left-0 z-50 w-10/12	 overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between px-6">
                <Link to="#">
                  <div className="bg-[#F5F5F5] rounded-full w-[40px] h-[40px] flex justify-center items-center">
                    <MenuIcon />
                  </div>
                </Link>
                <h5 className="text-base font-semibold text-[#1D1E20]">
                  Categories
                </h5>
                <div
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="">
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-none py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-[#F0F3FB] hover:border-r-4 hover:border-[#563FE3] hover:text-[#563FE3]"
                          onClick={() => {
                            WineDropDown();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <WineBarIcon />
                            <h5 className=" text-sm font-bold">WINE</h5>
                          </div>

                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>

                        {wine && (
                          <div className="pb-[100px] border-b border-[#CDCED6]">
                            {wineData.map((item) => {
                              return (
                                <a
                                  href="#"
                                  className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  {item.title}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </>
                    </Disclosure>
                    <Disclosure as="div" className="">
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-none py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-[#F0F3FB] hover:border-r-4 hover:border-[#563FE3] hover:text-[#563FE3]"
                          onClick={() => {
                            ListsDropDown();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <FormatListBulletedIcon />
                            <h5 className=" text-sm font-bold">Lists</h5>
                          </div>

                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>

                        {lists && (
                          <div className="pb-[100px] border-b border-[#CDCED6]">
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Features
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Marketplace
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Company
                            </a>
                          </div>
                        )}
                      </>
                    </Disclosure>
                    <Disclosure as="div" className="">
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-none py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-[#F0F3FB] hover:border-r-4 hover:border-[#563FE3] hover:text-[#563FE3]"
                          onClick={() => {
                            ordersDropDown();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingBasketIcon />
                            <h5 className="text-sm font-bold">Orders</h5>
                          </div>

                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>

                        {orders && (
                          <div className="pb-[100px] border-b border-[#CDCED6]">
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Features
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Marketplace
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Company
                            </a>
                          </div>
                        )}
                      </>
                    </Disclosure>
                    <Disclosure as="div" className="">
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-none py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-[#F0F3FB] hover:border-r-4 hover:border-[#563FE3] hover:text-[#563FE3]"
                          onClick={() => {
                            PaymentsDropDown();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <CreditCardIcon />
                            <h5 className=" text-sm font-bold">Payments</h5>
                          </div>

                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>

                        {payments && (
                          <div className="pb-[100px] border-b border-[#CDCED6]">
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Features
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Marketplace
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Company
                            </a>
                          </div>
                        )}
                      </>
                    </Disclosure>
                    <Disclosure as="div" className="">
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-none py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-[#F0F3FB] hover:border-r-4 hover:border-[#563FE3] hover:text-[#563FE3]"
                          onClick={() => {
                            AccountDropDown();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AccountCircleIcon />
                            <h5 className=" text-sm font-bold ">Account</h5>
                          </div>

                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        {account && (
                          <div className="pb-[100px] border-b border-[#CDCED6]">
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Features
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Marketplace
                            </a>
                            <a
                              href="#"
                              className=" block rounded-md px-14 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              Company
                            </a>
                          </div>
                        )}
                      </>
                    </Disclosure>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

        <Dialog
          as="div"
          className=""
          open={mobileCartOpen}
          onClose={setMobileCartOpen}
        >
          <div className="fixed inset-0 z-10 " />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0000002e]  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="fixed inset-y-0 right-0 z-10 w-10/12	 overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between px-4">
                <div
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileCartOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h5 className="text-base font-semibold text-[#1D1E20]">
                  Shopping Cart
                </h5>
                <Link to="#">
                  <div className="box-rounded bg-[#F4F7FF] rounded-full h-[40px] object-contain		w-[40px] flex justify-center items-center">
                    <ShoppingCartIcon className="icon-svg" />
                  </div>
                </Link>
              </div>
              <div className="mx-5 mt-8">
                {CARTdata.length === 0 ? (
                  <h5 className="text-sm font-bold text-center  pt-8 mt-8 flow-root border-t border-[#CDCED6] ">
                    Your cart is empty.
                  </h5>
                ) : (
                  <>
                    {CARTdata.map((item, index) => {
                      return (
                        <>
                          <div className="box shadow-md rounded-lg my-4">
                            <div className="flex items-center gap-2 p-2">
                              <div className="cart-img">
                                <img
                                  src={item.img}
                                  alt=""
                                  className="max-w-[80px] w-[80px] h-[80px] object-cover	"
                                />
                              </div>
                              <div className="w-full flex flex-col gap-[15px]">
                                <div className="">
                                  <h5 className="text-sm font-bold">
                                    {item.title}
                                  </h5>
                                  <p className=" text-[#666666] text-xs">
                                    {item.title}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center">
                                  <h5 className="text-sm font-bold">
                                    {" "}
                                    ${item.price * item.quantity}.00
                                  </h5>
                                  <div className="bg-[#EEEEEE] rounded-[30px]  w-[70px] flex gap-2 justify-center items-center">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        const _CART = CARTdata.map(
                                          (cartItem, index) => {
                                            return item.id === cartItem.id
                                              ? {
                                                  ...cartItem,
                                                  quantity:
                                                    cartItem.quantity > 1
                                                      ? cartItem.quantity - 1
                                                      : 1,
                                                }
                                              : cartItem;
                                          }
                                        );
                                        setCARTData(_CART);
                                      }}
                                    >
                                      -
                                    </div>
                                    <div className="text-xs">
                                      {item.quantity}
                                    </div>
                                    <div
                                      className="cursor-pointer	"
                                      onClick={() => {
                                        const _CART = CARTdata.map(
                                          (cartItem, index) => {
                                            return item.id === cartItem.id
                                              ? {
                                                  ...cartItem,
                                                  quantity:
                                                    cartItem.quantity + 1,
                                                }
                                              : cartItem;
                                          }
                                        );
                                        setCARTData(_CART);
                                      }}
                                    >
                                      +
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}

                {/* <h5 className="text-sm font-bold text-center  pt-8">
                  Your cart is empty.
                </h5> */}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}

export default Header;
