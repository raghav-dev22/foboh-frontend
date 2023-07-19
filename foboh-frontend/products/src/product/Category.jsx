import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function Category() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className="relative ">
                <div className="flex items-center gap-2 product-category-box" onClick={toggleDropdown}>
                    <h5 className="text-base font-medium	text-gray">Category</h5>
                    <div className=""><img src="http://localhost:3001/assets/dropdownArrow.png" alt="" /></div>
                </div>
                {isOpen && (
                    <div
                        className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	"
                    >
                        <ul className="dropdown-content 	 ">
                            <li className="py-2.5	px-4	">
                                <div className="flex items-center">

                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray"
                                    >
                                        Alcoholic beverage
                                    </label>

                                </div>
                            </li>



                            <li className="py-2.5	px-4	">

                                <div className="flex items-center">

                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray"
                                    >
                                        Non-alcoholic beverage
                                    </label>

                                </div>
                            </li>


                            <li className="py-2.5	px-4 	">
                                <div className="flex items-center">

                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray"
                                    >
                                        Equipment
                                    </label>

                                </div>
                            </li>


                        </ul>
                    </div>)}
            </div>

        </>
    )
}

export default Category
