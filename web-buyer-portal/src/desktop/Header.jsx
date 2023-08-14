import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MenuIcon from "./MenuIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import WineBarIcon from "@mui/icons-material/WineBar";

function Header() {
  const [wine, setWine] = useState(false);
  const [lists, setLists] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const WineDropDown = () => {
    setWine(!wine);
  };
  const ListsDropDown = () => {
    setLists(!lists);
    setWine(false);
  };
  return (
    <>
      <div className="top-header bg-white flex justify-between items-center p-6">
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

        <div className="flex items-center gap-2">
          <div className="box-rounded md:bg-[#F4F7FF] rounded-full md:h-10	md:w-10 flex justify-center items-center">
            <AccountCircleIcon className="icon-svg" />
          </div>
          <div className="box-rounded md:bg-[#F4F7FF] rounded-full md:h-10	md:w-10 flex justify-center items-center">
            <ShoppingCartIcon className="icon-svg" />
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
          <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between px-6">
              <Link to="#">
                <div className="bg-[#F5F5F5] rounded-full w-[40px] h-[40px] flex justify-center items-center">
                  <MenuIcon />
                </div>
              </Link>
              <h5 className="text-base font-semibold text-[#1D1E20]">
                Categories
              </h5>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="">
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center justify-between rounded-md py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          WineDropDown();
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <WineBarIcon />
                          WINE
                        </div>

                        <ChevronDownIcon
                          className="h-5 w-5 flex-none"
                          aria-hidden="true"
                        />
                      </Disclosure.Button>

                      {wine && (
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
                        className="flex w-full items-center justify-between rounded-md py-2 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          ListsDropDown();
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <WineBarIcon />
                          Product
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
                  <a
                    href="#"
                    className=" block rounded-md px-6 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className=" block rounded-md px-6 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className=" block rounded-md px-6 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}

export default Header;
