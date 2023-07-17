import React from 'react'
import OutOfStockBtn from '../StockAlert/OutOfStockBtn';
import LowStockBtn from '../StockAlert/LowStockBtn';

function ProductDetails() {
    const productItem = Array.from({ length: 4 });;

    return (
        <>
            {productItem.map((item, index) => {
                return (

                    <div className={`flex justify-between sm:items-center items-end pt-5 productItem-${index}`}>
                        <div className=" sm:flex items-center  grid  gap-2 justify-center">
                            <div className="">
                                <img src="/assets/stock.jpg" alt="" className='w-12	h-12' />
                            </div>
                            <div className="">
                                <h5 className="sm:text-base	text-sm	font-medium	 sm:font-semibold"> Product name 1</h5>
                                <p className="sm:text-sm font-light	text-xs		sm:font-normal	">No units remaining</p>
                            </div>
                        </div>
                        <LowStockBtn/>
                    {/* <OutOfStockBtn/> */}
                    </div>
                )
            })}
        </>

    )
}

export default ProductDetails
