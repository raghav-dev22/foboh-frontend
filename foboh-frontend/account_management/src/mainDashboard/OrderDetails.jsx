import React from 'react'
import NewBtn from '../orderTable/statusBtn/NewBtn';


function OrderDetails() {
    const orderItem=Array.from({ length: 4 });
    return (
        <>
            {
                orderItem.map((item,index)=>{
                    return(
                        <tr className={`orderNo-${index}`}>
                        <td className="px-4 py-4 border-b border-gray-200 text-base	">
                            <h5 className="sm:font-normal font-light	text-xs	sm:text-sm		 whitespace-no-wrap text-gray">
                                #LF1001024
                            </h5>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 	">
                            <h5 className="sm:font-semibold	 font-semibold	 text-xs	sm:text-sm	 whitespace-no-wrap text-gray">
                                The Union Hotel{" "}
                            </h5>
                            <p className="text-xs	sm:text-sm sm:font-normal font-light		text-gray">
                                jack@union.com
                            </p>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 	">
                            <h5 className="sm:font-normal font-light	text-xs	sm:text-sm	 whitespace-no-wrap text-gray">
                                $450.10
                            </h5>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 	">
                            <h5 className="sm:font-normal	text-xs	sm:text-sm whitespace-no-wrap text-gray">
                                25 Dec 2023
                            </h5>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 	">
                           <NewBtn />
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 	">
                            <a href="#">
                                <div className="border-darkGreen border rounded	w-32	h-10	flex justify-center items-center text-base	font-medium	">
                                    <h6 className="text-darkGreen">Review order</h6>
                                </div>
                            </a>
                        </td>
                    </tr>
                    )
                })
            }
          
        </>
    )
}

export default OrderDetails
