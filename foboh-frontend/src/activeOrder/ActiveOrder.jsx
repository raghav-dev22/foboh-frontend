import React from 'react'
import Calendar from './Calendar'
import Filter from './Filter'

function ActiveOrder() {
    return (
        <div>
            <div className="border rounded-md border-inherit bg-white h-16	 px-6 flex justify-between items-center ">
                <div>
                    <h4 className="text-2xl	font-semibold	">Active orders</h4>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="">
                       <Calendar/>
                    </div>
                    <div className="">
                        <Filter/>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default ActiveOrder
