import React from 'react'
import ImportProductBtn from './ImportProductBtn';
import EditProductBtn from './EditProductBtn';
import AddProductBtn from './AddProductBtn';

function ActiveProduct() {
  return (
    <>
       <div className="py-6 sm:flex grid items-center justify-between px-6 gap-5">
                        <div className="">
                            <h4 className=" text-2xl	font-semibold pb-2	text-darkGreen"> Products</h4>
                            <p className="text-gray font-medium	 text-sm	">
                                140 active products
                            </p>
                        </div>
                        <div className=" flex-wrap	 flex judstify-center items-center gap-2">
                           <ImportProductBtn/>
                           <EditProductBtn/>
                           <AddProductBtn/>
                        </div>
                    </div>
    </>
  )
}

export default ActiveProduct
