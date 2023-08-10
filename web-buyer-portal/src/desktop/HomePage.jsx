// import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import React, { Fragment, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <h2 className="text-[#637381] font-bold text-3xl	"> LOGO</h2>
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
          <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
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
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-md py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className="h-5 w-5 flex-none"
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-md px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="banner flex flex-wrap py-6 items-center justify-center h-[461px]">
        <div className="md:w-2/5	 w-full	">
          <h5 className="text-[#563FE3] font-semibold	text-xl mb-3	">
            Hello [first name] 👋
          </h5>
          <h1 className="font-bold text-xl	text-[#212B36] mb-3">
            Welcome to Supplier name
          </h1>
          <p className="text-[#637381] font-normal text-base	mb-3">
            Browse our range, select your favourites and manage your orders and
            payments all in one place
          </p>
          <div className="mt-2">
            <button className="bg-[#563FE3] py-2.5	px-7	rounded-3xl	">
              <p className="text-white font-semibold text-base">Shop now</p>
            </button>
          </div>
        </div>
        <div className="md:w-2/5	 w-full flex justify-center	">
          <div className="logo ">
            <img src="/assets/SUPPLIERLOGO.png" alt="" />
          </div>
        </div>
      </div>
      <div className="shop-section ">
        <h2 className="text-center font-bold text-[#212B36] text-3xl	py-6">
          Shop the range
        </h2>
        <div className="container mx-auto">
          <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
            {/* Carousel for desktop and large size devices */}
            <CarouselProvider
              className="lg:block hidden"
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={12}
              visibleSlides={4}
              step={1}
              infinite={true}
            >
              <div className="w-full relative flex items-center justify-center">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                    >
                      <Slide index={0}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={1}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={2}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={3}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={4}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={5}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={6}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={7}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={8}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="texlg:t-xl le leading-4 text-basealg:ding-tight text-white">
                              Catalog 2
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={9}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={10}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={11}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  id="next"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>

            {/* Carousel for tablet and medium size devices */}
            <CarouselProvider
              className="lg:hidden md:block hidden"
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={12}
              visibleSlides={2}
              step={1}
              infinite={true}
            >
              <div className="w-full relative flex items-center justify-center">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                    >
                      <Slide index={0}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={1}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={2}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={3}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={4}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={5}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={6}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={7}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={8}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="texlg:t-xl le leading-4 text-basealg:ding-tight text-white">
                              Catalog 2
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={9}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={10}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center pb-6">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={11}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  id="next"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>

            {/* Carousel for mobile and Small size Devices */}
            <CarouselProvider
              className="block md:hidden "
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={12}
              visibleSlides={1}
              step={1}
              infinite={true}
            >
              <div className="w-full relative flex items-center justify-center">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700"
                    >
                      <Slide index={0}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={1}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={2}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={3}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={4}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={5}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={6}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={7}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={8}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="black chair and white table"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="texlg:t-xl le leading-4 text-basealg:ding-tight text-white">
                              Catalog 2
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={9}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={10}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                      <Slide index={11}>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto flex-col">
                          <img
                            src="/assets/shop.png"
                            alt="sitting area"
                            className="object-cover object-center w-full"
                          />
                          <div className="  w-full h-full p-6">
                            <h2 className="text-[#000] font-semibold text-lg text-center">
                              Red
                            </h2>

                            <p className="text-[#637381] font-normal text-sm text-center">
                              x products
                            </p>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  id="next"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
