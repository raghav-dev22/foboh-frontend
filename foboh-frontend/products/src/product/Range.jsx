import React, { useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header'
import TableRange from './TableRange';
import SearchProduct from './SearchProduct';

import ActiveProduct from './ActiveProduct';

function Range() {
    const [isDivVisible, setIsDivVisible] = useState(false);

    const sidebarHandler = () => {
        setIsDivVisible(!isDivVisible);
    };
    return (
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
            <div className="container mx-auto pb-14  h-full md:w-4/5 w-full bg-slate-100	 ">
                <div className="container mx-auto px-0">
                    <Header />

                   <ActiveProduct/>

                    <div className="   ">
                        <div className="box-3 px-6 ">
                        <SearchProduct/>
                        </div>
                        <div className="box-4 pt-6 px-6 ">
                            <div className="relative overflow-x-auto overflow-y-auto h-80	 no-scrollbar shadow-md sm:rounded-lg rounded-md	 border border-inherit bg-white">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className=" border-b">
                                        <tr>
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="default-checkbox"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                                    />

                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base text-center	">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base	" >
                                                Code
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base	">
                                                Configuration
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base	">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base	">
                                                Stock level
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-green	font-medium text-base	">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                  <TableRange/>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Range
