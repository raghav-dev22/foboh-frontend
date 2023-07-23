import React, { useState } from 'react'
import Category from './Category'
import Subcategory from './Subcategory'
import Stock from './Stock'
import Status from './Status'
import Visibility from './Visibility'
import Filter from './Filter'

function SearchProduct({products ,setProducts}) {
    const [input, setInput] = useState("")

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    // Debouce function
    function debounce(func, timeout = 1000){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
      function saveInput(){
        fetch(`https://product-api-foboh.azurewebsites.net/api/Product/get?Title=${input}`, {
            method: "GET"
        }).then(respose => respose.json())
        .then(data => {
            if(data.success) {
                setProducts(data.data)
            }
        })
      }
      const processChange = debounce(() => saveInput());



    return (
        <>
            <div className=" border border-inherit bg-white h-full py-3	 px-4">
                <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center ">
                    <div>
            
                        <div className="relative 	">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                onKeyUp={processChange}
                                onChange={handleInputChange}
                                type="search"
                                id="default-search"
                                className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                                placeholder="Search Mockups, Logos..."
                                required=""
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                       <Filter/>
                        <div className="h-11	w-fit px-5 shadow-md	border  border-inherit rounded-md flex items-center justify-center gap-2">
                            <div className="">
                                <svg
                                    width={13}
                                    height={10}
                                    viewBox="0 0 13 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.367676 9.19262V7.79512H4.56018V9.19262H0.367676ZM0.367676 5.69887V4.30137H8.75268V5.69887H0.367676ZM0.367676 2.20512V0.807617H12.9452V2.20512H0.367676Z"
                                        fill="#637381"
                                    />
                                </svg>
                            </div>
                            <h6 className="text-base	font-normal	text-gray">Sort</h6>
                        </div>
                    </div>
                </div>
                <div className="flex gap-8 relative  pt-4 flex-wrap">
               
                       <Category/>
                       <Subcategory/>
                       <Stock/>
                       <Status/>
                       <Visibility/>
                   
                </div>
            </div>
        </>
    )
}

export default SearchProduct
