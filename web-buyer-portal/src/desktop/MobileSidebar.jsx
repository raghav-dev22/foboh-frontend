import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WineBarIcon from "@mui/icons-material/WineBar";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuIcon from "./MenuIcon";
import { Link } from "react-router-dom";

const MobileSidebar = ({ onClose, open }) => {
  const [wine, setWine] = useState(false);
  const [lists, setLists] = useState(false);
  const [orders, setOrders] = useState(false);
  const [payments, setPayments] = useState(false);
  const [account, setAccount] = useState(false);
  const wineData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
  const ListData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
  const orderData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
  const paymentData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
  const accountData = [
    { title: "All products" },
    { title: "Sparkling" },
    { title: "White" },
    { title: "Rose " },
    { title: "Orange" },
    { title: "Red" },
    { title: "Dessert" },
  ];
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
  return (
    <>
      <Dialog
        as="div"
        className="md:hidden"
        open={open}
        onClose={onClose}
        // onBlur={onClose}
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
                onClick={onClose}
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
                          {ListData.map((item) => {
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
                          {orderData.map((item) => {
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
                          {paymentData.map((item) => {
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
                          {accountData.map((item) => {
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
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default MobileSidebar;
