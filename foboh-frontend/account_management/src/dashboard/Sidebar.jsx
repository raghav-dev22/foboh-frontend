import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const logoURI = useSelector((state) => state.logo.logoURI);
  const ContactMenu = () => {
    setOpenMenu(!openMenu);
    setIsOpen(false);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenMenu(false);
  };

  return (
    <>
      <div>
        <div className="p-6 placeholder-box">
          <div className="border-2	border-dark	bg-custom-gray w-full	h-16 flex justify-center items-center	">
            <div className="">
              {logoURI ? (
                <img
                  src={logoURI}
                  alt="logoUri"
                  className="w-[207px] h-[63px] object-cover"
                />
              ) : (
                <>
                  <p className="text-xs	font-semibold	italic	text-gray text-center pb-2	">
                    {" "}
                    PLACEHOLDER
                  </p>
                  <p className="text-xs	font-semibold italic	text-gray 	text-center	">
                    supplier logo
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <ul className="list-disc ">
          <li className=" ps-7 py-3 list-inside cursor-pointer ">
            <div className="flex justify-start items-center gap-2">
              <div className="home">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="cls-1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.53955 0.907986C8.81038 0.697338 9.18962 0.697338 9.46045 0.907986L16.2105 6.15799C16.3931 6.30008 16.5 6.51856 16.5 6.75V15C16.5 15.5967 16.2629 16.169 15.841 16.591C15.419 17.0129 14.8467 17.25 14.25 17.25H3.75C3.15326 17.25 2.58097 17.0129 2.15901 16.591C1.73705 16.169 1.5 15.5967 1.5 15V6.75C1.5 6.51856 1.60685 6.30008 1.78954 6.15799L8.53955 0.907986ZM3 7.11681V15C3 15.1989 3.07902 15.3897 3.21967 15.5303C3.36032 15.671 3.55109 15.75 3.75 15.75H14.25C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15V7.11681L9 2.45015L3 7.11681Z"
                    fill="#637381"
                  />
                  <path
                    className="cls-1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H11.25C11.6642 8.25 12 8.58579 12 9V16.5C12 16.9142 11.6642 17.25 11.25 17.25C10.8358 17.25 10.5 16.9142 10.5 16.5V9.75H7.5V16.5C7.5 16.9142 7.16421 17.25 6.75 17.25C6.33579 17.25 6 16.9142 6 16.5V9Z"
                    fill="#637381"
                  />
                </svg>
              </div>
              <Link to="/dashboard/main">
                <h6 className="text-base	font-medium  text-gray	">Dashboard</h6>
              </Link>
            </div>
          </li>
          <li className=" ps-7 py-3 list-inside cursor-pointer ">
            <div className="flex justify-start items-center gap-2">
              <div className="home">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="cls-1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.9 1.05C4.04164 0.861146 4.26393 0.75 4.5 0.75H13.5C13.7361 0.75 13.9584 0.861146 14.1 1.05L16.35 4.05C16.4474 4.17982 16.5 4.33772 16.5 4.5V15C16.5 15.5967 16.2629 16.169 15.841 16.591C15.419 17.0129 14.8467 17.25 14.25 17.25H3.75C3.15326 17.25 2.58097 17.0129 2.15901 16.591C1.73705 16.169 1.5 15.5967 1.5 15V4.5C1.5 4.33772 1.55263 4.17982 1.65 4.05L3.9 1.05ZM4.875 2.25L3 4.75V15C3 15.1989 3.07902 15.3897 3.21967 15.5303C3.36032 15.671 3.55109 15.75 3.75 15.75H14.25C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15V4.75L13.125 2.25H4.875Z"
                    fill="#637381"
                  />
                  <path
                    className="cls-1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
                    fill="#637381"
                  />
                  <path
                    className="cls-1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 6.75C6.41421 6.75 6.75 7.08579 6.75 7.5C6.75 8.09674 6.98705 8.66903 7.40901 9.09099C7.83097 9.51295 8.40326 9.75 9 9.75C9.59674 9.75 10.169 9.51295 10.591 9.09099C11.0129 8.66903 11.25 8.09674 11.25 7.5C11.25 7.08579 11.5858 6.75 12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 8.49456 12.3549 9.44839 11.6517 10.1517C10.9484 10.8549 9.99456 11.25 9 11.25C8.00544 11.25 7.05161 10.8549 6.34835 10.1517C5.64509 9.44839 5.25 8.49456 5.25 7.5C5.25 7.08579 5.58579 6.75 6 6.75Z"
                    fill="#637381"
                  />
                </svg>
              </div>
              <h6 className="text-base	font-medium  text-gray	">Orders</h6>
            </div>
          </li>
          <li
            className=" px-7 py-3  list-inside  cursor-pointer"
            onClick={ContactMenu}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="home">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_313_21342"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={18}
                      height={18}
                    >
                      <rect width={18} height={18} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_313_21342)">
                      <path
                        className="cls-1"
                        d="M2.60714 14.2098C3.44048 13.5253 4.3631 13.0156 5.375 12.6808C6.3869 12.346 7.42857 12.1786 8.5 12.1786C9.57143 12.1786 10.6131 12.3423 11.625 12.6696C12.6369 12.997 13.5595 13.5104 14.3929 14.2098V3.60714H2.60714V14.2098ZM8.5054 11.1071C9.39466 11.1071 10.1518 10.7928 10.7768 10.1642C11.4018 9.53562 11.7143 8.7767 11.7143 7.88746C11.7143 6.9982 11.4 6.24107 10.7714 5.61607C10.1428 4.99107 9.38384 4.67857 8.4946 4.67857C7.60534 4.67857 6.84821 4.99287 6.22321 5.62147C5.59821 6.25009 5.28571 7.00902 5.28571 7.89826C5.28571 8.78752 5.60002 9.54464 6.22862 10.1696C6.85723 10.7946 7.61616 11.1071 8.5054 11.1071ZM2.60714 17C2.16518 17 1.78683 16.8426 1.4721 16.5279C1.15737 16.2132 1 15.8348 1 15.3929V3.60714C1 3.16518 1.15737 2.78683 1.4721 2.4721C1.78683 2.15737 2.16518 2 2.60714 2H14.3929C14.8348 2 15.2132 2.15737 15.5279 2.4721C15.8426 2.78683 16 3.16518 16 3.60714V15.3929C16 15.8348 15.8426 16.2132 15.5279 16.5279C15.2132 16.8426 14.8348 17 14.3929 17H2.60714ZM3.70089 15.3929H13.2991C12.6146 14.872 11.8631 14.474 11.0446 14.1987C10.2262 13.9234 9.37798 13.7857 8.5 13.7857C7.62202 13.7857 6.77753 13.9234 5.96652 14.1987C5.15551 14.474 4.4003 14.872 3.70089 15.3929ZM8.5 9.5C8.05357 9.5 7.67411 9.34375 7.36161 9.03125C7.04911 8.71875 6.89286 8.33929 6.89286 7.89286C6.89286 7.44643 7.04911 7.06696 7.36161 6.75446C7.67411 6.44196 8.05357 6.28571 8.5 6.28571C8.94643 6.28571 9.32589 6.44196 9.63839 6.75446C9.95089 7.06696 10.1071 7.44643 10.1071 7.89286C10.1071 8.33929 9.95089 8.71875 9.63839 9.03125C9.32589 9.34375 8.94643 9.5 8.5 9.5Z"
                        fill="#637381"
                      />
                    </g>
                  </svg>
                </div>
                {/* <Link to="/dashboard/customers"> */}
                <Link to="/dashboard/customers">
                  <h6 className="text-base	font-medium  text-gray">Customers</h6>
                </Link>
              </div>
              <div className={`dropdown-arrow arrow-${openMenu}`}>
                <img src="/assets/dropdownArrow.png" alt="" />
              </div>

              {/* </Link> */}
            </div>
          </li>
          {openMenu && (
            <ul id="dropdown-example" class="  space-y-2 ">
              <li className="ps-12 list-inside cursor-pointer ">
                <Link to="#" className="flex items-center w-full p-2 ">
                  <h6 className="text-base	font-medium  text-gray">Customers</h6>{" "}
                </Link>
              </li>
              <li className="ps-12 list-inside cursor-pointer">
                <Link to="#" class="flex items-center w-full p-2 ">
                  <h6 className="text-base	font-medium  text-gray">Segments</h6>{" "}
                </Link>
              </li>
              <li className="ps-12 list-inside cursor-pointer">
                <Link to="#" className="flex items-center w-full p-2 ">
                  <h6 className="text-base	font-medium  text-gray">
                    Add customer
                  </h6>{" "}
                </Link>
              </li>
            </ul>
          )}
          <li
            onClick={toggleMenu}
            className=" px-7 py-3 list-inside cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="home">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="cls-1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.87661 1.05198C8.21826 0.855103 8.60566 0.751465 9 0.751465C9.39435 0.751465 9.78177 0.855112 10.1234 1.05201C10.124 1.05231 10.1245 1.05261 10.125 1.05291L15.375 4.0529C15.7167 4.25019 16.0005 4.53386 16.198 4.87547C16.3954 5.21707 16.4996 5.60459 16.5 5.99916V12.0007C16.4996 12.3953 16.3954 12.7828 16.198 13.1244C16.0005 13.466 15.7167 13.7497 15.375 13.9469L15.3721 13.9486L10.125 16.9469C10.1245 16.9472 10.1241 16.9475 10.1237 16.9477C9.78194 17.1447 9.39444 17.2484 9 17.2484C8.60558 17.2484 8.21809 17.1447 7.87639 16.9477C7.87593 16.9475 7.87546 16.9472 7.875 16.9469L2.6279 13.9486L2.625 13.9469C2.2833 13.7497 1.99948 13.466 1.80202 13.1244C1.60456 12.7828 1.5004 12.3953 1.5 12.0007V5.99916C1.5004 5.60459 1.60456 5.21707 1.80202 4.87547C1.99948 4.53386 2.2833 4.25019 2.625 4.05291L2.62789 4.05124L7.87661 1.05198ZM9 2.25146C8.86835 2.25146 8.73901 2.28612 8.625 2.35195L8.62211 2.35362L3.375 5.35195C3.37461 5.35217 3.37421 5.3524 3.37382 5.35263C3.26044 5.41836 3.16626 5.51266 3.10067 5.62613C3.03491 5.73991 3.00019 5.86896 3 6.00037V11.9995C3.00019 12.1309 3.03491 12.2599 3.10067 12.3737C3.16626 12.4872 3.26044 12.5815 3.37382 12.6472C3.37421 12.6475 3.37461 12.6477 3.375 12.6479L8.625 15.6479C8.73901 15.7137 8.86835 15.7484 9 15.7484C9.13165 15.7484 9.26098 15.7137 9.375 15.6479L9.3779 15.6462L14.625 12.6479C14.6254 12.6477 14.6258 12.6475 14.6262 12.6472C14.7396 12.5815 14.8337 12.4872 14.8993 12.3737C14.9651 12.2599 14.9999 12.1307 15 11.9992V6.0007C14.9999 5.86917 14.9651 5.74 14.8993 5.62613C14.8337 5.51266 14.7396 5.41837 14.6262 5.35263C14.6258 5.3524 14.6254 5.35218 14.625 5.35195L9.375 2.35195C9.26098 2.28613 9.13165 2.25146 9 2.25146Z"
                      fill="#637381"
                    />
                    <path
                      className="cls-1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.80331 4.84455C2.01072 4.48601 2.46951 4.36348 2.82806 4.57089L9.00002 8.14115L15.172 4.57089C15.5305 4.36348 15.9893 4.48601 16.1967 4.84455C16.4041 5.2031 16.2816 5.66189 15.9231 5.8693L9.37556 9.6568C9.14323 9.79119 8.8568 9.79119 8.62447 9.6568L2.07697 5.8693C1.71843 5.66189 1.59591 5.2031 1.80331 4.84455Z"
                      fill="#637381"
                    />
                    <path
                      className="cls-1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V16.56C9.75 16.9742 9.41421 17.31 9 17.31C8.58579 17.31 8.25 16.9742 8.25 16.56V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <h6 className="text-base	font-medium  text-gray	">Products</h6>
              </div>
              <div className={`dropdown-arrow arrow-${isOpen}`}>
                <img src="/assets/dropdownArrow.png" alt="" />
              </div>
            </div>
          </li>

          {isOpen && (
            <>
              <ul id="dropdown-example" class="  space-y-2 ">
                <li className="ps-12 list-inside cursor-pointer ">
                  <Link
                    to="/dashboard/products"
                    className="flex items-center w-full p-2 "
                  >
                    <h6 className="text-base	font-medium  text-gray">Range</h6>{" "}
                  </Link>
                </li>
                <li className="ps-12 list-inside cursor-pointer">
                  <Link to="#" class="flex items-center w-full p-2 ">
                    <h6 className="text-base	font-medium  text-gray">
                      Inventory
                    </h6>{" "}
                  </Link>
                </li>
                <li className="ps-12 list-inside cursor-pointer">
                  <Link
                    to="/dashboard/add-product"
                    className="flex items-center w-full p-2 "
                  >
                    <h6 className="text-base	font-medium  text-gray">
                      Add product
                    </h6>{" "}
                  </Link>
                </li>
              </ul>
            </>
          )}

          <li className=" ps-7 py-3 list-inside cursor-pointer">
            <div className="flex justify-start items-center gap-2">
              <div className="home">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="cls-1"
                    d="M9.53749 14.8063C9.27499 15.0688 8.95624 15.2 8.58124 15.2C8.20624 15.2 7.88749 15.0688 7.62499 14.8063L1.19374 8.37505C1.07343 8.25096 0.977725 8.10432 0.906638 7.93512C0.835538 7.7659 0.799988 7.5938 0.799988 7.4188V2.15005C0.799988 1.7788 0.932175 1.46099 1.19655 1.19661C1.46093 0.932237 1.77874 0.800049 2.14999 0.800049H7.41874C7.59959 0.800049 7.7698 0.831299 7.92938 0.893799C8.08895 0.956299 8.23578 1.05441 8.36987 1.18814L14.8062 7.62505C15.0687 7.88755 15.2 8.20317 15.2 8.57192C15.2 8.94067 15.0687 9.2563 14.8062 9.5188L9.53749 14.8063ZM8.58124 13.85L13.85 8.5813L7.41874 2.15005H2.14999V7.4188L8.58124 13.85ZM3.94999 5.07505C4.26249 5.07505 4.52811 4.96567 4.74686 4.74692C4.96561 4.52817 5.07499 4.26255 5.07499 3.95005C5.07499 3.63755 4.96561 3.37192 4.74686 3.15317C4.52811 2.93442 4.26249 2.82505 3.94999 2.82505C3.63749 2.82505 3.37186 2.93442 3.15311 3.15317C2.93436 3.37192 2.82499 3.63755 2.82499 3.95005C2.82499 4.26255 2.93436 4.52817 3.15311 4.74692C3.37186 4.96567 3.63749 5.07505 3.94999 5.07505Z"
                    fill="#637381"
                  />
                </svg>
              </div>
              <h6 className="text-base	font-medium  text-gray	">Pricing</h6>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <div className="border-t border-inherit	">
          <ul className="list-disc ">
            <li className="  py-3 list-inside cursor-pointer">
              <div className="flex justify-start items-center gap-2">
                <div className="home">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="cls-1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.75 3.51845C3.55109 3.51845 3.36032 3.59624 3.21967 3.73471C3.07902 3.87317 3 4.06098 3 4.2568V14.2879L4.71967 12.5949C4.86032 12.4564 5.05109 12.3787 5.25 12.3787H14.25C14.4489 12.3787 14.6397 12.3009 14.7803 12.1624C14.921 12.0239 15 11.8361 15 11.6403V4.2568C15 4.06098 14.921 3.87317 14.7803 3.73471C14.6397 3.59624 14.4489 3.51845 14.25 3.51845H3.75ZM2.15901 2.69052C2.58097 2.27512 3.15326 2.04175 3.75 2.04175H14.25C14.8467 2.04175 15.419 2.27512 15.841 2.69052C16.2629 3.10592 16.5 3.66933 16.5 4.2568V11.6403C16.5 12.2278 16.2629 12.7912 15.841 13.2066C15.419 13.622 14.8467 13.8554 14.25 13.8554H5.56066L2.78033 16.5925C2.56583 16.8037 2.24324 16.8668 1.96299 16.7526C1.68273 16.6383 1.5 16.369 1.5 16.0704V4.2568C1.5 3.66933 1.73705 3.10592 2.15901 2.69052Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <h6 className="text-base	font-medium  text-gray	">Chat</h6>
              </div>
            </li>
            <li className="  py-3 list-inside cursor-pointer">
              <div className="flex justify-start items-center gap-2">
                <div className="home">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_668_21560)">
                      <path
                        className="cls-1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 8.18739C8.17157 8.18739 7.5 8.84854 7.5 9.6641C7.5 10.4797 8.17157 11.1408 9 11.1408C9.82843 11.1408 10.5 10.4797 10.5 9.6641C10.5 8.84854 9.82843 8.18739 9 8.18739ZM6 9.6641C6 8.03298 7.34315 6.71069 9 6.71069C10.6569 6.71069 12 8.03298 12 9.6641C12 11.2952 10.6569 12.6175 9 12.6175C7.34315 12.6175 6 11.2952 6 9.6641Z"
                        fill="#637381"
                      />
                      <path
                        className="cls-1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 2.28066C8.80109 2.28066 8.61032 2.35845 8.46967 2.49691C8.32902 2.63538 8.25 2.82318 8.25 3.01901V3.14747C8.24845 3.52906 8.1336 3.90187 7.91958 4.22002C7.70556 4.53817 7.40172 4.78776 7.04545 4.93808C6.98203 4.96484 6.91531 4.98279 6.84721 4.99156C6.52348 5.10316 6.17499 5.13067 5.83575 5.07012C5.445 5.00037 5.08444 4.81698 4.80055 4.5436L4.79464 4.5379L4.74967 4.49357C4.68002 4.42492 4.597 4.37017 4.50596 4.33302C4.41491 4.29586 4.31731 4.27673 4.21875 4.27673C4.12019 4.27673 4.02259 4.29586 3.93154 4.33302C3.8405 4.37017 3.75778 4.42463 3.68813 4.49328L3.68754 4.49386C3.6178 4.56244 3.56248 4.64387 3.52474 4.7335C3.487 4.82314 3.46757 4.91921 3.46757 5.01625C3.46757 5.11328 3.487 5.20935 3.52474 5.29899C3.56248 5.38862 3.6178 5.47006 3.68754 5.53863L3.73868 5.58898C4.01637 5.86846 4.20262 6.22345 4.27347 6.60813C4.34291 6.98515 4.29835 7.37377 4.14559 7.72583C4.00642 8.08507 3.76273 8.39617 3.44479 8.62005C3.12041 8.84845 2.73374 8.9755 2.33504 8.98468L2.3175 8.98488H2.25C2.05109 8.98488 1.86032 9.06267 1.71967 9.20114C1.57902 9.33961 1.5 9.52741 1.5 9.72323C1.5 9.91905 1.57902 10.1069 1.71967 10.2453C1.86032 10.3838 2.05109 10.4616 2.25 10.4616H2.38049C2.7681 10.4631 3.14679 10.5762 3.46996 10.7869C3.79201 10.9968 4.0449 11.2946 4.19776 11.6438C4.35681 12.0005 4.40408 12.3959 4.33347 12.7793C4.26262 13.1639 4.07634 13.5189 3.79865 13.7984L3.79286 13.8042L3.74783 13.8485C3.6781 13.917 3.62248 13.9988 3.58474 14.0884C3.547 14.178 3.52757 14.2741 3.52757 14.3711C3.52757 14.4682 3.547 14.5643 3.58474 14.6539C3.62248 14.7435 3.6778 14.825 3.74754 14.8935L3.74813 14.8941C3.81778 14.9628 3.90049 15.0172 3.99154 15.0544C4.08259 15.0915 4.18019 15.1107 4.27875 15.1107C4.37731 15.1107 4.47491 15.0915 4.56596 15.0544C4.65701 15.0172 4.73972 14.9628 4.80937 14.8941L4.86052 14.8438C5.14441 14.5704 5.505 14.387 5.89575 14.3173C6.27872 14.2489 6.67347 14.2928 7.03108 14.4432C7.39599 14.5802 7.712 14.8201 7.93941 15.1331C8.17142 15.4524 8.30047 15.8331 8.30979 16.2256L8.31 16.2429V16.3093C8.31 16.5051 8.38902 16.6929 8.52967 16.8314C8.67032 16.9699 8.86109 17.0477 9.06 17.0477C9.25891 17.0477 9.44968 16.9699 9.59033 16.8314C9.73098 16.6929 9.81 16.5051 9.81 16.3093V16.1838L9.81001 16.1809C9.81155 15.7993 9.9264 15.4265 10.1404 15.1083C10.3537 14.7912 10.6562 14.5423 11.0109 14.3918C11.3733 14.2352 11.7748 14.1887 12.1642 14.2582C12.555 14.328 12.9156 14.5113 13.1994 14.7847L13.2054 14.7904L13.2503 14.8348C13.32 14.9034 13.403 14.9582 13.494 14.9953C13.5851 15.0325 13.6827 15.0516 13.7812 15.0516C13.8798 15.0516 13.9774 15.0325 14.0685 14.9953C14.1595 14.9582 14.2422 14.9037 14.3119 14.835L14.3125 14.8345C14.3822 14.7659 14.4375 14.6845 14.4753 14.5948C14.513 14.5052 14.5324 14.4091 14.5324 14.3121C14.5324 14.215 14.513 14.119 14.4753 14.0293C14.4375 13.9397 14.3822 13.8583 14.3125 13.7897L14.2613 13.7393C13.9836 13.4599 13.7974 13.1049 13.7265 12.7202C13.6559 12.3368 13.7032 11.9415 13.8622 11.5848C14.0151 11.2356 14.268 10.9378 14.59 10.7278C14.9132 10.5171 15.2919 10.404 15.6795 10.4025L15.6825 10.4025L15.75 10.4025C15.9489 10.4025 16.1397 10.3247 16.2803 10.1863C16.421 10.0478 16.5 9.85999 16.5 9.66416C16.5 9.46834 16.421 9.28054 16.2803 9.14207C16.1397 9.0036 15.9489 8.92581 15.75 8.92581H15.6225L15.6195 8.92581C15.2319 8.92428 14.8532 8.81122 14.53 8.60052C14.2069 8.38983 13.9533 8.09071 13.8006 7.73997C13.7735 7.67754 13.7552 7.61186 13.7463 7.54481C13.633 7.22611 13.605 6.88304 13.6665 6.54906C13.7374 6.16438 13.9237 5.80942 14.2014 5.52994L14.2071 5.52412L14.2522 5.47985C14.3219 5.41128 14.3775 5.32955 14.4153 5.23992C14.453 5.15029 14.4724 5.05421 14.4724 4.95718C14.4724 4.86015 14.453 4.76407 14.4153 4.67443C14.3775 4.5848 14.3222 4.50337 14.2525 4.43479L14.2519 4.43421C14.1822 4.36556 14.0995 4.3111 14.0085 4.27395C13.9174 4.23679 13.8198 4.21766 13.7213 4.21766C13.6227 4.21766 13.5251 4.23679 13.434 4.27395C13.343 4.3111 13.2603 4.36557 13.1906 4.43421L13.1395 4.48456C12.8556 4.75794 12.495 4.9413 12.1042 5.01105C11.7148 5.08056 11.3132 5.03403 10.9508 4.87744C10.5962 4.72696 10.2937 4.47799 10.0804 4.16095C9.8664 3.8428 9.75155 3.46999 9.75001 3.0884L9.75 3.08546V3.01901C9.75 2.82318 9.67098 2.63538 9.53033 2.49691C9.38968 2.35845 9.19891 2.28066 9 2.28066ZM14.55 11.8792L15.2361 12.1773C15.1968 12.2651 15.1851 12.3624 15.2025 12.4567C15.2197 12.5501 15.2645 12.6362 15.3314 12.7044L15.3725 12.7449C15.3724 12.7448 15.3726 12.745 15.3725 12.7449C15.5816 12.9506 15.7477 13.1951 15.8609 13.4638C15.9741 13.7327 16.0324 14.021 16.0324 14.3121C16.0324 14.6032 15.9741 14.8914 15.8609 15.1603C15.7477 15.4292 15.5817 15.6735 15.3725 15.8792L14.8425 15.3568L15.3731 15.8786C15.1642 16.0846 14.916 16.248 14.6429 16.3594C14.3697 16.4709 14.0769 16.5283 13.7812 16.5283C13.4856 16.5283 13.1928 16.4709 12.9196 16.3594C12.6466 16.248 12.3986 16.0848 12.1897 15.8789C12.1896 15.8788 12.1898 15.879 12.1897 15.8789L12.1482 15.8382C12.079 15.7723 11.9914 15.7281 11.8966 15.7112C11.8008 15.6941 11.7019 15.7057 11.6128 15.7444L11.6055 15.7476C11.5181 15.7844 11.4435 15.8456 11.391 15.9237C11.3387 16.0014 11.3106 16.0924 11.31 16.1856V16.3093C11.31 16.8968 11.0729 17.4602 10.651 17.8756C10.229 18.291 9.65674 18.5244 9.06 18.5244C8.46326 18.5244 7.89097 18.291 7.46901 17.8756C7.04705 17.4602 6.81 16.8968 6.81 16.3093V16.2535C6.80644 16.1596 6.77495 16.0687 6.71936 15.9922C6.66245 15.9138 6.58292 15.8542 6.49111 15.8209C6.47628 15.8156 6.46163 15.8097 6.44718 15.8034C6.35806 15.7647 6.25921 15.7532 6.16337 15.7703C6.06856 15.7872 5.981 15.8314 5.91172 15.8973L5.87063 15.9377C5.87053 15.9378 5.87072 15.9376 5.87063 15.9377C5.66172 16.1435 5.41338 16.3071 5.14037 16.4185C4.86722 16.53 4.57444 16.5874 4.27875 16.5874C3.98306 16.5874 3.69028 16.53 3.41713 16.4185C3.14425 16.3071 2.89631 16.144 2.68746 15.9383C2.47827 15.7326 2.31231 15.4883 2.19908 15.2194C2.08585 14.9505 2.02757 14.6622 2.02757 14.3711C2.02757 14.0801 2.08585 13.7918 2.19908 13.5229C2.31231 13.254 2.47827 13.0097 2.68746 12.804L2.72858 12.7635C2.79546 12.6953 2.84035 12.6091 2.85754 12.5158C2.87491 12.4214 2.86318 12.3241 2.82385 12.2364L2.82061 12.2292C2.78315 12.1431 2.721 12.0697 2.64174 12.0181C2.56278 11.9666 2.47031 11.9389 2.37562 11.9383H2.25C1.65326 11.9383 1.08097 11.7049 0.65901 11.2895C0.237053 10.8741 0 10.3107 0 9.72323C0 9.13576 0.237053 8.57236 0.65901 8.15695C1.08097 7.74155 1.65326 7.50818 2.25 7.50818H2.30673C2.40213 7.50468 2.49444 7.47367 2.57216 7.41894C2.65173 7.36292 2.71233 7.28463 2.7461 7.19425C2.75155 7.17965 2.75747 7.16522 2.76385 7.15099C2.80318 7.06326 2.81491 6.96594 2.79754 6.87159C2.78035 6.77826 2.73546 6.69207 2.66857 6.62386L2.62747 6.58339C2.41827 6.37768 2.25231 6.13338 2.13908 5.86448C2.02585 5.59558 1.96757 5.30734 1.96757 5.01625C1.96757 4.72515 2.02585 4.43692 2.13908 4.16801C2.25226 3.89924 2.41811 3.65504 2.62717 3.44939C2.83607 3.24358 3.08412 3.0803 3.35713 2.96888C3.63028 2.85741 3.92307 2.80003 4.21875 2.80003C4.51443 2.80003 4.80722 2.85741 5.08037 2.96888C5.35351 3.08035 5.60166 3.24373 5.81063 3.44968L5.85173 3.49015C5.92101 3.55599 6.00857 3.60018 6.10337 3.61711C6.19921 3.63421 6.29806 3.62267 6.38718 3.58395C6.43521 3.56308 6.48519 3.54729 6.5363 3.53676C6.58859 3.50181 6.63374 3.45702 6.66896 3.40466C6.72125 3.32693 6.74941 3.23589 6.75 3.14268V3.01901C6.75 2.43154 6.98705 1.86813 7.40901 1.45273C7.83097 1.03733 8.40326 0.803955 9 0.803955C9.59674 0.803955 10.169 1.03733 10.591 1.45273C11.0129 1.86813 11.25 2.43154 11.25 3.01901V3.08361C11.2506 3.17683 11.2787 3.26786 11.331 3.34559C11.3835 3.42363 11.4581 3.48485 11.5454 3.52172L11.5528 3.52484C11.642 3.56356 11.7408 3.57515 11.8366 3.55804C11.9314 3.54112 12.019 3.49693 12.0883 3.43109L12.1294 3.39061C12.3383 3.18466 12.5865 3.02128 12.8596 2.90981C13.1328 2.79834 13.4256 2.74096 13.7213 2.74096C14.0169 2.74096 14.3097 2.79834 14.5829 2.90981C14.856 3.02128 15.1042 3.18466 15.3131 3.39061C15.522 3.59621 15.6878 3.84029 15.8009 4.10894C15.9141 4.37785 15.9724 4.66608 15.9724 4.95718C15.9724 5.24827 15.9141 5.53651 15.8009 5.80541C15.6877 6.07419 15.5219 6.31838 15.3128 6.52403C15.3127 6.52413 15.3129 6.52394 15.3128 6.52403L15.2714 6.56479C15.2045 6.633 15.1597 6.71919 15.1425 6.81252C15.1251 6.90688 15.1368 7.00419 15.1761 7.09192C15.1973 7.13921 15.2134 7.18842 15.2241 7.23873C15.2596 7.29021 15.3051 7.33465 15.3583 7.36933C15.4372 7.42081 15.5297 7.44853 15.6244 7.44911H15.75C16.3467 7.44911 16.919 7.68248 17.341 8.09788C17.7629 8.51329 18 9.07669 18 9.66416C18 10.2516 17.7629 10.815 17.341 11.2304C16.919 11.6458 16.3467 11.8792 15.75 11.8792H15.6844C15.5897 11.8798 15.4972 11.9075 15.4183 11.959C15.339 12.0107 15.2768 12.084 15.2394 12.1701L14.55 11.8792Z"
                        fill="#637381"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_668_21560">
                        <rect
                          width={18}
                          height="17.7204"
                          fill="white"
                          transform="translate(0 0.803955)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <Link to={"/dashboard/organisation-settings"}>
                  <h6 className="text-base	font-medium  text-gray	">Settings</h6>
                </Link>
              </div>
            </li>
            <li className="  py-3 list-inside cursor-pointer">
              <div className="flex justify-start items-center gap-2">
                <div className="home">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_668_21565)">
                      <mask
                        id="mask0_668_21565"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={-1}
                        y={0}
                        width={19}
                        height={19}
                      >
                        <rect
                          x="-0.236877"
                          y="0.269775"
                          width={18}
                          height={18}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_668_21565)">
                        <path
                          className="cls-1"
                          d="M8.72562 13.5565C8.98812 13.5565 9.21 13.4673 9.39125 13.2889C9.5725 13.1104 9.66312 12.892 9.66312 12.6336C9.66312 12.3752 9.5725 12.1567 9.39125 11.9783C9.21 11.7999 8.98812 11.7107 8.72562 11.7107C8.46312 11.7107 8.24125 11.7999 8.06 11.9783C7.87875 12.1567 7.78812 12.3752 7.78812 12.6336C7.78812 12.892 7.87875 13.1104 8.06 13.2889C8.24125 13.4673 8.46312 13.5565 8.72562 13.5565ZM8.05062 10.7139H9.43812C9.43812 10.3078 9.485 9.98784 9.57875 9.75402C9.6725 9.52021 9.93812 9.20026 10.3756 8.79417C10.7006 8.47422 10.9569 8.16965 11.1444 7.88046C11.3319 7.59127 11.4256 7.24363 11.4256 6.83754C11.4256 6.14841 11.1694 5.61926 10.6569 5.25009C10.1444 4.88091 9.53812 4.69632 8.83812 4.69632C8.12562 4.69632 7.5475 4.88091 7.10375 5.25009C6.66 5.61926 6.35062 6.06227 6.17562 6.57912L7.41312 7.05904C7.47562 6.83754 7.61625 6.59758 7.835 6.33915C8.05375 6.08073 8.38812 5.95152 8.83812 5.95152C9.23812 5.95152 9.53812 6.0592 9.73812 6.27455C9.93812 6.4899 10.0381 6.72679 10.0381 6.98521C10.0381 7.23133 9.96312 7.46206 9.81312 7.67741C9.66312 7.89277 9.47562 8.09274 9.25062 8.27732C8.70062 8.75725 8.36312 9.12027 8.23812 9.36639C8.11312 9.61251 8.05062 10.0617 8.05062 10.7139ZM8.76312 16.5099C7.72562 16.5099 6.75062 16.3161 5.83812 15.9285C4.92562 15.5408 4.13187 15.0148 3.45687 14.3503C2.78187 13.6857 2.2475 12.9043 1.85375 12.006C1.46 11.1077 1.26312 10.1478 1.26312 9.12643C1.26312 8.10504 1.46 7.14519 1.85375 6.24686C2.2475 5.34853 2.78187 4.56711 3.45687 3.9026C4.13187 3.23808 4.92562 2.71201 5.83812 2.32437C6.75062 1.93674 7.72562 1.74292 8.76312 1.74292C9.80062 1.74292 10.7756 1.93674 11.6881 2.32437C12.6006 2.71201 13.3944 3.23808 14.0694 3.9026C14.7444 4.56711 15.2787 5.34853 15.6725 6.24686C16.0662 7.14519 16.2631 8.10504 16.2631 9.12643C16.2631 10.1478 16.0662 11.1077 15.6725 12.006C15.2787 12.9043 14.7444 13.6857 14.0694 14.3503C13.3944 15.0148 12.6006 15.5408 11.6881 15.9285C10.7756 16.3161 9.80062 16.5099 8.76312 16.5099ZM8.76312 15.0332C10.4381 15.0332 11.8569 14.461 13.0194 13.3166C14.1819 12.1721 14.7631 10.7754 14.7631 9.12643C14.7631 7.47744 14.1819 6.08073 13.0194 4.93629C11.8569 3.79184 10.4381 3.21962 8.76312 3.21962C7.08812 3.21962 5.66937 3.79184 4.50687 4.93629C3.34437 6.08073 2.76312 7.47744 2.76312 9.12643C2.76312 10.7754 3.34437 12.1721 4.50687 13.3166C5.66937 14.461 7.08812 15.0332 8.76312 15.0332Z"
                          fill="#637381"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_668_21565">
                        <rect
                          width={18}
                          height="17.7204"
                          fill="white"
                          transform="translate(0 0.0427246)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h6 className="text-base	font-medium  text-gray	">Help</h6>
              </div>
            </li>
          </ul>
          <div className=" mt-3">
            <img src="/assets/logo.png" alt="" className="mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
