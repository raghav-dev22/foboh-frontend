import React, { useState } from 'react';
// import '../src/style.css'
import Header from './Header';
// import Sidebar from './dashBoard/Sidebar';
import Sidebar from './sidebar';
import StockDetails from '../mainDashboard/StockDetails';
import 'react-datepicker/dist/react-datepicker.css';

import ProductDetails from '../mainDashboard/ProductDetails';
import OrderDetails from '../mainDashboard/OrderDetails';
import ActiveOrder from '../activeOrder/ActiveOrder'
// import stock from '../mainDashboard/StockDetails';
// import Sidebar from './sidebar';
function Dashboard() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <>

      <div className="flex flex-no-wrap">
      
        <div className="w-custom-20 absolute sm:relative border border-inherit md:h-full flex-col justify-between hidden sm:flex">
          <Sidebar />
        </div>
        <div className="w-64 z-40 absolute bg-white  shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out" id="mobile-nav" >
                <div className="h-10 w-10 bg-gray-800 absolute left-4 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer" id="mobile-toggler" onClick={sidebarHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
                <div className={`	justify-between h-screen ${isDivVisible ? 'grid' : 'hidden'}`}>
                <Sidebar />
                </div>
            </div> 
        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto  h-64 md:w-4/5 w-full ">
        <div className="container mx-auto px-0">
            <Header />
            <div className="h-custom-half     overflow-y-scroll	scroll-smooth	scrollable">
              <div className="box pt-6 px-6 ">
                <div className="  lg:flex gap-6 grid sm:grid-cols-2 	grid-cols-1 	">
                  <StockDetails />
                </div>
              </div>
              <div className="box-2 pt-6 px-6">
                <div className="grid lg:flex gap-6">
                  <div className=" lg:w-3/5 w-full		 rounded-md	 border border-inherit bg-white h-356 grid	  ">
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
                  <div className="w-full lg:w-2/5	 rounded-md	 border border-inherit bg-white p-6">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xl font-semibold">Stock alerts</h5>
                      <a
                        href="#"
                        className="text-xs/[10px] font-normal	text-darkBlue underline"
                      >
                        See all
                      </a>
                    </div>
                    <ProductDetails />
                  </div>
                </div>
              </div>
              <div className="box-3 pt-6 px-6 ">
                <ActiveOrder />
              </div>
              <div className="box-4 pt-6 px-6">
                <div className=" rounded-md	 border border-inherit bg-white overflow-x-scroll	">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                          Order ID
                        </th>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                          Customer
                        </th>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm		 font-semibold ">
                          Amount
                        </th>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base	text-sm			 font-semibold ">
                          Delivery date
                        </th>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
                          Status
                        </th>
                        <th className="px-4 py-3 border-b border-gray-300   text-left text-green	sm:text-base		text-sm		 font-semibold ">
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
        </div>
      </div>
  

    </>

  )
}

export default Dashboard
