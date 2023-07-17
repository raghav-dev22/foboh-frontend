import React, { useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header'
import TableRange from './TableRange';
import SearchProduct from './SearchProduct';

import ActiveProduct from './ActiveProduct';
import '../style.css'

function Range() {
    const [isDivVisible, setIsDivVisible] = useState(false);

    const sidebarHandler = () => {
        setIsDivVisible(!isDivVisible);
    };
    return (
                 <>
                   <ActiveProduct/>
                    <div className="   ">
                        <div className="box-3 px-6 ">
                        <SearchProduct/>
                        </div>
                        <div className="box-4 pt-6 px-6 ">
                            <div className="relative overflow-x-auto overflow-y-auto h-80 no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white">
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
                 </>
    )
}

export default Range
