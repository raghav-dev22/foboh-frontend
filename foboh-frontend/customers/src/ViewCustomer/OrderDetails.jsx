import React, { useState } from "react";
import OrderTable from "./OrderTable";
const OrderDetails = () => {
    const [activeStatus, setActiveStatus] = useState(1);
    return (
        <>
            <div className="px-12 pt-6">

                <div className="xl:w-full xl:mx-0  sm:block rounded-lg border border-darkGreen	">
                    <ul className="flex      gap-5 bg-custom-skyBlue rounded-s-lg	rounded-e-lg	pt-4">
                        <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 py-3 px-4	 cursor-pointer rounded-s-lg rounded-e-lg bg-white customer-tab" : "text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer  px-4"}>
                            <div className="flex gap-2 items-center">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-1" d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z" fill="#fff" />
                                </svg>
                                <div className="flex items-center">
                                    <span className={`${activeStatus == 1 ? " text-black font-bold	" : " font-normal	 text-white"} text-base`}>Orders</span>
                                </div>
                            </div>
                        </li>
                        <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700  rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab" : " px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"}>
                            <div className="flex gap-2 items-center">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-1" d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z" fill="#fff" />
                                </svg>
                                <div className="flex items-center">
                                    <span className={`${activeStatus == 2 ? " text-black font-bold	" : " font-normal	 text-white"} text-base`}>Contacts</span>
                                </div>
                            </div>

                        </li>
                        <li onClick={() => setActiveStatus(3)} className={activeStatus == 3 ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700  rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab" : " px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"}>
                            <div className="flex gap-2 items-center">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-1" d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z" fill="#fff" />
                                </svg>
                                <div className="flex items-center">
                                    <span className={`${activeStatus == 3 ? " text-black font-bold	" : " font-normal	 text-white"} text-base`}>Addresses</span>
                                </div>
                            </div>

                        </li>
                        <li onClick={() => setActiveStatus(4)} className={activeStatus == 4 ? "py-3 px-4 text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 rounded-s-lg rounded-e-lg cursor-pointer bg-white customer-tab" : " px-4 text-sm text-gray-600 py-3 flex items-center  hover:text-indigo-700 cursor-pointer"}>
                            <div className="flex gap-2 items-center">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-1" d="M2.3077 19.4999C1.80898 19.4999 1.38302 19.3233 1.02982 18.9701C0.676608 18.6169 0.5 18.1909 0.5 17.6922V6.30765C0.5 5.80893 0.676608 5.38297 1.02982 5.02977C1.38302 4.67656 1.80898 4.49995 2.3077 4.49995H4.5C4.5 3.25125 4.93782 2.18908 5.81345 1.31345C6.6891 0.437817 7.75128 0 8.99998 0C10.2487 0 11.3109 0.437817 12.1865 1.31345C13.0621 2.18908 13.5 3.25125 13.5 4.49995H15.6923C16.191 4.49995 16.6169 4.67656 16.9701 5.02977C17.3233 5.38297 17.5 5.80893 17.5 6.30765V17.6922C17.5 18.1909 17.3233 18.6169 16.9701 18.9701C16.6169 19.3233 16.191 19.4999 15.6923 19.4999H2.3077ZM2.3077 17.9999H15.6923C15.7692 17.9999 15.8397 17.9679 15.9038 17.9038C15.9679 17.8397 16 17.7691 16 17.6922V6.30765C16 6.23072 15.9679 6.16019 15.9038 6.09608C15.8397 6.03198 15.7692 5.99993 15.6923 5.99993H2.3077C2.23077 5.99993 2.16024 6.03198 2.09612 6.09608C2.03202 6.16019 1.99997 6.23072 1.99997 6.30765V17.6922C1.99997 17.7691 2.03202 17.8397 2.09612 17.9038C2.16024 17.9679 2.23077 17.9999 2.3077 17.9999ZM8.99998 11.4999C10.2487 11.4999 11.3109 11.0621 12.1865 10.1865C13.0621 9.3108 13.5 8.24862 13.5 6.99993H12C12 7.83326 11.7083 8.54159 11.125 9.12493C10.5416 9.70826 9.83331 9.99993 8.99998 9.99993C8.16664 9.99993 7.45831 9.70826 6.87498 9.12493C6.29164 8.54159 5.99998 7.83326 5.99998 6.99993H4.5C4.5 8.24862 4.93782 9.3108 5.81345 10.1865C6.6891 11.0621 7.75128 11.4999 8.99998 11.4999ZM5.99998 4.49995H12C12 3.66662 11.7083 2.95828 11.125 2.37495C10.5416 1.79162 9.83331 1.49995 8.99998 1.49995C8.16664 1.49995 7.45831 1.79162 6.87498 2.37495C6.29164 2.95828 5.99998 3.66662 5.99998 4.49995Z" fill="#fff" />
                                </svg>
                                <div className="flex items-center">
                                    <span className={`${activeStatus == 4 ? " text-black font-bold	" : " font-normal	 text-white"} text-base`}>Payments</span>
                                </div>
                            </div>

                        </li>
                    </ul>

                    <div className="p-5">
                        <div className={`relative overflow-x-auto overflow-y-auto h-80 no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white ${activeStatus == 1 ? "Active" : "hidden"}`}>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className=" border-b">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base">
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base	"
                                        >
                                            Code
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base	"
                                        >
                                            Configuration
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base	"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base	"
                                        >
                                            Stock level
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-green	font-medium text-base	"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <OrderTable />
                                </tbody>
                            </table>
                        </div>
                        <div className={`${activeStatus == 2 ? "Active" : "hidden"} grid lg:grid-cols-2 grid-cols-1 gap-4`}>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                                    <h6 className="text-lg	 font-bold	 text-darkGreen">Personal details</h6>
                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center">
                                    <h6 className="text-lg	 font-bold text-darkGreen">Personal details</h6>

                                    <div className="flex items-center  gap-3">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            defaultValue=""
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="default-checkbox"
                                            className="  dark:text-gray-300"
                                        >
                                            <p className="text-xs		font-normal	 text-gray">Same ordering and delivery contact </p>
                                        </label>
                                    </div>

                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={`${activeStatus == 3 ? "Active" : "hidden"} grid lg:grid-cols-2 grid-cols-1 gap-4`}>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                                    <h6 className="text-lg	 font-bold	 text-darkGreen">Delivery address</h6>
                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center">
                                    <h6 className="text-lg	 font-bold text-darkGreen">Billing address</h6>

                                    <div className="flex items-center  gap-3">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            defaultValue=""
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="default-checkbox"
                                            className="  dark:text-gray-300"
                                        >
                                            <p className="text-xs		font-normal	 text-gray">Same ordering and delivery contact </p>
                                        </label>
                                    </div>

                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={`${activeStatus == 4 ? "Active" : "hidden"} grid lg:grid-cols-2 grid-cols-1 gap-4`}>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                                    <h6 className="text-lg	 font-bold	 text-darkGreen">Personal details</h6>
                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4 flex justify-between items-center">
                                    <h6 className="text-lg	 font-bold text-darkGreen">Personal details</h6>

                                    <div className="flex items-center  gap-3">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            defaultValue=""
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="default-checkbox"
                                            className="  dark:text-gray-300"
                                        >
                                            <p className="text-xs		font-normal	 text-gray">Same ordering and delivery contact </p>
                                        </label>
                                    </div>

                                </div>
                                <div className="px-6 py-7">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Tom"

                                                />

                                            </div>
                                            <div className="w-full relative md:w-1/2 px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-last-name"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Jones"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    autoComplete="on"
                                                    placeholder="devidjond45@gmail.com"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full relative px-3">
                                                <label
                                                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                                                    htmlFor="grid-password"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="0412 345 678"

                                                />

                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-5">
                                            <div className="w-full px-3">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                                                    placeholder="Leave a comment..."
                                                    defaultValue={""}

                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default OrderDetails
