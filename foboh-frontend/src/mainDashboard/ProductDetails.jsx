import React from 'react'
import OutOfStockBtn from '../StockAlert/OutOfStockBtn';
import LowStockBtn from '../StockAlert/LowStockBtn';

function ProductDetails() {
    const productItem = Array.from({ length: 4 });;

    return (
        <>
            {productItem.map((item, index) => {
                return (

                    <div className={`flex justify-between items-center pt-5 productItem-${index}`}>
                        <div className="flex items-between gap-2 justify-center">
                            <div className="">
                                <img src="assets/stock.jpg" alt="" />
                            </div>
                            <div className="">
                                <h5 className="text-base	 font-semibold"> Product name 1</h5>
                                <p className="text-sm	font-normal	">No units remaining</p>
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
