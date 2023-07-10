import React, { useState } from 'react';
// import '../src/style.css'
import Header from './dashBoard/Header';
import Sidebar from './dashBoard/Sidebar';
import Stock from './mainDashboard/stock';
import 'react-datepicker/dist/react-datepicker.css';

import Product from './mainDashboard/product';
import OrderDetails from './mainDashboard/OrderDetails';
import ActiveOrder from './ActiveOrder/ActiveOrder';
function Dashboard() {
  return (
    <>
      <section className="home-dashboard grid md:flex">
        <section className="sidebar w-1/5 h-screen	flex justify-between flex-col	 border border-inherit">
          <Sidebar />
        </section>
        <section className="dashboard w-full md:w-4/5 bg-slate-100">
          <div className="container mx-auto px-0">
            <Header />
            <div className="h-custom-half     overflow-y-scroll	scroll-smooth	scrollable">
              <div className="box pt-6 px-6 ">
                <div className=" grid md:flex gap-6">
                  <Stock />
                </div>
              </div>
              <div className="box-2 pt-6 px-6">
                <div className="grid md:flex gap-6">
                  <div className=" md:w-3/5 w-full		 rounded-md	 border border-inherit bg-white h-356 grid	  ">
                    <div className="flex justify-between pt-7 px-7 pb-2">
                      <h5 className="text-xl font-semibold">Order snapshot</h5>

                      <div className="relative dropdown">
                        <div
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className=" dropdown-toggle bg-slate-100 flex justify-center items-center  dropdown-button 	gap-2 rounded border w-24	border-inherit	h-7	 "
                        >
                          <h6 className=" text-sm font-normal	">Monthly</h6>
                          <div className="">
                            <img src="assets/arrow.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <img src="assets/snapshot.png" alt="" />
                    </div>
                    <div className="     flex justify-center items-center gap-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className=""></div>
                        <div className="">
                          <p className="text-xs	font-normal	text-slate-500 		">Ordered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/5	 rounded-md	 border border-inherit bg-white p-6">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xl font-semibold">Stock alerts</h5>
                      <a
                        href="#"
                        className="text-xs/[10px] font-normal	text-darkBlue underline"
                      >
                        See all
                      </a>
                    </div>
                    <Product />
                  </div>
                </div>
              </div>
              <div className="box-3 pt-6 px-6 ">
              <ActiveOrder/>
              </div>
              <div className="box-4 pt-6 px-6">
                <div className="border rounded-md	 border border-inherit bg-white">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Order ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Customer
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Amount
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Delivery date
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Status
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300   text-left text-green	font-medium		 font-semibold ">
                          Action required
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <OrderDetails />

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

    </>

  )
}

export default Dashboard
